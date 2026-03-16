import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

function TeamAdmin() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState(null);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("team")
      .select("id, name, role, image")
      .order("id", { ascending: false });
    if (!error) setTeam(data || []);
    setLoading(false);
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!name || !role || !image) {
      alert("Please fill all fields");
      return;
    }
    try {
      const fileName = Date.now() + "_" + image.name;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("team")
        .upload(fileName, image);
      if (uploadError) {
        alert("Image upload failed");
        return;
      }
      const { data: publicUrlData } = supabase
        .storage
        .from("team")
        .getPublicUrl(fileName);
      const imageUrl = publicUrlData.publicUrl;
      const { data: insertData, error: insertError } = await supabase
        .from("team")
        .insert([
          {
            name: name,
            role: role,
            image: imageUrl,
            created_at: new Date(),
          },
        ])
        .select();
      if (insertError) {
        alert("Database insert failed");
        return;
      }
      alert("Team member added successfully");
      setName("");
      setRole("");
      setImage(null);
      fetchTeam();
    } catch (error) {
      alert("Upload failed. Check console.");
    }
  };

  const deleteMember = async (id, imageUrl) => {
    if (!window.confirm("Are you sure you want to delete this team member?")) return;
    let storageError = null;
    let dbError = null;
    // Remove from storage if possible
    if (imageUrl) {
      try {
        const fileName = imageUrl.split("/").pop().split("?")[0];
        const { error: removeError } = await supabase.storage.from("team").remove([fileName]);
        if (removeError) storageError = removeError.message;
      } catch (e) {
        storageError = e.message || "Unknown storage error";
      }
    }
    // Remove from DB
    const { error } = await supabase.from("team").delete().eq("id", id);
    if (error) dbError = error.message;
    // Always refresh the team list
    await fetchTeam();
    if (!storageError && !dbError) {
      alert("Team member deleted");
    } else {
      let msg = "";
      if (storageError) msg += `Image delete failed: ${storageError}. `;
      if (dbError) msg += `Database delete failed: ${dbError}`;
      alert(msg || "Delete failed");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Add Team Member</h2>
      <form onSubmit={handleAddMember}>
        <input
          type="text"
          placeholder="Member Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br /><br />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <br /><br />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <br /><br />
        <button type="submit">Add Member</button>
      </form>
      <h3 style={{ marginTop: 40 }}>Team Members</h3>
      {loading ? <p>Loading...</p> : null}
      <ul>
        {team.map((member) => (
          <li key={member.id} style={{ marginBottom: 16 }}>
            <img src={member.image} alt={member.name} width={80} style={{ borderRadius: 8, marginRight: 12 }} />
            <b>{member.name}</b> - {member.role}
            <button style={{ marginLeft: 16 }} onClick={() => deleteMember(member.id, member.image)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeamAdmin;