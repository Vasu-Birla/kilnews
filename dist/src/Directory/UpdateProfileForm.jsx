// // import React, { useState, useEffect } from "react";
// // import {
// //   Container, Form, Button, Alert, Spinner, Row, Col, Card
// // } from "react-bootstrap";
// // import { requestCompanyUpdate } from "../../Services/authApi"; // सुनिश्चित करें कि यह सही पाथ है

// // const UpdateProfileForm = ({ currentProfileData, onUpdateSuccess, onCancel }) => {
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     phone: "",
// //     description: "",
// //     website: "",
// //     gstNumber: "",
// //     aadhaarNumber: "",
// //     companyType: "",
// //     socialLinks: "", // Comma-separated string
// //     keywords: "", // Comma-separated string
// //     // Assuming category is an object with a 'name' field, we'll just edit the name for simplicity
// //     categoryName: "",
// //     // You might need to handle other fields like images, businessTimings, address more elaborately.
// //     // For this example, we'll focus on text-based fields.
// //   });

// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [success, setSuccess] = useState(false);

// //   useEffect(() => {
// //     if (currentProfileData) {
// //       setFormData({
// //         name: currentProfileData.name || "",
// //         email: currentProfileData.email || "",
// //         phone: currentProfileData.phone || "",
// //         description: currentProfileData.description || "",
// //         website: currentProfileData.website || "",
// //         gstNumber: currentProfileData.gstNumber || "",
// //         aadhaarNumber: currentProfileData.aadhaarNumber || "",
// //         companyType: currentProfileData.companyType || "",
// //         socialLinks: Array.isArray(currentProfileData.socialLinks) ? currentProfileData.socialLinks.join(", ") : "",
// //         keywords: Array.isArray(currentProfileData.keywords) ? currentProfileData.keywords.join(", ") : "",
// //         categoryName: currentProfileData.category?.name || "",
// //         // Initialize other fields as needed
// //       });
// //     }
// //   }, [currentProfileData]);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prevData) => ({
// //       ...prevData,
// //       [name]: value,
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError(null);
// //     setSuccess(false);

// //     try {
// //       // Prepare data for API call
// //       const updatePayload = {
// //         ...formData,
// //         socialLinks: formData.socialLinks.split(",").map((link) => link.trim()).filter(Boolean),
// //         keywords: formData.keywords.split(",").map((keyword) => keyword.trim()).filter(Boolean),
// //         category: formData.categoryName ? { name: formData.categoryName } : undefined,
// //         // Remove categoryName from payload as it's not directly part of the backend schema
// //         categoryName: undefined,
// //       };

// //       const response = await requestCompanyUpdate(updatePayload);
// //       setSuccess(true);
// //       // alert("Profile updated successfully!"); // Optional: show an alert
// //       if (onUpdateSuccess) {
// //         onUpdateSuccess(response.data); // Pass updated data if needed
// //       }
// //     } catch (err) {
// //       console.error("Failed to update profile:", err);
// //       setError(err.message || "Failed to update profile. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <Container className="my-5">
// //       <Card className="shadow-lg rounded-4 border-0 p-4">
// //         <h3 className="mb-4 text-primary text-center">Update Company Profile</h3>

// //         {loading && <Spinner animation="border" className="d-block mx-auto mb-3" />}
// //         {error && <Alert variant="danger" className="text-center">{error}</Alert>}
// //         {success && <Alert variant="success" className="text-center">Profile updated successfully!</Alert>}

// //         <Form onSubmit={handleSubmit}>
// //           <Row className="mb-3">
// //             <Col md={6}>
// //               <Form.Group className="mb-3">
// //                 <Form.Label>Company Name</Form.Label>
// //                 <Form.Control
// //                   type="text"
// //                   name="name"
// //                   value={formData.name}
// //                   onChange={handleChange}
// //                   placeholder="Enter company name"
// //                   required
// //                 />
// //               </Form.Group>
// //             </Col>
// //             <Col md={6}>
// //               <Form.Group className="mb-3">
// //                 <Form.Label>Email</Form.Label>
// //                 <Form.Control
// //                   type="email"
// //                   name="email"
// //                   value={formData.email}
// //                   onChange={handleChange}
// //                   placeholder="Enter email"
// //                   required
// //                 />
// //               </Form.Group>
// //             </Col>
// //           </Row>

// //           <Row className="mb-3">
// //             <Col md={6}>
// //               <Form.Group className="mb-3">
// //                 <Form.Label>Phone</Form.Label>
// //                 <Form.Control
// //                   type="tel"
// //                   name="phone"
// //                   value={formData.phone}
// //                   onChange={handleChange}
// //                   placeholder="Enter phone number"
// //                 />
// //               </Form.Group>
// //             </Col>
// //             <Col md={6}>
// //               <Form.Group className="mb-3">
// //                 <Form.Label>Website</Form.Label>
// //                 <Form.Control
// //                   type="url"
// //                   name="website"
// //                   value={formData.website}
// //                   onChange={handleChange}
// //                   placeholder="Enter website URL"
// //                 />
// //               </Form.Group>
// //             </Col>
// //           </Row>

// //           <Form.Group className="mb-3">
// //             <Form.Label>Description</Form.Label>
// //             <Form.Control
// //               as="textarea"
// //               rows={3}
// //               name="description"
// //               value={formData.description}
// //               onChange={handleChange}
// //               placeholder="Enter company description"
// //             />
// //           </Form.Group>

// //           <Row className="mb-3">
// //             <Col md={6}>
// //               <Form.Group className="mb-3">
// //                 <Form.Label>GST Number</Form.Label>
// //                 <Form.Control
// //                   type="text"
// //                   name="gstNumber"
// //                   value={formData.gstNumber}
// //                   onChange={handleChange}
// //                   placeholder="Enter GST number"
// //                 />
// //               </Form.Group>
// //             </Col>
// //             <Col md={6}>
// //               <Form.Group className="mb-3">
// //                 <Form.Label>Aadhaar Number</Form.Label>
// //                 <Form.Control
// //                   type="text"
// //                   name="aadhaarNumber"
// //                   value={formData.aadhaarNumber}
// //                   onChange={handleChange}
// //                   placeholder="Enter Aadhaar number"
// //                 />
// //               </Form.Group>
// //             </Col>
// //           </Row>

// //           <Row className="mb-3">
// //             <Col md={6}>
// //               <Form.Group className="mb-3">
// //                 <Form.Label>Company Type</Form.Label>
// //                 <Form.Control
// //                   type="text"
// //                   name="companyType"
// //                   value={formData.companyType}
// //                   onChange={handleChange}
// //                   placeholder="e.g., Manufacturer, Trader"
// //                 />
// //               </Form.Group>
// //             </Col>
// //             <Col md={6}>
// //               <Form.Group className="mb-3">
// //                 <Form.Label>Category Name</Form.Label>
// //                 <Form.Control
// //                   type="text"
// //                   name="categoryName"
// //                   value={formData.categoryName}
// //                   onChange={handleChange}
// //                   placeholder="e.g., Electronics, Textiles"
// //                 />
// //               </Form.Group>
// //             </Col>
// //           </Row>

// //           <Form.Group className="mb-3">
// //             <Form.Label>Social Links (comma-separated)</Form.Label>
// //             <Form.Control
// //               as="textarea"
// //               rows={2}
// //               name="socialLinks"
// //               value={formData.socialLinks}
// //               onChange={handleChange}
// //               placeholder="e.g., https://facebook.com/yourpage, https://twitter.com/yourhandle"
// //             />
// //           </Form.Group>

// //           <Form.Group className="mb-4">
// //             <Form.Label>Keywords (comma-separated)</Form.Label>
// //             <Form.Control
// //               as="textarea"
// //               rows={2}
// //               name="keywords"
// //               value={formData.keywords}
// //               onChange={handleChange}
// //               placeholder="e.g., B2B, wholesale, supplier, exporter"
// //             />
// //           </Form.Group>

// //           <div className="d-flex justify-content-end gap-2">
// //             <Button variant="secondary" onClick={onCancel}>
// //               Cancel
// //             </Button>
// //             <Button variant="primary" type="submit" disabled={loading}>
// //               {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Update"}
// //             </Button>
// //           </div>
// //         </Form>
// //       </Card>
// //     </Container>
// //   );
// // };

// // export default UpdateProfileForm;
// // import React, { useState, useEffect } from "react";
// // import {
// //   Container,
// //   Form,
// //   Button,
// //   Alert,
// //   Spinner,
// //   Row,
// //   Col,
// //   Card,
// // } from "react-bootstrap";
// // import { requestCompanyUpdate } from "../../Services/authApi";

// // const UpdateProfileForm = ({ currentProfileData, onUpdateSuccess, onCancel }) => {
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     phone: "",
// //     description: "",
// //     website: "",
// //     gstNumber: "",
// //     aadhaarNumber: "",
// //     companyType: "",
// //     socialLinks: "",
// //     keywords: "",
// //     categoryName: "",
// //   });

// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [success, setSuccess] = useState(false);

// //   useEffect(() => {
// //     if (currentProfileData) {
// //       setFormData({
// //         name: currentProfileData.name || "",
// //         email: currentProfileData.email || "",
// //         phone: currentProfileData.phone || "",
// //         description: currentProfileData.description || "",
// //         website: currentProfileData.website || "",
// //         gstNumber: currentProfileData.gstNumber || "",
// //         aadhaarNumber: currentProfileData.aadhaarNumber || "",
// //         companyType: currentProfileData.companyType || "",
// //         socialLinks: Array.isArray(currentProfileData.socialLinks)
// //           ? currentProfileData.socialLinks.join(", ")
// //           : "",
// //         keywords: Array.isArray(currentProfileData.keywords)
// //           ? currentProfileData.keywords.join(", ")
// //           : "",
// //         categoryName: currentProfileData.category?.name || "",
// //       });
// //     }
// //   }, [currentProfileData]);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError(null);
// //     setSuccess(false);

// //     try {
// //       const updatePayload = {
// //         ...formData,
// //         socialLinks: formData.socialLinks
// //           .split(",")
// //           .map((link) => link.trim())
// //           .filter(Boolean),
// //         keywords: formData.keywords
// //           .split(",")
// //           .map((keyword) => keyword.trim())
// //           .filter(Boolean),
// //         category: formData.categoryName
// //           ? { name: formData.categoryName }
// //           : undefined,
// //         categoryName: undefined,
// //       };

// //       const response = await requestCompanyUpdate(updatePayload);
// //       setSuccess(true);
// //       if (onUpdateSuccess) onUpdateSuccess(response.data);
// //     } catch (err) {
// //       setError(err.message || "Failed to update profile. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <>
// //       {/* 🔹 Blue Border Hover/Focus Effect for All Input Fields */}
// //       <style>{`
// //         .form-control {
// //           transition: all 0.3s ease;
// //           border: 1px solid #dee2e6;
// //           box-shadow: none;
// //         }
// //         .form-control:hover {
// //           border-color: #80bdff;
// //         }
// //         .form-control:focus {
// //           border-color: #007bff !important;
// //           box-shadow: 0 0 6px rgba(0, 123, 255, 0.5) !important;
// //         }
// //       `}</style>

// //       <div
// //         style={{
// //           background: "linear-gradient(135deg, #e3f2fd, #f8f9fa)",
// //           minHeight: "100vh",
// //           paddingTop: "50px",
// //           paddingBottom: "50px",
// //         }}
// //       >
// //         <Container>
// //           <Card
// //             className="shadow-lg border-0 rounded-4 p-4 mx-auto"
// //             style={{
// //               maxWidth: "850px",
// //               background: "linear-gradient(145deg, #ffffff, #e9f0ff)",
// //               boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
// //             }}
// //           >
// //             <div className="text-center mb-4">
// //               <h3 className="fw-bold text-primary">Update Company Profile</h3>
// //               <div
// //                 style={{
// //                   width: "80px",
// //                   height: "4px",
// //                   background:
// //                     "linear-gradient(to right, #007bff, #6610f2)",
// //                   margin: "8px auto",
// //                   borderRadius: "5px",
// //                 }}
// //               ></div>
// //             </div>

// //             {loading && (
// //               <Spinner animation="border" className="d-block mx-auto mb-3" />
// //             )}
// //             {error && (
// //               <Alert variant="danger" className="text-center">
// //                 {error}
// //               </Alert>
// //             )}
// //             {success && (
// //               <Alert variant="success" className="text-center">
// //                 Profile updated successfully!
// //               </Alert>
// //             )}

// //             <Form onSubmit={handleSubmit}>
// //               {/* 🔹 Company Info Fields */}
// //               <Row>
// //                 <Col md={6}>
// //                   <Form.Group className="mb-3">
// //                     <Form.Label className="fw-semibold">Company Name</Form.Label>
// //                     <Form.Control
// //                       type="text"
// //                       name="name"
// //                       value={formData.name}
// //                       onChange={handleChange}
// //                       placeholder="Enter company name"
// //                       required
// //                     />
// //                   </Form.Group>
// //                 </Col>

// //                 <Col md={6}>
// //                   <Form.Group className="mb-3">
// //                     <Form.Label className="fw-semibold">Email</Form.Label>
// //                     <Form.Control
// //                       type="email"
// //                       name="email"
// //                       value={formData.email}
// //                       onChange={handleChange}
// //                       placeholder="Enter email"
// //                       required
// //                     />
// //                   </Form.Group>
// //                 </Col>
// //               </Row>

// //               {/* 🔹 Contact Info */}
// //               <Row>
// //                 <Col md={6}>
// //                   <Form.Group className="mb-3">
// //                     <Form.Label className="fw-semibold">Phone</Form.Label>
// //                     <Form.Control
// //                       type="tel"
// //                       name="phone"
// //                       value={formData.phone}
// //                       onChange={handleChange}
// //                       placeholder="Enter phone number"
// //                     />
// //                   </Form.Group>
// //                 </Col>

// //                 <Col md={6}>
// //                   <Form.Group className="mb-3">
// //                     <Form.Label className="fw-semibold">Website</Form.Label>
// //                     <Form.Control
// //                       type="url"
// //                       name="website"
// //                       value={formData.website}
// //                       onChange={handleChange}
// //                       placeholder="Enter website URL"
// //                     />
// //                   </Form.Group>
// //                 </Col>
// //               </Row>

// //               {/* 🔹 Description */}
// //               <Form.Group className="mb-3">
// //                 <Form.Label className="fw-semibold">Description</Form.Label>
// //                 <Form.Control
// //                   as="textarea"
// //                   rows={3}
// //                   name="description"
// //                   value={formData.description}
// //                   onChange={handleChange}
// //                   placeholder="Write a short description about your company..."
// //                 />
// //               </Form.Group>

// //               {/* 🔹 GST / Aadhaar */}
// //               <Row>
// //                 <Col md={6}>
// //                   <Form.Group className="mb-3">
// //                     <Form.Label className="fw-semibold">GST Number</Form.Label>
// //                     <Form.Control
// //                       type="text"
// //                       name="gstNumber"
// //                       value={formData.gstNumber}
// //                       onChange={handleChange}
// //                       placeholder="Enter GST number"
// //                     />
// //                   </Form.Group>
// //                 </Col>

// //                 <Col md={6}>
// //                   <Form.Group className="mb-3">
// //                     <Form.Label className="fw-semibold">Aadhaar Number</Form.Label>
// //                     <Form.Control
// //                       type="text"
// //                       name="aadhaarNumber"
// //                       value={formData.aadhaarNumber}
// //                       onChange={handleChange}
// //                       placeholder="Enter Aadhaar number"
// //                     />
// //                   </Form.Group>
// //                 </Col>
// //               </Row>

// //               {/* 🔹 Company Type & Category */}
// //               <Row>
// //                 <Col md={6}>
// //                   <Form.Group className="mb-3">
// //                     <Form.Label className="fw-semibold">Company Type</Form.Label>
// //                     <Form.Control
// //                       type="text"
// //                       name="companyType"
// //                       value={formData.companyType}
// //                       onChange={handleChange}
// //                       placeholder="e.g., Manufacturer, Trader"
// //                     />
// //                   </Form.Group>
// //                 </Col>

// //                 <Col md={6}>
// //                   <Form.Group className="mb-3">
// //                     <Form.Label className="fw-semibold">Category</Form.Label>
// //                     <Form.Control
// //                       type="text"
// //                       name="categoryName"
// //                       value={formData.categoryName}
// //                       onChange={handleChange}
// //                       placeholder="e.g., Electronics, Textiles"
// //                     />
// //                   </Form.Group>
// //                 </Col>
// //               </Row>

// //               {/* 🔹 Social Links */}
// //               <Form.Group className="mb-3">
// //                 <Form.Label className="fw-semibold">Social Links</Form.Label>
// //                 <Form.Control
// //                   as="textarea"
// //                   rows={2}
// //                   name="socialLinks"
// //                   value={formData.socialLinks}
// //                   onChange={handleChange}
// //                   placeholder="https://facebook.com/yourpage, https://twitter.com/yourhandle"
// //                 />
// //               </Form.Group>

// //               {/* 🔹 Keywords */}
// //               <Form.Group className="mb-4">
// //                 <Form.Label className="fw-semibold">Keywords</Form.Label>
// //                 <Form.Control
// //                   as="textarea"
// //                   rows={2}
// //                   name="keywords"
// //                   value={formData.keywords}
// //                   onChange={handleChange}
// //                   placeholder="e.g., B2B, wholesale, supplier, exporter"
// //                 />
// //               </Form.Group>

// //               {/* 🔹 Buttons */}
// //               <div className="d-flex justify-content-end gap-2">
// //                 <Button
// //                   variant="secondary"
// //                   onClick={onCancel}
// //                   className="px-4 rounded-pill"
// //                 >
// //                   Cancel
// //                 </Button>
// //                 <Button
// //                   variant="primary"
// //                   type="submit"
// //                   className="px-4 rounded-pill"
// //                   style={{
// //                     background:
// //                       "linear-gradient(to right, #007bff, #6610f2)",
// //                     border: "none",
// //                     boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
// //                     transition: "all 0.3s ease",
// //                   }}
// //                   onMouseOver={(e) =>
// //                     (e.target.style.transform = "scale(1.03)")
// //                   }
// //                   onMouseOut={(e) =>
// //                     (e.target.style.transform = "scale(1)")
// //                   }
// //                   disabled={loading}
// //                 >
// //                   {loading ? (
// //                     <Spinner as="span" animation="border" size="sm" />
// //                   ) : (
// //                     "Update"
// //                   )}
// //                 </Button>
// //               </div>
// //             </Form>
// //           </Card>
// //         </Container>
// //       </div>
// //     </>
// //   );
// // };

// // export default UpdateProfileForm;


// import React, { useState, useEffect } from "react";
// import {
//   Container, Form, Button, Alert, Spinner, Row, Col, Card, ListGroup, InputGroup
// } from "react-bootstrap";
// import {
//   requestCompanyUpdate,
//   getAllCompanyCategories,
//   getAllCompanySubCategories
// } from "../Services/authApi"; // सुनिश्चित करें कि यह सही पाथ है
// import axios from 'axios'; // For URL.createObjectURL previews

// // Placeholder image for broken links or missing images
// const placeholderImageUrl = 'https://via.placeholder.com/100x75/f0f0f0/cccccc?text=No+Image';

// const UpdateProfileForm = ({ currentProfileData, onUpdateSuccess, onCancel }) => {
//   // --- Core State for Company Profile Editing ---
//   // We'll use editedProfileData as the single source of truth for form data
//   const [editedProfileData, setEditedProfileData] = useState({});

//   const [loading, setLoading] = useState(false); // For form submission
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   // --- FILE UPLOAD STATES (for new files) ---
//   const [newLogo, setNewLogo] = useState(null);
//   const [newBannerImages, setNewBannerImages] = useState([]); // For newly selected banner files
//   const [bannersToRemove, setBannersToRemove] = useState([]); // URLs of existing banners to be removed
//   const [newAadhaarImage, setNewAadhaarImage] = useState(null);
//   const [newPanImage, setNewPanImage] = useState(null);
//   const [newElectricityBillImage, setNewElectricityBillImage] = useState(null);
//   const [newPassportPhoto, setNewPassportPhoto] = useState(null);
//   // --- END FILE UPLOAD STATES ---

//   // --- OTHER EDITABLE FIELD STATES ---
//   const [socialLinkInput, setSocialLinkInput] = useState(''); // Temp input for adding new social links
//   const [keywordInput, setKeywordInput] = useState(''); // Temp input for keywords as comma-separated string
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [filteredSubCategoriesForEdit, setFilteredSubCategoriesForEdit] = useState([]); // For subcategories dropdown in edit mode
//   // --- END OTHER EDITABLE FIELD STATES ---

//   const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];


