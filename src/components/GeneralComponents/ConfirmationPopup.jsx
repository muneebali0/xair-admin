import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function ConfirmationPopup({
  openDelete,
  handleAgree,
  setOpenDelete,
  title,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClose = () => {
    setOpenDelete(false);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={openDelete}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      className="mui-confirmation-popup"
    >
      <div>
        <DialogContent>
          <DialogContentText>{title}</DialogContentText>
        </DialogContent>
        <DialogActions className="text-uppercase">
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAgree} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}
