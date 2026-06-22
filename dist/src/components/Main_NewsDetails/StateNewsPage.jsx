
// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { Container, Row, Col, Image, Spinner, Alert, Badge, Dropdown, DropdownButton } from 'react-bootstrap';
// import { allNews, getCitiesByState } from '../../Services/authApi';

// const StateNewsPage = () => {
//   const { stateName, stateId } = useParams(); 
//   const [filteredNews, setFilteredNews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [pageTitle, setPageTitle] = useState(stateName.replace(/-/g, ' '));

//   // City selection states
//   const [cities, setCities] = useState([]);
//   const [selectedCity, setSelectedCity] = useState(null);
//   const [citiesLoading, setCitiesLoading] = useState(false);
//   const [citiesError, setCitiesError] = useState(null);

//   // Effect to fetch cities when stateId changes
//   useEffect(() => {
//     const fetchCitiesForState = async () => {
//       if (!stateId) return;
//       setCitiesLoading(true);
//       setCitiesError(null);
//       try {
//         const res = await getCitiesByState(stateId);
//         if (res?.data) {
//           setCities(res.data);
//         } else {
//           setCities([]);
//           setCitiesError("No cities found for this state.");
//         }
//       } catch (err) {
//         setCities([]);
//         setCitiesError(err.message || "Failed to fetch cities.");
//       } finally {
//         setCitiesLoading(false);
//       }
//     };

//     // Reset selected city when state changes to default to all cities for the new state
//     setSelectedCity(null);
//     fetchCitiesForState();
//   }, [stateId]); // Run when stateId changes

//   // Effect to fetch and filter news when stateId or selectedCity changes
//   useEffect(() => {
//     if (!stateId) return;

//     const fetchAndFilterNews = async () => {
//       setLoading(true);
//       setError(null);
//       // Update page title based on stateName and selectedCity
//       setPageTitle(
//         `${stateName.replace(/-/g, ' ')}${selectedCity ? ` - ${selectedCity.name}` : ''}`
//       ); 
//       try {
//         const res = await allNews();
//         if (res?.success) {
//           let stateSpecificNews = res.data.filter(
//             (item) => item.state?._id === stateId
//           );

//           // Further filter by selected city if one is chosen
//           if (selectedCity) {
//             stateSpecificNews = stateSpecificNews.filter(
//               (item) => item.city?._id === selectedCity._id
//             );
//           }
//           setFilteredNews(stateSpecificNews);
//         } else {
//           setError('Failed to load news');
//         }
//       } catch (err) {
//         setError(err.message || 'An error occurred');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAndFilterNews();
//   }, [stateId, stateName, selectedCity]); // Add selectedCity to dependencies

//   // Helper function for consistent city option styling
//   const getCityOptionStyle = (cityId, isAllCitiesOption = false) => {
//     const isActive = isAllCitiesOption ? (selectedCity === null) : (selectedCity?._id === cityId);
//     return {
//       backgroundColor: isActive ? '#3498db' : '#34495e', // Selected: Blue, Default: Darker Blue-Grey
//       color: 'white',
//       textAlign: 'center',
//       padding: '8px 5px',
//       borderRadius: '4px',
//       cursor: 'pointer',
//       fontWeight: 'bold',
//       whiteSpace: 'nowrap',
//       overflow: 'hidden',
//       textOverflow: 'ellipsis',
//       transition: 'background-color 0.2s ease, color 0.2s ease',
//       height: '100%', // Ensure all items in a row have same height
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center'
//     };
//   };

//   const handleCityOptionHover = (e, cityId, isAllCitiesOption) => {
//     const isActive = isAllCitiesOption ? (selectedCity === null) : (selectedCity?._id === cityId);
//     if (!isActive) {
//       e.currentTarget.style.backgroundColor = '#1abc9c'; // Hover: Teal
//       e.currentTarget.style.color = 'white';
//     }
//   };

