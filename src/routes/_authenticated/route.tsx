import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    // getSession reads the locally stored session (no network round-trip),
    // so navigation between screens is instant.
    const { data } = await supabase.auth.getSession();
    if (!data.session?.user) throw redirect({ to: "/" });
    return { user: data.session.user };
  },

  component: () => <Outlet />,
});
