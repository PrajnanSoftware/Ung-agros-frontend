export const uploadToCloudinary = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ungagros"); // Ensure it's correctly configured in Cloudinary

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/djbkmskvg/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Cloudinary upload failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.secure_url || null;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null; // Return null so failed uploads can be handled separately
  }
};
