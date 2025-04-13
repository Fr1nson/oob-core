// src/components/Hero.js
import React from 'react';
import './Hero.css';

function Hero() {
  return (
    <div className="hero">
      <video autoPlay muted loop className="background-video">
        <source src="/backgr.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay">
        <div className="center-content">
          <div className="circle" />
          <h1>Some text</h1>
          <p>Some text some text</p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