//   const handleCityOptionLeave = (e, cityId, isAllCitiesOption) => {
//     const isActive = isAllCitiesOption ? (selectedCity === null) : (selectedCity?._id === cityId);
//     if (!isActive) {
//       e.currentTarget.style.backgroundColor = '#34495e'; // Back to Default
//       e.currentTarget.style.color = 'white';
//     }
//   };


//   if (loading) {
//     return (
//       <Container className="text-center my-5">
//         <Spinner animation="border" variant="primary" />
//         <p>Loading news...</p>
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container className="my-5">
//         <Alert variant="danger">Error: {error}</Alert>
//       </Container>
//     );
//   }

//   return (
//     <Container className="my-4">
//       <Row className="mb-2 align-items-center">
//         <Col>
//           <h2 className="fw-bold m-0 text-capitalize">
//             {pageTitle} की खबरें
//           </h2>
//         </Col>
//         <Col xs="auto">
//           {citiesLoading ? (
//             <Spinner animation="border" size="sm" />
//           ) : citiesError ? (
//             <Alert variant="warning" className="p-1 m-0">शहर नहीं मिले</Alert>
//           ) : cities.length > 0 && (
//             <DropdownButton
//               id="dropdown-city-selector"
//               title={selectedCity ? selectedCity.name : "शहर चुनें"}
//               variant="dark" // Changed variant to dark for better contrast with new theme
//               align="end"
//             >
//               <Dropdown.Menu style={{ minWidth: '300px', backgroundColor: '#2c3e50', padding: '10px' }}> {/* Dropdown Menu background */}
//                 <Container fluid className="py-2">
//                   <Row className="g-2"> {/* Cities between small gap */}
//                     {/* "सभी शहर" विकल्प */}
//                     <Col xs={12} className="mb-2"> {/* mb-2 for spacing below "सभी शहर" */}
//                       <div
//                         onClick={() => setSelectedCity(null)}
//                         style={getCityOptionStyle(null, true)}
//                         onMouseEnter={(e) => handleCityOptionHover(e, null, true)}
//                         onMouseLeave={(e) => handleCityOptionLeave(e, null, true)}
//                       >
//                         सभी शहर
//                       </div>
//                     </Col>
//                     {/* शहर विकल्प (5 कॉलम में) */}
//                     {cities.map((city) => (
//                       <Col xs={6} sm={4} md={3} lg={2} key={city._id} className="d-flex"> {/* Responsive columns, aiming for ~5 on larger screens */}
//                         <div
//                           onClick={() => setSelectedCity(city)}
//                           style={getCityOptionStyle(city._id)}
//                           onMouseEnter={(e) => handleCityOptionHover(e, city._id, false)}
//                           onMouseLeave={(e) => handleCityOptionLeave(e, city._id, false)}
//                         >
//                           {city.name}
//                         </div>
//                       </Col>
//                     ))}
//                   </Row>
//                 </Container>
//               </Dropdown.Menu>
//             </DropdownButton>
//           )}
//         </Col>
//       </Row>
//       <hr className="mb-4 mt-0" />


//       {filteredNews.length > 0 ? (
//         <div>
//           {filteredNews.map((article) => (
//             <div key={article._id} className="border-bottom py-3">
//               <Link
//                 to={`/news/${article.slug_en}`}
//                 state={{ relatedArticles: filteredNews }}
//                 className="text-decoration-none text-dark"
//               >
//                 <Row className="g-3">
//                   <Col xs={12} md={8}>
//                     <h5 className="fw-bold mb-2">{article.title_hi}</h5>
//                     <p className="text-muted mb-2">{article.summary_hi}</p>
//                     <Badge pill bg="light" text="dark" className="border me-2">
//                       {article.state?.name || 'State'}
//                     </Badge>
//                     {article.city && (
//                       <Badge pill bg="secondary" text="white">
//                         {article.city?.name}
//                       </Badge>
//                     )}
//                   </Col>
//                   <Col xs={12} md={4}>
//                     <Image
//                       src={
//                         article.media?.[0]?.url ||
//                         'https://via.placeholder.com/400x250'
//                       }
//                       fluid
//                       rounded
//                       alt={article.title_hi}
//                       style={{
//                         aspectRatio: '16/9',
//                         objectFit: 'cover',
//                         width: '100%',
//                       }}
//                     />
//                   </Col>
//                 </Row>
//               </Link>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <Alert variant="info">
//           इस {selectedCity ? `शहर (${selectedCity.name})` : 'राज्य'} में कोई खबर उपलब्ध नहीं है।
//         </Alert>
//       )}
//     </Container>
//   );
// };

