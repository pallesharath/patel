import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

function Pictures() {
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPictures = async () => {
      const { data, error } = await supabase
        .from("pictures")
        .select("id, title, image_url")
        .order("id", { ascending: false });

      if (!error) {
        setPictures(data || []);
      }
      setLoading(false);
    };

    fetchPictures();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Pictures</h1>
      {loading ? <p>Loading...</p> : null}
      {pictures.length === 0 && !loading ? <p>No pictures available</p> : null}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 16,
          marginTop: 20,
        }}
      >
        {pictures.map((picture) => (
          <div
            key={picture.id}
            style={{
              border: "1px solid #eee",
              borderRadius: 10,
              padding: 12,
            }}
          >
            <img
              src={picture.image_url}
              alt={picture.title}
              style={{
                width: "100%",
                height: 190,
                objectFit: "contain",
                background: "#f5f5f5",
                borderRadius: 8,
              }}
            />
            <p style={{ marginTop: 10, fontWeight: 600 }}>{picture.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pictures;
