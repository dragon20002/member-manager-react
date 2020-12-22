import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './HeaderMenu.css';

const HeaderMenu = ({ menus }) => {
  const divMenus = menus.map((menu) => (
    <div className="menuItem h5" key={menu.path}>
      <NavLink to={menu.path}>{menu.name}</NavLink>
    </div>
  ));

  return <div className="header-menu">{divMenus}</div>;
};

HeaderMenu.propTypes = {
  menus: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default HeaderMenu;
