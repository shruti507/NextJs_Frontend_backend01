// src/components/Footer.tsx

import React from 'react';
import styles from './Footer.module.css'; // Import your CSS module if using CSS modules, or adjust the path as needed
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 wow fadeIn" data-wow-duration="1s" data-wow-delay="0.25s">
            <p>
              © Copyright 2021 Space Dynamic Co. All Rights Reserved.
              <br />
              {/* Design: <Link rel="nofollow" href="https://templatemo.com" target="_blank" rel="noopener noreferrer">TemplateMo</Link> */}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
