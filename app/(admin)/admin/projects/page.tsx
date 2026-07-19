"use client";

import React, { useEffect, useState } from "react";
import { prisma } from "@/lib/prisma"; // Note: Client side will retrieve via state/actions
import { deleteProject, createProject } from "@/actions/admin-actions";
import { Plus, Trash2, FolderOpen, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState("");

  // Retrieve projects dynamically
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/projects-list"); // Create API endpoint to list projects safely
      const data = await response.json();
      if (data.success) {
        setProjects(data.projects);
      }
    } catch (error) {
      console.error("Failed to fetch projects via API:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const result = await deleteProject(id);
      if (result.success) {
        setStatusMsg("Project deleted successfully.");
        fetchProjects();
      } else {
        setStatusMsg(result.message || "Failed to delete project.");
      }
    } catch (err) {
      setStatusMsg("An error occurred while deleting.");
    }
  };

  const handleAddMock = async () => {
    try {
      const mockProj = {
        title: `Luxury Apartment Curation ${projects.length + 1}`,
        description: "Bespoke apartment design curation with premium stone and lighting.",
        longDesc: "This is a luxury apartment design curation featuring modular wardrobes, custom walnut carpentry, false ceiling automation, and Italian marble surfaces.",
        category: "Residential",
        coverImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800",
        location: "Mira Road East, Mumbai",
        client: "Mr. Kapoor",
        area: "1,800 sq ft",
        materials: ["Smoked Oak Veneer", "Statutuario Marble"],
        duration: "4 Months",
      };
      
      const result = await createProject(mockProj);
      if (result.success) {
        setStatusMsg("Mock project added successfully.");
        fetchProjects();
      } else {
        setStatusMsg(result.message || "Failed to add project.");
      }
    } catch (error) {
      setStatusMsg("An error occurred during project seeding.");
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-[#111111] mb-2">
            Manage Projects
          </h1>
          <p className="font-sans text-xs text-[#555555]">
            Configure and maintain the portfolio works displayed on the public collections catalog.
          </p>
        </div>
        <button
          onClick={handleAddMock}
          className="flex items-center gap-2 px-6 py-3 bg-[#A67C52] text-white hover:bg-[#A67C52]/90 transition-colors font-sans text-[10px] font-bold uppercase tracking-widest rounded shadow-sm w-max"
        >
          <Plus className="w-4 h-4" />
          Add Mock Project
        </button>
      </div>

      {statusMsg && (
        <div className="bg-[#A67C52]/10 border border-[#A67C52]/20 p-4 rounded text-xs text-[#111111] font-sans tracking-wide">
          {statusMsg}
        </div>
      )}

      {/* Projects Table List */}
      <div className="bg-white rounded-lg border border-[#ECE8E2] shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center font-sans text-xs text-[#555555]/60 uppercase tracking-widest">
            Fetching project inventory...
          </div>
        ) : projects.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center gap-4">
            <FolderOpen className="w-12 h-12 text-[#A67C52]/40" />
            <p className="font-sans text-xs text-[#555555]/50">No projects found. Add your first design project.</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8F7F4] border-b border-[#ECE8E2] font-sans text-[9px] text-[#555555] uppercase tracking-widest">
                <th className="p-4 pl-6">Project Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Location</th>
                <th className="p-4">Dimensions</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="font-sans text-xs text-[#555555] divide-y divide-[#ECE8E2]/60">
              {projects.map((proj) => (
                <tr key={proj.id} className="hover:bg-[#F8F7F4]/40">
                  <td className="p-4 pl-6 font-medium text-[#111111]">{proj.title}</td>
                  <td className="p-4">{proj.category}</td>
                  <td className="p-4">{proj.location}</td>
                  <td className="p-4">{proj.area}</td>
                  <td className="p-4 pr-6 text-right flex items-center justify-end gap-3 h-full pt-5">
                    <Link
                      href={`/projects/${proj.id}`}
                      target="_blank"
                      className="p-1.5 text-[#A67C52] hover:bg-[#ECE8E2] rounded transition-colors"
                      title="View public page"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(proj.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"
                      title="Delete project"
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
