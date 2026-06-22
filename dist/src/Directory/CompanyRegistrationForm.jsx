// // // // src/components/CompanyRegistrationForm.jsx (adjust path as needed)
 
// // // import React, { useState, useEffect } from 'react';
// // // import {
// // //     Modal, Button, Form, Row, Col, Alert, Spinner, InputGroup
// // // } from 'react-bootstrap';
// // // import {
// // //     registerCompany, // The function you provided earlier
// // //     getAllCompanyCategories,
// // //     getAllCompanySubCategories,
// // // } from '../Services/authApi'; // Adjust this path if adminService is elsewhere
 
// // // // Helper to get the current token dynamically from localStorage
// // // const getToken = () => localStorage.getItem('token');
 
// // // // Helper to create authorized headers for FormData dynamically
// // // const getAuthHeadersForFormData = () => ({
// // //   headers: {
// // //     Authorization: `Bearer ${getToken()}`, // Har baar latest token fetch hoga
// // //   },
// // // });
 
// // // // A small custom hook for managing dynamic array inputs (e.g., social links, keywords)
// // // const useArrayInput = (initialValue = ['']) => {
// // //     const [items, setItems] = useState(initialValue);
 
// // //     const handleItemChange = (index, value) => {
// // //         const newItems = [...items];
// // //         newItems[index] = value;
// // //         setItems(newItems);
// // //     };
 
// // //     const addItem = () => setItems([...items, '']);
// // //     const removeItem = (index) => setItems(items.filter((_, i) => i !== index));
 
// // //     return [items, handleItemChange, addItem, removeItem, setItems];
// // // };
 
 
// // // const CompanyRegistrationForm = () => {
// // //     const [showModal, setShowModal] = useState(false);
// // //     const [loading, setLoading] = useState(false);
// // //     const [error, setError] = useState('');
// // //     const [successMessage, setSuccessMessage] = useState('');
 
// // //     const [allCategories, setAllCategories] = useState([]);
// // //     const [allSubCategories, setAllSubCategories] = useState([]);
// // //     const [filteredSubCategories, setFilteredSubCategories] = useState([]);
 
// // //     const [formData, setFormData] = useState({
// // //         name: '', email: '', phone: '', password: '',
// // //         address: '', city: '', state: '', country: '',
// // //         gstNumber: '', aadhaarNumber: '',
// // //         category: '', subCategory: '', companyType: 'service', // Default to service
// // //         website: '', googleMapsLink: '', description: '',
// // //         // File objects
// // //         logo: null,
// // //         banner: [], // Array of files
// // //         aadhaar: null,
// // //         pan: null,
// // //         electricityBill: null,
// // //         passportPhoto: null,
// // //     });
 
// // //     const [socialLinks, handleSocialLinkChange, addSocialLink, removeSocialLink, setSocialLinks] = useArrayInput(['']);
// // //     const [keywords, handleKeywordChange, addKeyword, removeKeyword, setKeywords] = useArrayInput(['']);
 
// // //     const initialBusinessTimings = {
// // //         sunday: { open: '', close: '' }, monday: { open: '', close: '' },
// // //         tuesday: { open: '', close: '' }, wednesday: { open: '', close: '' },
// // //         thursday: { open: '', close: '' }, friday: { open: '', close: '' },
// // //         saturday: { open: '', close: '' },
// // //     };
// // //     const [businessTimings, setBusinessTimings] = useState(initialBusinessTimings);
 
// // //     useEffect(() => {
// // //         const fetchLookupData = async () => {
// // //             try {
// // //                 const categoriesRes = await getAllCompanyCategories();
// // //            setAllCategories(categoriesRes?.data || []);  
// // //           console .log("jane do ", categoriesRes)
// // //                 const subCategoriesRes = await getAllCompanySubCategories();
// // //                 setAllSubCategories(subCategoriesRes.data || []);
// // //             } catch (err) {
// // //                 console.error("Error fetching categories/subcategories:", err);
// // //                 setError("Failed to load categories or subcategories.");
// // //             }
// // //         };
// // //         fetchLookupData();
// // //     }, []);
 
// // //     // Filter subcategories based on selected category
// // //     useEffect(() => {
// // //         if (formData.category) {
// // //             const categoryObj = allCategories.find(cat => cat._id === formData.category);
// // //             setFormData(prev => ({ ...prev, companyType: categoryObj ? categoryObj.type : 'service' })); // Set companyType based on selected category
// // //             const filtered = allSubCategories.filter(
// // //                 sub => String(sub.parentCategory?._id || sub.parentCategory) === String(formData.category)
// // //             );
// // //             setFilteredSubCategories(filtered);
// // //             setFormData(prev => ({ ...prev, subCategory: '' })); // Reset subcategory when category changes
// // //         } else {
// // //             setFilteredSubCategories([]);
// // //         }
// // //     }, [formData.category, allCategories, allSubCategories]);
 
 
// // //     const handleChange = (e) => {
// // //         const { name, value } = e.target;
// // //         setFormData(prev => ({ ...prev, [name]: value }));
// // //     };
 
// // //     const handleFileChange = (e) => {
// // //         const { name, files } = e.target;
// // //         if (name === 'banner') {
// // //             setFormData(prev => ({ ...prev, [name]: Array.from(files) }));
// // //         } else {
// // //             setFormData(prev => ({ ...prev, [name]: files[0] }));
// // //         }
// // //     };
 
// // //     const handleBusinessTimingChange = (day, field, value) => {
// // //         setBusinessTimings(prev => ({
// // //             ...prev,
// // //             [day]: { ...prev[day], [field]: value }
// // //         }));
// // //     };
 
// // //     const handleClose = () => {
// // //         setShowModal(false);
// // //         // Reset form after closing
// // //         setFormData({
// // //             name: '', email: '', phone: '', password: '',
// // //             address: '', city: '', state: '', country: '',
// // //             gstNumber: '', aadhaarNumber: '',
// // //             category: '', subCategory: '', companyType: 'service',
// // //             website: '', googleMapsLink: '', description: '',
// // //             logo: null, banner: [], aadhaar: null, pan: null,
// // //             electricityBill: null, passportPhoto: null,
// // //         });
// // //         setSocialLinks(['']);
// // //         setKeywords(['']);
// // //         setBusinessTimings(initialBusinessTimings);
// // //         setError('');
// // //         setSuccessMessage('');
// // //     };
 
// // //     const handleSubmit = async (e) => {
// // //         e.preventDefault();
// // //         setLoading(true);
// // //         setError('');
// // //         setSuccessMessage('');
 
// // //         try {
// // //             const companyPayload = new FormData();
 
// // //             // Append all text/select fields
// // //             for (const key in formData) {
// // //                 // Skip file objects for now, handle them separately
// // //                 if (['logo', 'banner', 'aadhaar', 'pan', 'electricityBill', 'passportPhoto'].includes(key)) {
// // //                     continue;
// // //                 }
// // //                 if (formData[key]) {
// // //                     companyPayload.append(key, formData[key]);
// // //                 }
// // //             }
 
// // //             // Append JSON string fields
// // //             companyPayload.append('socialLinks', JSON.stringify(socialLinks.filter(link => link.trim() !== '')));
// // //             companyPayload.append('keywords', JSON.stringify(keywords.filter(keyword => keyword.trim() !== '')));
// // //             companyPayload.append('businessTimings', JSON.stringify(businessTimings));
 
// // //             // Append files
// // //             if (formData.logo) companyPayload.append('logo', formData.logo);
// // //             formData.banner.forEach(file => companyPayload.append('banner', file));
// // //             if (formData.aadhaar) companyPayload.append('aadhaar', formData.aadhaar);
// // //             if (formData.pan) companyPayload.append('pan', formData.pan);
// // //             if (formData.electricityBill) companyPayload.append('electricityBill', formData.electricityBill);
// // //             if (formData.passportPhoto) companyPayload.append('passportPhoto', formData.passportPhoto);
 
// // //             console.log("Submitting company registration payload (FormData)...");
// // //             // You can log FormData entries for debugging (not in production)
// // //             // for (let pair of companyPayload.entries()) {
// // //             //     console.log(pair[0]+ ', ' + pair[1]);
// // //             // }
 
// // //             // Use the registerCompany function from adminService
// // //             const res = await registerCompany(companyPayload);
// // //             setSuccessMessage(res.message || "Company registered successfully!");
// // //             // Optionally, clear form or redirect after success
// // //         } catch (err) {
// // //             console.error("Company Registration Failed:", err);
// // //             setError(err.response?.data?.message || err.message || "Registration failed. Please try again.");
// // //         } finally {
// // //             setLoading(false);
// // //         }
// // //     };
 
// // //     const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
 
// // //     return (
// // //         <>
// // //             <Button variant="primary" onClick={() => setShowModal(true)}>
// // //                 Register Your Company
// // //             </Button>
 
// // //             <Modal show={showModal} onHide={handleClose} size="xl" centered scrollable backdrop="static">
// // //                 <Modal.Header closeButton>
// // //                     <Modal.Title>Company Registration</Modal.Title>
// // //                 </Modal.Header>
// // //                 <Modal.Body>
// // //                     {successMessage && <Alert variant="success">{successMessage}</Alert>}
// // //                     {error && <Alert variant="danger">{error}</Alert>}
 
// // //                     <Form onSubmit={handleSubmit}>
// // //                         {/* Basic Information */}
// // //                         <h4 className="mb-3">Basic Information</h4>
// // //                         <Row className="mb-3">
// // //                             <Form.Group as={Col} md="4">
// // //                                 <Form.Label>Company Name</Form.Label>
// // //                                 <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="4">
// // //                                 <Form.Label>Email</Form.Label>
// // //                                 <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="4">
// // //                                 <Form.Label>Phone</Form.Label>
// // //                                 <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
// // //                             </Form.Group>
// // //                         </Row>
 
// // //                         <Row className="mb-3">
// // //                             <Form.Group as={Col} md="4">
// // //                                 <Form.Label>Password</Form.Label>
// // //                                 <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
// // //                             </Form.Group>
// // //                              <Form.Group as={Col} md="4">
// // //                                 <Form.Label>Category</Form.Label>
// // //                                 <Form.Select name="category" value={formData.category} onChange={handleChange} required>
// // //                                     <option value="">Select Category</option>
// // //                                     {allCategories.map(cat => (
// // //                                         <option key={cat._id} value={cat._id}>{cat.name} ({cat.type})</option>
// // //                                     ))}
// // //                                 </Form.Select>
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="4">
// // //                                 <Form.Label>SubCategory</Form.Label>
// // //                                 <Form.Select name="subCategory" value={formData.subCategory} onChange={handleChange} disabled={!formData.category || filteredSubCategories.length === 0}>
// // //                                     <option value="">Select SubCategory (Optional)</option>
 
// // //   {filteredSubCategories.map(subCat => (
// // //                                         <option key={subCat._id} value={subCat._id}>{subCat.name}</option>
// // //                                     ))}
// // //                                 </Form.Select>
// // //                             </Form.Group>
// // //                         </Row>
 
// // //                         {/* Address */}
// // //                         <h4 className="mb-3 mt-4">Address Details</h4>
// // //                         <Row className="mb-3">
// // //                             <Form.Group as={Col} md="6">
// // //                                 <Form.Label>Address</Form.Label>
// // //                                 <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} />
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="2">
// // //                                 <Form.Label>City</Form.Label>
// // //                                 <Form.Control type="text" name="city" value={formData.city} onChange={handleChange} />
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="2">
// // //                                 <Form.Label>State</Form.Label>
// // //                                 <Form.Control type="text" name="state" value={formData.state} onChange={handleChange} />
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="2">
// // //                                 <Form.Label>Country</Form.Label>
// // //                                 <Form.Control type="text" name="country" value={formData.country} onChange={handleChange} />
// // //                             </Form.Group>
// // //                         </Row>
 
// // //                         {/* Documents & Company Type */}
// // //                         <h4 className="mb-3 mt-4">Documents & Business Type</h4>
// // //                         <Row className="mb-3">
// // //                             <Form.Group as={Col} md="4">
// // //                                 <Form.Label>GST Number</Form.Label>
// // //                                 <Form.Control type="text" name="gstNumber" value={formData.gstNumber} onChange={handleChange} />
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="4">
// // //                                 <Form.Label>Aadhaar Number</Form.Label>
// // //                                 <Form.Control type="text" name="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleChange} />
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="4">
// // //                                 <Form.Label>Company Type</Form.Label>
// // //                                 <Form.Control type="text" value={formData.companyType} readOnly disabled />
// // //                                 <Form.Text className="text-muted">Automatically set by selected category.</Form.Text>
// // //                             </Form.Group>
// // //                         </Row>
 
// // //                         {/* Other Details */}
// // //                         <h4 className="mb-3 mt-4">Additional Details</h4>
// // //                         <Row className="mb-3">
// // //                             <Form.Group as={Col} md="6">
// // //                                 <Form.Label>Website (URL)</Form.Label>
// // //                                 <Form.Control type="url" name="website" value={formData.website} onChange={handleChange} />
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="6">
// // //                                 <Form.Label>Google Maps Link</Form.Label>
// // //                                 <Form.Control type="url" name="googleMapsLink" value={formData.googleMapsLink} onChange={handleChange} />
// // //                             </Form.Group>
// // //                         </Row>
 
// // //                         <Form.Group className="mb-3">
// // //                             <Form.Label>Description</Form.Label>
// // //                             <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} />
// // //                         </Form.Group>
 
// // //                         {/* Social Links */}
// // //                         <h5 className="mb-3 mt-4">Social Links</h5>
// // //                         {socialLinks.map((link, index) => (
// // //                             <InputGroup className="mb-2" key={`social-${index}`}>
// // //                                 <Form.Control
// // //                                     type="url"
// // //                                     placeholder="e.g., https://facebook.com/yourpage"
// // //                                     value={link}
// // //                                     onChange={(e) => handleSocialLinkChange(index, e.target.value)}
// // //                                 />
// // //                                 <Button variant="outline-danger" onClick={() => removeSocialLink(index)} disabled={socialLinks.length === 1}>
// // //                                     Remove
// // //                                 </Button>
// // //                             </InputGroup>
// // //                         ))}
// // //                         <Button variant="outline-secondary" size="sm" onClick={addSocialLink}>
// // //                             + Add Another Social Link
// // //                         </Button>
 
// // //                         {/* Keywords */}
// // //                         <h5 className="mb-3 mt-4">Keywords</h5>
// // //                         {keywords.map((keyword, index) => (
// // //                             <InputGroup className="mb-2" key={`keyword-${index}`}>
// // //                                 <Form.Control
// // //                                     type="text"
// // //                                     placeholder="e.g., digital marketing, web design"
// // //                                     value={keyword}
// // //                                     onChange={(e) => handleKeywordChange(index, e.target.value)}
// // //                                 />
// // //                                 <Button variant="outline-danger" onClick={() => removeKeyword(index)} disabled={keywords.length === 1}>
// // //                                     Remove
// // //                                 </Button>
// // //                             </InputGroup>
// // //                         ))}
// // //                         <Button variant="outline-secondary" size="sm" onClick={addKeyword}>
// // //                             + Add Another Keyword
// // //                         </Button>
 
// // //                         {/* Business Timings */}
// // //                         <h4 className="mb-3 mt-4">Business Timings</h4>
// // //                         {daysOfWeek.map(day => (
// // //                             <Row className="mb-2 align-items-center" key={day}>
// // //                                 <Col md="2">
// // //                                     <Form.Label className="text-capitalize">{day}</Form.Label>
// // //                                 </Col>
// // //                                 <Col md="5">
// // //                                     <Form.Control
// // //                                         type="time"
// // //                                         value={businessTimings[day].open}
// // //                                         onChange={(e) => handleBusinessTimingChange(day, 'open', e.target.value)}
// // //                                     />
// // //                                 </Col>
// // //                                 <Col md="5">
// // //                                     <Form.Control
// // //                                         type="time"
// // //                                         value={businessTimings[day].close}
// // //                                         onChange={(e) => handleBusinessTimingChange(day, 'close', e.target.value)}
// // //                                     />
// // //                                 </Col>
// // //                             </Row>
// // //                         ))}
 
// // //                         {/* File Uploads */}
// // //                         <h4 className="mb-3 mt-4">Upload Documents & Media</h4>
// // //                         <Row className="mb-3">
// // //                             <Form.Group as={Col} md="6">
// // //                                 <Form.Label>Company Logo (Max 1)</Form.Label>
// // //                                 <Form.Control type="file" name="logo" accept="image/*" onChange={handleFileChange} />
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="6">
// // //                                 <Form.Label>Aadhaar Image (Max 1)</Form.Label>
// // //                                 <Form.Control type="file" name="aadhaar" accept="image/*,application/pdf" onChange={handleFileChange} />
// // //                             </Form.Group>
// // //                         </Row>
// // //                         <Row className="mb-3">
// // //                             <Form.Group as={Col} md="6">
// // //                                 <Form.Label>PAN Image (Max 1)</Form.Label>
// // //                                 <Form.Control type="file" name="pan" accept="image/*,application/pdf" onChange={handleFileChange} />
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="6">
// // //                                 <Form.Label>Electricity Bill (Max 1)</Form.Label>
// // //                                 <Form.Control type="file" name="electricityBill" accept="image/*,application/pdf" onChange={handleFileChange} />
// // //                             </Form.Group>
// // //                         </Row>
// // //                         <Row className="mb-3">
// // //                             <Form.Group as={Col} md="6">
// // //                                 <Form.Label>Passport Photo (Max 1)</Form.Label>
// // //                                 <Form.Control type="file" name="passportPhoto" accept="image/*" onChange={handleFileChange} />
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="6">
// // //                                 <Form.Label>Banner Images (Max 5)</Form.Label>
// // //                                 <Form.Control type="file" name="banner" accept="image/*" multiple onChange={handleFileChange} />
// // //                                 <Form.Text className="text-muted">You can select up to 5 banner images.</Form.Text>
// // //                             </Form.Group>
// // //                         </Row>
 
// // //                         <div className="d-flex justify-content-end mt-4">
// // //                             <Button variant="secondary" onClick={handleClose} className="me-2">
// // //                                 Close
// // //                             </Button>
// // //                             <Button variant="primary" type="submit" disabled={loading}>
// // //                                 {loading ? <Spinner animation="border" size="sm" /> : "Register Company"}
// // //                             </Button>
// // //                         </div>
// // //                     </Form>
// // //                 </Modal.Body>
// // //             </Modal>
// // //         </>
// // //     );
// // // };
 
// // // export default CompanyRegistrationForm;

// // // import React, { useState, useEffect } from 'react';
// // // import {
// // //     Modal, Button, Form, Row, Col, Alert, Spinner, InputGroup
// // // } from 'react-bootstrap';
// // // import {
// // //     registerCompany,
// // //     getAllCompanyCategories,
// // //     getAllCompanySubCategories,
// // //     getStatesByCountry,
// // //     getCitiesByState,
// // // } from '../Services/authApi';

// // // // Helper to get the current token dynamically from localStorage
// // // const getToken = () => localStorage.getItem('token');

// // // // Helper to create authorized headers for FormData dynamically (though registerCompany handles this internally if it's a direct API call)
// // // // const getAuthHeadersForFormData = () => ({
// // // //   headers: {
// // // //     Authorization: `Bearer ${getToken()}`,
// // // //   },
// // // // });

// // // // A small custom hook for managing dynamic array inputs (e.g., social links, keywords)
// // // const useArrayInput = (initialValue = ['']) => {
// // //     const [items, setItems] = useState(initialValue);

// // //     const handleItemChange = (index, value) => {
// // //         const newItems = [...items];
// // //         newItems[index] = value;
// // //         setItems(newItems);
// // //     };

// // //     const addItem = () => setItems([...items, '']);
// // //     const removeItem = (index) => setItems(items.filter((_, i) => i !== index));

// // //     return [items, handleItemChange, addItem, removeItem, setItems];
// // // };

// // // // IMPORTANT: Updated with the correct _id for "India" from your backend database response.
// // // const INDIA_DEFAULT_COUNTRY_ID = "687a1e2185f0230715032380";

