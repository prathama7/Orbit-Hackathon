import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>ECOMANDU</h1>
      <p>Making recycling easier, one scan at a time.</p>
      <button
        onClick={() => navigate("/image")}
        style={{
          padding: "10px 20px",
          margin: "10px",
          backgroundColor: "green",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Go to Image Page
      </button>
    </div>
  );
};

export default HomePage;
