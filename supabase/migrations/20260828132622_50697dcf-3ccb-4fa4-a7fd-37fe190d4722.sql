CREATE TABLE public.device_accounts (
  device_id text PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.device_accounts TO authenticated;
GRANT ALL ON public.device_accounts TO service_role;
ALTER TABLE public.device_accounts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own device link" ON public.device_accounts FOR SELECT TO authenticated USING (user_id = auth.uid());