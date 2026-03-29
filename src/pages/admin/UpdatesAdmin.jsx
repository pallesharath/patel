import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

function UpdatesAdmin() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPictures();
  }, []);

  const fetchPictures = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("pictures")
      .select("id, title, image_url")
      .order("id", { ascending: false });
    if (!error) setPictures(data || []);
    setLoading(false);
  };

  const handleUpload = async () => {
    if (!title || !file) {
      alert("Please enter title and file");
      return;
    }
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("pictures")
        .upload(fileName, file);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage
        .from("pictures")
        .getPublicUrl(fileName);
      const { error: insertError } = await supabase
        .from("pictures")
        .insert({ title, image_url: publicUrl });
      if (insertError) throw insertError;
      alert("Picture uploaded successfully");
      setTitle("");
      setFile(null);
      fetchPictures();
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  const deleteUpdate = async (id, imageUrl) => {
    if (!window.confirm("Are you sure you want to delete this picture?")) return;
    // Remove from storage if possible
    if (imageUrl) {
      try {
        const fileName = imageUrl.split("/").pop().split("?")[0];
        await supabase.storage.from("pictures").remove([fileName]);
      } catch (e) { /* ignore */ }
    }
    // Remove from DB
    const { error } = await supabase.from("pictures").delete().eq("id", id);
    if (!error) {
      setPictures(pictures.filter((u) => u.id !== id));
      alert("Picture deleted");
    } else {
      alert("Delete failed");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Manage Pictures</h2>
      <input
        type="text"
        placeholder="Enter picture title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br /><br />
      <button onClick={handleUpload}>Upload Picture</button>
      <h3 style={{ marginTop: 40 }}>Existing Pictures</h3>
      {loading ? <p>Loading...</p> : null}
      <ul>
        {pictures.map((picture) => (
          <li key={picture.id} style={{ marginBottom: 16 }}>
            <img src={picture.image_url} alt={picture.title} width={120} style={{ borderRadius: 8, marginRight: 12 }} />
            <b>{picture.title}</b>
            <button style={{ marginLeft: 16 }} onClick={() => deleteUpdate(picture.id, picture.image_url)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UpdatesAdmin;
