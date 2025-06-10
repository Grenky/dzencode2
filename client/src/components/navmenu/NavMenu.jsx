import './styles/styles.css';
import { NavLink } from 'react-router-dom';

export default function NavMenu() {
    return(
        <div className="nav-wrapper">
            <nav>
                <ul>
                    <li><NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''}>Home</NavLink></li>
                    <li><NavLink to="/orders" className={({ isActive }) => isActive ? 'active-link' : ''}>Orders</NavLink></li>
                    <li><NavLink to="/products" className={({ isActive }) => isActive ? 'active-link' : ''}>Products</NavLink></li>
                </ul>
            </nav>
        </div>
    )
}