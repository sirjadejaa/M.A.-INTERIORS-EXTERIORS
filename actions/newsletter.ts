"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export async function subscribeToNewsletter(email: string) {
  try {
    // Validate input
    const validation = newsletterSchema.safeParse({ email });
    if (!validation.success) {
      return {
        success: false,
        message: validation.error.issues[0].message,
      };
    }

    const subscriberEmail = email.toLowerCase().trim();

    // Check duplicate
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email: subscriberEmail },
    });

    if (existing) {
      return {
        success: true,
        message: "You are already subscribed to our atelier newsletter.",
      };
    }

    // Save subscriber
    await prisma.newsletterSubscriber.create({
      data: {
        email: subscriberEmail,
      },
    });

    return {
      success: true,
      message: "Thank you for subscribing to our luxury design updates.",
    };
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return {
      success: false,
      message: "Server error. Please try again later.",
    };
  }
}
