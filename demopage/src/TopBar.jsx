import React from 'react';
import './TopBar.css';

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="logo">
        <a href='https://www.spacece.co/'><img src="/icon.jpeg" alt="Logo" /></a>
      </div>
      <div className="headings">
        <h1 className="big-heading">Emotional Analysis Tool!</h1>
        <h2 className="small-heading">Captures emotions through WebCam</h2>
      </div>
    </div>
  );
};

export default TopBar;
