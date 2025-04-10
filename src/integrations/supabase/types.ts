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
      achievements: {
        Row: {
          created_at: string | null
          criteria: Json
          description: string
          icon: string | null
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          criteria: Json
          description: string
          icon?: string | null
          id?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          criteria?: Json
          description?: string
          icon?: string | null
          id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      alumni_profiles: {
        Row: {
          company: string | null
          created_at: string | null
          experience_years: number | null
          graduation_year: number | null
          id: string
          industry: string | null
          linkedin: string | null
          phone: string | null
          position: string | null
          updated_at: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          experience_years?: number | null
          graduation_year?: number | null
          id: string
          industry?: string | null
          linkedin?: string | null
          phone?: string | null
          position?: string | null
          updated_at?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          experience_years?: number | null
          graduation_year?: number | null
          id?: string
          industry?: string | null
          linkedin?: string | null
          phone?: string | null
          position?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "alumni_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      applications: {
        Row: {
          applied_date: string
          cover_letter: string | null
          created_at: string | null
          feedback: string | null
          id: string
          opportunity_id: string | null
          resume_url: string | null
          status: string
          student_id: string | null
          updated_at: string | null
        }
        Insert: {
          applied_date: string
          cover_letter?: string | null
          created_at?: string | null
          feedback?: string | null
          id?: string
          opportunity_id?: string | null
          resume_url?: string | null
          status?: string
          student_id?: string | null
          updated_at?: string | null
        }
        Update: {
          applied_date?: string
          cover_letter?: string | null
          created_at?: string | null
          feedback?: string | null
          id?: string
          opportunity_id?: string | null
          resume_url?: string | null
          status?: string
          student_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      leaderboard: {
        Row: {
          avg_score: number
          created_at: string | null
          highest_score: number
          id: string
          quizzes_completed: number
          rank: number | null
          skill_badges: string[] | null
          student_id: string | null
          total_score: number
          updated_at: string | null
        }
        Insert: {
          avg_score?: number
          created_at?: string | null
          highest_score?: number
          id?: string
          quizzes_completed?: number
          rank?: number | null
          skill_badges?: string[] | null
          student_id?: string | null
          total_score?: number
          updated_at?: string | null
        }
        Update: {
          avg_score?: number
          created_at?: string | null
          highest_score?: number
          id?: string
          quizzes_completed?: number
          rank?: number | null
          skill_badges?: string[] | null
          student_id?: string | null
          total_score?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leaderboard_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      opportunities: {
        Row: {
          company: string
          created_at: string | null
          deadline: string
          description: string
          id: string
          is_active: boolean | null
          location: string
          logo: string | null
          posted_by: string | null
          posted_date: string
          requirements: string[] | null
          salary: string
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          company: string
          created_at?: string | null
          deadline: string
          description: string
          id?: string
          is_active?: boolean | null
          location: string
          logo?: string | null
          posted_by?: string | null
          posted_date: string
          requirements?: string[] | null
          salary: string
          title: string
          type: string
          updated_at?: string | null
        }
        Update: {
          company?: string
          created_at?: string | null
          deadline?: string
          description?: string
          id?: string
          is_active?: boolean | null
          location?: string
          logo?: string | null
          posted_by?: string | null
          posted_date?: string
          requirements?: string[] | null
          salary?: string
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "opportunities_posted_by_fkey"
            columns: ["posted_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_attempts: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          created_at: string | null
          id: string
          quiz_id: string | null
          score: number
          started_at: string
          student_id: string | null
          time_taken_seconds: number | null
          updated_at: string | null
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          quiz_id?: string | null
          score?: number
          started_at: string
          student_id?: string | null
          time_taken_seconds?: number | null
          updated_at?: string | null
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          quiz_id?: string | null
          score?: number
          started_at?: string
          student_id?: string | null
          time_taken_seconds?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_attempts_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_attempts_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_questions: {
        Row: {
          correct_answer: string
          created_at: string | null
          explanation: string | null
          id: string
          options: Json
          question: string
          quiz_id: string | null
          updated_at: string | null
        }
        Insert: {
          correct_answer: string
          created_at?: string | null
          explanation?: string | null
          id?: string
          options: Json
          question: string
          quiz_id?: string | null
          updated_at?: string | null
        }
        Update: {
          correct_answer?: string
          created_at?: string | null
          explanation?: string | null
          id?: string
          options?: Json
          question?: string
          quiz_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_responses: {
        Row: {
          attempt_id: string | null
          created_at: string | null
          id: string
          is_correct: boolean
          question_id: string | null
          student_answer: string | null
          updated_at: string | null
        }
        Insert: {
          attempt_id?: string | null
          created_at?: string | null
          id?: string
          is_correct: boolean
          question_id?: string | null
          student_answer?: string | null
          updated_at?: string | null
        }
        Update: {
          attempt_id?: string | null
          created_at?: string | null
          id?: string
          is_correct?: boolean
          question_id?: string | null
          student_answer?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_responses_attempt_id_fkey"
            columns: ["attempt_id"]
            isOneToOne: false
            referencedRelation: "quiz_attempts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_responses_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "quiz_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          category: string
          created_at: string | null
          created_by: string | null
          description: string | null
          difficulty: string
          id: string
          is_active: boolean | null
          passing_score: number
          time_limit_minutes: number
          title: string
          total_questions: number
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          difficulty: string
          id?: string
          is_active?: boolean | null
          passing_score: number
          time_limit_minutes: number
          title: string
          total_questions: number
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          difficulty?: string
          id?: string
          is_active?: boolean | null
          passing_score?: number
          time_limit_minutes?: number
          title?: string
          total_questions?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quizzes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      referrals: {
        Row: {
          alumni_id: string | null
          company: string
          created_at: string | null
          id: string
          message: string | null
          position: string
          status: string
          student_id: string | null
          updated_at: string | null
        }
        Insert: {
          alumni_id?: string | null
          company: string
          created_at?: string | null
          id?: string
          message?: string | null
          position: string
          status?: string
          student_id?: string | null
          updated_at?: string | null
        }
        Update: {
          alumni_id?: string | null
          company?: string
          created_at?: string | null
          id?: string
          message?: string | null
          position?: string
          status?: string
          student_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referrals_alumni_id_fkey"
            columns: ["alumni_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      resumes: {
        Row: {
          analyzed: boolean | null
          analyzed_at: string | null
          created_at: string | null
          extracted_skills: string[] | null
          file_name: string
          file_url: string
          id: string
          improvements: string[] | null
          overall_score: number | null
          strengths: string[] | null
          student_id: string | null
          updated_at: string | null
        }
        Insert: {
          analyzed?: boolean | null
          analyzed_at?: string | null
          created_at?: string | null
          extracted_skills?: string[] | null
          file_name: string
          file_url: string
          id?: string
          improvements?: string[] | null
          overall_score?: number | null
          strengths?: string[] | null
          student_id?: string | null
          updated_at?: string | null
        }
        Update: {
          analyzed?: boolean | null
          analyzed_at?: string | null
          created_at?: string | null
          extracted_skills?: string[] | null
          file_name?: string
          file_url?: string
          id?: string
          improvements?: string[] | null
          overall_score?: number | null
          strengths?: string[] | null
          student_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resumes_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      seminar_attendees: {
        Row: {
          attended: boolean | null
          created_at: string | null
          id: string
          registered_at: string
          seminar_id: string | null
          student_id: string | null
          updated_at: string | null
        }
        Insert: {
          attended?: boolean | null
          created_at?: string | null
          id?: string
          registered_at?: string
          seminar_id?: string | null
          student_id?: string | null
          updated_at?: string | null
        }
        Update: {
          attended?: boolean | null
          created_at?: string | null
          id?: string
          registered_at?: string
          seminar_id?: string | null
          student_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "seminar_attendees_seminar_id_fkey"
            columns: ["seminar_id"]
            isOneToOne: false
            referencedRelation: "seminars"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seminar_attendees_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      seminars: {
        Row: {
          created_at: string | null
          current_attendees: number | null
          date: string
          description: string | null
          id: string
          is_approved: boolean | null
          location: string
          max_attendees: number | null
          requested_by: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_attendees?: number | null
          date: string
          description?: string | null
          id?: string
          is_approved?: boolean | null
          location: string
          max_attendees?: number | null
          requested_by?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_attendees?: number | null
          date?: string
          description?: string | null
          id?: string
          is_approved?: boolean | null
          location?: string
          max_attendees?: number | null
          requested_by?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "seminars_requested_by_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          category: string | null
          created_at: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      student_achievements: {
        Row: {
          achievement_id: string | null
          created_at: string | null
          earned_at: string
          id: string
          student_id: string | null
          updated_at: string | null
        }
        Insert: {
          achievement_id?: string | null
          created_at?: string | null
          earned_at: string
          id?: string
          student_id?: string | null
          updated_at?: string | null
        }
        Update: {
          achievement_id?: string | null
          created_at?: string | null
          earned_at?: string
          id?: string
          student_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_achievements_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      student_profiles: {
        Row: {
          address: string | null
          cgpa: number | null
          created_at: string | null
          department: string | null
          id: string
          phone: string | null
          prn: string | null
          skills: string[] | null
          updated_at: string | null
          year: number | null
        }
        Insert: {
          address?: string | null
          cgpa?: number | null
          created_at?: string | null
          department?: string | null
          id: string
          phone?: string | null
          prn?: string | null
          skills?: string[] | null
          updated_at?: string | null
          year?: number | null
        }
        Update: {
          address?: string | null
          cgpa?: number | null
          created_at?: string | null
          department?: string | null
          id?: string
          phone?: string | null
          prn?: string | null
          skills?: string[] | null
          updated_at?: string | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "student_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      student_skills: {
        Row: {
          created_at: string | null
          id: string
          proficiency_level: number
          skill_id: string | null
          student_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          proficiency_level: number
          skill_id?: string | null
          student_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          proficiency_level?: number
          skill_id?: string | null
          student_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_skills_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tpo_profiles: {
        Row: {
          created_at: string | null
          department: string | null
          id: string
          phone: string | null
          position: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          department?: string | null
          id: string
          phone?: string | null
          position?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          department?: string | null
          id?: string
          phone?: string | null
          position?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tpo_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          id: string
          role: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          role: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          role?: string
          updated_at?: string | null
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
