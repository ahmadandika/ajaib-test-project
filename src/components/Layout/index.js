import { Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Outlet />
    </Container>
  );
};

export default Layout;
