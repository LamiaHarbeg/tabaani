import React,{useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import axios from "axios"
import Link  from '@material-ui/core/Link';

export default function Gallery() {
    // Use State for Images.
    const [images, setImages] = useState([]);
    const limit = 50;
    const [load, setLoad] = useState(10);
      const handleShowMore = () => {
        if(load <= limit) {
          setLoad(load+10)
        }
      };

    // Fetch Data
    const getImages = () => {
          // Call the API
          axios.get("https://jsonplaceholder.typicode.com/photos")
          .then(res=> setImages(res.data.filter((x) => x.albumId % 2 === 0)))
          .catch((err) => console.log(err));
    }
  
    
    useEffect(() => {
      getImages();
    }, []);
       
    const useStyles = makeStyles((theme) => ({
     heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
      },
      heroButtons: {
        marginTop: theme.spacing(4),
      },
      cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
      },
      card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      cardMedia: {
        paddingTop: '56.25%', // 16:9
      },
      cardContent: {
        flexGrow: 1,
      },
         }));
         const classes = useStyles();
    return (
      <>
           <main id="main">
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container >
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Photos
            </Typography>
                </Container>
        </div>
        <Container className={classes.cardGrid} >
          {/* End hero unit */}
          <Grid container spacing={4}>
            {images.slice(0, load).map((album) => (
              <Grid item key={album.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={album.url}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                                       <Typography>
                      {album.title}
                    </Typography>
                  </CardContent>
                  </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button onClick={handleShowMore} variant="contained" color="primary">
                  Show More
                  </Button>
                </Grid>
                <Grid item>
                  <Link href="#main">
                  <Button variant="outlined" color="primary">
                  To the Top
                  </Button>
                  </Link>
                </Grid>
              </Grid>
            </div>
      </main>
      </>
    );
  };

