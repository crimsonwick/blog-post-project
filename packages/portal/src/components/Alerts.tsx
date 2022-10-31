import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import {
  ProviderContext,
  SnackbarKey,
  useSnackbar,
  VariantType,
} from 'notistack';
import React from 'react';

let useSnackbarRef: ProviderContext;

/**
 * Snackbar configuration
 * @returns
 */
export const SnackbarUtilsConfiguration = (): null => {
  useSnackbarRef = useSnackbar();
  return null;
};

type CloseButtonInterface = {
  id?: SnackbarKey | undefined;
};
/**
 * Close Buttton
 * @param param0
 * @returns
 */
export const CloseButton = ({ id }: CloseButtonInterface) => {
  const { closeSnackbar } = useSnackbar();
  return (
    <IconButton color="inherit" size="small" onClick={() => closeSnackbar(id)}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );
};
export const Alerts = {
  success(message: string): void {
    this.toast(message, 'success');
  },
  warning(message: string): void {
    this.toast(message, 'warning');
  },
  info(message: string): void {
    this.toast(message, 'info');
  },
  error(message: string): void {
    this.toast(message, 'error');
  },
  toast(message: string, variant: VariantType): void {
    useSnackbarRef.enqueueSnackbar(message, { variant });
  },
};
