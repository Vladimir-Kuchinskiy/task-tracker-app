import React, { useState } from 'react';

import MembersPopover from '../../../containers/Board/MembersPopover';
import './styles/CardModalSidebar.css';

const CardModalSidebar = ({ card }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const toggle = () => setPopoverOpen(!popoverOpen);
  return (
    <div id="sidebar-main" className="sidebar sidebar-default sidebar-separate sidebar-fixed">
      <div className="sidebar-content">
        <div className="sidebar-category sidebar-default" style={{ marginTop: '-7px' }}>
          <div className="category-content">
            <div
              className="nav-link nav-link-card justify-content-center"
              id="Popover1"
              onClick={toggle}
            >
              Members
            </div>
          </div>
        </div>
      </div>
      <MembersPopover card={card} toggle={toggle} popoverOpen={popoverOpen} />
    </div>
  );
};

export default CardModalSidebar;
