import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LandingPageCardItem from "./LandingPageCardItem";
import ayurveda1 from '../../assets/LandingPage/ayurveda1.jpg'
import ayurveda2 from '../../assets/LandingPage/ayurveda2.jpg'
import ayurveda3 from '../../assets/LandingPage/ayurveda3.jpg'

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const cards = [{
  img:ayurveda1,
  title:'Better Health'
}, {
  img:ayurveda2,
  title:'Clear Up Energy.'
}, {
  img:ayurveda3,
  title:'Better Health'
}];

const theme = createTheme();

export default function Album() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Natural healthcare with Ayurveda
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="text.secondary"
              paragraph
            >
              Ayurveda, an ancient tradition of medicines in India, is focused
              on the idea that 'Prevention is better than cure.' Ayurveda
              suggests alterations in the diet and lifestyle to achieve a
              healthy balance. Ayurveda medicines not only concentrates on
              healing but also emphasizes general wellness. The traditional
              system of ayurvedic medicine introduced several potent herbal
              combinations that aid in maintaining health.
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <LandingPageCardItem card={card}/>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
