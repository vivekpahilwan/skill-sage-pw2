
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { toast } from "sonner";

interface JobFormProps {
  initialData?: {
    id?: number;
    title: string;
    company: string;
    location: string;
    type: string;
    description: string;
    requirements: string[];
    salary: string;
    deadline: string;
  };
  onSubmit: (data: any) => void;
  mode: "create" | "edit";
}

const JobForm: React.FC<JobFormProps> = ({ initialData, onSubmit, mode }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(
    initialData || {
      title: "",
      company: "",
      location: "",
      type: "Full-time",
      description: "",
      requirements: [],
      salary: "",
      deadline: format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), "MMM dd, yyyy"), // Default 30 days from now
    }
  );
  const [skill, setSkill] = useState("");
  const [date, setDate] = useState<Date | undefined>(
    initialData?.deadline ? new Date(initialData.deadline) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value }));
  };

  const handleLocationChange = (value: string) => {
    setFormData((prev) => ({ ...prev, location: value }));
  };

  const addSkill = () => {
    if (skill.trim() && !formData.requirements.includes(skill.trim())) {
      setFormData((prev) => ({
        ...prev,
        requirements: [...prev.requirements, skill.trim()],
      }));
      setSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((s) => s !== skillToRemove),
    }));
  };

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      setFormData((prev) => ({
        ...prev,
        deadline: format(newDate, "MMM dd, yyyy"),
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.company || !formData.description || !formData.salary) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.requirements.length === 0) {
      toast.error("Please add at least one required skill");
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Job Title *</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="e.g. Frontend Developer"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company Name *</Label>
          <Input
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            placeholder="e.g. TechCorp Inc."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Select value={formData.location} onValueChange={handleLocationChange}>
            <SelectTrigger id="location">
              <SelectValue placeholder="Select job location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Remote">Remote</SelectItem>
              <SelectItem value="New York, NY">New York, NY</SelectItem>
              <SelectItem value="San Francisco, CA">San Francisco, CA</SelectItem>
              <SelectItem value="London, UK">London, UK</SelectItem>
              <SelectItem value="Bangalore, India">Bangalore, India</SelectItem>
              <SelectItem value="Tokyo, Japan">Tokyo, Japan</SelectItem>
              <SelectItem value="Sydney, Australia">Sydney, Australia</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Job Type *</Label>
          <Select value={formData.type} onValueChange={handleTypeChange}>
            <SelectTrigger id="type">
              <SelectValue placeholder="Select job type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Full-time">Full-time</SelectItem>
              <SelectItem value="Part-time">Part-time</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
              <SelectItem value="Internship">Internship</SelectItem>
              <SelectItem value="Temporary">Temporary</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Job Description *</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Enter job description..."
            className="min-h-32"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="skills">Required Skills *</Label>
          <div className="flex space-x-2">
            <Input
              id="skills"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              placeholder="Add a required skill"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
            />
            <Button type="button" onClick={addSkill}>
              Add
            </Button>
          </div>
          {formData.requirements.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.requirements.map((req) => (
                <Badge key={req} variant="secondary" className="px-2 py-1">
                  {req}
                  <X
                    className="ml-1 h-3 w-3 cursor-pointer"
                    onClick={() => removeSkill(req)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="salary">Salary *</Label>
          <Input
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
            placeholder="e.g. $60,000-$80,000/year or $25-30/hour"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="deadline">Application Deadline *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
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
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button type="submit">{mode === "create" ? "Create Opportunity" : "Update Opportunity"}</Button>
      </div>
    </form>
  );
};

export default JobForm;