// // // const CompanyRegistrationForm = () => {
// // //     const [showModal, setShowModal] = useState(false);
// // //     const [loading, setLoading] = useState(false);
// // //     const [error, setError] = useState('');
// // //     const [successMessage, setSuccessMessage] = useState('');

// // //     const [allCategories, setAllCategories] = useState([]);
// // //     const [allSubCategories, setAllSubCategories] = useState([]);
// // //     const [filteredSubCategories, setFilteredSubCategories] = useState([]);

// // //     const [allStates, setAllStates] = useState([]);
// // //     const [allCities, setAllCities] = useState([]);

// // //     const [formData, setFormData] = useState({
// // //         name: '', email: '', phone: '', password: '',
// // //         address: '',
// // //         city: '',
// // //         state: '',
// // //         country: INDIA_DEFAULT_COUNTRY_ID,
// // //         gstNumber: '', aadhaarNumber: '',
// // //         category: '', subCategory: '', companyType: 'service',
// // //         website: '', googleMapsLink: '', description: '',
// // //         logo: null,
// // //         banner: [],
// // //         aadhaar: null,
// // //         pan: null,
// // //         electricityBill: null,
// // //         passportPhoto: null,
// // //     });

// // //     const [socialLinks, handleSocialLinkChange, addSocialLink, removeSocialLink, setSocialLinks] = useArrayInput(['']);
// // //     const [keywords, handleKeywordChange, addKeyword, removeKeyword, setKeywords] = useArrayInput(['']);

// // //     const initialBusinessTimings = {
// // //         sunday: { open: '', close: '', isClosed: false },
// // //         monday: { open: '', close: '', isClosed: false },
// // //         tuesday: { open: '', close: '', isClosed: false },
// // //         wednesday: { open: '', close: '', isClosed: false },
// // //         thursday: { open: '', close: '', isClosed: false },
// // //         friday: { open: '', close: '', isClosed: false },
// // //         saturday: { open: '', close: '', isClosed: false },
// // //     };
// // //     const [businessTimings, setBusinessTimings] = useState(initialBusinessTimings);

// // //     // Effect to fetch categories/subcategories and initial states for the default country (India)
// // //     useEffect(() => {
// // //         const fetchInitialLookupData = async () => {
// // //             setLoading(true);
// // //             setError('');
// // //             try {
// // //                 const categoriesRes = await getAllCompanyCategories();
// // //                 setAllCategories(categoriesRes?.data || []);

// // //                 const subCategoriesRes = await getAllCompanySubCategories();
// // //                 setAllSubCategories(subCategoriesRes.data || []);

// // //                 if (INDIA_DEFAULT_COUNTRY_ID) {
// // //                     const statesRes = await getStatesByCountry(INDIA_DEFAULT_COUNTRY_ID);
// // //                     setAllStates(statesRes?.data || []);
// // //                 }
// // //             } catch (err) {
// // //                 console.error("Error fetching initial lookup data:", err);
// // //                 setError(err.response?.data?.message || err.message || "Failed to load essential data (categories, subcategories, states).");
// // //             } finally {
// // //                 setLoading(false);
// // //             }
// // //         };
// // //         fetchInitialLookupData();
// // //     }, []);

// // //     // Effect to filter subcategories based on selected category
// // //     useEffect(() => {
// // //         if (formData.category) {
// // //             const categoryObj = allCategories.find(cat => cat._id === formData.category);
// // //             setFormData(prev => ({ ...prev, companyType: categoryObj ? categoryObj.type : 'service' }));
// // //             const filtered = allSubCategories.filter(
// // //                 sub => String(sub.parentCategory?._id || sub.parentCategory) === String(formData.category)
// // //             );
// // //             setFilteredSubCategories(filtered);
// // //             setFormData(prev => ({ ...prev, subCategory: '' }));
// // //         } else {
// // //             setFilteredSubCategories([]);
// // //         }
// // //     }, [formData.category, allCategories, allSubCategories]);

// // //     // Effect to fetch cities when state changes
// // //     useEffect(() => {
// // //         const fetchCities = async () => {
// // //             if (formData.state) {
// // //                 setLoading(true);
// // //                 setError('');
// // //                 try {
// // //                     const citiesRes = await getCitiesByState(formData.state);
// // //                     setAllCities(citiesRes?.data || []);
// // //                     setFormData(prev => ({ ...prev, city: '' }));
// // //                 } catch (err) {
// // //                     console.error(`Error fetching cities for state ${formData.state}:`, err);
// // //                     setError(err.response?.data?.message || err.message || "Failed to load cities for the selected state.");
// // //                 } finally {
// // //                     setLoading(false);
// // //                 }
// // //             } else {
// // //                 setAllCities([]);
// // //                 setFormData(prev => ({ ...prev, city: '' }));
// // //             }
// // //         };
// // //         fetchCities();
// // //     }, [formData.state]);

// // //     const handleChange = (e) => {
// // //         const { name, value } = e.target;
// // //         setFormData(prev => ({ ...prev, [name]: value }));
// // //     };

// // //     const handleFileChange = (e) => {
// // //         const { name, files } = e.target;
// // //         if (name === 'banner') {
// // //             setFormData(prev => ({ ...prev, [name]: Array.from(files) }));
// // //         } else {
// // //             setFormData(prev => ({ ...prev, [name]: files[0] }));
// // //         }
// // //     };

// // //     const handleBusinessTimingChange = (day, field, value) => {
// // //         setBusinessTimings(prev => ({
// // //             ...prev,
// // //             [day]: { ...prev[day], [field]: value }
// // //         }));
// // //     };

// // //     const handleBusinessTimingToggleClosed = (day) => {
// // //         setBusinessTimings(prev => ({
// // //             ...prev,
// // //             [day]: {
// // //                 ...prev[day],
// // //                 isClosed: !prev[day].isClosed,
// // //                 open: prev[day].isClosed ? '' : '09:00', // Default opening time if unchecking closed
// // //                 close: prev[day].isClosed ? '' : '17:00' // Default closing time if unchecking closed
// // //             }
// // //         }));
// // //     };


// // //     const handleClose = () => {
// // //         setShowModal(false);
// // //         setFormData({
// // //             name: '', email: '', phone: '', password: '',
// // //             address: '', city: '', state: '', country: INDIA_DEFAULT_COUNTRY_ID,
// // //             gstNumber: '', aadhaarNumber: '',
// // //             category: '', subCategory: '', companyType: 'service',
// // //             website: '', googleMapsLink: '', description: '',
// // //             logo: null, banner: [], aadhaar: null, pan: null,
// // //             electricityBill: null, passportPhoto: null,
// // //         });
// // //         setSocialLinks(['']);
// // //         setKeywords(['']);
// // //         setBusinessTimings(initialBusinessTimings);
// // //         setError('');
// // //         setSuccessMessage('');
// // //         setAllStates([]); // Clear states/cities on modal close to ensure fresh fetch next time
// // //         setAllCities([]);
// // //     };

// // //     const handleSubmit = async (e) => {
// // //         e.preventDefault();
// // //         setLoading(true);
// // //         setError('');
// // //         setSuccessMessage('');

// // //         try {
// // //             const companyPayload = new FormData();

// // //             for (const key in formData) {
// // //                 if (['logo', 'banner', 'aadhaar', 'pan', 'electricityBill', 'passportPhoto'].includes(key)) {
// // //                     continue;
// // //                 }
// // //                 if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
// // //                     companyPayload.append(key, formData[key]);
// // //                 }
// // //             }

// // //             companyPayload.append('socialLinks', JSON.stringify(socialLinks.filter(link => link.trim() !== '')));
// // //             companyPayload.append('keywords', JSON.stringify(keywords.filter(keyword => keyword.trim() !== '')));
            
// // //             // Format business timings before appending
// // //             const formattedTimings = {};
// // //             for (const day in businessTimings) {
// // //                 if (businessTimings[day].isClosed) {
// // //                     formattedTimings[day] = { open: 'Closed', close: 'Closed' };
// // //                 } else {
// // //                     formattedTimings[day] = {
// // //                         open: businessTimings[day].open || 'Closed', // Default to 'Closed' if empty
// // //                         close: businessTimings[day].close || 'Closed'
// // //                     };
// // //                 }
// // //             }
// // //             companyPayload.append('businessTimings', JSON.stringify(formattedTimings));

// // //             if (formData.logo) companyPayload.append('logo', formData.logo);
// // //             formData.banner.forEach(file => companyPayload.append('banner', file));
// // //             if (formData.aadhaar) companyPayload.append('aadhaar', formData.aadhaar);
// // //             if (formData.pan) companyPayload.append('pan', formData.pan);
// // //             if (formData.electricityBill) companyPayload.append('electricityBill', formData.electricityBill);
// // //             if (formData.passportPhoto) companyPayload.append('passportPhoto', formData.passportPhoto);

// // //             console.log("Submitting company registration payload (FormData)...");
// // //             for (let pair of companyPayload.entries()) {
// // //                  console.log(pair[0]+ ', ' + pair[1]);
// // //             }

// // //             const res = await registerCompany(companyPayload);
// // //             setSuccessMessage(res.message || "Company registered successfully!");
// // //             // setTimeout(handleClose, 3000); // Auto-close after 3 seconds
// // //         } catch (err) {
// // //             console.error("Company Registration Failed:", err);
// // //             setError(err.response?.data?.message || err.message || "Registration failed. Please try again.");
// // //         } finally {
// // //             setLoading(false);
// // //         }
// // //     };

// // //     const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

// // //     return (
// // //         <>
// // //             <Button variant="outline-light" className="fw-bold py-2 px-4 rounded-pill" onClick={() => setShowModal(true)}>
// // //                 Register Your Company
// // //             </Button>

// // //             <Modal show={showModal} onHide={handleClose} size="xl" centered scrollable backdrop="static">
// // //                 <Modal.Header closeButton className="bg-primary text-white">
// // //                     <Modal.Title>
// // //                         <i className="bi bi-building me-2"></i> Company Registration
// // //                     </Modal.Title>
// // //                 </Modal.Header>
// // //                 <Modal.Body className="p-4">
// // //                     {successMessage && <Alert variant="success" className="text-center">{successMessage}</Alert>}
// // //                     {error && <Alert variant="danger" className="text-center">{error}</Alert>}

// // //                     <Form onSubmit={handleSubmit}>
// // //                         {/* Basic Information */}
// // //                         <h4 className="mb-3 text-primary border-bottom pb-2">Basic Information</h4>
// // //                         <Row className="mb-3 g-3">
// // //                             <Form.Group as={Col} md="4">
// // //                                 <Form.Label className="fw-bold">Company Name <span className="text-danger">*</span></Form.Label>
// // //                                 <Form.Control
// // //                                     type="text"
// // //                                     name="name"
// // //                                     value={formData.name}
// // //                                     onChange={handleChange}
// // //                                     placeholder="Enter company's legal name"
// // //                                     required
// // //                                 />
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="4">
// // //                                 <Form.Label className="fw-bold">Email <span className="text-danger">*</span></Form.Label>
// // //                                 <Form.Control
// // //                                     type="email"
// // //                                     name="email"
// // //                                     value={formData.email}
// // //                                     onChange={handleChange}
// // //                                     placeholder="e.g., info@company.com"
// // //                                     required
// // //                                 />
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="4">
// // //                                 <Form.Label className="fw-bold">Phone <span className="text-danger">*</span></Form.Label>
// // //                                 <Form.Control
// // //                                     type="tel"
// // //                                     name="phone"
// // //                                     value={formData.phone}
// // //                                     onChange={handleChange}
// // //                                     placeholder="e.g., +91-9876543210"
// // //                                     required
// // //                                 />
// // //                             </Form.Group>
// // //                         </Row>

// // //                         <Row className="mb-4 g-3">
// // //                             <Form.Group as={Col} md="4">
// // //                                 <Form.Label className="fw-bold">Password <span className="text-danger">*</span></Form.Label>
// // //                                 <Form.Control
// // //                                     type="password"
// // //                                     name="password"
// // //                                     value={formData.password}
// // //                                     onChange={handleChange}
// // //                                     placeholder="Set a password for company login"
// // //                                     required
// // //                                 />
// // //                             </Form.Group>
// // //                              <Form.Group as={Col} md="4">
// // //                                 <Form.Label className="fw-bold">Category <span className="text-danger">*</span></Form.Label>
// // //                                 <Form.Select
// // //                                     name="category"
// // //                                     value={formData.category}
// // //                                     onChange={handleChange}
// // //                                     required
// // //                                     disabled={loading}
// // //                                 >
// // //                                     <option value="">Select Category</option>
// // //                                     {allCategories.map(cat => (
// // //                                         <option key={cat._id} value={cat._id}>{cat.name} ({cat.type.charAt(0).toUpperCase() + cat.type.slice(1)})</option>
// // //                                     ))}
// // //                                 </Form.Select>
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="4">
// // //                                 <Form.Label className="fw-bold">SubCategory</Form.Label>
// // //                                 <Form.Select
// // //                                     name="subCategory"
// // //                                     value={formData.subCategory}
// // //                                     onChange={handleChange}
// // //                                     disabled={!formData.category || filteredSubCategories.length === 0 || loading}
// // //                                 >
// // //                                     <option value="">Select SubCategory (Optional)</option>
// // //                                     {filteredSubCategories.map(subCat => (
// // //                                         <option key={subCat._id} value={subCat._id}>{subCat.name}</option>
// // //                                     ))}
// // //                                 </Form.Select>
// // //                             </Form.Group>
// // //                         </Row>

// // //                         {/* Address Details - Country, State, City integrated */}
// // //                         <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Address Details</h4>
// // //                         <Row className="mb-4 g-3">
// // //                             <Form.Group as={Col} md="6">
// // //                                 <Form.Label className="fw-bold">Address</Form.Label>
// // //                                 <Form.Control
// // //                                     type="text"
// // //                                     name="address"
// // //                                     value={formData.address}
// // //                                     onChange={handleChange}
// // //                                     placeholder="Street, Building, Locality"
// // //                                 />
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="2">
// // //                                 <Form.Label className="fw-bold">Country</Form.Label>
// // //                                 <Form.Control
// // //                                     type="text"
// // //                                     value="India"
// // //                                     readOnly
// // //                                     disabled
// // //                                     className="bg-light"
// // //                                 />
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="2">
// // //                                 <Form.Label className="fw-bold">State <span className="text-danger">*</span></Form.Label>
// // //                                 <Form.Select
// // //                                     name="state"
// // //                                     value={formData.state}
// // //                                     onChange={handleChange}
// // //                                     required
// // //                                     disabled={loading || allStates.length === 0}
// // //                                 >
// // //                                     <option value="">Select State</option>
// // //                                     {allStates.map(s => (
// // //                                         <option key={s._id} value={s._id}>{s.name}</option>
// // //                                     ))}
// // //                                 </Form.Select>
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="2">
// // //                                 <Form.Label className="fw-bold">City <span className="text-danger">*</span></Form.Label>
// // //                                 <Form.Select
// // //                                     name="city"
// // //                                     value={formData.city}
// // //                                     onChange={handleChange}
// // //                                     required
// // //                                     disabled={!formData.state || allCities.length === 0 || loading}
// // //                                 >
// // //                                     <option value="">Select City</option>
// // //                                     {allCities.map(c => (
// // //                                         <option key={c._id} value={c._id}>{c.name}</option>
// // //                                     ))}
// // //                                 </Form.Select>
// // //                             </Form.Group>
// // //                         </Row>

// // //                         {/* Documents & Company Type */}
// // //                         <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Documents & Business Type</h4>
// // //                         <Row className="mb-4 g-3">
// // //                             <Form.Group as={Col} md="4">
// // //                                 <Form.Label className="fw-bold">GST Number</Form.Label>
// // //                                 <Form.Control
// // //                                     type="text"
// // //                                     name="gstNumber"
// // //                                     value={formData.gstNumber}
// // //                                     onChange={handleChange}
// // //                                     placeholder="Optional: Enter GSTIN"
// // //                                 />
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="4">
// // //                                 <Form.Label className="fw-bold">Aadhaar Number</Form.Label>
// // //                                 <Form.Control
// // //                                     type="text"
// // //                                     name="aadhaarNumber"
// // //                                     value={formData.aadhaarNumber}
// // //                                     onChange={handleChange}
// // //                                     placeholder="Optional: Enter Aadhaar Number"
// // //                                 />
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="4">
// // //                                 <Form.Label className="fw-bold">Company Type</Form.Label>
// // //                                 <Form.Control
// // //                                     type="text"
// // //                                     value={formData.companyType.charAt(0).toUpperCase() + formData.companyType.slice(1)}
// // //                                     readOnly
// // //                                     disabled
// // //                                     className="bg-light"
// // //                                 />
// // //                                 <Form.Text className="text-muted">
// // //                                     Automatically set by selected category.
// // //                                 </Form.Text>
// // //                             </Form.Group>
// // //                         </Row>

// // //                         {/* Other Details */}
// // //                         <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Additional Details</h4>
// // //                         <Row className="mb-3 g-3">
// // //                             <Form.Group as={Col} md="6">
// // //                                 <Form.Label className="fw-bold">Website (URL)</Form.Label>
// // //                                 <Form.Control
// // //                                     type="url"
// // //                                     name="website"
// // //                                     value={formData.website}
// // //                                     onChange={handleChange}
// // //                                     placeholder="e.g., https://www.yourcompany.com"
// // //                                 />
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="6">
// // //                                 <Form.Label className="fw-bold">Google Maps Link</Form.Label>
// // //                                 <Form.Control
// // //                                     type="url"
// // //                                     name="googleMapsLink"
// // //                                     value={formData.googleMapsLink}
// // //                                     onChange={handleChange}
// // //                                     placeholder="Paste Google Maps URL here"
// // //                                 />
// // //                             </Form.Group>
// // //                         </Row>

// // //                         <Form.Group className="mb-4">
// // //                             <Form.Label className="fw-bold">Description</Form.Label>
// // //                             <Form.Control
// // //                                 as="textarea"
// // //                                 rows={3}
// // //                                 name="description"
// // //                                 value={formData.description}
// // //                                 onChange={handleChange}
// // //                                 placeholder="Provide a brief description of your company and its services/products."
// // //                             />
// // //                         </Form.Group>

// // //                         {/* Social Links */}
// // //                         <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Social Links</h4>
// // //                         {socialLinks.map((link, index) => (
// // //                             <InputGroup className="mb-2" key={`social-${index}`}>
// // //                                 <InputGroup.Text className="bg-light">
// // //                                     <i className="bi bi-link-45deg"></i>
// // //                                 </InputGroup.Text>
// // //                                 <Form.Control
// // //                                     type="url"
// // //                                     placeholder="e.g., https://facebook.com/yourpage"
// // //                                     value={link}
// // //                                     onChange={(e) => handleSocialLinkChange(index, e.target.value)}
// // //                                 />
// // //                                 {socialLinks.length > 1 && (
// // //                                     <Button variant="outline-danger" onClick={() => removeSocialLink(index)}>
// // //                                         <i className="bi bi-trash"></i>
// // //                                     </Button>
// // //                                 )}
// // //                             </InputGroup>
// // //                         ))}
// // //                         <Button variant="outline-success" size="sm" onClick={addSocialLink} className="mb-4">
// // //                             <i className="bi bi-plus-circle me-1"></i> Add Another Social Link
// // //                         </Button>

// // //                         {/* Keywords */}
// // //                         <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Keywords</h4>
// // //                         <Form.Text className="text-muted mb-2 d-block">
// // //                             Enter keywords that best describe your business (e.g., "digital marketing", "web design"). These help customers find you.
// // //                         </Form.Text>
// // //                         {keywords.map((keyword, index) => (
// // //                             <InputGroup className="mb-2" key={`keyword-${index}`}>
// // //                                 <InputGroup.Text className="bg-light">
// // //                                     <i className="bi bi-tag"></i>
// // //                                 </InputGroup.Text>
// // //                                 <Form.Control
// // //                                     type="text"
// // //                                     placeholder="e.g., restaurant, plumbing, lawyer"
// // //                                     value={keyword}
// // //                                     onChange={(e) => handleKeywordChange(index, e.target.value)}
// // //                                 />
// // //                                 {keywords.length > 1 && (
// // //                                     <Button variant="outline-danger" onClick={() => removeKeyword(index)}>
// // //                                         <i className="bi bi-trash"></i>
// // //                                     </Button>
// // //                                 )}
// // //                             </InputGroup>
// // //                         ))}
// // //                         <Button variant="outline-success" size="sm" onClick={addKeyword} className="mb-4">
// // //                             <i className="bi bi-plus-circle me-1"></i> Add Another Keyword
// // //                         </Button>

