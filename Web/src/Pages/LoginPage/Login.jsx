import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { db } from './firebase';


function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [isLight, setIsLight] = useState(false);

const toggleTheme = () => {
  setIsLight((prev) => !prev);

  const root = document.documentElement;
  if (!isLight) {
    root.style.setProperty('--secondarybg', 'var(--secondarybg-light)');
    root.style.setProperty('--secondarybg-size', 'var(--secondarybg-light-size)');
  } else {
    root.style.setProperty('--secondarybg', 'var(--secondarybg-dark)');
    root.style.setProperty('--secondarybg-size', 'var(--secondarybg-dark-size)');
  }
};


  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'askus' && password === 'nagiskus') {
      navigate('/main');
    } else {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000); 
    }
  };

  return (
    <StyledWrapper>
        <input
  type="checkbox"
  className="theme-checkbox"
  onChange={toggleTheme}
  checked={isLight}
/>


      <h3 style={{color:'#FE4A49',fontSize:'50px',marginBottom:'20px', marginTop:'10px'}}>TrackVie</h3>
      <div className="animated-border">
        <div id='container'>
          <h2 id='login' style={{fontWeight:'bold'}}>Login</h2>
          <form onSubmit={handleLogin} id='form'>
            <input
              id='username'
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              id='password'
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button id='submitBtn' type="submit"><span>Log In</span></button>
          </form>
          <h1 style={{ fontSize: '18px', color: '#FE4A49' }}>or</h1>
          <button id='registerBtn'>register</button>
        </div>
      </div>

      <div
        id='notification-credentials'
        className={showNotification ? 'show' : ''}
      >
        <div><i className="fa-solid fa-circle-exclamation"></i></div>
        <div style={{ marginLeft: '8px' }}>Wrong Username or Password</div>
      </div>
    </StyledWrapper>
  );
}



const StyledWrapper = styled.div`
  font-family: 'League Spartan', sans-serif;

  background-color: rgb(49, 67, 73);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction:column;
  width: 100%;
  height: 100%;
  background: var(--secondarybg);
  background-size: var(--secondarybg-size);

  .theme-checkbox {
  --toggle-size: 10px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 6.25em;
  height: 3.125em;
  background: linear-gradient(to right, #efefef 50%, #2a2a2a 50%) no-repeat;
  background-size: 205%;
  background-position: 0;
  transition: 0.4s;
  border-radius: 99em;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  font-size: var(--toggle-size);
  z-index: 999;
  border:none;
}

.theme-checkbox::before {
  content: "";
  width: 2.25em;
  height: 2.25em;
  position: absolute;
  top: 0.438em;
  left: 0.438em;
  background: linear-gradient(to right, #efefef 50%, #2a2a2a 50%) no-repeat;
  background-size: 205%;
  background-position: 100%;
  border-radius: 50%;
  transition: 0.4s;
}

.theme-checkbox:checked::before {
  left: calc(100% - 2.25em - 0.438em);
  background-position: 0;
}

.theme-checkbox:checked {
  background-position: 100%;
}



  #notification-credentials{
   display: flex;
    background-color:rgb(194, 37, 37);
    width: 30%;
    padding-top: 1%;
    padding-bottom: 1%;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    color: #ffff;
    position: absolute; 
    bottom: 10px;
    left: 50%; 
    transform: translate(-50%,10px); 
    opacity: 0;
    white-space: nowrap;
    transition: transform 0.3s ease, opacity 0.3s ease;
    pointer-events: none;
    }

    #notification-credentials.show {
        opacity: 1;
        transform: translate(-50%, 0px);
        pointer-events: auto;
    }

  #submitBtn span {
  font-size: 20px;
  font-weight: bold;
   }

  .animated-border {
    position: relative;
    padding: 5px;
    border-radius: 20px;
    overflow: hidden;
    z-index: 0;
    width: fit-content;
  }

  .animated-border::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  height: 100%;
  width: 100%;
  background: linear-gradient(90deg, transparent, #FE4A49, transparent);
  animation: slideBorder 2s linear infinite;
  z-index: -2;
}

  @keyframes slideBorder {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

  #login {
    color: #FE4A49;
    font-size: 40px;
  }

  #container {
    padding: 2rem;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 300px;
    border-radius: 10px;
    background-color: #1d1d1d;
  }

  #form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;
  }

  input {
    border: solid thin #FE4A49;
    background-color: #3c3c3c;
    outline: none;
    color: white;
    padding: 8px;
    width: 100%;
    box-sizing: border-box;
    transition-duration: 0.3s;
    font-size: 18px;
  }

  input:hover,
  input:focus {
    background-color: #4e4f51;
  }

  #submitBtn {
    background-color: #FE4A49;
    color: white;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 15px;
    border-radius: 10px;
  }

  #submitBtn:hover {
    background-color: #c93535;
  }

  #registerBtn {
  background: none;
  border: none;
  color: #c93535;
  font-size: 20px;
  position: relative;
  cursor: pointer;
  transition: font-size 0.3s ease, color 0.3s ease;
}

#registerBtn::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 10%;
  width: 0%;
  height: 2px;
  background-color: #c93535;
  transition: all 0.3s ease;
}

#registerBtn:hover {
  color: #FE4A49;
  font-size: 25px; 
}

#registerBtn:hover::after {
  left: 0;
  width: 100%;
  background-color: #FE4A49;
}


`;


export default LoginPage;
