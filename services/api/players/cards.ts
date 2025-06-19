
import { supabase } from "@/lib/supabase";

export interface PlayerWithCards {
  player_id: number;
  name: string;
  red_cards?: number;
  yellow_cards?: number;
  team_name?: string;
  yellow_count?: number; // For compatibility
  red_count?: number; // For compatibility
}

/**
 * Get players with red cards
 */
export async function getPlayersWithRedCards(): Promise<PlayerWithCards[]> {
  const { data, error } = await supabase
    .from('player_booked')
    .select(`
      player_id,
      person:kfupm_id(name)
    `)
    .eq('sent_off', 'Y');

  if (error) {
    console.error("Error fetching players with red cards:", error);
    return [];
  }

  // Group by player_id and count red cards
  const playerMap = new Map<number, PlayerWithCards>();
  
  data?.forEach(item => {
    const playerId = item.player_id;
    // Handle the case where person might be null or an array
    let playerName = 'Unknown';
    if (item.person && typeof item.person === 'object') {
      // If it's an object with name property
      playerName = (item.person as any).name || 'Unknown';
    }
    
    if (playerMap.has(playerId)) {
      const player = playerMap.get(playerId)!;
      player.red_cards = (player.red_cards || 0) + 1;
      player.red_count = (player.red_count || 0) + 1; // For compatibility
    } else {
      playerMap.set(playerId, {
        player_id: playerId,
        name: playerName,
        red_cards: 1,
        red_count: 1 // For compatibility
      });
    }
  });
  
  return Array.from(playerMap.values());
}

/**
 * Get players with yellow cards
 */
export async function getPlayersWithYellowCards(): Promise<PlayerWithCards[]> {
  const { data, error } = await supabase
    .from('player_booked')
    .select(`
      player_id,
      person:kfupm_id(name)
    `)
    .eq('sent_off', 'N');

  if (error) {
    console.error("Error fetching players with yellow cards:", error);
    return [];
  }

  // Group by player_id and count yellow cards
  const playerMap = new Map<number, PlayerWithCards>();
  
  data?.forEach(item => {
    const playerId = item.player_id;
    // Handle the case where person might be null or an array
    let playerName = 'Unknown';
    if (item.person && typeof item.person === 'object') {
      // If it's an object with name property
      playerName = (item.person as any).name || 'Unknown';
    }
    
    if (playerMap.has(playerId)) {
      const player = playerMap.get(playerId)!;
      player.yellow_cards = (player.yellow_cards || 0) + 1;
      player.yellow_count = (player.yellow_count || 0) + 1; // For compatibility
    } else {
      playerMap.set(playerId, {
        player_id: playerId,
        name: playerName,
        yellow_cards: 1,
        yellow_count: 1 // For compatibility
      });
    }
  });
  
  return Array.from(playerMap.values());
}
