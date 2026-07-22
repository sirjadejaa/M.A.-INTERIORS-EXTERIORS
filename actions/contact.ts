"use server";

import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/nodemailer";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  subject: z.string().optional().default("General Inquiry"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function submitContactForm(data: z.infer<typeof contactSchema>) {
  try {
    // Validate inputs
    const validatedData = contactSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        success: false,
        message: validatedData.error.issues[0].message,
      };
    }

    const { name, email, phone, subject, message } = validatedData.data;

    // 1. Save in database
    const dbRecord = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone,
        subject,
        message,
      },
    });

    // 2. Prepare luxury email HTML
    const emailHtml = `
      <div style="font-family: 'Inter', sans-serif; background-color: #F0F4F8; color: #0A192F; padding: 40px 20px; max-width: 600px; margin: 0 auto; border: 1px solid #E2E8F0;">
        <div style="text-align: center; border-bottom: 1px solid #E2E8F0; padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="font-family: 'Georgia', serif; font-size: 28px; font-weight: 300; letter-spacing: 0.15em; margin: 0; color: #0B1B3D;">Turk</h1>
          <p style="font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: #D4AF37; margin: 5px 0 0 0;">Interiors</p>
        </div>
        
        <h2 style="font-family: 'Georgia', serif; font-size: 20px; font-weight: 400; color: #D4AF37; margin-bottom: 20px;">New Atelier Inquiry Received</h2>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 14px;">
          <tr style="border-bottom: 1px solid #E2E8F0;">
            <td style="padding: 10px 0; font-weight: 600; width: 120px;">Name:</td>
            <td style="padding: 10px 0; color: #475569;">${name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E2E8F0;">
            <td style="padding: 10px 0; font-weight: 600;">Email:</td>
            <td style="padding: 10px 0; color: #475569;">${email}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E2E8F0;">
            <td style="padding: 10px 0; font-weight: 600;">Phone:</td>
            <td style="padding: 10px 0; color: #475569;">${phone}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E2E8F0;">
            <td style="padding: 10px 0; font-weight: 600;">Subject:</td>
            <td style="padding: 10px 0; color: #475569;">${subject}</td>
          </tr>
          <tr>
            <td style="padding: 15px 0 10px 0; font-weight: 600;" colspan="2">Message:</td>
          </tr>
          <tr>
            <td style="padding: 0 0 20px 0; color: #475569; line-height: 1.6;" colspan="2">${message}</td>
          </tr>
        </table>
        
        <div style="font-size: 11px; text-align: center; color: #888888; border-top: 1px solid #E2E8F0; padding-top: 20px; margin-top: 20px;">
          This inquiry was sent automatically from Turk Interiors.<br>
          Pune, Maharashtra, India | +91 93694 17131
        </div>
      </div>
    `;

    // 3. Send email to admin
    const targetEmail = process.env.SMTP_USER || "inquiries@turkinteriors.in";
    await sendEmail({
      to: targetEmail,
      subject: `New Inquiry: ${subject} - ${name}`,
      html: emailHtml,
    });

    // 4. Send acknowledgment to client
    const clientAcknowledgementHtml = `
      <div style="font-family: 'Inter', sans-serif; background-color: #F0F4F8; color: #0A192F; padding: 40px 20px; max-width: 600px; margin: 0 auto; border: 1px solid #E2E8F0;">
        <div style="text-align: center; border-bottom: 1px solid #E2E8F0; padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="font-family: 'Georgia', serif; font-size: 28px; font-weight: 300; letter-spacing: 0.15em; margin: 0; color: #0B1B3D;">Turk</h1>
          <p style="font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: #D4AF37; margin: 5px 0 0 0;">Interiors</p>
        </div>
        
        <h2 style="font-family: 'Georgia', serif; font-size: 20px; font-weight: 400; color: #D4AF37; margin-bottom: 20px;">Atelier Connection</h2>
        
        <p style="font-size: 14px; line-height: 1.6; color: #475569; margin-bottom: 20px;">
          Dear ${name},
        </p>
        
        <p style="font-size: 14px; line-height: 1.6; color: #475569; margin-bottom: 20px;">
          Thank you for reaching out to Turk Interiors. We have received your inquiry and details regarding "<strong>${subject}</strong>".
        </p>
        
        <p style="font-size: 14px; line-height: 1.6; color: #475569; margin-bottom: 20px;">
          Our design consultants are reviewing your details. We will contact you via phone or email within the next 24 to 48 hours to schedule a detailed space assessment or initial brief discussion.
        </p>

        <p style="font-size: 14px; line-height: 1.6; color: #475569; margin-bottom: 30px;">
          Warm regards,<br>
          <strong>Atelier Team</strong><br>
          Turk Interiors
        </p>
        
        <div style="font-size: 11px; text-align: center; color: #888888; border-top: 1px solid #E2E8F0; padding-top: 20px; margin-top: 20px;">
          Pune, Maharashtra, India | +91 93694 17131
        </div>
      </div>
    `;

    await sendEmail({
      to: email,
      subject: `Thank you for contacting Turk Interiors`,
      html: clientAcknowledgementHtml,
    });

    return {
      success: true,
      message: "Your message has been received. Our team will contact you shortly.",
      data: dbRecord,
    };
  } catch (error) {
    console.error("Submit contact form error:", error);
    return {
      success: false,
      message: "An error occurred while submitting your message. Please try again.",
    };
  }
}
