
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Types
export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'student' | 'tpo' | 'alumni';
  created_at: string;
  updated_at: string;
}

export interface StudentProfile {
  id: string;
  prn: string;
  department: string;
  year: number;
  cgpa: number;
  phone: string;
  skills: string[];
  address: string;
  created_at: string;
  updated_at: string;
}

export interface TPOProfile {
  id: string;
  department: string;
  position: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

export interface AlumniProfile {
  id: string;
  graduation_year: number;
  company: string;
  position: string;
  experience_years: number;
  phone: string;
  industry: string;
  linkedin: string;
  created_at: string;
  updated_at: string;
}

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  salary: string;
  deadline: string;
  posted_date: string;
  posted_by: string;
  logo: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Application {
  id: string;
  opportunity_id: string;
  student_id: string;
  status: 'applied' | 'reviewing' | 'rejected' | 'shortlisted' | 'offered';
  applied_date: string;
  resume_url?: string;
  cover_letter?: string;
  feedback?: string;
  created_at: string;
  updated_at: string;
}

export interface Seminar {
  id: string;
  title: string;
  date: string;
  location: string;
  description?: string;
  max_attendees?: number;
  current_attendees: number;
  requested_by: string;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

export interface SeminarAttendee {
  id: string;
  seminar_id: string;
  student_id: string;
  registered_at: string;
  attended: boolean;
  created_at: string;
  updated_at: string;
}

export interface Resume {
  id: string;
  student_id: string;
  file_url: string;
  file_name: string;
  analyzed: boolean;
  extracted_skills?: string[];
  overall_score?: number;
  strengths?: string[];
  improvements?: string[];
  analyzed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  category: string;
  difficulty: string;
  time_limit_minutes: number;
  total_questions: number;
  passing_score: number;
  is_active: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question: string;
  options: Record<string, string>;
  correct_answer: string;
  explanation?: string;
  created_at: string;
  updated_at: string;
}

export interface QuizAttempt {
  id: string;
  quiz_id: string;
  student_id: string;
  score: number;
  time_taken_seconds?: number;
  completed: boolean;
  started_at: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface QuizResponse {
  id: string;
  attempt_id: string;
  question_id: string;
  student_answer?: string;
  is_correct: boolean;
  created_at: string;
  updated_at: string;
}

export interface Referral {
  id: string;
  student_id: string;
  alumni_id: string;
  company: string;
  position: string;
  message?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category?: string;
  created_at: string;
  updated_at: string;
}

export interface StudentSkill {
  id: string;
  student_id: string;
  skill_id: string;
  proficiency_level: number;
  created_at: string;
  updated_at: string;
}

export interface Leaderboard {
  id: string;
  student_id: string;
  total_score: number;
  quizzes_completed: number;
  avg_score: number;
  highest_score: number;
  skill_badges?: string[];
  rank?: number;
  created_at: string;
  updated_at: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon?: string;
  criteria: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface StudentAchievement {
  id: string;
  student_id: string;
  achievement_id: string;
  earned_at: string;
  created_at: string;
  updated_at: string;
}

// Service functions

// User management
export const getUserProfile = async (userId: string) => {
  try {
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (userError) throw userError;

    if (!user) {
      throw new Error('User not found');
    }

    if (user.role === 'student') {
      const { data: studentProfile, error: profileError } = await supabase
        .from('student_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) throw profileError;
      return { ...user, profile: studentProfile };
    } else if (user.role === 'tpo') {
      const { data: tpoProfile, error: profileError } = await supabase
        .from('tpo_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) throw profileError;
      return { ...user, profile: tpoProfile };
    } else if (user.role === 'alumni') {
      const { data: alumniProfile, error: profileError } = await supabase
        .from('alumni_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) throw profileError;
      return { ...user, profile: alumniProfile };
    }

    return user;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    toast.error('Failed to fetch user profile');
    throw error;
  }
};

// Update profile
export const updateUserProfile = async (userId: string, role: string, profileData: any) => {
  try {
    // Update user table
    const { error: userError } = await supabase
      .from('users')
      .update({
        full_name: profileData.full_name,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

    if (userError) throw userError;

    // Update role-specific profile
    let profileTable;
    if (role === 'student') {
      profileTable = 'student_profiles';
    } else if (role === 'tpo') {
      profileTable = 'tpo_profiles';
    } else if (role === 'alumni') {
      profileTable = 'alumni_profiles';
    } else {
      throw new Error('Invalid role');
    }

    const { error: profileError } = await supabase
      .from(profileTable)
      .update({
        ...profileData,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

    if (profileError) throw profileError;

    toast.success('Profile updated successfully');
    return true;
  } catch (error) {
    console.error('Error updating profile:', error);
    toast.error('Failed to update profile');
    throw error;
  }
};

// Opportunities
export const fetchOpportunities = async (filters?: Record<string, any>) => {
  try {
    let query = supabase
      .from('opportunities')
      .select('*')
      .eq('is_active', true)
      .order('posted_date', { ascending: false });

    // Apply filters if provided
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          if (Array.isArray(value)) {
            query = query.in(key, value);
          } else if (typeof value === 'string' && value.trim() !== '') {
            query = query.ilike(key, `%${value}%`);
          } else {
            query = query.eq(key, value);
          }
        }
      });
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    toast.error('Failed to fetch job opportunities');
    throw error;
  }
};

export const getOpportunityById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('opportunities')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching opportunity:', error);
    toast.error('Failed to fetch job opportunity');
    throw error;
  }
};

export const createOpportunity = async (opportunity: Omit<Opportunity, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const { data, error } = await supabase
      .from('opportunities')
      .insert([opportunity])
      .select()
      .single();

    if (error) throw error;
    toast.success('Job opportunity created successfully');
    return data;
  } catch (error) {
    console.error('Error creating opportunity:', error);
    toast.error('Failed to create job opportunity');
    throw error;
  }
};

export const updateOpportunity = async (id: string, opportunity: Partial<Opportunity>) => {
  try {
    const { data, error } = await supabase
      .from('opportunities')
      .update({
        ...opportunity,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    toast.success('Job opportunity updated successfully');
    return data;
  } catch (error) {
    console.error('Error updating opportunity:', error);
    toast.error('Failed to update job opportunity');
    throw error;
  }
};

export const deleteOpportunity = async (id: string) => {
  try {
    const { error } = await supabase
      .from('opportunities')
      .delete()
      .eq('id', id);

    if (error) throw error;
    toast.success('Job opportunity deleted successfully');
    return true;
  } catch (error) {
    console.error('Error deleting opportunity:', error);
    toast.error('Failed to delete job opportunity');
    throw error;
  }
};

// Applications
export const applyForJob = async (applicationData: Omit<Application, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const { data, error } = await supabase
      .from('applications')
      .insert([applicationData])
      .select()
      .single();

    if (error) throw error;
    toast.success('Application submitted successfully');
    return data;
  } catch (error) {
    console.error('Error submitting application:', error);
    toast.error('Failed to submit application');
    throw error;
  }
};

export const getApplicationsByOpportunity = async (opportunityId: string) => {
  try {
    const { data, error } = await supabase
      .from('applications')
      .select(`
        *,
        student:student_id (
          id,
          users!inner (
            full_name, 
            email
          )
        )
      `)
      .eq('opportunity_id', opportunityId);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching applications:', error);
    toast.error('Failed to fetch applications');
    throw error;
  }
};

export const getApplicationsByStudent = async (studentId: string) => {
  try {
    const { data, error } = await supabase
      .from('applications')
      .select(`
        *,
        opportunity:opportunity_id (*)
      `)
      .eq('student_id', studentId);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching student applications:', error);
    toast.error('Failed to fetch your applications');
    throw error;
  }
};

export const updateApplicationStatus = async (id: string, status: Application['status'], feedback?: string) => {
  try {
    const { data, error } = await supabase
      .from('applications')
      .update({
        status,
        feedback,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    toast.success('Application status updated successfully');
    return data;
  } catch (error) {
    console.error('Error updating application status:', error);
    toast.error('Failed to update application status');
    throw error;
  }
};

// Resumes
export const uploadResume = async (studentId: string, file: File) => {
  try {
    // Upload file to storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${studentId}-${Date.now()}.${fileExt}`;
    const filePath = `resumes/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('resumes')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Get the URL of the uploaded file
    const { data: urlData } = supabase.storage
      .from('resumes')
      .getPublicUrl(filePath);

    if (!urlData.publicUrl) {
      throw new Error('Failed to get public URL for uploaded resume');
    }

    // Create resume record in database
    const { data, error } = await supabase
      .from('resumes')
      .insert([{
        student_id: studentId,
        file_url: urlData.publicUrl,
        file_name: file.name,
        analyzed: false
      }])
      .select()
      .single();

    if (error) throw error;
    toast.success('Resume uploaded successfully');
    return data;
  } catch (error) {
    console.error('Error uploading resume:', error);
    toast.error('Failed to upload resume');
    throw error;
  }
};

export const getStudentResumes = async (studentId: string) => {
  try {
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('student_id', studentId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching resumes:', error);
    toast.error('Failed to fetch resumes');
    throw error;
  }
};

// Quizzes
export const fetchQuizzes = async (filters?: Record<string, any>) => {
  try {
    let query = supabase
      .from('quizzes')
      .select('*')
      .eq('is_active', true);

    // Apply filters if provided
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          if (Array.isArray(value)) {
            query = query.in(key, value);
          } else if (typeof value === 'string' && value.trim() !== '') {
            query = query.ilike(key, `%${value}%`);
          } else {
            query = query.eq(key, value);
          }
        }
      });
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    toast.error('Failed to fetch quizzes');
    throw error;
  }
};

export const getQuizWithQuestions = async (quizId: string) => {
  try {
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .select('*')
      .eq('id', quizId)
      .single();

    if (quizError) throw quizError;

    const { data: questions, error: questionsError } = await supabase
      .from('quiz_questions')
      .select('*')
      .eq('quiz_id', quizId);

    if (questionsError) throw questionsError;

    return { ...quiz, questions: questions || [] };
  } catch (error) {
    console.error('Error fetching quiz with questions:', error);
    toast.error('Failed to fetch quiz');
    throw error;
  }
};

export const startQuizAttempt = async (quizId: string, studentId: string) => {
  try {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .insert([{
        quiz_id: quizId,
        student_id: studentId,
        score: 0,
        completed: false,
        started_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error starting quiz attempt:', error);
    toast.error('Failed to start quiz');
    throw error;
  }
};

export const submitQuizResponse = async (attemptId: string, questionId: string, studentAnswer: string, isCorrect: boolean) => {
  try {
    const { data, error } = await supabase
      .from('quiz_responses')
      .insert([{
        attempt_id: attemptId,
        question_id: questionId,
        student_answer: studentAnswer,
        is_correct: isCorrect
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error submitting quiz response:', error);
    toast.error('Failed to submit response');
    throw error;
  }
};

export const completeQuizAttempt = async (attemptId: string, score: number, timeTakenSeconds: number) => {
  try {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .update({
        score,
        time_taken_seconds: timeTakenSeconds,
        completed: true,
        completed_at: new Date().toISOString()
      })
      .eq('id', attemptId)
      .select()
      .single();

    if (error) throw error;
    toast.success('Quiz completed successfully');
    return data;
  } catch (error) {
    console.error('Error completing quiz attempt:', error);
    toast.error('Failed to complete quiz');
    throw error;
  }
};

export const getStudentQuizHistory = async (studentId: string) => {
  try {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .select(`
        *,
        quiz:quiz_id (*)
      `)
      .eq('student_id', studentId)
      .order('completed_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching quiz history:', error);
    toast.error('Failed to fetch quiz history');
    throw error;
  }
};

// Seminars
export const fetchSeminars = async (filters?: Record<string, any>) => {
  try {
    let query = supabase
      .from('seminars')
      .select(`
        *,
        alumni:requested_by (
          id,
          users!inner (
            full_name
          ),
          alumni_profiles!inner (
            company,
            position
          )
        )
      `)
      .eq('is_approved', true)
      .gte('date', new Date().toISOString());

    // Apply filters if provided
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          if (Array.isArray(value)) {
            query = query.in(key, value);
          } else if (typeof value === 'string' && value.trim() !== '') {
            query = query.ilike(key, `%${value}%`);
          } else {
            query = query.eq(key, value);
          }
        }
      });
    }

    const { data, error } = await query.order('date', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching seminars:', error);
    toast.error('Failed to fetch seminars');
    throw error;
  }
};

export const createSeminar = async (seminarData: Omit<Seminar, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const { data, error } = await supabase
      .from('seminars')
      .insert([seminarData])
      .select()
      .single();

    if (error) throw error;
    toast.success('Seminar request submitted successfully');
    return data;
  } catch (error) {
    console.error('Error creating seminar:', error);
    toast.error('Failed to submit seminar request');
    throw error;
  }
};

export const registerForSeminar = async (seminarId: string, studentId: string) => {
  try {
    // Check if already registered
    const { data: existing, error: checkError } = await supabase
      .from('seminar_attendees')
      .select('id')
      .eq('seminar_id', seminarId)
      .eq('student_id', studentId);

    if (checkError) throw checkError;
    if (existing && existing.length > 0) {
      toast.error('You are already registered for this seminar');
      return null;
    }

    // Register for seminar
    const { data, error } = await supabase
      .from('seminar_attendees')
      .insert([{
        seminar_id: seminarId,
        student_id: studentId
      }])
      .select()
      .single();

    if (error) throw error;

    // Update current_attendees count
    const { error: updateError } = await supabase.rpc('increment_seminar_attendees', {
      sem_id: seminarId
    });

    if (updateError) throw updateError;

    toast.success('Registered for seminar successfully');
    return data;
  } catch (error) {
    console.error('Error registering for seminar:', error);
    toast.error('Failed to register for seminar');
    throw error;
  }
};

export const updateSeminarApproval = async (seminarId: string, isApproved: boolean) => {
  try {
    const { data, error } = await supabase
      .from('seminars')
      .update({
        is_approved: isApproved,
        updated_at: new Date().toISOString()
      })
      .eq('id', seminarId)
      .select()
      .single();

    if (error) throw error;
    toast.success(`Seminar ${isApproved ? 'approved' : 'rejected'} successfully`);
    return data;
  } catch (error) {
    console.error('Error updating seminar approval:', error);
    toast.error('Failed to update seminar approval');
    throw error;
  }
};

// Referrals
export const createReferral = async (referralData: Omit<Referral, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const { data, error } = await supabase
      .from('referrals')
      .insert([referralData])
      .select()
      .single();

    if (error) throw error;
    toast.success('Referral submitted successfully');
    return data;
  } catch (error) {
    console.error('Error creating referral:', error);
    toast.error('Failed to submit referral');
    throw error;
  }
};

export const getStudentReferrals = async (studentId: string) => {
  try {
    const { data, error } = await supabase
      .from('referrals')
      .select(`
        *,
        alumni:alumni_id (
          id,
          users!inner (
            full_name
          ),
          alumni_profiles!inner (
            company,
            position
          )
        )
      `)
      .eq('student_id', studentId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching referrals:', error);
    toast.error('Failed to fetch referrals');
    throw error;
  }
};

export const getAlumniReferrals = async (alumniId: string) => {
  try {
    const { data, error } = await supabase
      .from('referrals')
      .select(`
        *,
        student:student_id (
          id,
          users!inner (
            full_name
          ),
          student_profiles!inner (
            department,
            year
          )
        )
      `)
      .eq('alumni_id', alumniId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching referrals:', error);
    toast.error('Failed to fetch referrals');
    throw error;
  }
};

export const updateReferralStatus = async (referralId: string, status: Referral['status']) => {
  try {
    const { data, error } = await supabase
      .from('referrals')
      .update({
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', referralId)
      .select()
      .single();

    if (error) throw error;
    toast.success(`Referral ${status} successfully`);
    return data;
  } catch (error) {
    console.error('Error updating referral status:', error);
    toast.error('Failed to update referral status');
    throw error;
  }
};

// Skills
export const fetchSkills = async () => {
  try {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching skills:', error);
    toast.error('Failed to fetch skills');
    throw error;
  }
};

export const addStudentSkill = async (studentId: string, skillId: string, proficiencyLevel: number) => {
  try {
    const { data, error } = await supabase
      .from('student_skills')
      .insert([{
        student_id: studentId,
        skill_id: skillId,
        proficiency_level: proficiencyLevel
      }])
      .select()
      .single();

    if (error) throw error;
    toast.success('Skill added successfully');
    return data;
  } catch (error) {
    console.error('Error adding skill:', error);
    toast.error('Failed to add skill');
    throw error;
  }
};

export const getStudentSkills = async (studentId: string) => {
  try {
    const { data, error } = await supabase
      .from('student_skills')
      .select(`
        *,
        skill:skill_id (*)
      `)
      .eq('student_id', studentId);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching student skills:', error);
    toast.error('Failed to fetch skills');
    throw error;
  }
};

// Leaderboard
export const getLeaderboard = async (limit: number = 10) => {
  try {
    const { data, error } = await supabase
      .from('leaderboard')
      .select(`
        *,
        student:student_id (
          id,
          users!inner (
            full_name
          ),
          student_profiles!inner (
            department,
            year
          )
        )
      `)
      .order('rank', { ascending: true })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    toast.error('Failed to fetch leaderboard');
    throw error;
  }
};

// Students (for TPO)
export const getAllStudents = async (filters?: Record<string, any>) => {
  try {
    let query = supabase
      .from('users')
      .select(`
        *,
        student_profiles!inner (*)
      `)
      .eq('role', 'student');

    // Apply filters if provided
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          if (key.startsWith('student_profiles.')) {
            const profileKey = key.replace('student_profiles.', '');
            if (Array.isArray(value)) {
              query = query.in(`student_profiles.${profileKey}`, value);
            } else if (typeof value === 'string' && value.trim() !== '') {
              query = query.ilike(`student_profiles.${profileKey}`, `%${value}%`);
            } else {
              query = query.eq(`student_profiles.${profileKey}`, value);
            }
          } else {
            if (Array.isArray(value)) {
              query = query.in(key, value);
            } else if (typeof value === 'string' && value.trim() !== '') {
              query = query.ilike(key, `%${value}%`);
            } else {
              query = query.eq(key, value);
            }
          }
        }
      });
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching students:', error);
    toast.error('Failed to fetch students');
    throw error;
  }
};

// Generic error handler for Supabase operations
export const handleSupabaseError = (error: any) => {
  console.error('Supabase error:', error);
  
  if (error.code === '42501') {
    toast.error('You do not have permission to perform this action');
  } else if (error.code === '23505') {
    toast.error('This record already exists');
  } else if (error.code === '23503') {
    toast.error('Referenced record does not exist');
  } else {
    toast.error(error.message || 'An error occurred');
  }
  
  return error;
};
