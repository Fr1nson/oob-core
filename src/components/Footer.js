import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <a href="#">
      <div className="footer-content">
        <nav className="footer-nav">
        <a href="#down"><img src="/down.png" alt="Arrow" className="down-img" /></a>
          <a href="#down"><img src="/down.png" alt="Arrow" className="down-img" /></a>

          <a href="#learnmore" className="learn-more">Learn More</a>

          <a href="#down"><img src="/down.png" alt="Arrow" className="down-img" /></a>

          <a href="#down"><img src="/down.png" alt="Arrow" className="down-img" /></a>
        </nav>
      </div></a>
    </footer>
  );
}

export default Footer;