// export default StateNewsPage;


// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { Container, Row, Col, Image, Spinner, Alert, Button } from "react-bootstrap";
// import { allNews, getCitiesByState } from "../../Services/authApi";
// import { FaChevronRight, FaChevronUp } from "react-icons/fa6";

// const StateNewsPage = () => {
//   const { stateName, stateId } = useParams();
//   const [filteredNews, setFilteredNews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);


//   // Cities
//   const [cities, setCities] = useState([]);
//   const [selectedCity, setSelectedCity] = useState(null);
//   const [citiesLoading, setCitiesLoading] = useState(false);
//   const [citiesError, setCitiesError] = useState(null);
//   const [showAllCities, setShowAllCities] = useState(false);

//   // 🟢 Load cities when stateId changes
//   useEffect(() => {
//     const fetchCitiesForState = async () => {
//       if (!stateId) return;
//       setCitiesLoading(true);
//       setCitiesError(null);
//       try {
//         const res = await getCitiesByState(stateId);
//         if (res?.data) {
//           setCities(res.data);
//         } else {
//           setCities([]);
//           setCitiesError("No cities found for this state.");
//         }
//       } catch (err) {
//         setCities([]);
//         setCitiesError(err.message || "Failed to fetch cities.");
//       } finally {
//         setCitiesLoading(false);
//       }
//     };
//     setSelectedCity(null); // reset when state changes
//     fetchCitiesForState();
//   }, [stateId]);

//   // 🟢 Fetch News when state/city changes
//   useEffect(() => {
//     if (!stateId) return;
//     const fetchAndFilterNews = async () => {
//       setLoading(true);
//       setError(null);
   
//       try {
//         const res = await allNews();
//         if (res?.success) {
//           let newsList = res.data.filter((item) => item.state?._id === stateId);
//           if (selectedCity) {
//             newsList = newsList.filter((item) => item.city?._id === selectedCity._id);
//           }
//           setFilteredNews(newsList);
//         } else {
//           setError("Failed to load news.");
//         }
//       } catch (err) {
//         setError(err.message || "An error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAndFilterNews();
//   }, [stateId, stateName, selectedCity]);

//   // 🟣 Handle City Select
//   const handleCityClick = (city) => {
//     setSelectedCity(city?._id ? city : null);
//      setShowAllCities(false);
//   };

//   if (loading) {
//     return (
//       <Container className="text-center my-5">
//         <Spinner animation="border" variant="primary" />
//         <p>Loading news...</p>
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container className="my-5">
//         <Alert variant="danger">Error: {error}</Alert>
//       </Container>
//     );
//   }

//   return (
//     <Container className="my-4">
//  {/* 🟢 Page Title */}
// <div className="d-flex align-items-center mb-3 flex-wrap">
//   <div style={{ width: "5px", height: "24px", backgroundColor: "#A12D2A" }}></div>
//   <h4 className="fw-bold m-0 ms-2 text-capitalize">
//     {stateName.replace(/-/g, " ")}
//     {selectedCity ? ` - ${selectedCity.name}` : ""} की खबरें
//   </h4>
//   <hr className="flex-grow-1 mx-2 border-danger border-2 opacity-100 my-0" />
// </div>


