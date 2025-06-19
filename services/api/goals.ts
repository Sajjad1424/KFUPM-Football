
import { Goal } from '@/types';
import { supabase } from '@/lib/supabase';

/**
 * Get goals for a specific match
 * @param matchId Match ID to retrieve goals for
 * @returns Array of goals scored in the match
 */
export async function getGoalsByMatch(matchId: number): Promise<Goal[]> {
  try {
    const { data, error } = await supabase
      .from('goal_details')
      .select(`
        *,
        player:player_id (
          player_id,
          jersey_no,
          position_to_play,
          person:person_id (
            kfupm_id,
            name
          )
        ),
        team:team_id (
          team_id,
          team_name
        )
      `)
      .eq('match_no', matchId);
    
    if (error) {
      console.error(`Error fetching goals for match ${matchId}:`, error);
      return [];
    }
    
    const goals: Goal[] = data.map(goal => ({
      goal_id: goal.goal_id,
      match_no: goal.match_no,
      player_id: goal.player_id,
      team_id: goal.team_id,
      goal_time: goal.goal_time,
      goal_type: goal.goal_type,
      play_stage: goal.play_stage,
      goal_schedule: goal.goal_schedule,
      goal_half: goal.goal_half,
      player: goal.player ? {
        player_id: goal.player.player_id,
        jersey_no: goal.player.jersey_no,
        position_to_play: goal.player.position_to_play,
        name: goal.player.person?.[0]?.name,
        kfupm_id: goal.player.person?.[0]?.kfupm_id
      } : undefined,
      team: goal.team ? {
        team_id: goal.team.team_id,
        team_name: goal.team.team_name
      } : undefined
    }));
    
    return goals;
  } catch (error) {
    console.error(`Exception in getGoalsByMatch for match ${matchId}:`, error);
    return [];
  }
}
