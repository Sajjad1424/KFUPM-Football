
import { Button } from '@/components/ui/button';
import { TeamSelector } from './TeamSelector';
import { CaptainSelector } from './CaptainSelector';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Player, Team } from '@/types';
import { Loader2 } from 'lucide-react';

interface CaptainFormProps {
  teams: Team[];
  players: Player[];
  selectedTeam: number | null;
  selectedPlayer: number | null;
  loading: boolean;
  updating: boolean;
  onTeamChange: (teamId: string) => void;
  onPlayerChange: (playerId: string) => void;
  onSave: () => void;
}

export const CaptainForm = ({
  teams,
  players,
  selectedTeam,
  selectedPlayer,
  loading,
  updating,
  onTeamChange,
  onPlayerChange,
  onSave
}: CaptainFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Team Captains</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && !selectedTeam ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-4">
            <TeamSelector
              teams={teams}
              selectedTeam={selectedTeam}
              onChange={onTeamChange}
              isLoading={loading}
            />
            
            {selectedTeam && (
              <CaptainSelector
                players={players}
                selectedPlayer={selectedPlayer}
                onChange={onPlayerChange}
                isLoading={loading}
              />
            )}
            
            <div className="pt-2">
              <Button 
                onClick={onSave} 
                disabled={!selectedTeam || !selectedPlayer || updating || players.length === 0}
                className="w-full"
              >
                {updating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : 'Save Captain'}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
