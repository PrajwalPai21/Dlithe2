import React from 'react';
import logo from './logo.svg';

console.log(logo); 

function Header() {
  const handleRedirect = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <img src={logo} alt="Logo" style={{ width: "400px", height: "400px" }} />
      <button onClick={handleRedirect}>Go to Google</button>
    </div>
  );
}

export default Header;