// // //                         {/* Business Timings */}
// // //                         <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Business Timings</h4>
// // //                         <p className="text-muted">Set your opening and closing times for each day. Leave blank or check "Closed" if not applicable.</p>
// // //                         {daysOfWeek.map(day => (
// // //                             <Row className="mb-2 align-items-center g-2" key={day}>
// // //                                 <Col md="2">
// // //                                     <Form.Check
// // //                                         type="checkbox"
// // //                                         label={<span className="text-capitalize fw-bold">{day}</span>}
// // //                                         checked={businessTimings[day].isClosed}
// // //                                         onChange={() => handleBusinessTimingToggleClosed(day)}
// // //                                     />
// // //                                 </Col>
// // //                                 <Col md="5">
// // //                                     <Form.Control
// // //                                         type="time"
// // //                                         value={businessTimings[day].open}
// // //                                         onChange={(e) => handleBusinessTimingChange(day, 'open', e.target.value)}
// // //                                         disabled={businessTimings[day].isClosed}
// // //                                     />
// // //                                 </Col>
// // //                                 <Col md="5">
// // //                                     <Form.Control
// // //                                         type="time"
// // //                                         value={businessTimings[day].close}
// // //                                         onChange={(e) => handleBusinessTimingChange(day, 'close', e.target.value)}
// // //                                         disabled={businessTimings[day].isClosed}
// // //                                     />
// // //                                 </Col>
// // //                             </Row>
// // //                         ))}

// // //                         {/* File Uploads */}
// // //                         <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Upload Documents & Media</h4>
// // //                         <p className="text-muted">Upload required documents and media files for your company profile.</p>
// // //                         <Row className="mb-3 g-3">
// // //                             <Form.Group as={Col} md="6">
// // //                                 <Form.Label className="fw-bold">Company Logo (Max 1) <span className="text-danger">*</span></Form.Label>
// // //                                 <Form.Control type="file" name="logo" accept="image/*" onChange={handleFileChange} required />
// // //                                 <Form.Text className="text-muted">Accepts image files (e.g., JPG, PNG).</Form.Text>
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="6">
// // //                                 <Form.Label className="fw-bold">Aadhaar Image (Max 1)</Form.Label>
// // //                                 <Form.Control type="file" name="aadhaar" accept="image/*,application/pdf" onChange={handleFileChange} />
// // //                                 <Form.Text className="text-muted">Accepts image or PDF files.</Form.Text>
// // //                             </Form.Group>
// // //                         </Row>
// // //                         <Row className="mb-3 g-3">
// // //                             <Form.Group as={Col} md="6">
// // //                                 <Form.Label className="fw-bold">PAN Image (Max 1)</Form.Label>
// // //                                 <Form.Control type="file" name="pan" accept="image/*,application/pdf" onChange={handleFileChange} />
// // //                                 <Form.Text className="text-muted">Accepts image or PDF files.</Form.Text>
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="6">
// // //                                 <Form.Label className="fw-bold">Electricity Bill (Max 1)</Form.Label>
// // //                                 <Form.Control type="file" name="electricityBill" accept="image/*,application/pdf" onChange={handleFileChange} />
// // //                                 <Form.Text className="text-muted">Accepts image or PDF files.</Form.Text>
// // //                             </Form.Group>
// // //                         </Row>
// // //                         <Row className="mb-4 g-3">
// // //                             <Form.Group as={Col} md="6">
// // //                                 <Form.Label className="fw-bold">Passport Photo (Max 1)</Form.Label>
// // //                                 <Form.Control type="file" name="passportPhoto" accept="image/*" onChange={handleFileChange} />
// // //                                 <Form.Text className="text-muted">Accepts image files (e.g., JPG, PNG).</Form.Text>
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="6">
// // //                                 <Form.Label className="fw-bold">Banner Images (Max 5)</Form.Label>
// // //                                 <Form.Control type="file" name="banner" accept="image/*" multiple onChange={handleFileChange} />
// // //                                 <Form.Text className="text-muted">You can select up to 5 banner images (JPG, PNG).</Form.Text>
// // //                             </Form.Group>
// // //                         </Row>

// // //                         <div className="d-flex justify-content-end mt-4 pt-3 border-top">
// // //                             <Button variant="secondary" onClick={handleClose} className="me-2">
// // //                                 Close
// // //                             </Button>
// // //                             <Button variant="primary" type="submit" disabled={loading}>
// // //                                 {loading ? <><Spinner animation="border" size="sm" className="me-2" /> Registering...</> : "Register Company"}
// // //                             </Button>
// // //                         </div>
// // //                     </Form>
// // //                 </Modal.Body>
// // //             </Modal>
// // //         </>
// // //     );
// // // };

// // // export default CompanyRegistrationForm;



// // // import React, { useState, useEffect } from 'react';
// // // import {
// // //     Modal, Button, Form, Row, Col, Alert, Spinner, InputGroup
// // // } from 'react-bootstrap';
// // // import {
// // //     registerCompany,
// // //     getAllCompanyCategories,
// // //     getAllCompanySubCategories,
// // //     getStatesByCountry,
// // //     getCitiesByState,
// // // } from '../Services/authApi';

// // // // Helper to get the current token dynamically from localStorage
// // // const getToken = () => localStorage.getItem('token');

// // // // A small custom hook for managing dynamic array inputs (e.g., social links, keywords)
// // // const useArrayInput = (initialValue = ['']) => {
// // //     const [items, setItems] = useState(initialValue);

// // //     const handleItemChange = (index, value) => {
// // //         const newItems = [...items];
// // //         newItems[index] = value;
// // //         setItems(newItems);
// // //     };

// // //     const addItem = () => setItems([...items, '']);
// // //     const removeItem = (index) => setItems(items.filter((_, i) => i !== index));

// // //     return [items, handleItemChange, addItem, removeItem, setItems];
// // // };

// // // // IMPORTANT: Updated with the correct _id for "India" from your backend database response.
// // // const INDIA_DEFAULT_COUNTRY_ID = "687a1e2185f0230715032380";

// // // const CompanyRegistrationForm = () => {
// // //     const [showModal, setShowModal] = useState(false);
// // //     const [loading, setLoading] = useState(false);
// // //     const [error, setError] = useState('');
// // //     const [successMessage, setSuccessMessage] = useState('');

// // //     const [allCategories, setAllCategories] = useState([]);
// // //     const [allSubCategories, setAllSubCategories] = useState([]);
// // //     const [filteredSubCategories, setFilteredSubCategories] = useState([]);

// // //     const [allStates, setAllStates] = useState([]);
// // //     const [allCities, setAllCities] = useState([]);

// // //     const [formData, setFormData] = useState({
// // //         name: '', email: '', phone: '', password: '',
// // //         address: '',
// // //         city: '',
// // //         state: '',
// // //         country: INDIA_DEFAULT_COUNTRY_ID,
// // //         gstNumber: '', aadhaarNumber: '',
// // //         category: '', subCategory: '', companyType: 'service',
// // //         website: '', googleMapsLink: '', description: '',
// // //         logo: null,
// // //         banner: [],
// // //         aadhaar: null,
// // //         pan: null,
// // //         electricityBill: null,
// // //         passportPhoto: null,
// // //     });

// // //     const [socialLinks, handleSocialLinkChange, addSocialLink, removeSocialLink, setSocialLinks] = useArrayInput(['']);
// // //     const [keywords, handleKeywordChange, addKeyword, removeKeyword, setKeywords] = useArrayInput(['']);

// // //     const initialBusinessTimings = {
// // //         sunday: { open: '', close: '', isClosed: false },
// // //         monday: { open: '', close: '', isClosed: false },
// // //         tuesday: { open: '', close: '', isClosed: false },
// // //         wednesday: { open: '', close: '', isClosed: false },
// // //         thursday: { open: '', close: '', isClosed: false },
// // //         friday: { open: '', close: '', isClosed: false },
// // //         saturday: { open: '', close: '', isClosed: false },
// // //     };
// // //     const [businessTimings, setBusinessTimings] = useState(initialBusinessTimings);

// // //     // नया स्टेट: उपयोगकर्ता के लॉगिन स्टेटस को ट्रैक करने के लिए
// // //     const [isLoggedIn, setIsLoggedIn] = useState(false);

// // //     // Effect to check login status
// // //     useEffect(() => {
// // //         const token = getToken();
// // //         setIsLoggedIn(!!token); // यदि टोकन मौजूद है, तो isLoggedIn true होगा
// // //     }, []); // यह केवल एक बार कंपोनेंट माउंट होने पर चलेगा


// // //     // Effect to fetch categories/subcategories and initial states for the default country (India)
// // //     useEffect(() => {
// // //         const fetchInitialLookupData = async () => {
// // //             // केवल तभी डेटा फेच करें जब उपयोगकर्ता लॉग इन हो
// // //             if (!isLoggedIn) {
// // //                 // setLoading(false); // यदि लॉग इन नहीं है तो लोडिंग बंद करें
// // //                 // setError("Please log in to register a company.");
// // //                 return;
// // //             }

// // //             setLoading(true);
// // //             setError('');
// // //             try {
// // //                 const categoriesRes = await getAllCompanyCategories();
// // //                 setAllCategories(categoriesRes?.data || []);

// // //                 const subCategoriesRes = await getAllCompanySubCategories();
// // //                 setAllSubCategories(subCategoriesRes.data || []);

// // //                 if (INDIA_DEFAULT_COUNTRY_ID) {
// // //                     const statesRes = await getStatesByCountry(INDIA_DEFAULT_COUNTRY_ID);
// // //                     setAllStates(statesRes?.data || []);
// // //                 }
// // //             } catch (err) {
// // //                 console.error("Error fetching initial lookup data:", err);
// // //                 setError(err.response?.data?.message || err.message || "Failed to load essential data (categories, subcategories, states).");
// // //             } finally {
// // //                 setLoading(false);
// // //             }
// // //         };
// // //         fetchInitialLookupData();
// // //     }, [isLoggedIn]); // isLoggedIn बदलने पर यह इफेक्ट दोबारा चलेगा

// // //     // Effect to filter subcategories based on selected category
// // //     useEffect(() => {
// // //         if (formData.category) {
// // //             const categoryObj = allCategories.find(cat => cat._id === formData.category);
// // //             setFormData(prev => ({ ...prev, companyType: categoryObj ? categoryObj.type : 'service' }));
// // //             const filtered = allSubCategories.filter(
// // //                 sub => String(sub.parentCategory?._id || sub.parentCategory) === String(formData.category)
// // //             );
// // //             setFilteredSubCategories(filtered);
// // //             setFormData(prev => ({ ...prev, subCategory: '' }));
// // //         } else {
// // //             setFilteredSubCategories([]);
// // //         }
// // //     }, [formData.category, allCategories, allSubCategories]);

// // //     // Effect to fetch cities when state changes
// // //     useEffect(() => {
// // //         const fetchCities = async () => {
// // //             if (formData.state) {
// // //                 // setLoading(true); // शहरों को फेच करते समय लोडिंग नहीं दिखाना बेहतर है ताकि पूरे फॉर्म को ब्लॉक न करें
// // //                 setError('');
// // //                 try {
// // //                     const citiesRes = await getCitiesByState(formData.state);
// // //                     setAllCities(citiesRes?.data || []);
// // //                     setFormData(prev => ({ ...prev, city: '' }));
// // //                 } catch (err) {
// // //                     console.error(`Error fetching cities for state ${formData.state}:`, err);
// // //                     setError(err.response?.data?.message || err.message || "Failed to load cities for the selected state.");
// // //                 } // finally { setLoading(false); } // यहाँ setLoading(false) की आवश्यकता नहीं है
// // //             } else {
// // //                 setAllCities([]);
// // //                 setFormData(prev => ({ ...prev, city: '' }));
// // //             }
// // //         };
// // //         fetchCities();
// // //     }, [formData.state]); // formData.state बदलने पर यह इफेक्ट दोबारा चलेगा

// // //     const handleChange = (e) => {
// // //         const { name, value } = e.target;
// // //         setFormData(prev => ({ ...prev, [name]: value }));
// // //     };

// // //     const handleFileChange = (e) => {
// // //         const { name, files } = e.target;
// // //         if (name === 'banner') {
// // //             setFormData(prev => ({ ...prev, [name]: Array.from(files) }));
// // //         } else {
// // //             setFormData(prev => ({ ...prev, [name]: files[0] }));
// // //         }
// // //     };

// // //     const handleBusinessTimingChange = (day, field, value) => {
// // //         setBusinessTimings(prev => ({
// // //             ...prev,
// // //             [day]: { ...prev[day], [field]: value }
// // //         }));
// // //     };

// // //     const handleBusinessTimingToggleClosed = (day) => {
// // //         setBusinessTimings(prev => ({
// // //             ...prev,
// // //             [day]: {
// // //                 ...prev[day],
// // //                 isClosed: !prev[day].isClosed,
// // //                 open: prev[day].isClosed ? '' : '09:00', // Default opening time if unchecking closed
// // //                 close: prev[day].isClosed ? '' : '17:00' // Default closing time if unchecking closed
// // //             }
// // //         }));
// // //     };


// // //     const handleClose = () => {
// // //         setShowModal(false);
// // //         // फॉर्म को रीसेट करें
// // //         setFormData({
// // //             name: '', email: '', phone: '', password: '',
// // //             address: '', city: '', state: '', country: INDIA_DEFAULT_COUNTRY_ID,
// // //             gstNumber: '', aadhaarNumber: '',
// // //             category: '', subCategory: '', companyType: 'service',
// // //             website: '', googleMapsLink: '', description: '',
// // //             logo: null, banner: [], aadhaar: null, pan: null,
// // //             electricityBill: null, passportPhoto: null,
// // //         });
// // //         setSocialLinks(['']);
// // //         setKeywords(['']);
// // //         setBusinessTimings(initialBusinessTimings);
// // //         setError('');
// // //         setSuccessMessage('');
// // //         setAllStates([]); // Clear states/cities on modal close to ensure fresh fetch next time
// // //         setAllCities([]);
// // //     };

// // //     const handleSubmit = async (e) => {
// // //         e.preventDefault();
// // //         setLoading(true);
// // //         setError('');
// // //         setSuccessMessage('');

// // //         if (!isLoggedIn) {
// // //             setError("You must be logged in to register a company.");
// // //             setLoading(false);
// // //             return;
// // //         }

// // //         try {
// // //             const companyPayload = new FormData();

// // //             for (const key in formData) {
// // //                 if (['logo', 'banner', 'aadhaar', 'pan', 'electricityBill', 'passportPhoto'].includes(key)) {
// // //                     continue;
// // //                 }
// // //                 if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
// // //                     companyPayload.append(key, formData[key]);
// // //                 }
// // //             }

// // //             companyPayload.append('socialLinks', JSON.stringify(socialLinks.filter(link => link.trim() !== '')));
// // //             companyPayload.append('keywords', JSON.stringify(keywords.filter(keyword => keyword.trim() !== '')));
            
// // //             // Format business timings before appending
// // //             const formattedTimings = {};
// // //             for (const day in businessTimings) {
// // //                 if (businessTimings[day].isClosed) {
// // //                     formattedTimings[day] = { open: 'Closed', close: 'Closed' };
// // //                 } else {
// // //                     formattedTimings[day] = {
// // //                         open: businessTimings[day].open || 'Closed', // Default to 'Closed' if empty
// // //                         close: businessTimings[day].close || 'Closed'
// // //                     };
// // //                 }
// // //             }
// // //             companyPayload.append('businessTimings', JSON.stringify(formattedTimings));

// // //             if (formData.logo) companyPayload.append('logo', formData.logo);
// // //             formData.banner.forEach(file => companyPayload.append('banner', file));
// // //             if (formData.aadhaar) companyPayload.append('aadhaar', formData.aadhaar);
// // //             if (formData.pan) companyPayload.append('pan', formData.pan);
// // //             if (formData.electricityBill) companyPayload.append('electricityBill', formData.electricityBill);
// // //             if (formData.passportPhoto) companyPayload.append('passportPhoto', formData.passportPhoto);

// // //             console.log("Submitting company registration payload (FormData)...");
// // //             for (let pair of companyPayload.entries()) {
// // //                  console.log(pair[0]+ ', ' + pair[1]);
// // //             }

// // //             const res = await registerCompany(companyPayload);
// // //             setSuccessMessage(res.message || "Company registered successfully!");
// // //             // setTimeout(handleClose, 3000); // Auto-close after 3 seconds
// // //         } catch (err) {
// // //             console.error("Company Registration Failed:", err);
// // //             setError(err.response?.data?.message || err.message || "Registration failed. Please try again.");
// // //         } finally {
// // //             setLoading(false);
// // //         }
// // //     };

// // //     const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

// // //     return (
// // //         <>
// // //             {isLoggedIn && ( // <-- यहाँ सशर्त रेंडरिंग (conditional rendering) लागू की गई है
// // //                 <Button variant="outline-light" className="fw-bold py-2 px-4 rounded-pill" onClick={() => setShowModal(true)}>
// // //                     Register Your Company
// // //                 </Button>
// // //             )}

// // //             <Modal show={showModal} onHide={handleClose} size="xl" centered scrollable backdrop="static">
// // //                 <Modal.Header closeButton className="bg-primary text-white">
// // //                     <Modal.Title>
// // //                         <i className="bi bi-building me-2"></i> Company Registration
// // //                     </Modal.Title>
// // //                 </Modal.Header>
// // //                 <Modal.Body className="p-4">
// // //                     {successMessage && <Alert variant="success" className="text-center">{successMessage}</Alert>}
// // //                     {error && <Alert variant="danger" className="text-center">{error}</Alert>}

// // //                     <Form onSubmit={handleSubmit}>
// // //                         {/* Basic Information */}
// // //                         <h4 className="mb-3 text-primary border-bottom pb-2">Basic Information</h4>
// // //                         <Row className="mb-3 g-3">
// // //                             <Form.Group as={Col} md="4">
// // //                                 <Form.Label className="fw-bold">Company Name <span className="text-danger">*</span></Form.Label>
// // //                                 <Form.Control
// // //                                     type="text"
// // //                                     name="name"
// // //                                     value={formData.name}
// // //                                     onChange={handleChange}
// // //                                     placeholder="Enter company's legal name"
// // //                                     required
// // //                                 />
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="4">
// // //                                 <Form.Label className="fw-bold">Email <span className="text-danger">*</span></Form.Label>
// // //                                 <Form.Control
// // //                                     type="email"
// // //                                     name="email"
// // //                                     value={formData.email}
// // //                                     onChange={handleChange}
// // //                                     placeholder="e.g., info@company.com"
// // //                                     required
// // //                                 />
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="4">
// // //                                 <Form.Label className="fw-bold">Phone <span className="text-danger">*</span></Form.Label>
// // //                                 <Form.Control
// // //                                     type="tel"
// // //                                     name="phone"
// // //                                     value={formData.phone}
// // //                                     onChange={handleChange}
// // //                                     placeholder="e.g., +91-9876543210"
// // //                                     required
// // //                                 />
// // //                             </Form.Group>
// // //                         </Row>

