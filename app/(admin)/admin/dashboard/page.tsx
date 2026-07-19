"use client";

import React, { useEffect, useState } from "react";
import { getDashboardStats } from "@/actions/admin-actions";
import { FolderKanban, Wrench, BookOpen, Mail, Users, MessageSquare } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface DashboardData {
  projectsCount: number;
  servicesCount: number;
  blogsCount: number;
  messagesCount: number;
  unreadMessagesCount: number;
  subscribersCount: number;
  recentMessages: any[];
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const result = await getDashboardStats();
        if (result.success && result.stats) {
          setData(result.stats);
        }
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="font-sans text-xs text-[#555555] uppercase tracking-widest">
        Loading analytics metrics...
      </div>
    );
  }

  const statCards = [
    { name: "Portfolio Projects", count: data?.projectsCount || 0, icon: FolderKanban },
    { name: "Specialized Services", count: data?.servicesCount || 0, icon: Wrench },
    { name: "Journal Blogs", count: data?.blogsCount || 0, icon: BookOpen },
    { name: "Inquiry Submissions", count: data?.messagesCount || 0, icon: Mail, highlight: (data?.unreadMessagesCount || 0) > 0 },
    { name: "Newsletter Subscribers", count: data?.subscribersCount || 0, icon: Users },
  ];

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl md:text-4xl text-[#111111] mb-2">
          Atelier Overview
        </h1>
        <p className="font-sans text-xs text-[#555555]">
          Manage and monitor portfolios, service blue prints, journal publications, and incoming project briefs.
        </p>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg border border-[#ECE8E2] shadow-sm flex flex-col justify-between"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="font-sans text-[10px] text-[#555555]/60 uppercase tracking-widest">
                  {stat.name}
                </span>
                <div className={`p-2 rounded-full ${stat.highlight ? "bg-red-50 text-red-500" : "bg-[#ECE8E2] text-[#A67C52]"}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <span className="font-serif text-3xl font-light text-[#111111]">
                {stat.count}
              </span>
              {stat.highlight && (
                <span className="text-[9px] text-red-500 font-sans tracking-wide mt-2">
                  {data?.unreadMessagesCount} Unread Briefs
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Recent Messages / Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
        {/* Messages */}
        <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-lg border border-[#ECE8E2] shadow-sm">
          <h2 className="font-serif text-xl text-[#111111] mb-6 flex items-center gap-2 border-b border-[#ECE8E2] pb-4">
            <MessageSquare className="w-5 h-5 text-[#A67C52]" />
            Recent Inquiry Inbox
          </h2>

          <div className="flex flex-col gap-4">
            {!data?.recentMessages || data.recentMessages.length === 0 ? (
              <p className="font-sans text-xs text-[#555555]/50 py-4 text-center">
                Your inquiry box is currently empty.
              </p>
            ) : (
              data.recentMessages.map((msg: any) => (
                <div
                  key={msg.id}
                  className={`p-4 border rounded-md font-sans text-xs ${
                    msg.isRead
                      ? "bg-transparent border-[#ECE8E2]/60"
                      : "bg-[#A67C52]/5 border-[#A67C52]/20 font-semibold"
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[#111111] font-medium">{msg.name}</span>
                    <span className="text-[10px] text-[#555555]/60">{formatDate(msg.createdAt)}</span>
                  </div>
                  <p className="text-[#A67C52] text-[10px] uppercase tracking-wider mb-2 font-bold">{msg.subject || "General Inquiry"}</p>
                  <p className="text-[#555555] font-light truncate">{msg.message}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Help Card */}
        <div className="lg:col-span-4 bg-[#161616] text-[#F8F7F4] p-8 rounded-lg border border-white/5 flex flex-col justify-between shadow-lg">
          <div>
            <h3 className="font-serif text-lg text-white mb-4 border-b border-white/5 pb-2">
              Atelier Support
            </h3>
            <p className="font-sans text-xs text-[#ECE8E2]/70 leading-relaxed mb-6">
              Need assistance modifying the database schema or running backup configurations? Connect directly with the systems administrator.
            </p>
          </div>
          <div className="flex flex-col gap-2 font-sans text-[10px] tracking-wider text-[#ECE8E2]/50">
            <span>DEVELOPMENT STATUS: PORTFOLIO</span>
            <span>OS PLATFORM: MAC OS</span>
            <span>DBMS ENGINE: POSTGRESQL</span>
          </div>
        </div>
      </div>
    </div>
  );
}
