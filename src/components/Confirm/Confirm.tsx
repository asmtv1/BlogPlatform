import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import "./Confirm.scss";
import { deleteArticle } from "../api/Api";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Alert } from "@mui/material";
import { Slug } from "../intefface";

const AlertDialog: React.FC<Slug> = ({ slug }) => {
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      await deleteArticle(slug);
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "ArticleList",
      });
      navigate(`/`);
    } catch (error: any) {
      error.status === 422 || 401
        ? setErrorMessage("Что-то не так в статье")
        : setErrorMessage("Чт-то пошло не так");
    }
  };
  return (
    <>
      {errorMessage && (
        <Alert
          onClose={() => {
            setErrorMessage("");
          }}
          severity="error"
        >
          {errorMessage}
        </Alert>
      )}
      <React.Fragment>
        <button className="delete" onClick={handleClickOpen}>
          Delete
        </button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Вы точно хотите удалить эту статью?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Не удалять</Button>
            <Button onClick={handleDelete}>Удалить</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
};
export default AlertDialog;
