import Link from "next/link";
import "./globals.css";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="shell">
          <aside className="sidebar">
            <h1>CoAgent</h1>
            <nav>
              <Link href="/">Dashboard</Link>
              <Link href="/agents">Agents</Link>
              <Link href="/runs">Runs</Link>
              <Link href="/templates">Templates</Link>
              <Link href="/settings">Settings</Link>
            </nav>
          </aside>
          <main className="content">{children}</main>
        </div>
      </body>
    </html>
  );
}
