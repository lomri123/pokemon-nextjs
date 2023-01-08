import Navbar from './navbar';
import React from 'react';
import Grid from '@mui/material/Grid';
import Sidebar from './sidebar';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <Grid container flexDirection='column'>
      <Navbar />
      <Grid container flexGrow={1}>
        <Sidebar />
        <Grid item flexGrow={1} sx={{ padding: '20px' }}>
          {children}
        </Grid>
      </Grid>
    </Grid>
  );
}
