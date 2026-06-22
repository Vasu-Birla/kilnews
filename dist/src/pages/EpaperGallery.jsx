

// import React from "react";

// const EpaperGallery = () => {
//   const handleEpaperClick = () => {
//     // External site open karne ke liye
//     window.open("http://www.jabalpurexpress.com/", "_blank", "noopener,noreferrer");
//   };

//   return (
//     <div style={{ padding: "20px", textAlign: "center" }}>
//       <h2>E-Paper Gallery</h2>
//       <p>Click below to open Jabalpur Express E-Paper:</p>
//       <button
//         onClick={handleEpaperClick}
//         style={{
//           padding: "10px 20px",
//           fontSize: "16px",
//           backgroundColor: "#007bff",
//           color: "#fff",
//           border: "none",
//           borderRadius: "5px",
//           cursor: "pointer",
//         }}
//       >
//         Open E-Paper
//       </button>
//     </div>
//   );
// };

// export default EpaperGallery;


import React from "react";

const EpaperGallery = () => {
  const handleEpaperClick = () => {
    // External site को current tab में open करने के लिए
    window.open("http://www.jabalpurexpress.com/", "_self"); // _self पैरामीटर के साथ
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>E-Paper Gallery</h2>
      <p>Click below to open Jabalpur Express E-Paper:</p>
      <button
        onClick={handleEpaperClick}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Open E-Paper
      </button>
    </div>
  );
};

export default EpaperGallery;