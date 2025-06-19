
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getTeams } from '@/services/api/teams';
import { getTeamMembers } from '@/services/api/teamMembers';
import { Team } from '@/types';
import { TeamMembers, TeamMemberChanges } from '@/types/team-management';
import { supabase } from '@/lib/supabase';

export const useTeamManagement = () => {
  const { toast } = useToast();
  
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMembers>({
    players: [],
    staff: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Track changes for batch submission
  const [pendingChanges, setPendingChanges] = useState<TeamMemberChanges>({
    playersToAdd: [],
    staffToAdd: [],
    playersToRemove: [],
    staffToRemove: []
  });
  
  // Dialog states
  const [addPlayerDialog, setAddPlayerDialog] = useState(false);
  const [addStaffDialog, setAddStaffDialog] = useState(false);
  const [removingMemberId, setRemovingMemberId] = useState<number | null>(null);
  
  // Form states
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerId, setNewPlayerId] = useState('');
  const [newPlayerPosition, setNewPlayerPosition] = useState('FW');
  const [newPlayerJersey, setNewPlayerJersey] = useState('');
  
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffId, setNewStaffId] = useState('');
  const [newStaffRole, setNewStaffRole] = useState('Coach');
  
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setIsLoading(true);
        const teamsData = await getTeams();
        setTeams(teamsData);
        
        // Select first team by default
        if (teamsData.length > 0) {
          setSelectedTeam(teamsData[0].team_id);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
        toast({
          title: "Error",
          description: "Failed to load teams data",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTeams();
  }, [toast]);
  
  useEffect(() => {
    const fetchTeamMembers = async () => {
      if (!selectedTeam) return;
      
      try {
        setIsLoading(true);
        const membersData = await getTeamMembers(selectedTeam);
        setTeamMembers(membersData);
        
        // Reset pending changes when switching teams
        setPendingChanges({
          playersToAdd: [],
          staffToAdd: [],
          playersToRemove: [],
          staffToRemove: []
        });
      } catch (error) {
        console.error("Error fetching team members:", error);
        toast({
          title: "Error",
          description: "Failed to load team members",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTeamMembers();
  }, [selectedTeam, toast]);
  
  const handleTeamChange = (value: string) => {
    // Check for unsaved changes before switching teams
    if (hasUnsavedChanges()) {
      if (window.confirm("You have unsaved changes. Do you want to discard them?")) {
        setSelectedTeam(Number(value));
      }
    } else {
      setSelectedTeam(Number(value));
    }
  };
  
  const hasUnsavedChanges = () => {
    return (
      pendingChanges.playersToAdd.length > 0 ||
      pendingChanges.staffToAdd.length > 0 ||
      pendingChanges.playersToRemove.length > 0 ||
      pendingChanges.staffToRemove.length > 0
    );
  };
  
  const handleAddPlayer = () => {
    if (!newPlayerName || !newPlayerId || !newPlayerJersey || !newPlayerPosition) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Create new player object
    const newPlayer = {
      id: Number(newPlayerId),
      name: newPlayerName,
      role: 'Player',
      jersey: Number(newPlayerJersey),
      position: newPlayerPosition,
      dateOfBirth: null
    };
    
    // Add to pending changes
    setPendingChanges(prev => ({
      ...prev,
      playersToAdd: [...prev.playersToAdd, newPlayer]
    }));
    
    // Add to UI immediately for visual feedback
    setTeamMembers(prev => ({
      ...prev,
      players: [...prev.players, newPlayer]
    }));
    
    // Reset form and close dialog
    setNewPlayerName('');
    setNewPlayerId('');
    setNewPlayerPosition('FW');
    setNewPlayerJersey('');
    setAddPlayerDialog(false);
    
    toast({
      title: "Player added",
      description: "Remember to save changes to commit to database",
    });
  };
  
  const handleAddStaff = () => {
    if (!newStaffName || !newStaffId || !newStaffRole) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Create new staff object
    const newStaff = {
      id: Number(newStaffId),
      name: newStaffName,
      role: newStaffRole,
      type: 'staff'
    };
    
    // Add to pending changes
    setPendingChanges(prev => ({
      ...prev,
      staffToAdd: [...prev.staffToAdd, newStaff]
    }));
    
    // Add to UI immediately for visual feedback
    setTeamMembers(prev => ({
      ...prev,
      staff: [...prev.staff, newStaff]
    }));
    
    // Reset form and close dialog
    setNewStaffName('');
    setNewStaffId('');
    setNewStaffRole('Coach');
    setAddStaffDialog(false);
    
    toast({
      title: "Staff member added",
      description: "Remember to save changes to commit to database",
    });
  };
  
  const handleRemoveMember = (id: number, isPlayer: boolean) => {
    setRemovingMemberId(id);
    
    // Add to removal list
    if (isPlayer) {
      setPendingChanges(prev => ({
        ...prev,
        playersToRemove: [...prev.playersToRemove, id]
      }));
      
      // Remove from UI immediately
      setTeamMembers(prev => ({
        ...prev,
        players: prev.players.filter(player => player.id !== id)
      }));
    } else {
      setPendingChanges(prev => ({
        ...prev,
        staffToRemove: [...prev.staffToRemove, id]
      }));
      
      // Remove from UI immediately
      setTeamMembers(prev => ({
        ...prev,
        staff: prev.staff.filter(staff => staff.id !== id)
      }));
    }
    
    setRemovingMemberId(null);
    
    toast({
      title: "Member removed",
      description: "Remember to save changes to commit to database",
    });
  };
  
  const saveChanges = async () => {
    if (!selectedTeam) return;
    
    setIsSaving(true);
    
    try {
      // Process player additions
      for (const player of pendingChanges.playersToAdd) {
        console.log(`Adding player ${player.id} to team ${selectedTeam}`);
        
        // First ensure person exists
        const { error: personError } = await supabase
          .from('person')
          .upsert({
            kfupm_id: player.id,
            name: player.name,
            date_of_birth: player.dateOfBirth || null
          });
          
        if (personError) {
          console.error('Error creating person:', personError);
          throw personError;
        }
        
        // Then create player record
        const { error: playerError } = await supabase
          .from('player')
          .upsert({
            player_id: player.id,
            jersey_no: player.jersey,
            position_to_play: player.position
          });
          
        if (playerError) {
          console.error('Error creating player:', playerError);
          throw playerError;
        }
        
        // Finally, link player to team
        const { error: teamPlayerError } = await supabase
          .from('team_player')
          .insert({
            player_id: player.id,
            team_id: selectedTeam,
            tr_id: 1 // Assuming a default tournament ID 1, adjust as needed
          });
          
        if (teamPlayerError) {
          console.error('Error linking player to team:', teamPlayerError);
          throw teamPlayerError;
        }
      }
      
      // Process staff additions
      for (const staff of pendingChanges.staffToAdd) {
        console.log(`Adding staff ${staff.id} to team ${selectedTeam}`);
        
        // First ensure person exists
        const { error: personError } = await supabase
          .from('person')
          .upsert({
            kfupm_id: staff.id,
            name: staff.name
          });
          
        if (personError) {
          console.error('Error creating person:', personError);
          throw personError;
        }
        
        // Then link staff to team
        const { error: teamSupportError } = await supabase
          .from('team_support')
          .insert({
            support_id: staff.id,
            team_id: selectedTeam,
            support_type: staff.role.charAt(0), // Use first letter as type code
            tr_id: 1 // Assuming a default tournament ID 1, adjust as needed
          });
          
        if (teamSupportError) {
          console.error('Error linking staff to team:', teamSupportError);
          throw teamSupportError;
        }
      }
      
      // Process player removals
      for (const playerId of pendingChanges.playersToRemove) {
        console.log(`Removing player ${playerId} from team ${selectedTeam}`);
        
        const { error } = await supabase
          .from('team_player')
          .delete()
          .eq('player_id', playerId)
          .eq('team_id', selectedTeam);
          
        if (error) {
          console.error('Error removing player from team:', error);
          throw error;
        }
      }
      
      // Process staff removals
      for (const staffId of pendingChanges.staffToRemove) {
        console.log(`Removing staff ${staffId} from team ${selectedTeam}`);
        
        const { error } = await supabase
          .from('team_support')
          .delete()
          .eq('support_id', staffId)
          .eq('team_id', selectedTeam);
          
        if (error) {
          console.error('Error removing staff from team:', error);
          throw error;
        }
      }
      
      // Reset pending changes after successful save
      setPendingChanges({
        playersToAdd: [],
        staffToAdd: [],
        playersToRemove: [],
        staffToRemove: []
      });
      
      toast({
        title: "Success",
        description: "All changes saved to database"
      });
      
      // Refresh team members from database to ensure UI reflects actual state
      const membersData = await getTeamMembers(selectedTeam);
      setTeamMembers(membersData);
      
    } catch (error) {
      console.error("Error saving changes:", error);
      toast({
        title: "Error",
        description: "Failed to save some changes to database",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return {
    teams,
    selectedTeam,
    teamMembers,
    isLoading,
    isSaving,
    hasUnsavedChanges,
    addPlayerDialog,
    setAddPlayerDialog,
    addStaffDialog,
    setAddStaffDialog,
    removingMemberId,
    newPlayerName,
    setNewPlayerName,
    newPlayerId,
    setNewPlayerId,
    newPlayerPosition,
    setNewPlayerPosition,
    newPlayerJersey,
    setNewPlayerJersey,
    newStaffName,
    setNewStaffName,
    newStaffId,
    setNewStaffId,
    newStaffRole,
    setNewStaffRole,
    handleTeamChange,
    handleAddPlayer,
    handleAddStaff,
    handleRemoveMember,
    saveChanges
  };
};
