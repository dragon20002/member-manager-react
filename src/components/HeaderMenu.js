import React from 'react';
import { NavLink } from 'react-router-dom';
import './HeaderMenu.css';

class HeaderMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const menus = this.props.menus.map((menu, index) =>
      <div className="menuItem h5" key={index}>
        <NavLink to={menu.path}>{menu.name}</NavLink>
      </div>
    );

    return (
      <div className="header-menu">
        {menus}
      </div>
    );
  }
}

export default HeaderMenu;
