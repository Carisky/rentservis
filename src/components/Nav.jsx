import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import styles from "./style.module.css";

export default function Nav() {
  const [activeTab, setActiveTab] = useState('');
  const location = useLocation();

  React.useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  // Define an array of link objects
  const links = [
    { label: 'clients', path: '/' },
    { label: 'landlords', path: '/landlords' },
    { label: 'apartments', path: '/apartments' },
    { label: 'rents', path: '/rents' }
  ];

  return (
    <Box className={styles.navlist}>
      {links.map((link, index) => (
        <Link
          key={index}
          className={`${styles.navbox} ${activeTab === link.path ? styles.active : ''}`}
          to={link.path}
        >
          {link.label}
        </Link>
      ))}
    </Box>
  );
}
