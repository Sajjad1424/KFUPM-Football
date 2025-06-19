
export interface Tournament {
  tr_id: number;
  tr_name: string;
  start_date: string;
  end_date: string;
}

export interface Team {
  team_id: number;
  team_name: string;
}

export interface TournamentTeam extends Team {
  tr_id: number;
  team_group: string;
  match_played: number;
  won: number;
  draw: number;
  lost: number;
  goal_for: number;
  goal_against: number;
  goal_diff: number;
  points: number;
  group_position: number;
}

export interface Person {
  kfupm_id: number;
  name: string;
  date_of_birth?: string;
}

export interface Player extends Person {
  jersey_no: number;
  position_to_play: string;
}

export interface TeamPlayer {
  player_id: number;
  team_id: number;
  tr_id: number;
  player?: Player;
}

export interface Match {
  match_no: number;
  play_stage: string;
  play_date: string;
  team_id1: number;
  team_id2: number;
  results: string;
  decided_by: string;
  goal_score: string;
  venue_id: number;
  audience: number;
  player_of_match: number;
  stop1_sec: number;
  stop2_sec: number;
  team1?: Team;
  team2?: Team;
}

export interface Goal {
  goal_id: number;
  match_no: number;
  player_id: number;
  team_id: number;
  goal_time: number;
  goal_type: string;
  play_stage: string;
  goal_schedule: string;
  goal_half?: number;
  player?: Player;
  team?: Team;
}

export interface PlayerBooked {
  match_no: number;
  team_id: number;
  player_id: number;
  booking_time: number;
  sent_off?: string;
  play_schedule: string;
  play_half: number;
  player?: Player;
  team?: Team;
}

export interface Venue {
  venue_id: number;
  venue_name: string;
  venue_status: string;
  venue_capacity: number;
}

export interface User {
  id: string;
  email: string;
  isAdmin: boolean;
}