// // //                         <Row className="mb-4 g-3">
// // //                             <Form.Group as={Col} md="4">
// // //                                 <Form.Label className="fw-bold">Password <span className="text-danger">*</span></Form.Label>
// // //                                 <Form.Control
// // //                                     type="password"
// // //                                     name="password"
// // //                                     value={formData.password}
// // //                                     onChange={handleChange}
// // //                                     placeholder="Set a password for company login"
// // //                                     required
// // //                                 />
// // //                             </Form.Group>
// // //                              <Form.Group as={Col} md="4">
// // //                                 <Form.Label className="fw-bold">Category <span className="text-danger">*</span></Form.Label>
// // //                                 <Form.Select
// // //                                     name="category"
// // //                                     value={formData.category}
// // //                                     onChange={handleChange}
// // //                                     required
// // //                                     disabled={loading}
// // //                                 >
// // //                                     <option value="">Select Category</option>
// // //                                     {allCategories.map(cat => (
// // //                                         <option key={cat._id} value={cat._id}>{cat.name} ({cat.type.charAt(0).toUpperCase() + cat.type.slice(1)})</option>
// // //                                     ))}
// // //                                 </Form.Select>
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="4">
// // //                                 <Form.Label className="fw-bold">SubCategory</Form.Label>
// // //                                 <Form.Select
// // //                                     name="subCategory"
// // //                                     value={formData.subCategory}
// // //                                     onChange={handleChange}
// // //                                     disabled={!formData.category || filteredSubCategories.length === 0 || loading}
// // //                                 >
// // //                                     <option value="">Select SubCategory (Optional)</option>
// // //                                     {filteredSubCategories.map(subCat => (
// // //                                         <option key={subCat._id} value={subCat._id}>{subCat.name}</option>
// // //                                     ))}
// // //                                 </Form.Select>
// // //                             </Form.Group>
// // //                         </Row>

// // //                         {/* Address Details - Country, State, City integrated */}
// // //                         <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Address Details</h4>
// // //                         <Row className="mb-4 g-3">
// // //                             <Form.Group as={Col} md="6">
// // //                                 <Form.Label className="fw-bold">Address</Form.Label>
// // //                                 <Form.Control
// // //                                     type="text"
// // //                                     name="address"
// // //                                     value={formData.address}
// // //                                     onChange={handleChange}
// // //                                     placeholder="Street, Building, Locality"
// // //                                 />
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="2">
// // //                                 <Form.Label className="fw-bold">Country</Form.Label>
// // //                                 <Form.Control
// // //                                     type="text"
// // //                                     value="India"
// // //                                     readOnly
// // //                                     disabled
// // //                                     className="bg-light"
// // //                                 />
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="2">
// // //                                 <Form.Label className="fw-bold">State <span className="text-danger">*</span></Form.Label>
// // //                                 <Form.Select
// // //                                     name="state"
// // //                                     value={formData.state}
// // //                                     onChange={handleChange}
// // //                                     required
// // //                                     disabled={loading || allStates.length === 0}
// // //                                 >
// // //                                     <option value="">Select State</option>
// // //                                     {allStates.map(s => (
// // //                                         <option key={s._id} value={s._id}>{s.name}</option>
// // //                                     ))}
// // //                                 </Form.Select>
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="2">
// // //                                 <Form.Label className="fw-bold">City <span className="text-danger">*</span></Form.Label>
// // //                                 <Form.Select
// // //                                     name="city"
// // //                                     value={formData.city}
// // //                                     onChange={handleChange}
// // //                                     required
// // //                                     disabled={!formData.state || allCities.length === 0 || loading}
// // //                                 >
// // //                                     <option value="">Select City</option>
// // //                                     {allCities.map(c => (
// // //                                         <option key={c._id} value={c._id}>{c.name}</option>
// // //                                     ))}
// // //                                 </Form.Select>
// // //                             </Form.Group>
// // //                         </Row>

// // //                         {/* Documents & Company Type */}
// // //                         <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Documents & Business Type</h4>
// // //                         <Row className="mb-4 g-3">
// // //                             <Form.Group as={Col} md="4">
// // //                                 <Form.Label className="fw-bold">GST Number</Form.Label>
// // //                                 <Form.Control
// // //                                     type="text"
// // //                                     name="gstNumber"
// // //                                     value={formData.gstNumber}
// // //                                     onChange={handleChange}
// // //                                     placeholder="Optional: Enter GSTIN"
// // //                                 />
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="4">
// // //                                 <Form.Label className="fw-bold">Aadhaar Number</Form.Label>
// // //                                 <Form.Control
// // //                                     type="text"
// // //                                     name="aadhaarNumber"
// // //                                     value={formData.aadhaarNumber}
// // //                                     onChange={handleChange}
// // //                                     placeholder="Optional: Enter Aadhaar Number"
// // //                                 />
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="4">
// // //                                 <Form.Label className="fw-bold">Company Type</Form.Label>
// // //                                 <Form.Control
// // //                                     type="text"
// // //                                     value={formData.companyType.charAt(0).toUpperCase() + formData.companyType.slice(1)}
// // //                                     readOnly
// // //                                     disabled
// // //                                     className="bg-light"
// // //                                 />
// // //                                 <Form.Text className="text-muted">
// // //                                     Automatically set by selected category.
// // //                                 </Form.Text>
// // //                             </Form.Group>
// // //                         </Row>

// // //                         {/* Other Details */}
// // //                         <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Additional Details</h4>
// // //                         <Row className="mb-3 g-3">
// // //                             <Form.Group as={Col} md="6">
// // //                                 <Form.Label className="fw-bold">Website (URL)</Form.Label>
// // //                                 <Form.Control
// // //                                     type="url"
// // //                                     name="website"
// // //                                     value={formData.website}
// // //                                     onChange={handleChange}
// // //                                     placeholder="e.g., https://www.yourcompany.com"
// // //                                 />
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="6">
// // //                                 <Form.Label className="fw-bold">Google Maps Link</Form.Label>
// // //                                 <Form.Control
// // //                                     type="url"
// // //                                     name="googleMapsLink"
// // //                                     value={formData.googleMapsLink}
// // //                                     onChange={handleChange}
// // //                                     placeholder="Paste Google Maps URL here"
// // //                                 />
// // //                             </Form.Group>
// // //                         </Row>

// // //                         <Form.Group className="mb-4">
// // //                             <Form.Label className="fw-bold">Description</Form.Label>
// // //                             <Form.Control
// // //                                 as="textarea"
// // //                                 rows={3}
// // //                                 name="description"
// // //                                 value={formData.description}
// // //                                 onChange={handleChange}
// // //                                 placeholder="Provide a brief description of your company and its services/products."
// // //                             />
// // //                         </Form.Group>

// // //                         {/* Social Links */}
// // //                         <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Social Links</h4>
// // //                         {socialLinks.map((link, index) => (
// // //                             <InputGroup className="mb-2" key={`social-${index}`}>
// // //                                 <InputGroup.Text className="bg-light">
// // //                                     <i className="bi bi-link-45deg"></i>
// // //                                 </InputGroup.Text>
// // //                                 <Form.Control
// // //                                     type="url"
// // //                                     placeholder="e.g., https://facebook.com/yourpage"
// // //                                     value={link}
// // //                                     onChange={(e) => handleSocialLinkChange(index, e.target.value)}
// // //                                 />
// // //                                 {socialLinks.length > 1 && (
// // //                                     <Button variant="outline-danger" onClick={() => removeSocialLink(index)}>
// // //                                         <i className="bi bi-trash"></i>
// // //                                     </Button>
// // //                                 )}
// // //                             </InputGroup>
// // //                         ))}
// // //                         <Button variant="outline-success" size="sm" onClick={addSocialLink} className="mb-4">
// // //                             <i className="bi bi-plus-circle me-1"></i> Add Another Social Link
// // //                         </Button>

// // //                         {/* Keywords */}
// // //                         <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Keywords</h4>
// // //                         <Form.Text className="text-muted mb-2 d-block">
// // //                             Enter keywords that best describe your business (e.g., "digital marketing", "web design"). These help customers find you.
// // //                         </Form.Text>
// // //                         {keywords.map((keyword, index) => (
// // //                             <InputGroup className="mb-2" key={`keyword-${index}`}>
// // //                                 <InputGroup.Text className="bg-light">
// // //                                     <i className="bi bi-tag"></i>
// // //                                 </InputGroup.Text>
// // //                                 <Form.Control
// // //                                     type="text"
// // //                                     placeholder="e.g., restaurant, plumbing, lawyer"
// // //                                     value={keyword}
// // //                                     onChange={(e) => handleKeywordChange(index, e.target.value)}
// // //                                 />
// // //                                 {keywords.length > 1 && (
// // //                                     <Button variant="outline-danger" onClick={() => removeKeyword(index)}>
// // //                                         <i className="bi bi-trash"></i>
// // //                                     </Button>
// // //                                 )}
// // //                             </InputGroup>
// // //                         ))}
// // //                         <Button variant="outline-success" size="sm" onClick={addKeyword} className="mb-4">
// // //                             <i className="bi bi-plus-circle me-1"></i> Add Another Keyword
// // //                         </Button>

// // //                         {/* Business Timings */}
// // //                         <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Business Timings</h4>
// // //                         <p className="text-muted">Set your opening and closing times for each day. Leave blank or check "Closed" if not applicable.</p>
// // //                         {daysOfWeek.map(day => (
// // //                             <Row className="mb-2 align-items-center g-2" key={day}>
// // //                                 <Col md="2">
// // //                                     <Form.Check
// // //                                         type="checkbox"
// // //                                         label={<span className="text-capitalize fw-bold">{day}</span>}
// // //                                         checked={businessTimings[day].isClosed}
// // //                                         onChange={() => handleBusinessTimingToggleClosed(day)}
// // //                                     />
// // //                                 </Col>
// // //                                 <Col md="5">
// // //                                     <Form.Control
// // //                                         type="time"
// // //                                         value={businessTimings[day].open}
// // //                                         onChange={(e) => handleBusinessTimingChange(day, 'open', e.target.value)}
// // //                                         disabled={businessTimings[day].isClosed}
// // //                                     />
// // //                                 </Col>
// // //                                 <Col md="5">
// // //                                     <Form.Control
// // //                                         type="time"
// // //                                         value={businessTimings[day].close}
// // //                                         onChange={(e) => handleBusinessTimingChange(day, 'close', e.target.value)}
// // //                                         disabled={businessTimings[day].isClosed}
// // //                                     />
// // //                                 </Col>
// // //                             </Row>
// // //                         ))}

// // //                         {/* File Uploads */}
// // //                         <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Upload Documents & Media</h4>
// // //                         <p className="text-muted">Upload required documents and media files for your company profile.</p>
// // //                         <Row className="mb-3 g-3">
// // //                             <Form.Group as={Col} md="6">
// // //                                 <Form.Label className="fw-bold">Company Logo (Max 1) <span className="text-danger">*</span></Form.Label>
// // //                                 <Form.Control type="file" name="logo" accept="image/*" onChange={handleFileChange} required />
// // //                                 <Form.Text className="text-muted">Accepts image files (e.g., JPG, PNG).</Form.Text>
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="6">
// // //                                 <Form.Label className="fw-bold">Aadhaar Image (Max 1)</Form.Label>
// // //                                 <Form.Control type="file" name="aadhaar" accept="image/*,application/pdf" onChange={handleFileChange} />
// // //                                 <Form.Text className="text-muted">Accepts image or PDF files.</Form.Text>
// // //                             </Form.Group>
// // //                         </Row>
// // //                         <Row className="mb-3 g-3">
// // //                             <Form.Group as={Col} md="6">
// // //                                 <Form.Label className="fw-bold">PAN Image (Max 1)</Form.Label>
// // //                                 <Form.Control type="file" name="pan" accept="image/*,application/pdf" onChange={handleFileChange} />
// // //                                 <Form.Text className="text-muted">Accepts image or PDF files.</Form.Text>
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="6">
// // //                                 <Form.Label className="fw-bold">Electricity Bill (Max 1)</Form.Label>
// // //                                 <Form.Control type="file" name="electricityBill" accept="image/*,application/pdf" onChange={handleFileChange} />
// // //                                 <Form.Text className="text-muted">Accepts image or PDF files.</Form.Text>
// // //                             </Form.Group>
// // //                         </Row>
// // //                         <Row className="mb-4 g-3">
// // //                             <Form.Group as={Col} md="6">
// // //                                 <Form.Label className="fw-bold">Passport Photo (Max 1)</Form.Label>
// // //                                 <Form.Control type="file" name="passportPhoto" accept="image/*" onChange={handleFileChange} />
// // //                                 <Form.Text className="text-muted">Accepts image files (e.g., JPG, PNG).</Form.Text>
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="6">
// // //                                 <Form.Label className="fw-bold">Banner Images (Max 5)</Form.Label>
// // //                                 <Form.Control type="file" name="banner" accept="image/*" multiple onChange={handleFileChange} />
// // //                                 <Form.Text className="text-muted">You can select up to 5 banner images (JPG, PNG).</Form.Text>
// // //                             </Form.Group>
// // //                         </Row>

// // //                         <div className="d-flex justify-content-end mt-4 pt-3 border-top">
// // //                             <Button variant="secondary" onClick={handleClose} className="me-2">
// // //                                 Close
// // //                             </Button>
// // //                             <Button variant="primary" type="submit" disabled={loading}>
// // //                                 {loading ? <><Spinner animation="border" size="sm" className="me-2" /> Registering...</> : "Register Company"}
// // //                             </Button>
// // //                         </div>
// // //                     </Form>
// // //                 </Modal.Body>
// // //             </Modal>
// // //         </>
// // //     );
// // // };

// // // export default CompanyRegistrationForm;




 
// // import React, { useState, useEffect } from 'react';
// // import {
// //     Modal, Button, Form, Row, Col, Alert, Spinner, InputGroup
// // } from 'react-bootstrap';
// // import {
// //     registerCompany,
// //     getAllCompanyCategories,
// //     getAllCompanySubCategories,
// //     getStatesByCountry,
// //     getCitiesByState,
// // } from '../Services/authApi';
 
// // // Helper to get the current token dynamically from localStorage
// // const getToken = () => localStorage.getItem('token');
 
// // // A small custom hook for managing dynamic array inputs (e.g., social links, keywords)
// // const useArrayInput = (initialValue = ['']) => {
// //     const [items, setItems] = useState(initialValue);
 
// //     const handleItemChange = (index, value) => {
// //         const newItems = [...items];
// //         newItems[index] = value;
// //         setItems(newItems);
// //     };
 
// //     const addItem = () => setItems([...items, '']);
// //     const removeItem = (index) => setItems(items.filter((_, i) => i !== index));
 
// //     return [items, handleItemChange, addItem, removeItem, setItems];
// // };
 
// // const INDIA_DEFAULT_COUNTRY_ID = "687a1e2185f0230715032380";
 
// // const CompanyRegistrationForm = () => {
// //     const [showModal, setShowModal] = useState(false);
// //     const [loading, setLoading] = useState(false);
// //     const [error, setError] = useState('');
// //     const [successMessage, setSuccessMessage] = useState('');
 
// //     const [allCategories, setAllCategories] = useState([]);
// //     const [allSubCategories, setAllSubCategories] = useState([]);
// //     const [filteredSubCategories, setFilteredSubCategories] = useState([]);
 
// //     const [allStates, setAllStates] = useState([]);
// //     const [allCities, setAllCities] = useState([]);
 
// //     const [formData, setFormData] = useState({
// //         name: '', email: '', phone: '', 
// //         address: '',
// //         city: '',
// //         state: '',
// //         country: INDIA_DEFAULT_COUNTRY_ID,
// //         gstNumber: '', aadhaarNumber: '',
// //         category: '', subCategory: '', companyType: 'service',
// //         website: '', googleMapsLink: '', description: '',
// //         logo: null,
// //         banner: [],
// //         aadhaar: null,
       

// //         passportPhoto: null,
// //     });
 
// //     const [socialLinks, handleSocialLinkChange, addSocialLink, removeSocialLink, setSocialLinks] = useArrayInput(['']);
// //     const [keywords, handleKeywordChange, addKeyword, removeKeyword, setKeywords] = useArrayInput(['']);
   
// //     // ✅ यहाँ बदलाव किया गया है: isClosed हटा दिया गया है
// //     const initialBusinessTimings = {
// //         sunday: { open: '', close: '' },
// //         monday: { open: '', close: '' },
// //         tuesday: { open: '', close: '' },
// //         wednesday: { open: '', close: '' },
// //         thursday: { open: '', close: '' },
// //         friday: { open: '', close: '' },
// //         saturday: { open: '', close: '' },
// //     };
// //     const [businessTimings, setBusinessTimings] = useState(initialBusinessTimings);
 
// //     const [isLoggedIn, setIsLoggedIn] = useState(false);
 
// //     useEffect(() => {
// //         const token = getToken();
// //         setIsLoggedIn(!!token);
// //     }, []);
 
// //     useEffect(() => {
// //         const fetchInitialLookupData = async () => {
// //             if (!isLoggedIn) return;
// //             setLoading(true);
// //             setError('');
// //             try {
// //                 const categoriesRes = await getAllCompanyCategories();
// //                 setAllCategories(categoriesRes?.data || []);
// //                 const subCategoriesRes = await getAllCompanySubCategories();
// //                 setAllSubCategories(subCategoriesRes.data || []);
// //                 if (INDIA_DEFAULT_COUNTRY_ID) {
// //                     const statesRes = await getStatesByCountry(INDIA_DEFAULT_COUNTRY_ID);
// //                     setAllStates(statesRes?.data || []);
// //                 }
// //             } catch (err) {
// //                 console.error("Error fetching initial lookup data:", err);
// //                 setError(err.response?.data?.message || err.message || "Failed to load essential data.");
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };
// //         fetchInitialLookupData();
// //     }, [isLoggedIn]);
 
// //     useEffect(() => {
// //         if (formData.category) {
// //             const categoryObj = allCategories.find(cat => cat._id === formData.category);
// //             setFormData(prev => ({ ...prev, companyType: categoryObj ? categoryObj.type : 'service' }));
// //             const filtered = allSubCategories.filter(
// //                 sub => String(sub.parentCategory?._id || sub.parentCategory) === String(formData.category)
// //             );
// //             setFilteredSubCategories(filtered);
// //             setFormData(prev => ({ ...prev, subCategory: '' }));
// //         } else {
// //             setFilteredSubCategories([]);
// //         }
// //     }, [formData.category, allCategories, allSubCategories]);
 
// //     useEffect(() => {
// //         const fetchCities = async () => {
// //             if (formData.state) {
// //                 setError('');
// //                 try {
// //                     const citiesRes = await getCitiesByState(formData.state);
// //                     setAllCities(citiesRes?.data || []);
// //                     setFormData(prev => ({ ...prev, city: '' }));
// //                 } catch (err) {
// //                     console.error(`Error fetching cities for state ${formData.state}:`, err);
// //                     setError(err.response?.data?.message || err.message || "Failed to load cities.");
// //                 }
// //             } else {
// //                 setAllCities([]);
// //                 setFormData(prev => ({ ...prev, city: '' }));
// //             }
// //         };
// //         fetchCities();
// //     }, [formData.state]);
 
// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setFormData(prev => ({ ...prev, [name]: value }));
// //     };
 
// //     const handleFileChange = (e) => {
// //         const { name, files } = e.target;
// //         if (name === 'banner') {
// //             setFormData(prev => ({ ...prev, [name]: Array.from(files) }));
// //         } else {
// //             setFormData(prev => ({ ...prev, [name]: files[0] }));
// //         }
// //     };
 
// //     const handleBusinessTimingChange = (day, field, value) => {
// //         setBusinessTimings(prev => ({
// //             ...prev,
// //             [day]: { ...prev[day], [field]: value }
// //         }));
// //     };
   
// //     // ✅ handleBusinessTimingToggleClosed फंक्शन हटा दिया गया है
 
// //     const handleClose = () => {
// //         setShowModal(false);
// //         setFormData({
// //             name: '', email: '', phone: '', 
// //             address: '', city: '', state: '', country: INDIA_DEFAULT_COUNTRY_ID,
// //             gstNumber: '', aadhaarNumber: '',
// //             category: '', subCategory: '', companyType: 'service',
// //             website: '', googleMapsLink: '', description: '',
// //             logo: null, banner: [], aadhaar: null, 
// //            passportPhoto: null,
// //         });
// //         setSocialLinks(['']);
// //         setKeywords(['']);
// //         setBusinessTimings(initialBusinessTimings);
// //         setError('');
// //         setSuccessMessage('');
// //         setAllStates([]);
// //         setAllCities([]);
// //     };
 
// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         setLoading(true);
// //         setError('');
// //         setSuccessMessage('');
// //         if (!isLoggedIn) {
// //             setError("You must be logged in to register a company.");
// //             setLoading(false);
// //             return;
// //         }
 
