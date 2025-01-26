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
      fluency_tests: {
        Row: {
          completed: boolean | null
          created_at: string | null
          end_time: string | null
          id: string
          main_category: string
          start_time: string
          subcategory: string
          total_correct: number | null
          total_questions: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          end_time?: string | null
          id?: string
          main_category: string
          start_time?: string
          subcategory: string
          total_correct?: number | null
          total_questions?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          end_time?: string | null
          id?: string
          main_category?: string
          start_time?: string
          subcategory?: string
          total_correct?: number | null
          total_questions?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      generated_questions: {
        Row: {
          correct_answer: string
          created_at: string
          explanation: string
          id: string
          main_category: string
          options: string[]
          question_text: string
          subcategory: string
          updated_at: string
        }
        Insert: {
          correct_answer: string
          created_at?: string
          explanation: string
          id?: string
          main_category: string
          options: string[]
          question_text: string
          subcategory: string
          updated_at?: string
        }
        Update: {
          correct_answer?: string
          created_at?: string
          explanation?: string
          id?: string
          main_category?: string
          options?: string[]
          question_text?: string
          subcategory?: string
          updated_at?: string
        }
        Relationships: []
      }
      pacing_guides: {
        Row: {
          created_at: string
          id: string
          projected_exam_date: string
          study_frequency: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          projected_exam_date: string
          study_frequency: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          projected_exam_date?: string
          study_frequency?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          phone_number: string | null
          projected_exam_date: string | null
          supervisor_email: string | null
          supervisor_name: string | null
          updated_at: string
          username: string | null
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          phone_number?: string | null
          projected_exam_date?: string | null
          supervisor_email?: string | null
          supervisor_name?: string | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone_number?: string | null
          projected_exam_date?: string | null
          supervisor_email?: string | null
          supervisor_name?: string | null
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      question_exposures: {
        Row: {
          created_at: string
          id: string
          question_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          question_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          question_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "question_exposures_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "generated_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_attempts: {
        Row: {
          correct_answer: string
          created_at: string
          id: string
          is_correct: boolean
          main_category: string
          question_text: string
          selected_answer: string
          subcategory: string
          time_taken_seconds: number
          updated_at: string
          user_id: string
        }
        Insert: {
          correct_answer: string
          created_at?: string
          id?: string
          is_correct: boolean
          main_category: string
          question_text: string
          selected_answer: string
          subcategory: string
          time_taken_seconds: number
          updated_at?: string
          user_id: string
        }
        Update: {
          correct_answer?: string
          created_at?: string
          id?: string
          is_correct?: boolean
          main_category?: string
          question_text?: string
          selected_answer?: string
          subcategory?: string
          time_taken_seconds?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      quiz_results: {
        Row: {
          correct_answers: number
          created_at: string
          id: string
          incorrect_answers: number
          main_topic: string
          subtopic: string
          total_questions: number
          updated_at: string
          user_id: string
        }
        Insert: {
          correct_answers?: number
          created_at?: string
          id?: string
          incorrect_answers?: number
          main_topic: string
          subtopic: string
          total_questions?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          correct_answers?: number
          created_at?: string
          id?: string
          incorrect_answers?: number
          main_topic?: string
          subtopic?: string
          total_questions?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      subdomain_progress: {
        Row: {
          created_at: string
          current_accuracy: number
          id: string
          main_category: string
          pacing_guide_id: string
          priority_level: number
          subcategory: string
          target_accuracy: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_accuracy?: number
          id?: string
          main_category: string
          pacing_guide_id: string
          priority_level?: number
          subcategory: string
          target_accuracy?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_accuracy?: number
          id?: string
          main_category?: string
          pacing_guide_id?: string
          priority_level?: number
          subcategory?: string
          target_accuracy?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "subdomain_progress_pacing_guide_id_fkey"
            columns: ["pacing_guide_id"]
            isOneToOne: false
            referencedRelation: "pacing_guides"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          created_at: string
          id: string
          last_main_topic: string | null
          last_subtopic: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_main_topic?: string | null
          last_subtopic?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          last_main_topic?: string | null
          last_subtopic?: string | null
          updated_at?: string
          user_id?: string
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
