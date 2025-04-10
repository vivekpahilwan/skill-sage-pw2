
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface SeminarFormProps {
  initialData?: {
    id?: string;
    title: string;
    date: string;
    time: string;
    location: string;
    description?: string;
    maxAttendees?: number;
  };
  onSubmit: (data: any) => void;
  mode: "create" | "edit";
}

const SeminarForm: React.FC<SeminarFormProps> = ({ initialData, onSubmit, mode }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState(
    initialData || {
      title: "",
      date: format(new Date(), "MMM dd, yyyy"),
      time: "14:00",
      location: "Virtual",
      description: "",
      maxAttendees: 50,
    }
  );
  
  const [date, setDate] = useState<Date | undefined>(
    initialData?.date ? new Date(initialData.date) : new Date()
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (value: string) => {
    setFormData((prev) => ({ ...prev, location: value }));
  };

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      setFormData((prev) => ({
        ...prev,
        date: format(newDate, "MMM dd, yyyy"),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.location || !formData.time) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      if (mode === "create" && user) {
        // Format data for Supabase
        const seminarData = {
          title: formData.title,
          date: `${formData.date} ${formData.time}`,
          location: formData.location,
          description: formData.description || null,
          max_attendees: formData.maxAttendees ? parseInt(formData.maxAttendees.toString()) : null,
          current_attendees: 0,
          requested_by: user.id,
          is_approved: user.role === "placement" ? true : false, // Auto approve if TPO is creating
        };

        // Insert new seminar
        const { data, error } = await supabase
          .from('seminars')
          .insert([seminarData])
          .select();

        if (error) throw error;
        
        toast.success(user.role === "placement" 
          ? "Seminar scheduled successfully" 
          : "Seminar request submitted successfully");
        
        onSubmit(data[0]);
      } else if (mode === "edit" && initialData?.id) {
        // Format data for update
        const seminarData = {
          title: formData.title,
          date: `${formData.date} ${formData.time}`,
          location: formData.location,
          description: formData.description || null,
          max_attendees: formData.maxAttendees ? parseInt(formData.maxAttendees.toString()) : null,
          updated_at: new Date().toISOString(),
        };

        // Update existing seminar
        const { data, error } = await supabase
          .from('seminars')
          .update(seminarData)
          .eq('id', initialData.id)
          .select();

        if (error) throw error;
        
        toast.success("Seminar updated successfully");
        onSubmit(data[0]);
      }
    } catch (error: any) {
      console.error("Error submitting seminar:", error);
      toast.error(error.message || "Failed to submit seminar");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Seminar Title *</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="e.g. Career Pathways in Tech"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="date">Seminar Date *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">Seminar Time *</Label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="time"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Select value={formData.location} onValueChange={handleLocationChange}>
            <SelectTrigger id="location">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Virtual">Virtual (Online)</SelectItem>
              <SelectItem value="Campus Auditorium">Campus Auditorium</SelectItem>
              <SelectItem value="Conference Room A">Conference Room A</SelectItem>
              <SelectItem value="Conference Room B">Conference Room B</SelectItem>
              <SelectItem value="Main Hall">Main Hall</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxAttendees">Maximum Attendees</Label>
          <Input
            id="maxAttendees"
            name="maxAttendees"
            type="number"
            min={1}
            value={formData.maxAttendees}
            onChange={handleChange}
            placeholder="50"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Seminar Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter seminar description..."
          className="min-h-32"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button type="submit">{mode === "create" ? "Schedule Seminar" : "Update Seminar"}</Button>
      </div>
    </form>
  );
};

export default SeminarForm;