// //         try {
// //             const companyPayload = new FormData();
// //             for (const key in formData) {
// //                 if (['logo', 'banner', 'aadhaar', 'passportPhoto'].includes(key)) continue;
// //                 if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
// //                     companyPayload.append(key, formData[key]);
// //                 }
// //             }
// //             companyPayload.append('socialLinks', JSON.stringify(socialLinks.filter(link => link.trim() !== '')));
// //             companyPayload.append('keywords', JSON.stringify(keywords.filter(keyword => keyword.trim() !== '')));
           
// //             // ✅ यहाँ बदलाव किया गया है: isClosed चेक हटा दिया गया है
// //             const formattedTimings = {};
// //             for (const day in businessTimings) {
// //                 formattedTimings[day] = {
// //                     open: businessTimings[day].open || 'Closed',
// //                     close: businessTimings[day].close || 'Closed'
// //                 };
// //             }
// //             companyPayload.append('businessTimings', JSON.stringify(formattedTimings));
 
// //             if (formData.logo) companyPayload.append('logo', formData.logo);
// //             formData.banner.forEach(file => companyPayload.append('banner', file));
// //             if (formData.aadhaar) companyPayload.append('aadhaar', formData.aadhaar);
         
           
// //             if (formData.passportPhoto) companyPayload.append('passportPhoto', formData.passportPhoto);
 
// //             const res = await registerCompany(companyPayload);
// //             setSuccessMessage(res.message || "Company registered successfully!");
// //         } catch (err) {
// //             console.error("Company Registration Failed:", err);
// //             setError(err.response?.data?.message || err.message || "Registration failed. Please try again.");
// //         } finally {
// //             setLoading(false);
// //         }
// //     };
 
// //     const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
 
// //     return (
// //         <>
// //             {isLoggedIn && (
// //                 <Button variant="outline-light" className="fw-bold py-2 px-4 rounded-pill" onClick={() => setShowModal(true)}>
// //                     Register Your Company
// //                 </Button>
// //             )}
 
// //             <Modal show={showModal} onHide={handleClose} size="xl" centered scrollable backdrop="static">
// //                 <Modal.Header closeButton className="bg-primary text-white">
// //                     <Modal.Title><i className="bi bi-building me-2"></i> Company Registration</Modal.Title>
// //                 </Modal.Header>
// //                 <Modal.Body className="p-4">
// //                     {successMessage && <Alert variant="success" className="text-center">{successMessage}</Alert>}
// //                     {error && <Alert variant="danger" className="text-center">{error}</Alert>}
// //                     <Form onSubmit={handleSubmit}>
// //                         {/* ... (Basic Information, Address, Documents sections - no changes) ... */}
                       
                   
 
 
// //      {/* Basic Information */}
// //                         <h4 className="mb-3 text-primary border-bottom pb-2">Basic Information</h4>
// //                         <Row className="mb-3 g-3">
// //                             <Form.Group as={Col} md="4">
// //                                 <Form.Label className="fw-bold">Company Name <span className="text-danger">*</span></Form.Label>
// //                                 <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter company's legal name" required />
// //                             </Form.Group>
// //                             <Form.Group as={Col} md="4">
// //                                 <Form.Label className="fw-bold">Email <span className="text-danger">*</span></Form.Label>
// //                                 <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="e.g., info@company.com" required />
// //                             </Form.Group>
// //                             <Form.Group as={Col} md="4">
// //                                 <Form.Label className="fw-bold">Phone <span className="text-danger">*</span></Form.Label>
// //                                 <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g., +91-9876543210" required />
// //                             </Form.Group>
// //                         </Row>
// //                         <Row className="mb-4 g-3">
                           
// //                              <Form.Group as={Col} md="4">
// //                                 <Form.Label className="fw-bold">Category <span className="text-danger">*</span></Form.Label>
// //                                 <Form.Select name="category" value={formData.category} onChange={handleChange} required disabled={loading}>
// //                                     <option value="">Select Category</option>
// //                                     {allCategories.map(cat => ( <option key={cat._id} value={cat._id}>{cat.name} ({cat.type.charAt(0).toUpperCase() + cat.type.slice(1)})</option> ))}
// //                                 </Form.Select>
// //                             </Form.Group>
// //                             <Form.Group as={Col} md="4">
// //                                 <Form.Label className="fw-bold">SubCategory</Form.Label>
// //                                 <Form.Select name="subCategory" value={formData.subCategory} onChange={handleChange} disabled={!formData.category || filteredSubCategories.length === 0 || loading}>
// //                                     <option value="">Select SubCategory (Optional)</option>
// //                                     {filteredSubCategories.map(subCat => ( <option key={subCat._id} value={subCat._id}>{subCat.name}</option> ))}
// //                                 </Form.Select>
// //                             </Form.Group>
// //                         </Row>
// //                         {/* Address Details */}
// //                         <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Address Details</h4>
// //                         <Row className="mb-4 g-3">
// //                             <Form.Group as={Col} md="6">
// //                                 <Form.Label className="fw-bold">Address</Form.Label>
// //                                 <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Street, Building, Locality" />
// //                             </Form.Group>
// //                             <Form.Group as={Col} md="2">
// //                                 <Form.Label className="fw-bold">Country</Form.Label>
// //                                 <Form.Control type="text" value="India" readOnly disabled className="bg-light" />
// //                             </Form.Group>
// //                             <Form.Group as={Col} md="2">
// //                                 <Form.Label className="fw-bold">State <span className="text-danger">*</span></Form.Label>
// //                                 <Form.Select name="state" value={formData.state} onChange={handleChange} required disabled={loading || allStates.length === 0}>
// //                                     <option value="">Select State</option>
// //                                     {allStates.map(s => ( <option key={s._id} value={s._id}>{s.name}</option> ))}
// //                                 </Form.Select>
// //                             </Form.Group>
// //                             <Form.Group as={Col} md="2">
// //                                 <Form.Label className="fw-bold">City <span className="text-danger">*</span></Form.Label>
// //                                 <Form.Select name="city" value={formData.city} onChange={handleChange} required disabled={!formData.state || allCities.length === 0 || loading}>
// //                                     <option value="">Select City</option>
// //                                     {allCities.map(c => ( <option key={c._id} value={c._id}>{c.name}</option> ))}
// //                                 </Form.Select>
// //                             </Form.Group>
// //                         </Row>
// //                         {/* Documents & Business Type */}
// //                         <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Documents & Business Type</h4>
// //                         <Row className="mb-4 g-3">
// //                             <Form.Group as={Col} md="4">
// //                                 <Form.Label className="fw-bold">GST Number</Form.Label>
// //                                 <Form.Control type="text" name="gstNumber" value={formData.gstNumber} onChange={handleChange} placeholder="Optional: Enter GSTIN" />
// //                             </Form.Group>
// //                             <Form.Group as={Col} md="4">
// //                                 <Form.Label className="fw-bold">Aadhaar Number</Form.Label>
// //                                 <Form.Control type="text" name="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleChange} placeholder="Optional: Enter Aadhaar Number" />
// //                             </Form.Group>
// //                             <Form.Group as={Col} md="4">
// //                                 <Form.Label className="fw-bold">Company Type</Form.Label>
// //                                 <Form.Control type="text" value={formData.companyType.charAt(0).toUpperCase() + formData.companyType.slice(1)} readOnly disabled className="bg-light" />
// //                                 <Form.Text className="text-muted">Automatically set by selected category.</Form.Text>
// //                             </Form.Group>
// //                         </Row>
// //                         {/* Additional Details */}
// //                         <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Additional Details</h4>
// //                         <Row className="mb-3 g-3">
// //                             <Form.Group as={Col} md="6">
// //                                 <Form.Label className="fw-bold">Website (URL)</Form.Label>
// //                                 <Form.Control type="url" name="website" value={formData.website} onChange={handleChange} placeholder="e.g., https://www.yourcompany.com" />
// //                             </Form.Group>
// //                             <Form.Group as={Col} md="6">
// //                                 <Form.Label className="fw-bold">Google Maps Link</Form.Label>
// //                                 <Form.Control type="url" name="googleMapsLink" value={formData.googleMapsLink} onChange={handleChange} placeholder="Paste Google Maps URL here" />
// //                             </Form.Group>
// //                         </Row>
// //                         <Form.Group className="mb-4">
// //                             <Form.Label className="fw-bold">Description</Form.Label>
// //                             <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} placeholder="Provide a brief description of your company..." />
// //                         </Form.Group>
// //                         {/* Social Links */}
// //                         <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Social Links</h4>
// //                         {socialLinks.map((link, index) => (
// //                             <InputGroup className="mb-2" key={`social-${index}`}>
// //                                 <InputGroup.Text className="bg-light"><i className="bi bi-link-45deg"></i></InputGroup.Text>
// //                                 <Form.Control type="url" placeholder="e.g., https://facebook.com/yourpage" value={link} onChange={(e) => handleSocialLinkChange(index, e.target.value)} />
// //                                 {socialLinks.length > 1 && ( <Button variant="outline-danger" onClick={() => removeSocialLink(index)}><i className="bi bi-trash"></i></Button> )}
// //                             </InputGroup>
// //                         ))}
// //                         <Button variant="outline-success" size="sm" onClick={addSocialLink} className="mb-4"><i className="bi bi-plus-circle me-1"></i> Add Another Social Link</Button>
// //                         {/* Keywords */}
// //                         <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Keywords</h4>
// //                         <Form.Text className="text-muted mb-2 d-block">Enter keywords that best describe your business.</Form.Text>
// //                         {keywords.map((keyword, index) => (
// //                             <InputGroup className="mb-2" key={`keyword-${index}`}>
// //                                 <InputGroup.Text className="bg-light"><i className="bi bi-tag"></i></InputGroup.Text>
// //                                 <Form.Control type="text" placeholder="e.g., restaurant, plumbing, lawyer" value={keyword} onChange={(e) => handleKeywordChange(index, e.target.value)} />
// //                                 {keywords.length > 1 && ( <Button variant="outline-danger" onClick={() => removeKeyword(index)}><i className="bi bi-trash"></i></Button> )}
// //                             </InputGroup>
// //                         ))}
// //                         <Button variant="outline-success" size="sm" onClick={addKeyword} className="mb-4"><i className="bi bi-plus-circle me-1"></i> Add Another Keyword</Button>
 
// //                         {/* ✅ यहाँ बदलाव किया गया है: Business Timings Section */}
// //                         <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Business Timings</h4>
// //                         <p className="text-muted">Set your opening and closing times. Leave fields blank if the business is closed on that day.</p>
// //                       {daysOfWeek.map(day => (
// //     <Row className="mb-2 align-items-center g-3" key={day}>
// //         <Col xs={12} md={2}>
// //             <Form.Label className="text-capitalize fw-bold mb-0">{day}</Form.Label>
// //         </Col>

// //         {/* Open Time */}
// //         <Col xs={6} md={5}>
// //             <InputGroup>
// //                 <InputGroup.Text style={{ fontSize: '0.85rem' }}>Open</InputGroup.Text>
// //                 <Form.Control
// //                     type="time"
// //                     value={businessTimings[day].open}
// //                     onChange={(e) =>
// //                         handleBusinessTimingChange(day, "open", e.target.value)
// //                     }
// //                 />
// //             </InputGroup>
// //         </Col>

// //         {/* Close Time */}
// //         <Col xs={6} md={5}>
// //             <InputGroup>
// //                 <InputGroup.Text style={{ fontSize: '0.85rem' }}>Close</InputGroup.Text>
// //                 <Form.Control
// //                     type="time"
// //                     value={businessTimings[day].close}
// //                     onChange={(e) =>
// //                         handleBusinessTimingChange(day, "close", e.target.value)
// //                     }
// //                 />
// //             </InputGroup>
// //         </Col>
// //     </Row>
// // ))}

 
// //                         {/* File Uploads */}
// //                         <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Upload Documents & Media</h4>
// //                         <p className="text-muted">Upload required documents and media files for your company profile.</p>
// //                         <Row className="mb-3 g-3">
// //                             <Form.Group as={Col} md="6">
// //                                 <Form.Label className="fw-bold">Company Logo (Max 1) <span className="text-danger">*</span></Form.Label>
// //                                 <Form.Control type="file" name="logo" accept="image/*" onChange={handleFileChange} required />
// //                                 <Form.Text className="text-muted">Accepts image files (e.g., JPG, PNG).</Form.Text>
// //                             </Form.Group>
// //                             <Form.Group as={Col} md="6">
// //                                 <Form.Label className="fw-bold">Aadhaar Image (Max 1)</Form.Label>
// //                                 <Form.Control type="file" name="aadhaar" accept="image/*,application/pdf" onChange={handleFileChange} />
// //                                 <Form.Text className="text-muted">Accepts image or PDF files.</Form.Text>
// //                             </Form.Group>
// //                         </Row>
                       
// //                         <Row className="mb-4 g-3">
// //                             <Form.Group as={Col} md="6">
// //                                 <Form.Label className="fw-bold">Passport Photo (Max 1)</Form.Label>
// //                                 <Form.Control type="file" name="passportPhoto" accept="image/*" onChange={handleFileChange} />
// //                                 <Form.Text className="text-muted">Accepts image files (e.g., JPG, PNG).</Form.Text>
// //                             </Form.Group>
// //                             <Form.Group as={Col} md="6">
// //                                 <Form.Label className="fw-bold">Business Images (Max 5)</Form.Label>
// //                                 <Form.Control type="file" name="banner" accept="image/*" multiple onChange={handleFileChange} />
// //                                 <Form.Text className="text-muted">You can select up to 5 Business images (JPG, PNG).</Form.Text>
// //                             </Form.Group>
// //                         </Row>
 
// //                         <div className="d-flex justify-content-end mt-4 pt-3 border-top">
// //                             <Button variant="secondary" onClick={handleClose} className="me-2">Close</Button>
// //                             <Button variant="primary" type="submit" disabled={loading}>
// //                                 {loading ? <><Spinner animation="border" size="sm" className="me-2" /> Registering...</> : "Register Company"}
// //                             </Button>
// //                         </div>
// //                     </Form>
// //                 </Modal.Body>
// //             </Modal>
// //         </>
// //     );
// // };
 
// // export default CompanyRegistrationForm;
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 




























// // // import React, { useState, useEffect } from 'react';
// // // import {
// // //     Modal, Button, Form, Row, Col, Alert, Spinner, InputGroup
// // // } from 'react-bootstrap';
// // // import {
// // //     registerCompany,
// // //     getAllCompanyCategories,
// // //     getAllCompanySubCategories,
// // //     getStatesByCountry,
// // //     getCitiesByState,
// // // } from '../Services/authApi'; // Make sure this path is correct for your project

// // // // Helper to get the current token dynamically from localStorage
// // // const getToken = () => localStorage.getItem('token');

// // // // A small custom hook for managing dynamic array inputs (e.g., social links, keywords)
// // // const useArrayInput = (initialValue = ['']) => {
// // //     const [items, setItems] = useState(initialValue);

// // //     const handleItemChange = (index, value) => {
// // //         const newItems = [...items];
// // //         newItems[index] = value;
// // //         setItems(newItems);
// // //     };

// // //     const addItem = () => setItems([...items, '']);
// // //     const removeItem = (index) => setItems(items.filter((_, i) => i !== index));

// // //     return [items, handleItemChange, addItem, removeItem, setItems];
// // // };

// // // const INDIA_DEFAULT_COUNTRY_ID = "687a1e2185f0230715032380";

// // // const CompanyRegistrationForm = () => {
// // //     const [showModal, setShowModal] = useState(false);
// // //     const [loading, setLoading] = useState(false);
// // //     const [error, setError] = useState('');
// // //     const [successMessage, setSuccessMessage] = useState('');

// // //     const [allCategories, setAllCategories] = useState([]);
// // //     const [allSubCategories, setAllSubCategories] = useState([]);
// // //     const [filteredSubCategories, setFilteredSubCategories] = useState([]);

// // //     const [allStates, setAllStates] = useState([]);
// // //     const [allCities, setAllCities] = useState([]);

// // //     const [formData, setFormData] = useState({
// // //         name: '', email: '', phone: '', password: '',
// // //         address: '',
// // //         city: '',
// // //         state: '',
// // //         country: INDIA_DEFAULT_COUNTRY_ID,
// // //         gstNumber: '', aadhaarNumber: '',
// // //         category: '', subCategory: '', companyType: 'service',
// // //         website: '', googleMapsLink: '', description: '',
// // //         logo: null,
// // //         banner: [],
// // //         aadhaar: null,
// // //         pan: null,
// // //         electricityBill: null,
// // //         passportPhoto: null,
// // //     });

// // //     const [socialLinks, handleSocialLinkChange, addSocialLink, removeSocialLink, setSocialLinks] = useArrayInput(['']);
// // //     const [keywords, handleKeywordChange, addKeyword, removeKeyword, setKeywords] = useArrayInput(['']);
    
// // //     const initialBusinessTimings = {
// // //         sunday: { open: '', close: '' },
// // //         monday: { open: '', close: '' },
// // //         tuesday: { open: '', close: '' },
// // //         wednesday: { open: '', close: '' },
// // //         thursday: { open: '', close: '' },
// // //         friday: { open: '', close: '' },
// // //         saturday: { open: '', close: '' },
// // //     };
// // //     const [businessTimings, setBusinessTimings] = useState(initialBusinessTimings);

// // //     // ✅ New state for "set all days" functionality
// // //     const [allDaysOpenTime, setAllDaysOpenTime] = useState('');
// // //     const [allDaysCloseTime, setAllDaysCloseTime] = useState('');

// // //     const [isLoggedIn, setIsLoggedIn] = useState(false);

// // //     useEffect(() => {
// // //         const token = getToken();
// // //         setIsLoggedIn(!!token);
// // //     }, []);

// // //     useEffect(() => {
// // //         const fetchInitialLookupData = async () => {
// // //             if (!isLoggedIn) return;
// // //             setLoading(true);
// // //             setError('');
// // //             try {
// // //                 const categoriesRes = await getAllCompanyCategories();
// // //                 setAllCategories(categoriesRes?.data || []);
// // //                 const subCategoriesRes = await getAllCompanySubCategories();
// // //                 setAllSubCategories(subCategoriesRes.data || []);
// // //                 if (INDIA_DEFAULT_COUNTRY_ID) {
// // //                     const statesRes = await getStatesByCountry(INDIA_DEFAULT_COUNTRY_ID);
// // //                     setAllStates(statesRes?.data || []);
// // //                 }
// // //             } catch (err) {
// // //                 console.error("Error fetching initial lookup data:", err);
// // //                 setError(err.response?.data?.message || err.message || "Failed to load essential data.");
// // //             } finally {
// // //                 setLoading(false);
// // //             }
// // //         };
// // //         fetchInitialLookupData();
// // //     }, [isLoggedIn]);

// // //     useEffect(() => {
// // //         if (formData.category) {
// // //             const categoryObj = allCategories.find(cat => cat._id === formData.category);
// // //             setFormData(prev => ({ ...prev, companyType: categoryObj ? categoryObj.type : 'service' }));
// // //             const filtered = allSubCategories.filter(
// // //                 sub => String(sub.parentCategory?._id || sub.parentCategory) === String(formData.category)
// // //             );
// // //             setFilteredSubCategories(filtered);
// // //             setFormData(prev => ({ ...prev, subCategory: '' }));
// // //         } else {
// // //             setFilteredSubCategories([]);
// // //         }
// // //     }, [formData.category, allCategories, allSubCategories]);

// // //     useEffect(() => {
// // //         const fetchCities = async () => {
// // //             if (formData.state) {
// // //                 setError('');
// // //                 try {
// // //                     const citiesRes = await getCitiesByState(formData.state);
// // //                     setAllCities(citiesRes?.data || []);
// // //                     setFormData(prev => ({ ...prev, city: '' }));
// // //                 } catch (err) {
// // //                     console.error(`Error fetching cities for state ${formData.state}:`, err);
// // //                     setError(err.response?.data?.message || err.message || "Failed to load cities.");
// // //                 }
// // //             } else {
// // //                 setAllCities([]);
// // //                 setFormData(prev => ({ ...prev, city: '' }));
// // //             }
// // //         };
// // //         fetchCities();
// // //     }, [formData.state]);

