import { createRootRoute, HeadContent, Outlet, Scripts, useRouterState } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { AppShell, BareShell, NseShell } from "@/components/layout/AppShell";
import { ThemeProvider } from "@/lib/theme";
import appCss from "../styles.css?url";

const APP_NAME = "PlanVista Finance";

const THEME_BOOT = `(function(){try{var t=localStorage.getItem("pv-theme");if(t==="light"){document.documentElement.classList.remove("dark");document.documentElement.style.colorScheme="light";}else{document.documentElement.classList.add("dark");document.documentElement.style.colorScheme="dark";}}catch(e){document.documentElement.classList.add("dark");}})();`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "PlanVista Finance — live NSE/BSE market tracking, SIP calculator and goal-based planning. For learning purposes only.",
      },
      { name: "theme-color", content: "#131314" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/planvista-icon.png" },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: Root,
});

function Root() {
  return (
    <html lang="en" className="dark antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="bg-bg text-fg">
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
        <PreviewHostBridge />
        <AuthProvider>
          <ThemeProvider>
            <ShellSwitch />
          </ThemeProvider>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

function ShellSwitch() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname.startsWith("/nse")) {
    return (
      <NseShell>
        <Outlet />
      </NseShell>
    );
  }
  const bare = pathname === "/gate" || pathname === "/quiz" || pathname === "/onboarding" || pathname === "/report";
  if (bare) {
    return (
      <BareShell>
        <Outlet />
      </BareShell>
    );
  }
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
