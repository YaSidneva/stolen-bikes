import { useState } from "react";
import css from "./header.module.scss";
import { Button } from "../shared/buttons/button/button";
import { ButtonModalClose } from "../shared/buttons/button/ButtonModalClose";
import { Form } from "../form/Form";
import { FormRegistration } from "../form/FormRegistration";
import { Modal } from "@mui/material";

export const Header = () => {
  const [openEnt, setOpenEnter] = useState(false);
  const handleCloseEnter = () => {
    setOpenEnter(false);
  };

  const [openReg, setOpenReg] = useState(false);
  const handleCloseReg = () => {
    setOpenReg(false);
  };
  return (
    <header className={css.header}>
      <h1>
        Сообщи о краже, спаси велосипеды! Yeti watch - глаза и уши наших
        городов.
      </h1>
      <nav className={css.nav}>
        <Button className={css.button} onClick={() => setOpenEnter(true)}>
          Войти
        </Button>
        <Button className={css.button} onClick={() => setOpenReg(true)}>
          Зарегистрироваться
        </Button>
      </nav>

      <Modal
        className={css.modal}
        open={openEnt}
        onClose={handleCloseEnter}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={css.form_wrapper}>
          <ButtonModalClose onClick={() => handleCloseEnter} />
          <Form />
        </div>
      </Modal>

      <Modal
        className={css.modal}
        open={openReg}
        onClose={handleCloseReg}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={css.form_wrapper} style={{height: "80%"}}>
        <ButtonModalClose onClick={() => handleCloseReg} />
          <FormRegistration />
        </div>
      </Modal>
    </header>
  );
};
