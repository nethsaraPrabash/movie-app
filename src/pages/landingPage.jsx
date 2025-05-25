import { useState, useEffect } from 'react';
import { Typography, Button, Container, Box, Stack, Link, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { motion } from 'framer-motion'; 
import '../styles/index.css';
import { useNavigate } from 'react-router-dom';


const LandingPage = () => {
  const [mode] = useState('dark');
  const [animationKey, setAnimationKey] = useState(0);
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#ff0000',
      },
    },
  });

  const typewriterVariants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: 1,
      transition: {
        delay: i * 0.1,
      },
    }),
  };

  const text = "JSparrow";

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey((prevKey) => prevKey + 1);
    }, text.length * 100 + 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        id="hero"
        sx={{
          width: '100%',
          backgroundRepeat: 'no-repeat',
          backgroundImage:
            theme.palette.mode === 'dark'
              ? 'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(0, 90.60%, 41.80%), transparent)'
              : 'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(0, 95.90%, 48.20%), transparent)',
        }}
      >
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: { xs: 10, sm: 14, md: 20 },
            pb: { xs: 6, sm: 8, md: 12 },
          }}
        >
          <Stack
            spacing={2}
            useFlexGap
            sx={{
              alignItems: 'center',
              width: { xs: '100%', sm: '90%', md: '70%' },
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h1"
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
              }}
            >
              Welcome to The
              <Typography
                component="span"
                variant="h1"
                sx={{
                  fontSize: 'inherit',
                  color: 'primary.main',
                  ml: 1,
                  display: 'flex',
                }}
              >
                {text.split("").map((char, index) => (
                  <motion.span
                    key={`${animationKey}-${index}`}
                    custom={index}
                    variants={typewriterVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {char}
                  </motion.span>
                ))}
              </Typography>
            </Typography>
            <Typography
              sx={{
                textAlign: 'center',
                color: 'text.secondary',
                fontSize: { xs: '1rem', sm: '1.2rem' },
                width: { xs: '100%', sm: '90%', md: '80%' },
              }}
            >
              Welcome to JSparrow, your ultimate destination for movie lovers! Explore detailed information on thousands of films—from timeless classics to the latest blockbusters. Dive into cast and crew profiles, watch trailers, read synopses, view ratings, and uncover behind-the-scenes trivia.
            </Typography>
          </Stack>
          <Stack>
            <Button
              variant="contained"
              size="large"
              sx={{
                mt: 4,
                px: { xs: 3, sm: 4 },
                py: { xs: 1.5, sm: 2 },
                fontSize: { xs: '1rem', sm: '1.25rem' },
                borderRadius: '8px'
              }}
              onClick={() => {
                  navigate('/dashboard');
                }}

            >
              <Link
                color="inherit"
                underline="none"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                }}
              >
                Explore Movies
              </Link>
            </Button>
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default LandingPage;