//   // --- Data Initialization on Mount / currentProfileData change ---
//   useEffect(() => {
//     const initForm = async () => {
//       if (currentProfileData) {
//         setEditedProfileData({
//           ...currentProfileData,
//           // Convert array fields to comma-separated strings for textarea display (or keep as arrays for interactive list)
//           // For now, keywords will use keywordInput, socialLinks are managed interactively.
//           // Address fields might be nested, so flatten for form:
//           address: currentProfileData.address?.address || '',
//           city: currentProfileData.address?.city || '',
//           state: currentProfileData.address?.state || '',
//           country: currentProfileData.address?.country || '',
//           // Ensure businessTimings is a mutable copy or has defaults
//           businessTimings: currentProfileData.businessTimings ? { ...currentProfileData.businessTimings } : {},
//           // category and subCategory are objects, keep them as is
//         });

//         // Initialize keywordInput and socialLinkInput for editing
//         if (currentProfileData.keywords && Array.isArray(currentProfileData.keywords)) {
//           setKeywordInput(currentProfileData.keywords.join(', '));
//         } else {
//           setKeywordInput('');
//         }
//         setSocialLinkInput(''); // Cleared to add new ones, existing handled by editedProfileData

//         // Fetch categories and subcategories
//         try {
//           const categoriesRes = await getAllCompanyCategories();
//           setCategories(categoriesRes.data);
//           const subCategoriesRes = await getAllCompanySubCategories();
//           setSubCategories(subCategoriesRes.data);
//         } catch (err) {
//           console.error("Failed to fetch categories/subcategories:", err);
//           // Handle error, maybe show an alert
//         }
//       }
//     };
//     initForm();
//   }, [currentProfileData]);


//   // --- Effects for Filtering Subcategories (based on selected category) ---
//   useEffect(() => {
//     if (editedProfileData.category?._id && subCategories.length > 0) {
//       setFilteredSubCategoriesForEdit(subCategories.filter(sub => sub.parentCategory === editedProfileData.category._id));
//     } else {
//       setFilteredSubCategoriesForEdit([]);
//     }
//   }, [editedProfileData.category, subCategories]);


//   // --- Input Change Handlers ---
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     // Handle specific fields (like keywords input vs array)
//     if (name === 'keywords') {
//       setKeywordInput(value); // Update keywordInput for the textarea display
//       // Update editedProfileData.keywords as an array
//       setEditedProfileData(prevData => ({
//         ...prevData,
//         keywords: value.split(',').map(kw => kw.trim()).filter(Boolean) // Filter(Boolean) removes empty strings
//       }));
//     } else {
//       setEditedProfileData(prevData => ({
//         ...prevData,
//         [name]: value
//       }));
//     }
//   };

//   // Handler for Category selection in edit mode
//   const handleCategoryChange = (e) => {
//     const categoryId = e.target.value;
//     const selectedCategory = categories.find(cat => cat._id === categoryId);
//     setEditedProfileData(prevData => ({
//       ...prevData,
//       category: selectedCategory, // Store the full category object (or just ID if backend expects it)
//       subCategory: null // Reset subCategory when category changes
//     }));
//   };

//   // Handler for SubCategory selection in edit mode
//   const handleSubCategoryChange = (e) => {
//     const subCategoryId = e.target.value;
//     const selectedSubCategory = subCategories.find(sub => sub._id === subCategoryId);
//     setEditedProfileData(prevData => ({
//       ...prevData,
//       subCategory: selectedSubCategory // Store the full subCategory object (or just ID)
//     }));
//   };

//   // Handlers for Social Links
//   const handleAddSocialLink = () => {
//     if (socialLinkInput.trim()) {
//       setEditedProfileData(prevData => {
//         const currentSocialLinks = Array.isArray(prevData.socialLinks) ? prevData.socialLinks : [];
//         if (!currentSocialLinks.includes(socialLinkInput.trim())) {
//           return {
//             ...prevData,
//             socialLinks: [...currentSocialLinks, socialLinkInput.trim()]
//           };
//         }
//         return prevData;
//       });
//       setSocialLinkInput('');
//     }
//   };

//   const handleRemoveSocialLink = (linkToRemove) => {
//     setEditedProfileData(prevData => ({
//       ...prevData,
//       socialLinks: prevData.socialLinks.filter(link => link !== linkToRemove)
//     }));
//   };

//   // --- FILE HANDLERS for single/multi-file inputs ---
//   const handleSingleFileChange = (e, setStateFunction) => {
//     setStateFunction(e.target.files[0] || null);
//   };

//   const handleMultiFileChange = (e, setStateFunction) => {
//     setStateFunction(Array.from(e.target.files || []));
//   };

//   // Handler for marking/unmarking existing banner images for removal
//   const handleRemoveExistingBanner = (imageUrl) => {
//     setBannersToRemove(prev =>
//       prev.includes(imageUrl)
//         ? prev.filter(url => url !== imageUrl) // If already marked for removal, unmark it
//         : [...prev, imageUrl] // Mark for removal
//     );
//   };
//   // --- END FILE HANDLERS ---

//   // --- Submit Handler ---
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setSuccess('');

//     try {
//       const formData = new FormData();
//       let changesDetected = false;

//       // Append text/value changes only if they are different from the original or newly provided
//       for (const key in editedProfileData) {
//         // Skip internal/immutable fields or fields handled separately (like file inputs or banner0 arrays)
//         if (currentProfileData.hasOwnProperty(key) &&
//             !['products', 'registeredBy', 'approvedBy', 'isApproved', 'companyStatus', 'pendingProfileUpdates', '__v', '_id', 'createdAt', 'updatedAt', 'logo', 'banner', 'aadhaarImage', 'panImage', 'electricityBillImage', 'passportPhoto'].includes(key)) {

//           let originalValue = currentProfileData[key];
//           let editedValue = editedProfileData[key];

//           if (key === 'businessTimings') {
//             // Deep comparison for businessTimings
//             if (JSON.stringify(originalValue) !== JSON.stringify(editedValue)) {
//               formData.append(key, JSON.stringify(editedValue)); // Send as stringified JSON
//               changesDetected = true;
//             }
//           } else if (key === 'socialLinks' || key === 'keywords') {
//             // Handle array-like data (convert to stringified JSON for FormData)
//             const originalArray = Array.isArray(originalValue) ? originalValue : (originalValue ? JSON.parse(originalValue) : []);
//             const editedArray = Array.isArray(editedValue) ? editedValue : (editedValue ? JSON.parse(editedValue) : []);
//             // Sort for consistent comparison
//             if (JSON.stringify(originalArray.sort()) !== JSON.stringify(editedArray.sort())) {
//               formData.append(key, JSON.stringify(editedArray));
//               changesDetected = true;
//             }
//           } else if (key === 'category') {
//             // Only append category ID if it has changed
//             if (editedProfileData.category?._id !== currentProfileData.category?._id) {
//               formData.append('category', editedProfileData.category._id);
//               changesDetected = true;
//             }
//           } else if (key === 'subCategory') {
//             // Only append subCategory ID if it has changed
//             if (editedProfileData.subCategory?._id !== currentProfileData.subCategory?._id) {
//               formData.append('subCategory', editedProfileData.subCategory._id);
//               changesDetected = true;
//             }
//           } else if (originalValue !== editedValue) {
//             // For simple text fields, check if they are different
//             if (key === 'address' || key === 'city' || key === 'state' || key === 'country') {
//                 // Address fields are special, they might be nested in backend or flat.
//                 // Assuming backend expects flat for update.
//                 // You might need to adjust this based on your backend's specific update payload for address.
//                 // For simplicity, we are sending them as flat strings.
//                 if (currentProfileData.address?.[key] !== editedValue) { // Compare with nested original address
//                     formData.append(key, editedValue);
//                     changesDetected = true;
//                 }
//             } else {
//                 formData.append(key, editedValue);
//                 changesDetected = true;
//             }
//           }
//         }
//       }

//       // --- APPEND NEW FILES TO FORMDATA ---
//       if (newLogo) {
//         formData.append('logo', newLogo);
//         changesDetected = true;
//       }
//       if (newBannerImages.length > 0) {
//         newBannerImages.forEach(file => formData.append('banner', file)); // Matches backend multer field name for new files
//         changesDetected = true;
//       }
//       // --- IMPORTANT: Append banners to be removed ---
//       if (bannersToRemove.length > 0) {
//         formData.append('bannersToDelete', JSON.stringify(bannersToRemove)); // Send array of URLs to delete
//         changesDetected = true;
//       }

//       if (newAadhaarImage) {
//         formData.append('aadhaar', newAadhaarImage); // Matches backend multer field name
//         changesDetected = true;
//       }
//       if (newPanImage) {
//         formData.append('pan', newPanImage); // Matches backend multer field name
//         changesDetected = true;
//       }
//       if (newElectricityBillImage) {
//         formData.append('electricityBill', newElectricityBillImage); // Matches backend multer field name
//         changesDetected = true;
//       }
//       if (newPassportPhoto) {
//         formData.append('passportPhoto', newPassportPhoto); // Matches backend multer field name
//         changesDetected = true;
//       }
//       // --- END APPEND NEW FILES ---


//       if (!changesDetected && newLogo === null && newBannerImages.length === 0 && bannersToRemove.length === 0 &&
//           newAadhaarImage === null && newPanImage === null && newElectricityBillImage === null && newPassportPhoto === null) {
//         setError("No changes detected to submit for update.");
//         setLoading(false);
//         return;
//       }

//       // Call the API with FormData
//       const res = await requestCompanyUpdate(formData);
//       setSuccess(res.message || "Company update request submitted successfully!");

//       // Clear all file input and removal states after successful submission
//       setNewLogo(null);
//       setNewBannerImages([]);
//       setBannersToRemove([]); // Clear banners to remove after submission
//       setNewAadhaarImage(null);
//       setNewPanImage(null);
//       setNewElectricityBillImage(null);
//       setNewPassportPhoto(null);
//       setSocialLinkInput('');
//       setKeywordInput('');

    
//       setTimeout(() => {
//         if (onUpdateSuccess) onUpdateSuccess(res.data);
//       }, 1500);

//     } catch (err) {
//       console.error("Failed to request company update:", err);
//       const errorMessage = err.response?.data?.message || err.message || "Failed to submit update request.";
//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
      
//       <style>{`
//         .form-control, .form-select { /* Added form-select */
//           transition: all 0.3s ease;
//           border: 1px solid #dee2e6;
//           box-shadow: none;
//         }
//         .form-control:hover, .form-select:hover {
//           border-color: #80bdff;
//         }
//         .form-control:focus, .form-select:focus {
//           border-color: #007bff !important;
//           box-shadow: 0 0 6px rgba(0, 123, 255, 0.5) !important;
//         }
//       `}</style>

//       <div
//         style={{
//           background: "linear-gradient(135deg, #e3f2fd, #f8f9fa)",
//           minHeight: "100vh",
//           paddingTop: "50px",
//           paddingBottom: "50px",
//         }}
//       >
//         <Container>
//           <Card
//             className="shadow-lg border-0 rounded-4 p-0 mx-auto" // Adjusted padding to 0 for header div
//             style={{
//               maxWidth: "850px",
//               background: "linear-gradient(145deg, #ffffff, #e9f0ff)",
//               boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
//             }}
//           >
//             {/* Stylish Heading with Background Color */}
//             <div
//               className="py-4 px-5 text-center rounded-top-4" // Padding and rounded top corners
//               style={{ backgroundColor: '#e9ecef', borderBottom: '1px solid #dee2e6' }} // Light grey background, subtle bottom border
//             >
//               <h3 className="mb-0 text-dark fw-bold" style={{ fontSize: '2rem' }}> {/* Larger font size, dark text, no bottom margin */}
//                 Update Company Profile
//               </h3>
//               <p className="text-muted mt-2 mb-0">Edit your company's information below.</p> {/* Sub-heading */}
//             </div>

//             <Card.Body className="p-5"> {/* Increased padding for body */}
//               {loading && (
//                 <Spinner animation="border" className="d-block mx-auto mb-3 text-primary" />
//               )}
//               {error && (
//                 <Alert variant="danger" className="text-center animate__animated animate__shakeX">
//                   {error}
//                 </Alert>
//               )}
//               {success && (
//                 <Alert variant="success" className="text-center animate__animated animate__fadeIn">
//                   {success}
//                 </Alert>
//               )}

//               <Form onSubmit={handleSubmit}>
//                 {/* --- Company Info Fields --- */}
//                 <h5 className="mb-4 fw-bold text-primary">General Information</h5>
//                 <Row className="mb-3">
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">Company Name</Form.Label>
//                       <Form.Control
//                         type="text"
//                         name="name"
//                         value={editedProfileData.name || ""}
//                         onChange={handleInputChange}
//                         placeholder="Enter company name"
//                         required
//                         className="rounded-pill px-3 py-2"
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">Tagline</Form.Label>
//                       <Form.Control
//                         type="text"
//                         name="tagline"
//                         value={editedProfileData.tagline || ''}
//                         onChange={handleInputChange}
//                         placeholder="Your company's motto or short description"
//                         className="rounded-pill px-3 py-2"
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//                 <Form.Group className="mb-4">
//                   <Form.Label className="fw-semibold">Description</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     rows={4}
//                     name="description"
//                     value={editedProfileData.description || ""}
//                     onChange={handleInputChange}
//                     placeholder="Write a short description about your company..."
//                     className="rounded-3 px-3 py-2"
//                     style={{ resize: 'vertical' }}
//                   />
//                 </Form.Group>

//                 {/* --- Media File Uploads --- */}
//                 <h5 className="mt-4 mb-3 fw-bold text-primary">Media Uploads</h5>
//                 <Row className="mb-3">
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">Company Logo</Form.Label>
//                       <Form.Control
//                         type="file"
//                         accept="image/*"
//                         onChange={(e) => handleSingleFileChange(e, setNewLogo)}
//                         className="rounded-pill px-3 py-2"
//                       />
//                       {newLogo && <p className="small text-muted mt-1">Selected new logo: {newLogo.name}</p>}
//                       {!newLogo && currentProfileData.logo && <p className="small text-muted mt-1">Current logo: <a href={currentProfileData.logo} target="_blank" rel="noopener noreferrer">View</a></p>}
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">Upload New Company Banners (Max 5)</Form.Label>
//                       <Form.Control
//                         type="file"
//                         multiple
//                         accept="image/*"
//                         onChange={(e) => handleMultiFileChange(e, setNewBannerImages)}
//                         className="rounded-pill px-3 py-2"
//                       />
//                       {newBannerImages.length > 0 && <p className="small text-muted mt-1">Selected {newBannerImages.length} new banners.</p>}
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 {/* Display existing banners with remove option */}
//                 {currentProfileData.banner && currentProfileData.banner.length > 0 && (
//                   <div className="mb-3">
//                     <h6 className="fw-semibold">Existing Banners:</h6>
//                     <Row xs={2} md={3} lg={4} className="g-2 mt-2">
//                       {currentProfileData.banner.map((img, index) => (
//                         <Col key={index}>
//                           <div className={`position-relative border p-1 rounded ${bannersToRemove.includes(img) ? 'bg-light opacity-50' : ''}`}>
//                             <img src={img} alt={`Banner ${index + 1}`} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '4px' }} onError={(e) => { e.target.onerror = null; e.target.src = placeholderImageUrl }} />
//                             <Button
//                               variant={bannersToRemove.includes(img) ? "outline-secondary" : "danger"}
//                               size="sm"
//                               className="position-absolute top-0 end-0 m-1 p-0 px-1" // Smaller button
//                               onClick={() => handleRemoveExistingBanner(img)}
//                               title={bannersToRemove.includes(img) ? "Undo remove" : "Mark to remove"}
//                             >
//                               {bannersToRemove.includes(img) ? <i className="bi bi-arrow-counterclockwise"></i> : <i className="bi bi-trash-fill"></i>}
//                             </Button>
//                           </div>
//                         </Col>
//                       ))}
//                     </Row>
//                     {bannersToRemove.length > 0 && <p className="small text-danger mt-2">({bannersToRemove.length} banners marked for removal upon update)</p>}
//                   </div>
//                 )}
//                 {/* Display preview of new banners */}
//                 {newBannerImages.length > 0 && (
//                   <div className="mb-4">
//                     <h6 className="fw-semibold">New Banners Preview:</h6>
//                     <Row xs={2} md={3} lg={4} className="g-2 mt-2">
//                       {newBannerImages.map((file, index) => (
//                         <Col key={index}>
//                           <img src={URL.createObjectURL(file)} alt={`New Banner ${index + 1}`} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '4px' }} />
//                         </Col>
//                       ))}
//                     </Row>
//                   </div>
//                 )}


//                 {/* --- Contact Information --- */}
//                 <h5 className="mt-4 mb-3 fw-bold text-primary">Contact Information</h5>
//                 <Row className="mb-3">
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">Email</Form.Label>
//                       <Form.Control
//                         type="email"
//                         name="email"
//                         value={editedProfileData.email || ""}
//                         onChange={handleInputChange}
//                         placeholder="Enter email"
//                         required
//                         className="rounded-pill px-3 py-2"
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">Phone</Form.Label>
//                       <Form.Control
//                         type="tel"
//                         name="phone"
//                         value={editedProfileData.phone || ""}
//                         onChange={handleInputChange}
//                         placeholder="Enter phone number"
//                         className="rounded-pill px-3 py-2"
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//                 <Row className="mb-3">
//                     <Col md={6}>
//                         <Form.Group className="mb-3">
//                             <Form.Label className="fw-semibold">Address Line</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="address"
//                                 value={editedProfileData.address || ''}
//                                 onChange={handleInputChange}
//                                 placeholder="Street address, building name"
//                                 className="rounded-pill px-3 py-2"
//                             />
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label className="fw-semibold">City</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="city"
//                                 value={editedProfileData.city || ''}
//                                 onChange={handleInputChange}
//                                 placeholder="City"
//                                 className="rounded-pill px-3 py-2"
//                             />
//                         </Form.Group>
//                     </Col>
//                     <Col md={6}>
//                         <Form.Group className="mb-3">
//                             <Form.Label className="fw-semibold">State</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="state"
//                                 value={editedProfileData.state || ''}
//                                 onChange={handleInputChange}
//                                 placeholder="State"
//                                 className="rounded-pill px-3 py-2"
//                             />
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label className="fw-semibold">Country</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="country"
//                                 value={editedProfileData.country || ''}
//                                 onChange={handleInputChange}
//                                 placeholder="Country"
//                                 className="rounded-pill px-3 py-2"
//                             />
//                         </Form.Group>
//                     </Col>
//                 </Row>
//                 <Form.Group className="mb-4">
//                   <Form.Label className="fw-semibold">Website</Form.Label>
//                   <Form.Control
//                     type="url"
//                     name="website"
//                     value={editedProfileData.website || ""}
//                     onChange={handleInputChange}
//                     placeholder="Enter website URL (e.g., https://www.example.com)"
//                     className="rounded-pill px-3 py-2"
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-4">
//                     <Form.Label className="fw-semibold">Google Maps Link</Form.Label>
//                     <Form.Control
//                         type="url"
//                         name="googleMapsLink"
//                         value={editedProfileData.googleMapsLink || ''}
//                         onChange={handleInputChange}
//                         placeholder="Enter Google Maps link for your location"
//                         className="rounded-pill px-3 py-2"
//                     />
//                 </Form.Group>

//                 {/* --- Business Details --- */}
//                 <h5 className="mt-4 mb-3 fw-bold text-primary">Business Details</h5>
//                 <Row className="mb-3">
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">Company Type</Form.Label>
//                       <Form.Control
//                         type="text"
//                         name="companyType"
//                         value={editedProfileData.companyType || ""}
//                         onChange={handleInputChange}
//                         placeholder="e.g., Manufacturer, Trader"
//                         className="rounded-pill px-3 py-2"
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">Category</Form.Label>
//                       <Form.Select
//                         value={editedProfileData.category?._id || ''}
//                         onChange={handleCategoryChange}
//                         className="rounded-pill px-3 py-2"
//                         required
//                       >
//                         <option value="">Select Category</option>
//                         {categories.map(cat => (
//                           <option key={cat._id} value={cat._id}>{cat.name}</option>
//                         ))}
//                       </Form.Select>
//                     </Form.Group>
//                   </Col>
//                 </Row>
//                 <Row className="mb-3">
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">SubCategory (Optional)</Form.Label>
//                       <Form.Select
//                         value={editedProfileData.subCategory?._id || ''}
//                         onChange={handleSubCategoryChange}
//                         disabled={!editedProfileData.category?._id || filteredSubCategoriesForEdit.length === 0}
//                         className="rounded-pill px-3 py-2"
//                       >
//                         <option value="">Select SubCategory</option>
//                         {filteredSubCategoriesForEdit.map(subCat => (
//                           <option key={subCat._id} value={subCat._id}>{subCat.name}</option>
//                         ))}
//                       </Form.Select>
//                       {editedProfileData.category?._id && filteredSubCategoriesForEdit.length === 0 && (
//                         <Form.Text className="text-muted">
//                           No subcategories found for the selected category.
//                         </Form.Text>
//                       )}
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">GST Number</Form.Label>
//                       <Form.Control
//                         type="text"
//                         name="gstNumber"
//                         value={editedProfileData.gstNumber || ""}
//                         onChange={handleInputChange}
//                         placeholder="Enter GST number"
//                         className="rounded-pill px-3 py-2"
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//                 <Form.Group className="mb-4">
//                   <Form.Label className="fw-semibold">Aadhaar Number</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="aadhaarNumber"
//                     value={editedProfileData.aadhaarNumber || ""}
//                     onChange={handleInputChange}
//                     placeholder="Enter Aadhaar number"
//                     className="rounded-pill px-3 py-2"
//                   />
//                 </Form.Group>

