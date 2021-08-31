import Box from '@material-ui/core/Box';
import type { CircularProgressProps } from '@material-ui/core/CircularProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const useStyles = makeStyles((theme) => {
  return {
    bottom: {
      color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    top: {
      color: green['600'],
      animationDuration: '550ms',
      position: 'absolute',
      left: 0,
    },
    circle: {
      strokeLinecap: 'round',
    },
    label: {
      fontWeight: 'bold',
    },
  };
});

export interface EasyCircularProgressProps extends CircularProgressProps {
  label?: string | number;
  loading?: boolean;
}

export const EasyCircularProgress: React.FC<EasyCircularProgressProps> = (props) => {
  const classes = useStyles();
  const { label, loading, ...restProps } = props;

  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        size={30}
        thickness={loading ? 4 : 15}
        value={100}
        variant="determinate"
        className={classes.bottom}
        {...restProps}
      />
      {loading ? (
        <CircularProgress
          size={30}
          thickness={4}
          disableShrink
          variant="indeterminate"
          className={classes.top}
          classes={{
            circle: classes.circle,
          }}
          {...restProps}
        />
      ) : null}
      {label ? (
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="caption" color="textPrimary" className={classes.label}>
            {label}
          </Typography>
        </Box>
      ) : null}
    </Box>
  );
};
