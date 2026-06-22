import React from 'react';
import { Link } from 'react-router-dom';

// ✅ SectionHeader updated for news components
const SectionHeader = ({ title, link = "#" }) => (
  <div className="d-flex justify-content-between align-items-center px-3 py-2 flex-wrap">
    {/* ✅ Title */}
    <h4 className="fw-bold m-0">{title}</h4>

    {/* ✅ Link updated to use react-router Link */}
    <Link 
      to={link} 
      className="text-primary text-decoration-none fw-bold small"
    >
      और देखें
    </Link>
  </div>
);

export default SectionHeader;
