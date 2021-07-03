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
          <Grid xs={12} sm={12} md={6} lg={6} xl={6} item>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              src={videoUrl}
              width="100%"
              preload="auto"
              loop
              controls
              className={classes.video}
            />
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={6} xl={6} className={classes.content} item>
            <Typography component="h2" variant="h4" color="primary">
              {t('How it works')}
            </Typography>
            <ol className={classes.list}>
              <li>
                <Typography component="p" variant="body1">
                  Connect wallet
                </Typography>
              </li>
              <li>
                <Typography component="p" variant="body1">
                  Create new offers
                </Typography>
              </li>
              <li>
                <Typography component="p" variant="body1">
                  Select trading counterpart
                </Typography>
              </li>
              <li>
                <Typography component="p" variant="body1">
                  Trade
                </Typography>
              </li>
              <li>
                <Typography component="p" variant="body1">
                  Credit escrow
                </Typography>
              </li>
              <li>
                <Typography component="p" variant="body1">
                  Receive bank transfer
                </Typography>
              </li>
              <li>
                <Typography component="p" variant="body1">
                  Release USDT and complete trade
                </Typography>
              </li>
            </ol>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default HomePage;
