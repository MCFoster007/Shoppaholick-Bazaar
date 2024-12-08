import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    console.log(loginCheck);
    checkLogin();
  }, [loginCheck]);

  return (
    <div>
    <nav>
        <div>
          <a href="#">Shoppaholik Bazaar</a>
          <div>
            <ul>
              {/* Add links from client/src/main.tsx from router*/}
              <li className="nav-item">
                <Link className="nav-link" to='/'>Login Page</Link> 
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/friendsNmessage'>Friends and Message Page</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/shopping'>Shopping Page</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/logout'>Logout Page</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      </div>
  );
};

export default Navbar;
