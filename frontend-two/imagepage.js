import React, { useRef } from "react";

const ImagePage = () => {
  const videoRef = useRef(null);

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Camera access denied", err);
    }
  };

  const uploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`File selected: ${file.name}`);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Upload or Capture Image</h2>
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={uploadImage}
          style={{ margin: "10px", padding: "10px" }}
        />
        <button
          onClick={openCamera}
          style={{
            padding: "10px 20px",
            margin: "10px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Open Camera
        </button>
      </div>
      <div>
        <video
          ref={videoRef}
          autoPlay
          style={{
            width: "300px",
            height: "200px",
            border: "1px solid black",
            marginTop: "20px",
          }}
        ></video>
      </div>
    </div>
  );
};

export default ImagePage;
