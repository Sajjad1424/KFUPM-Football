
export type TeamMember = {
  id: number;
  name: string;
  role: string;
  jersey?: number;
  position?: string;
  dateOfBirth?: string | null;
  type?: string;
};

export type TeamMembers = {
  players: TeamMember[];
  staff: TeamMember[];
};

export type TeamMemberChanges = {
  playersToAdd: TeamMember[];
  staffToAdd: TeamMember[];
  playersToRemove: number[];
  staffToRemove: number[];
};
