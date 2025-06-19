
import { supabase } from '@/lib/supabase';

/**
 * Get top goal scorers
 * @returns Array of players with their goal counts
 */
export async function getTopGoalScorers(limit: number = 10) {
  try {
    console.log('Fetching top goal scorers with limit:', limit);
    
    // Query the goal_details table directly to count goals by player
    const { data: goalData, error: goalError } = await supabase
      .from('goal_details')
      .select('player_id');
    
    if (goalError) {
      console.error('Error fetching goal data:', goalError);
      return [];
    }

    // Count goals per player manually
    const goalCounts: Record<number, number> = {};
    goalData.forEach(goal => {
      goalCounts[goal.player_id] = (goalCounts[goal.player_id] || 0) + 1;
    });

    // Convert to array and sort
    const playerIds = Object.keys(goalCounts).map(Number);
    
    console.log('Player IDs with goals:', playerIds);
    
    // Get player information for each player with goals
    const playersWithNames = await Promise.all(
      playerIds.map(async (playerId) => {
        // Get person data directly using kfupm_id (which is the player_id)
        const { data: personData } = await supabase
          .from('person')
          .select('name')
          .eq('kfupm_id', playerId)
          .single();

        return {
          player_id: playerId,
          name: personData?.name || `Player ${playerId}`,
          goal_count: goalCounts[playerId]
        };
      })
    );

    // Sort by goal count (descending)
    const sortedPlayers = playersWithNames
      .filter(Boolean)
      .sort((a, b) => b.goal_count - a.goal_count)
      .slice(0, limit);
    
    console.log('Returning top scorers:', sortedPlayers);
    
    return sortedPlayers;
  } catch (error) {
    console.error('Exception in getTopGoalScorers:', error);
    return [];
  }
}
