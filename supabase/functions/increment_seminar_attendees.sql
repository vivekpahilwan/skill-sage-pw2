
CREATE OR REPLACE FUNCTION public.increment_seminar_attendees(sem_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.seminars
  SET current_attendees = current_attendees + 1
  WHERE id = sem_id;
END;
$$;
