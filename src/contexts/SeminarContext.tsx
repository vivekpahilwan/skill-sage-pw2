
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";

export interface Seminar {
  id: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  current_attendees: number;
  max_attendees?: number;
  description?: string;
  requested_by: string;
  is_approved: boolean;
}

interface SeminarContextType {
  seminars: Seminar[];
  loading: boolean;
  error: string | null;
  addSeminar: (seminar: Omit<Seminar, "id" | "current_attendees" | "is_approved" | "requested_by">) => Promise<void>;
  updateSeminar: (seminar: Seminar) => Promise<void>;
  getSeminar: (id: string) => Promise<Seminar | undefined>;
  fetchSeminars: () => Promise<void>;
  registerForSeminar: (seminarId: string) => Promise<void>;
  getSeminarAttendees: (seminarId: string) => Promise<any[]>;
}

const SeminarContext = createContext<SeminarContextType | undefined>(undefined);

export const useSeminarContext = () => {
  const context = useContext(SeminarContext);
  if (!context) {
    throw new Error("useSeminarContext must be used within a SeminarProvider");
  }
  return context;
};

export const SeminarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchSeminars = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('seminars')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;

      const processedSeminars = data.map((sem: any) => {
        const [datePart, timePart] = sem.date.split(' ');
        
        return {
          id: sem.id,
          title: sem.title,
          date: datePart,
          time: timePart || '00:00',
          location: sem.location,
          description: sem.description,
          current_attendees: sem.current_attendees,
          max_attendees: sem.max_attendees,
          requested_by: sem.requested_by,
          is_approved: sem.is_approved,
        };
      });

      setSeminars(processedSeminars);
    } catch (err: any) {
      console.error("Error fetching seminars:", err);
      setError(err.message);
      toast.error("Failed to load seminars");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeminars();
  }, []);

  const addSeminar = async (seminarData: Omit<Seminar, "id" | "current_attendees" | "is_approved" | "requested_by">) => {
    try {
      if (!user) {
        throw new Error("You must be logged in to create a seminar");
      }

      setLoading(true);
      
      const dbSeminarData = {
        title: seminarData.title,
        date: `${seminarData.date} ${seminarData.time || '00:00'}`,
        location: seminarData.location,
        description: seminarData.description || null,
        max_attendees: seminarData.max_attendees || null,
        current_attendees: 0,
        requested_by: user.id,
        is_approved: user.role === "placement" ? true : false,
      };

      const { data, error } = await supabase
        .from('seminars')
        .insert([dbSeminarData])
        .select();

      if (error) throw error;
      
      await fetchSeminars();
      
      toast.success(user.role === "placement" 
        ? "Seminar scheduled successfully" 
        : "Seminar request submitted successfully");
    } catch (err: any) {
      console.error("Error creating seminar:", err);
      setError(err.message);
      toast.error(err.message || "Failed to create seminar");
    } finally {
      setLoading(false);
    }
  };

  const updateSeminar = async (seminarData: Seminar) => {
    try {
      if (!user) {
        throw new Error("You must be logged in to update a seminar");
      }

      setLoading(true);
      
      const dbSeminarData = {
        title: seminarData.title,
        date: `${seminarData.date} ${seminarData.time || '00:00'}`,
        location: seminarData.location,
        description: seminarData.description || null,
        max_attendees: seminarData.max_attendees || null,
      };

      const { error } = await supabase
        .from('seminars')
        .update(dbSeminarData)
        .eq('id', seminarData.id);

      if (error) throw error;
      
      await fetchSeminars();
      
      toast.success("Seminar updated successfully");
    } catch (err: any) {
      console.error("Error updating seminar:", err);
      setError(err.message);
      toast.error(err.message || "Failed to update seminar");
    } finally {
      setLoading(false);
    }
  };

  const getSeminar = async (id: string): Promise<Seminar | undefined> => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('seminars')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      
      if (data) {
        const [datePart, timePart] = data.date.split(' ');
        
        return {
          id: data.id,
          title: data.title,
          date: datePart,
          time: timePart || '00:00',
          location: data.location,
          description: data.description,
          current_attendees: data.current_attendees,
          max_attendees: data.max_attendees,
          requested_by: data.requested_by,
          is_approved: data.is_approved,
        };
      }
      
      return undefined;
    } catch (err: any) {
      console.error("Error getting seminar:", err);
      setError(err.message);
      toast.error(err.message || "Failed to get seminar");
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  const registerForSeminar = async (seminarId: string) => {
    try {
      if (!user) {
        throw new Error("You must be logged in to register for a seminar");
      }

      setLoading(true);
      
      // Check if already registered
      const { data: existingRegistration, error: checkError } = await supabase
        .from('seminar_attendees')
        .select('*')
        .eq('seminar_id', seminarId)
        .eq('student_id', user.id);
        
      if (checkError) throw checkError;
      
      if (existingRegistration && existingRegistration.length > 0) {
        toast.error("You are already registered for this seminar");
        return;
      }
      
      // Register for the seminar
      const { error: registerError } = await supabase
        .from('seminar_attendees')
        .insert([{
          seminar_id: seminarId,
          student_id: user.id,
          registered_at: new Date().toISOString(),
        }]);
        
      if (registerError) throw registerError;
      
      // Increment attendee count
      const { data: seminarData, error: getSeminarError } = await supabase
        .from('seminars')
        .select('current_attendees')
        .eq('id', seminarId)
        .single();
        
      if (getSeminarError) throw getSeminarError;
      
      const { error: updateError } = await supabase
        .from('seminars')
        .update({ 
          current_attendees: (seminarData.current_attendees || 0) + 1 
        })
        .eq('id', seminarId);
        
      if (updateError) throw updateError;
      
      await fetchSeminars();
      
      toast.success("Successfully registered for seminar");
    } catch (err: any) {
      console.error("Error registering for seminar:", err);
      setError(err.message);
      toast.error(err.message || "Failed to register for seminar");
    } finally {
      setLoading(false);
    }
  };

  const getSeminarAttendees = async (seminarId: string) => {
    try {
      const { data, error } = await supabase
        .from('seminar_attendees')
        .select(`
          *,
          student:student_id (
            id, 
            full_name, 
            email
          )
        `)
        .eq('seminar_id', seminarId);
        
      if (error) throw error;
      
      return data || [];
    } catch (err: any) {
      console.error("Error getting seminar attendees:", err);
      setError(err.message);
      toast.error(err.message || "Failed to get seminar attendees");
      return [];
    }
  };

  return (
    <SeminarContext.Provider value={{ 
      seminars, 
      loading, 
      error, 
      addSeminar, 
      updateSeminar, 
      getSeminar,
      fetchSeminars,
      registerForSeminar,
      getSeminarAttendees
    }}>
      {children}
    </SeminarContext.Provider>
  );
};
