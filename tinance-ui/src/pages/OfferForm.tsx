import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Stepper from '@material-ui/core/Stepper';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  step: {
    padding: 16,
    marginTop: 24,
  },
  card: {
    padding: 32,
  },
}));

const steps = ['Offer Details', 'Payment Details', 'Expiry Time'];

const OfferFormPage: React.FC = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Grid spacing={2} container>
      <Grid xs={12} item>
        <Paper className={classes.step}>
          <Stepper alternativeLabel nonLinear activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepButton>{label}</StepButton>
              </Step>
            ))}
          </Stepper>
        </Paper>
      </Grid>
      <Grid xs={12} item>
        <Paper className={classes.card}>2222</Paper>
      </Grid>
      <Grid xs={12} item>
        <Paper className={classes.card}>333</Paper>
      </Grid>
      <Grid xs={12} item>
        <Paper className={classes.card}>444</Paper>
      </Grid>
    </Grid>
  );
};

export default OfferFormPage;
