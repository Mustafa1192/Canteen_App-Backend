import React from 'react';

const Sidebar = () => {
  return (
    <aside className="main-sidebar col-12 col-md-3 col-lg-2 px-0">
      <div className="main-navbar">
        <nav className="navbar align-items-stretch navbar-light bg-white flex-md-nowrap border-bottom p-0">
          <a className="navbar-brand w-100 mr-0" href="#" style={{ lineHeight: '25px' }}>
            <div className="d-table m-auto">
              <img
                id="main-logo"
                className="d-inline-block align-top mr-1"
                style={{ maxWidth: '35px', borderRadius: '50%' }}
                src="https://i.pinimg.com/564x/f8/32/a5/f832a59135baa1b4d46c5000565e1e36.jpg"
                alt="Shards Dashboard"
              />
              <span className="ml-1">Huma Dashboard</span>
            </div>
          </a>
          <a className="toggle-sidebar d-sm-inline d-md-none d-lg-none">
            <i className="material-icons">&#xE5C4;</i>
          </a>
        </nav>
      </div>
      <form action="#" className="main-sidebar__search w-100 border-right d-sm-flex d-md-none d-lg-none">
        <div className="input-group input-group-seamless ml-3">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-search"></i>
            </div>
          </div>
          <input
            className="navbar-search form-control"
            type="text"
            placeholder="Search for something..."
            aria-label="Search"
          />
        </div>
      </form>
      <div className="nav-wrapper">
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link active" href="index.html">
              <i className="material-icons">edit</i>
              <span>Sale Dashboard</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="OrderDetail.html">
              <i className="material-icons">vertical_split</i>
              <span>Order Detail</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="Poroduct.html">
              <i className="material-icons">note_add</i>
              <span>Products</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="FoodsItem.html">
              <i className="material-icons">view_module</i>
              <span>Item List</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="UserProfile.html">
              <i className="material-icons">person</i>
              <span>User Profile</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
