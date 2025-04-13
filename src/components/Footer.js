import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span>© 2025 OOB. All rights reserved.</span>
        <nav className="footer-nav">          
        <a href="#learnmore" class="learn-more">⬇⬇Learn More⬇⬇</a>
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
          <a href="#contact">Contact</a>

        </nav>
      </div>
    </footer>
  );
}

export default Footer;
