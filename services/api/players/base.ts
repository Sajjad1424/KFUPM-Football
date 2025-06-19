
import { Player, TeamPlayer } from '@/types';
import { supabase } from '@/lib/supabase';

/**
 * Get all players
 * @returns Array of all players
 */
export async function getPlayers(): Promise<Player[]> {
  try {
    console.log("Fetching players from database...");
    // First, get all players
    const { data: playerData, error: playerError } = await supabase
      .from('player')
      .select('*');
    
    if (playerError) {
      console.error('Error fetching players:', playerError);
      return [];
    }

    // Then, get all persons
    const { data: personData, error: personError } = await supabase
      .from('person')
      .select('*');
    
    if (personError) {
      console.error('Error fetching persons:', personError);
      return [];
    }

    console.log("Player data:", playerData);
    console.log("Person data:", personData);

    // Map player data with person data
    const players = playerData.map(player => {
      // Find matching person by kfupm_id if there's a relationship
      const person = personData.find(p => p.kfupm_id === player.player_id);
      
      return {
        player_id: player.player_id,
        jersey_no: player.jersey_no,
        position_to_play: player.position_to_play,
        kfupm_id: person?.kfupm_id || player.player_id,
        name: person?.name || "Unknown",
        date_of_birth: person?.date_of_birth || null
      } as Player;
    });

    console.log("Merged player data:", players);
    return players;
  } catch (error) {
    console.error('Exception in getPlayers:', error);
    return [];
  }
}

/**
 * Get player by ID
 * @param playerId Player ID to retrieve
 * @returns Player object or null if not found
 */
export async function getPlayerById(playerId: number): Promise<Player | null> {
  try {
    // Get player data
    const { data: player, error: playerError } = await supabase
      .from('player')
      .select('*')
      .eq('player_id', playerId)
      .single();
    
    if (playerError) {
      console.error(`Error fetching player ${playerId}:`, playerError);
      return null;
    }
    
    // Get person data
    const { data: person, error: personError } = await supabase
      .from('person')
      .select('*')
      .eq('kfupm_id', playerId)
      .maybeSingle();
    
    if (personError) {
      console.error(`Error fetching person for player ${playerId}:`, personError);
    }
    
    return {
      player_id: player.player_id,
      jersey_no: player.jersey_no,
      position_to_play: player.position_to_play,
      kfupm_id: person?.kfupm_id || player.player_id,
      name: person?.name || "Unknown",
      date_of_birth: person?.date_of_birth || null
    } as Player;
  } catch (error) {
    console.error(`Exception in getPlayerById for player ${playerId}:`, error);
    return null;
  }
}

/**
 * Get players by team
 * @param teamId Team ID to filter players
 * @returns Array of players in the team
 */
export async function getPlayersByTeam(teamId: number): Promise<Player[]> {
  try {
    // Get team_player entries for the team
    const { data: teamPlayers, error: teamPlayersError } = await supabase
      .from('team_player')
      .select('player_id')
      .eq('team_id', teamId);
    
    if (teamPlayersError) {
      console.error(`Error fetching players for team ${teamId}:`, teamPlayersError);
      return [];
    }
    
    // Extract player IDs
    const playerIds = teamPlayers.map(tp => tp.player_id);
    
    if (playerIds.length === 0) {
      return [];
    }
    
    // Get player data
    const { data: playerData, error: playerError } = await supabase
      .from('player')
      .select('*')
      .in('player_id', playerIds);
    
    if (playerError) {
      console.error(`Error fetching player details for team ${teamId}:`, playerError);
      return [];
    }
    
    // Get person data for these players
    const { data: personData, error: personError } = await supabase
      .from('person')
      .select('*')
      .in('kfupm_id', playerIds);
    
    if (personError) {
      console.error(`Error fetching person details for team ${teamId}:`, personError);
    }
    
    // Map player data with person data
    return playerData.map(player => {
      const person = personData?.find(p => p.kfupm_id === player.player_id);
      
      return {
        player_id: player.player_id,
        jersey_no: player.jersey_no,
        position_to_play: player.position_to_play,
        kfupm_id: person?.kfupm_id || player.player_id,
        name: person?.name || "Unknown",
        date_of_birth: person?.date_of_birth || null
      } as Player;
    });
  } catch (error) {
    console.error(`Exception in getPlayersByTeam for team ${teamId}:`, error);
    return [];
  }
}

/**
 * Get players by tournament
 * @param tournamentId Tournament ID to filter players
 * @returns Array of players in the tournament
 */
export async function getPlayersByTournament(tournamentId: number): Promise<Player[]> {
  try {
    // Get team_player entries for the tournament
    const { data: tournamentPlayers, error: tournamentPlayersError } = await supabase
      .from('team_player')
      .select('player_id')
      .eq('tr_id', tournamentId);
    
    if (tournamentPlayersError) {
      console.error(`Error fetching players for tournament ${tournamentId}:`, tournamentPlayersError);
      return [];
    }
    
    // Extract player IDs
    const playerIds = tournamentPlayers.map(tp => tp.player_id);
    
    if (playerIds.length === 0) {
      return [];
    }
    
    // Get player data
    const { data: playerData, error: playerError } = await supabase
      .from('player')
      .select('*')
      .in('player_id', playerIds);
    
    if (playerError) {
      console.error(`Error fetching player details for tournament ${tournamentId}:`, playerError);
      return [];
    }
    
    // Get person data for these players
    const { data: personData, error: personError } = await supabase
      .from('person')
      .select('*')
      .in('kfupm_id', playerIds);
    
    if (personError) {
      console.error(`Error fetching person details for tournament ${tournamentId}:`, personError);
    }
    
    // Map player data with person data
    return playerData.map(player => {
      const person = personData?.find(p => p.kfupm_id === player.player_id);
      
      return {
        player_id: player.player_id,
        jersey_no: player.jersey_no,
        position_to_play: player.position_to_play,
        kfupm_id: person?.kfupm_id || player.player_id,
        name: person?.name || "Unknown",
        date_of_birth: person?.date_of_birth || null
      } as Player;
    });
  } catch (error) {
    console.error(`Exception in getPlayersByTournament for tournament ${tournamentId}:`, error);
    return [];
  }
}