//       {/* 🟠 City Selection Section (City.jsx Style) */}
//       {citiesLoading ? (
//         <div className="text-center my-2">
//           <Spinner animation="border" size="sm" /> <span>शहर लोड हो रहे हैं...</span>
//         </div>
//       ) : citiesError ? (
//         <Alert variant="warning" className="my-2">
//           {citiesError}
//         </Alert>
//       ) : cities.length > 0 ? (
//         <>
//           {!showAllCities ? (
//             <Row className="g-2 bg-dark text-white p-2 flex-nowrap overflow-x-auto mb-3" style={{ WebkitOverflowScrolling: "touch" }}>
//               <Col xs="auto">
//                 <Button
//                   variant={selectedCity === null ? "warning" : "outline-light"}
//                   size="sm"
//                   onClick={() => handleCityClick(null)}
//                   className="text-nowrap"
//                 >
//                   सभी शहर
//                 </Button>
//               </Col>
//               {cities.slice(0, 13).map((city) => (
//                 <Col xs="auto" key={city._id}>
//                   <Button
//                     variant={selectedCity?._id === city._id ? "warning" : "outline-light"}
//                     size="sm"
//                     onClick={() => handleCityClick(city)}
//                     className="text-nowrap"
//                   >
//                     {city.name}
//                   </Button>
//                 </Col>
//               ))}
//               {cities.length > 13 && (
//                 <Col xs="auto">
//                   <Button variant="outline-light" size="sm" onClick={() => setShowAllCities(true)}>
//                     <FaChevronRight />
//                   </Button>
//                 </Col>
//               )}
//             </Row>
//           ) : (
//             <div className="bg-dark text-white p-2 mb-3">
//               <Row className="g-2">
//                 <Col xs={6} sm={4} md={3} lg={2}>
//                   <Button
//                     variant={selectedCity === null ? "warning" : "outline-light"}
//                     size="sm"
//                     className="w-100"
//                     onClick={() => handleCityClick(null)}
//                   >
//                     सभी शहर
//                   </Button>
//                 </Col>
//                 {cities.map((city) => (
//                   <Col xs={6} sm={4} md={3} lg={2} key={city._id}>
//                     <Button
//                       variant={selectedCity?._id === city._id ? "warning" : "outline-light"}
//                       size="sm"
//                       className="w-100"
//                       onClick={() => handleCityClick(city)}
//                     >
//                       {city.name}
//                     </Button>
//                   </Col>
//                 ))}
//               </Row>
//               <div className="text-center my-2">
//                 <Button variant="outline-light" size="sm" onClick={() => setShowAllCities(false)}>
//                   <FaChevronUp />
//                 </Button>
//               </div>
//             </div>
//           )}
//         </>
//       ) : null}

//       {/* 🟢 News Section */}
//       {filteredNews.length > 0 ? (
//         filteredNews.map((article) => (
//           <div key={article._id} className="border-bottom py-3">
//             <Link
//               to={`/news/${article.slug_en || article._id}`}
//               state={{ relatedArticles: filteredNews }}
//               className="text-decoration-none text-dark"
//             >
//               <Row className="g-3 align-items-center">
//                 <Col xs={12} md={8}>
//                   <h5 className="fw-bold mb-1">{article.title_hi}</h5>
//                   <p className="text-muted mb-2">{article.summary_hi}</p>
//                 </Col>
//                 <Col xs={12} md={4}>
//                   <Image
//                     src={article.media?.[0]?.url || "https://via.placeholder.com/400x250"}
//                     alt={article.title_hi}
//                     fluid
//                     rounded
//                     style={{
//                       aspectRatio: "16/9",
//                       objectFit: "cover",
//                       width: "100%",
//                     }}
//                   />
//                 </Col>
//               </Row>
//             </Link>
//           </div>
//         ))
//       ) : (
//         <Alert variant="info" className="mt-4">
//           इस {selectedCity ? `शहर (${selectedCity.name})` : "राज्य"} में कोई खबर उपलब्ध नहीं है।
//         </Alert>
//       )}
//     </Container>
//   );
// };

// export default StateNewsPage;


// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { Container, Row, Col, Image, Spinner, Alert, Button } from "react-bootstrap";
// import { allNews, getCitiesByState } from "../../Services/authApi";
// import { FaChevronRight, FaChevronUp } from "react-icons/fa6";

