import { useLocation, useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoBack = () => {
    if(window.history.length > 1) { //Check if there is a previous page in the history stack
      navigate(-1);
    } else {
      navigate('/');
    }
  }

  return (
    <footer>
      <div>
        {location.pathname !== '/' && (
          <button
            onClick={handleGoBack}
          >
            &larr; Go Back
          </button>
        )}
        <p>Created by the Shoppaholick Bazaar team 😀
        </p>
      </div>
    </footer>
  );
};

export default Footer;
