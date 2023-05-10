import { Link } from 'react-router-dom';

export const NavBar = () => {
  return (
    <nav
      style={{
        display: 'flex',
        gap: '4px',
      }}
    >
      <Link to="/home">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/faqs">FAQs</Link>
    </nav>
  );
};
