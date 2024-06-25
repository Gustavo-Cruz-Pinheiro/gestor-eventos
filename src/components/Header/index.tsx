import logo from '../../assets/logo.png';
import { Link } from "react-router-dom";

export const Header = () => {
    const lightTheme = localStorage.getItem('lightTheme') === 'true';

    return (
        <header className={`bg-${lightTheme ? 'white' : 'black'} text-${lightTheme ? 'black' : 'white'} d-flex align-items-center`} style={{ height: '50px', position: 'relative', zIndex: 2 }}>
            <Link to={"/"} className="link"><img src={logo} alt="Logo" className="ms-3" style={{ height: '50px' }} /></Link>
            <h1 className="h5 m-0 ms-3"></h1>
        </header>
    );
};
