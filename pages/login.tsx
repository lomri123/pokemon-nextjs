import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Head from 'next/head';
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';

export default function Login() {
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/login`);
      router.push('pokemon');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name='description' content='Login page' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        Welcome to login page
        <TextField
          sx={{ width: '200px' }}
          id='outlined-basic'
          label='username'
          variant='outlined'
        />
        <Button sx={{ width: '30px' }} onClick={handleSubmit}>
          login
        </Button>
      </Box>
    </>
  );
}
