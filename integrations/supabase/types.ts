export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      goal_details: {
        Row: {
          goal_half: number | null
          goal_id: number
          goal_schedule: string
          goal_time: number
          goal_type: string
          match_no: number
          play_stage: string
          player_id: number
          team_id: number
        }
        Insert: {
          goal_half?: number | null
          goal_id: number
          goal_schedule: string
          goal_time: number
          goal_type: string
          match_no: number
          play_stage: string
          player_id: number
          team_id: number
        }
        Update: {
          goal_half?: number | null
          goal_id?: number
          goal_schedule?: string
          goal_time?: number
          goal_type?: string
          match_no?: number
          play_stage?: string
          player_id?: number
          team_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "goal_details_match_no_fkey"
            columns: ["match_no"]
            isOneToOne: false
            referencedRelation: "match_played"
            referencedColumns: ["match_no"]
          },
          {
            foreignKeyName: "goal_details_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "player"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "goal_details_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["team_id"]
          },
        ]
      }
      match_captain: {
        Row: {
          match_no: number
          player_captain: number
          team_id: number
        }
        Insert: {
          match_no: number
          player_captain: number
          team_id: number
        }
        Update: {
          match_no?: number
          player_captain?: number
          team_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "match_captain_match_no_fkey"
            columns: ["match_no"]
            isOneToOne: false
            referencedRelation: "match_played"
            referencedColumns: ["match_no"]
          },
          {
            foreignKeyName: "match_captain_player_captain_fkey"
            columns: ["player_captain"]
            isOneToOne: false
            referencedRelation: "player"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "match_captain_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["team_id"]
          },
        ]
      }
      match_details: {
        Row: {
          decided_by: string
          goal_score: number
          match_no: number
          penalty_score: number | null
          player_gk: number
          team_id: number
          win_lose: string
        }
        Insert: {
          decided_by: string
          goal_score: number
          match_no: number
          penalty_score?: number | null
          player_gk: number
          team_id: number
          win_lose: string
        }
        Update: {
          decided_by?: string
          goal_score?: number
          match_no?: number
          penalty_score?: number | null
          player_gk?: number
          team_id?: number
          win_lose?: string
        }
        Relationships: [
          {
            foreignKeyName: "match_details_match_no_fkey"
            columns: ["match_no"]
            isOneToOne: false
            referencedRelation: "match_played"
            referencedColumns: ["match_no"]
          },
          {
            foreignKeyName: "match_details_player_gk_fkey"
            columns: ["player_gk"]
            isOneToOne: false
            referencedRelation: "player"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "match_details_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["team_id"]
          },
        ]
      }
      match_played: {
        Row: {
          audience: number
          decided_by: string
          goal_score: string
          match_no: number
          play_date: string
          play_stage: string
          player_of_match: number
          results: string
          stop1_sec: number
          stop2_sec: number
          team_id1: number
          team_id2: number
          venue_id: number
        }
        Insert: {
          audience: number
          decided_by: string
          goal_score: string
          match_no: number
          play_date: string
          play_stage: string
          player_of_match: number
          results: string
          stop1_sec: number
          stop2_sec: number
          team_id1: number
          team_id2: number
          venue_id: number
        }
        Update: {
          audience?: number
          decided_by?: string
          goal_score?: string
          match_no?: number
          play_date?: string
          play_stage?: string
          player_of_match?: number
          results?: string
          stop1_sec?: number
          stop2_sec?: number
          team_id1?: number
          team_id2?: number
          venue_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "match_played_player_of_match_fkey"
            columns: ["player_of_match"]
            isOneToOne: false
            referencedRelation: "player"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "match_played_team_id1_fkey"
            columns: ["team_id1"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["team_id"]
          },
          {
            foreignKeyName: "match_played_team_id2_fkey"
            columns: ["team_id2"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["team_id"]
          },
          {
            foreignKeyName: "match_played_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venue"
            referencedColumns: ["venue_id"]
          },
        ]
      }
      match_support: {
        Row: {
          match_no: number
          support_id: number
          support_type: string
        }
        Insert: {
          match_no: number
          support_id: number
          support_type: string
        }
        Update: {
          match_no?: number
          support_id?: number
          support_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "match_support_match_no_fkey"
            columns: ["match_no"]
            isOneToOne: false
            referencedRelation: "match_played"
            referencedColumns: ["match_no"]
          },
          {
            foreignKeyName: "match_support_support_id_fkey"
            columns: ["support_id"]
            isOneToOne: false
            referencedRelation: "person"
            referencedColumns: ["kfupm_id"]
          },
        ]
      }
      penalty_gk: {
        Row: {
          match_no: number
          player_gk: number
          team_id: number
        }
        Insert: {
          match_no: number
          player_gk: number
          team_id: number
        }
        Update: {
          match_no?: number
          player_gk?: number
          team_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "penalty_gk_match_no_fkey"
            columns: ["match_no"]
            isOneToOne: false
            referencedRelation: "match_played"
            referencedColumns: ["match_no"]
          },
          {
            foreignKeyName: "penalty_gk_player_gk_fkey"
            columns: ["player_gk"]
            isOneToOne: false
            referencedRelation: "player"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "penalty_gk_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["team_id"]
          },
        ]
      }
      penalty_shootout: {
        Row: {
          kick_id: number
          kick_no: number
          match_no: number
          player_id: number
          score_goal: string
          team_id: number
        }
        Insert: {
          kick_id: number
          kick_no: number
          match_no: number
          player_id: number
          score_goal: string
          team_id: number
        }
        Update: {
          kick_id?: number
          kick_no?: number
          match_no?: number
          player_id?: number
          score_goal?: string
          team_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "penalty_shootout_match_no_fkey"
            columns: ["match_no"]
            isOneToOne: false
            referencedRelation: "match_played"
            referencedColumns: ["match_no"]
          },
          {
            foreignKeyName: "penalty_shootout_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "player"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "penalty_shootout_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["team_id"]
          },
        ]
      }
      person: {
        Row: {
          date_of_birth: string | null
          kfupm_id: number
          name: string
        }
        Insert: {
          date_of_birth?: string | null
          kfupm_id: number
          name: string
        }
        Update: {
          date_of_birth?: string | null
          kfupm_id?: number
          name?: string
        }
        Relationships: []
      }
      player: {
        Row: {
          jersey_no: number
          player_id: number
          position_to_play: string
        }
        Insert: {
          jersey_no: number
          player_id: number
          position_to_play: string
        }
        Update: {
          jersey_no?: number
          player_id?: number
          position_to_play?: string
        }
        Relationships: [
          {
            foreignKeyName: "player_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: true
            referencedRelation: "person"
            referencedColumns: ["kfupm_id"]
          },
          {
            foreignKeyName: "player_position_to_play_fkey"
            columns: ["position_to_play"]
            isOneToOne: false
            referencedRelation: "playing_position"
            referencedColumns: ["position_id"]
          },
        ]
      }
      player_booked: {
        Row: {
          booking_time: number
          match_no: number
          play_half: number
          play_schedule: string
          player_id: number
          sent_off: string | null
          team_id: number
        }
        Insert: {
          booking_time: number
          match_no: number
          play_half: number
          play_schedule: string
          player_id: number
          sent_off?: string | null
          team_id: number
        }
        Update: {
          booking_time?: number
          match_no?: number
          play_half?: number
          play_schedule?: string
          player_id?: number
          sent_off?: string | null
          team_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "player_booked_match_no_fkey"
            columns: ["match_no"]
            isOneToOne: false
            referencedRelation: "match_played"
            referencedColumns: ["match_no"]
          },
          {
            foreignKeyName: "player_booked_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "player"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "player_booked_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["team_id"]
          },
        ]
      }
      player_in_out: {
        Row: {
          in_out: string
          match_no: number
          play_half: number
          play_schedule: string
          player_id: number
          team_id: number
          time_in_out: number
        }
        Insert: {
          in_out: string
          match_no: number
          play_half: number
          play_schedule: string
          player_id: number
          team_id: number
          time_in_out: number
        }
        Update: {
          in_out?: string
          match_no?: number
          play_half?: number
          play_schedule?: string
          player_id?: number
          team_id?: number
          time_in_out?: number
        }
        Relationships: [
          {
            foreignKeyName: "player_in_out_match_no_fkey"
            columns: ["match_no"]
            isOneToOne: false
            referencedRelation: "match_played"
            referencedColumns: ["match_no"]
          },
          {
            foreignKeyName: "player_in_out_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "player"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "player_in_out_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["team_id"]
          },
        ]
      }
      playing_position: {
        Row: {
          position_desc: string
          position_id: string
        }
        Insert: {
          position_desc: string
          position_id: string
        }
        Update: {
          position_desc?: string
          position_id?: string
        }
        Relationships: []
      }
      support: {
        Row: {
          support_desc: string
          support_type: string
        }
        Insert: {
          support_desc: string
          support_type: string
        }
        Update: {
          support_desc?: string
          support_type?: string
        }
        Relationships: []
      }
      team: {
        Row: {
          team_id: number
          team_name: string
        }
        Insert: {
          team_id: number
          team_name: string
        }
        Update: {
          team_id?: number
          team_name?: string
        }
        Relationships: []
      }
      team_player: {
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
        Relationships: [
          {
            foreignKeyName: "team_player_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "player"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "team_player_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["team_id"]
          },
          {
            foreignKeyName: "team_player_tr_id_fkey"
            columns: ["tr_id"]
            isOneToOne: false
            referencedRelation: "tournament"
            referencedColumns: ["tr_id"]
          },
        ]
      }
      team_support: {
        Row: {
          support_id: number
          support_type: string
          team_id: number
          tr_id: number
        }
        Insert: {
          support_id: number
          support_type: string
          team_id: number
          tr_id: number
        }
        Update: {
          support_id?: number
          support_type?: string
          team_id?: number
          tr_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "team_support_support_id_fkey"
            columns: ["support_id"]
            isOneToOne: false
            referencedRelation: "person"
            referencedColumns: ["kfupm_id"]
          },
          {
            foreignKeyName: "team_support_support_type_fkey"
            columns: ["support_type"]
            isOneToOne: false
            referencedRelation: "support"
            referencedColumns: ["support_type"]
          },
          {
            foreignKeyName: "team_support_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["team_id"]
          },
          {
            foreignKeyName: "team_support_tr_id_fkey"
            columns: ["tr_id"]
            isOneToOne: false
            referencedRelation: "tournament"
            referencedColumns: ["tr_id"]
          },
        ]
      }
      tournament: {
        Row: {
          end_date: string
          start_date: string
          tr_id: number
          tr_name: string
        }
        Insert: {
          end_date: string
          start_date: string
          tr_id: number
          tr_name: string
        }
        Update: {
          end_date?: string
          start_date?: string
          tr_id?: number
          tr_name?: string
        }
        Relationships: []
      }
      tournament_team: {
        Row: {
          draw: number
          goal_against: number
          goal_diff: number
          goal_for: number
          group_position: number
          lost: number
          match_played: number
          points: number
          team_group: string
          team_id: number
          tr_id: number
          won: number
        }
        Insert: {
          draw: number
          goal_against: number
          goal_diff: number
          goal_for: number
          group_position: number
          lost: number
          match_played: number
          points: number
          team_group: string
          team_id: number
          tr_id: number
          won: number
        }
        Update: {
          draw?: number
          goal_against?: number
          goal_diff?: number
          goal_for?: number
          group_position?: number
          lost?: number
          match_played?: number
          points?: number
          team_group?: string
          team_id?: number
          tr_id?: number
          won?: number
        }
        Relationships: [
          {
            foreignKeyName: "tournament_team_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["team_id"]
          },
          {
            foreignKeyName: "tournament_team_tr_id_fkey"
            columns: ["tr_id"]
            isOneToOne: false
            referencedRelation: "tournament"
            referencedColumns: ["tr_id"]
          },
        ]
      }
      venue: {
        Row: {
          venue_capacity: number
          venue_id: number
          venue_name: string
          venue_status: string
        }
        Insert: {
          venue_capacity: number
          venue_id: number
          venue_name: string
          venue_status: string
        }
        Update: {
          venue_capacity?: number
          venue_id?: number
          venue_name?: string
          venue_status?: string
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
