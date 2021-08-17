import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
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
  },
  video: {
    width: '100%',
    aspectRatio: '16 / 9',
    borderRadius: 20,
    marginTop: '40px',
  },
  content: {
    padding: theme.spacing(3),
  },
  subTitle: {
    padding: theme.spacing(1),
    margin: '56px 0',
    fontWeight: 800,
    fontSize: '48px',
    textAlign: 'center',
  },
  subTitle2: {
    padding: theme.spacing(1),
    margin: '12px 0',
    fontWeight: 800,
    fontSize: '24px',
    textAlign: 'center',
  },
  list: {
    'paddingLeft': theme.spacing(3),
    '& p': {
      lineHeight: 2,
    },
  },
  bubble: {
    boxShadow: 'none',
    borderRadius: '25px',
    overflow: 'hidden',
    marginBottom: '20px',
    color: '#86868b',
    paddingRight: 0,
  },
  bigBubble: {
    borderRadius: '25px',
    padding: '20px',
    textAlign: 'justify',
    marginBottom: '20px',
  },
  link: {
    'color': '#0d6efd',
    'textDecoration': 'none',
    '&:visited': {
      color: '#0d6efd',
    },
    '&:hover': {
      color: '#40a3ff',
    },
  },
  icon: {
    width: '100px',
    borderRadius: '20px',
    marginRight: '10px',
  },
  picture: {
    minWidth: '120px',
    height: '160px',
    textAlign: 'center',
    margin: 'auto',
  },
  howTo: {
    position: 'relative',
    padding: '32px 10px',
    fontSize: '16px',
    borderRadius: '20px',
    margin: '10px',
    height: '100%',
    boxShadow: '2px 2px 4px 0 rgba(0, 0, 0, 0.1)',
  },
  order: {
    position: 'absolute',
    top: '24px',
    left: '24px',
    width: '48px',
    height: '48px',
    lineHeight: '48px',
    borderRadius: '50%',
    textAlign: 'center',
    fontSize: '32px',
    fontWeight: 600,
    color: '#fff',
    backgroundColor: '#ece3ff',
  },
  icon2: {
    width: '100%',
    margin: 'auto',
    padding: '20px',
  },
  text2: {
    display: 'block',
    color: '#86868b',
    fontSize: '16px',
  },
  stepTitle: {
    fontWeight: 600,
    fontSize: '24px',
    color: '#000',
    textAlign: 'left',
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
      <Grid alignItems="center">
        {!videoUrl.startsWith('https://www.youtube.com') ? (
          <iframe
            id="ytplayer"
            title="Weclome to Tinance"
            src={videoUrl}
            frameBorder={0}
            allowFullScreen
            className={classes.video}
          />
        ) : (
          <video
            src={videoUrl}
            preload="auto"
            poster="banner.jpg"
            loop
            controls
            className={classes.video}
          />
        )}
      </Grid>
      <Grid spacing={3} alignItems="center" direction={direction} container>
        <Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
          <Typography
            component="h2"
            variant="h2"
            color="textPrimary"
            align="center"
            className={matches ? classes.subTitle : classes.subTitle2}
          >
            {t('What is Trusted Finance?')}
          </Typography>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={4} xl={4} item>
          <Paper
            elevation={2}
            className={classes.bubble}
            style={{ backgroundColor: '#edfbfe', paddingBottom: matches ? '0' : '20px' }}
          >
            <Grid container alignContent="center" justifyContent="center">
              <Grid md={7} lg={7} item alignItems="center">
                <Typography component="p" variant="body1" className={classes.content}>
                  Simple, automated trade flow - making it easier and more accessible to trade
                  globally, and doing it safely and securely.
                </Typography>
              </Grid>
              <Grid md={5} lg={5} item>
                <img src="secure.png" alt="control" className={classes.picture} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={4} xl={4} item>
          <Paper
            elevation={2}
            className={classes.bubble}
            style={{ backgroundColor: '#f5fff3', paddingBottom: matches ? '0' : '20px' }}
          >
            <Grid container alignContent="center" justifyContent="center">
              <Grid md={7} lg={7} item>
                <Typography component="p" variant="body1" className={classes.content}>
                  Customer has total control – trades are authorized directly from your own wallet
                  and all transactions can be verified in real-time (on blockchain).
                </Typography>
              </Grid>
              <Grid md={5} lg={5} item>
                <img src="trust.png" alt="control" className={classes.picture} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={4} xl={4} item>
          <Paper
            elevation={2}
            className={classes.bubble}
            style={{ backgroundColor: '#fff5f7', paddingBottom: matches ? '0' : '20px' }}
          >
            <Grid container alignContent="center" justifyContent="center">
              <Grid md={7} lg={7} item>
                <Typography component="p" variant="body1" className={classes.content}>
                  No more &apos;trust issues&apos; - we use decentralized{' '}
                  <a
                    href="https://ethereum.org/en/developers/docs/smart-contracts/"
                    className={classes.link}
                  >
                    smart contracts
                  </a>{' '}
                  - so no counterparty risk and no dilemma of &apos;Who moves first?&apos;
                </Typography>
              </Grid>
              <Grid md={5} lg={5} item>
                <img src="manage.png" alt="control" className={classes.picture} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Grid spacing={3} alignItems="stretch" direction={matches ? 'row' : 'column'} container>
        <Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
          <Typography
            component="h2"
            variant="h2"
            color="textPrimary"
            align="center"
            className={matches ? classes.subTitle : classes.subTitle2}
          >
            {t('How it works?')}
          </Typography>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={6} xl={6} item>
          <Card className={classes.howTo}>
            <span className={classes.order}>1</span>
            <CardMedia component="img" className={classes.icon2} image="join.png" title="Join" />

            <CardContent>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                color="primary"
                className={classes.stepTitle}
                style={{ margin: matches ? '24px' : '0 0 24px 0' }}
              >
                Create your account
              </Typography>
              <Typography
                variant="body2"
                className={classes.text2}
                style={{ margin: matches ? '24px' : '0' }}
                component="p"
              >
                <a href="signup" className={classes.link}>
                  Sign up
                </a>
                , enter your contact details and your journey begins. It is that easy - and its
                free!
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={6} xl={6} item>
          <Card className={classes.howTo}>
            <span className={classes.order}>2</span>
            <CardMedia
              component="img"
              className={classes.icon2}
              alt="wallet"
              image="wallet.png"
              title="connect your wallet"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                color="primary"
                className={classes.stepTitle}
                style={{ margin: matches ? '24px' : '0 0 24px 0' }}
              >
                Connect your eWallet
              </Typography>
              <Typography
                variant="body2"
                className={classes.text2}
                style={{ margin: matches ? '24px' : '0' }}
                component="p"
              >
                Link your eWallet using{' '}
                <a href="https://metamask.io/" className={classes.link}>
                  Metamask
                </a>{' '}
                or compatible{' '}
                <a href="https://walletconnect.org/" className={classes.link}>
                  Wallet Connect
                </a>
                . Add your receiving bank details and begin trading.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={6} xl={6} item alignItems="stretch">
          <Card className={classes.howTo}>
            <span className={classes.order}>3</span>
            <CardMedia
              component="img"
              className={classes.icon2}
              alt="trade"
              image="trade.png"
              title="trade"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                color="primary"
                className={classes.stepTitle}
                style={{ margin: matches ? '24px' : '0 0 24px 0' }}
              >
                Browse the marketplace
              </Typography>
              <Typography
                variant="body2"
                className={classes.text2}
                style={{ margin: matches ? '24px' : '0' }}
                component="p"
              >
                <b>Accept</b> trades from other users or <b>Create</b> your own offer. Simply set
                your terms and publish to the market for others to accept.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={6} xl={6} item>
          <Card className={classes.howTo}>
            <span className={classes.order}>4</span>
            <CardMedia
              component="img"
              className={classes.icon2}
              object-fit
              alt="complete trade"
              image="complete.png"
              title="complete your trade"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                color="primary"
                className={classes.stepTitle}
                style={{ margin: matches ? '24px' : ' 0 0 24px 0' }}
              >
                Complete your trade
              </Typography>
              <Typography
                variant="body2"
                className={classes.text2}
                style={{ margin: matches ? '24px' : '0' }}
                component="p"
              >
                Each trade is managed by a{' '}
                <a
                  href="https://ethereum.org/en/developers/docs/smart-contracts/"
                  className={classes.link}
                >
                  smart contract
                </a>
                , crypto is held in secure escrow and only released when digitally verified by both
                parties. If either party fails to verifiy every part of the process, funds are
                automatcically refunded. Arbitration takes place in the unlikely event of disputes.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
