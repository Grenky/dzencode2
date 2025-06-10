import './styles/styles.css';
import { useState, useEffect } from 'react';
import socket from '../../socket';
import { Link } from 'react-router-dom';
import clock from '../../images/clock.png';

export default function TopMenu() {
  const [sessionCount, setSessionCount] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const inputHandleChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    if (newValue.length > 0 && newValue.length < 2) {
      setError('Minimum 2 characters');
    } else if (!/^[\p{L}\p{N}\s-]*$/u.test(newValue)) {
      setError('Only letters, numbers and spaces are allowed');
    } else {
      setError('');
    }
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      const time = now.toLocaleTimeString('en-US', { hour12: false });
      setCurrentTime(`${formattedDate}, ${time}`);
    };

    updateTime(); 
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    socket.on('sessionCount', (count) => {
      setSessionCount(count);
    });
    return () => {
      socket.off('sessionCount');
    };
  }, []);

  return (
    <div className="wrapper-topmenu">
      <div className='topmenu__input-logo'>
        <Link to="/"><h1 className='logo'>LOGO</h1></Link>
        <div className='topmenu__input-box'>
          <input
            className={`topmenu_input ${error ? 'input-invalid' : ''}`}
            type="text"
            value={inputValue}
            onChange={inputHandleChange}
            placeholder='Поиск'
          />
          {error && <div className="input-error">{error}</div>}
        </div>
      </div>

      <div className='dataSession-box'>
        <div className='sessionCount'>Sessions: {sessionCount}</div>
        <div className='data'>
          {currentTime}
          <img src={clock} alt='clock' className='clock-icon'/>
        </div>
      </div>
    </div>
  );
}