// const StateNewsPage = () => {
//   const { stateName, stateId } = useParams();
//   const [filteredNews, setFilteredNews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Cities
//   const [cities, setCities] = useState([]);
//   const [selectedCity, setSelectedCity] = useState(null);
//   const [citiesLoading, setCitiesLoading] = useState(false);
//   const [citiesError, setCitiesError] = useState(null);
//   const [showAllCities, setShowAllCities] = useState(false);

//   // 🟢 Load cities when stateId changes
//   useEffect(() => {
//     const fetchCitiesForState = async () => {
//       if (!stateId) return;
//       setCitiesLoading(true);
//       setCitiesError(null);
//       try {
//         const res = await getCitiesByState(stateId);
//         if (res?.data) {
//           setCities(res.data);
//         } else {
//           setCities([]);
//           setCitiesError("No cities found for this state.");
//         }
//       } catch (err) {
//         setCities([]);
//         setCitiesError(err.message || "Failed to fetch cities.");
//       } finally {
//         setCitiesLoading(false);
//       }
//     };
//     setSelectedCity(null); // reset when state changes
//     fetchCitiesForState();
//   }, [stateId]);

//   // 🟢 Fetch News when state/city changes
//   useEffect(() => {
//     if (!stateId) return;
//     const fetchAndFilterNews = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const res = await allNews();
//         if (res?.success) {
//           let newsList = res.data.filter((item) => item.state?._id === stateId);
//           if (selectedCity) {
//             newsList = newsList.filter((item) => item.city?._id === selectedCity._id);
//           }
//           setFilteredNews(newsList);
//         } else {
//           setError("Failed to load news.");
//         }
//       } catch (err) {
//         setError(err.message || "An error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAndFilterNews();
//   }, [stateId, stateName, selectedCity]);

//   // 🟣 Handle City Select
//   const handleCityClick = (city) => {
//     setSelectedCity(city?._id ? city : null);
//     setShowAllCities(false);
//   };

//   if (loading) {
//     return (
//       <Container className="text-center my-5">
//         <Spinner animation="border" variant="primary" />
//         <p>Loading news...</p>
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container className="my-5">
//         <Alert variant="danger">Error: {error}</Alert>
//       </Container>
//     );
//   }

//   return (
//     <Container className="my-4">
//       {/* 🟢 Page Title */}
//       <div className="d-flex align-items-center mb-3 flex-wrap">
//         <div style={{ width: "5px", height: "24px", backgroundColor: "#A12D2A" }}></div>
//         <h4 className="fw-bold m-0 ms-2 text-capitalize">
//           {stateName.replace(/-/g, " ")}
//           {selectedCity ? ` - ${selectedCity.name}` : ""} की खबरें
//         </h4>
//         <hr className="flex-grow-1 mx-2 border-danger border-2 opacity-100 my-0" />
//       </div>

