import { green } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useUpdateEffect } from 'ahooks';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { EasyCircularProgress } from './EasyCircularProgress';

const useStyles = makeStyles((theme) => {
  return {
    divider: {
      padding: 0,
      width: 512,
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
  onClose: () => void;
}

export const DepositeDialog: React.FC<DepositeDialogProps> = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { open, message: activeMessage, onClose } = props;
  const [currentStep, setCurrentStep] = useState(1);

  useUpdateEffect(() => {
    setCurrentStep((prevState) => prevState + 1);
  }, [activeMessage]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="upload-dialog-title"
      aria-describedby="upload-dialog-description"
    >
      <DialogTitle id="upload-dialog-title">{t('Depositing...')}</DialogTitle>
      <DialogContent>
        <List className={classes.divider}>
          {[
            'Creating Connection...',
            'Checking allowance...',
            'Creating Contract...',
            'Deposit Complete !!',
          ].map((message, index) => (
            <ListItem key={message} divider>
              <ListItemIcon className={classes.check}>
                {index >= currentStep ? (
                  <EasyCircularProgress label={index + 1} loading={index === currentStep} />
                ) : (
                  <CheckCircleIcon fontSize="large" color="inherit" />
                )}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="h6"
                    color={index === currentStep ? 'textPrimary' : 'textSecondary'}
                  >
                    {t(message)}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
        <DialogContentText id="upload-dialog-description" className={classes.description}>
          PS: {t("Please don't close or refresh the page")}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
