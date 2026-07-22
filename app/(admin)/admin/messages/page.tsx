"use client";

import React, { useEffect, useState } from "react";
import { markMessageAsRead, deleteMessage } from "@/actions/admin-actions";
import { Mail, MailOpen, Trash2, Inbox } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState("");

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/messages-list");
      const data = await response.json();
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkRead = async (id: string) => {
    try {
      const result = await markMessageAsRead(id);
      if (result.success) {
        setStatusMsg("Message marked as read.");
        fetchMessages();
      } else {
        setStatusMsg(result.message || "Failed to update message.");
      }
    } catch (err) {
      setStatusMsg("An error occurred during update.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      const result = await deleteMessage(id);
      if (result.success) {
        setStatusMsg("Message deleted successfully.");
        fetchMessages();
      } else {
        setStatusMsg(result.message || "Failed to delete message.");
      }
    } catch (err) {
      setStatusMsg("An error occurred during deletion.");
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl md:text-4xl text-[#0B1B3D] mb-2">
          Inquiry Inbox
        </h1>
        <p className="font-sans text-xs text-[#475569]">
          Review space assessment briefings, general queries, and contact requests submitted by website visitors.
        </p>
      </div>

      {statusMsg && (
        <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 p-4 rounded text-xs text-[#0B1B3D] font-sans tracking-wide">
          {statusMsg}
        </div>
      )}

      {/* Messages List */}
      <div className="flex flex-col gap-6">
        {loading ? (
          <div className="bg-white rounded-lg border border-[#E2E8F0] p-8 text-center font-sans text-xs text-[#475569]/60 uppercase tracking-widest">
            Fetching inquiry logs...
          </div>
        ) : messages.length === 0 ? (
          <div className="bg-white rounded-lg border border-[#E2E8F0] p-16 text-center flex flex-col items-center gap-4">
            <Inbox className="w-12 h-12 text-[#D4AF37]/40" />
            <p className="font-sans text-xs text-[#475569]/50">Your inbox is clean. No inquiries received yet.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-6 md:p-8 bg-white border rounded-lg shadow-sm flex flex-col justify-between gap-6 transition-all ${
                msg.isRead ? "border-[#E2E8F0]" : "border-[#D4AF37] bg-[#D4AF37]/5"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#E2E8F0]/60 pb-4">
                <div>
                  <h3 className="font-serif text-lg text-[#0B1B3D] font-medium flex items-center gap-2">
                    {msg.name}
                    {!msg.isRead && (
                      <span className="font-sans text-[8px] bg-[#D4AF37] text-white px-2 py-0.5 rounded-sm uppercase tracking-widest">
                        New
                      </span>
                    )}
                  </h3>
                  <div className="font-sans text-[10px] text-[#475569] mt-1 flex flex-wrap gap-x-4 gap-y-1">
                    <span>Email: <strong className="text-[#0B1B3D]">{msg.email}</strong></span>
                    <span>Phone: <strong className="text-[#0B1B3D]">{msg.phone}</strong></span>
                  </div>
                </div>

                <div className="font-sans text-[10px] text-[#475569]/60 flex items-center gap-2">
                  <span>{formatDate(msg.createdAt)}</span>
                </div>
              </div>

              <div>
                <h4 className="font-serif text-md text-[#D4AF37] mb-3 uppercase tracking-wider">
                  Subject: {msg.subject || "General Design Inquiry"}
                </h4>
                <p className="font-sans text-xs text-[#475569] leading-relaxed bg-[#F0F4F8] p-4 rounded border border-[#E2E8F0]/40">
                  {msg.message}
                </p>
              </div>

              <div className="border-t border-[#E2E8F0]/60 pt-4 flex justify-end gap-3">
                {!msg.isRead && (
                  <button
                    onClick={() => handleMarkRead(msg.id)}
                    className="flex items-center gap-2 px-4 py-2 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/5 transition-colors font-sans text-[9px] uppercase tracking-widest font-bold rounded"
                  >
                    <MailOpen className="w-3.5 h-3.5" />
                    Mark Read
                  </button>
                )}
                <button
                  onClick={() => handleDelete(msg.id)}
                  className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-500 hover:bg-red-50 transition-colors font-sans text-[9px] uppercase tracking-widest font-bold rounded"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete Brief
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
