
import { Match } from '@/types';
import { supabase } from '@/lib/supabase';

export async function getMatches(): Promise<Match[]> {
  const { data, error } = await supabase
    .from('match_played')
    .select(`
      *,
      team1:team_id1 (team_id, team_name),
      team2:team_id2 (team_id, team_name)
    `);
  
  if (error) {
    console.error('Error fetching matches:', error);
    return [];
  }
  
  return data || [];
}

export async function getMatchesByTeam(teamId: number): Promise<Match[]> {
  const { data, error } = await supabase
    .from('match_played')
    .select(`
      *,
      team1:team_id1 (team_id, team_name),
      team2:team_id2 (team_id, team_name)
    `)
    .or(`team_id1.eq.${teamId},team_id2.eq.${teamId}`);
  
  if (error) {
    console.error(`Error fetching matches for team ${teamId}:`, error);
    return [];
  }
  
  return data || [];
}

export async function getMatchesByTournament(tournamentId: number): Promise<Match[]> {
  console.log(`Fetching matches for tournament ${tournamentId}`);
  
  try {
    // First get all teams in this tournament
    const { data: teamsData, error: teamsError } = await supabase
      .from('tournament_team')
      .select('team_id')
      .eq('tr_id', tournamentId);
    
    if (teamsError) {
      console.error(`Error fetching teams for tournament ${tournamentId}:`, teamsError);
      return [];
    }
    
    if (!teamsData || teamsData.length === 0) {
      console.log(`No teams found for tournament ${tournamentId}`);
      return [];
    }
    
    // Extract team IDs
    const teamIds = teamsData.map(team => team.team_id);
    console.log(`Found ${teamIds.length} teams in tournament ${tournamentId}:`, teamIds);
    
    // Get matches that involve these teams
    const { data: matchesData, error: matchesError } = await supabase
      .from('match_played')
      .select(`
        *,
        team1:team_id1 (team_id, team_name),
        team2:team_id2 (team_id, team_name)
      `)
      .in('team_id1', teamIds)
      .in('team_id2', teamIds);
    
    if (matchesError) {
      console.error(`Error fetching matches for teams in tournament ${tournamentId}:`, matchesError);
      return [];
    }
    
    console.log(`Found ${matchesData?.length || 0} matches for tournament ${tournamentId}`);
    return matchesData || [];
  } catch (error) {
    console.error(`Error in getMatchesByTournament for tournament ${tournamentId}:`, error);
    return [];
  }
}

// Get match by ID
export async function getMatchById(matchId: number): Promise<Match | null> {
  try {
    console.log(`Fetching match ${matchId}...`);
    
    const { data, error } = await supabase
      .from('match_played')
      .select(`
        *,
        team1:team_id1 (team_id, team_name),
        team2:team_id2 (team_id, team_name)
      `)
      .eq('match_no', matchId)
      .single();
    
    if (error) {
      console.error(`Error fetching match ${matchId}:`, error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error(`Exception in getMatchById for match ${matchId}:`, error);
    return null;
  }
}

// Add new function to update match results
export async function updateMatchResult(
  matchId: number, 
  goalScore: string, 
  results: string = 'WIN', 
  decidedBy: string = 'N'
): Promise<boolean> {
  try {
    console.log(`Updating result for match ${matchId}...`);
    
    const { error } = await supabase
      .from('match_played')
      .update({
        goal_score: goalScore,
        results: results,
        decided_by: decidedBy
      })
      .eq('match_no', matchId);
    
    if (error) {
      console.error(`Error updating match ${matchId}:`, error);
      return false;
    }
    
    console.log(`Match ${matchId} result updated successfully`);
    return true;
  } catch (error) {
    console.error(`Exception in updateMatchResult for match ${matchId}:`, error);
    return false;
  }
}

// Add new function to create a match
export async function createMatch(matchData: Partial<Match>): Promise<{ success: boolean; match_no?: number }> {
  try {
    console.log('Creating new match:', matchData);

    // Generate a match number if not provided
    if (!matchData.match_no) {
      // Get the highest match number and increment by 1
      const { data: maxMatch, error: maxMatchError } = await supabase
        .from('match_played')
        .select('match_no')
        .order('match_no', { ascending: false })
        .limit(1);
      
      if (maxMatchError) {
        console.error('Error getting max match number:', maxMatchError);
      } else {
        matchData.match_no = maxMatch && maxMatch.length > 0 ? maxMatch[0].match_no + 1 : 1;
      }
    }
    
    const { data, error } = await supabase
      .from('match_played')
      .insert(matchData)
      .select('match_no')
      .single();
    
    if (error) {
      console.error('Error creating match:', error);
      return { success: false };
    }
    
    console.log('Match created successfully:', data);
    return { success: true, match_no: data.match_no };
  } catch (error) {
    console.error('Exception in createMatch:', error);
    return { success: false };
  }
}
