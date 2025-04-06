
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Seminar {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  description?: string;
  maxAttendees?: number;
}

// Initial seminar data
const initialSeminars = [
  { 
    id: 1, 
    title: "Machine Learning in Industry", 
    date: "Apr 15, 2025", 
    time: "3:00 PM - 5:00 PM", 
    location: "Virtual", 
    attendees: 35,
    description: "An in-depth look at how machine learning is revolutionizing various industries."
  },
  { 
    id: 2, 
    title: "Career Pathways in Tech", 
    date: "Apr 28, 2025", 
    time: "2:00 PM - 4:00 PM", 
    location: "Campus Auditorium", 
    attendees: 80,
    description: "Guidance on different career paths available in the tech industry and how to prepare for them."
  },
];

interface SeminarContextType {
  seminars: Seminar[];
  addSeminar: (seminar: Omit<Seminar, "id" | "attendees">) => void;
  updateSeminar: (seminar: Seminar) => void;
  getSeminar: (id: number) => Seminar | undefined;
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
  const [seminars, setSeminars] = useState<Seminar[]>(initialSeminars);

  const addSeminar = (seminar: Omit<Seminar, "id" | "attendees">) => {
    const newSeminar: Seminar = {
      ...seminar,
      id: seminars.length > 0 ? Math.max(...seminars.map(s => s.id)) + 1 : 1,
      attendees: Math.floor(Math.random() * 30) + 10, // Random attendees count between 10-40
    };

    setSeminars(prevSeminars => [...prevSeminars, newSeminar]);
  };

  const updateSeminar = (updatedSeminar: Seminar) => {
    setSeminars(prevSeminars => 
      prevSeminars.map(seminar => seminar.id === updatedSeminar.id ? updatedSeminar : seminar)
    );
  };

  const getSeminar = (id: number) => {
    return seminars.find(seminar => seminar.id === id);
  };

  return (
    <SeminarContext.Provider value={{ seminars, addSeminar, updateSeminar, getSeminar }}>
      {children}
    </SeminarContext.Provider>
  );
};