//                 <h6 className="mt-4 mb-3 fw-bold">Social Links:</h6>
//                 <InputGroup className="mb-2">
//                   <Form.Control
//                     type="url"
//                     placeholder="Enter social link URL (e.g., https://facebook.com/mycompany)"
//                     value={socialLinkInput}
//                     onChange={(e) => setSocialLinkInput(e.target.value)}
//                     className="rounded-start-pill px-3 py-2"
//                   />
//                   <Button variant="outline-primary" onClick={handleAddSocialLink} className="rounded-end-pill px-3 py-2">Add</Button>
//                 </InputGroup>
//                 {editedProfileData.socialLinks && editedProfileData.socialLinks.length > 0 ? (
//                   <ListGroup className="mb-3">
//                     {editedProfileData.socialLinks.map((link, index) => (
//                       <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center rounded-3 mb-1 px-3 py-2" style={{ backgroundColor: '#f8f9fa' }}>
//                         <a href={link} target="_blank" rel="noopener noreferrer" className="text-primary text-decoration-none small">{link}</a>
//                         <Button variant="danger" size="sm" onClick={() => handleRemoveSocialLink(link)} className="rounded-pill">Remove</Button>
//                       </ListGroup.Item>
//                     ))}
//                   </ListGroup>
//                 ) : (
//                   <p className="text-muted small">No social links added yet.</p>
//                 )}

//                 <h6 className="mt-4 mb-3 fw-bold">Keywords:</h6>
//                 <Form.Control
//                   as="textarea"
//                   name="keywords"
//                   value={keywordInput} // Use keywordInput for display
//                   onChange={handleInputChange} // This will update both keywordInput and editedProfileData.keywords
//                   rows={2}
//                   placeholder="Enter keywords, separated by commas (e.g., product, service, local)"
//                   className="rounded-3 px-3 py-2 mb-4"
//                   style={{ resize: 'vertical' }}
//                 />

//                 <h6 className="mt-4 mb-3 fw-bold">Business Timings:</h6>
//                 <ListGroup className="mb-4">
//                   {daysOfWeek.map(day => (
//                     <ListGroup.Item key={day} className="d-flex justify-content-between align-items-center text-capitalize rounded-3 mb-1 px-3 py-2" style={{ backgroundColor: '#f8f9fa' }}>
//                       <strong>{day}:</strong>
//                       <div className="d-flex align-items-center">
//                         <Form.Control
//                           type="time"
//                           name={`${day}.open`}
//                           value={editedProfileData.businessTimings?.[day]?.open || '00:00'}
//                           onChange={(e) => setEditedProfileData(prev => ({
//                             ...prev,
//                             businessTimings: {
//                               ...prev.businessTimings,
//                               [day]: { ...prev.businessTimings?.[day], open: e.target.value }
//                             }
//                           }))}
//                           className="me-2 rounded-pill px-3 py-2"
//                           style={{ width: '120px' }}
//                         />
//                         <span>-</span>
//                         <Form.Control
//                           type="time"
//                           name={`${day}.close`}
//                           value={editedProfileData.businessTimings?.[day]?.close || '00:00'}
//                           onChange={(e) => setEditedProfileData(prev => ({
//                             ...prev,
//                             businessTimings: {
//                               ...prev.businessTimings,
//                               [day]: { ...prev.businessTimings?.[day], close: e.target.value }
//                             }
//                           }))}
//                           className="ms-2 rounded-pill px-3 py-2"
//                           style={{ width: '120px' }}
//                         />
//                       </div>
//                     </ListGroup.Item>
//                   ))}
//                 </ListGroup>

//                 {/* --- Documents for Verification --- */}
//                 <h5 className="mt-4 mb-3 fw-bold text-primary">Documents for Verification</h5>
//                 <Row className="g-3 mb-4">
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">Aadhaar Image</Form.Label>
//                       <Form.Control type="file" accept="image/*,application/pdf" onChange={(e) => handleSingleFileChange(e, setNewAadhaarImage)} className="rounded-pill px-3 py-2" />
//                       {newAadhaarImage && <p className="small text-muted mt-1">Selected: {newAadhaarImage.name}</p>}
//                       {!newAadhaarImage && currentProfileData.aadhaarImage && <p className="small text-muted mt-1">Current: <a href={currentProfileData.aadhaarImage} target="_blank" rel="noopener noreferrer">View</a></p>}
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">PAN Image</Form.Label>
//                       <Form.Control type="file" accept="image/*,application/pdf" onChange={(e) => handleSingleFileChange(e, setNewPanImage)} className="rounded-pill px-3 py-2" />
//                       {newPanImage && <p className="small text-muted mt-1">Selected: {newPanImage.name}</p>}
//                       {!newPanImage && currentProfileData.panImage && <p className="small text-muted mt-1">Current: <a href={currentProfileData.panImage} target="_blank" rel="noopener noreferrer">View</a></p>}
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">Electricity Bill Image</Form.Label>
//                       <Form.Control type="file" accept="image/*,application/pdf" onChange={(e) => handleSingleFileChange(e, setNewElectricityBillImage)} className="rounded-pill px-3 py-2" />
//                       {newElectricityBillImage && <p className="small text-muted mt-1">Selected: {newElectricityBillImage.name}</p>}
//                       {!newElectricityBillImage && currentProfileData.electricityBillImage && <p className="small text-muted mt-1">Current: <a href={currentProfileData.electricityBillImage} target="_blank" rel="noopener noreferrer">View</a></p>}
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">Passport Photo</Form.Label>
//                       <Form.Control type="file" accept="image/*" onChange={(e) => handleSingleFileChange(e, setNewPassportPhoto)} className="rounded-pill px-3 py-2" />
//                       {newPassportPhoto && <p className="small text-muted mt-1">Selected: {newPassportPhoto.name}</p>}
//                       {!newPassportPhoto && currentProfileData.passportPhoto && <p className="small text-muted mt-1">Current: <a href={currentProfileData.passportPhoto} target="_blank" rel="noopener noreferrer">View</a></p>}
//                     </Form.Group>
//                   </Col>
//                 </Row>


//                 {/* 🔹 Buttons */}
//                 <div className="d-flex justify-content-end gap-3 mt-5"> {/* Increased gap and margin top */}
//                   <Button
//                     variant="outline-secondary"
//                     onClick={onCancel}
//                     className="px-4 py-2 fw-bold rounded-pill"
//                     disabled={loading}
//                   >
//                     Cancel
//                   </Button>
//                   <Button
//                     variant="primary"
//                     type="submit"
//                     className="px-4 py-2 fw-bold rounded-pill"
//                     style={{
//                       background:
//                         "linear-gradient(to right, #007bff, #6610f2)",
//                       border: "none",
//                       boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
//                       transition: "all 0.3s ease",
//                     }}
//                     onMouseOver={(e) =>
//                       (e.target.style.transform = "scale(1.03)")
//                     }
//                     onMouseOut={(e) =>
//                       (e.target.style.transform = "scale(1)")
//                     }
//                     disabled={loading}
//                   >
//                     {loading ? (
//                       <Spinner as="span" animation="border" size="sm" className="me-2" />
//                     ) : (
//                       "Submit Update Request" // Changed button text for clarity
//                     )}
//                   </Button>
//                 </div>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Container>
//       </div>
//     </>
//   );
// };

// export default UpdateProfileForm;

// import React, { useState, useEffect } from "react";
// import {
//   Container, Form, Button, Alert, Spinner, Row, Col, Card, ListGroup, InputGroup
// } from "react-bootstrap";
// import {
//   requestCompanyUpdate,
//   getAllCompanyCategories,
//   getAllCompanySubCategories,
//   getCountries,
//   getStatesByCountry,
//   getCitiesByState
// } from "../Services/authApi"; // सुनिश्चित करें कि यह सही पाथ है
// import axios from 'axios'; // For URL.createObjectURL previews

// // Placeholder image for broken links or missing images
// const placeholderImageUrl = 'https://via.placeholder.com/100x75/f0f0f0/cccccc?text=No+Image';

// // IMPORTANT: Assuming "India" has this fixed ID in your backend database.
// // Please verify this ID with your actual backend data.
// const INDIA_DEFAULT_COUNTRY_ID = "687a1e2185f0230715032380";

// const UpdateProfileForm = ({ currentProfileData, onUpdateSuccess, onCancel }) => {
//   // --- Core State for Company Profile Editing ---
//   // We'll use editedProfileData as the single source of truth for form data
//   const [editedProfileData, setEditedProfileData] = useState({
//     name: '', tagline: '', description: '', email: '', phone: '',
//     address: '', city: '', state: '', country: INDIA_DEFAULT_COUNTRY_ID, // Default to India ID
//     website: '', googleMapsLink: '', companyType: '', gstNumber: '', aadhaarNumber: '',
//     socialLinks: [], keywords: [], businessTimings: {},
//     category: null, subCategory: null,
//   });

//   const [loading, setLoading] = useState(false); // For form submission
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   // --- FILE UPLOAD STATES (for new files) ---
//   const [newLogo, setNewLogo] = useState(null);
//   const [newBannerImages, setNewBannerImages] = useState([]); // For newly selected banner files
//   const [bannersToRemove, setBannersToRemove] = useState([]); // URLs of existing banners to be removed
//   const [newAadhaarImage, setNewAadhaarImage] = useState(null);
//   const [newPanImage, setNewPanImage] = useState(null);
//   const [newElectricityBillImage, setNewElectricityBillImage] = useState(null);
//   const [newPassportPhoto, setNewPassportPhoto] = useState(null);
//   // --- END FILE UPLOAD STATES ---

//   // --- OTHER EDITABLE FIELD STATES ---
//   const [socialLinkInput, setSocialLinkInput] = useState(''); // Temp input for adding new social links
//   const [keywordInput, setKeywordInput] = useState(''); // Temp input for keywords as comma-separated string
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [filteredSubCategoriesForEdit, setFilteredSubCategoriesForEdit] = useState([]); // For subcategories dropdown in edit mode
//   // --- END OTHER EDITABLE FIELD STATES ---

//   // --- LOCATION SPECIFIC STATES ---
//   const [countries, setCountries] = useState([]); // Still fetch all countries to find 'India' by ID
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   // selectedCountryDropdownId will always be INDIA_DEFAULT_COUNTRY_ID
//   const [selectedCountryDropdownId, setSelectedCountryDropdownId] = useState(INDIA_DEFAULT_COUNTRY_ID);
//   const [selectedStateDropdownId, setSelectedStateDropdownId] = useState('');
//   // --- END LOCATION SPECIFIC STATES ---

//   const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];


//   // --- Data Initialization on Mount / currentProfileData change ---
//   useEffect(() => {
//     const initForm = async () => {
//       if (!currentProfileData) {
//         console.warn("UpdateProfileForm: currentProfileData is not yet available.");
//         return;
//       }

//       setEditedProfileData({
//         ...currentProfileData,
//         address: currentProfileData.address?.address || '',
//         // These will be populated with actual IDs from currentProfileData.address
//         country: currentProfileData.address?.country || INDIA_DEFAULT_COUNTRY_ID, // Default to India ID if not present
//         state: currentProfileData.address?.state || '',
//         city: currentProfileData.address?.city || '',
//         businessTimings: currentProfileData.businessTimings ? { ...currentProfileData.businessTimings } : {},
//         socialLinks: Array.isArray(currentProfileData.socialLinks) ? [...currentProfileData.socialLinks] : [],
//         keywords: Array.isArray(currentProfileData.keywords) ? [...currentProfileData.keywords] : [],
//       });

//       if (currentProfileData.keywords && Array.isArray(currentProfileData.keywords)) {
//         setKeywordInput(currentProfileData.keywords.join(', '));
//       } else {
//         setKeywordInput('');
//       }
//       setSocialLinkInput('');

//       // Fetch categories and subcategories
//       try {
//         const categoriesRes = await getAllCompanyCategories();
//         setCategories(categoriesRes.data);
//         const subCategoriesRes = await getAllCompanySubCategories();
//         setSubCategories(subCategoriesRes.data);
//       } catch (err) {
//         console.error("Failed to fetch categories/subcategories:", err);
//         setError("Failed to fetch categories/subcategories.");
//       }

//       // --- Location Data Initialization for India, States, and Cities ---
//       try {
//           // Even if we default to India, we might need its full object or to ensure its ID is correct
//           const countriesRes = await getCountries();
//           setCountries(countriesRes.data); // Store all countries

//           // Ensure India is set as the selected country for dropdown logic
//           setSelectedCountryDropdownId(INDIA_DEFAULT_COUNTRY_ID);
//           setEditedProfileData(prevData => ({ ...prevData, country: INDIA_DEFAULT_COUNTRY_ID }));

//           // Fetch states for INDIA_DEFAULT_COUNTRY_ID immediately
//           const statesRes = await getStatesByCountry(INDIA_DEFAULT_COUNTRY_ID);
//           setStates(statesRes.data);

//           const initialStateFromProfile = currentProfileData.address?.state;
//           if (initialStateFromProfile) {
//               let stateObj = statesRes.data.find(s => s._id === initialStateFromProfile);
//               if (!stateObj) {
//                   // Attempt to find by name if ID isn't a direct match (less robust, but for flexibility)
//                   stateObj = statesRes.data.find(s => s.name === initialStateFromProfile && s.country === INDIA_DEFAULT_COUNTRY_ID);
//               }

//               if (stateObj) {
//                   const stateId = stateObj._id;
//                   setSelectedStateDropdownId(stateId);
//                   setEditedProfileData(prevData => ({ ...prevData, state: stateId }));

//                   const citiesRes = await getCitiesByState(stateId);
//                   setCities(citiesRes.data);

//                   const initialCityFromProfile = currentProfileData.address?.city;
//                   if (initialCityFromProfile) {
//                       let cityObj = citiesRes.data.find(c => c._id === initialCityFromProfile);
//                       if (!cityObj) {
//                           // Attempt to find by name if ID isn't a direct match
//                           cityObj = citiesRes.data.find(c => c.name === initialCityFromProfile && c.state === stateId);
//                       }
//                       if (cityObj) {
//                           setEditedProfileData(prevData => ({ ...prevData, city: cityObj._id }));
//                       }
//                   }
//               }
//           }
//       } catch (err) {
//           console.error("Failed to fetch initial location data (countries, states, cities):", err);
//           setError("Failed to load location data.");
//       }
//     };
//     initForm();
//   }, [currentProfileData]); // Dependency: Only run when currentProfileData changes


//   // --- Effects for Filtering Subcategories (based on selected category) ---
//   useEffect(() => {
//     if (editedProfileData.category?._id && subCategories.length > 0) {
//       setFilteredSubCategoriesForEdit(subCategories.filter(sub => sub.parentCategory === editedProfileData.category._id));
//     } else {
//       setFilteredSubCategoriesForEdit([]);
//     }
//   }, [editedProfileData.category, subCategories]);

//   // --- Effects for fetching States when selectedCountryDropdownId changes ---
//   // This useEffect will still fire, but selectedCountryDropdownId will always be INDIA_DEFAULT_COUNTRY_ID
//   useEffect(() => {
//     const fetchStatesData = async () => {
//       if (selectedCountryDropdownId) { // This will always be INDIA_DEFAULT_COUNTRY_ID
//         setLoading(true);
//         setError('');
//         try {
//           const statesRes = await getStatesByCountry(selectedCountryDropdownId);
//           setStates(statesRes.data);
//           setCities([]); // Clear cities when country (or default India) changes

//           // If the previously selected state is not in the new list of states, reset it
//           if (!statesRes.data.some(s => s._id === editedProfileData.state)) {
//             setEditedProfileData(prevData => ({ ...prevData, state: '', city: '' }));
//             setSelectedStateDropdownId('');
//           } else {
//              // If the state is still valid, ensure dropdown reflects it
//              setSelectedStateDropdownId(editedProfileData.state);
//           }

//         } catch (err) {
//           console.error("Failed to fetch states:", err);
//           setStates([]);
//           setCities([]);
//           setEditedProfileData(prevData => ({ ...prevData, state: '', city: '' }));
//           setSelectedStateDropdownId('');
//           setError(err.response?.data?.message || err.message || "Failed to load states.");
//         } finally {
//           setLoading(false);
//         }
//       } else {
//         setStates([]);
//         setCities([]); // Clear cities too if no country is selected
//         setEditedProfileData(prevData => ({ ...prevData, state: '', city: '' }));
//         setSelectedStateDropdownId('');
//       }
//     };
//     fetchStatesData();
//   }, [selectedCountryDropdownId, editedProfileData.state]); // Added editedProfileData.state as dependency for robust pre-fill

//   // --- Effects for fetching Cities when selectedStateDropdownId changes ---
//   useEffect(() => {
//     const fetchCitiesData = async () => {
//       if (selectedStateDropdownId) {
//         setLoading(true);
//         setError('');
//         try {
//           const citiesRes = await getCitiesByState(selectedStateDropdownId);
//           setCities(citiesRes.data);

//           // If the previously selected city is not in the new list of cities, reset it
//           if (!citiesRes.data.some(c => c._id === editedProfileData.city)) {
//             setEditedProfileData(prevData => ({ ...prevData, city: '' }));
//           }
//         } catch (err) {
//           console.error("Failed to fetch cities:", err);
//           setCities([]);
//           setEditedProfileData(prevData => ({ ...prevData, city: '' }));
//           setError(err.response?.data?.message || err.message || "Failed to load cities.");
//         } finally {
//           setLoading(false);
//         }
//       } else {
//         setCities([]);
//         setEditedProfileData(prevData => ({ ...prevData, city: '' }));
//       }
//     };
//     fetchCitiesData();
//   }, [selectedStateDropdownId, editedProfileData.city]); // Added editedProfileData.city as dependency for robust pre-fill