//       {/* 🟠 City Selection Section */}
//       {citiesLoading ? (
//         <div className="text-center my-2">
//           <Spinner animation="border" size="sm" /> <span>शहर लोड हो रहे हैं...</span>
//         </div>
//       ) : citiesError ? (
//         <Alert variant="warning" className="my-2">
//           {citiesError}
//         </Alert>
//       ) : cities.length > 0 ? (
//         <>
//           {!showAllCities ? (
//             <Row
//               className="g-2 bg-dark text-white p-2 flex-nowrap overflow-x-auto mb-3"
//               style={{ WebkitOverflowScrolling: "touch" }}
//             >
//               <Col xs="auto">
//                 <Button
//                   variant={selectedCity === null ? "warning" : "outline-light"}
//                   size="sm"
//                   onClick={() => handleCityClick(null)}
//                   className="text-nowrap"
//                 >
//                   सभी शहर
//                 </Button>
//               </Col>
//               {cities.slice(0, 13).map((city) => (
//                 <Col xs="auto" key={city._id}>
//                   <Button
//                     variant={selectedCity?._id === city._id ? "warning" : "outline-light"}
//                     size="sm"
//                     onClick={() => handleCityClick(city)}
//                     className="text-nowrap"
//                   >
//                     {city.name}
//                   </Button>
//                 </Col>
//               ))}
//               {cities.length > 13 && (
//                 <Col xs="auto">
//                   <Button variant="outline-light" size="sm" onClick={() => setShowAllCities(true)}>
//                     <FaChevronRight />
//                   </Button>
//                 </Col>
//               )}
//             </Row>
//           ) : (
//             <div className="bg-dark text-white p-2 mb-3">
//               <Row className="g-2">
//                 <Col xs={6} sm={4} md={3} lg={2}>
//                   <Button
//                     variant={selectedCity === null ? "warning" : "outline-light"}
//                     size="sm"
//                     className="w-100"
//                     onClick={() => handleCityClick(null)}
//                   >
//                     सभी शहर
//                   </Button>
//                 </Col>
//                 {cities.map((city) => (
//                   <Col xs={6} sm={4} md={3} lg={2} key={city._id}>
//                     <Button
//                       variant={selectedCity?._id === city._id ? "warning" : "outline-light"}
//                       size="sm"
//                       className="w-100"
//                       onClick={() => handleCityClick(city)}
//                     >
//                       {city.name}
//                     </Button>
//                   </Col>
//                 ))}
//               </Row>
//               <div className="text-center my-2">
//                 <Button variant="outline-light" size="sm" onClick={() => setShowAllCities(false)}>
//                   <FaChevronUp />
//                 </Button>
//               </div>
//             </div>
//           )}
//         </>
//       ) : null}

//       {/* 🟢 News Section */}
//       {filteredNews.length > 0 ? (
//         filteredNews.map((article) => {
//           const firstMedia = article.media?.[0];
//           const isVideo = firstMedia && firstMedia.type === "video";
//           const mediaUrl =
//             firstMedia?.url || "https://via.placeholder.com/400x250?text=No+Media";

//           return (
//             <div key={article._id} className="border-bottom py-3">
//               <Link
//                 to={`/news/${article.slug_en || article._id}`}
//                 state={{ relatedArticles: filteredNews }}
//                 className="text-decoration-none text-dark"
//               >
//                 <Row className="g-3 align-items-start">
//                   {/* Text Section */}
//                   <Col xs={12} md={8}>
//                     <h5 className="fw-bold mb-1">{article.title_hi}</h5>
//                     <p className="text-muted mb-2">
//                       {article.summary_hi?.length > 150
//                         ? article.summary_hi.substring(0, 147) + "..."
//                         : article.summary_hi}
//                     </p>
//                   </Col>

//                   {/* Media Section */}
//                   <Col xs={12} md={4}>
//                     {isVideo ? (
//                       <video
//                         src={mediaUrl}
//                         width="100%"
//                         height="180px"
//                         controls={false}
//                         autoPlay
//                         muted
//                         loop
//                         playsInline
//                         style={{
//                           borderRadius: "8px",
//                           objectFit: "cover",
//                           backgroundColor: "#e0e0e0",
//                           display: "block",
//                         }}
//                         onError={(e) => {
//                           console.error("Video failed to load:", e.target.src);
//                         }}
//                       />
//                     ) : (
//                       <Image
//                         src={mediaUrl}
//                         alt={article.title_hi}
//                         rounded
//                         style={{
//                           width: "100%",
//                           height: "180px",
//                           objectFit: "cover",
//                           borderRadius: "8px",
//                           backgroundColor: "#e0e0e0",
//                           display: "block",
//                         }}
//                         onError={(e) => {
//                           e.target.src = "https://via.placeholder.com/400x250?text=Error";
//                           console.error("Image failed to load:", e.target.src);
//                         }}
//                       />
//                     )}
//                   </Col>
//                 </Row>
//               </Link>
//             </div>
//           );
//         })
//       ) : (
//         <Alert variant="info" className="mt-4">
//           इस {selectedCity ? `शहर (${selectedCity.name})` : "राज्य"} में कोई खबर उपलब्ध नहीं है।
//         </Alert>
//       )}
//     </Container>
//   );
// };

