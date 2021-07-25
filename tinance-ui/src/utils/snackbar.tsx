import IconButton from '@material-ui/core/IconButton';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { OptionsObject, useSnackbar, WithSnackbarProps } from 'notistack';

let snackbarRef: WithSnackbarProps;

export const SnackbarUtilsConfigurator: React.FC = () => {
  snackbarRef = useSnackbar();
  return null;
};

const handleClose = () => {
  snackbarRef.closeSnackbar();
};

export const snackbar = {
  success(msg: string, options: OptionsObject = {}): void {
    this.toast(msg, { ...options, variant: 'success' });
  },
  warning(msg: string, options: OptionsObject = {}): void {
    this.toast(msg, {
      ...options,
      variant: 'warning',
      persist: true,
      action: (
        <IconButton size="small" aria-label="Close Snackbar" color="inherit" onClick={handleClose}>
          <CloseOutlinedIcon fontSize="small" />
        </IconButton>
      ),
    });
  },
  info(msg: string, options: OptionsObject = {}): void {
    this.toast(msg, { ...options, variant: 'info', persist: true });
  },
  error(msg: string, options: OptionsObject = {}): void {
    this.toast(msg, { ...options, variant: 'error', persist: true });
  },
  toast(msg: string, options: OptionsObject = {}): void {
    snackbarRef.enqueueSnackbar(msg, options);
  },
};
