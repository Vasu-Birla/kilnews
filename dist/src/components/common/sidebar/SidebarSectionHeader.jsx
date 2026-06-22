import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const SidebarSectionHeader = ({ title, linkText }) => (
    <div 
        className="d-flex justify-content-between align-items-center mb-2 pb-1"
        style={{ borderBottom: '2px solid #dc3545' }}
    >
        <h6 className="fw-bold m-0">{title}</h6>
        {linkText && (
            <a href="#!" className="text-decoration-none fw-bold small" style={{ color: '#fd7e14' }}>
                {linkText} <FaArrowRight size={12} />
            </a>
        )}
    </div>
);

export default SidebarSectionHeader;