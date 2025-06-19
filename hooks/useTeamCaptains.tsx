
import { useState, useEffect } from 'react';
import { Player, Team } from '@/types';
import { getTeams } from '@/services/api/teams';
import { getPlayersByTeam } from '@/services/api/players';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface TeamWithCaptain extends Team {
  captain_id?: number | null;
}

export const useTeamCaptains = () => {
  const [teams, setTeams] = useState<TeamWithCaptain[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);
  const { toast } = useToast();

  // Fetch teams and their captains on component mount
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        
        // Fetch teams
        const teamsData = await getTeams();
        
        // Fetch team captains data
        const { data: captainsData, error: captainsError } = await supabase
          .from('match_captain')
          .select('team_id, player_captain')
          .order('team_id');
          
        if (captainsError) throw captainsError;
        
        // Merge teams with their captains
        const teamsWithCaptains: TeamWithCaptain[] = teamsData.map(team => {
          const captainEntry = captainsData?.find(c => c.team_id === team.team_id);
          return {
            ...team,
            captain_id: captainEntry?.player_captain || null
          };
        });
        
        setTeams(teamsWithCaptains);
      } catch (error) {
        console.error('Error fetching teams data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load teams and captains',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchTeams();
  }, [toast]);

  // Function to fetch players for a specific team
  const fetchTeamPlayers = async (teamId: number) => {
    if (!teamId) return;
    
    try {
      setLoading(true);
      
      // Get players for this team using the existing API function
      const teamPlayers = await getPlayersByTeam(teamId);
      
      if (teamPlayers.length === 0) {
        toast({
          title: 'No players found',
          description: 'This team has no assigned players',
          variant: 'default'
        });
      }
      
      setPlayers(teamPlayers);
      
      // Find captain for selected team and pre-select if exists
      const team = teams.find(t => t.team_id === teamId);
      setSelectedPlayer(team?.captain_id || null);
      
    } catch (error) {
      console.error('Error fetching team players:', error);
      toast({
        title: 'Error',
        description: 'Failed to load players for this team',
        variant: 'destructive'
      });
      setPlayers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTeamChange = (teamId: string) => {
    const selectedTeamId = parseInt(teamId, 10);
    setSelectedTeam(selectedTeamId);
    
    // Fetch players for this team
    fetchTeamPlayers(selectedTeamId);
  };

  const handlePlayerChange = (playerId: string) => {
    setSelectedPlayer(parseInt(playerId, 10));
  };

  const handleSaveCaptain = async () => {
    if (!selectedTeam || !selectedPlayer) {
      toast({
        title: 'Error',
        description: 'Please select both a team and a player',
        variant: 'destructive'
      });
      return;
    }
    
    try {
      setUpdating(true);
      
      // Check if there's already a captain for this team
      const { data: existingCaptain } = await supabase
        .from('match_captain')
        .select('*')
        .eq('team_id', selectedTeam)
        .single();
        
      let result;
      
      if (existingCaptain) {
        // Update existing captain
        result = await supabase
          .from('match_captain')
          .update({ player_captain: selectedPlayer })
          .eq('team_id', selectedTeam);
      } else {
        // First, fetch a valid match_no from match_played table
        const { data: matchData, error: matchError } = await supabase
          .from('match_played')
          .select('match_no')
          .limit(1)
          .single();
          
        if (matchError) {
          // If no matches exist, inform the user
          toast({
            title: 'Error',
            description: 'No matches available in the database. Please create a match first.',
            variant: 'destructive'
          });
          console.error('Error fetching match number:', matchError);
          setUpdating(false);
          return;
        }
        
        // Insert new captain with valid match_no
        result = await supabase
          .from('match_captain')
          .insert({ 
            team_id: selectedTeam, 
            player_captain: selectedPlayer, 
            match_no: matchData.match_no 
          });
      }
      
      if (result.error) throw result.error;
      
      // Update local state
      setTeams(teams.map(team => 
        team.team_id === selectedTeam 
          ? { ...team, captain_id: selectedPlayer } 
          : team
      ));
      
      toast({
        title: 'Success',
        description: 'Team captain updated successfully',
      });
    } catch (error) {
      console.error('Error saving captain:', error);
      toast({
        title: 'Error',
        description: 'Failed to update team captain. Please check database constraints.',
        variant: 'destructive'
      });
    } finally {
      setUpdating(false);
    }
  };

  return {
    teams,
    players,
    selectedTeam,
    selectedPlayer,
    loading,
    updating,
    handleTeamChange,
    handlePlayerChange,
    handleSaveCaptain
  };
};
