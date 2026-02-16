import Link from "next/link";
import { LogoutButton } from "./LogoutButton";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b border-[var(--border-subtle)] bg-panel-bg/60 backdrop-blur-md">
      <Link
        href="/app/dashboard"
        className="font-mono text-red text-sm tracking-[0.2em] uppercase"
      >
        Directorate Portal
      </Link>
      <LogoutButton />
    </nav>
  );
}
