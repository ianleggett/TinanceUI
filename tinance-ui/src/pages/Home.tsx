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
      <Paper className={classes.root}>
        <Grid spacing={2} direction={direction} container>
          <Grid xs={12} sm={12} md={12} lg={12} xl={12} className={classes.content} item>
            <Typography component="h2" variant="h4" color="primary">
              {t('What is Trusted Finance?')}
            </Typography>
            <ul className={classes.list}>
              <li>
                <Typography component="p" variant="body1">
                  We solve the &apos;trust issue&apos;, leveraging decentralized smart contracts so
                  you have no dilemma of &apos;Who moves first?&apos;
                </Typography>
              </li>
              <li>
                <Typography component="p" variant="body1">
                  We give back control to our customers – trades are authorized directly from your
                  own wallet, and all transactions can be verified in real-time (on blockchain).
                </Typography>
              </li>
              <li>
                <Typography component="p" variant="body1">
                  We simplify and automate the trade flow, making it easier and more accessible to
                  trade with anyone safely and securely.
                </Typography>
              </li>
            </ul>
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={6} xl={6} item>
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

          <Grid xs={12} sm={12} md={6} lg={6} xl={6} className={classes.content} item>
            <Typography component="h2" variant="h4" color="primary">
              {t('How it works')}
            </Typography>
            <ol className={classes.list}>
              <li>
                <Typography component="p" variant="body1">
                  Create Account
                </Typography>
                <ul>
                  <li>
                    <Typography component="p" variant="body1" />
                    Sign in or Sign up, enter your contact details and your journey begins. It is
                    that easy. <a href="signup">Sign up now</a> for free →
                  </li>
                </ul>
              </li>
              <li>
                <Typography component="p" variant="body1">
                  Connect your Wallet
                </Typography>
                <ul>
                  <li>
                    <Typography component="p" variant="body1" />
                    Connect using <a href="https://metamask.io/">Metamask</a> or compatible{' '}
                    <a href="https://walletconnect.org/">Wallet Connect</a> crypto wallet. Add your
                    recieving bank details and begin trading.
                  </li>
                </ul>
              </li>
              <li>
                <Typography component="p" variant="body1">
                  Browse the marketplace, <b>Accept</b> an Offer or <b>Create</b> your own Offer
                </Typography>
                <ul>
                  <li>
                    <Typography component="p" variant="body1" />
                    Any registered user can post an offer to buy or sell. Simply set your terms and
                    publish to the market for others to view. You can also accept Offers from other
                    users to create a trade.
                  </li>
                </ul>
              </li>
              <li>
                <Typography component="p" variant="body1">
                  Complete your Trade
                </Typography>
                <ul>
                  <li>
                    <Typography component="p" variant="body1" />
                    Each trade is managed by a{' '}
                    <a href="https://ethereum.org/en/developers/docs/smart-contracts/">
                      smart contract
                    </a>
                    , crypto is held in secure escrow and only released when digitally verified by
                    both parties. If either party fails to verifiy each part of the process, funds
                    are automatcically refunded. Arbitration is available in the unlikely event of a
                    dispute.
                  </li>
                </ul>
              </li>
            </ol>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default HomePage;
