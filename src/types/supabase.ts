
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
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name: string
          role: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          role?: string
          created_at?: string
          updated_at?: string
        }
      }
      student_profiles: {
        Row: {
          id: string
          prn: string
          department: string
          year: number
          cgpa: number
          phone: string
          skills: string[]
          address: string
          created_at: string
          updated_at: string
        }
      }
      tpo_profiles: {
        Row: {
          id: string
          department: string
          position: string
          phone: string
          created_at: string
          updated_at: string
        }
      }
      alumni_profiles: {
        Row: {
          id: string
          graduation_year: number
          company: string
          position: string
          experience_years: number
          phone: string
          industry: string
          linkedin: string
          created_at: string
          updated_at: string
        }
      }
      opportunities: {
        Row: {
          id: string
          title: string
          company: string
          location: string
          type: string
          description: string
          requirements: string[]
          salary: string
          deadline: string
          posted_date: string
          posted_by: string
          logo: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          company: string
          location: string
          type: string
          description: string
          requirements: string[]
          salary: string
          deadline: string
          posted_date: string
          posted_by: string
          logo: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          company?: string
          location?: string
          type?: string
          description?: string
          requirements?: string[]
          salary?: string
          deadline?: string
          posted_date?: string
          posted_by?: string
          logo?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      applications: {
        Row: {
          id: string
          opportunity_id: string
          student_id: string
          status: string
          applied_date: string
          resume_url?: string
          cover_letter?: string
          feedback?: string
          created_at: string
          updated_at: string
        }
      }
      seminars: {
        Row: {
          id: string
          title: string
          date: string
          location: string
          description?: string
          max_attendees?: number
          current_attendees: number
          requested_by: string
          is_approved: boolean
          created_at: string
          updated_at: string
        }
      }
      seminar_attendees: {
        Row: {
          id: string
          seminar_id: string
          student_id: string
          registered_at: string
          attended: boolean
          created_at: string
          updated_at: string
        }
      }
      resumes: {
        Row: {
          id: string
          student_id: string
          file_url: string
          file_name: string
          analyzed: boolean
          extracted_skills?: string[]
          overall_score?: number
          strengths?: string[]
          improvements?: string[]
          analyzed_at?: string
          created_at: string
          updated_at: string
        }
      }
      quizzes: {
        Row: {
          id: string
          title: string
          description?: string
          category: string
          difficulty: string
          time_limit_minutes: number
          total_questions: number
          passing_score: number
          is_active: boolean
          created_by: string
          created_at: string
          updated_at: string
        }
      }
      quiz_questions: {
        Row: {
          id: string
          quiz_id: string
          question: string
          options: Record<string, string>
          correct_answer: string
          explanation?: string
          created_at: string
          updated_at: string
        }
      }
      quiz_attempts: {
        Row: {
          id: string
          quiz_id: string
          student_id: string
          score: number
          time_taken_seconds?: number
          completed: boolean
          started_at: string
          completed_at?: string
          created_at: string
          updated_at: string
        }
      }
      quiz_responses: {
        Row: {
          id: string
          attempt_id: string
          question_id: string
          student_answer?: string
          is_correct: boolean
          created_at: string
          updated_at: string
        }
      }
      referrals: {
        Row: {
          id: string
          student_id: string
          alumni_id: string
          company: string
          position: string
          message?: string
          status: string
          created_at: string
          updated_at: string
        }
      }
      skills: {
        Row: {
          id: string
          name: string
          category?: string
          created_at: string
          updated_at: string
        }
      }
      student_skills: {
        Row: {
          id: string
          student_id: string
          skill_id: string
          proficiency_level: number
          created_at: string
          updated_at: string
        }
      }
      leaderboard: {
        Row: {
          id: string
          student_id: string
          total_score: number
          quizzes_completed: number
          avg_score: number
          highest_score: number
          skill_badges?: string[]
          rank?: number
          created_at: string
          updated_at: string
        }
      }
      achievements: {
        Row: {
          id: string
          title: string
          description: string
          icon?: string
          criteria: Record<string, any>
          created_at: string
          updated_at: string
        }
      }
      student_achievements: {
        Row: {
          id: string
          student_id: string
          achievement_id: string
          earned_at: string
          created_at: string
          updated_at: string
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
    CompositeTypes: {}
  }
}
