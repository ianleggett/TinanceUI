import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { CardHeader } from "reactstrap";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    marginTop: "50px",
    marginBottom: "50px",
    borderRadius: "20px",
    margin: "auto",
    maxWidth: 900,
  },
});

export default function ImgMediaCard() {
  const classes = useStyles();

  const [data, setData] = useState<any>([]);
  const postFilter = { fromccy: 1, toccy: 1 };
  const filtStr = "?filt=" + encodeURI(JSON.stringify(postFilter));
  const getData = () => {
    fetch("https://tinance.techiaz.com/offers.json" + filtStr, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
        setData(myJson);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      {data &&
        data.length > 0 &&
        data.map((item) => (
          <Card className={classes.root}>
            <CardActionArea>
              <CardHeader style={{ backgroundColor: "#0d6efd" }}>
                <div style={{ backgroundColor: "#007bff", padding: "10px" }}>
                  <Typography
                    variant="h5"
                    style={{
                      textAlign: "center",
                      color: "#fff",
                      position: "relative",
                    }}
                  >
                    {item.fromccy.name + "/" + item.toccy.name}
                  </Typography>
                  <Typography
                    style={{
                      textAlign: "right",
                      color: "#fff",
                      fontSize: "15px",
                      position: "absolute",
                      top: "23px",
                      right: "30px",
                      backgroundColor: "#0dcaf0",
                      borderRadius: "10px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                    }}
                  >
                    {item.user.username}
                  </Typography>
                </div>
              </CardHeader>
              <CardContent style={{ backgroundColor: "#0d6efd" }}>
                <Typography
                  variant="h5"
                  style={{
                    textAlign: "center",
                    color: "#fff",
                    fontSize: "17px",
                  }}
                >
                  (6 days ago) CREATED
                </Typography>
                <Typography
                  variant="h5"
                  style={{
                    textAlign: "center",
                    color: "#fff",
                    marginTop: "10px",
                    marginBottom: "20px",
                  }}
                >
                  {item.fromAmount +
                    " " +
                    item.fromccy.name +
                    " => " +
                    item.toAmount +
                    " " +
                    item.toccy.name}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions style={{ padding: "15px" }}>
              <Grid container spacing={3}>
                {item.paymentDetails &&
                  item.paymentDetails &&
                  item.paymentDetails.map((detail) => (
                    <Grid item xs>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          // variant="span"
                          style={{
                            textAlign: "center",
                            color: "#fff",
                            fontSize: "13px",
                            backgroundColor: "#0d6efd",
                            borderRadius: "10px",
                            paddingLeft: "15px",
                            paddingRight: "15px",
                          }}
                        >
                          {detail.name}
                        </Typography>
                      </div>
                    </Grid>
                  ))}
                <Grid item xs>
                  <div style={{ float: "right" }}>
                    <Button size="large" variant="outlined" color="primary">
                      Take Offer
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        ))}
    </div>
  );
}
