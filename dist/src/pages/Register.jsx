// import React, { useState } from "react";
// import { userRegister } from "../Services/authApi";
// import { useNavigate, Link } from "react-router-dom";

// const Register = () => {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [profileImageFile, setProfileImageFile] = useState(null);
//   const [preview, setPreview] = useState(null); // फोटो देखने के लिए
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfileImageFile(file);
//       setPreview(URL.createObjectURL(file)); // Preview URL बनाना
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const formData = new FormData();
//       formData.append("name", form.name);
//       formData.append("email", form.email);
//       formData.append("password", form.password);

//       if (profileImageFile) {
//         formData.append("profileImageFile", profileImageFile);
//       }

//       const res = await userRegister(formData);
//       localStorage.setItem("token", res.data.accessToken);
//       localStorage.setItem("user", JSON.stringify(res.data));

//       alert("Registration Successful 🎉");
//       navigate("/");
//       window.location.reload();
//     } catch (error) {
//       alert(error.response?.data?.message || "Registration Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center py-5">
//       <div className="card border-0 shadow-lg rounded-4" style={{ maxWidth: "450px", width: "100%" }}>
//         <div className="card-body p-5">
          
//           {/* Header */}
//           <div className="text-center mb-4">
//             <h2 className="fw-bold text-primary">Create Account</h2>
//             <p className="text-muted">Fill in the details to get started</p>
//           </div>

//           <form onSubmit={handleSubmit}>
            
//             {/* Profile Image Preview */}
//             <div className="text-center mb-4 position-relative">
//               <div className="d-inline-block position-relative">
//                 <img
//                   src={preview || "https://via.placeholder.com/100"}
//                   alt="Avatar"
//                   className="rounded-circle border border-3 border-primary shadow-sm"
//                   style={{ width: "100px", height: "100px", objectFit: "cover" }}
//                 />
//                 <label 
//                   htmlFor="fileInput" 
//                   className="btn btn-sm btn-primary position-absolute bottom-0 end-0 rounded-circle d-flex align-items-center justify-content-center"
//                   style={{ width: "32px", height: "32px" }}
//                 >
//                   <span className="fw-bold">+</span>
//                 </label>
//               </div>
//               <input 
//                 type="file" 
//                 id="fileInput" 
//                 className="d-none" 
//                 accept="image/*" 
//                 onChange={handleFileChange} 
//               />
//               <div className="small text-muted mt-2">Upload Photo</div>
//             </div>

//             {/* Full Name */}
//             <div className="mb-3">
//               <label className="form-label fw-semibold">Full Name</label>
//               <div className="input-group">
//                 <span className="input-group-text bg-white border-end-0">👤</span>
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="John Doe"
//                   className="form-control border-start-0 ps-0 shadow-none"
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>

//             {/* Email */}
//             <div className="mb-3">
//               <label className="form-label fw-semibold">Email Address</label>
//               <div className="input-group">
//                 <span className="input-group-text bg-white border-end-0">📧</span>
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="email@example.com"
//                   className="form-control border-start-0 ps-0 shadow-none"
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div className="mb-4">
//               <label className="form-label fw-semibold">Password</label>
//               <div className="input-group">
//                 <span className="input-group-text bg-white border-end-0">🔒</span>
//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="••••••••"
//                   className="form-control border-start-0 ps-0 shadow-none"
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="btn btn-primary w-100 py-2 fw-bold shadow-sm rounded-3 mt-2"
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <span className="spinner-border spinner-border-sm me-2"></span>
//                   Registering...
//                 </>
//               ) : (
//                 "Sign Up"
//               )}
//             </button>
//           </form>

//           {/* Footer Link */}
//           <div className="text-center mt-4">
//             <p className="text-muted small">
//               Already have an account? <Link to="/login" className="text-primary text-decoration-none fw-bold">Log in</Link>
//             </p>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { userRegister } from "../Services/authApi";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, Camera, Loader2 } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [profileImageFile, setProfileImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Password dikhane ke liye state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("password", form.password);

      if (profileImageFile) {
        formData.append("profileImageFile", profileImageFile);
      }

      const res = await userRegister(formData);
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("user", JSON.stringify(res.data));

      alert("Registration Successful 🎉");
      navigate("/");
      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center py-5">
      <div className="card border-0 shadow-lg rounded-4 overflow-hidden" style={{ maxWidth: "450px", width: "100%" }}>
        {/* Top Accent Bar */}
        <div className="bg-primary" style={{ height: "6px" }}></div>
        
        <div className="card-body p-4 p-md-5">
          {/* Header */}
          <div className="text-center mb-4">
            <h2 className="fw-bold text-dark mb-1">Create Account</h2>
            <p className="text-muted small">Join us to start your journey</p>
          </div>

          <form onSubmit={handleSubmit}>
            
            {/* Profile Image Preview */}
            <div className="text-center mb-4">
              <div className="position-relative d-inline-block">
                <img
                  src={preview || "https://ui-avatars.com/api/?name=User&background=f0f0f0&color=adb5bd&size=128"}
                  alt="Avatar"
                  className="rounded-circle border border-4 border-white shadow-sm"
                  style={{ width: "110px", height: "110px", objectFit: "cover" }}
                />
                <label 
                  htmlFor="fileInput" 
                  className="btn btn-primary position-absolute bottom-0 end-0 rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                  style={{ width: "35px", height: "35px", border: "2px solid white" }}
                >
                  <Camera size={16} color="white" />
                </label>
              </div>
              <input 
                type="file" 
                id="fileInput" 
                className="d-none" 
                accept="image/*" 
                onChange={handleFileChange} 
              />
              <div className="small text-muted mt-2 fw-medium">Upload Profile Photo</div>
            </div>

            {/* Full Name */}
            <div className="mb-3">
              <label className="form-label small fw-bold text-secondary">Full Name</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 text-muted">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="form-control bg-light border-start-0 ps-0 shadow-none py-2"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label small fw-bold text-secondary">Email Address</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 text-muted">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  className="form-control bg-light border-start-0 ps-0 shadow-none py-2"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="form-label small fw-bold text-secondary">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 text-muted">
                  <Lock size={18} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create password"
                  className="form-control bg-light border-start-0 border-end-0 ps-0 shadow-none py-2"
                  onChange={handleChange}
                  required
                />
                <button 
                  type="button"
                  className="input-group-text bg-light border-start-0 text-muted"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer", borderLeft: "none" }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-100 py-2 fw-bold shadow-sm rounded-3 mt-2 d-flex align-items-center justify-content-center gap-2"
              disabled={loading}
              style={{ transition: 'all 0.3s ease' }}
            >
              {loading ? (
                <>
                  <Loader2 className="spinner-border-sm animate-spin" size={20} />
                  Creating Account...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="text-center mt-4">
            <p className="text-muted small">
              Already have an account? <Link to="/login" className="text-primary text-decoration-none fw-bold">Log in</Link>
            </p>
          </div>

        </div>
      </div>
      
      {/* Background Decor (Optional) */}
      <style>{`
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .form-control:focus { background-color: #fff !important; border-color: #0d6efd !important; }
        .input-group:focus-within .input-group-text { background-color: #fff !important; color: #0d6efd !important; border-color: #0d6efd !important; }
      `}</style>
    </div>
  );
};

export default Register;