import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Done from '@material-ui/icons/Done';
import FileCopy from '@material-ui/icons/FileCopy';
import clsx from 'clsx';
import React, { useCallback, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';

import { snackbar } from '../utils';

const useStyles = makeStyles((theme) => {
  return {
    icon: {
      fontSize: 14,
      marginLeft: theme.spacing(0.5),
    },
  };
});

type Color = 'default' | 'inherit' | 'primary' | 'secondary';
type Size = 'small' | 'medium';

const defaultProps = {
  color: 'primary' as Color,
  size: 'small' as Size,
};

export interface CopyIconButtonProps {
  text: string;
  color?: Color;
  size?: Size;
  className?: string;
}

type DefaultProps = typeof defaultProps;
type PropsWithDefault = CopyIconButtonProps & DefaultProps;

export const CopyIconButton: React.FC<CopyIconButtonProps> = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { text, color, size, className } = props as PropsWithDefault;
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    if (copied) {
      return;
    }

    setCopied(true);
    snackbar.success(t('Copied to clipboard!'));

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  }, [copied, t]);

  if (!text) {
    return null;
  }

  return (
    <>
      <CopyToClipboard text={text} onCopy={handleCopy}>
        <IconButton color={color} size={size} className={clsx(classes.icon, className)}>
          {copied ? (
            <Done color="inherit" fontSize="inherit" />
          ) : (
            <FileCopy color="disabled" fontSize="inherit" />
          )}
        </IconButton>
      </CopyToClipboard>
    </>
  );
};

CopyIconButton.defaultProps = defaultProps;
