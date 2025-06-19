import { Tournament, TournamentTeam } from '@/types';
import { supabase } from '@/lib/supabase';

export async function getTournaments(): Promise<Tournament[]> {
  const { data, error } = await supabase
    .from('tournament')
    .select('*');
  
  if (error) {
    console.error('Error fetching tournaments:', error);
    return [];
  }
  
  return data || [];
}

export async function getTournamentDetails(tournamentId: number): Promise<Tournament> {
  const { data, error } = await supabase
    .from('tournament')
    .select('*')
    .eq('tr_id', tournamentId)
    .single();
  
  if (error) {
    console.error(`Error fetching tournament ${tournamentId}:`, error);
    throw new Error(`Tournament with ID ${tournamentId} not found`);
  }
  
  return data;
}

export async function getTournamentTeams(tournamentId: number): Promise<TournamentTeam[]> {
  const { data, error } = await supabase
    .from('tournament_team')
    .select(`
      *,
      teams:team_id (team_id, team_name)
    `)
    .eq('tr_id', tournamentId);
  
  if (error) {
    console.error(`Error fetching tournament teams for tournament ${tournamentId}:`, error);
    return [];
  }
  
  // Transform the data to match the TournamentTeam type
  return data.map(item => ({
    team_id: item.team_id,
    tr_id: item.tr_id,
    team_name: item.teams?.team_name || '',
    team_group: item.team_group,
    match_played: item.match_played,
    won: item.won,
    draw: item.draw,
    lost: item.lost,
    goal_for: item.goal_for,
    goal_against: item.goal_against,
    goal_diff: item.goal_diff,
    points: item.points,
    group_position: item.group_position,
  }));
}

