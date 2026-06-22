
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form, InputGroup, Spinner, Alert } from 'react-bootstrap';
import { getAllCompanyCategories } from '../Services/authApi';
import CompanyRegistrationForm from './CompanyRegistrationForm';

const placeholderImageUrl = 'https://via.placeholder.com/90';

// --- Item Component ---
const CategoryItem = ({ item }) => {
  const { image, name, _id } = item;
  return (
    <Col className="mb-4 text-center d-flex justify-content-center px-2">
      <a
        href={`/CategoryDetailPage?categoryId=${_id}&name=${encodeURIComponent(name)}`}
        className="text-decoration-none text-dark d-flex flex-column align-items-center category-link"
        style={{ width: '120px' }}
      >
        <div
          className="bg-white d-flex align-items-center justify-content-center rounded-3 overflow-hidden"
          style={{
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            width: '35px',
            height: '35px',
          }}
        >
          <img
            src={image || placeholderImageUrl}
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { e.target.onerror = null; e.target.src = placeholderImageUrl }}
          />
        </div>
        <p className="mt-2 mb-0 category-text" style={{ fontSize: '0.8rem', fontWeight: '500', lineHeight: '1.2' }}>
          {name}
        </p>
      </a>
    </Col>
  );
};

// --- Header Component ---
const SectionHeader = ({ title, city }) => (
  <h2 className="text-center mb-4 fw-bold">
    {title} in <span style={{ color: '#007bff' }}>{city}</span>
  </h2>
);

// --- Main Page Component ---
const DirectoryPage = () => {
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const res = await getAllCompanyCategories();
      if (res.success) {
        const all = res.data || [];
        setServices(all.filter(cat => cat.type === "service"));
        setProducts(all.filter(cat => cat.type === "product"));
      }
      setLoading(false);
    };
    fetchCategories();
  }, []);

  if (loading) {
    return <div className="text-center py-5"><Spinner animation="border" /></div>;
  }

  return (
    <div
      className='directory-page'
      style={{
        backgroundColor: '#fff',
        overflowX: 'hidden',  // ✅ Horizontal scroll hidden
        width: '100%',
      }}
    >
      {/* Banner */}
      <div
        className="py-5 d-flex align-items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '300px',
          overflowX: 'hidden' // ✅ Banner ke andar bhi scroll hide
        }}
      >
        <Container className="text-center text-white" style={{ overflowX: 'hidden' }}>
        <h2 style={{ fontWeight: 400 }}>Directory</h2>

          <h1 className="display-4 fw-bold">Explore Best Places In City</h1>
          <p className="lead mb-4">Find some of the best tips from around the city from our partners and friends.</p>
          <Row className="justify-content-center" style={{ overflowX: 'hidden' }}>
            <Col lg={8} md={10}>
              <InputGroup>
                <Form.Control placeholder="All State +" style={{ maxWidth: '150px' }} />
                <Form.Control placeholder="City +" style={{ maxWidth: '150px' }} />
                <Form.Control placeholder="What are you looking for..." />
                <Button
                  variant="danger"
                  style={{ backgroundColor: '#c00', borderColor: '#c00', padding: '0 2rem' }}
                >
                  Search
                </Button>
              </InputGroup>
              {/* Registration Your Company button moved here with a 2px gap */}
              <div className="mt-2"> {/* Added mt-2 for 2px top margin */}
                <CompanyRegistrationForm />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-5" style={{ overflowX: 'hidden' }}>
        {/* Services */}
        <section className="mb-5" style={{ overflowX: 'hidden' }}>
          <SectionHeader title="Popular Services" city="Indore" />
          <Row xs={2} sm={3} md={4} lg={5} className="g-3 justify-content-center">
            {services.length > 0 ? (
              services.map(service => <CategoryItem key={service._id} item={service} />)
            ) : (
              <Alert variant="info">No services found</Alert>
            )}
          </Row>
        </section>

        {/* Products */}
        <section style={{ overflowX: 'hidden' }}>
          <SectionHeader title="Selling Products" city="Indore" />
          <Row xs={2} sm={3} md={4} lg={5} className="g-3 justify-content-center">
            {products.length > 0 ? (
              products.map(product => <CategoryItem key={product._id} item={product} />)
            ) : (
              <Alert variant="info">No products found</Alert>
            )}
          </Row>
        </section>

        {/* The "View More" button is removed from here */}
        {/* The CompanyRegistrationForm component is moved to the banner section */}
      </Container>
    </div>
  );
};

export default DirectoryPage;