

import { Container, Row, Col } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import RightSidebar from '../components/common/RightSidebar';

const HEADER_HEIGHT = '155px';

const LayoutWithRightSidebarOnly = () => {
  return (
    <Container fluid>
      <Row className="g-lg-4 align-items-start">
        {/* Main Content */}
        <Col lg={9} md={12} className="py-3">
          <Outlet />
        </Col>

        {/* Right Sidebar */}
        <Col lg={3} className="d-none d-lg-block">
          <div style={{ position: 'sticky', top: HEADER_HEIGHT, zIndex: 10 }}>
            <RightSidebar />
          </div>
        </Col>
      </Row>
    </Container>
  );
};
 
export default LayoutWithRightSidebarOnly;