// Updated createTournament function to fetch the next available tr_id
export async function createTournament(tournament: Omit<Tournament, 'tr_id'>): Promise<Tournament> {
  try {
    console.log('Creating tournament with data:', tournament);
    
    // First get the highest tr_id currently in the database
    const { data: maxIdData, error: maxIdError } = await supabase
      .from('tournament')
      .select('tr_id')
      .order('tr_id', { ascending: false })
      .limit(1);
    
    if (maxIdError) {
      console.error('Error fetching max tr_id:', maxIdError);
      throw new Error('Could not generate new tournament ID');
    }
    
    // Calculate next ID (either max + 1 or start with 1)
    const nextId = maxIdData && maxIdData.length > 0 ? maxIdData[0].tr_id + 1 : 1;
    console.log('Using next tr_id:', nextId);
    
    // Insert new tournament with the calculated tr_id
    const { data, error } = await supabase
      .from('tournament')
      .insert([{ 
        tr_id: nextId,
        ...tournament 
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating tournament:', error);
      throw new Error('Could not create tournament');
    }
    
    console.log('Tournament created successfully:', data);
    return data;
  } catch (error) {
    console.error('Exception in createTournament:', error);
    throw error;
  }
}

// Add team to tournament
export async function addTeamToTournament(tournamentId: number, teamId: number, teamGroup: string = 'A'): Promise<TournamentTeam> {
  try {
    console.log(`Adding team ${teamId} to tournament ${tournamentId} in group ${teamGroup}`);
    
    const initialData = {
      tr_id: tournamentId,
      team_id: teamId,
      team_group: teamGroup,
      match_played: 0,
      won: 0,
      draw: 0,
      lost: 0,
      goal_for: 0,
      goal_against: 0,
      goal_diff: 0,
      points: 0,
      group_position: 0
    };
    
    const { data, error } = await supabase
      .from('tournament_team')
      .insert([initialData])
      .select(`
        *,
        teams:team_id (team_id, team_name)
      `)
      .single();
    
    if (error) {
      console.error(`Error adding team ${teamId} to tournament ${tournamentId}:`, error);
      throw new Error(`Could not add team to tournament: ${error.message}`);
    }
    
    console.log(`Team ${teamId} added successfully to tournament ${tournamentId}`);
    
    // Transform the data to match the TournamentTeam type
    return {
      team_id: data.team_id,
      tr_id: data.tr_id,
      team_name: data.teams?.team_name || '',
      team_group: data.team_group,
      match_played: data.match_played,
      won: data.won,
      draw: data.draw,
      lost: data.lost,
      goal_for: data.goal_for,
      goal_against: data.goal_against,
      goal_diff: data.goal_diff,
      points: data.points,
      group_position: data.group_position,
    };
  } catch (error) {
    console.error('Exception in addTeamToTournament:', error);
    throw error;
  }
}

// Remove team from tournament
export async function removeTeamFromTournament(tournamentId: number, teamId: number): Promise<void> {
  try {
    console.log(`Removing team ${teamId} from tournament ${tournamentId}`);
    
    const { error } = await supabase
      .from('tournament_team')
      .delete()
      .match({ tr_id: tournamentId, team_id: teamId });
    
    if (error) {
      console.error(`Error removing team ${teamId} from tournament ${tournamentId}:`, error);
      throw new Error(`Could not remove team from tournament: ${error.message}`);
    }
    
    console.log(`Team ${teamId} removed successfully from tournament ${tournamentId}`);
  } catch (error) {
    console.error('Exception in removeTeamFromTournament:', error);
    throw error;
  }
}

// Add new function to delete a tournament
export async function deleteTournament(tournamentId: number): Promise<void> {
  try {
    console.log(`Deleting tournament with ID: ${tournamentId}`);
    
    const { error } = await supabase
      .from('tournament')
      .delete()
      .eq('tr_id', tournamentId);
    
    if (error) {
      console.error(`Error deleting tournament ${tournamentId}:`, error);
      throw new Error(`Could not delete tournament with ID ${tournamentId}`);
    }
    
    console.log(`Tournament ${tournamentId} deleted successfully`);
  } catch (error) {
    console.error('Exception in deleteTournament:', error);
    throw error;
  }
}

// Add new function to update a tournament
export async function updateTournament(tournament: Tournament): Promise<Tournament> {
  try {
    console.log(`Updating tournament with ID: ${tournament.tr_id}`, tournament);
    
    const { data, error } = await supabase
      .from('tournament')
      .update({
        tr_name: tournament.tr_name,
        start_date: tournament.start_date,
        end_date: tournament.end_date
      })
      .eq('tr_id', tournament.tr_id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating tournament ${tournament.tr_id}:`, error);
      throw new Error(`Could not update tournament with ID ${tournament.tr_id}`);
    }
    
    console.log(`Tournament ${tournament.tr_id} updated successfully:`, data);
    return data;
  } catch (error) {
    console.error('Exception in updateTournament:', error);
    throw error;
  }
}

/**
 * Calculate and update team standings in a tournament based on match results
 * Win = 3 points, Draw = 1 point, Loss = 0 points
 */
export async function calculateTournamentStandings(tournamentId: number): Promise<boolean> {
  try {
    console.log(`Calculating standings for tournament ${tournamentId}`);
    
    // First get all teams in this tournament
    const { data: teams, error: teamsError } = await supabase
      .from('tournament_team')
      .select('team_id, tr_id')
      .eq('tr_id', tournamentId);
    
    if (teamsError) {
      console.error(`Error getting teams for tournament ${tournamentId}:`, teamsError);
      return false;
    }
    
    if (!teams || teams.length === 0) {
      console.log(`No teams found for tournament ${tournamentId}`);
      return false;
    }
    
    // Get all team IDs in this tournament
    const teamIds = teams.map(team => team.team_id);
    
    // Get all matches involving these teams
    const { data: matches, error: matchesError } = await supabase
      .from('match_played')
      .select('*')
      .in('team_id1', teamIds)
      .in('team_id2', teamIds);
    
    if (matchesError) {
      console.error(`Error getting matches for tournament ${tournamentId}:`, matchesError);
      return false;
    }
    
    if (!matches || matches.length === 0) {
      console.log(`No matches found for tournament ${tournamentId}`);
      return true; // No error, just no matches to calculate standings from
    }
    
    // Initialize standings for all teams
    const standings: Record<number, {
      match_played: number;
      won: number;
      draw: number;
      lost: number;
      goal_for: number;
      goal_against: number;
      points: number;
    }> = {};
    
    teamIds.forEach(teamId => {
      standings[teamId] = {
        match_played: 0,
        won: 0,
        draw: 0,
        lost: 0,
        goal_for: 0,
        goal_against: 0,
        points: 0
      };
    });
    
    // Calculate stats from matches
    matches.forEach(match => {
      // Only count matches with results
      if (!match.goal_score || !match.results) return;
      
      const team1 = match.team_id1;
      const team2 = match.team_id2;
      
      // Parse score (e.g. "2-1")
      const [goalsTeam1, goalsTeam2] = match.goal_score.split('-').map(Number);
      
      if (isNaN(goalsTeam1) || isNaN(goalsTeam2)) return; // Skip if score format is invalid
      
      // Update matches played
      standings[team1].match_played++;
      standings[team2].match_played++;
      
      // Update goals
      standings[team1].goal_for += goalsTeam1;
      standings[team1].goal_against += goalsTeam2;
      standings[team2].goal_for += goalsTeam2;
      standings[team2].goal_against += goalsTeam1;
      
      // Update win/draw/loss and points
      if (goalsTeam1 > goalsTeam2) {
        // Team 1 wins
        standings[team1].won++;
        standings[team1].points += 3; // 3 points for win
        standings[team2].lost++;
        // Team 2 gets 0 points for loss
      } else if (goalsTeam1 < goalsTeam2) {
        // Team 2 wins
        standings[team2].won++;
        standings[team2].points += 3; // 3 points for win
        standings[team1].lost++;
        // Team 1 gets 0 points for loss
      } else {
        // Draw
        standings[team1].draw++;
        standings[team2].draw++;
        standings[team1].points += 1; // 1 point for draw
        standings[team2].points += 1; // 1 point for draw
      }
    });
    
    // Update the database with new standings
    for (const teamId of teamIds) {
      const stats = standings[teamId];
      
      // Calculate goal difference
      const goalDiff = stats.goal_for - stats.goal_against;
      
      const { error: updateError } = await supabase
        .from('tournament_team')
        .update({
          match_played: stats.match_played,
          won: stats.won,
          draw: stats.draw,
          lost: stats.lost,
          goal_for: stats.goal_for,
          goal_against: stats.goal_against,
          goal_diff: goalDiff,
          points: stats.points
        })
        .match({ tr_id: tournamentId, team_id: teamId });
      
      if (updateError) {
        console.error(`Error updating standings for team ${teamId} in tournament ${tournamentId}:`, updateError);
      }
    }
    
    // Update group positions
    await updateGroupPositions(tournamentId);
    
    console.log(`Standings calculated successfully for tournament ${tournamentId}`);
    return true;
  } catch (error) {
    console.error(`Error calculating standings for tournament ${tournamentId}:`, error);
    return false;
  }
}

/**
 * Update the group positions for teams in a tournament based on points, goal difference, goals scored
 */
async function updateGroupPositions(tournamentId: number): Promise<void> {
  try {
    // Get all teams in this tournament with their groups
    const { data: teams, error: teamsError } = await supabase
      .from('tournament_team')
      .select('*')
      .eq('tr_id', tournamentId);
    
    if (teamsError || !teams) {
      console.error(`Error fetching teams for position update in tournament ${tournamentId}:`, teamsError);
      return;
    }
    
    // Group teams by their group
    const groupedTeams: Record<string, TournamentTeam[]> = {};
    teams.forEach(team => {
      if (!groupedTeams[team.team_group]) {
        groupedTeams[team.team_group] = [];
      }
      groupedTeams[team.team_group].push(team as TournamentTeam);
    });
    
    // For each group, sort teams and update their positions
    for (const group in groupedTeams) {
      const teamsInGroup = groupedTeams[group];
      
      // Sort teams by: points (desc), goal diff (desc), goals for (desc)
      const sortedTeams = teamsInGroup.sort((a, b) => {
        // First by points
        if (b.points !== a.points) return b.points - a.points;
        // Then by goal difference
        if (b.goal_diff !== a.goal_diff) return b.goal_diff - a.goal_diff;
        // Then by goals scored
        if (b.goal_for !== a.goal_for) return b.goal_for - a.goal_for;
        // If still tied, alphabetically by name (as a fallback)
        return a.team_name.localeCompare(b.team_name);
      });
      
      // Update positions
      for (let i = 0; i < sortedTeams.length; i++) {
        const team = sortedTeams[i];
        const position = i + 1; // Positions start from 1
        
        // Update the team's position in the database
        const { error: updateError } = await supabase
          .from('tournament_team')
          .update({ group_position: position })
          .match({ tr_id: tournamentId, team_id: team.team_id });
        
        if (updateError) {
          console.error(`Error updating position for team ${team.team_id} in tournament ${tournamentId}:`, updateError);
        }
      }
    }
    
    console.log(`Group positions updated for tournament ${tournamentId}`);
  } catch (error) {
    console.error(`Error updating group positions for tournament ${tournamentId}:`, error);
  }
}
