import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const LandingPageCardItem = (props) => {
    const {card} =props;
  return (
    <Grid item key={card} xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            // 16:9
            pt: "0%",
          }}
          image={card.img}
          //image="https://source.unsplash.com/random"
          alt="random"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {card.title}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default LandingPageCardItem;
