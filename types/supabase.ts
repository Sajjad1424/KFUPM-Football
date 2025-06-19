
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      tournaments: {
        Row: {
          tr_id: number
          tr_name: string
          start_date: string
          end_date: string
        }
        Insert: {
          tr_id?: number
          tr_name: string
          start_date: string
          end_date: string
        }
        Update: {
          tr_id?: number
          tr_name?: string
          start_date?: string
          end_date?: string
        }
      }
      teams: {
        Row: {
          team_id: number
          team_name: string
        }
        Insert: {
          team_id?: number
          team_name: string
        }
        Update: {
          team_id?: number
          team_name?: string
        }
      }
      tournament_teams: {
        Row: {
          team_id: number
          tr_id: number
          team_group: string
          match_played: number
          won: number
          draw: number
          lost: number
          goal_for: number
          goal_against: number
          goal_diff: number
          points: number
          group_position: number
        }
        Insert: {
          team_id: number
          tr_id: number
          team_group: string
          match_played?: number
          won?: number
          draw?: number
          lost?: number
          goal_for?: number
          goal_against?: number
          goal_diff?: number
          points?: number
          group_position?: number
        }
        Update: {
          team_id?: number
          tr_id?: number
          team_group?: string
          match_played?: number
          won?: number
          draw?: number
          lost?: number
          goal_for?: number
          goal_against?: number
          goal_diff?: number
          points?: number
          group_position?: number
        }
      }
      players: {
        Row: {
          kfupm_id: number
          name: string
          jersey_no: number
          position_to_play: string
          date_of_birth: string
        }
        Insert: {
          kfupm_id: number
          name: string
          jersey_no: number
          position_to_play: string
          date_of_birth: string
        }
        Update: {
          kfupm_id?: number
          name?: string
          jersey_no?: number
          position_to_play?: string
          date_of_birth?: string
        }
      }
      team_players: {
        Row: {
          player_id: number
          team_id: number
          tr_id: number
        }
        Insert: {
          player_id: number
          team_id: number
          tr_id: number
        }
        Update: {
          player_id?: number
          team_id?: number
          tr_id?: number
        }
      }
      matches: {
        Row: {
          match_no: number
          play_stage: string
          play_date: string
          team_id1: number
          team_id2: number
          results: string
          decided_by: string
          goal_score: string
          venue_id: number
          audience: number
          player_of_match: number
          stop1_sec: number
          stop2_sec: number
        }
        Insert: {
          match_no?: number
          play_stage: string
          play_date: string
          team_id1: number
          team_id2: number
          results: string
          decided_by: string
          goal_score: string
          venue_id: number
          audience: number
          player_of_match: number
          stop1_sec: number
          stop2_sec: number
        }
        Update: {
          match_no?: number
          play_stage?: string
          play_date?: string
          team_id1?: number
          team_id2?: number
          results?: string
          decided_by?: string
          goal_score?: string
          venue_id?: number
          audience?: number
          player_of_match?: number
          stop1_sec?: number
          stop2_sec?: number
        }
      }
      goals: {
        Row: {
          goal_id: number
          match_no: number
          player_id: number
          team_id: number
          goal_time: number
          goal_type: string
          play_stage: string
          goal_schedule: string
          goal_half?: number
        }
        Insert: {
          goal_id?: number
          match_no: number
          player_id: number
          team_id: number
          goal_time: number
          goal_type: string
          play_stage: string
          goal_schedule: string
          goal_half?: number
        }
        Update: {
          goal_id?: number
          match_no?: number
          player_id?: number
          team_id?: number
          goal_time?: number
          goal_type?: string
          play_stage?: string
          goal_schedule?: string
          goal_half?: number
        }
      }
      red_cards: {
        Row: {
          team_id: number
          team_name: string
          player_id: number
          name: string
        }
        Insert: {
          team_id: number
          team_name: string
          player_id: number
          name: string
        }
        Update: {
          team_id?: number
          team_name?: string
          player_id?: number
          name?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
