import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div className="navbar">
      <ul>
        <p>Philad311phia, yo!</p>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
        <li>
          <Link to='/contact'>Contact</Link>
        </li>
      </ul>
    </div>
  )
}

export default NavBar;
