
import { supabase } from '@/lib/supabase';

/**
 * Get all members associated with a team including manager, coach, captain and players
 */
export async function getTeamMembers(teamId: number) {
  try {
    console.log(`Fetching team members for team ID ${teamId}...`);
    
    // Get player IDs for this team first
    const { data: teamPlayerData, error: teamPlayerError } = await supabase
      .from('team_player')
      .select('player_id')
      .eq('team_id', teamId);
      
    if (teamPlayerError) {
      console.error('Error fetching team player IDs:', teamPlayerError);
      throw teamPlayerError;
    }
    
    const playerIds = teamPlayerData?.map(p => p.player_id) || [];
    
    // Get regular players only if we have player IDs
    let players = [];
    if (playerIds.length > 0) {
      // First get player data
      const { data: playersData, error: playersError } = await supabase
        .from('player')
        .select(`
          player_id,
          jersey_no,
          position_to_play
        `)
        .in('player_id', playerIds);
      
      if (playersError) {
        console.error('Error fetching team players:', playersError);
        throw playersError;
      }
      
      // Then get person data separately
      const { data: personData, error: personError } = await supabase
        .from('person')
        .select('kfupm_id, name, date_of_birth')
        .in('kfupm_id', playerIds);
        
      if (personError) {
        console.error('Error fetching person data:', personError);
      }
      
      // Merge player data with person data
      players = playersData?.map(player => {
        const person = personData?.find(p => p.kfupm_id === player.player_id) || null;
        return {
          ...player,
          person: person ? { name: person.name, date_of_birth: person.date_of_birth } : null
        };
      }) || [];
    }
    
    // Get team captain
    const { data: captainData, error: captainError } = await supabase
      .from('match_captain')
      .select('player_captain')
      .eq('team_id', teamId)
      .limit(1);
    
    if (captainError) {
      console.error('Error fetching team captain:', captainError);
    }

    let captain = null;
    if (captainData && captainData.length > 0) {
      const captainId = captainData[0].player_captain;
      
      // Get captain player data
      const { data: captainPlayerData, error: captainPlayerError } = await supabase
        .from('player')
        .select('player_id, jersey_no, position_to_play')
        .eq('player_id', captainId)
        .single();
        
      if (captainPlayerError) {
        console.error('Error fetching captain player data:', captainPlayerError);
      }
      
      // Get captain person data
      if (captainPlayerData) {
        const { data: captainPersonData, error: captainPersonError } = await supabase
          .from('person')
          .select('name, date_of_birth')
          .eq('kfupm_id', captainId)
          .maybeSingle();
          
        if (captainPersonError) {
          console.error('Error fetching captain person data:', captainPersonError);
        }
        
        captain = {
          ...captainPlayerData,
          person: captainPersonData
        };
      }
    }

    // Get support staff (coach, manager, etc.)
    const { data: staffData, error: staffError } = await supabase
      .from('team_support')
      .select(`
        support_id,
        support_type
      `)
      .eq('team_id', teamId);

    if (staffError) {
      console.error('Error fetching team support staff:', staffError);
    }
    
    // Get support staff person data and support descriptions
    const staffMembers = [];
    if (staffData && staffData.length > 0) {
      for (const staff of staffData) {
        // Get person data for this staff member
        const { data: staffPersonData, error: staffPersonError } = await supabase
          .from('person')
          .select('name')
          .eq('kfupm_id', staff.support_id)
          .maybeSingle();
          
        if (staffPersonError) {
          console.error('Error fetching staff person data:', staffPersonError);
        }
        
        // Get support type description
        const { data: supportTypeData, error: supportTypeError } = await supabase
          .from('support')
          .select('support_desc')
          .eq('support_type', staff.support_type)
          .maybeSingle();
          
        if (supportTypeError) {
          console.error('Error fetching support type data:', supportTypeError);
        }
        
        staffMembers.push({
          support_id: staff.support_id,
          support_type: staff.support_type,
          name: staffPersonData?.name || `Staff #${staff.support_id}`,
          support_desc: supportTypeData?.support_desc || staff.support_type
        });
      }
    }

    // Format and return all team members
    const formattedPlayers = players.map(player => {
      return {
        id: player.player_id,
        name: player.person ? player.person.name : `Player #${player.player_id}`,
        role: 'Player',
        jersey: player.jersey_no,
        position: player.position_to_play,
        dateOfBirth: player.person ? player.person.date_of_birth : null
      };
    });

    let formattedCaptain = null;
    if (captain) {
      formattedCaptain = {
        id: captain.player_id,
        name: captain.person ? captain.person.name : `Player #${captain.player_id}`,
        role: 'Captain',
        jersey: captain.jersey_no,
        position: captain.position_to_play,
        dateOfBirth: captain.person ? captain.person.date_of_birth : null
      };
    }

    // If the captain exists in players list, update their role
    if (formattedCaptain) {
      const existingPlayerIndex = formattedPlayers.findIndex(p => p.id === formattedCaptain.id);
      if (existingPlayerIndex >= 0) {
        formattedPlayers[existingPlayerIndex].role = 'Captain';
      } else {
        formattedPlayers.push(formattedCaptain);
      }
    }

    const formattedStaff = staffMembers.map(staff => {
      return {
        id: staff.support_id,
        name: staff.name,
        role: staff.support_desc,
        type: 'staff'
      };
    });

    return {
      players: formattedPlayers,
      staff: formattedStaff
    };
  } catch (error) {
    console.error('Exception in getTeamMembers:', error);
    throw error;
  }
}
