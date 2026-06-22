

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import LeftSidebar from '../components/common/LeftSidebar';

const LayoutWithLeftSidebarOnly = ({ sidebarStyle }) => {
    return (
        <Container fluid>
            {/* <<< बदलाव 1: g-lg-4 को g-0 कर दिया गया है >>> */}
            <Row className="g-0 align-items-start">
                <Col lg={2} className="d-none d-lg-block">
                   <div 
                        style={{ 
                            ...sidebarStyle,
                            transition: 'top 0.3s ease-in-out, bottom 0.3s ease-in-out'
                        }}
                   >
                        <LeftSidebar />
                   </div>
                </Col>
                
                {/* <<< बदलाव 2: p-35 एक गलत क्लास है, इसे p-3 या px-3 कर दिया है >>> */}
                <Col lg={10} md={12} className="p-3">
                   <Outlet />
                </Col>
            </Row>
        </Container>
    );
};

export default LayoutWithLeftSidebarOnly;