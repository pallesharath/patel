import { useState } from "react";
import { supabase } from "../../supabaseClient";

function UploadPost() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleUpload = async () => {

    if (!title || !description || !image) {
      alert("Please fill all fields");
      return;
    }

    try {
      const fileName = image.name;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('images')
        .upload(fileName, image);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(fileName);

      const { error: insertError } = await supabase
        .from('post')
        .insert({
          title: title,
          description: description,
          image: publicUrl,
          created_at: new Date().toISOString()
        });

      if (insertError) {
        throw insertError;
      }

      alert("Upload Successful");
      setTitle("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed");
    }
  };

  return (

    <div>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />

      <br/><br/>

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
      />

      <br/><br/>

      <input
        type="file"
        onChange={(e)=>setImage(e.target.files[0])}
      />

      <br/><br/>

      <button onClick={handleUpload}>
        Upload
      </button>

    </div>
  );
}

export default UploadPost;
