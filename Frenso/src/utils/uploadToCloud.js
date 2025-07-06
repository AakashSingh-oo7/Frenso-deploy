export const uploadToCloud = async (file) => {
  if (!file) {
    throw new Error("No file provided for upload");
  }

  console.log("Uploading file:", file);

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "frenso");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dtuo5petq/image/upload",
    {
      method: "POST",
      body: data,
    }
  );

  const fileData = await res.json();

  if (!res.ok) {
    console.error("Cloudinary error response:", fileData);
    throw new Error(`Upload failed: ${fileData.error?.message || res.status}`);
  }

  if (!fileData.secure_url) {
    throw new Error("Upload failed: No secure_url returned");
  }

  return fileData.secure_url;
};
