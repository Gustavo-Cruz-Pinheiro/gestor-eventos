import { Nav } from 'react-bootstrap';
import { FaHome, FaUser, FaCog, FaTrophy } from 'react-icons/fa';
import './style.css'

export const VerticalNavbar = () => {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-dark text-white" style={{ width: '75px', height: '100vh', position: 'fixed', left: 0, top: 0, zIndex: 1 }}>
      <Nav className="flex-column mt-5">
        <Nav.Link href="/" className="nav-link text-center text-white" style={{ position: 'relative' }}>
          <FaHome size={24} />
        </Nav.Link>
        <Nav.Link href="/torneios" className="nav-link text-center text-white" style={{ position: 'relative' }}>
          <FaTrophy size={24} />
        </Nav.Link>
        <Nav.Link href="/login" className="nav-link text-center text-white" style={{ position: 'relative' }}>
          <FaUser size={24} />
        </Nav.Link>
        <Nav.Link href="#" className="nav-link text-center text-white" style={{ position: 'relative' }}>
          <FaCog size={24} />
        </Nav.Link>
      </Nav>
    </div>
  );
}