import React from 'react';
import PropTypes from 'prop-types';

import './SecondarySidebar.css';

const SecondarySidebar = ({ links }) => {
  return (
    <div id="sidebar-main" className="sidebar sidebar-default sidebar-separate sidebar-fixed">
      <div className="sidebar-content">
        <div className="sidebar-category sidebar-default">
          <div className="category-content">
            <ul id="sidebar-editable-nav" className="nav flex-column">
              {links.map((link, index) => (
                <li className="nav-item" key={index}>
                  {link}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

SecondarySidebar.propTypes = {
  links: PropTypes.array.isRequired
};

export default SecondarySidebar;
