import React from "react";
import { useSnackbar, } from "notistack";
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

let useSnackbarRef;
export const SnackbarUtilsConfiguration = () => {
	useSnackbarRef = useSnackbar();
	return null;
};
export const CloseButton = ({ id }) => {
	const { closeSnackbar } = useSnackbar();
	return (
		<IconButton
			color="inherit"
			size="small"
			onClick={() => closeSnackbar(id)}
		>
			<CloseIcon fontSize="small" />
		</IconButton>
	);
};
export const Alerts = {
	success(message) {
		this.toast(message, "success");
	},
	warning(message) {
		this.toast(message, "warning");
	},
	info(message) {
		this.toast(message, "info");
	},
	error(message) {
		this.toast(message, "error");
	},
	toast(message, variant) {
		useSnackbarRef.enqueueSnackbar(message, { variant });
	},
};