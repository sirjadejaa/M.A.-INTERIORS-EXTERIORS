"use client";

import React, { useEffect, useState } from "react";
import { deleteBlog, createBlog } from "@/actions/admin-actions";
import { Plus, Trash2, BookOpen, ExternalLink } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState("");

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/blogs-list");
      const data = await response.json();
      if (data.success) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this journal post?")) return;
    try {
      const result = await deleteBlog(id);
      if (result.success) {
        setStatusMsg("Journal post deleted successfully.");
        fetchBlogs();
      } else {
        setStatusMsg(result.message || "Failed to delete post.");
      }
    } catch (err) {
      setStatusMsg("An error occurred during deletion.");
    }
  };

  const handleAddMock = async () => {
    try {
      const mockPost = {
        title: `Luxury Interior Trends ${blogs.length + 1}`,
        slug: `luxury-interior-trends-${blogs.length + 1}`,
        content: "Luxury finishes evolve towards organic, texture-heavy minimalism incorporating fluted wood and textured walls.",
        excerpt: "An editorial deep-dive into the emerging design elements of organic luxury curation.",
        coverImage: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=800",
        category: "Design Trends",
        isPublished: true,
      };

      const result = await createBlog(mockPost);
      if (result.success) {
        setStatusMsg("Journal article published successfully.");
        fetchBlogs();
      } else {
        setStatusMsg(result.message || "Failed to publish article.");
      }
    } catch (error) {
      setStatusMsg("An error occurred during publishing.");
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-[#0B1B3D] mb-2">
            Journal Articles
          </h1>
          <p className="font-sans text-xs text-[#475569]">
            Configure and publish editorial articles documenting materials, trends, and project updates.
          </p>
        </div>
        <button
          onClick={handleAddMock}
          className="flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-white hover:bg-[#D4AF37]/90 transition-colors font-sans text-[10px] font-bold uppercase tracking-widest rounded shadow-sm w-max"
        >
          <Plus className="w-4 h-4" />
          Publish Mock Journal
        </button>
      </div>

      {statusMsg && (
        <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 p-4 rounded text-xs text-[#0B1B3D] font-sans tracking-wide">
          {statusMsg}
        </div>
      )}

      {/* Blogs list */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center font-sans text-xs text-[#475569]/60 uppercase tracking-widest">
            Loading journal catalog...
          </div>
        ) : blogs.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center gap-4">
            <BookOpen className="w-12 h-12 text-[#D4AF37]/40" />
            <p className="font-sans text-xs text-[#475569]/50">No articles found. Publish your first editorial.</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F0F4F8] border-b border-[#E2E8F0] font-sans text-[9px] text-[#475569] uppercase tracking-widest">
                <th className="p-4 pl-6">Journal Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Date</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="font-sans text-xs text-[#475569] divide-y divide-[#E2E8F0]/60">
              {blogs.map((b) => (
                <tr key={b.id} className="hover:bg-[#F0F4F8]/40">
                  <td className="p-4 pl-6 font-medium text-[#0B1B3D]">{b.title}</td>
                  <td className="p-4">{b.category}</td>
                  <td className="p-4">{formatDate(b.createdAt)}</td>
                  <td className="p-4 pr-6 text-right flex items-center justify-end gap-3 h-full pt-5">
                    <Link
                      href={`/blog/${b.slug}`}
                      target="_blank"
                      className="p-1.5 text-[#D4AF37] hover:bg-[#E2E8F0] rounded transition-colors"
                      title="View public page"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(b.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"
                      title="Delete post"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
