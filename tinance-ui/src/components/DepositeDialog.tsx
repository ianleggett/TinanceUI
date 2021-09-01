import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import { useUpdateEffect } from 'ahooks';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { EasyCircularProgress } from './EasyCircularProgress';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      width: 512,
    },
    divider: {
      padding: 0,
      border: `1px solid ${theme.palette.divider}`,
    },
    check: {
      color: green['600'],
    },
    description: {
      marginTop: theme.spacing(2),
    },
  };
});

export interface DepositeDialogProps {
  open: boolean;
  message: string;
  hasError: boolean;
  onClose: () => void;
  onCancel: () => void;
}

export const DepositeDialog: React.FC<DepositeDialogProps> = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { open, message: activeMessage, hasError, onClose, onCancel } = props;
  const [currentStep, setCurrentStep] = useState(1);

  const getMessageIcon = useCallback(
    (index: number) => {
      if (index < currentStep) {
        return <CheckCircleIcon color="inherit" fontSize="large" />;
      }

      if (index > currentStep) {
        return <EasyCircularProgress label={index + 1} loading={false} />;
      }

      if (hasError) {
        return <ErrorIcon color="error" fontSize="large" />;
      }

      return <EasyCircularProgress label={index + 1} loading />;
    },
    [currentStep, hasError],
  );

  const getMessageColor = useCallback(
    (index: number) => {
      if (index !== currentStep) {
        return 'textSecondary';
      }

      if (hasError) {
        return 'error';
      }

      return 'textPrimary';
    },
    [currentStep, hasError],
  );

  useUpdateEffect(() => {
    if (!hasError) {
      setCurrentStep((prevState) => (activeMessage === 'CONNECT_WS' ? 1 : prevState + 1));
    }
  }, [hasError, activeMessage]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="upload-dialog-title"
      aria-describedby="upload-dialog-description"
      classes={{
        paper: classes.root,
      }}
    >
      <DialogTitle id="upload-dialog-title">{t('Depositing...')}</DialogTitle>
      <DialogContent>
        <List className={classes.divider}>
          {['CONNECT_WS', 'CHK_ALLOWANCE', 'CREATE_CTR', 'DEPOSIT', 'COMPLETE'].map(
            (message, index) => (
              <ListItem key={message} divider>
                <ListItemIcon className={classes.check}>{getMessageIcon(index)}</ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="h6" color={getMessageColor(index)}>
                      {t(hasError && index === currentStep ? activeMessage : message)}
                    </Typography>
                  }
                />
                <ListItemSecondaryAction>
                  {index === currentStep && hasError ? (
                    <Button color="primary" size="small" variant="outlined" onClick={onCancel}>
                      {t('Cancel')}
                    </Button>
                  ) : null}
                </ListItemSecondaryAction>
              </ListItem>
            ),
          )}
        </List>
        <DialogContentText id="upload-dialog-description" className={classes.description}>
          PS: {t("Please don't close or refresh the page")}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
