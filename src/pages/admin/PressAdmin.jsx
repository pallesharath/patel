import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

function PressAdmin() {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [pressImages, setPressImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPressImages();
  }, []);

  const fetchPressImages = async () => {
    setLoading(true);
    const { data, error } = await supabase.storage.from("press").list();
    if (!error && data) {
      setPressImages(data);
    }
    setLoading(false);
  };

  const handleUpload = async () => {
    if (!image) {
      setMessage("Please select an image");
      return;
    }
    try {
      const fileName = Date.now() + "_" + image.name;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("press")
        .upload(fileName, image);
      if (uploadError) throw uploadError;
      setMessage("Image uploaded successfully");
      setImage(null);
      fetchPressImages();
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Upload failed: " + error.message);
    }
  };

  const deletePressImage = async (fileName) => {
    if (!window.confirm("Are you sure you want to delete this press image?")) return;
    const { error } = await supabase.storage.from("press").remove([fileName]);
    if (!error) {
      setPressImages(pressImages.filter((img) => img.name !== fileName));
      setMessage("Image deleted");
    } else {
      setMessage("Delete failed");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Upload Press Coverage</h2>
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <br /><br />
      <button onClick={handleUpload}>Upload Image</button>
      <p>{message}</p>
      <h3 style={{ marginTop: 40 }}>Existing Press Images</h3>
      {loading ? <p>Loading...</p> : null}
      <ul>
        {pressImages.map((img) => {
          const { data: urlData } = supabase.storage.from("press").getPublicUrl(img.name);
          return (
            <li key={img.name} style={{ marginBottom: 16 }}>
              <img src={urlData.publicUrl} alt={img.name} width={120} style={{ borderRadius: 8, marginRight: 12 }} />
              {img.name}
              <button style={{ marginLeft: 16 }} onClick={() => deletePressImage(img.name)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PressAdmin;