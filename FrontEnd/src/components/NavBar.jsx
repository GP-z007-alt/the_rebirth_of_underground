import React, { useState } from 'react'
import '../componentStyles/NavBar.css'
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';


function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu=() => setIsMenuOpen(!isMenuOpen);
    const isAuthenticated = true; 
  return (
    <nav className="navbar">
        <div className="navbar-container">
            <div className="navbar-logo">
                <Link to="/" onClick={() => setIsMenuOpen(false)}>Underground Mafia</Link>
            </div>

            <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
                <ul>
                    <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/about-us">About Us</Link></li>
                    <li><Link to="/contact-us">Contact Us</Link></li>
                </ul>
            </div>

            <div className="navbar-icons">
                {/* <div className="search-container">
                    <form className="search-form">
                        <input className='search-input' type="text" placeholder="Search..." />
                        <button className='search-icon'>
                            <SearchIcon fpcusable="False"/>
                        </button>
                    </form>
                </div> */}

                <div className="cart-container">
                    <Link to="/cart">
                    <ShoppingCartIcon className="icon" />
                    <span className="cart-badge">6</span>
                    </Link>
                </div>

                { !isAuthenticated && <Link to='/register' className='register-link'>
                <PersonAddIcon className='icon'/>
                </Link>}

                <div className="navbar-hamburger "onClick={toggleMenu}>
                    {isMenuOpen ? <CloseIcon className="icon" /> : <MenuIcon className="icon" />}
                </div>
            </div>
        </div>
    </nav>
  )
}

export default NavBar
