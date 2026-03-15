import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

function UpdatesAdmin() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUpdates();
  }, []);

  const fetchUpdates = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("post")
      .select("id, tittle, image")
      .order("id", { ascending: false });
    if (!error) setUpdates(data || []);
    setLoading(false);
  };

  const handleUpload = async () => {
    if (!title || !file) {
      alert("Please enter title and file");
      return;
    }
    try {
      const fileName = file.name;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("updates")
        .upload(fileName, file);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage
        .from("updates")
        .getPublicUrl(fileName);
      const { error: insertError } = await supabase
        .from("post")
        .insert({ tittle: title, image: publicUrl });
      if (insertError) throw insertError;
      alert("Update uploaded successfully");
      setTitle("");
      setFile(null);
      fetchUpdates();
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  const deleteUpdate = async (id, imageUrl) => {
    if (!window.confirm("Are you sure you want to delete this update?")) return;
    // Remove from storage if possible
    if (imageUrl) {
      try {
        const fileName = imageUrl.split("/").pop().split("?")[0];
        await supabase.storage.from("updates").remove([fileName]);
      } catch (e) { /* ignore */ }
    }
    // Remove from DB
    const { error } = await supabase.from("post").delete().eq("id", id);
    if (!error) {
      setUpdates(updates.filter((u) => u.id !== id));
      alert("Update deleted");
    } else {
      alert("Delete failed");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Manage Updates</h2>
      <input
        type="text"
        placeholder="Enter update headline"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br /><br />
      <button onClick={handleUpload}>Upload Update</button>
      <h3 style={{ marginTop: 40 }}>Existing Updates</h3>
      {loading ? <p>Loading...</p> : null}
      <ul>
        {updates.map((update) => (
          <li key={update.id} style={{ marginBottom: 16 }}>
            <img src={update.image} alt={update.tittle} width={120} style={{ borderRadius: 8, marginRight: 12 }} />
            <b>{update.tittle}</b>
            <button style={{ marginLeft: 16 }} onClick={() => deleteUpdate(update.id, update.image)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UpdatesAdmin;