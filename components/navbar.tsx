import logo from '../public/logo.png';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const flexStyle = {
  height: '64px',
  padding: '0 20px',
  borderBottom: '2px solid #f1f2f3',
};

export default function Navbar() {
  return (
    <Grid
      container
      style={flexStyle}
      data-selector='navbar'
      alignItems='center'
      gap={1}
    >
      <Image src={logo} alt='logo' width={40} />
      <Typography variant='h5' component='h2'>
        MAF Pokemon App
      </Typography>
    </Grid>
  );
}
