import React from 'react';
import { IndexLink, Link } from 'react-router';

const Header = () => {
    return (
      <nav>
        <IndexLink to="/" activeClassName="active">Home</IndexLink>
        {"|"}
        <Link to="about" activeClassName="active">About</Link>
        {"|"}
        <Link to="courses" activeClassName="active">Courses</Link>
      </nav>
    );
};

export default Header;
