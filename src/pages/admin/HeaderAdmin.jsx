import React, { useState } from "react";
import { supabase } from "../../supabaseClient";

function HeaderAdmin() {
  const [header, setHeader] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdateHeader = async (e) => {
    e.preventDefault();
    if (!header) {
      alert("Please enter a header line");
      return;
    }
    setLoading(true);
    try {
      // You can change the table/column name as per your Supabase setup
      const { error } = await supabase
        .from("homepage_header")
        .upsert([
          { id: 1, header_line: header, updated_at: new Date().toISOString() }
        ], { onConflict: ['id'] });
      if (error) throw error;
      alert("Header line updated!");
      setHeader("");
    } catch (error) {
      console.error("Header update error:", error);
      alert("Update failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Update Homepage Header Line</h2>
      <form onSubmit={handleUpdateHeader}>
        <input
          type="text"
          placeholder="Enter header line"
          value={header}
          onChange={e => setHeader(e.target.value)}
          style={{ width: "300px" }}
        />
        <br /><br />
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Header"}
        </button>
      </form>
    </div>
  );
}

export default HeaderAdmin;
