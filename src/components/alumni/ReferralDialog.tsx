
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Student {
  id: number;
  name: string;
  email: string;
}

interface ReferralDialogProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
}

const ReferralDialog: React.FC<ReferralDialogProps> = ({ isOpen, onClose, students }) => {
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [referralNote, setReferralNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success(`Successfully referred ${students.length} students to ${companyName}`);
      setIsSubmitting(false);
      resetForm();
      onClose();
    }, 1000);
  };

  const resetForm = () => {
    setCompanyName("");
    setPosition("");
    setReferralNote("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Refer Selected Students</DialogTitle>
          <DialogDescription>
            You are about to refer {students.length} student{students.length !== 1 ? 's' : ''} for a position.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="company">Company Name</Label>
            <Input 
              id="company" 
              placeholder="Enter company name" 
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="position">Position</Label>
            <Input 
              id="position" 
              placeholder="Enter job position" 
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="note">Referral Note (Optional)</Label>
            <Textarea 
              id="note" 
              placeholder="Add a personal note about the students"
              value={referralNote}
              onChange={(e) => setReferralNote(e.target.value)}
              rows={3}
            />
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || !companyName || !position}>
              {isSubmitting ? "Submitting..." : "Submit Referral"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReferralDialog;
