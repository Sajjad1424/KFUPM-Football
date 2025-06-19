import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Match } from '@/types';
import { updateMatchResult, getMatchById, calculateTournamentStandings } from '@/services/api';
import { supabase } from '@/lib/supabase';

interface EditMatchResultDialogProps {
  isOpen: boolean;
  matchId: number | null;
  onClose: () => void;
  onSuccess: () => void;
}

const EditMatchResultDialog = ({ isOpen, matchId, onClose, onSuccess }: EditMatchResultDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [match, setMatch] = useState<Match | null>(null);
  const [goalScore, setGoalScore] = useState('');
  const [results, setResults] = useState('WIN');
  const [decidedBy, setDecidedBy] = useState('N');
  const [updateStandings, setUpdateStandings] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadMatchData = async () => {
      if (!matchId) return;
      
      try {
        setIsLoading(true);
        const matchData = await getMatchById(matchId);
        
        if (matchData) {
          setMatch(matchData);
          setGoalScore(matchData.goal_score);
          setResults(matchData.results);
          setDecidedBy(matchData.decided_by);
        }
      } catch (error) {
        console.error("Error loading match data:", error);
        toast({
          title: "Error",
          description: "Failed to load match data",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen && matchId) {
      loadMatchData();
    }
  }, [isOpen, matchId, toast]);

  const handleSave = async () => {
    if (!matchId) return;
    
    try {
      setIsLoading(true);
      
      const success = await updateMatchResult(
        matchId,
        goalScore,
        results,
        decidedBy
      );
      
      if (success) {
        if (updateStandings && match?.team1 && match?.team2) {
          // Identify the tournament this match belongs to
          // For this example, we'll need to query it first
          try {
            const { data: tournamentTeam } = await supabase
              .from('tournament_team')
              .select('tr_id')
              .eq('team_id', match.team_id1)
              .limit(1);
            
            if (tournamentTeam && tournamentTeam.length > 0) {
              const tournamentId = tournamentTeam[0].tr_id;
              await calculateTournamentStandings(tournamentId);
            }
          } catch (error) {
            console.error("Error updating standings after match result:", error);
          }
        }
        
        toast({
          title: "Success",
          description: "Match result updated successfully"
        });
        onSuccess();
      } else {
        toast({
          title: "Error",
          description: "Failed to update match result",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error updating match result:", error);
      toast({
        title: "Error",
        description: "An error occurred while updating the match result",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Update Match Result</DialogTitle>
        </DialogHeader>
        
        {isLoading ? (
          <div className="py-6 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-soccer-green"></div>
          </div>
        ) : match ? (
          <div className="py-4">
            <div className="mb-4 text-center">
              <p className="font-medium">{match.team1?.team_name} vs {match.team2?.team_name}</p>
              <p className="text-sm text-gray-500">{new Date(match.play_date).toLocaleDateString()}</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="goalScore">Score (e.g. "2-1")</Label>
                <Input
                  id="goalScore"
                  value={goalScore}
                  onChange={(e) => setGoalScore(e.target.value)}
                  placeholder="Enter score (e.g. 2-1)"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="results">Result</Label>
                <Select value={results} onValueChange={setResults}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select result" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WIN">Win</SelectItem>
                    <SelectItem value="DRAW">Draw</SelectItem>
                    <SelectItem value="LOSS">Loss</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="decidedBy">Decided By</Label>
                <Select value={decidedBy} onValueChange={setDecidedBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select how match was decided" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="N">Normal Time</SelectItem>
                    <SelectItem value="P">Penalties</SelectItem>
                    <SelectItem value="E">Extra Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="updateStandings"
                  checked={updateStandings}
                  onChange={(e) => setUpdateStandings(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="updateStandings">
                  Automatically update tournament standings
                </Label>
              </div>
            </div>
          </div>
        ) : (
          <p className="py-4 text-center text-gray-500">Failed to load match data</p>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>Cancel</Button>
          <Button onClick={handleSave} disabled={isLoading || !match}>
            {isLoading ? (
              <>
                <span className="animate-spin mr-2">⌛</span>
                Updating...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditMatchResultDialog;
