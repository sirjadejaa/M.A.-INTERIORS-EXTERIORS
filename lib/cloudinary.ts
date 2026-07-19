import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "demo",
  api_key: process.env.CLOUDINARY_API_KEY || "placeholder_key",
  api_secret: process.env.CLOUDINARY_API_SECRET || "placeholder_secret",
  secure: true,
});

export default cloudinary;

/**
 * Uploads a base64 image string to Cloudinary
 */
export async function uploadImage(base64Image: string, folder = "ma-interiors") {
  if (
    !process.env.CLOUDINARY_API_KEY ||
    process.env.CLOUDINARY_API_KEY === "placeholder_key"
  ) {
    console.warn("Cloudinary not configured. Returning static mock path.");
    return base64Image.startsWith("data:")
      ? "/images/placeholder-uploaded.jpg"
      : base64Image;
  }

  try {
    const uploadResponse = await cloudinary.uploader.upload(base64Image, {
      folder,
      resource_type: "auto",
    });
    return uploadResponse.secure_url;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
}
