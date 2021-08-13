import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppConfigState } from '../components';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '64px 0',
    padding: '32px',
  },
  video: {
    width: '95%',
    aspectRatio: '16 / 9',
    borderRadius: 5,
  },
  content: {
    padding: theme.spacing(1),
  },
  list: {
    'paddingLeft': theme.spacing(3),
    '& p': {
      lineHeight: 2,
    },
  },
  bubble: {
    'background-color': '#ffffff',
    'height': '160px',
    'border-radius': '25px',
    'padding': '20px',
    'text-align': 'justify',
    'margin-bottom': '20px',
  },
  bigBubble: {
    'border-radius': '25px',
    'padding': '20px',
    'text-align': 'justify',
    'margin-bottom': '20px',
  },
  icon: {
    'width': '100px',
    'border-radius': '20px',
    'float': 'left',
    'margin-right': '10px',
  },
  main: {
    'margin-top': '30px',
  },
}));

const HomePage: React.FC = () => {
  const theme = useTheme();
  const classes = useStyles();
  const { t } = useTranslation();
  const { videoUrl } = useAppConfigState();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const direction = useMemo(() => (matches ? 'row-reverse' : 'column'), [matches]);

  return (
    <Container disableGutters>
      <Grid
        spacing={3}
        alignItems="center"
        direction={direction}
        container
        className={classes.main}
      >
        <Grid xs={12} sm={12} md={12} lg={12} xl={12} className={classes.content} item>
          <Typography component="h2" variant="h4" color="primary" align="center">
            {t('What is Trusted Finance?')}
          </Typography>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={4} xl={4} item>
          <Paper elevation={5} className={classes.bubble}>
            <img src="secure.jpg" alt="control" className={classes.icon} />
            <Typography component="p" variant="body1">
              Simple, automated trade flow - making it easier and more accessible to trade globally,
              and doing it safely and securely.
            </Typography>
          </Paper>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={4} xl={4} item>
          <Paper elevation={5} className={classes.bubble}>
            <img src="manage.jpg" alt="control" className={classes.icon} />
            <Typography component="p" variant="body1">
              Customer has total control – trades are authorized directly from your own wallet and
              all transactions can be verified in real-time (on blockchain).
            </Typography>
          </Paper>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={4} xl={4} item>
          <Paper elevation={5} className={classes.bubble}>
            <img src="trust.jpg" alt="control" className={classes.icon} />
            <Typography component="p" variant="body1">
              No more &apos;trust issues&apos; - we use decentralized{' '}
              <a href="https://ethereum.org/en/developers/docs/smart-contracts/">smart contracts</a>{' '}
              - so no counterparty risk and no dilemma of &apos;Who moves first?&apos;
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Paper elevation={5} className={classes.bigBubble}>
        <Grid spacing={3} alignItems="center" direction={direction} container>
          <Grid xs={6} sm={6} md={6} lg={6} xl={6} item>
            {videoUrl.startsWith('https://www.youtube.com') ? (
              <iframe
                id="ytplayer"
                title="Weclome to Tinance"
                src={videoUrl}
                frameBorder={0}
                allowFullScreen
                className={classes.video}
              />
            ) : (
              <video src={videoUrl} preload="auto" loop controls className={classes.video} />
            )}
          </Grid>
          <Grid xs={6} sm={6} md={6} lg={6} xl={6} className={classes.content} item>
            <Typography component="h2" variant="h4" color="primary">
              {t('How it works')}
              <br />
            </Typography>
            <Typography component="p" variant="body1">
              <b>Create your account</b>
            </Typography>
            <Typography component="p" variant="body1" />
            <a href="signup">Sign up</a>, enter your contact details and your journey begins. It is
            that easy - and its free!
            <Typography component="p" variant="body1">
              <b>Connect your eWallet</b>
            </Typography>
            <Typography component="p" variant="body1" />
            Link your eWallet using <a href="https://metamask.io/">Metamask</a> or compatible{' '}
            <a href="https://walletconnect.org/">Wallet Connect</a>. Add your recieving bank details
            and begin trading.
            <Typography component="p" variant="body1">
              <b>Browse the marketplace and trade with other users</b>
            </Typography>
            <Typography component="p" variant="body1" />
            <b>Accept</b> trades from other users or <b>Create</b> your own offer. Simply set your
            terms and publish to the market for others to accept.
            <Typography component="p" variant="body1">
              <b>Complete your trade</b>
            </Typography>
            <Typography component="p" variant="body1" />
            Each trade is managed by a{' '}
            <a href="https://ethereum.org/en/developers/docs/smart-contracts/">smart contract</a>,
            crypto is held in secure escrow and only released when digitally verified by both
            parties. If either party fails to verifiy every part of the process, funds are
            automatcically refunded. Arbitration takes place in the unlikely event of disputes.
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default HomePage;