//   // --- Input Change Handlers for generic text fields ---
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'keywords') {
//       setKeywordInput(value); // Update keywordInput for the textarea display
//       setEditedProfileData(prevData => ({
//         ...prevData,
//         keywords: value.split(',').map(kw => kw.trim()).filter(Boolean) // Filter(Boolean) removes empty strings
//       }));
//     } else {
//       setEditedProfileData(prevData => ({
//         ...prevData,
//         [name]: value
//       }));
//     }
//   };

//   // Handler for Category selection in edit mode
//   const handleCategoryChange = (e) => {
//     const categoryId = e.target.value;
//     const selectedCategory = categories.find(cat => cat._id === categoryId);
//     setEditedProfileData(prevData => ({
//       ...prevData,
//       category: selectedCategory, // Store the full category object (or just ID if backend expects it)
//       subCategory: null // Reset subCategory when category changes
//     }));
//   };

//   // Handler for SubCategory selection in edit mode
//   const handleSubCategoryChange = (e) => {
//     const subCategoryId = e.target.value;
//     const selectedSubCategory = subCategories.find(sub => sub._id === subCategoryId);
//     setEditedProfileData(prevData => ({
//       ...prevData,
//       subCategory: selectedSubCategory // Store the full subCategory object (or just ID)
//     }));
//   };

//   // Handlers for Location Selects
//   // handleCountryChange is now effectively removed for user interaction
//   // Only handleStateChange and handleCityChange are relevant for user selection
//   const handleStateChange = (e) => {
//     const stateId = e.target.value;
//     setSelectedStateDropdownId(stateId); // Update the state for the dropdown
//     setEditedProfileData(prevData => ({
//       ...prevData,
//       state: stateId, // Store the selected state ID for submission
//       city: ''        // Reset city when state changes
//     }));
//   };

//   const handleCityChange = (e) => {
//     const cityId = e.target.value; // Assuming option value is city._id
//     setEditedProfileData(prevData => ({
//       ...prevData,
//       city: cityId // Store the selected city ID for submission
//     }));
//   };

//   // Handlers for Social Links
//   const handleAddSocialLink = () => {
//     if (socialLinkInput.trim()) {
//       setEditedProfileData(prevData => {
//         const currentSocialLinks = Array.isArray(prevData.socialLinks) ? prevData.socialLinks : [];
//         if (!currentSocialLinks.includes(socialLinkInput.trim())) {
//           return {
//             ...prevData,
//             socialLinks: [...currentSocialLinks, socialLinkInput.trim()]
//           };
//         }
//         return prevData;
//       });
//       setSocialLinkInput('');
//     }
//   };

//   const handleRemoveSocialLink = (linkToRemove) => {
//     setEditedProfileData(prevData => ({
//       ...prevData,
//       socialLinks: prevData.socialLinks.filter(link => link !== linkToRemove)
//     }));
//   };

//   // --- FILE HANDLERS for single/multi-file inputs ---
//   const handleSingleFileChange = (e, setStateFunction) => {
//     setStateFunction(e.target.files[0] || null);
//   };

//   const handleMultiFileChange = (e, setStateFunction) => {
//     setStateFunction(Array.from(e.target.files || []));
//   };

//   // Handler for marking/unmarking existing banner images for removal
//   const handleRemoveExistingBanner = (imageUrl) => {
//     setBannersToRemove(prev =>
//       prev.includes(imageUrl)
//         ? prev.filter(url => url !== imageUrl) // If already marked for removal, unmark it
//         : [...prev, imageUrl] // Mark for removal
//     );
//   };
//   // --- END FILE HANDLERS ---

//   // --- Submit Handler ---
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setSuccess('');

//     try {
//       const formData = new FormData();
//       let changesDetected = false;

//       // Append text/value changes only if they are different from the original or newly provided
//       for (const key in editedProfileData) {
//         // Skip internal/immutable fields or fields handled separately (like file inputs or banner arrays)
//         if (['products', 'registeredBy', 'approvedBy', 'isApproved', 'companyStatus', 'pendingProfileUpdates', '__v', '_id', 'createdAt', 'updatedAt', 'logo', 'banner', 'aadhaarImage', 'panImage', 'electricityBillImage', 'passportPhoto'].includes(key)) {
//             continue;
//         }

//         let originalValue;
//         let editedValue = editedProfileData[key];

//         // Special handling for address-related fields (address, city, state, country)
//         if (key === 'address') { // Simple address string
//             originalValue = currentProfileData?.address?.address;
//         } else if (key === 'country' || key === 'state' || key === 'city') { // These are now IDs
//             // For country, it's always INDIA_DEFAULT_COUNTRY_ID, so if the original was different, it's a change
//             // For state/city, compare IDs
//             originalValue = currentProfileData?.address?.[key]; // Get the ID from original profile
//         } else { // For other top-level fields
//             originalValue = currentProfileData[key];
//         }


//         if (key === 'businessTimings') {
//           // Deep comparison for businessTimings
//           if (JSON.stringify(originalValue) !== JSON.stringify(editedValue)) {
//             formData.append(key, JSON.stringify(editedValue)); // Send as stringified JSON
//             changesDetected = true;
//           }
//         } else if (key === 'socialLinks' || key === 'keywords') {
//           // Handle array-like data (convert to stringified JSON for FormData)
//           const originalArray = Array.isArray(originalValue) ? originalValue : (originalValue ? JSON.parse(originalValue) : []);
//           const editedArray = Array.isArray(editedValue) ? editedValue : (editedValue ? JSON.parse(editedValue) : []);
//           // Sort for consistent comparison
//           if (JSON.stringify(originalArray.sort()) !== JSON.stringify(editedArray.sort())) {
//             formData.append(key, JSON.stringify(editedArray));
//             changesDetected = true;
//           }
//         } else if (key === 'category') {
//           // Only append category ID if it has changed
//           if (editedProfileData.category?._id !== currentProfileData?.category?._id) {
//             formData.append('category', editedProfileData.category._id);
//             changesDetected = true;
//           }
//         } else if (key === 'subCategory') {
//           // Only append subCategory ID if it has changed
//           if (editedProfileData.subCategory?._id !== currentProfileData?.subCategory?._id) {
//             formData.append('subCategory', editedProfileData.subCategory._id);
//             changesDetected = true;
//           }
//         } else if (originalValue !== editedValue) {
//           // For simple text fields, or location IDs (country, state, city)
//           // Only append if there's a change and the new value is not empty,
//           // or if the original was not empty and it's now being cleared (explicitly send empty string)
//           if (editedValue !== '' || (originalValue !== '' && originalValue !== undefined && originalValue !== null)) {
//               formData.append(key, editedValue);
//               changesDetected = true;
//           }
//         }
//       }

//       // --- APPEND NEW FILES TO FORMDATA ---
//       if (newLogo) {
//         formData.append('logo', newLogo);
//         changesDetected = true;
//       }
//       if (newBannerImages.length > 0) {
//         newBannerImages.forEach(file => formData.append('banner', file)); // Matches backend multer field name for new files
//         changesDetected = true;
//       }
//       // --- IMPORTANT: Append banners to be removed ---
//       if (bannersToRemove.length > 0) {
//         formData.append('bannersToDelete', JSON.stringify(bannersToRemove)); // Send array of URLs to delete
//         changesDetected = true;
//       }

//       if (newAadhaarImage) {
//         formData.append('aadhaar', newAadhaarImage); // Matches backend multer field name
//         changesDetected = true;
//       }
//       if (newPanImage) {
//         formData.append('pan', newPanImage); // Matches backend multer field name
//         changesDetected = true;
//       }
//       if (newElectricityBillImage) {
//         formData.append('electricityBill', newElectricityBillImage); // Matches backend multer field name
//         changesDetected = true;
//       }
//       if (newPassportPhoto) {
//         formData.append('passportPhoto', newPassportPhoto); // Matches backend multer field name
//         changesDetected = true;
//       }
//       // --- END APPEND NEW FILES ---


//       if (!changesDetected && newLogo === null && newBannerImages.length === 0 && bannersToRemove.length === 0 &&
//           newAadhaarImage === null && newPanImage === null && newElectricityBillImage === null && newPassportPhoto === null) {
//         setError("No changes detected to submit for update.");
//         setLoading(false);
//         return;
//       }

//       // Call the API with FormData
//       const res = await requestCompanyUpdate(formData);
//       setSuccess(res.message || "Company update request submitted successfully!");

//       // Clear all file input and removal states after successful submission
//       setNewLogo(null);
//       setNewBannerImages([]);
//       setBannersToRemove([]); // Clear banners to remove after submission
//       setNewAadhaarImage(null);
//       setNewPanImage(null);
//       setNewElectricityBillImage(null);
//       setNewPassportPhoto(null);
//       setSocialLinkInput('');
//       setKeywordInput('');

    
//       setTimeout(() => {
//         if (onUpdateSuccess) onUpdateSuccess(res.data);
//       }, 1500);

//     } catch (err) {
//       console.error("Failed to request company update:", err);
//       const errorMessage = err.response?.data?.message || err.message || "Failed to submit update request.";
//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Conditional rendering for loading state of currentProfileData
//   if (!currentProfileData) {
//     return (
//       <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
//         <Spinner animation="border" role="status">
//           <span className="visually-hidden">Loading profile data...</span>
//         </Spinner>
//         <p className="ms-3">Loading company profile...</p>
//       </div>
//     );
//   }

//   return (
//     <>
      
//       <style>{`
//         .form-control, .form-select { /* Added form-select */
//           transition: all 0.3s ease;
//           border: 1px solid #dee2e6;
//           box-shadow: none;
//         }
//         .form-control:hover, .form-select:hover {
//           border-color: #80bdff;
//         }
//         .form-control:focus, .form-select:focus {
//           border-color: #007bff !important;
//           box-shadow: 0 0 6px rgba(0, 123, 255, 0.5) !important;
//         }
//       `}</style>

//       <div
//         style={{
//           background: "linear-gradient(135deg, #e3f2fd, #f8f9fa)",
//           minHeight: "100vh",
//           paddingTop: "50px",
//           paddingBottom: "50px",
//         }}
//       >
//         <Container>
//           <Card
//             className="shadow-lg border-0 rounded-4 p-0 mx-auto" // Adjusted padding to 0 for header div
//             style={{
//               maxWidth: "850px",
//               background: "linear-gradient(145deg, #ffffff, #e9f0ff)",
//               boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
//             }}
//           >
//             {/* Stylish Heading with Background Color */}
//             <div
//               className="py-4 px-5 text-center rounded-top-4" // Padding and rounded top corners
//               style={{ backgroundColor: '#e9ecef', borderBottom: '1px solid #dee2e6' }} // Light grey background, subtle bottom border
//             >
//               <h3 className="mb-0 text-dark fw-bold" style={{ fontSize: '2rem' }}> {/* Larger font size, dark text, no bottom margin */}
//                 Update Company Profile
//               </h3>
//               <p className="text-muted mt-2 mb-0">Edit your company's information below.</p> {/* Sub-heading */}
//             </div>

//             <Card.Body className="p-5"> {/* Increased padding for body */}
//               {loading && (
//                 <Spinner animation="border" className="d-block mx-auto mb-3 text-primary" />
//               )}
//               {error && (
//                 <Alert variant="danger" className="text-center animate__animated animate__shakeX">
//                   {error}
//                 </Alert>
//               )}
//               {success && (
//                 <Alert variant="success" className="text-center animate__animated animate__fadeIn">
//                   {success}
//                 </Alert>
//               )}

//               <Form onSubmit={handleSubmit}>
//                 {/* --- Company Info Fields --- */}
//                 <h5 className="mb-4 fw-bold text-primary">General Information</h5>
//                 <Row className="mb-3">
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">Company Name</Form.Label>
//                       <Form.Control
//                         type="text"
//                         name="name"
//                         value={editedProfileData.name || ""}
//                         onChange={handleInputChange}
//                         placeholder="Enter company name"
//                         required
//                         className="rounded-pill px-3 py-2"
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">Tagline</Form.Label>
//                       <Form.Control
//                         type="text"
//                         name="tagline"
//                         value={editedProfileData.tagline || ''}
//                         onChange={handleInputChange}
//                         placeholder="Your company's motto or short description"
//                         className="rounded-pill px-3 py-2"
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//                 <Form.Group className="mb-4">
//                   <Form.Label className="fw-semibold">Description</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     rows={4}
//                     name="description"
//                     value={editedProfileData.description || ""}
//                     onChange={handleInputChange}
//                     placeholder="Write a short description about your company..."
//                     className="rounded-3 px-3 py-2"
//                     style={{ resize: 'vertical' }}
//                   />
//                 </Form.Group>

//                 {/* --- Media File Uploads --- */}
//                 <h5 className="mt-4 mb-3 fw-bold text-primary">Media Uploads</h5>
//                 <Row className="mb-3">
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">Company Logo</Form.Label>
//                       <Form.Control
//                         type="file"
//                         accept="image/*"
//                         onChange={(e) => handleSingleFileChange(e, setNewLogo)}
//                         className="rounded-pill px-3 py-2"
//                       />
//                       {newLogo && <p className="small text-muted mt-1">Selected new logo: {newLogo.name}</p>}
//                       {!newLogo && currentProfileData?.logo && <p className="small text-muted mt-1">Current logo: <a href={currentProfileData.logo} target="_blank" rel="noopener noreferrer">View</a></p>}
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">Upload New Company Banners (Max 5)</Form.Label>
//                       <Form.Control
//                         type="file"
//                         multiple
//                         accept="image/*"
//                         onChange={(e) => handleMultiFileChange(e, setNewBannerImages)}
//                         className="rounded-pill px-3 py-2"
//                       />
//                       {newBannerImages.length > 0 && <p className="small text-muted mt-1">Selected {newBannerImages.length} new banners.</p>}
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 {/* Display existing banners with remove option */}
//                 {currentProfileData?.banner && currentProfileData.banner.length > 0 && (
//                   <div className="mb-3">
//                     <h6 className="fw-semibold">Existing Banners:</h6>
//                     <Row xs={2} md={3} lg={4} className="g-2 mt-2">
//                       {currentProfileData.banner.map((img, index) => (
//                         <Col key={index}>
//                           <div className={`position-relative border p-1 rounded ${bannersToRemove.includes(img) ? 'bg-light opacity-50' : ''}`}>
//                             <img src={img} alt={`Banner ${index + 1}`} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '4px' }} onError={(e) => { e.target.onerror = null; e.target.src = placeholderImageUrl }} />
//                             <Button
//                               variant={bannersToRemove.includes(img) ? "outline-secondary" : "danger"}
//                               size="sm"
//                               className="position-absolute top-0 end-0 m-1 p-0 px-1" // Smaller button
//                               onClick={() => handleRemoveExistingBanner(img)}
//                               title={bannersToRemove.includes(img) ? "Undo remove" : "Mark to remove"}
//                             >
//                               {bannersToRemove.includes(img) ? <i className="bi bi-arrow-counterclockwise"></i> : <i className="bi bi-trash-fill"></i>}
//                             </Button>
//                           </div>
//                         </Col>
//                       ))}
//                     </Row>
//                     {bannersToRemove.length > 0 && <p className="small text-danger mt-2">({bannersToRemove.length} banners marked for removal upon update)</p>}
//                   </div>
//                 )}
//                 {/* Display preview of new banners */}
//                 {newBannerImages.length > 0 && (
//                   <div className="mb-4">
//                     <h6 className="fw-semibold">New Banners Preview:</h6>
//                     <Row xs={2} md={3} lg={4} className="g-2 mt-2">
//                       {newBannerImages.map((file, index) => (
//                         <Col key={index}>
//                           <img src={URL.createObjectURL(file)} alt={`New Banner ${index + 1}`} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '4px' }} />
//                         </Col>
//                       ))}
//                     </Row>
//                   </div>
//                 )}


//                 {/* --- Contact Information --- */}
//                 <h5 className="mt-4 mb-3 fw-bold text-primary">Contact Information</h5>
//                 <Row className="mb-3">
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">Email</Form.Label>
//                       <Form.Control
//                         type="email"
//                         name="email"
//                         value={editedProfileData.email || ""}
//                         onChange={handleInputChange}
//                         placeholder="Enter email"
//                         required
//                         className="rounded-pill px-3 py-2"
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">Phone</Form.Label>
//                       <Form.Control
//                         type="tel"
//                         name="phone"
//                         value={editedProfileData.phone || ""}
//                         onChange={handleInputChange}
//                         placeholder="Enter phone number"
//                         className="rounded-pill px-3 py-2"
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//                 <Row className="mb-3">
//                     <Col md={6}>
//                         <Form.Group className="mb-3">
//                             <Form.Label className="fw-semibold">Address Line</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="address"
//                                 value={editedProfileData.address || ''}
//                                 onChange={handleInputChange}
//                                 placeholder="Street address, building name"
//                                 className="rounded-pill px-3 py-2"
//                             />
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label className="fw-semibold">Country <span className="text-danger">*</span></Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="country" // Ensure name attribute is present for FormData
//                                 value={"India"} // Display "India"
//                                 readOnly
//                                 disabled
//                                 className="rounded-pill px-3 py-2 bg-light"
//                             />
//                              {/* A hidden input can be used to explicitly send the ID if the backend needs it separately */}
//                              {/* <input type="hidden" name="country" value={INDIA_DEFAULT_COUNTRY_ID} /> */}
//                         </Form.Group>
//                     </Col>
//                     <Col md={6}>
//                         <Form.Group className="mb-3">
//                             <Form.Label className="fw-semibold">State <span className="text-danger">*</span></Form.Label>
//                             <Form.Select
//                                 name="state"
//                                 value={selectedStateDropdownId}
//                                 onChange={handleStateChange}
//                                 disabled={loading || states.length === 0} // Disabled if loading or no states
//                                 className="rounded-pill px-3 py-2"
//                                 required
//                             >
//                                 <option value="">Select State</option>
//                                 {states.map(state => (
//                                     <option key={state._id} value={state._id}>{state.name}</option>
//                                 ))}
//                             </Form.Select>
//                             {states.length === 0 && !loading && <Form.Text className="text-muted">No states found for India.</Form.Text>}
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label className="fw-semibold">City <span className="text-danger">*</span></Form.Label>
//                             <Form.Select
//                                 name="city"
//                                 value={editedProfileData.city || ''}
//                                 onChange={handleCityChange}
//                                 disabled={loading || !selectedStateDropdownId || cities.length === 0} // Disabled if loading, no state selected, or no cities
//                                 className="rounded-pill px-3 py-2"
//                                 required
//                             >
//                                 <option value="">Select City</option>
//                                 {cities.map(city => (
//                                     <option key={city._id} value={city._id}>{city.name}</option>
//                                 ))}
//                             </Form.Select>
//                             {!selectedStateDropdownId && <Form.Text className="text-muted">Select a state first.</Form.Text>}
//                             {selectedStateDropdownId && cities.length === 0 && !loading && <Form.Text className="text-muted">No cities found for the selected state.</Form.Text>}
//                         </Form.Group>
//                     </Col>
//                 </Row>
//                 <Form.Group className="mb-4">
//                   <Form.Label className="fw-semibold">Website</Form.Label>
//                   <Form.Control
//                     type="url"
//                     name="website"
//                     value={editedProfileData.website || ""}
//                     onChange={handleInputChange}
//                     placeholder="Enter website URL (e.g., https://www.example.com)"
//                     className="rounded-pill px-3 py-2"
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-4">
//                     <Form.Label className="fw-semibold">Google Maps Link</Form.Label>
//                     <Form.Control
//                         type="url"
//                         name="googleMapsLink"
//                         value={editedProfileData.googleMapsLink || ''}
//                         onChange={handleInputChange}
//                         placeholder="Enter Google Maps link for your location"
//                         className="rounded-pill px-3 py-2"
//                     />
//                 </Form.Group>

//                 {/* --- Business Details --- */}
//                 <h5 className="mt-4 mb-3 fw-bold text-primary">Business Details</h5>
//                 <Row className="mb-3">
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">Company Type</Form.Label>
//                       <Form.Control
//                         type="text"
//                         name="companyType"
//                         value={editedProfileData.companyType || ""}
//                         onChange={handleInputChange}
//                         placeholder="e.g., Manufacturer, Trader"
//                         className="rounded-pill px-3 py-2"
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">Category <span className="text-danger">*</span></Form.Label>
//                       <Form.Select
//                         value={editedProfileData.category?._id || ''}
//                         onChange={handleCategoryChange}
//                         className="rounded-pill px-3 py-2"
//                         required
//                         disabled={loading}
//                       >
//                         <option value="">Select Category</option>
//                         {categories.map(cat => (
//                           <option key={cat._id} value={cat._id}>{cat.name}</option>
//                         ))}
//                       </Form.Select>
//                     </Form.Group>
//                   </Col>
//                 </Row>
//                 <Row className="mb-3">
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">SubCategory (Optional)</Form.Label>
//                       <Form.Select
//                         value={editedProfileData.subCategory?._id || ''}
//                         onChange={handleSubCategoryChange}
//                         disabled={!editedProfileData.category?._id || filteredSubCategoriesForEdit.length === 0 || loading}
//                         className="rounded-pill px-3 py-2"
//                       >
//                         <option value="">Select SubCategory</option>
//                         {filteredSubCategoriesForEdit.map(subCat => (
//                           <option key={subCat._id} value={subCat._id}>{subCat.name}</option>
//                         ))}
//                       </Form.Select>
//                       {editedProfileData.category?._id && filteredSubCategoriesForEdit.length === 0 && (
//                         <Form.Text className="text-muted">
//                           No subcategories found for the selected category.
//                         </Form.Text>
//                       )}
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">GST Number</Form.Label>
//                       <Form.Control
//                         type="text"
//                         name="gstNumber"
//                         value={editedProfileData.gstNumber || ""}
//                         onChange={handleInputChange}
//                         placeholder="Enter GST number"
//                         className="rounded-pill px-3 py-2"
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//                 <Form.Group className="mb-4">
//                   <Form.Label className="fw-semibold">Aadhaar Number</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="aadhaarNumber"
//                     value={editedProfileData.aadhaarNumber || ""}
//                     onChange={handleInputChange}
//                     placeholder="Enter Aadhaar number"
//                     className="rounded-pill px-3 py-2"
//                   />
//                 </Form.Group>

//                 <h6 className="mt-4 mb-3 fw-bold">Social Links:</h6>
//                 <InputGroup className="mb-2">
//                   <Form.Control
//                     type="url"
//                     placeholder="Enter social link URL (e.g., https://facebook.com/mycompany)"
//                     value={socialLinkInput}
//                     onChange={(e) => setSocialLinkInput(e.target.value)}
//                     className="rounded-start-pill px-3 py-2"
//                   />
//                   <Button variant="outline-primary" onClick={handleAddSocialLink} className="rounded-end-pill px-3 py-2">Add</Button>
//                 </InputGroup>
//                 {editedProfileData.socialLinks && editedProfileData.socialLinks.length > 0 ? (
//                   <ListGroup className="mb-3">
//                     {editedProfileData.socialLinks.map((link, index) => (
//                       <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center rounded-3 mb-1 px-3 py-2" style={{ backgroundColor: '#f8f9fa' }}>
//                         <a href={link} target="_blank" rel="noopener noreferrer" className="text-primary text-decoration-none small">{link}</a>
//                         <Button variant="danger" size="sm" onClick={() => handleRemoveSocialLink(link)} className="rounded-pill">Remove</Button>
//                       </ListGroup.Item>
//                     ))}
//                   </ListGroup>
//                 ) : (
//                   <p className="text-muted small">No social links added yet.</p>
//                 )}

//                 <h6 className="mt-4 mb-3 fw-bold">Keywords:</h6>
//                 <Form.Control
//                   as="textarea"
//                   name="keywords"
//                   value={keywordInput} // Use keywordInput for display
//                   onChange={handleInputChange} // This will update both keywordInput and editedProfileData.keywords
//                   rows={2}
//                   placeholder="Enter keywords, separated by commas (e.g., product, service, local)"
//                   className="rounded-3 px-3 py-2 mb-4"
//                   style={{ resize: 'vertical' }}
//                 />

//                 <h6 className="mt-4 mb-3 fw-bold">Business Timings:</h6>
//                 <ListGroup className="mb-4">
//                   {daysOfWeek.map(day => (
//                     <ListGroup.Item key={day} className="d-flex justify-content-between align-items-center text-capitalize rounded-3 mb-1 px-3 py-2" style={{ backgroundColor: '#f8f9fa' }}>
//                       <strong>{day}:</strong>
//                       <div className="d-flex align-items-center">
//                         <Form.Control
//                           type="time"
//                           name={`${day}.open`}
//                           value={editedProfileData.businessTimings?.[day]?.open || '00:00'}
//                           onChange={(e) => setEditedProfileData(prev => ({
//                             ...prev,
//                             businessTimings: {
//                               ...prev.businessTimings,
//                               [day]: { ...prev.businessTimings?.[day], open: e.target.value }
//                             }
//                           }))}
//                           className="me-2 rounded-pill px-3 py-2"
//                           style={{ width: '120px' }}
//                         />
//                         <span>-</span>
//                         <Form.Control
//                           type="time"
//                           name={`${day}.close`}
//                           value={editedProfileData.businessTimings?.[day]?.close || '00:00'}
//                           onChange={(e) => setEditedProfileData(prev => ({
//                             ...prev,
//                             businessTimings: {
//                               ...prev.businessTimings,
//                               [day]: { ...prev.businessTimings?.[day], close: e.target.value }
//                             }
//                           }))}
//                           className="ms-2 rounded-pill px-3 py-2"
//                           style={{ width: '120px' }}
//                         />
//                       </div>
//                     </ListGroup.Item>
//                   ))}
//                 </ListGroup>

//                 {/* --- Documents for Verification --- */}
//                 <h5 className="mt-4 mb-3 fw-bold text-primary">Documents for Verification</h5>
//                 <Row className="g-3 mb-4">
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">Aadhaar Image</Form.Label>
//                       <Form.Control type="file" accept="image/*,application/pdf" onChange={(e) => handleSingleFileChange(e, setNewAadhaarImage)} className="rounded-pill px-3 py-2" />
//                       {newAadhaarImage && <p className="small text-muted mt-1">Selected: {newAadhaarImage.name}</p>}
//                       {!newAadhaarImage && currentProfileData?.aadhaarImage && <p className="small text-muted mt-1">Current: <a href={currentProfileData.aadhaarImage} target="_blank" rel="noopener noreferrer">View</a></p>}
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">PAN Image</Form.Label>
//                       <Form.Control type="file" accept="image/*,application/pdf" onChange={(e) => handleSingleFileChange(e, setNewPanImage)} className="rounded-pill px-3 py-2" />
//                       {newPanImage && <p className="small text-muted mt-1">Selected: {newPanImage.name}</p>}
//                       {!newPanImage && currentProfileData?.panImage && <p className="small text-muted mt-1">Current: <a href={currentProfileData.panImage} target="_blank" rel="noopener noreferrer">View</a></p>}
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">Electricity Bill Image</Form.Label>
//                       <Form.Control type="file" accept="image/*,application/pdf" onChange={(e) => handleSingleFileChange(e, setNewElectricityBillImage)} className="rounded-pill px-3 py-2" />
//                       {newElectricityBillImage && <p className="small text-muted mt-1">Selected: {newElectricityBillImage.name}</p>}
//                       {!newElectricityBillImage && currentProfileData?.electricityBillImage && <p className="small text-muted mt-1">Current: <a href={currentProfileData.electricityBillImage} target="_blank" rel="noopener noreferrer">View</a></p>}
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">Passport Photo</Form.Label>
//                       <Form.Control type="file" accept="image/*" onChange={(e) => handleSingleFileChange(e, setNewPassportPhoto)} className="rounded-pill px-3 py-2" />
//                       {newPassportPhoto && <p className="small text-muted mt-1">Selected: {newPassportPhoto.name}</p>}
//                       {!newPassportPhoto && currentProfileData?.passportPhoto && <p className="small text-muted mt-1">Current: <a href={currentProfileData.passportPhoto} target="_blank" rel="noopener noreferrer">View</a></p>}
//                     </Form.Group>
//                   </Col>
//                 </Row>


//                 {/* 🔹 Buttons */}
//                 <div className="d-flex justify-content-end gap-3 mt-5"> {/* Increased gap and margin top */}
//                   <Button
//                     variant="outline-secondary"
//                     onClick={onCancel}
//                     className="px-4 py-2 fw-bold rounded-pill"
//                     disabled={loading}
//                   >
//                     Cancel
//                   </Button>
//                   <Button
//                     variant="primary"
//                     type="submit"
//                     className="px-4 py-2 fw-bold rounded-pill"
//                     style={{
//                       background:
//                         "linear-gradient(to right, #007bff, #6610f2)",
//                       border: "none",
//                       boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
//                       transition: "all 0.3s ease",
//                     }}
//                     onMouseOver={(e) =>
//                       (e.target.style.transform = "scale(1.03)")
//                     }
//                     onMouseOut={(e) =>
//                       (e.target.style.transform = "scale(1)")
//                     }
//                     disabled={loading}
//                   >
//                     {loading ? (
//                       <Spinner as="span" animation="border" size="sm" className="me-2" />
//                     ) : (
//                       "Submit Update Request" // Changed button text for clarity
//                     )}
//                   </Button>
//                 </div>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Container>
//       </div>
//     </>
//   );
// };

// export default UpdateProfileForm;





// import React, { useState, useEffect } from "react";
// import {
//   Container, Form, Button, Alert, Spinner, Row, Col, Card, ListGroup, InputGroup
// } from "react-bootstrap";
// import {
//   requestCompanyUpdate,
//   getAllCompanyCategories,
//   getAllCompanySubCategories,
//   getCountries,
//   getStatesByCountry,
//   getCitiesByState
// } from "../Services/authApi"; // सुनिश्चित करें कि यह सही पाथ है
// import axios from 'axios'; // For URL.createObjectURL previews
// import { RectangleGoggles } from "lucide-react";

// // Placeholder image for broken links or missing images
// const placeholderImageUrl = 'https://via.placeholder.com/100x75/f0f0f0/cccccc?text=No+Image';

// // IMPORTANT: Assuming "India" has this fixed ID in your backend database.
// // Please verify this ID with your actual backend data.
// const INDIA_DEFAULT_COUNTRY_ID = "687a1e2185f0230715032380";

// const UpdateProfileForm = ({ currentProfileData, onUpdateSuccess, onCancel }) => {
//   // --- Core State for Company Profile Editing ---
//   // We'll use editedProfileData as the single source of truth for form data
//   const [editedProfileData, setEditedProfileData] = useState({
//     name: '', tagline: '', description: '', email: '', phone: '',
//     address: '', city: '', state: '', country: INDIA_DEFAULT_COUNTRY_ID, // Default to India ID
//     website: '', googleMapsLink: '', companyType: '', gstNumber: '', aadhaarNumber: '',
//     socialLinks: [], keywords: [], businessTimings: {},
//     category: null, subCategory: null,
//   });

//   const [loading, setLoading] = useState(false); // For form submission
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   // --- FILE UPLOAD STATES (for new files) ---
//   const [newLogo, setNewLogo] = useState(null);
//   const [newBannerImages, setNewBannerImages] = useState([]); // For newly selected banner files
//   const [bannersToRemove, setBannersToRemove] = useState([]); // URLs of existing banners to be removed
//   const [newAadhaarImage, setNewAadhaarImage] = useState(null);
//   const [newPanImage, setNewPanImage] = useState(null);
//   const [newElectricityBillImage, setNewElectricityBillImage] = useState(null);
//   const [newPassportPhoto, setNewPassportPhoto] = useState(null);
//   // --- END FILE UPLOAD STATES ---

//   // --- OTHER EDITABLE FIELD STATES ---
//   const [socialLinkInput, setSocialLinkInput] = useState(''); // Temp input for adding new social links
//   const [keywordInput, setKeywordInput] = useState(''); // Temp input for keywords as comma-separated string
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [filteredSubCategoriesForEdit, setFilteredSubCategoriesForEdit] = useState([]); // For subcategories dropdown in edit mode
//   // --- END OTHER EDITABLE FIELD STATES ---

//   // --- LOCATION SPECIFIC STATES ---
//   const [countries, setCountries] = useState([]); // Still fetch all countries to find 'India' by ID
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   // selectedCountryDropdownId will always be INDIA_DEFAULT_COUNTRY_ID
//   const [selectedCountryDropdownId, setSelectedCountryDropdownId] = useState(INDIA_DEFAULT_COUNTRY_ID);
//   const [selectedStateDropdownId, setSelectedStateDropdownId] = useState('');
//   // --- END LOCATION SPECIFIC STATES ---

//   const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];


//   // --- Data Initialization on Mount / currentProfileData change ---
//   useEffect(() => {
//     const initForm = async () => {
//       if (!currentProfileData) {
//         console.warn("UpdateProfileForm: currentProfileData is not yet available.");
//         return;
//       }

//       setEditedProfileData({
//         ...currentProfileData,
//         address: currentProfileData.address?.address || '',
//         // These will be populated with actual IDs from currentProfileData.address
//         country: currentProfileData.address?.country || INDIA_DEFAULT_COUNTRY_ID, // Default to India ID if not present
//         state: currentProfileData.address?.state || '',
//         city: currentProfileData.address?.city || '',
//         businessTimings: currentProfileData.businessTimings ? { ...currentProfileData.businessTimings } : {},
//         socialLinks: Array.isArray(currentProfileData.socialLinks) ? [...currentProfileData.socialLinks] : [],
//         keywords: Array.isArray(currentProfileData.keywords) ? [...currentProfileData.keywords] : [],
//       });

//       if (currentProfileData.keywords && Array.isArray(currentProfileData.keywords)) {
//         setKeywordInput(currentProfileData.keywords.join(', '));
//       } else {
//         setKeywordInput('');
//       }
//       setSocialLinkInput('');

//       // Fetch categories and subcategories
//       try {
//         const categoriesRes = await getAllCompanyCategories();
//         setCategories(categoriesRes.data);
//         const subCategoriesRes = await getAllCompanySubCategories();
//         setSubCategories(subCategoriesRes.data);
//       } catch (err) {
//         console.error("Failed to fetch categories/subcategories:", err);
//         setError("Failed to fetch categories/subcategories.");
//       }

//       // --- Location Data Initialization for India, States, and Cities ---
//       try {
//           // Even if we default to India, we might need its full object or to ensure its ID is correct
//           const countriesRes = await getCountries();
//           setCountries(countriesRes.data); // Store all countries

//           // Ensure India is set as the selected country for dropdown logic
//           setSelectedCountryDropdownId(INDIA_DEFAULT_COUNTRY_ID);
//           setEditedProfileData(prevData => ({ ...prevData, country: INDIA_DEFAULT_COUNTRY_ID }));

//           // Fetch states for INDIA_DEFAULT_COUNTRY_ID immediately
//           const statesRes = await getStatesByCountry(INDIA_DEFAULT_COUNTRY_ID);
//           setStates(statesRes.data);

//           const initialStateFromProfile = currentProfileData.address?.state;
//           if (initialStateFromProfile) {
//               let stateObj = statesRes.data.find(s => s._id === initialStateFromProfile);
//               if (!stateObj) {
//                   // Attempt to find by name if ID isn't a direct match (less robust, but for flexibility)
//                   stateObj = statesRes.data.find(s => s.name === initialStateFromProfile && s.country === INDIA_DEFAULT_COUNTRY_ID);
//               }

//               if (stateObj) {
//                   const stateId = stateObj._id;
//                   setSelectedStateDropdownId(stateId);
//                   setEditedProfileData(prevData => ({ ...prevData, state: stateId }));

//                   const citiesRes = await getCitiesByState(stateId);
//                   setCities(citiesRes.data);

//                   const initialCityFromProfile = currentProfileData.address?.city;
//                   if (initialCityFromProfile) {
//                       let cityObj = citiesRes.data.find(c => c._id === initialCityFromProfile);
//                       if (!cityObj) {
//                           // Attempt to find by name if ID isn't a direct match
//                           cityObj = citiesRes.data.find(c => c.name === initialCityFromProfile && c.state === stateId);
//                       }
//                       if (cityObj) {
//                           setEditedProfileData(prevData => ({ ...prevData, city: cityObj._id }));
//                       }
//                   }
//               }
//           }
//       } catch (err) {
//           console.error("Failed to fetch initial location data (countries, states, cities):", err);
//           setError("Failed to load location data.");
//       }
//     };
//     initForm();
//   }, [currentProfileData]); // Dependency: Only run when currentProfileData changes


//   // --- Effects for Filtering Subcategories (based on selected category) ---
//   useEffect(() => {
//     if (editedProfileData.category?._id && subCategories.length > 0) {
//       setFilteredSubCategoriesForEdit(subCategories.filter(sub => sub.parentCategory === editedProfileData.category._id));
//     } else {
//       setFilteredSubCategoriesForEdit([]);
//     }
//   }, [editedProfileData.category, subCategories]);

//   // --- Effects for fetching States when selectedCountryDropdownId changes ---
//   // This useEffect will still fire, but selectedCountryDropdownId will always be INDIA_DEFAULT_COUNTRY_ID
//   useEffect(() => {
//     const fetchStatesData = async () => {
//       if (selectedCountryDropdownId) { // This will always be INDIA_DEFAULT_COUNTRY_ID
//         setLoading(true);
//         setError('');
//         try {
//           const statesRes = await getStatesByCountry(selectedCountryDropdownId);
//           setStates(statesRes.data);
//           setCities([]); // Clear cities when country (or default India) changes

//           // If the previously selected state is not in the new list of states, reset it
//           if (!statesRes.data.some(s => s._id === editedProfileData.state)) {
//             setEditedProfileData(prevData => ({ ...prevData, state: '', city: '' }));
//             setSelectedStateDropdownId('');
//           } else {
//              // If the state is still valid, ensure dropdown reflects it
//              setSelectedStateDropdownId(editedProfileData.state);
//           }

//         } catch (err) {
//           console.error("Failed to fetch states:", err);
//           setStates([]);
//           setCities([]);
//           setEditedProfileData(prevData => ({ ...prevData, state: '', city: '' }));
//           setSelectedStateDropdownId('');
//           setError(err.response?.data?.message || err.message || "Failed to load states.");
//         } finally {
//           setLoading(false);
//         }
//       } else {
//         setStates([]);
//         setCities([]); // Clear cities too if no country is selected
//         setEditedProfileData(prevData => ({ ...prevData, state: '', city: '' }));
//         setSelectedCountryDropdownId(INDIA_DEFAULT_COUNTRY_ID); // Ensure it's always India's ID
//         setSelectedStateDropdownId('');
//       }
//     };
//     fetchStatesData();
//   }, [selectedCountryDropdownId, editedProfileData.state]); // Added editedProfileData.state as dependency for robust pre-fill

//   // --- Effects for fetching Cities when selectedStateDropdownId changes ---
//   useEffect(() => {
//     const fetchCitiesData = async () => {
//       if (selectedStateDropdownId) {
//         setLoading(true);
//         setError('');
//         try {
//           const citiesRes = await getCitiesByState(selectedStateDropdownId);
//           setCities(citiesRes.data);

//           // If the previously selected city is not in the new list of cities, reset it
//           if (!citiesRes.data.some(c => c._id === editedProfileData.city)) {
//             setEditedProfileData(prevData => ({ ...prevData, city: '' }));
//           }
//         } catch (err) {
//           console.error("Failed to fetch cities:", err);
//           setCities([]);
//           setEditedProfileData(prevData => ({ ...prevData, city: '' }));
//           setError(err.response?.data?.message || err.message || "Failed to load cities.");
//         } finally {
//           setLoading(false);
//         }
//       } else {
//         setCities([]);
//         setEditedProfileData(prevData => ({ ...prevData, city: '' }));
//       }
//     };
//     fetchCitiesData();
//   }, [selectedStateDropdownId, editedProfileData.city]); // Added editedProfileData.city as dependency for robust pre-fill


//   // --- Input Change Handlers for generic text fields ---
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'keywords') {
//       setKeywordInput(value); // Update keywordInput for the textarea display
//       setEditedProfileData(prevData => ({
//         ...prevData,
//         keywords: value.split(',').map(kw => kw.trim()).filter(Boolean) // Filter(Boolean) removes empty strings
//       }));
//     } else {
//       setEditedProfileData(prevData => ({
//         ...prevData,
//         [name]: value
//       }));
//     }
//   };

//   // Handler for Category selection in edit mode
//   const handleCategoryChange = (e) => {
//     const categoryId = e.target.value;
//     const selectedCategory = categories.find(cat => cat._id === categoryId);
//     setEditedProfileData(prevData => ({
//       ...prevData,
//       category: selectedCategory, // Store the full category object (or just ID if backend expects it)
//       subCategory: null // Reset subCategory when category changes
//     }));
//   };

//   // Handler for SubCategory selection in edit mode
//   const handleSubCategoryChange = (e) => {
//     const subCategoryId = e.target.value;
//     const selectedSubCategory = subCategories.find(sub => sub._id === subCategoryId);
//     setEditedProfileData(prevData => ({
//       ...prevData,
//       subCategory: selectedSubCategory // Store the full subCategory object (or just ID)
//     }));
//   };

//   // Handlers for Location Selects
//   // handleCountryChange is now effectively removed for user interaction
//   // Only handleStateChange and handleCityChange are relevant for user selection
//   const handleStateChange = (e) => {
//     const stateId = e.target.value;
//     setSelectedStateDropdownId(stateId); // Update the state for the dropdown
//     setEditedProfileData(prevData => ({
//       ...prevData,
//       state: stateId, // Store the selected state ID for submission
//       city: ''        // Reset city when state changes
//     }));
//   };

//   const handleCityChange = (e) => {
//     const cityId = e.target.value; // Assuming option value is city._id
//     setEditedProfileData(prevData => ({
//       ...prevData,
//       city: cityId // Store the selected city ID for submission
//     }));
//   };

//   // Handlers for Social Links
//   const handleAddSocialLink = () => {
//     if (socialLinkInput.trim()) {
//       setEditedProfileData(prevData => {
//         const currentSocialLinks = Array.isArray(prevData.socialLinks) ? prevData.socialLinks : [];
//         if (!currentSocialLinks.includes(socialLinkInput.trim())) {
//           return {
//             ...prevData,
//             socialLinks: [...currentSocialLinks, socialLinkInput.trim()]
//           };
//         }
//         return prevData;
//       });
//       setSocialLinkInput('');
//     }
//   };

//   const handleRemoveSocialLink = (linkToRemove) => {
//     setEditedProfileData(prevData => ({
//       ...prevData,
//       socialLinks: prevData.socialLinks.filter(link => link !== linkToRemove)
//     }));
//   };

//   // --- FILE HANDLERS for single/multi-file inputs ---
//   const handleSingleFileChange = (e, setStateFunction) => {
//     setStateFunction(e.target.files[0] || null);
//   };

//   const handleMultiFileChange = (e, setStateFunction) => {
//     setStateFunction(Array.from(e.target.files || []));
//   };

//   // Handler for marking/unmarking existing banner images for removal
//   const handleRemoveExistingBanner = (imageUrl) => {
//     setBannersToRemove(prev =>
//       prev.includes(imageUrl)
//         ? prev.filter(url => url !== imageUrl) // If already marked for removal, unmark it
//         : [...prev, imageUrl] // Mark for removal
//     );
//   };
//   // --- END FILE HANDLERS ---

//   // --- Submit Handler ---
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setSuccess('');

//     try {
//       const formData = new FormData();
//       let changesDetected = false;

//       // Append text/value changes only if they are different from the original or newly provided
//       for (const key in editedProfileData) {
//         // Skip internal/immutable fields or fields handled separately (like file inputs or banner arrays)
//         if (['products', 'registeredBy', 'approvedBy', 'isApproved', 'companyStatus', 'pendingProfileUpdates', '__v', '_id', 'createdAt', 'updatedAt', 'logo', 'banner', 'aadhaarImage', 'panImage', 'electricityBillImage', 'passportPhoto'].includes(key)) {
//             continue;
//         }

//         let originalValue;
//         let editedValue = editedProfileData[key];

//         // Special handling for address-related fields (address, city, state, country)
//         if (key === 'address') { // Simple address string
//             originalValue = currentProfileData?.address?.address;
//         } else if (key === 'country' || key === 'state' || key === 'city') { // These are now IDs
//             // For country, it's always INDIA_DEFAULT_COUNTRY_ID, so if the original was different, it's a change
//             // For state/city, compare IDs
//             originalValue = currentProfileData?.address?.[key]; // Get the ID from original profile
//         } else { // For other top-level fields
//             originalValue = currentProfileData[key];
//         }


//         if (key === 'businessTimings') {
//           // Deep comparison for businessTimings
//           if (JSON.stringify(originalValue) !== JSON.stringify(editedValue)) {
//             formData.append(key, JSON.stringify(editedValue)); // Send as stringified JSON
//             changesDetected = true;
//           }
//         } else if (key === 'socialLinks' || key === 'keywords') {
//           // Handle array-like data (convert to stringified JSON for FormData)
//           const originalArray = Array.isArray(originalValue) ? originalValue : (originalValue ? JSON.parse(originalValue) : []);
//           const editedArray = Array.isArray(editedValue) ? editedValue : (editedValue ? JSON.parse(editedValue) : []);
//           // Sort for consistent comparison
//           if (JSON.stringify(originalArray.sort()) !== JSON.stringify(editedArray.sort())) {
//             formData.append(key, JSON.stringify(editedArray));
//             changesDetected = true;
//           }
//         } else if (key === 'category') {
//           // Only append category ID if it has changed
//           if (editedProfileData.category?._id !== currentProfileData?.category?._id) {
//             formData.append('category', editedProfileData.category._id);
//             changesDetected = true;
//           }
//         } else if (key === 'subCategory') {
//           // Only append subCategory ID if it has changed
//           if (editedProfileData.subCategory?._id !== currentProfileData?.subCategory?._id) {
//             formData.append('subCategory', editedProfileData.subCategory._id);
//             changesDetected = true;
//           }
//         } else if (originalValue !== editedValue) {
//           // For simple text fields, or location IDs (country, state, city)
//           // Only append if there's a change and the new value is not empty,
//           // or if the original was not empty and it's now being cleared (explicitly send empty string)
//           if (editedValue !== '' || (originalValue !== '' && originalValue !== undefined && originalValue !== null)) {
//               formData.append(key, editedValue);
//               changesDetected = true;
//           }
//         }
//       }

//       // --- APPEND NEW FILES TO FORMDATA ---
//       if (newLogo) {
//         formData.append('logo', newLogo);
//         changesDetected = true;
//       }
//       if (newBannerImages.length > 0) {
//         newBannerImages.forEach(file => formData.append('banner', file)); // Matches backend multer field name for new files
//         changesDetected = true;
//       }
//       // --- IMPORTANT: Append banners to be removed ---
//       if (bannersToRemove.length > 0) {
//         formData.append('bannersToDelete', JSON.stringify(bannersToRemove)); // Send array of URLs to delete
//         changesDetected = true;
//       }

//       if (newAadhaarImage) {
//         formData.append('aadhaar', newAadhaarImage); // Matches backend multer field name
//         changesDetected = true;
//       }
//       if (newPanImage) {
//         formData.append('pan', newPanImage); // Matches backend multer field name
//         changesDetected = true;
//       }
//       if (newElectricityBillImage) {
//         formData.append('electricityBill', newElectricityBillImage); // Matches backend multer field name
//         changesDetected = true;
//       }
//       if (newPassportPhoto) {
//         formData.append('passportPhoto', newPassportPhoto); // Matches backend multer field name
//         changesDetected = true;
//       }
//       // --- END APPEND NEW FILES ---


//       if (!changesDetected && newLogo === null && newBannerImages.length === 0 && bannersToRemove.length === 0 &&
//           newAadhaarImage === null && newPanImage === null && newElectricityBillImage === null && newPassportPhoto === null) {
//         setError("No changes detected to submit for update.");
//         setLoading(false);
//         return;
//       }

//       // Call the API with FormData
//       const res = await requestCompanyUpdate(formData);
//       setSuccess(res.message || "Company update request submitted successfully!");

//       // Clear all file input and removal states after successful submission
//       setNewLogo(null);
//       setNewBannerImages([]);
//       setBannersToRemove([]); // Clear banners to remove after submission
//       setNewAadhaarImage(null);
//       setNewPanImage(null);
//       setNewElectricityBillImage(null);
//       setNewPassportPhoto(null);
//       setSocialLinkInput('');
//       setKeywordInput('');

    
//       setTimeout(() => {
//         if (onUpdateSuccess) onUpdateSuccess(res.data);
//       }, 1500);

//     } catch (err) {
//       console.error("Failed to request company update:", err);
//       const errorMessage = err.response?.data?.message || err.message || "Failed to submit update request.";
//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Conditional rendering for loading state of currentProfileData
//   if (!currentProfileData) {
//     return (
//       <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
//         <Spinner animation="border" role="status">
//           <span className="visually-hidden">Loading profile data...</span>
//         </Spinner>
//         <p className="ms-3">Loading company profile...</p>
//       </div>
//     );
//   }

//   return (
//     <>
      
//       <style>{`
//         .form-control, .form-select {
//           transition: all 0.3s ease;
//           border: 1px solid #dee2e6;
//           box-shadow: none;
//           outline: none; /* Remove default browser outline */
//           border-radius: 0.5rem; /* Ensure consistent border-radius */
//         }
//         .form-control.rounded-pill, .form-select.rounded-pill {
//             border-radius: 50rem !important; /* Override for rounded-pill */
//         }

//         .form-control:hover, .form-select:hover {
//           border-color: #80bdff; /* Lighter blue border on hover */
//           box-shadow: 0 0 0 0.15rem rgba(0, 123, 255, 0.1); /* Subtle blue glow on hover */
//         }
//         .form-control:focus, .form-select:focus {
//           border-color: #007bff !important; /* Primary blue border on focus */
//           /* More prominent blue box-shadow for attractive glow */
//           box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.4), 0 0 15px rgba(0, 123, 255, 0.5) !important;
//         }

//         /* Styles for InputGroup controls to ensure consistency */
//         .input-group .form-control,
//         .input-group .form-select {
//             border-radius: 0.5rem; /* Default for general input group controls */
//         }
//         /* Specific rounded-pill within input groups */
//         .input-group .rounded-start-pill {
//             border-top-left-radius: 50rem !important;
//             border-bottom-left-radius: 50rem !important;
//             border-top-right-radius: 0 !important;
//             border-bottom-right-radius: 0 !important;
//         }
//         .input-group .rounded-end-pill {
//             border-top-right-radius: 50rem !important;
//             border-bottom-right-radius: 50rem !important;
//             border-top-left-radius: 0 !important;
//             border-bottom-left-radius: 0 !important;
//         }
//         .input-group .rounded-end-pill:focus,
//         .input-group .rounded-start-pill:focus {
//             z-index: 2; /* Bring focused input to front to prevent border overlap issues */
//         }

//         /* Hover/Focus for InputGroup buttons and text */
//         .input-group:focus-within .input-group-text,
//         .input-group:focus-within .btn-outline-primary {
//             border-color: #007bff !important;
//             box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.4), 0 0 15px rgba(0, 123, 255, 0.5) !important;
//             z-index: 3; /* To bring it above other elements if needed */
//         }
//         .input-group:focus-within .form-control {
//             border-color: #007bff !important;
//             box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.4), 0 0 15px rgba(0, 123, 255, 0.5) !important;
//         }

//       `}</style>

//       <div
//         style={{
//           background: "linear-gradient(135deg, #e3f2fd, #f8f9fa)",
//           minHeight: "100vh",
//           paddingTop: "50px",
//           paddingBottom: "50px",
//         }}
//       >
//         <Container>
//           <Card
//             className="shadow-lg border-0 rounded-4 p-0 mx-auto" // Adjusted padding to 0 for header div
//             style={{
//               maxWidth: "850px",
//               background: "linear-gradient(145deg, #ffffff, #e9f0ff)",
//               boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
//             }}
//           >
//             {/* Stylish Heading with Background Color */}
//             <div
//               className="py-4 px-5 text-center rounded-top-4" // Padding and rounded top corners
//               style={{ backgroundColor: '#e9ecef', borderBottom: '1px solid #dee2e6' }} // Light grey background, subtle bottom border
//             >
//               <h3 className="mb-0 text-dark fw-bold" style={{ fontSize: '2rem' }}> {/* Larger font size, dark text, no bottom margin */}
//                 Update Company Profile
//               </h3>
//               <p className="text-muted mt-2 mb-0">Edit your company's information below.</p> {/* Sub-heading */}
//             </div>

//             <Card.Body className="p-5"> {/* Increased padding for body */}
//               {loading && (
//                 <Spinner animation="border" className="d-block mx-auto mb-3 text-primary" />
//               )}
//               {error && (
//                 <Alert variant="danger" className="text-center animate__animated animate__shakeX">
//                   {error}
//                 </Alert>
//               )}
//               {success && (
//                 <Alert variant="success" className="text-center animate__animated animate__fadeIn">
//                   {success}
//                 </Alert>
//               )}

//               <Form onSubmit={handleSubmit}>
//                 {/* --- Company Info Fields --- */}
//                 <h5 className="mb-4 fw-bold text-primary">General Information</h5>
//                 <Row className="mb-3">
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">Company Name</Form.Label>
//                       <Form.Control
//                         type="text"
//                         name="name"
//                         value={editedProfileData.name || ""}
//                         onChange={handleInputChange}
//                         placeholder="Enter company name"
//                         required
//                         className="rounded-pill px-3 py-2"
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">Tagline</Form.Label>
//                       <Form.Control
//                         type="text"
//                         name="tagline"
//                         value={editedProfileData.tagline || ''}
//                         onChange={handleInputChange}
//                         placeholder="Your company's motto or short description"
//                         className="rounded-pill px-3 py-2"
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//                 <Form.Group className="mb-4">
//                   <Form.Label className="fw-semibold">Description</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     rows={4}
//                     name="description"
//                     value={editedProfileData.description || ""}
//                     onChange={handleInputChange}
//                     placeholder="Write a short description about your company..."
//                     className="rounded-3 px-3 py-2"
//                     style={{ resize: 'vertical' }}
//                   />
//                 </Form.Group>

//                 {/* --- Media File Uploads --- */}
//                 <h5 className="mt-4 mb-3 fw-bold text-primary">Media Uploads</h5>
//                 <Row className="mb-3">
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">Company Logo</Form.Label>
//                       <Form.Control
//                         type="file"
//                         accept="image/*"
//                         onChange={(e) => handleSingleFileChange(e, setNewLogo)}
//                         className="rounded-pill px-3 py-2"
//                       />
//                       {newLogo && <p className="small text-muted mt-1">Selected new logo: {newLogo.name}</p>}
//                       {!newLogo && currentProfileData?.logo && <p className="small text-muted mt-1">Current logo: <a href={currentProfileData.logo} target="_blank" rel="noopener noreferrer">View</a></p>}
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">Upload New Company Banners (Max 5)</Form.Label>
//                       <Form.Control
//                         type="file"
//                         multiple
//                         accept="image/*"
//                         onChange={(e) => handleMultiFileChange(e, setNewBannerImages)}
//                         className="rounded-pill px-3 py-2"
//                       />
//                       {newBannerImages.length > 0 && <p className="small text-muted mt-1">Selected {newBannerImages.length} new banners.</p>}
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 {/* Display existing banners with remove option */}
//                 {currentProfileData?.banner && currentProfileData.banner.length > 0 && (
//                   <div className="mb-3">
//                     <h6 className="fw-semibold">Existing Banners:</h6>
//                     <Row xs={2} md={3} lg={4} className="g-2 mt-2">
//                       {currentProfileData.banner.map((img, index) => (
//                         <Col key={index}>
//                           <div className={`position-relative border p-1 rounded ${bannersToRemove.includes(img) ? 'bg-light opacity-50' : ''}`}>
//                             <img src={img} alt={`Banner ${index + 1}`} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '4px' }} onError={(e) => { e.target.onerror = null; e.target.src = placeholderImageUrl }} />
//                             <Button
//                               variant={bannersToRemove.includes(img) ? "outline-secondary" : "danger"}
//                               size="sm"
//                               className="position-absolute top-0 end-0 m-1 p-0 px-1" // Smaller button
//                               onClick={() => handleRemoveExistingBanner(img)}
//                               title={bannersToRemove.includes(img) ? "Undo remove" : "Mark to remove"}
//                             >
//                               {bannersToRemove.includes(img) ? <i className="bi bi-arrow-counterclockwise"></i> : <i className="bi bi-trash-fill"></i>}
//                             </Button>
//                           </div>
//                         </Col>
//                       ))}
//                     </Row>
//                     {bannersToRemove.length > 0 && <p className="small text-danger mt-2">({bannersToRemove.length} banners marked for removal upon update)</p>}
//                   </div>
//                 )}
//                 {/* Display preview of new banners */}
//                 {newBannerImages.length > 0 && (
//                   <div className="mb-4">
//                     <h6 className="fw-semibold">New Banners Preview:</h6>
//                     <Row xs={2} md={3} lg={4} className="g-2 mt-2">
//                       {newBannerImages.map((file, index) => (
//                         <Col key={index}>
//                           <img src={URL.createObjectURL(file)} alt={`New Banner ${index + 1}`} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '4px' }} />
//                         </Col>
//                       ))}
//                     </Row>
//                   </div>
//                 )}


//                 {/* --- Contact Information --- */}
//                 <h5 className="mt-4 mb-3 fw-bold text-primary">Contact Information</h5>
//                 <Row className="mb-3">
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">Email</Form.Label>
//                       <Form.Control
//                         type="email"
//                         name="email"
//                         value={editedProfileData.email || ""}
//                         onChange={handleInputChange}
//                         placeholder="Enter email"
//                         required
//                         className="rounded-pill px-3 py-2"
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">Phone</Form.Label>
//                       <Form.Control
//                         type="tel"
//                         name="phone"
//                         value={editedProfileData.phone || ""}
//                         onChange={handleInputChange}
//                         placeholder="Enter phone number"
//                         className="rounded-pill px-3 py-2"
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//                 <Row className="mb-3">
//                     <Col md={6}>
//                         <Form.Group className="mb-3">
//                             <Form.Label className="fw-semibold">Address Line</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="address"
//                                 value={editedProfileData.address || ''}
//                                 onChange={handleInputChange}
//                                 placeholder="Street address, building name"
//                                 className="rounded-pill px-3 py-2"
//                             />
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label className="fw-semibold">Country <span className="text-danger">*</span></Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="country" // Ensure name attribute is present for FormData
//                                 value={"India"} // Display "India"
//                                 readOnly
//                                 disabled
//                                 className="rounded-pill px-3 py-2 bg-light"
//                             />
//                              {/* A hidden input can be used to explicitly send the ID if the backend needs it separately */}
//                              {/* <input type="hidden" name="country" value={INDIA_DEFAULT_COUNTRY_ID} /> */}
//                         </Form.Group>
//                     </Col>
//                     <Col md={6}>
//                         <Form.Group className="mb-3">
//                             <Form.Label className="fw-semibold">State <span className="text-danger">*</span></Form.Label>
//                             <Form.Select
//                                 name="state"
//                                 value={selectedStateDropdownId}
//                                 onChange={handleStateChange}
//                                 disabled={loading || states.length === 0} // Disabled if loading or no states
//                                 className="rounded-pill px-3 py-2"
//                                 required
//                             >
//                                 <option value="">Select State</option>
//                                 {states.map(state => (
//                                     <option key={state._id} value={state._id}>{state.name}</option>
//                                 ))}
//                             </Form.Select>
//                             {states.length === 0 && !loading && <Form.Text className="text-muted">No states found for India.</Form.Text>}
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label className="fw-semibold">City <span className="text-danger">*</span></Form.Label>
//                             <Form.Select
//                                 name="city"
//                                 value={editedProfileData.city || ''}
//                                 onChange={handleCityChange}
//                                 disabled={loading || !selectedStateDropdownId || cities.length === 0} // Disabled if loading, no state selected, or no cities
//                                 className="rounded-pill px-3 py-2"
//                                 required
//                             >
//                                 <option value="">Select City</option>
//                                 {cities.map(city => (
//                                     <option key={city._id} value={city._id}>{city.name}</option>
//                                 ))}
//                             </Form.Select>
//                             {!selectedStateDropdownId && <Form.Text className="text-muted">Select a state first.</Form.Text>}
//                             {selectedStateDropdownId && cities.length === 0 && !loading && <Form.Text className="text-muted">No cities found for the selected state.</Form.Text>}
//                         </Form.Group>
//                     </Col>
//                 </Row>
//                 <Form.Group className="mb-4">
//                   <Form.Label className="fw-semibold">Website</Form.Label>
//                   <Form.Control
//                     type="url"
//                     name="website"
//                     value={editedProfileData.website || ""}
//                     onChange={handleInputChange}
//                     placeholder="Enter website URL (e.g., https://www.example.com)"
//                     className="rounded-pill px-3 py-2"
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-4">
//                     <Form.Label className="fw-semibold">Google Maps Link</Form.Label>
//                     <Form.Control
//                         type="url"
//                         name="googleMapsLink"
//                         value={editedProfileData.googleMapsLink || ''}
//                         onChange={handleInputChange}
//                         placeholder="Enter Google Maps link for your location"
//                         className="rounded-pill px-3 py-2"
//                     />
//                 </Form.Group>

//                 {/* --- Business Details --- */}
//                 <h5 className="mt-4 mb-3 fw-bold text-primary">Business Details</h5>
//                 <Row className="mb-3">
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">Company Type</Form.Label>
//                       <Form.Control
//                         type="text"
//                         name="companyType"
//                         value={editedProfileData.companyType || ""}
//                         onChange={handleInputChange}
//                         placeholder="e.g., Manufacturer, Trader"
//                         className="rounded-pill px-3 py-2"
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">Category <span className="text-danger">*</span></Form.Label>
//                       <Form.Select
//                         value={editedProfileData.category?._id || ''}
//                         onChange={handleCategoryChange}
//                         className="rounded-pill px-3 py-2"
//                         required
//                         disabled={loading}
//                       >
//                         <option value="">Select Category</option>
//                         {categories.map(cat => (
//                           <option key={cat._id} value={cat._id}>{cat.name}</option>
//                         ))}
//                       </Form.Select>
//                     </Form.Group>
//                   </Col>
//                 </Row>
//                 <Row className="mb-3">
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">SubCategory (Optional)</Form.Label>
//                       <Form.Select
//                         value={editedProfileData.subCategory?._id || ''}
//                         onChange={handleSubCategoryChange}
//                         disabled={!editedProfileData.category?._id || filteredSubCategoriesForEdit.length === 0 || loading}
//                         className="rounded-pill px-3 py-2"
//                       >
//                         <option value="">Select SubCategory</option>
//                         {filteredSubCategoriesForEdit.map(subCat => (
//                           <option key={subCat._id} value={subCat._id}>{subCat.name}</option>
//                         ))}
//                       </Form.Select>
//                       {editedProfileData.category?._id && filteredSubCategoriesForEdit.length === 0 && (
//                         <Form.Text className="text-muted">
//                           No subcategories found for the selected category.
//                         </Form.Text>
//                       )}
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">GST Number</Form.Label>
//                       <Form.Control
//                         type="text"
//                         name="gstNumber"
//                         value={editedProfileData.gstNumber || ""}
//                         onChange={handleInputChange}
//                         placeholder="Enter GST number"
//                         className="rounded-pill px-3 py-2"
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//                 <Form.Group className="mb-4">
//                   <Form.Label className="fw-semibold">Aadhaar Number</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="aadhaarNumber"
//                     value={editedProfileData.aadhaarNumber || ""}
//                     onChange={handleInputChange}
//                     placeholder="Enter Aadhaar number"
//                     className="rounded-pill px-3 py-2"
//                   />
//                 </Form.Group>

//                 <h6 className="mt-4 mb-3 fw-bold">Social Links:</h6>
//                 <InputGroup className="mb-2">
//                   <Form.Control
//                     type="url"
//                     placeholder="Enter social link URL (e.g., https://facebook.com/mycompany)"
//                     value={socialLinkInput}
//                     onChange={(e) => setSocialLinkInput(e.target.value)}
//                     className="rounded-start-pill px-3 py-2"
//                   />
//                   <Button variant="outline-primary" onClick={handleAddSocialLink} className="rounded-end-pill px-3 py-2">Add</Button>
//                 </InputGroup>
//                 {editedProfileData.socialLinks && editedProfileData.socialLinks.length > 0 ? (
//                   <ListGroup className="mb-3">
//                     {editedProfileData.socialLinks.map((link, index) => (
//                       <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center rounded-3 mb-1 px-3 py-2" style={{ backgroundColor: '#f8f9fa' }}>
//                         <a href={link} target="_blank" rel="noopener noreferrer" className="text-primary text-decoration-none small">{link}</a>
//                         <Button variant="danger" size="sm" onClick={() => handleRemoveSocialLink(link)} className="rounded-pill">Remove</Button>
//                       </ListGroup.Item>
//                     ))}
//                   </ListGroup>
//                 ) : (
//                   <p className="text-muted small">No social links added yet.</p>
//                 )}

//                 <h6 className="mt-4 mb-3 fw-bold">Keywords:</h6>
//                 <Form.Control
//                   as="textarea"
//                   name="keywords"
//                   value={keywordInput} // Use keywordInput for display
//                   onChange={handleInputChange} // This will update both keywordInput and editedProfileData.keywords
//                   rows={2}
//                   placeholder="Enter keywords, separated by commas (e.g., product, service, local)"
//                   className="rounded-3 px-3 py-2 mb-4"
//                   style={{ resize: 'vertical' }}
//                 />

//                 <h6 className="mt-4 mb-3 fw-bold">Business Timings:</h6>
//                 <ListGroup className="mb-4">
//                   {daysOfWeek.map(day => (
//                     <ListGroup.Item key={day} className="d-flex justify-content-between align-items-center text-capitalize rounded-3 mb-1 px-3 py-2" style={{ backgroundColor: '#f8f9fa' }}>
//                       <strong>{day}:</strong>
//                       <div className="d-flex align-items-center">
//                         <Form.Control
//                           type="time"
//                           name={`${day}.open`}
//                           value={editedProfileData.businessTimings?.[day]?.open || '00:00'}
//                           onChange={(e) => setEditedProfileData(prev => ({
//                             ...prev,
//                             businessTimings: {
//                               ...prev.businessTimings,
//                               [day]: { ...prev.businessTimings?.[day], open: e.target.value }
//                             }
//                           }))}
//                           className="me-2 rounded-pill px-3 py-2"
//                           style={{ width: '120px' }}
//                         />
//                         <span>-</span>
//                         <Form.Control
//                           type="time"
//                           name={`${day}.close`}
//                           value={editedProfileData.businessTimings?.[day]?.close || '00:00'}
//                           onChange={(e) => setEditedProfileData(prev => ({
//                             ...prev,
//                             businessTimings: {
//                               ...prev.businessTimings,
//                               [day]: { ...prev.businessTimings?.[day], close: e.target.value }
//                             }
//                           }))}
//                           className="ms-2 rounded-pill px-3 py-2"
//                           style={{ width: '120px' }}
//                         />
//                       </div>
//                     </ListGroup.Item>
//                   ))}
//                 </ListGroup>

//                 {/* --- Documents for Verification --- */}
//                 <h5 className="mt-4 mb-3 fw-bold text-primary">Documents for Verification</h5>
//                 <Row className="g-3 mb-4">
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">Aadhaar Image</Form.Label>
//                       <Form.Control type="file" accept="image/*,application/pdf" onChange={(e) => handleSingleFileChange(e, setNewAadhaarImage)} className="rounded-pill px-3 py-2" />
//                       {newAadhaarImage && <p className="small text-muted mt-1">Selected: {newAadhaarImage.name}</p>}
//                       {!newAadhaarImage && currentProfileData?.aadhaarImage && <p className="small text-muted mt-1">Current: <a href={currentProfileData.aadhaarImage} target="_blank" rel="noopener noreferrer">View</a></p>}
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">PAN Image</Form.Label>
//                       <Form.Control type="file" accept="image/*,application/pdf" onChange={(e) => handleSingleFileChange(e, setNewPanImage)} className="rounded-pill px-3 py-2" />
//                       {newPanImage && <p className="small text-muted mt-1">Selected: {newPanImage.name}</p>}
//                       {!newPanImage && currentProfileData?.panImage && <p className="small text-muted mt-1">Current: <a href={currentProfileData.panImage} target="_blank" rel="noopener noreferrer">View</a></p>}
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">Electricity Bill Image</Form.Label>
//                       <Form.Control type="file" accept="image/*,application/pdf" onChange={(e) => handleSingleFileChange(e, setNewElectricityBillImage)} className="rounded-pill px-3 py-2" />
//                       {newElectricityBillImage && <p className="small text-muted mt-1">Selected: {newElectricityBillImage.name}</p>}
//                       {!newElectricityBillImage && currentProfileData?.electricityBillImage && <p className="small text-muted mt-1">Current: <a href={currentProfileData.electricityBillImage} target="_blank" rel="noopener noreferrer">View</a></p>}
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label className="fw-semibold">Passport Photo</Form.Label>
//                       <Form.Control type="file" accept="image/*" onChange={(e) => handleSingleFileChange(e, setNewPassportPhoto)} className="rounded-pill px-3 py-2" />
//                       {newPassportPhoto && <p className="small text-muted mt-1">Selected: {newPassportPhoto.name}</p>}
//                       {!newPassportPhoto && currentProfileData?.passportPhoto && <p className="small text-muted mt-1">Current: <a href={currentProfileData.passportPhoto} target="_blank" rel="noopener noreferrer">View</a></p>}
//                     </Form.Group>
//                   </Col>
//                 </Row>


//                 {/* 🔹 Buttons */}
//                 <div className="d-flex justify-content-end gap-3 mt-5"> {/* Increased gap and margin top */}
//                   <Button
//                     variant="outline-secondary"
//                     onClick={onCancel}
//                     className="px-4 py-2 fw-bold rounded-pill"
//                     disabled={loading}
//                   >
//                     Cancel
//                   </Button>
//                   <Button
//                     variant="primary"
//                     type="submit"
//                     className="px-4 py-2 fw-bold rounded-pill"
//                     style={{
//                       background:
//                         "linear-gradient(to right, #007bff, #6610f2)",
//                       border: "none",
//                       boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
//                       transition: "all 0.3s ease",
//                     }}
//                     onMouseOver={(e) =>
//                       (e.target.style.transform = "scale(1.03)")
//                     }
//                     onMouseOut={(e) =>
//                       (e.target.style.transform = "scale(1)")
//                     }
//                     disabled={loading}
//                   >
//                     {loading ? (
//                       <Spinner as="span" animation="border" size="sm" className="me-2" />
//                     ) : (
//                       "Submit Update Request" // Changed button text for clarity
//                     )}
//                   </Button>
//                 </div>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Container>
//       </div>
//     </>
//   );
// };

// export default UpdateProfileForm;       


import React, { useState, useEffect } from "react";
import {
  Container, Form, Button, Alert, Spinner, Row, Col, Card, ListGroup, InputGroup
} from "react-bootstrap";
import {
  requestCompanyUpdate,
  getAllCompanyCategories,
  getAllCompanySubCategories,
  getCountries,
  getStatesByCountry,
  getCitiesByState
} from "../Services/authApi"; // सुनिश्चित करें कि यह सही पाथ है
import axios from 'axios'; // For URL.createObjectURL previews
import { RectangleGoggles } from "lucide-react"; // Not used in this component, but kept as per original.

// Placeholder image for broken links or missing images
const placeholderImageUrl = 'https://via.placeholder.com/100x75/f0f0f0/cccccc?text=No+Image';

// IMPORTANT: Assuming "India" has this fixed ID in your backend database.
// Please verify this ID with your actual backend data.
const INDIA_DEFAULT_COUNTRY_ID = "687a1e2185f0230715032380";

const UpdateProfileForm = ({ currentProfileData, onUpdateSuccess, onCancel }) => {
  // --- Core State for Company Profile Editing ---
  const [editedProfileData, setEditedProfileData] = useState({
    name: '', tagline: '', description: '', email: '', phone: '',
    address: '', city: '', state: '', country: INDIA_DEFAULT_COUNTRY_ID, // Default to India ID
    website: '', googleMapsLink: '', companyType: '', gstNumber: '', aadhaarNumber: '',
    socialLinks: [], keywords: [], businessTimings: {},
    category: null, subCategory: null,
  });

  const [loading, setLoading] = useState(false); // For form submission
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // --- OVERLAY FEEDBACK STATES ---
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayType, setOverlayType] = useState(null); // 'success' or 'error'
  // --- END OVERLAY FEEDBACK STATES ---

  // --- FILE UPLOAD STATES (for new files) ---
  const [newLogo, setNewLogo] = useState(null);
  const [newBannerImages, setNewBannerImages] = useState([]); // For newly selected banner files
  const [bannersToRemove, setBannersToRemove] = useState([]); // URLs of existing banners to be removed
  const [newAadhaarImage, setNewAadhaarImage] = useState(null);
  const [newPanImage, setNewPanImage] = useState(null);
  const [newElectricityBillImage, setNewElectricityBillImage] = useState(null);
  const [newPassportPhoto, setNewPassportPhoto] = useState(null);
  // --- END FILE UPLOAD STATES ---

  // --- OTHER EDITABLE FIELD STATES ---
  const [socialLinkInput, setSocialLinkInput] = useState(''); // Temp input for adding new social links
  const [keywordInput, setKeywordInput] = useState(''); // Temp input for keywords as comma-separated string
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [filteredSubCategoriesForEdit, setFilteredSubCategoriesForEdit] = useState([]); // For subcategories dropdown in edit mode
  // --- END OTHER EDITABLE FIELD STATES ---

  // --- LOCATION SPECIFIC STATES ---
  const [countries, setCountries] = useState([]); // Still fetch all countries to find 'India' by ID
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountryDropdownId, setSelectedCountryDropdownId] = useState(INDIA_DEFAULT_COUNTRY_ID); // Will always be India
  const [selectedStateDropdownId, setSelectedStateDropdownId] = useState('');
  // --- END LOCATION SPECIFIC STATES ---

  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];


  // --- Data Initialization on Mount / currentProfileData change ---
  useEffect(() => {
    const initForm = async () => {
      if (!currentProfileData) {
        console.warn("UpdateProfileForm: currentProfileData is not yet available.");
        return;
      }

      setEditedProfileData({
        ...currentProfileData,
        address: currentProfileData.address?.address || '',
        // These will be populated with actual IDs from currentProfileData.address
        country: currentProfileData.address?.country || INDIA_DEFAULT_COUNTRY_ID, // Default to India ID if not present
        state: currentProfileData.address?.state || '',
        city: currentProfileData.address?.city || '',
        businessTimings: currentProfileData.businessTimings ? { ...currentProfileData.businessTimings } : {},
        socialLinks: Array.isArray(currentProfileData.socialLinks) ? [...currentProfileData.socialLinks] : [],
        keywords: Array.isArray(currentProfileData.keywords) ? [...currentProfileData.keywords] : [],
      });

      if (currentProfileData.keywords && Array.isArray(currentProfileData.keywords)) {
        setKeywordInput(currentProfileData.keywords.join(', '));
      } else {
        setKeywordInput('');
      }
      setSocialLinkInput('');
      setNewLogo(null);
      setNewBannerImages([]);
      setBannersToRemove([]);
      setNewAadhaarImage(null);
      setNewPanImage(null);
      setNewElectricityBillImage(null);
      setNewPassportPhoto(null);
      setError('');
      setSuccess('');
      setShowOverlay(false);

      // Fetch categories and subcategories
      try {
        const categoriesRes = await getAllCompanyCategories();
        setCategories(categoriesRes.data);
        const subCategoriesRes = await getAllCompanySubCategories();
        setSubCategories(subCategoriesRes.data);
      } catch (err) {
        console.error("Failed to fetch categories/subcategories:", err);
        setError("Failed to fetch categories/subcategories.");
      }

      // --- Location Data Initialization for India, States, and Cities ---
      try {
        const countriesRes = await getCountries();
        setCountries(countriesRes.data);

        setSelectedCountryDropdownId(INDIA_DEFAULT_COUNTRY_ID);
        setEditedProfileData(prevData => ({ ...prevData, country: INDIA_DEFAULT_COUNTRY_ID }));

        const statesRes = await getStatesByCountry(INDIA_DEFAULT_COUNTRY_ID);
        setStates(statesRes.data);

        const initialStateFromProfile = currentProfileData.address?.state;
        if (initialStateFromProfile) {
          let stateObj = statesRes.data.find(s => s._id === initialStateFromProfile);
          if (!stateObj) {
            stateObj = statesRes.data.find(s => s.name === initialStateFromProfile && s.country === INDIA_DEFAULT_COUNTRY_ID);
          }

          if (stateObj) {
            const stateId = stateObj._id;
            setSelectedStateDropdownId(stateId);
            setEditedProfileData(prevData => ({ ...prevData, state: stateId }));

            const citiesRes = await getCitiesByState(stateId);
            setCities(citiesRes.data);

            const initialCityFromProfile = currentProfileData.address?.city;
            if (initialCityFromProfile) {
              let cityObj = citiesRes.data.find(c => c._id === initialCityFromProfile);
              if (!cityObj) {
                cityObj = citiesRes.data.find(c => c.name === initialCityFromProfile && c.state === stateId);
              }
              if (cityObj) {
                setEditedProfileData(prevData => ({ ...prevData, city: cityObj._id }));
              }
            }
          }
        }
      } catch (err) {
        console.error("Failed to fetch initial location data (countries, states, cities):", err);
        setError("Failed to load location data.");
      }
    };
    initForm();
  }, [currentProfileData]);


  // --- Effects for Filtering Subcategories (based on selected category) ---
  useEffect(() => {
    if (editedProfileData.category?._id && subCategories.length > 0) {
      setFilteredSubCategoriesForEdit(subCategories.filter(sub => sub.parentCategory === editedProfileData.category._id));
    } else {
      setFilteredSubCategoriesForEdit([]);
    }
  }, [editedProfileData.category, subCategories]);

  // --- Effects for fetching States when selectedCountryDropdownId changes ---
  useEffect(() => {
    const fetchStatesData = async () => {
      if (selectedCountryDropdownId) {
        setLoading(true);
        setError('');
        try {
          const statesRes = await getStatesByCountry(selectedCountryDropdownId);
          setStates(statesRes.data);
          setCities([]);

          if (!statesRes.data.some(s => s._id === editedProfileData.state)) {
            setEditedProfileData(prevData => ({ ...prevData, state: '', city: '' }));
            setSelectedStateDropdownId('');
          } else {
            setSelectedStateDropdownId(editedProfileData.state);
          }

        } catch (err) {
          console.error("Failed to fetch states:", err);
          setStates([]);
          setCities([]);
          setEditedProfileData(prevData => ({ ...prevData, state: '', city: '' }));
          setSelectedStateDropdownId('');
          setError(err.response?.data?.message || err.message || "Failed to load states.");
        } finally {
          setLoading(false);
        }
      } else {
        setStates([]);
        setCities([]);
        setEditedProfileData(prevData => ({ ...prevData, state: '', city: '' }));
        setSelectedCountryDropdownId(INDIA_DEFAULT_COUNTRY_ID);
        setSelectedStateDropdownId('');
      }
    };
    fetchStatesData();
  }, [selectedCountryDropdownId, editedProfileData.state]);

  // --- Effects for fetching Cities when selectedStateDropdownId changes ---
  useEffect(() => {
    const fetchCitiesData = async () => {
      if (selectedStateDropdownId) {
        setLoading(true);
        setError('');
        try {
          const citiesRes = await getCitiesByState(selectedStateDropdownId);
          setCities(citiesRes.data);

          if (!citiesRes.data.some(c => c._id === editedProfileData.city)) {
            setEditedProfileData(prevData => ({ ...prevData, city: '' }));
          }
        } catch (err) {
          console.error("Failed to fetch cities:", err);
          setCities([]);
          setEditedProfileData(prevData => ({ ...prevData, city: '' }));
          setError(err.response?.data?.message || err.message || "Failed to load cities.");
        } finally {
          setLoading(false);
        }
      } else {
        setCities([]);
        setEditedProfileData(prevData => ({ ...prevData, city: '' }));
      }
    };
    fetchCitiesData();
  }, [selectedStateDropdownId, editedProfileData.city]);


  // --- Input Change Handlers for generic text fields ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'keywords') {
      setKeywordInput(value);
      setEditedProfileData(prevData => ({
        ...prevData,
        keywords: value.split(',').map(kw => kw.trim()).filter(Boolean)
      }));
    } else {
      setEditedProfileData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    const selectedCategory = categories.find(cat => cat._id === categoryId);
    setEditedProfileData(prevData => ({
      ...prevData,
      category: selectedCategory,
      subCategory: null
    }));
  };

  const handleSubCategoryChange = (e) => {
    const subCategoryId = e.target.value;
    const selectedSubCategory = subCategories.find(sub => sub._id === subCategoryId);
    setEditedProfileData(prevData => ({
      ...prevData,
      subCategory: selectedSubCategory
    }));
  };

  const handleStateChange = (e) => {
    const stateId = e.target.value;
    setSelectedStateDropdownId(stateId);
    setEditedProfileData(prevData => ({
      ...prevData,
      state: stateId,
      city: ''
    }));
  };

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setEditedProfileData(prevData => ({
      ...prevData,
      city: cityId
    }));
  };

  // Handlers for Social Links
  const handleAddSocialLink = () => {
    if (socialLinkInput.trim()) {
      setEditedProfileData(prevData => {
        const currentSocialLinks = Array.isArray(prevData.socialLinks) ? prevData.socialLinks : [];
        if (!currentSocialLinks.includes(socialLinkInput.trim())) {
          return {
            ...prevData,
            socialLinks: [...currentSocialLinks, socialLinkInput.trim()]
          };
        }
        return prevData;
      });
      setSocialLinkInput('');
    }
  };

  const handleRemoveSocialLink = (linkToRemove) => {
    setEditedProfileData(prevData => ({
      ...prevData,
      socialLinks: prevData.socialLinks.filter(link => link !== linkToRemove)
    }));
  };

  // --- FILE HANDLERS for single/multi-file inputs ---
  const handleSingleFileChange = (e, setStateFunction) => {
    setStateFunction(e.target.files[0] || null);
  };

  const handleMultiFileChange = (e, setStateFunction) => {
    setStateFunction(Array.from(e.target.files || []));
  };

  const handleRemoveExistingBanner = (imageUrl) => {
    setBannersToRemove(prev =>
      prev.includes(imageUrl)
        ? prev.filter(url => url !== imageUrl)
        : [...prev, imageUrl]
    );
  };
  // --- END FILE HANDLERS ---

  // --- Submit Handler ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    setShowOverlay(false); // Hide any lingering overlay

    try {
      const formData = new FormData();
      let changesDetected = false;

      for (const key in editedProfileData) {
        if (['products', 'registeredBy', 'approvedBy', 'isApproved', 'companyStatus', 'pendingProfileUpdates', '__v', '_id', 'createdAt', 'updatedAt', 'logo', 'banner', 'aadhaarImage', 'panImage', 'electricityBillImage', 'passportPhoto'].includes(key)) {
          continue;
        }

        let originalValue;
        let editedValue = editedProfileData[key];

        if (key === 'address') {
          originalValue = currentProfileData?.address?.address;
        } else if (key === 'country' || key === 'state' || key === 'city') {
          originalValue = currentProfileData?.address?.[key];
        } else {
          originalValue = currentProfileData[key];
        }

        if (key === 'businessTimings') {
          if (JSON.stringify(originalValue) !== JSON.stringify(editedValue)) {
            formData.append(key, JSON.stringify(editedValue));
            changesDetected = true;
          }
        } else if (key === 'socialLinks' || key === 'keywords') {
          const originalArray = Array.isArray(originalValue) ? originalValue : (originalValue ? JSON.parse(originalValue) : []);
          const editedArray = Array.isArray(editedValue) ? editedValue : (editedValue ? JSON.parse(editedValue) : []);
          if (JSON.stringify(originalArray.sort()) !== JSON.stringify(editedArray.sort())) {
            formData.append(key, JSON.stringify(editedArray));
            changesDetected = true;
          }
        } else if (key === 'category') {
          if (editedProfileData.category?._id !== currentProfileData?.category?._id) {
            formData.append('category', editedProfileData.category._id);
            changesDetected = true;
          }
        } else if (key === 'subCategory') {
          if (editedProfileData.subCategory?._id !== currentProfileData?.subCategory?._id) {
            formData.append('subCategory', editedProfileData.subCategory._id);
            changesDetected = true;
          }
        } else if (originalValue !== editedValue) {
          if (editedValue !== '' || (originalValue !== '' && originalValue !== undefined && originalValue !== null)) {
            formData.append(key, editedValue);
            changesDetected = true;
          }
        }
      }

      // --- APPEND NEW FILES TO FORMDATA ---
      if (newLogo) {
        formData.append('logo', newLogo);
        changesDetected = true;
      }
      if (newBannerImages.length > 0) {
        newBannerImages.forEach(file => formData.append('banner', file));
        changesDetected = true;
      }
      if (bannersToRemove.length > 0) {
        formData.append('bannersToDelete', JSON.stringify(bannersToRemove));
        changesDetected = true;
      }

      if (newAadhaarImage) {
        formData.append('aadhaar', newAadhaarImage);
        changesDetected = true;
      }
      if (newPanImage) {
        formData.append('pan', newPanImage);
        changesDetected = true;
      }
      if (newElectricityBillImage) {
        formData.append('electricityBill', newElectricityBillImage);
        changesDetected = true;
      }
      if (newPassportPhoto) {
        formData.append('passportPhoto', newPassportPhoto);
        changesDetected = true;
      }
      // --- END APPEND NEW FILES ---


      if (!changesDetected && newLogo === null && newBannerImages.length === 0 && bannersToRemove.length === 0 &&
        newAadhaarImage === null && newPanImage === null && newElectricityBillImage === null && newPassportPhoto === null) {
        setError("No changes detected to submit for update.");
        setLoading(false);
        return;
      }

      const res = await requestCompanyUpdate(formData);
      setSuccess(res.message || "Company update request submitted successfully!");
      setOverlayType('success');
      setShowOverlay(true);

      setNewLogo(null);
      setNewBannerImages([]);
      setBannersToRemove([]);
      setNewAadhaarImage(null);
      setNewPanImage(null);
      setNewElectricityBillImage(null);
      setNewPassportPhoto(null);
      setSocialLinkInput('');
      setKeywordInput('');

      setTimeout(() => {
        setShowOverlay(false);
        if (onUpdateSuccess) onUpdateSuccess(res.data);
      }, 2000); // Overlay visible for 2 seconds

    } catch (err) {
      console.error("Failed to request company update:", err);
      const errorMessage = err.response?.data?.message || err.message || "Failed to submit update request.";
      setError(errorMessage);
      setOverlayType('error');
      setShowOverlay(true);

      setTimeout(() => {
        setShowOverlay(false);
      }, 2000); // Overlay visible for 2 seconds

    } finally {
      setLoading(false);
    }
  };

  if (!currentProfileData) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading profile data...</span>
        </Spinner>
        <p className="ms-3">Loading company profile...</p>
      </div>
    );
  }

  return (
    <>
      {/* Global Styles for form controls and overlay */}
      <style>{`
        .form-control, .form-select {
          transition: all 0.3s ease;
          border: 1px solid #dee2e6;
          box-shadow: none;
          outline: none;
          border-radius: 0.5rem;
        }
        .form-control.rounded-pill, .form-select.rounded-pill {
            border-radius: 50rem !important;
        }

        .form-control:hover, .form-select:hover {
          border-color: #80bdff;
          box-shadow: 0 0 0 0.15rem rgba(0, 123, 255, 0.1);
        }
        .form-control:focus, .form-select:focus {
          border-color: #007bff !important;
          box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.4), 0 0 15px rgba(0, 123, 255, 0.5) !important;
        }

        .input-group .form-control,
        .input-group .form-select {
            border-radius: 0.5rem;
        }
        .input-group .rounded-start-pill {
            border-top-left-radius: 50rem !important;
            border-bottom-left-radius: 50rem !important;
            border-top-right-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
        }
        .input-group .rounded-end-pill {
            border-top-right-radius: 50rem !important;
            border-bottom-right-radius: 50rem !important;
            border-top-left-radius: 0 !important;
            border-bottom-left-radius: 0 !important;
        }
        .input-group .rounded-end-pill:focus,
        .input-group .rounded-start-pill:focus {
            z-index: 2;
        }

        .input-group:focus-within .input-group-text,
        .input-group:focus-within .btn-outline-primary {
            border-color: #007bff !important;
            box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.4), 0 0 15px rgba(0, 123, 255, 0.5) !important;
            z-index: 3;
        }
        .input-group:focus-within .form-control {
            border-color: #007bff !important;
            box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.4), 0 0 15px rgba(0, 123, 255, 0.5) !important;
        }

        /* Overlay Styles */
        .overlay-feedback {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5); /* Semi-transparent black */
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1060; /* Higher than Bootstrap modals (1050) */
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
        }

        .overlay-feedback.show {
          opacity: 1;
          visibility: visible;
        }

        .overlay-feedback .success-icon,
        .overlay-feedback .error-icon {
          font-size: 8rem; /* Large icon size */
          color: white; /* White icon for contrast */
          animation: popIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards; /* Pop-in animation */
        }

        .overlay-feedback.success .success-icon {
          color: #28a745; /* Green for success */
          text-shadow: 0 0 20px rgba(40, 167, 69, 0.8);
        }

        .overlay-feedback.error .error-icon {
          color: #dc3545; /* Red for error */
          text-shadow: 0 0 20px rgba(220, 53, 69, 0.8);
        }

        /* Pop-in animation keyframes */
        @keyframes popIn {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          70% {
            transform: scale(1.1);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>

      {/* Overlay for success/error feedback */}
      {showOverlay && (
        <div className={`overlay-feedback ${showOverlay ? 'show' : ''} ${overlayType}`}>
          {overlayType === 'success' ? (
            <i className="bi bi-check-circle-fill success-icon animate__animated animate__zoomIn"></i>
          ) : (
            <i className="bi bi-x-circle-fill error-icon animate__animated animate__shakeX"></i>
          )}
        </div>
      )}

      <div
        style={{
          background: "linear-gradient(135deg, #e3f2fd, #f8f9fa)",
          minHeight: "100vh",
          paddingTop: "50px",
          paddingBottom: "50px",
        }}
      >
        <Container>
          <Card
            className="shadow-lg border-0 rounded-4 p-0 mx-auto"
            style={{
              maxWidth: "850px",
              background: "linear-gradient(145deg, #ffffff, #e9f0ff)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            }}
          >
            <div
              className="py-4 px-5 text-center rounded-top-4"
              style={{ backgroundColor: '#e9ecef', borderBottom: '1px solid #dee2e6' }}
            >
              <h3 className="mb-0 text-dark fw-bold" style={{ fontSize: '2rem' }}>
                Update Company Profile
              </h3>
              <p className="text-muted mt-2 mb-0">Edit your company's information below.</p>
            </div>

            <Card.Body className="p-5">
              {/* Only show loading spinner if overlay is NOT active */}
              {loading && !showOverlay && (
                <Spinner animation="border" className="d-block mx-auto mb-3 text-primary" />
              )}
              {/* Only show alerts if overlay is NOT active */}
              {error && !showOverlay && (
                <Alert variant="danger" className="text-center animate__animated animate__shakeX">
                  {error}
                </Alert>
              )}
              {success && !showOverlay && (
                <Alert variant="success" className="text-center animate__animated animate__fadeIn">
                  {success}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <h5 className="mb-4 fw-bold text-primary">General Information</h5>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Company Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={editedProfileData.name || ""}
                        onChange={handleInputChange}
                        placeholder="Enter company name"
                        required
                        className="rounded-pill px-3 py-2"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Tagline</Form.Label>
                      <Form.Control
                        type="text"
                        name="tagline"
                        value={editedProfileData.tagline || ''}
                        onChange={handleInputChange}
                        placeholder="Your company's motto or short description"
                        className="rounded-pill px-3 py-2"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    value={editedProfileData.description || ""}
                    onChange={handleInputChange}
                    placeholder="Write a short description about your company..."
                    className="rounded-3 px-3 py-2"
                    style={{ resize: 'vertical' }}
                  />
                </Form.Group>

                <h5 className="mt-4 mb-3 fw-bold text-primary">Media Uploads</h5>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Company Logo</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleSingleFileChange(e, setNewLogo)}
                        className="rounded-pill px-3 py-2"
                      />
                      {newLogo && <p className="small text-muted mt-1">Selected new logo: {newLogo.name}</p>}
                      {!newLogo && currentProfileData?.logo && <p className="small text-muted mt-1">Current logo: <a href={currentProfileData.logo} target="_blank" rel="noopener noreferrer">View</a></p>}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Upload New Company Banners (Max 5)</Form.Label>
                      <Form.Control
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleMultiFileChange(e, setNewBannerImages)}
                        className="rounded-pill px-3 py-2"
                      />
                      {newBannerImages.length > 0 && <p className="small text-muted mt-1">Selected {newBannerImages.length} new banners.</p>}
                    </Form.Group>
                  </Col>
                </Row>

                {currentProfileData?.banner && currentProfileData.banner.length > 0 && (
                  <div className="mb-3">
                    <h6 className="fw-semibold">Existing Banners:</h6>
                    <Row xs={2} md={3} lg={4} className="g-2 mt-2">
                      {currentProfileData.banner.map((img, index) => (
                        <Col key={index}>
                          <div className={`position-relative border p-1 rounded ${bannersToRemove.includes(img) ? 'bg-light opacity-50' : ''}`}>
                            <img src={img} alt={`Banner ${index + 1}`} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '4px' }} onError={(e) => { e.target.onerror = null; e.target.src = placeholderImageUrl }} />
                            <Button
                              variant={bannersToRemove.includes(img) ? "outline-secondary" : "danger"}
                              size="sm"
                              className="position-absolute top-0 end-0 m-1 p-0 px-1"
                              onClick={() => handleRemoveExistingBanner(img)}
                              title={bannersToRemove.includes(img) ? "Undo remove" : "Mark to remove"}
                            >
                              {bannersToRemove.includes(img) ? <i className="bi bi-arrow-counterclockwise"></i> : <i className="bi bi-trash-fill"></i>}
                            </Button>
                          </div>
                        </Col>
                      ))}
                    </Row>
                    {bannersToRemove.length > 0 && <p className="small text-danger mt-2">({bannersToRemove.length} banners marked for removal upon update)</p>}
                  </div>
                )}
                {newBannerImages.length > 0 && (
                  <div className="mb-4">
                    <h6 className="fw-semibold">New Banners Preview:</h6>
                    <Row xs={2} md={3} lg={4} className="g-2 mt-2">
                      {newBannerImages.map((file, index) => (
                        <Col key={index}>
                          <img src={URL.createObjectURL(file)} alt={`New Banner ${index + 1}`} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '4px' }} />
                        </Col>
                      ))}
                    </Row>
                  </div>
                )}


                <h5 className="mt-4 mb-3 fw-bold text-primary">Contact Information</h5>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={editedProfileData.email || ""}
                        onChange={handleInputChange}
                        placeholder="Enter email"
                        required
                        className="rounded-pill px-3 py-2"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Phone</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={editedProfileData.phone || ""}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                        className="rounded-pill px-3 py-2"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Address Line</Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        value={editedProfileData.address || ''}
                        onChange={handleInputChange}
                        placeholder="Street address, building name"
                        className="rounded-pill px-3 py-2"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Country <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="text"
                        name="country"
                        value={"India"}
                        readOnly
                        disabled
                        className="rounded-pill px-3 py-2 bg-light"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">State <span className="text-danger">*</span></Form.Label>
                      <Form.Select
                        name="state"
                        value={selectedStateDropdownId}
                        onChange={handleStateChange}
                        disabled={loading || states.length === 0}
                        className="rounded-pill px-3 py-2"
                        required
                      >
                        <option value="">Select State</option>
                        {states.map(state => (
                          <option key={state._id} value={state._id}>{state.name}</option>
                        ))}
                      </Form.Select>
                      {states.length === 0 && !loading && <Form.Text className="text-muted">No states found for India.</Form.Text>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">City <span className="text-danger">*</span></Form.Label>
                      <Form.Select
                        name="city"
                        value={editedProfileData.city || ''}
                        onChange={handleCityChange}
                        disabled={loading || !selectedStateDropdownId || cities.length === 0}
                        className="rounded-pill px-3 py-2"
                        required
                      >
                        <option value="">Select City</option>
                        {cities.map(city => (
                          <option key={city._id} value={city._id}>{city.name}</option>
                        ))}
                      </Form.Select>
                      {!selectedStateDropdownId && <Form.Text className="text-muted">Select a state first.</Form.Text>}
                      {selectedStateDropdownId && cities.length === 0 && !loading && <Form.Text className="text-muted">No cities found for the selected state.</Form.Text>}
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Website</Form.Label>
                  <Form.Control
                    type="url"
                    name="website"
                    value={editedProfileData.website || ""}
                    onChange={handleInputChange}
                    placeholder="Enter website URL (e.g., https://www.example.com)"
                    className="rounded-pill px-3 py-2"
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Google Maps Link</Form.Label>
                  <Form.Control
                    type="url"
                    name="googleMapsLink"
                    value={editedProfileData.googleMapsLink || ''}
                    onChange={handleInputChange}
                    placeholder="Enter Google Maps link for your location"
                    className="rounded-pill px-3 py-2"
                  />
                </Form.Group>

                <h5 className="mt-4 mb-3 fw-bold text-primary">Business Details</h5>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Company Type</Form.Label>
                      <Form.Control
                        type="text"
                        name="companyType"
                        value={editedProfileData.companyType || ""}
                        onChange={handleInputChange}
                        placeholder="e.g., Manufacturer, Trader"
                        className="rounded-pill px-3 py-2"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Category <span className="text-danger">*</span></Form.Label>
                      <Form.Select
                        value={editedProfileData.category?._id || ''}
                        onChange={handleCategoryChange}
                        className="rounded-pill px-3 py-2"
                        required
                        disabled={loading}
                      >
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                          <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">SubCategory (Optional)</Form.Label>
                      <Form.Select
                        value={editedProfileData.subCategory?._id || ''}
                        onChange={handleSubCategoryChange}
                        disabled={!editedProfileData.category?._id || filteredSubCategoriesForEdit.length === 0 || loading}
                        className="rounded-pill px-3 py-2"
                      >
                        <option value="">Select SubCategory</option>
                        {filteredSubCategoriesForEdit.map(subCat => (
                          <option key={subCat._id} value={subCat._id}>{subCat.name}</option>
                        ))}
                      </Form.Select>
                      {editedProfileData.category?._id && filteredSubCategoriesForEdit.length === 0 && (
                        <Form.Text className="text-muted">
                          No subcategories found for the selected category.
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">GST Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="gstNumber"
                        value={editedProfileData.gstNumber || ""}
                        onChange={handleInputChange}
                        placeholder="Enter GST number"
                        className="rounded-pill px-3 py-2"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Aadhaar Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="aadhaarNumber"
                    value={editedProfileData.aadhaarNumber || ""}
                    onChange={handleInputChange}
                    placeholder="Enter Aadhaar number"
                    className="rounded-pill px-3 py-2"
                  />
                </Form.Group>

                <h6 className="mt-4 mb-3 fw-bold">Social Links:</h6>
                <InputGroup className="mb-2">
                  <Form.Control
                    type="url"
                    placeholder="Enter social link URL (e.g., https://facebook.com/mycompany)"
                    value={socialLinkInput}
                    onChange={(e) => setSocialLinkInput(e.target.value)}
                    className="rounded-start-pill px-3 py-2"
                  />
                  <Button variant="outline-primary" onClick={handleAddSocialLink} className="rounded-end-pill px-3 py-2">Add</Button>
                </InputGroup>
                {editedProfileData.socialLinks && editedProfileData.socialLinks.length > 0 ? (
                  <ListGroup className="mb-3">
                    {editedProfileData.socialLinks.map((link, index) => (
                      <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center rounded-3 mb-1 px-3 py-2" style={{ backgroundColor: '#f8f9fa' }}>
                        <a href={link} target="_blank" rel="noopener noreferrer" className="text-primary text-decoration-none small">{link}</a>
                        <Button variant="danger" size="sm" onClick={() => handleRemoveSocialLink(link)} className="rounded-pill">Remove</Button>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <p className="text-muted small">No social links added yet.</p>
                )}

                <h6 className="mt-4 mb-3 fw-bold">Keywords:</h6>
                <Form.Control
                  as="textarea"
                  name="keywords"
                  value={keywordInput}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="Enter keywords, separated by commas (e.g., product, service, local)"
                  className="rounded-3 px-3 py-2 mb-4"
                  style={{ resize: 'vertical' }}
                />

                <h6 className="mt-4 mb-3 fw-bold">Business Timings:</h6>
                <ListGroup className="mb-4">
                  {daysOfWeek.map(day => (
                    <ListGroup.Item key={day} className="d-flex justify-content-between align-items-center text-capitalize rounded-3 mb-1 px-3 py-2" style={{ backgroundColor: '#f8f9fa' }}>
                      <strong>{day}:</strong>
                      <div className="d-flex align-items-center">
                        <Form.Control
                          type="time"
                          name={`${day}.open`}
                          value={editedProfileData.businessTimings?.[day]?.open || '00:00'}
                          onChange={(e) => setEditedProfileData(prev => ({
                            ...prev,
                            businessTimings: {
                              ...prev.businessTimings,
                              [day]: { ...prev.businessTimings?.[day], open: e.target.value }
                            }
                          }))}
                          className="me-2 rounded-pill px-3 py-2"
                          style={{ width: '120px' }}
                        />
                        <span>-</span>
                        <Form.Control
                          type="time"
                          name={`${day}.close`}
                          value={editedProfileData.businessTimings?.[day]?.close || '00:00'}
                          onChange={(e) => setEditedProfileData(prev => ({
                            ...prev,
                            businessTimings: {
                              ...prev.businessTimings,
                              [day]: { ...prev.businessTimings?.[day], close: e.target.value }
                            }
                          }))}
                          className="ms-2 rounded-pill px-3 py-2"
                          style={{ width: '120px' }}
                        />
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>

                <h5 className="mt-4 mb-3 fw-bold text-primary">Documents for Verification</h5>
                <Row className="g-3 mb-4">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Aadhaar Image</Form.Label>
                      <Form.Control type="file" accept="image/*,application/pdf" onChange={(e) => handleSingleFileChange(e, setNewAadhaarImage)} className="rounded-pill px-3 py-2" />
                      {newAadhaarImage && <p className="small text-muted mt-1">Selected: {newAadhaarImage.name}</p>}
                      {!newAadhaarImage && currentProfileData?.aadhaarImage && <p className="small text-muted mt-1">Current: <a href={currentProfileData.aadhaarImage} target="_blank" rel="noopener noreferrer">View</a></p>}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">PAN Image</Form.Label>
                      <Form.Control type="file" accept="image/*,application/pdf" onChange={(e) => handleSingleFileChange(e, setNewPanImage)} className="rounded-pill px-3 py-2" />
                      {newPanImage && <p className="small text-muted mt-1">Selected: {newPanImage.name}</p>}
                      {!newPanImage && currentProfileData?.panImage && <p className="small text-muted mt-1">Current: <a href={currentProfileData.panImage} target="_blank" rel="noopener noreferrer">View</a></p>}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Electricity Bill Image</Form.Label>
                      <Form.Control type="file" accept="image/*,application/pdf" onChange={(e) => handleSingleFileChange(e, setNewElectricityBillImage)} className="rounded-pill px-3 py-2" />
                      {newElectricityBillImage && <p className="small text-muted mt-1">Selected: {newElectricityBillImage.name}</p>}
                      {!newElectricityBillImage && currentProfileData?.electricityBillImage && <p className="small text-muted mt-1">Current: <a href={currentProfileData.electricityBillImage} target="_blank" rel="noopener noreferrer">View</a></p>}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Passport Photo</Form.Label>
                      <Form.Control type="file" accept="image/*" onChange={(e) => handleSingleFileChange(e, setNewPassportPhoto)} className="rounded-pill px-3 py-2" />
                      {newPassportPhoto && <p className="small text-muted mt-1">Selected: {newPassportPhoto.name}</p>}
                      {!newPassportPhoto && currentProfileData?.passportPhoto && <p className="small text-muted mt-1">Current: <a href={currentProfileData.passportPhoto} target="_blank" rel="noopener noreferrer">View</a></p>}
                    </Form.Group>
                  </Col>
                </Row>


                <div className="d-flex justify-content-end gap-3 mt-5">
                  <Button
                    variant="outline-secondary"
                    onClick={onCancel}
                    className="px-4 py-2 fw-bold rounded-pill"
                    disabled={loading || showOverlay}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    className="px-4 py-2 fw-bold rounded-pill"
                    style={{
                      background:
                        "linear-gradient(to right, #007bff, #6610f2)",
                      border: "none",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                      transition: "all 0.3s ease",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.transform = "scale(1.03)")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.transform = "scale(1)")
                    }
                    disabled={loading || showOverlay}
                  >
                    {loading ? (
                      <Spinner as="span" animation="border" size="sm" className="me-2" />
                    ) : (
                      "Submit Update Request"
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default UpdateProfileForm;
