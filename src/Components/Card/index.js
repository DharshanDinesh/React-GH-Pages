import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import CardMedia from '@mui/material/CardMedia';

export default function MediaCard({
  imageUrl,
  title,
  isLoading,
  sourceUrl,
  source,
  date,
  clean_url,
}) {
  const image =
    imageUrl ??
    'https://st.depositphotos.com/1006899/3776/i/950/depositphotos_37765339-stock-photo-news.jpg';
  return (
    <Card sx={{ width: 345, backgroundColor: '#001e3c' }}>
      <CardHeader
        avatar={
          !isLoading ? (
            <Avatar sx={{ bgcolor: '#3399ff' }} aria-label="recipe">
              {source?.[0]}
            </Avatar>
          ) : (
            <div style={{ width: '100%' }}>
              <Skeleton
                variant="circular"
                width={40}
                height={40}
                sx={{ backgroundColor: '#3399ff' }}
              />
            </div>
          )
        }
        title={
          !isLoading ? (
            <Typography
              variant="subtitle1"
              onClick={() => {
                window.open('https://www.' + clean_url);
              }}
              style={{
                fontWeight: '300',
                color: '#ffffff',
              }}
            >
              {source}
            </Typography>
          ) : (
            <div style={{ width: '100%' }}>
              <Skeleton sx={{ backgroundColor: '#3399ff' }} />
            </div>
          )
        }
        subheader={
          !isLoading ? (
            <Typography
              variant="subtitle2"
              style={{
                color: '#3399ff',
              }}
            >
              {date}
            </Typography>
          ) : (
            <div style={{ width: '100%' }}>
              <Skeleton sx={{ backgroundColor: '#3399ff' }} />
            </div>
          )
        }
      />

      {!isLoading ? (
        <CardMedia component="img" height="194" image={image} alt={image} />
      ) : (
        <div style={{ width: '100%' }}>
          <Skeleton sx={{ backgroundColor: '#3399ff' }} />
        </div>
      )}

      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {!isLoading ? (
            <Typography
              variant="h6"
              style={{
                color: '#ffffff',
              }}
            >
              {title}
            </Typography>
          ) : (
            <div style={{ width: '100%' }}>
              <Skeleton sx={{ backgroundColor: '#3399ff' }} />
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
          <div style={{ width: '100%' }}>
            <Skeleton sx={{ backgroundColor: '#3399ff' }} />
          </div>
        )}
      </CardActions>
    </Card>
  );
}
