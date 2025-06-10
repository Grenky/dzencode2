import { Routes, Route, useLocation  } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './App.css';
import NavMenu from './components/navmenu/NavMenu';
import TopMenu from './components/topmenu/TopMenu';
import Orders from './components/orders/Orders';
import Products from './components/products/Products';
import HomePage from './components/homepage/HomePage';

function App() {
  const location = useLocation();


  return (
    <div className="App">
      <TopMenu />
      <div className="main-layout">
        <NavMenu />
        <div className="content">
          <AnimatePresence>
            <Routes location={location} key={location.pathname}>
              <Route path='/' element={<HomePage />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/products" element={<Products />} />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}


export default App;
 