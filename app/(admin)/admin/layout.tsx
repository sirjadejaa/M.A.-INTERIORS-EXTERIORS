"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  LayoutDashboard,
  FolderKanban,
  Wrench,
  BookOpen,
  Mail,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  // Redirect if session is unauthenticated
  React.useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  const menuItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Projects", href: "/admin/projects", icon: FolderKanban },
    { name: "Services", href: "/admin/services", icon: Wrench },
    { name: "Blogs", href: "/admin/blogs", icon: BookOpen },
    { name: "Messages", href: "/admin/messages", icon: Mail },
  ];

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#161616] flex items-center justify-center text-[#ECE8E2] font-sans text-xs uppercase tracking-widest">
        Verifying Atelier Credentials...
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#161616] text-[#F8F7F4] flex flex-col justify-between p-6 border-r border-[#ECE8E2]/10 md:sticky md:top-0 md:h-screen">
        <div className="flex flex-col">
          {/* Logo */}
          <div className="pb-8 mb-8 border-b border-white/5 text-center md:text-left">
            <h1 className="font-serif text-2xl text-white tracking-[0.2em] uppercase font-light">
              M.A.
            </h1>
            <span className="font-sans text-[7px] text-[#A67C52] tracking-[0.4em] uppercase block mt-1">
              Management Portal
            </span>
          </div>

          {/* Menu */}
          <nav className="flex flex-col gap-2 font-sans text-xs">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                    isActive
                      ? "bg-[#A67C52] text-white"
                      : "text-[#ECE8E2]/80 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info / Logout */}
        <div className="pt-6 mt-8 border-t border-white/5 flex flex-col gap-4">
          <div className="flex flex-col">
            <span className="font-sans text-[10px] text-white font-semibold tracking-wide">
              {session.user?.name || "Admin User"}
            </span>
            <span className="font-sans text-[8px] text-[#A67C52] uppercase tracking-wider mt-0.5">
              {session.user?.role || "Editor"} Account
            </span>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-3 px-4 py-3 bg-red-950/20 text-red-400 border border-red-950/40 rounded-md hover:bg-red-950/40 transition-colors text-xs font-sans"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-6 md:p-12 overflow-y-auto">{children}</main>
    </div>
  );
}