// // //     const handleChange = (e) => {
// // //         const { name, value } = e.target;
// // //         setFormData(prev => ({ ...prev, [name]: value }));
// // //     };

// // //     const handleFileChange = (e) => {
// // //         const { name, files } = e.target;
// // //         if (name === 'banner') {
// // //             setFormData(prev => ({ ...prev, [name]: Array.from(files) }));
// // //         } else {
// // //             setFormData(prev => ({ ...prev, [name]: files[0] }));
// // //         }
// // //     };

// // //     const handleBusinessTimingChange = (day, field, value) => {
// // //         setBusinessTimings(prev => ({
// // //             ...prev,
// // //             [day]: { ...prev[day], [field]: value }
// // //         }));
// // //     };
    
// // //     // ✅ New handler for setting all days' timings
// // //     const handleSetAllDaysTimings = () => {
// // //         const newTimings = {};
// // //         const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
// // //         days.forEach(day => {
// // //             newTimings[day] = {
// // //                 open: allDaysOpenTime,
// // //                 close: allDaysCloseTime,
// // //             };
// // //         });
// // //         setBusinessTimings(newTimings);
// // //     };

// // //     const handleClose = () => {
// // //         setShowModal(false);
// // //         setFormData({
// // //             name: '', email: '', phone: '', password: '',
// // //             address: '', city: '', state: '', country: INDIA_DEFAULT_COUNTRY_ID,
// // //             gstNumber: '', aadhaarNumber: '',
// // //             category: '', subCategory: '', companyType: 'service',
// // //             website: '', googleMapsLink: '', description: '',
// // //             logo: null, banner: [], aadhaar: null, pan: null,
// // //             electricityBill: null, passportPhoto: null,
// // //         });
// // //         setSocialLinks(['']);
// // //         setKeywords(['']);
// // //         setBusinessTimings(initialBusinessTimings);
// // //         setAllDaysOpenTime(''); // Reset global timings
// // //         setAllDaysCloseTime(''); // Reset global timings
// // //         setError('');
// // //         setSuccessMessage('');
// // //         setAllStates([]);
// // //         setAllCities([]);
// // //     };

// // //     const handleSubmit = async (e) => {
// // //         e.preventDefault();
// // //         setLoading(true);
// // //         setError('');
// // //         setSuccessMessage('');
// // //         if (!isLoggedIn) {
// // //             setError("You must be logged in to register a company.");
// // //             setLoading(false);
// // //             return;
// // //         }

// // //         try {
// // //             const companyPayload = new FormData();
// // //             for (const key in formData) {
// // //                 if (['logo', 'banner', 'aadhaar', 'pan', 'electricityBill', 'passportPhoto'].includes(key)) continue;
// // //                 if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
// // //                     companyPayload.append(key, formData[key]);
// // //                 }
// // //             }
// // //             companyPayload.append('socialLinks', JSON.stringify(socialLinks.filter(link => link.trim() !== '')));
// // //             companyPayload.append('keywords', JSON.stringify(keywords.filter(keyword => keyword.trim() !== '')));
            
// // //             const formattedTimings = {};
// // //             for (const day in businessTimings) {
// // //                 formattedTimings[day] = {
// // //                     open: businessTimings[day].open || 'Closed',
// // //                     close: businessTimings[day].close || 'Closed'
// // //                 };
// // //             }
// // //             companyPayload.append('businessTimings', JSON.stringify(formattedTimings));

// // //             if (formData.logo) companyPayload.append('logo', formData.logo);
// // //             formData.banner.forEach(file => companyPayload.append('banner', file));
// // //             if (formData.aadhaar) companyPayload.append('aadhaar', formData.aadhaar);
// // //             if (formData.pan) companyPayload.append('pan', formData.pan);
// // //             if (formData.electricityBill) companyPayload.append('electricityBill', formData.electricityBill);
// // //             if (formData.passportPhoto) companyPayload.append('passportPhoto', formData.passportPhoto);

// // //             const res = await registerCompany(companyPayload);
// // //             setSuccessMessage(res.message || "Company registered successfully!");
// // //         } catch (err) {
// // //             console.error("Company Registration Failed:", err);
// // //             setError(err.response?.data?.message || err.message || "Registration failed. Please try again.");
// // //         } finally {
// // //             setLoading(false);
// // //         }
// // //     };

// // //     const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

// // //     return (
// // //         <>
// // //             {isLoggedIn && (
// // //                 <Button variant="outline-light" className="fw-bold py-2 px-4 rounded-pill" onClick={() => setShowModal(true)}>
// // //                     Register Your Company
// // //                 </Button>
// // //             )}

// // //             <Modal show={showModal} onHide={handleClose} size="xl" centered scrollable backdrop="static">
// // //                 <Modal.Header closeButton className="bg-primary text-white">
// // //                     <Modal.Title><i className="bi bi-building me-2"></i> Company Registration</Modal.Title>
// // //                 </Modal.Header>
// // //                 <Modal.Body className="p-4">
// // //                     {successMessage && <Alert variant="success" className="text-center">{successMessage}</Alert>}
// // //                     {error && <Alert variant="danger" className="text-center">{error}</Alert>}
// // //                     <Form onSubmit={handleSubmit}>
// // //                         {/* Basic Information */}
// // //                         <h4 className="mb-3 text-primary border-bottom pb-2">Basic Information</h4>
// // //                         <Row className="mb-3 g-3">
// // //                             <Form.Group as={Col} md="4">
// // //                                 <Form.Label className="fw-bold">Company Name <span className="text-danger">*</span></Form.Label>
// // //                                 <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter company's legal name" required />
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="4">
// // //                                 <Form.Label className="fw-bold">Email <span className="text-danger">*</span></Form.Label>
// // //                                 <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="e.g., info@company.com" required />
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="4">
// // //                                 <Form.Label className="fw-bold">Phone <span className="text-danger">*</span></Form.Label>
// // //                                 <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g., +91-9876543210" required />
// // //                             </Form.Group>
// // //                         </Row>
// // //                         <Row className="mb-4 g-3">
                          
// // //                              <Form.Group as={Col} md="4">
// // //                                 <Form.Label className="fw-bold">Category <span className="text-danger">*</span></Form.Label>
// // //                                 <Form.Select name="category" value={formData.category} onChange={handleChange} required disabled={loading}>
// // //                                     <option value="">Select Category</option>
// // //                                     {allCategories.map(cat => ( <option key={cat._id} value={cat._id}>{cat.name} ({cat.type.charAt(0).toUpperCase() + cat.type.slice(1)})</option> ))}
// // //                                 </Form.Select>
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="4">
// // //                                 <Form.Label className="fw-bold">SubCategory</Form.Label>
// // //                                 <Form.Select name="subCategory" value={formData.subCategory} onChange={handleChange} disabled={!formData.category || filteredSubCategories.length === 0 || loading}>
// // //                                     <option value="">Select SubCategory (Optional)</option>
// // //                                     {filteredSubCategories.map(subCat => ( <option key={subCat._id} value={subCat._id}>{subCat.name}</option> ))}
// // //                                 </Form.Select>
// // //                             </Form.Group>
// // //                         </Row>
// // //                         {/* Address Details */}
// // //                         <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Address Details</h4>
// // //                         <Row className="mb-4 g-3">
// // //                             <Form.Group as={Col} md="6">
// // //                                 <Form.Label className="fw-bold">Address</Form.Label>
// // //                                 <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Street, Building, Locality" />
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="2">
// // //                                 <Form.Label className="fw-bold">Country</Form.Label>
// // //                                 <Form.Control type="text" value="India" readOnly disabled className="bg-light" />
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="2">
// // //                                 <Form.Label className="fw-bold">State <span className="text-danger">*</span></Form.Label>
// // //                                 <Form.Select name="state" value={formData.state} onChange={handleChange} required disabled={loading || allStates.length === 0}>
// // //                                     <option value="">Select State</option>
// // //                                     {allStates.map(s => ( <option key={s._id} value={s._id}>{s.name}</option> ))}
// // //                                 </Form.Select>
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="2">
// // //                                 <Form.Label className="fw-bold">City <span className="text-danger">*</span></Form.Label>
// // //                                 <Form.Select name="city" value={formData.city} onChange={handleChange} required disabled={!formData.state || allCities.length === 0 || loading}>
// // //                                     <option value="">Select City</option>
// // //                                     {allCities.map(c => ( <option key={c._id} value={c._id}>{c.name}</option> ))}
// // //                                 </Form.Select>
// // //                             </Form.Group>
// // //                         </Row>
// // //                         {/* Documents & Business Type */}
// // //                         <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Documents & Business Type</h4>
// // //                         <Row className="mb-4 g-3">
// // //                             <Form.Group as={Col} md="4">
// // //                                 <Form.Label className="fw-bold">GST Number</Form.Label>
// // //                                 <Form.Control type="text" name="gstNumber" value={formData.gstNumber} onChange={handleChange} placeholder="Optional: Enter GSTIN" />
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="4">
// // //                                 <Form.Label className="fw-bold">Aadhaar Number</Form.Label>
// // //                                 <Form.Control type="text" name="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleChange} placeholder="Optional: Enter Aadhaar Number" />
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="4">
// // //                                 <Form.Label className="fw-bold">Company Type</Form.Label>
// // //                                 <Form.Control type="text" value={formData.companyType.charAt(0).toUpperCase() + formData.companyType.slice(1)} readOnly disabled className="bg-light" />
// // //                                 <Form.Text className="text-muted">Automatically set by selected category.</Form.Text>
// // //                             </Form.Group>
// // //                         </Row>
// // //                         {/* Additional Details */}
// // //                         <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Additional Details</h4>
// // //                         <Row className="mb-3 g-3">
// // //                             <Form.Group as={Col} md="6">
// // //                                 <Form.Label className="fw-bold">Website (URL)</Form.Label>
// // //                                 <Form.Control type="url" name="website" value={formData.website} onChange={handleChange} placeholder="e.g., https://www.yourcompany.com" />
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="6">
// // //                                 <Form.Label className="fw-bold">Google Maps Link</Form.Label>
// // //                                 <Form.Control type="url" name="googleMapsLink" value={formData.googleMapsLink} onChange={handleChange} placeholder="Paste Google Maps URL here" />
// // //                             </Form.Group>
// // //                         </Row>
// // //                         <Form.Group className="mb-4">
// // //                             <Form.Label className="fw-bold">Description</Form.Label>
// // //                             <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} placeholder="Provide a brief description of your company..." />
// // //                         </Form.Group>
// // //                         {/* Social Links */}
// // //                         <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Social Links</h4>
// // //                         {socialLinks.map((link, index) => (
// // //                             <InputGroup className="mb-2" key={`social-${index}`}>
// // //                                 <InputGroup.Text className="bg-light"><i className="bi bi-link-45deg"></i></InputGroup.Text>
// // //                                 <Form.Control type="url" placeholder="e.g., https://facebook.com/yourpage" value={link} onChange={(e) => handleSocialLinkChange(index, e.target.value)} />
// // //                                 {socialLinks.length > 1 && ( <Button variant="outline-danger" onClick={() => removeSocialLink(index)}><i className="bi bi-trash"></i></Button> )}
// // //                             </InputGroup>
// // //                         ))}
// // //                         <Button variant="outline-success" size="sm" onClick={addSocialLink} className="mb-4"><i className="bi bi-plus-circle me-1"></i> Add Another Social Link</Button>
// // //                         {/* Keywords */}
// // //                         <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Keywords</h4>
// // //                         <Form.Text className="text-muted mb-2 d-block">Enter keywords that best describe your business.</Form.Text>
// // //                         {keywords.map((keyword, index) => (
// // //                             <InputGroup className="mb-2" key={`keyword-${index}`}>
// // //                                 <InputGroup.Text className="bg-light"><i className="bi bi-tag"></i></InputGroup.Text>
// // //                                 <Form.Control type="text" placeholder="e.g., restaurant, plumbing, lawyer" value={keyword} onChange={(e) => handleKeywordChange(index, e.target.value)} />
// // //                                 {keywords.length > 1 && ( <Button variant="outline-danger" onClick={() => removeKeyword(index)}><i className="bi bi-trash"></i></Button> )}
// // //                             </InputGroup>
// // //                         ))}
// // //                         <Button variant="outline-success" size="sm" onClick={addKeyword} className="mb-4"><i className="bi bi-plus-circle me-1"></i> Add Another Keyword</Button>

// // //                         {/* ✅ यहाँ बदलाव किया गया है: Business Timings Section */}
// // //                         <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Business Timings</h4>
// // //                         <p className="text-muted">Set your opening and closing times. Leave fields blank if the business is closed on that day.</p>
                        
// // //                         {/* New section for setting all days at once */}
// // //                         <Row className="mb-3 p-3 border rounded bg-light align-items-center g-3">
// // //                             <Col xs={12}>
// // //                                 <h6 className="mb-2 text-dark">Set Timings for All Days</h6>
// // //                             </Col>
// // //                             <Col xs={12} md={4}>
// // //                                 <InputGroup>
// // //                                     <InputGroup.Text style={{fontSize: '0.85rem'}}>Open All Days</InputGroup.Text>
// // //                                     <Form.Control
// // //                                         type="time"
// // //                                         value={allDaysOpenTime}
// // //                                         onChange={(e) => setAllDaysOpenTime(e.target.value)}
// // //                                     />
// // //                                 </InputGroup>
// // //                             </Col>
// // //                             <Col xs={12} md={4}>
// // //                                 <InputGroup>
// // //                                     <InputGroup.Text style={{fontSize: '0.85rem'}}>Close All Days</InputGroup.Text>
// // //                                     <Form.Control
// // //                                         type="time"
// // //                                         value={allDaysCloseTime}
// // //                                         onChange={(e) => setAllDaysCloseTime(e.target.value)}
// // //                                     />
// // //                                 </InputGroup>
// // //                             </Col>
// // //                             <Col xs={12} md={4}>
// // //                                 <Button
// // //                                     variant="info"
// // //                                     onClick={handleSetAllDaysTimings}
// // //                                     className="w-100"
// // //                                     disabled={!allDaysOpenTime && !allDaysCloseTime} // Disable if both are empty
// // //                                 >
// // //                                     <i className="bi bi-calendar-check me-2"></i>Apply to All Days
// // //                                 </Button>
// // //                             </Col>
// // //                         </Row>

// // //                         {/* Individual Day Timings */}
// // //                         {daysOfWeek.map(day => (
// // //                             <Row className="mb-2 align-items-center g-3" key={day}>
// // //                                 <Col xs={12} md={2}>
// // //                                     <Form.Label className="text-capitalize fw-bold mb-0">{day}</Form.Label>
// // //                                 </Col>
// // //                                 <Col xs={6} md={5}>
// // //                                     <InputGroup>
// // //                                         <InputGroup.Text style={{fontSize: '0.85rem'}}>Open</InputGroup.Text>
// // //                                         <Form.Control
// // //                                             type="time"
// // //                                             value={businessTimings[day].open}
// // //                                             onChange={(e) => handleBusinessTimingChange(day, 'open', e.target.value)}
// // //                                         />
// // //                                     </InputGroup>
// // //                                 </Col>
// // //                                 <Col xs={6} md={5}>
// // //                                     <InputGroup>
// // //                                         <InputGroup.Text style={{fontSize: '0.85rem'}}>Close</InputGroup.Text>
// // //                                         <Form.Control
// // //                                             type="time"
// // //                                             value={businessTimings[day].close}
// // //                                             onChange={(e) => handleBusinessTimingChange(day, 'close', e.target.value)}
// // //                                         />
// // //                                     </InputGroup>
// // //                                 </Col>
// // //                             </Row>
// // //                         ))}

// // //                         {/* File Uploads */}
// // //                         <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Upload Documents & Media</h4>
// // //                         <p className="text-muted">Upload required documents and media files for your company profile.</p>
// // //                         <Row className="mb-3 g-3">
// // //                             <Form.Group as={Col} md="6">
// // //                                 <Form.Label className="fw-bold">Company Logo (Max 1) <span className="text-danger">*</span></Form.Label>
// // //                                 <Form.Control type="file" name="logo" accept="image/*" onChange={handleFileChange} required />
// // //                                 <Form.Text className="text-muted">Accepts image files (e.g., JPG, PNG).</Form.Text>
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="6">
// // //                                 <Form.Label className="fw-bold">Aadhaar Image (Max 1)</Form.Label>
// // //                                 <Form.Control type="file" name="aadhaar" accept="image/*,application/pdf" onChange={handleFileChange} />
// // //                                 <Form.Text className="text-muted">Accepts image or PDF files.</Form.Text>
// // //                             </Form.Group>
// // //                         </Row>
                       
// // //                         <Row className="mb-4 g-3">
// // //                             <Form.Group as={Col} md="6">
// // //                                 <Form.Label className="fw-bold">Passport Photo (Max 1)</Form.Label>
// // //                                 <Form.Control type="file" name="passportPhoto" accept="image/*" onChange={handleFileChange} />
// // //                                 <Form.Text className="text-muted">Accepts image files (e.g., JPG, PNG).</Form.Text>
// // //                             </Form.Group>
// // //                             <Form.Group as={Col} md="6">
// // //                                 <Form.Label className="fw-bold">Banner Images (Max 5)</Form.Label>
// // //                                 <Form.Control type="file" name="banner" accept="image/*" multiple onChange={handleFileChange} />
// // //                                 <Form.Text className="text-muted">You can select up to 5 banner images (JPG, PNG).</Form.Text>
// // //                             </Form.Group>
// // //                         </Row>

// // //                         <div className="d-flex justify-content-end mt-4 pt-3 border-top">
// // //                             <Button variant="secondary" onClick={handleClose} className="me-2">Close</Button>
// // //                             <Button variant="primary" type="submit" disabled={loading}>
// // //                                 {loading ? <><Spinner animation="border" size="sm" className="me-2" /> Registering...</> : "Register Company"}
// // //                             </Button>
// // //                         </div>
// // //                     </Form>
// // //                 </Modal.Body>
// // //             </Modal>
// // //         </>
// // //     );
// // // };

// // // export default CompanyRegistrationForm;


// import React, { useState, useEffect } from 'react';
// import {
//     Modal, Button, Form, Row, Col, Alert, Spinner, InputGroup
// } from 'react-bootstrap';
// import {
//     registerCompany,
//     getAllCompanyCategories,
//     getAllCompanySubCategories,
//     getStatesByCountry,
//     getCitiesByState,
// } from '../Services/authApi';
 
// // Helper to get the current token dynamically from localStorage
// const getToken = () => localStorage.getItem('token');
 
// // A small custom hook for managing dynamic array inputs (e.g., social links, keywords)
// const useArrayInput = (initialValue = ['']) => {
//     const [items, setItems] = useState(initialValue);
 
//     const handleItemChange = (index, value) => {
//         const newItems = [...items];
//         newItems[index] = value;
//         setItems(newItems);
//     };
 
//     const addItem = () => setItems([...items, '']);
//     const removeItem = (index) => setItems(items.filter((_, i) => i !== index));
 
//     return [items, handleItemChange, addItem, removeItem, setItems];
// };
 
// const INDIA_DEFAULT_COUNTRY_ID = "687a1e2185f0230715032380";
 
// const CompanyRegistrationForm = () => {
//     const [showModal, setShowModal] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');
 
//     const [allCategories, setAllCategories] = useState([]);
//     const [allSubCategories, setAllSubCategories] = useState([]);
//     const [filteredSubCategories, setFilteredSubCategories] = useState([]);
 
//     const [allStates, setAllStates] = useState([]);
//     const [allCities, setAllCities] = useState([]);
 
//     const [formData, setFormData] = useState({
//         name: '', email: '', phone: '', 
//         address: '',
//         city: '',
//         state: '',
//         country: INDIA_DEFAULT_COUNTRY_ID,
//         gstNumber: '', aadhaarNumber: '',
//         category: '', subCategory: '', companyType: 'service',
//         website: '', googleMapsLink: '', description: '',
//         logo: null,
//         banner: [],
//         aadhaar: null,
       
//         passportPhoto: null,
//     });
 
//     const [socialLinks, handleSocialLinkChange, addSocialLink, removeSocialLink, setSocialLinks] = useArrayInput(['']);
//     const [keywords, handleKeywordChange, addKeyword, removeKeyword, setKeywords] = useArrayInput(['']);
   
