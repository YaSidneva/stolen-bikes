import { useState } from "react";
import css from "./header.module.scss";
import { Button } from "../shared/buttons/button/button";
import { Form } from "../form/Form";
import { Modal } from "@mui/material";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <header className={css.header}>
      <h1>
        Сообщи о краже, спаси велосипеды! Yeti watch - глаза и уши наших
        городов.
      </h1>
      <nav className={css.nav}>
        <Button className={css.button} onClick={() => setOpen(true)}>
          Войти
        </Button>
        <Button className={css.button}>Зарегистрироваться</Button>
      </nav>

      <Modal
        className={css.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={css.form_wrapper}>
          <Form />
        </div>
      </Modal>
    </header>
  );
};
