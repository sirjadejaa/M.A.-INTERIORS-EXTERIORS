"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// Authorization helper
async function checkAuth() {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("Unauthorized. Please log in first.");
  }
  return session;
}

/* =========================================================================
   PROJECT CRUD ACTIONS
   ========================================================================= */

export async function createProject(formData: any) {
  await checkAuth();

  try {
    const project = await prisma.project.create({
      data: {
        title: formData.title,
        description: formData.description,
        longDesc: formData.longDesc,
        category: formData.category,
        coverImage: formData.coverImage,
        images: formData.images || [],
        location: formData.location,
        client: formData.client,
        area: formData.area,
        materials: formData.materials || [],
        duration: formData.duration,
        testimonial: formData.testimonial,
        clientName: formData.clientName,
        clientRole: formData.clientRole,
        isFeatured: formData.isFeatured || false,
      },
    });

    revalidatePath("/projects");
    revalidatePath("/");
    return { success: true, project };
  } catch (error: any) {
    console.error("Create project error:", error);
    return { success: false, message: error.message || "Failed to create project" };
  }
}

export async function updateProject(id: string, formData: any) {
  await checkAuth();

  try {
    const project = await prisma.project.update({
      where: { id },
      data: {
        title: formData.title,
        description: formData.description,
        longDesc: formData.longDesc,
        category: formData.category,
        coverImage: formData.coverImage,
        images: formData.images || [],
        location: formData.location,
        client: formData.client,
        area: formData.area,
        materials: formData.materials || [],
        duration: formData.duration,
        testimonial: formData.testimonial,
        clientName: formData.clientName,
        clientRole: formData.clientRole,
        isFeatured: formData.isFeatured || false,
      },
    });

    revalidatePath(`/projects/${id}`);
    revalidatePath("/projects");
    revalidatePath("/");
    return { success: true, project };
  } catch (error: any) {
    console.error("Update project error:", error);
    return { success: false, message: error.message || "Failed to update project" };
  }
}

export async function deleteProject(id: string) {
  await checkAuth();

  try {
    await prisma.project.delete({
      where: { id },
    });

    revalidatePath("/projects");
    revalidatePath("/");
    return { success: true, message: "Project deleted successfully." };
  } catch (error: any) {
    console.error("Delete project error:", error);
    return { success: false, message: error.message || "Failed to delete project" };
  }
}

/* =========================================================================
   SERVICE CRUD ACTIONS
   ========================================================================= */

export async function createService(formData: any) {
  await checkAuth();

  try {
    const service = await prisma.service.create({
      data: {
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        longDesc: formData.longDesc,
        icon: formData.icon,
        coverImage: formData.coverImage,
        gallery: formData.gallery || [],
        processSteps: formData.processSteps || [],
        features: formData.features || [],
      },
    });

    revalidatePath("/services");
    revalidatePath("/");
    return { success: true, service };
  } catch (error: any) {
    console.error("Create service error:", error);
    return { success: false, message: error.message || "Failed to create service" };
  }
}

export async function updateService(id: string, formData: any) {
  await checkAuth();

  try {
    const service = await prisma.service.update({
      where: { id },
      data: {
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        longDesc: formData.longDesc,
        icon: formData.icon,
        coverImage: formData.coverImage,
        gallery: formData.gallery || [],
        processSteps: formData.processSteps || [],
        features: formData.features || [],
      },
    });

    revalidatePath(`/services/${service.slug}`);
    revalidatePath("/services");
    revalidatePath("/");
    return { success: true, service };
  } catch (error: any) {
    console.error("Update service error:", error);
    return { success: false, message: error.message || "Failed to update service" };
  }
}

export async function deleteService(id: string) {
  await checkAuth();

  try {
    await prisma.service.delete({
      where: { id },
    });

    revalidatePath("/services");
    revalidatePath("/");
    return { success: true, message: "Service deleted successfully." };
  } catch (error: any) {
    console.error("Delete service error:", error);
    return { success: false, message: error.message || "Failed to delete service" };
  }
}

/* =========================================================================
   BLOG CRUD ACTIONS
   ========================================================================= */

export async function createBlog(formData: any) {
  const session = await checkAuth();

  try {
    const blog = await prisma.blog.create({
      data: {
        title: formData.title,
        slug: formData.slug,
        content: formData.content,
        excerpt: formData.excerpt,
        coverImage: formData.coverImage,
        category: formData.category,
        authorId: session.user.id,
        isPublished: formData.isPublished || false,
      },
    });

    revalidatePath("/blog");
    revalidatePath("/");
    return { success: true, blog };
  } catch (error: any) {
    console.error("Create blog error:", error);
    return { success: false, message: error.message || "Failed to create blog" };
  }
}

export async function updateBlog(id: string, formData: any) {
  await checkAuth();

  try {
    const blog = await prisma.blog.update({
      where: { id },
      data: {
        title: formData.title,
        slug: formData.slug,
        content: formData.content,
        excerpt: formData.excerpt,
        coverImage: formData.coverImage,
        category: formData.category,
        isPublished: formData.isPublished || false,
      },
    });

    revalidatePath(`/blog/${blog.slug}`);
    revalidatePath("/blog");
    revalidatePath("/");
    return { success: true, blog };
  } catch (error: any) {
    console.error("Update blog error:", error);
    return { success: false, message: error.message || "Failed to update blog" };
  }
}

export async function deleteBlog(id: string) {
  await checkAuth();

  try {
    await prisma.blog.delete({
      where: { id },
    });

    revalidatePath("/blog");
    revalidatePath("/");
    return { success: true, message: "Blog deleted successfully." };
  } catch (error: any) {
    console.error("Delete blog error:", error);
    return { success: false, message: error.message || "Failed to delete blog" };
  }
}

/* =========================================================================
   INBOX / CONTACT MESSAGE ACTIONS
   ========================================================================= */

export async function markMessageAsRead(id: string) {
  await checkAuth();

  try {
    await prisma.contactMessage.update({
      where: { id },
      data: { isRead: true },
    });

    revalidatePath("/admin/messages");
    return { success: true, message: "Marked message as read." };
  } catch (error: any) {
    console.error("Mark message as read error:", error);
    return { success: false, message: error.message || "Failed to update message" };
  }
}

export async function deleteMessage(id: string) {
  await checkAuth();

  try {
    await prisma.contactMessage.delete({
      where: { id },
    });

    revalidatePath("/admin/messages");
    return { success: true, message: "Message deleted successfully." };
  } catch (error: any) {
    console.error("Delete message error:", error);
    return { success: false, message: error.message || "Failed to delete message" };
  }
}

/* =========================================================================
   DASHBOARD STATS
   ========================================================================= */

export async function getDashboardStats() {
  await checkAuth();

  try {
    const projectsCount = await prisma.project.count();
    const servicesCount = await prisma.service.count();
    const blogsCount = await prisma.blog.count();
    const messagesCount = await prisma.contactMessage.count();
    const unreadMessagesCount = await prisma.contactMessage.count({
      where: { isRead: false },
    });
    const subscribersCount = await prisma.newsletterSubscriber.count();

    // Fetch latest messages
    const recentMessages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    return {
      success: true,
      stats: {
        projectsCount,
        servicesCount,
        blogsCount,
        messagesCount,
        unreadMessagesCount,
        subscribersCount,
        recentMessages,
      },
    };
  } catch (error: any) {
    console.error("Get dashboard stats error:", error);
    return { success: false, message: error.message || "Failed to load dashboard stats" };
  }
}
