import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";

export default function MediaCard({
  imageUrl,
  title,
  description,
  isLoading,
  sourceUrl,
  soruce,
  date,
}) {
  const altImg =
    "https://st.depositphotos.com/1006899/3776/i/950/depositphotos_37765339-stock-photo-news.jpg";
  return (
    <Card sx={{ width: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            {soruce?.[0]}
          </Avatar>
        }
        title={soruce}
        subheader={date}
      />

      {!isLoading ? (
        <CardMedia
          component="img"
          height="140"
          image={imageUrl ? imageUrl : altImg}
          alt="green iguana"
        />
      ) : (
        <div style={{ width: "100%" }}>
          <Skeleton />
        </div>
      )}

      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {!isLoading ? (
            title
          ) : (
            <div style={{ width: "100%" }}>
              <Skeleton />
            </div>
          )}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {!isLoading ? (
            description
          ) : (
            <div style={{ width: "100%" }}>
              <Skeleton />
            </div>
          )}
        </Typography>
      </CardContent>
      <CardActions>
        {!isLoading ? (
          <Button
            onClick={() => {
              window.open(sourceUrl);
            }}
            size="small"
          >
            Learn More
          </Button>
        ) : (
          <div style={{ width: "100%" }}>
            <Skeleton />
          </div>
        )}
      </CardActions>
    </Card>
  );
}
