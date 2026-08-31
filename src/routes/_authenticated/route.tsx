import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async ({ location }) => {
    // getSession reads the locally stored session (no network round-trip),
    // so navigation between screens is instant.
    const { data } = await supabase.auth.getSession();
    if (!data.session?.user) {
      // The admin console has its own sign-in screen; everyone else lands on the app entry.
      throw redirect({ to: location.pathname.startsWith("/admin") ? "/auth" : "/" });
    }
    return { user: data.session.user };
  },

  component: () => <Outlet />,
});

