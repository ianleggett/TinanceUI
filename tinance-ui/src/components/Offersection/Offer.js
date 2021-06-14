import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardHeader } from 'reactstrap';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    marginTop: "50px",
    marginBottom: "50px",
    borderRadius: "20px",
    margin: 'auto',
    maxWidth: 900,
  },
  
});

export default function ImgMediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardHeader style={{backgroundColor: "#0d6efd"}}>
            <div style={{backgroundColor: "#007bff", padding: "10px"}}>
                <Typography variant="h5"  style={{textAlign: "center", color: "#fff", position: "relative"}}>USDT/VND</Typography>
                <Typography style={{textAlign: "right", color: "#fff", fontSize: "17px", position: "absolute", top: "23px", right: "30px", backgroundColor: "#0dcaf0", borderRadius: "10px", paddingLeft: "10px", paddingRight: "10px"}}>user2</Typography>
            </div>
        </CardHeader>
        <CardContent style={{backgroundColor: "#0d6efd"}}>
            <Typography variant="h5"  style={{textAlign: "center", color: "#fff", fontSize: "17px"}}>(5 days ago) CREATED</Typography>
            <Typography variant="h5"  style={{textAlign: "center", color: "#fff", marginTop: "10px", marginBottom: "20px"}}>4000 USDT => 5000 VND</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Grid container spacing={3}>
        <Grid item xs>
            <Typography variant="span" style={{textAlign: "center", color: "#fff", fontSize: "17px",  backgroundColor: "#0d6efd", borderRadius: "10px", paddingLeft: "15px", paddingRight: "15px"}}>Pingit</Typography>
        </Grid>
        <Grid item xs>
            <Button size="small" color="primary">Money Gram</Button>    
        </Grid>
        <Grid item xs>
            <Button size="small" color="primary">Take Offer</Button>    
       </Grid>
      </Grid>
        
        
       
      </CardActions>
    </Card>
  );
}
