import { Box, Container, Link, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';
import { useMemo } from 'react';

const useStyles = makeStyles((theme) => {
  return createStyles({
    root: {
      flex: '0 0 54px',
      padding: 16,
      borderTop: `1px solid ${theme.palette.divider}`,
    },
    right: {
      display: 'flex',
    },
    divider: {
      margin: '0 8px',
      color: theme.palette.divider,
    },
  });
});

const defaultProps = {
  maxWidth: 'lg' as 'lg' | 'xs' | 'sm' | 'md' | 'xl' | false,
};

export interface GlobalFooterProps {
  title: string;
  privacy: string;
  terms: string;
  startYear?: number;
  maxWidth?: 'lg' | 'xs' | 'sm' | 'md' | 'xl' | false;
}

type DefaultProps = typeof defaultProps;
type PropsWithDefault = GlobalFooterProps & DefaultProps;

export const GlobalFooter: React.FC<GlobalFooterProps> = (props) => {
  const classes = useStyles();
  const { title, startYear, maxWidth, privacy, terms } = props as PropsWithDefault;

  const years = useMemo(() => {
    const thisYear = dayjs().year();
    if (!startYear || startYear >= thisYear) {
      return thisYear;
    }
    return `${startYear}-${thisYear}`;
  }, [startYear]);

  return (
    <Container component="footer" maxWidth={maxWidth} className={classes.root}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="subtitle2">
          &copy; {years} {title} All rights reserved.
        </Typography>
        <Box className={classes.right}>
          <Link variant="subtitle2" component="span" href={privacy} target="_blank">
            Privacy Policy
          </Link>
          <Box component="span" className={classes.divider}>
            |
          </Box>
          <Link variant="subtitle2" component="span" href={terms} target="_blank">
            Terms &amp; Conditions
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

GlobalFooter.defaultProps = defaultProps;
