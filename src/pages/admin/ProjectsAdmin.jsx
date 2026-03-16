import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

function ProjectsAdmin() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("post")
      .select("id, tittle, image")
      .order("id", { ascending: false });
    if (!error) setProjects(data || []);
    setLoading(false);
  };

  const submitProject = async () => {
    if (!title || !image) {
      alert("Please fill all fields");
      return;
    }
    try {
      const fileName = image.name;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("projects")
        .upload(fileName, image);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage
        .from("projects")
        .getPublicUrl(fileName);
      const { error: insertError } = await supabase
        .from("post")
        .insert({ tittle: title, image: publicUrl });
      if (insertError) throw insertError;
      alert("Project added successfully");
      setTitle("");
      setImage(null);
      fetchProjects();
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed");
    }
  };

  const deleteProject = async (id, imageUrl) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    // Remove from storage if possible
    if (imageUrl) {
      try {
        const fileName = imageUrl.split("/").pop().split("?")[0];
        await supabase.storage.from("projects").remove([fileName]);
      } catch (e) { /* ignore */ }
    }
    // Remove from DB
    const { error } = await supabase.from("post").delete().eq("id", id);
    if (!error) {
      setProjects(projects.filter((p) => p.id !== id));
      alert("Project deleted");
    } else {
      alert("Delete failed");
    }
  };

  return (
    <div>
      <h2>Add Upcoming Project</h2>
      <input
        type="text"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <br /><br />
      <button onClick={submitProject}>Add Project</button>

      <h3 style={{ marginTop: 40 }}>Existing Projects</h3>
      {loading ? <p>Loading...</p> : null}
      <ul>
        {projects.map((project) => (
          <li key={project.id} style={{ marginBottom: 16 }}>
            <img src={project.image} alt={project.tittle} width={120} style={{ borderRadius: 8, marginRight: 12 }} />
            <b>{project.tittle}</b>
            <button style={{ marginLeft: 16 }} onClick={() => deleteProject(project.id, project.image)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectsAdmin;