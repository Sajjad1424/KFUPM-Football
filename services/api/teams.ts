
import { Team } from '@/types';
import { supabase } from '@/lib/supabase';

export async function getTeams(): Promise<Team[]> {
  try {
    console.log("Fetching teams data...");
    const { data, error } = await supabase
      .from('team')
      .select('*');
    
    if (error) {
      console.error('Error fetching teams:', error);
      throw error;
    }
    
    console.log("Teams data received:", data);
    return data || [];
  } catch (error) {
    console.error('Exception in getTeams:', error);
    return [];
  }
}

export async function getTeamDetails(teamId: number): Promise<Team> {
  try {
    console.log(`Fetching team details for ID ${teamId}...`);
    const { data, error } = await supabase
      .from('team')
      .select('*')
      .eq('team_id', teamId)
      .single();
    
    if (error) {
      console.error(`Error fetching team ${teamId}:`, error);
      throw new Error(`Team with ID ${teamId} not found`);
    }
    
    console.log(`Team ${teamId} details:`, data);
    return data;
  } catch (error) {
    console.error(`Exception in getTeamDetails for team ${teamId}:`, error);
    throw error;
  }
}

export async function addTeam(teamName: string): Promise<Team> {
  try {
    console.log(`Adding new team: ${teamName}`);

    // Get the highest existing team_id
    const { data: maxIdData, error: maxIdError } = await supabase
      .from('team')
      .select('team_id')
      .order('team_id', { ascending: false })
      .limit(1);
    
    if (maxIdError) {
      console.error('Error fetching max team ID:', maxIdError);
      throw maxIdError;
    }

    // Calculate the new team_id
    const nextId = maxIdData && maxIdData.length > 0 ? maxIdData[0].team_id + 1 : 1;
    
    const newTeam = {
      team_id: nextId,
      team_name: teamName
    };
    
    const { data, error } = await supabase
      .from('team')
      .insert(newTeam)
      .select()
      .single();
      
    if (error) {
      console.error('Error adding new team:', error);
      throw error;
    }
    
    console.log("Team added successfully:", data);
    return data;
  } catch (error) {
    console.error('Exception in addTeam:', error);
    throw error;
  }
}
