import { Link } from 'react-router-dom';
import { type MouseEvent} from 'react';
import logo from "../assets/Logo_new.jpg";
import Auth from '../utils/auth';

const Header = () => {
  const logout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // Logs the user out by calling the logout method from Auth
    Auth.logout();
  };
  return (
    <header>
      <div className="ui secondary menu">
      <img
              src={logo}
              alt="Shopping logo"
              width="50"
              height="50"
              className="inline-block"
            />
      <Link className="active item" to="/">
      Shoppaholik Bazaar
      </Link>
      <Link className="item" to="/shopping">
        Shopping
      </Link>
      <Link className="item" to="/friends">
        Friends
      </Link>
      <div className="right menu">
        <div className="item">
          <div className="ui icon input">
            {/* Checking if the user is logged in to conditionally render profile link and logout button */}
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/me">
                {/* Retrieving the logged-in user's profile to display the username */}
                {Auth.getProfile().data.username}'s profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
          </div>
        </div>
      </div>
    </div>
    </header>
  );
};

export default Header;