// export default StateNewsPage;


import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Image, Spinner, Alert, Button } from "react-bootstrap";
import { allNews, getCitiesByState } from "../../Services/authApi";
import { FaChevronRight, FaChevronUp } from "react-icons/fa6";

const StateNewsPage = () => {
  const { stateName, stateId } = useParams();
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cities
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [citiesError, setCitiesError] = useState(null);
  const [showAllCities, setShowAllCities] = useState(false);

  // 🔴 Brand Color Constant
  const brandColor = "#A12D2A";

  // 🟢 Load cities when stateId changes
  useEffect(() => {
    const fetchCitiesForState = async () => {
      if (!stateId) return;
      setCitiesLoading(true);
      setCitiesError(null);
      try {
        const res = await getCitiesByState(stateId);
        if (res?.data) {
          setCities(res.data);
        } else {
          setCities([]);
          setCitiesError("No cities found for this state.");
        }
      } catch (err) {
        setCities([]);
        setCitiesError(err.message || "Failed to fetch cities.");
      } finally {
        setCitiesLoading(false);
      }
    };
    setSelectedCity(null);
    fetchCitiesForState();
  }, [stateId]);

  // 🟢 Fetch News when state/city changes
  useEffect(() => {
    if (!stateId) return;
    const fetchAndFilterNews = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await allNews();
        if (res?.success) {
          let newsList = res.data.filter((item) => item.state?._id === stateId);
          if (selectedCity) {
            newsList = newsList.filter((item) => item.city?._id === selectedCity._id);
          }
          setFilteredNews(newsList);
        } else {
          setError("Failed to load news.");
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchAndFilterNews();
  }, [stateId, stateName, selectedCity]);

  // 🟣 Handle City Select
  const handleCityClick = (city) => {
    setSelectedCity(city?._id ? city : null);
    setShowAllCities(false);
  };

  // 🔴 Helper function for Button Styles (Red & White Theme)
  const getButtonStyle = (isSelected) => ({
    backgroundColor: isSelected ? brandColor : "white",
    color: isSelected ? "white" : brandColor,
    borderColor: brandColor,
    borderWidth: "1px",
    borderStyle: "solid",
    boxShadow: "none", // Remove bootstrap glow
  });

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading news...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">Error: {error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      {/* 🟢 Page Title */}
      <div className="d-flex align-items-center mb-3 flex-wrap">
        <div style={{ width: "5px", height: "24px", backgroundColor: brandColor }}></div>
        <h4 className="fw-bold m-0 ms-2 text-capitalize">
          {stateName.replace(/-/g, " ")}
          {selectedCity ? ` - ${selectedCity.name}` : ""} की खबरें
        </h4>
        <hr className="flex-grow-1 mx-2 border-danger border-2 opacity-100 my-0" />
      </div>

      {/* 🟠 City Selection Section (Updated Design) */}
      {citiesLoading ? (
        <div className="text-center my-2">
          <Spinner animation="border" size="sm" /> <span>शहर लोड हो रहे हैं...</span>
        </div>
      ) : citiesError ? (
        <Alert variant="warning" className="my-2">
          {citiesError}
        </Alert>
      ) : cities.length > 0 ? (
        <>
          {!showAllCities ? (
            <Row
              className="g-2 p-2 flex-nowrap overflow-x-auto mb-3 align-items-center"
              style={{ 
                WebkitOverflowScrolling: "touch", 
                backgroundColor: "#f8f9fa", // Light background instead of dark
                borderRadius: "8px"
              }}
            >
              <Col xs="auto">
                <Button
                  size="sm"
                  onClick={() => handleCityClick(null)}
                  className="text-nowrap"
                  // 🔴 Custom Style Applied Here
                  style={getButtonStyle(selectedCity === null)}
                >
                  सभी शहर
                </Button>
              </Col>
              {cities.slice(0, 13).map((city) => (
                <Col xs="auto" key={city._id}>
                  <Button
                    size="sm"
                    onClick={() => handleCityClick(city)}
                    className="text-nowrap"
                    // 🔴 Custom Style Applied Here
                    style={getButtonStyle(selectedCity?._id === city._id)}
                  >
                    {city.name}
                  </Button>
                </Col>
              ))}
              {cities.length > 13 && (
                <Col xs="auto">
                  <Button 
                    variant="link" 
                    size="sm" 
                    onClick={() => setShowAllCities(true)}
                    style={{ color: brandColor }}
                  >
                    <FaChevronRight />
                  </Button>
                </Col>
              )}
            </Row>
          ) : (
            <div className="p-3 mb-3" style={{ backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
              <Row className="g-2">
                <Col xs={6} sm={4} md={3} lg={2}>
                  <Button
                    size="sm"
                    className="w-100"
                    onClick={() => handleCityClick(null)}
                    style={getButtonStyle(selectedCity === null)}
                  >
                    सभी शहर
                  </Button>
                </Col>
                {cities.map((city) => (
                  <Col xs={6} sm={4} md={3} lg={2} key={city._id}>
                    <Button
                      size="sm"
                      className="w-100"
                      onClick={() => handleCityClick(city)}
                      style={getButtonStyle(selectedCity?._id === city._id)}
                    >
                      {city.name}
                    </Button>
                  </Col>
                ))}
              </Row>
              <div className="text-center my-2">
                <Button 
                  variant="link" 
                  size="sm" 
                  onClick={() => setShowAllCities(false)}
                  style={{ color: brandColor }}
                >
                  <FaChevronUp />
                </Button>
              </div>
            </div>
          )}
        </>
      ) : null}

      {/* 🟢 News Section */}
      {filteredNews.length > 0 ? (
        filteredNews.map((article) => {
          const firstMedia = article.media?.[0];
          const isVideo = firstMedia && firstMedia.type === "video";
          const mediaUrl =
            firstMedia?.url || "https://via.placeholder.com/400x250?text=No+Media";

          return (
            <div key={article._id} className="border-bottom py-3">
              <Link
                to={`/news/${article.slug_en || article._id}`}
                state={{ relatedArticles: filteredNews }}
                className="text-decoration-none text-dark"
              >
                <Row className="g-3 align-items-start">
                  {/* Text Section */}
                  <Col xs={12} md={8}>
                   <div 
                    // className="fw-bold mb-1"
                        className="news-headline-master mb-1"
                    dangerouslySetInnerHTML={{ __html: article?.title_hi || article?.title_en }} 
                  />
                    {/* <h5 className="fw-bold mb-1">{article.title_hi}</h5> */}
                    <p className="text-muted mb-2">
                      {article.summary_hi?.length > 150
                        ? article.summary_hi.substring(0, 147) + "..."
                        : article.summary_hi}
                    </p>
                  </Col>

                  {/* Media Section */}
                  <Col xs={12} md={4}>
                    {isVideo ? (
                      <video
                        src={mediaUrl}
                        width="100%"
                        height="180px"
                        controls={false}
                        autoPlay
                        muted
                        loop
                        playsInline
                        style={{
                          borderRadius: "8px",
                          objectFit: "cover",
                          backgroundColor: "#e0e0e0",
                          display: "block",
                        }}
                        onError={(e) => {
                          console.error("Video failed to load:", e.target.src);
                        }}
                      />
                    ) : (
                      <Image
                        src={mediaUrl}
                        alt={article.title_hi}
                        rounded
                        style={{
                          width: "100%",
                          height: "180px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          backgroundColor: "#e0e0e0",
                          display: "block",
                        }}
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/400x250?text=Error";
                          console.error("Image failed to load:", e.target.src);
                        }}
                      />
                    )}
                  </Col>
                </Row>
              </Link>
            </div>
          );
          })
      ) : (
        <Alert variant="info" className="mt-4">
          इस {selectedCity ? `शहर (${selectedCity.name})` : "राज्य"} में कोई खबर उपलब्ध नहीं है।
        </Alert>
      )}
    </Container>
  );
};

export default StateNewsPage