//     const initialBusinessTimings = {
//         sunday: { open: '', close: '' },
//         monday: { open: '', close: '' },
//         tuesday: { open: '', close: '' },
//         wednesday: { open: '', close: '' },
//         thursday: { open: '', close: '' },
//         friday: { open: '', close: '' },
//         saturday: { open: '', close: '' },
//     };
//     const [businessTimings, setBusinessTimings] = useState(initialBusinessTimings);

//     // New states for global timing application
//     const [globalOpenTime, setGlobalOpenTime] = useState('');
//     const [globalCloseTime, setGlobalCloseTime] = useState('');
 
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
 
//     useEffect(() => {
//         const token = getToken();
//         setIsLoggedIn(!!token);
//     }, []);
 
//     useEffect(() => {
//         const fetchInitialLookupData = async () => {
//             if (!isLoggedIn) return;
//             setLoading(true);
//             setError('');
//             try {
//                 const categoriesRes = await getAllCompanyCategories();
//                 setAllCategories(categoriesRes?.data || []);
//                 const subCategoriesRes = await getAllCompanySubCategories();
//                 setAllSubCategories(subCategoriesRes.data || []);
//                 if (INDIA_DEFAULT_COUNTRY_ID) {
//                     const statesRes = await getStatesByCountry(INDIA_DEFAULT_COUNTRY_ID);
//                     setAllStates(statesRes?.data || []);
//                 }
//             } catch (err) {
//                 console.error("Error fetching initial lookup data:", err);
//                 setError(err.response?.data?.message || err.message || "Failed to load essential data.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchInitialLookupData();
//     }, [isLoggedIn]);
 
//     useEffect(() => {
//         if (formData.category) {
//             const categoryObj = allCategories.find(cat => cat._id === formData.category);
//             setFormData(prev => ({ ...prev, companyType: categoryObj ? categoryObj.type : 'service' }));
//             const filtered = allSubCategories.filter(
//                 sub => String(sub.parentCategory?._id || sub.parentCategory) === String(formData.category)
//             );
//             setFilteredSubCategories(filtered);
//             setFormData(prev => ({ ...prev, subCategory: '' }));
//         } else {
//             setFilteredSubCategories([]);
//         }
//     }, [formData.category, allCategories, allSubCategories]);
 
//     useEffect(() => {
//         const fetchCities = async () => {
//             if (formData.state) {
//                 setError('');
//                 try {
//                     const citiesRes = await getCitiesByState(formData.state);
//                     setAllCities(citiesRes?.data || []);
//                     setFormData(prev => ({ ...prev, city: '' }));
//                 } catch (err) {
//                     console.error(`Error fetching cities for state ${formData.state}:`, err);
//                     setError(err.response?.data?.message || err.message || "Failed to load cities.");
//                 }
//             } else {
//                 setAllCities([]);
//                 setFormData(prev => ({ ...prev, city: '' }));
//             }
//         };
//         fetchCities();
//     }, [formData.state]);
 
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };
 
//     const handleFileChange = (e) => {
//         const { name, files } = e.target;
//         if (name === 'banner') {
//             setFormData(prev => ({ ...prev, [name]: Array.from(files) }));
//         } else {
//             setFormData(prev => ({ ...prev, [name]: files[0] }));
//         }
//     };
 
//     const handleBusinessTimingChange = (day, field, value) => {
//         setBusinessTimings(prev => ({
//             ...prev,
//             [day]: { ...prev[day], [field]: value }
//         }));
//     };

//     // New handler for global open/close time inputs
//     const handleGlobalTimeChange = (field, value) => {
//         if (field === 'open') {
//             setGlobalOpenTime(value);
//         } else {
//             setGlobalCloseTime(value);
//         }
//     };

//     // New function to apply global timings to all days
//     const applyGlobalTimings = () => {
//         const newTimings = {};
//         daysOfWeek.forEach(day => {
//             newTimings[day] = {
//                 open: globalOpenTime,
//                 close: globalCloseTime,
//             };
//         });
//         setBusinessTimings(newTimings);
//     };
   
//     const handleClose = () => {
//         setShowModal(false);
//         setFormData({
//             name: '', email: '', phone: '', 
//             address: '', city: '', state: '', country: INDIA_DEFAULT_COUNTRY_ID,
//             gstNumber: '', aadhaarNumber: '',
//             category: '', subCategory: '', companyType: 'service',
//             website: '', googleMapsLink: '', description: '',
//             logo: null, banner: [], aadhaar: null, 
//            passportPhoto: null,
//         });
//         setSocialLinks(['']);
//         setKeywords(['']);
//         setBusinessTimings(initialBusinessTimings);
//         setGlobalOpenTime(''); // Reset global times
//         setGlobalCloseTime(''); // Reset global times
//         setError('');
//         setSuccessMessage('');
//         setAllStates([]);
//         setAllCities([]);
//     };
 
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError('');
//         setSuccessMessage('');
//         if (!isLoggedIn) {
//             setError("You must be logged in to register a company.");
//             setLoading(false);
//             return;
//         }
 
//         try {
//             const companyPayload = new FormData();
//             for (const key in formData) {
//                 if (['logo', 'banner', 'aadhaar', 'passportPhoto'].includes(key)) continue;
//                 if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
//                     companyPayload.append(key, formData[key]);
//                 }
//             }
//             companyPayload.append('socialLinks', JSON.stringify(socialLinks.filter(link => link.trim() !== '')));
//             companyPayload.append('keywords', JSON.stringify(keywords.filter(keyword => keyword.trim() !== '')));
           
//             const formattedTimings = {};
//             for (const day in businessTimings) {
//                 formattedTimings[day] = {
//                     open: businessTimings[day].open || 'Closed', // Send 'Closed' if blank
//                     close: businessTimings[day].close || 'Closed' // Send 'Closed' if blank
//                 };
//             }
//             companyPayload.append('businessTimings', JSON.stringify(formattedTimings));
 
//             if (formData.logo) companyPayload.append('logo', formData.logo);
//             formData.banner.forEach(file => companyPayload.append('banner', file));
//             if (formData.aadhaar) companyPayload.append('aadhaar', formData.aadhaar);
         
//             if (formData.passportPhoto) companyPayload.append('passportPhoto', formData.passportPhoto);
 
//             const res = await registerCompany(companyPayload);
//             setSuccessMessage(res.message || "Company registered successfully!");
//         } catch (err) {
//             console.error("Company Registration Failed:", err);
//             setError(err.response?.data?.message || err.message || "Registration failed. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };
 
//     const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
 
//     return (
//         <>
//             {isLoggedIn && (
//                 <Button variant="outline-light" className="fw-bold py-2 px-4 rounded-pill" onClick={() => setShowModal(true)}>
//                     Register Your Company
//                 </Button>
//             )}
 
//             <Modal show={showModal} onHide={handleClose} size="xl" centered scrollable backdrop="static">
//                 <Modal.Header closeButton className="bg-primary text-white">
//                     <Modal.Title><i className="bi bi-building me-2"></i> Company Registration</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body className="p-4">
//                     {successMessage && <Alert variant="success" className="text-center">{successMessage}</Alert>}
//                     {error && <Alert variant="danger" className="text-center">{error}</Alert>}
//                     <Form onSubmit={handleSubmit}>
//                         {/* Basic Information */}
//                         <h4 className="mb-3 text-primary border-bottom pb-2">Basic Information</h4>
//                         <Row className="mb-3 g-3">
//                             <Form.Group as={Col} md="4">
//                                 <Form.Label className="fw-bold">Company Name <span className="text-danger">*</span></Form.Label>
//                                 <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter company's legal name" required />
//                             </Form.Group>
//                             <Form.Group as={Col} md="4">
//                                 <Form.Label className="fw-bold">Email <span className="text-danger">*</span></Form.Label>
//                                 <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="e.g., info@company.com" required />
//                             </Form.Group>
//                             <Form.Group as={Col} md="4">
//                                 <Form.Label className="fw-bold">Phone <span className="text-danger">*</span></Form.Label>
//                                 <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g., +91-9876543210" required />
//                             </Form.Group>
//                         </Row>
//                         <Row className="mb-4 g-3">
                           
//                              <Form.Group as={Col} md="4">
//                                 <Form.Label className="fw-bold">Category <span className="text-danger">*</span></Form.Label>
//                                 <Form.Select name="category" value={formData.category} onChange={handleChange} required disabled={loading}>
//                                     <option value="">Select Category</option>
//                                     {allCategories.map(cat => ( <option key={cat._id} value={cat._id}>{cat.name} ({cat.type.charAt(0).toUpperCase() + cat.type.slice(1)})</option> ))}
//                                 </Form.Select>
//                             </Form.Group>
//                             <Form.Group as={Col} md="4">
//                                 <Form.Label className="fw-bold">SubCategory</Form.Label>
//                                 <Form.Select name="subCategory" value={formData.subCategory} onChange={handleChange} disabled={!formData.category || filteredSubCategories.length === 0 || loading}>
//                                     <option value="">Select SubCategory (Optional)</option>
//                                     {filteredSubCategories.map(subCat => ( <option key={subCat._id} value={subCat._id}>{subCat.name}</option> ))}
//                                 </Form.Select>
//                             </Form.Group>
//                         </Row>

                        
//                         {/* Address Details */}
//                         <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Address Details</h4>
//                         <Row className="mb-4 g-3">
//                             <Form.Group as={Col} md="6">
//                                 <Form.Label className="fw-bold">Address</Form.Label>
//                                 <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Street, Building, Locality" />
//                             </Form.Group>
//                             <Form.Group as={Col} md="2">
//                                 <Form.Label className="fw-bold">Country</Form.Label>
//                                 <Form.Control type="text" value="India" readOnly disabled className="bg-light" />
//                             </Form.Group>
//                             <Form.Group as={Col} md="2">
//                                 <Form.Label className="fw-bold">State <span className="text-danger">*</span></Form.Label>
//                                 <Form.Select name="state" value={formData.state} onChange={handleChange} required disabled={loading || allStates.length === 0}>
//                                     <option value="">Select State</option>
//                                     {allStates.map(s => ( <option key={s._id} value={s._id}>{s.name}</option> ))}
//                                 </Form.Select>
//                             </Form.Group>
//                             <Form.Group as={Col} md="2">
//                                 <Form.Label className="fw-bold">City <span className="text-danger">*</span></Form.Label>
//                                 <Form.Select name="city" value={formData.city} onChange={handleChange} required disabled={!formData.state || allCities.length === 0 || loading}>
//                                     <option value="">Select City</option>
//                                     {allCities.map(c => ( <option key={c._id} value={c._id}>{c.name}</option> ))}
//                                 </Form.Select>
//                             </Form.Group>
//                         </Row>
//                         {/* Documents & Business Type */}
//                         <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Documents & Business Type</h4>
//                         <Row className="mb-4 g-3">
//                             <Form.Group as={Col} md="4">
//                                 <Form.Label className="fw-bold">GST Number</Form.Label>
//                                 <Form.Control type="text" name="gstNumber" value={formData.gstNumber} onChange={handleChange} placeholder="Optional: Enter GSTIN" />
//                             </Form.Group>
//                             <Form.Group as={Col} md="4">
//                                 <Form.Label className="fw-bold">Aadhaar Number</Form.Label>
//                                 <Form.Control type="text" name="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleChange} placeholder="Optional: Enter Aadhaar Number" />
//                             </Form.Group>
//                             <Form.Group as={Col} md="4">
//                                 <Form.Label className="fw-bold">Company Type</Form.Label>
//                                 <Form.Control type="text" value={formData.companyType.charAt(0).toUpperCase() + formData.companyType.slice(1)} readOnly disabled className="bg-light" />
//                                 <Form.Text className="text-muted">Automatically set by selected category.</Form.Text>
//                             </Form.Group>
//                         </Row>
//                         {/* Additional Details */}
//                         <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Additional Details</h4>
//                         <Row className="mb-3 g-3">
//                             <Form.Group as={Col} md="6">
//                                 <Form.Label className="fw-bold">Website (URL)</Form.Label>
//                                 <Form.Control type="url" name="website" value={formData.website} onChange={handleChange} placeholder="e.g., https://www.yourcompany.com" />
//                             </Form.Group>
//                             <Form.Group as={Col} md="6">
//                                 <Form.Label className="fw-bold">Google Maps Link</Form.Label>
//                                 <Form.Control type="url" name="googleMapsLink" value={formData.googleMapsLink} onChange={handleChange} placeholder="Paste Google Maps URL here" />
//                             </Form.Group>
//                         </Row>
//                         <Form.Group className="mb-4">
//                             <Form.Label className="fw-bold">Description</Form.Label>
//                             <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} placeholder="Provide a brief description of your company..." />
//                         </Form.Group>
//                         {/* Social Links */}
//                         <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Social Links</h4>
//                         {socialLinks.map((link, index) => (
//                             <InputGroup className="mb-2" key={`social-${index}`}>
//                                 <InputGroup.Text className="bg-light"><i className="bi bi-link-45deg"></i></InputGroup.Text>
//                                 <Form.Control type="url" placeholder="e.g., https://facebook.com/yourpage" value={link} onChange={(e) => handleSocialLinkChange(index, e.target.value)} />
//                                 {socialLinks.length > 1 && ( <Button variant="outline-danger" onClick={() => removeSocialLink(index)}><i className="bi bi-trash"></i></Button> )}
//                             </InputGroup>
//                         ))}
//                         <Button variant="outline-success" size="sm" onClick={addSocialLink} className="mb-4"><i className="bi bi-plus-circle me-1"></i> Add Another Social Link</Button>
//                         {/* Keywords */}
//                         <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Keywords</h4>
//                         <Form.Text className="text-muted mb-2 d-block">Enter keywords that best describe your business.</Form.Text>
//                         {keywords.map((keyword, index) => (
//                             <InputGroup className="mb-2" key={`keyword-${index}`}>
//                                 <InputGroup.Text className="bg-light"><i className="bi bi-tag"></i></InputGroup.Text>
//                                 <Form.Control type="text" placeholder="e.g., restaurant, plumbing, lawyer" value={keyword} onChange={(e) => handleKeywordChange(index, e.target.value)} />
//                                 {keywords.length > 1 && ( <Button variant="outline-danger" onClick={() => removeKeyword(index)}><i className="bi bi-trash"></i></Button> )}
//                             </InputGroup>
//                         ))}
//                         <Button variant="outline-success" size="sm" onClick={addKeyword} className="mb-4"><i className="bi bi-plus-circle me-1"></i> Add Another Keyword</Button>
 
//                         {/* Business Timings Section */}
//                         <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Business Timings</h4>
//                         <p className="text-muted">Set your opening and closing times. Leave fields blank if the business is closed on that day.</p>
                        
//                         {/* New section for applying timings to all days */}
//                         <Row className="mb-4 p-3 bg-light rounded shadow-sm">
//                             <Col xs={12}>
//                                 <h6 className="mb-3 text-primary">Apply Timings to All Days</h6>
//                             </Col>
//                             <Form.Group as={Col} md="5" className="mb-2 mb-md-0">
//                                 <InputGroup>
//                                     <InputGroup.Text>Open</InputGroup.Text>
//                                     <Form.Control
//                                         type="time"
//                                         value={globalOpenTime}
//                                         onChange={(e) => handleGlobalTimeChange('open', e.target.value)}
//                                     />
//                                 </InputGroup>
//                             </Form.Group>
//                             <Form.Group as={Col} md="5" className="mb-2 mb-md-0">
//                                 <InputGroup>
//                                     <InputGroup.Text>Close</InputGroup.Text>
//                                     <Form.Control
//                                         type="time"
//                                         value={globalCloseTime}
//                                         onChange={(e) => handleGlobalTimeChange('close', e.target.value)}
//                                     />
//                                 </InputGroup>
//                             </Form.Group>
//                             <Col xs={12} md="2" className="d-flex align-items-end justify-content-end">
//                                 <Button 
//                                     variant="info" 
//                                     onClick={applyGlobalTimings} 
//                                     size="sm"
//                                     className="w-100"
//                                     disabled={!globalOpenTime && !globalCloseTime} // Disable if both are empty
//                                 >
//                                     <i className="bi bi-arrow-down-up me-1"></i> Apply to All
//                                 </Button>
//                             </Col>
//                             <Col xs={12} className="mt-2">
//                                 <Form.Text className="text-muted">
//                                     Set times above and click "Apply to All" to instantly update all days. Leave empty for 'Closed'.
//                                 </Form.Text>
//                             </Col>
//                         </Row>


//                         {daysOfWeek.map(day => (
//                             <Row className="mb-2 align-items-center g-3" key={day}>
//                                 <Col xs={12} md={2}>
//                                     <Form.Label className="text-capitalize fw-bold mb-0">{day}</Form.Label>
//                                 </Col>
//                                 {/* Open Time */}
//                                 <Col xs={6} md={5}>
//                                     <InputGroup>
//                                         <InputGroup.Text style={{ fontSize: '0.85rem' }}>Open</InputGroup.Text>
//                                         <Form.Control
//                                             type="time"
//                                             value={businessTimings[day].open}
//                                             onChange={(e) =>
//                                                 handleBusinessTimingChange(day, "open", e.target.value)
//                                             }
//                                         />
//                                     </InputGroup>
//                                 </Col>
//                                 {/* Close Time */}
//                                 <Col xs={6} md={5}>
//                                     <InputGroup>
//                                         <InputGroup.Text style={{ fontSize: '0.85rem' }}>Close</InputGroup.Text>
//                                         <Form.Control
//                                             type="time"
//                                             value={businessTimings[day].close}
//                                             onChange={(e) =>
//                                                 handleBusinessTimingChange(day, "close", e.target.value)
//                                             }
//                                         />
//                                     </InputGroup>
//                                 </Col>
//                             </Row>
//                         ))}
 
//                         {/* File Uploads */}
//                         <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Upload Documents & Media</h4>
//                         <p className="text-muted">Upload required documents and media files for your company profile.</p>
//                         <Row className="mb-3 g-3">
//                             <Form.Group as={Col} md="6">
//                                 <Form.Label className="fw-bold">Company Logo (Max 1) <span className="text-danger">*</span></Form.Label>
//                                 <Form.Control type="file" name="logo" accept="image/*" onChange={handleFileChange} required />
//                                 <Form.Text className="text-muted">Accepts image files (e.g., JPG, PNG).</Form.Text>
//                             </Form.Group>
//                             <Form.Group as={Col} md="6">
//                                 <Form.Label className="fw-bold">Aadhaar Image (Max 1)</Form.Label>
//                                 <Form.Control type="file" name="aadhaar" accept="image/*,application/pdf" onChange={handleFileChange} />
//                                 <Form.Text className="text-muted">Accepts image or PDF files.</Form.Text>
//                             </Form.Group>
//                         </Row>
                       
//                         <Row className="mb-4 g-3">
//                             <Form.Group as={Col} md="6">
//                                 <Form.Label className="fw-bold">Passport Photo (Max 1)</Form.Label>
//                                 <Form.Control type="file" name="passportPhoto" accept="image/*" onChange={handleFileChange} />
//                                 <Form.Text className="text-muted">Accepts image files (e.g., JPG, PNG).</Form.Text>
//                             </Form.Group>
//                             <Form.Group as={Col} md="6">
//                                 <Form.Label className="fw-bold">Business Images (Max 5)</Form.Label>
//                                 <Form.Control type="file" name="banner" accept="image/*" multiple onChange={handleFileChange} />
//                                 <Form.Text className="text-muted">You can select up to 5 Business images (JPG, PNG).</Form.Text>
//                             </Form.Group>
//                         </Row>
 
//                         <div className="d-flex justify-content-end mt-4 pt-3 border-top">
//                             <Button variant="secondary" onClick={handleClose} className="me-2">Close</Button>
//                             <Button variant="primary" type="submit" disabled={loading}>
//                                 {loading ? <><Spinner animation="border" size="sm" className="me-2" /> Registering...</> : "Register Company"}
//                             </Button>
//                         </div>
//                     </Form>
//                 </Modal.Body>
//             </Modal>
//         </>
//     );
// };
 
