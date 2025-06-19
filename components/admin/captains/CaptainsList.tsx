
import { Card, CardContent } from '@/components/ui/card';
import { Player, Team } from '@/types';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

interface TeamWithCaptain extends Team {
  captain_id?: number | null;
}

interface CaptainsListProps {
  teams: TeamWithCaptain[];
  players: Player[];
}

export const CaptainsList = ({ teams }: CaptainsListProps) => {
  const [teamsWithCaptains, setTeamsWithCaptains] = useState<TeamWithCaptain[]>([]);
  const [captainMap, setCaptainMap] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState<boolean>(true);
  
  // Fetch captain names for all teams that have captains assigned
  useEffect(() => {
    const fetchCaptainNames = async () => {
      setLoading(true);
      try {
        // Filter teams that have captains assigned
        const teamsWithCaptainAssigned = teams.filter(team => team.captain_id);
        setTeamsWithCaptains(teamsWithCaptainAssigned);
        
        if (teamsWithCaptainAssigned.length === 0) {
          setLoading(false);
          return;
        }
        
        // Extract captain IDs to fetch their details
        const captainIds = teamsWithCaptainAssigned
          .map(team => team.captain_id)
          .filter(id => id !== null) as number[];
        
        if (captainIds.length === 0) {
          setLoading(false);
          return;
        }
        
        // Fetch person data for these captains
        const { data: personData, error: personError } = await supabase
          .from('person')
          .select('kfupm_id, name')
          .in('kfupm_id', captainIds);
        
        if (personError) {
          console.error('Error fetching captain names:', personError);
          setLoading(false);
          return;
        }
        
        // Create a map of captain IDs to names for quick lookup
        const captainNameMap: Record<number, string> = {};
        teamsWithCaptainAssigned.forEach(team => {
          if (team.captain_id) {
            const person = personData?.find(p => p.kfupm_id === team.captain_id);
            captainNameMap[team.team_id] = person?.name || "Unknown Player";
          }
        });
        
        setCaptainMap(captainNameMap);
      } catch (error) {
        console.error('Error processing captain data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCaptainNames();
  }, [teams]);
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Current Team Captains</h2>
      {loading ? (
        <div className="flex justify-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : teamsWithCaptains.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamsWithCaptains.map((team) => (
            <Card key={team.team_id}>
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg">{team.team_name}</h3>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-gray-500">Captain:</span>
                  <span className="ml-2 font-medium">
                    {captainMap[team.team_id] || "Loading..."}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No team captains assigned yet</p>
      )}
    </div>
  );
};
