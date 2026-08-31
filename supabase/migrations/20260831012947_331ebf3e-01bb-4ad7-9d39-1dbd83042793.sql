ALTER TABLE public.tasks
  ADD COLUMN IF NOT EXISTS is_quick boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS is_high_reward boolean NOT NULL DEFAULT false;