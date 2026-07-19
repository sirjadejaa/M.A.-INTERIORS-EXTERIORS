"use client";

import React, { useEffect, useState } from "react";
import { deleteService, createService } from "@/actions/admin-actions";
import { Plus, Trash2, Wrench, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function AdminServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState("");

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/services-list");
      const data = await response.json();
      if (data.success) {
        setServices(data.services);
      }
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      const result = await deleteService(id);
      if (result.success) {
        setStatusMsg("Service deleted successfully.");
        fetchServices();
      } else {
        setStatusMsg(result.message || "Failed to delete service.");
      }
    } catch (err) {
      setStatusMsg("An error occurred during deletion.");
    }
  };

  const handleAddMock = async () => {
    try {
      const mockServ = {
        title: `Custom Wood Joinery & Furniture ${services.length + 1}`,
        slug: `custom-wood-joinery-${services.length + 1}`,
        description: "Bespoke carpentry detailing prepared at our custom wood workshop.",
        longDesc: "This is a premium bespoke joinery and millwork service built with solid teak, veneer paneling, and German drawer automation.",
        icon: "Hammer",
        coverImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800",
        gallery: [],
        processSteps: ["Architectural Sketch", "Joinery Assembly", "Finishing Coat"],
        features: ["Premium Natural Veneers", "Dovetail Wood Joints"],
      };

      const result = await createService(mockServ);
      if (result.success) {
        setStatusMsg("Service added successfully.");
        fetchServices();
      } else {
        setStatusMsg(result.message || "Failed to add service.");
      }
    } catch (error) {
      setStatusMsg("An error occurred during addition.");
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-[#111111] mb-2">
            Manage Services
          </h1>
          <p className="font-sans text-xs text-[#555555]">
            Configure and maintain the specialized design capabilities listed on the studio directory.
          </p>
        </div>
        <button
          onClick={handleAddMock}
          className="flex items-center gap-2 px-6 py-3 bg-[#A67C52] text-white hover:bg-[#A67C52]/90 transition-colors font-sans text-[10px] font-bold uppercase tracking-widest rounded shadow-sm w-max"
        >
          <Plus className="w-4 h-4" />
          Add Mock Service
        </button>
      </div>

      {statusMsg && (
        <div className="bg-[#A67C52]/10 border border-[#A67C52]/20 p-4 rounded text-xs text-[#111111] font-sans tracking-wide">
          {statusMsg}
        </div>
      )}

      {/* Services Table List */}
      <div className="bg-white rounded-lg border border-[#ECE8E2] shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center font-sans text-xs text-[#555555]/60 uppercase tracking-widest">
            Loading design catalog...
          </div>
        ) : services.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center gap-4">
            <Wrench className="w-12 h-12 text-[#A67C52]/40" />
            <p className="font-sans text-xs text-[#555555]/50">No services found. Add your first service discipline.</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8F7F4] border-b border-[#ECE8E2] font-sans text-[9px] text-[#555555] uppercase tracking-widest">
                <th className="p-4 pl-6">Service Title</th>
                <th className="p-4">Slug URL</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="font-sans text-xs text-[#555555] divide-y divide-[#ECE8E2]/60">
              {services.map((serv) => (
                <tr key={serv.id} className="hover:bg-[#F8F7F4]/40">
                  <td className="p-4 pl-6 font-medium text-[#111111]">{serv.title}</td>
                  <td className="p-4 text-slate-400">/services/{serv.slug}</td>
                  <td className="p-4 pr-6 text-right flex items-center justify-end gap-3 h-full pt-5">
                    <Link
                      href={`/services/${serv.slug}`}
                      target="_blank"
                      className="p-1.5 text-[#A67C52] hover:bg-[#ECE8E2] rounded transition-colors"
                      title="View public page"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(serv.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"
                      title="Delete service"
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