// export default CompanyRegistrationForm;

import React, { useState, useEffect } from 'react';
import {
    Modal, Button, Form, Row, Col, Alert, Spinner, InputGroup
} from 'react-bootstrap';
import {
    registerCompany,
    getAllCompanyCategories,
    getAllCompanySubCategories,
    getStatesByCountry,
    getCitiesByState,
} from '../Services/authApi';
 
// Helper to get the current token dynamically from localStorage
const getToken = () => localStorage.getItem('token');

// Helper to get the email from localStorage
const getEmailFromLocalStorage = () => {
    try {
        const userString = localStorage.getItem('user'); // Assuming 'user' is the key for the stored object
        if (userString) {
            const user = JSON.parse(userString);
            return user.email || '';
        }
    } catch (e) {
        console.error("Error parsing user data from localStorage", e);
    }
    return '';
};
 
// A small custom hook for managing dynamic array inputs (e.g., social links, keywords)
const useArrayInput = (initialValue = ['']) => {
    const [items, setItems] = useState(initialValue);
 
    const handleItemChange = (index, value) => {
        const newItems = [...items];
        newItems[index] = value;
        setItems(newItems);
    };
 
    const addItem = () => setItems([...items, '']);
    const removeItem = (index) => setItems(items.filter((_, i) => i !== index));
 
    return [items, handleItemChange, addItem, removeItem, setItems];
};
 
const INDIA_DEFAULT_COUNTRY_ID = "687a1e2185f0230715032380";
 
const CompanyRegistrationForm = () => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
 
    const [allCategories, setAllCategories] = useState([]);
    const [allSubCategories, setAllSubCategories] = useState([]);
    const [filteredSubCategories, setFilteredSubCategories] = useState([]);
 
    const [allStates, setAllStates] = useState([]);
    const [allCities, setAllCities] = useState([]);
 
    // Initialize formData with email from localStorage
    const [formData, setFormData] = useState({
        name: '', 
        email: getEmailFromLocalStorage(), // Retrieve email from localStorage here
        phone: '', 
        address: '',
        city: '',
        state: '',
        country: INDIA_DEFAULT_COUNTRY_ID,
        gstNumber: '', aadhaarNumber: '',
        category: '', subCategory: '', companyType: 'service',
        website: '', googleMapsLink: '', description: '',
        logo: null,
        banner: [],
        aadhaar: null,
        passportPhoto: null,
    });
 
    const [socialLinks, handleSocialLinkChange, addSocialLink, removeSocialLink, setSocialLinks] = useArrayInput(['']);
    const [keywords, handleKeywordChange, addKeyword, removeKeyword, setKeywords] = useArrayInput(['']);
   
    const initialBusinessTimings = {
        sunday: { open: '', close: '' },
        monday: { open: '', close: '' },
        tuesday: { open: '', close: '' },
        wednesday: { open: '', close: '' },
        thursday: { open: '', close: '' },
        friday: { open: '', close: '' },
        saturday: { open: '', close: '' },
    };
    const [businessTimings, setBusinessTimings] = useState(initialBusinessTimings);

    // New states for global timing application
    const [globalOpenTime, setGlobalOpenTime] = useState('');
    const [globalCloseTime, setGlobalCloseTime] = useState('');
 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
 
    useEffect(() => {
        const token = getToken();
        setIsLoggedIn(!!token);
    }, []);
 
    useEffect(() => {
        const fetchInitialLookupData = async () => {
            if (!isLoggedIn) return;
            setLoading(true);
            setError('');
            try {
                const categoriesRes = await getAllCompanyCategories();
                setAllCategories(categoriesRes?.data || []);
                const subCategoriesRes = await getAllCompanySubCategories();
                setAllSubCategories(subCategoriesRes.data || []);
                if (INDIA_DEFAULT_COUNTRY_ID) {
                    const statesRes = await getStatesByCountry(INDIA_DEFAULT_COUNTRY_ID);
                    setAllStates(statesRes?.data || []);
                }
            } catch (err) {
                console.error("Error fetching initial lookup data:", err);
                setError(err.response?.data?.message || err.message || "Failed to load essential data.");
            } finally {
                setLoading(false);
            }
        };
        fetchInitialLookupData();
    }, [isLoggedIn]);
 
    useEffect(() => {
        if (formData.category) {
            const categoryObj = allCategories.find(cat => cat._id === formData.category);
            setFormData(prev => ({ ...prev, companyType: categoryObj ? categoryObj.type : 'service' }));
            const filtered = allSubCategories.filter(
                sub => String(sub.parentCategory?._id || sub.parentCategory) === String(formData.category)
            );
            setFilteredSubCategories(filtered);
            setFormData(prev => ({ ...prev, subCategory: '' }));
        } else {
            setFilteredSubCategories([]);
        }
    }, [formData.category, allCategories, allSubCategories]);
 
    useEffect(() => {
        const fetchCities = async () => {
            if (formData.state) {
                setError('');
                try {
                    const citiesRes = await getCitiesByState(formData.state);
                    setAllCities(citiesRes?.data || []);
                    setFormData(prev => ({ ...prev, city: '' }));
                } catch (err) {
                    console.error(`Error fetching cities for state ${formData.state}:`, err);
                    setError(err.response?.data?.message || err.message || "Failed to load cities.");
                }
            } else {
                setAllCities([]);
                setFormData(prev => ({ ...prev, city: '' }));
            }
        };
        fetchCities();
    }, [formData.state]);
 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // No need to save email to localStorage on every change,
        // as the requirement was to pre-fill it from localStorage, not to save form changes back.
    };
 
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === 'banner') {
            setFormData(prev => ({ ...prev, [name]: Array.from(files) }));
        } else {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
        }
    };
 
    const handleBusinessTimingChange = (day, field, value) => {
        setBusinessTimings(prev => ({
            ...prev,
            [day]: { ...prev[day], [field]: value }
        }));
    };

    // New handler for global open/close time inputs
    const handleGlobalTimeChange = (field, value) => {
        if (field === 'open') {
            setGlobalOpenTime(value);
        } else {
            setGlobalCloseTime(value);
        }
    };

    // New function to apply global timings to all days
    const applyGlobalTimings = () => {
        const newTimings = {};
        daysOfWeek.forEach(day => {
            newTimings[day] = {
                open: globalOpenTime,
                close: globalCloseTime,
            };
        });
        setBusinessTimings(newTimings);
    };
   
    const handleClose = () => {
        setShowModal(false);
        // Reset form data, but retrieve email from localStorage for default
        setFormData({
            name: '', 
            email: getEmailFromLocalStorage(), // Reset email to localStorage value or empty
            phone: '', 
            address: '', city: '', state: '', country: INDIA_DEFAULT_COUNTRY_ID,
            gstNumber: '', aadhaarNumber: '',
            category: '', subCategory: '', companyType: 'service',
            website: '', googleMapsLink: '', description: '',
            logo: null, banner: [], aadhaar: null, 
            passportPhoto: null,
        });
        setSocialLinks(['']);
        setKeywords(['']);
        setBusinessTimings(initialBusinessTimings);
        setGlobalOpenTime(''); // Reset global times
        setGlobalCloseTime(''); // Reset global times
        setError('');
        setSuccessMessage('');
        setAllStates([]);
        setAllCities([]);
    };
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');
        if (!isLoggedIn) {
            setError("You must be logged in to register a company.");
            setLoading(false);
            return;
        }
 
        try {
            const companyPayload = new FormData();
            for (const key in formData) {
                if (['logo', 'banner', 'aadhaar', 'passportPhoto'].includes(key)) continue;
                if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
                    companyPayload.append(key, formData[key]);
                }
            }
            companyPayload.append('socialLinks', JSON.stringify(socialLinks.filter(link => link.trim() !== '')));
            companyPayload.append('keywords', JSON.stringify(keywords.filter(keyword => keyword.trim() !== '')));
           
            const formattedTimings = {};
            for (const day in businessTimings) {
                formattedTimings[day] = {
                    open: businessTimings[day].open || 'Closed', // Send 'Closed' if blank
                    close: businessTimings[day].close || 'Closed' // Send 'Closed' if blank
                };
            }
            companyPayload.append('businessTimings', JSON.stringify(formattedTimings));
 
            if (formData.logo) companyPayload.append('logo', formData.logo);
            formData.banner.forEach(file => companyPayload.append('banner', file));
            if (formData.aadhaar) companyPayload.append('aadhaar', formData.aadhaar);
         
            if (formData.passportPhoto) companyPayload.append('passportPhoto', formData.passportPhoto);
 
            const res = await registerCompany(companyPayload);
            setSuccessMessage(res.message || "Company registered successfully!");
        } catch (err) {
            console.error("Company Registration Failed:", err);
            setError(err.response?.data?.message || err.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };
 
    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
 
    return (
        <>
            {isLoggedIn && (
                <Button variant="outline-light" className="fw-bold py-2 px-4 rounded-pill" onClick={() => setShowModal(true)}>
                    Register Your Company
                </Button>
            )}
 
            <Modal show={showModal} onHide={handleClose} size="xl" centered scrollable backdrop="static">
                <Modal.Header closeButton className="bg-primary text-white">
                    <Modal.Title><i className="bi bi-building me-2"></i> Company Registration</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    {successMessage && <Alert variant="success" className="text-center">{successMessage}</Alert>}
                    {error && <Alert variant="danger" className="text-center">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        {/* Basic Information */}
                        <h4 className="mb-3 text-primary border-bottom pb-2">Basic Information</h4>
                        <Row className="mb-3 g-3">
                            <Form.Group as={Col} md="4">
                                <Form.Label className="fw-bold">Company Name <span className="text-danger">*</span></Form.Label>
                                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter company's legal name" required />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label className="fw-bold">Email <span className="text-danger">*</span></Form.Label>
                                <Form.Control type="email" name="email"  readOnly value={formData.email} onChange={handleChange} placeholder="e.g., info@company.com" required />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label className="fw-bold">Phone <span className="text-danger">*</span></Form.Label>
                                <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g., +91-9876543210" required />
                            </Form.Group>
                        </Row>
                        <Row className="mb-4 g-3">
                           
                             <Form.Group as={Col} md="4">
                                <Form.Label className="fw-bold">Category <span className="text-danger">*</span></Form.Label>
                                <Form.Select name="category" value={formData.category} onChange={handleChange} required disabled={loading}>
                                    <option value="">Select Category</option>
                                    {allCategories.map(cat => ( <option key={cat._id} value={cat._id}>{cat.name} ({cat.type.charAt(0).toUpperCase() + cat.type.slice(1)})</option> ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label className="fw-bold">SubCategory</Form.Label>
                                <Form.Select name="subCategory" value={formData.subCategory} onChange={handleChange} disabled={!formData.category || filteredSubCategories.length === 0 || loading}>
                                    <option value="">Select SubCategory (Optional)</option>
                                    {filteredSubCategories.map(subCat => ( <option key={subCat._id} value={subCat._id}>{subCat.name}</option> ))}
                                </Form.Select>
                            </Form.Group>
                        </Row>

                        
                        {/* Address Details */}
                        <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Address Details</h4>
                        <Row className="mb-4 g-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label className="fw-bold">Address</Form.Label>
                                <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Street, Building, Locality" />
                            </Form.Group>
                            <Form.Group as={Col} md="2">
                                <Form.Label className="fw-bold">Country</Form.Label>
                                <Form.Control type="text" value="India" readOnly disabled className="bg-light" />
                            </Form.Group>
                            <Form.Group as={Col} md="2">
                                <Form.Label className="fw-bold">State <span className="text-danger">*</span></Form.Label>
                                <Form.Select name="state" value={formData.state} onChange={handleChange} required disabled={loading || allStates.length === 0}>
                                    <option value="">Select State</option>
                                    {allStates.map(s => ( <option key={s._id} value={s._id}>{s.name}</option> ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} md="2">
                                <Form.Label className="fw-bold">City <span className="text-danger">*</span></Form.Label>
                                <Form.Select name="city" value={formData.city} onChange={handleChange} required disabled={!formData.state || allCities.length === 0 || loading}>
                                    <option value="">Select City</option>
                                    {allCities.map(c => ( <option key={c._id} value={c._id}>{c.name}</option> ))}
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        {/* Documents & Business Type */}
                        <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Documents & Business Type</h4>
                        <Row className="mb-4 g-3">
                            <Form.Group as={Col} md="4">
                                <Form.Label className="fw-bold">GST Number</Form.Label>
                                <Form.Control type="text" name="gstNumber" value={formData.gstNumber} onChange={handleChange} placeholder="Optional: Enter GSTIN" />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label className="fw-bold">Aadhaar Number</Form.Label>
                                <Form.Control type="text" name="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleChange} placeholder="Optional: Enter Aadhaar Number" />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label className="fw-bold">Company Type</Form.Label>
                                <Form.Control type="text" value={formData.companyType.charAt(0).toUpperCase() + formData.companyType.slice(1)} readOnly disabled className="bg-light" />
                                <Form.Text className="text-muted">Automatically set by selected category.</Form.Text>
                            </Form.Group>
                        </Row>
                        {/* Additional Details */}
                        <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Additional Details</h4>
                        <Row className="mb-3 g-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label className="fw-bold">Website (URL)</Form.Label>
                                <Form.Control type="url" name="website" value={formData.website} onChange={handleChange} placeholder="e.g., https://www.yourcompany.com" />
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label className="fw-bold">Google Maps Link</Form.Label>
                                <Form.Control type="url" name="googleMapsLink" value={formData.googleMapsLink} onChange={handleChange} placeholder="Paste Google Maps URL here" />
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-bold">Description</Form.Label>
                            <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} placeholder="Provide a brief description of your company..." />
                        </Form.Group>
                        {/* Social Links */}
                        <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Social Links</h4>
                        {socialLinks.map((link, index) => (
                            <InputGroup className="mb-2" key={`social-${index}`}>
                                <InputGroup.Text className="bg-light"><i className="bi bi-link-45deg"></i></InputGroup.Text>
                                <Form.Control type="url" placeholder="e.g., https://facebook.com/yourpage" value={link} onChange={(e) => handleSocialLinkChange(index, e.target.value)} />
                                {socialLinks.length > 1 && ( <Button variant="outline-danger" onClick={() => removeSocialLink(index)}><i className="bi bi-trash"></i></Button> )}
                            </InputGroup>
                        ))}
                        <Button variant="outline-success" size="sm" onClick={addSocialLink} className="mb-4"><i className="bi bi-plus-circle me-1"></i> Add Another Social Link</Button>
                        {/* Keywords */}
                        <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Keywords</h4>
                        <Form.Text className="text-muted mb-2 d-block">Enter keywords that best describe your business.</Form.Text>
                        {keywords.map((keyword, index) => (
                            <InputGroup className="mb-2" key={`keyword-${index}`}>
                                <InputGroup.Text className="bg-light"><i className="bi bi-tag"></i></InputGroup.Text>
                                <Form.Control type="text" placeholder="e.g., restaurant, plumbing, lawyer" value={keyword} onChange={(e) => handleKeywordChange(index, e.target.value)} />
                                {keywords.length > 1 && ( <Button variant="outline-danger" onClick={() => removeKeyword(index)}><i className="bi bi-trash"></i></Button> )}
                            </InputGroup>
                        ))}
                        <Button variant="outline-success" size="sm" onClick={addKeyword} className="mb-4"><i className="bi bi-plus-circle me-1"></i> Add Another Keyword</Button>
 
                        {/* Business Timings Section */}
                        <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Business Timings</h4>
                        <p className="text-muted">Set your opening and closing times. Leave fields blank if the business is closed on that day.</p>
                        
                        {/* New section for applying timings to all days */}
                        <Row className="mb-4 p-3 bg-light rounded shadow-sm">
                            <Col xs={12}>
                                <h6 className="mb-3 text-primary">Apply Timings to All Days</h6>
                            </Col>
                            <Form.Group as={Col} md="5" className="mb-2 mb-md-0">
                                <InputGroup>
                                    <InputGroup.Text>Open</InputGroup.Text>
                                    <Form.Control
                                        type="time"
                                        value={globalOpenTime}
                                        onChange={(e) => handleGlobalTimeChange('open', e.target.value)}
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="5" className="mb-2 mb-md-0">
                                <InputGroup>
                                    <InputGroup.Text>Close</InputGroup.Text>
                                    <Form.Control
                                        type="time"
                                        value={globalCloseTime}
                                        onChange={(e) => handleGlobalTimeChange('close', e.target.value)}
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Col xs={12} md="2" className="d-flex align-items-end justify-content-end">
                                <Button 
                                    variant="info" 
                                    onClick={applyGlobalTimings} 
                                    size="sm"
                                    className="w-100"
                                    disabled={!globalOpenTime && !globalCloseTime} // Disable if both are empty
                                >
                                    <i className="bi bi-arrow-down-up me-1"></i> Apply to All
                                </Button>
                            </Col>
                            <Col xs={12} className="mt-2">
                                <Form.Text className="text-muted">
                                    Set times above and click "Apply to All" to instantly update all days. Leave empty for 'Closed'.
                                </Form.Text>
                            </Col>
                        </Row>


                        {daysOfWeek.map(day => (
                            <Row className="mb-2 align-items-center g-3" key={day}>
                                <Col xs={12} md={2}>
                                    <Form.Label className="text-capitalize fw-bold mb-0">{day}</Form.Label>
                                </Col>
                                {/* Open Time */}
                                <Col xs={6} md={5}>
                                    <InputGroup>
                                        <InputGroup.Text style={{ fontSize: '0.85rem' }}>Open</InputGroup.Text>
                                        <Form.Control
                                            type="time"
                                            value={businessTimings[day].open}
                                            onChange={(e) =>
                                                handleBusinessTimingChange(day, "open", e.target.value)
                                            }
                                        />
                                    </InputGroup>
                                </Col>
                                {/* Close Time */}
                                <Col xs={6} md={5}>
                                    <InputGroup>
                                        <InputGroup.Text style={{ fontSize: '0.85rem' }}>Close</InputGroup.Text>
                                        <Form.Control
                                            type="time"
                                            value={businessTimings[day].close}
                                            onChange={(e) =>
                                                handleBusinessTimingChange(day, "close", e.target.value)
                                            }
                                        />
                                    </InputGroup>
                                </Col>
                            </Row>
                        ))}
 
                        {/* File Uploads */}
                        <h4 className="mb-3 mt-4 text-primary border-bottom pb-2">Upload Documents & Media</h4>
                        <p className="text-muted">Upload required documents and media files for your company profile.</p>
                        <Row className="mb-3 g-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label className="fw-bold">Company Logo (Max 1) <span className="text-danger">*</span></Form.Label>
                                <Form.Control type="file" name="logo" accept="image/*" onChange={handleFileChange} required />
                                <Form.Text className="text-muted">Accepts image files (e.g., JPG, PNG).</Form.Text>
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label className="fw-bold">Aadhaar Image (Max 1)</Form.Label>
                                <Form.Control type="file" name="aadhaar" accept="image/*,application/pdf" onChange={handleFileChange} />
                                <Form.Text className="text-muted">Accepts image or PDF files.</Form.Text>
                            </Form.Group>
                        </Row>
                       
                        <Row className="mb-4 g-3">
                            <Form.Group as={Col} md="6">
                                <Form.Label className="fw-bold">Passport Photo (Max 1)</Form.Label>
                                <Form.Control type="file" name="passportPhoto" accept="image/*" onChange={handleFileChange} />
                                <Form.Text className="text-muted">Accepts image files (e.g., JPG, PNG).</Form.Text>
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label className="fw-bold">Business Images (Max 5)</Form.Label>
                                <Form.Control type="file" name="banner" accept="image/*" multiple onChange={handleFileChange} />
                                <Form.Text className="text-muted">You can select up to 5 Business images (JPG, PNG).</Form.Text>
                            </Form.Group>
                        </Row>
 
                        <div className="d-flex justify-content-end mt-4 pt-3 border-top">
                            <Button variant="secondary" onClick={handleClose} className="me-2">Close</Button>
                            <Button variant="primary" type="submit" disabled={loading}>
                                {loading ? <><Spinner animation="border" size="sm" className="me-2" /> Registering...</> : "Register Company"}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};
 
export default CompanyRegistrationForm;