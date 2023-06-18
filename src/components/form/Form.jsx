import React, { useState } from "react";
import { Button, TextField, Modal } from "@mui/material";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/authorization/loginSlice";
import { ButtonModalClose } from "../shared/buttons/button/ButtonModalClose";
import css from "../header/header.module.scss";

export const Form = (props) => {
  const handleCloseEnter = props.handleCloseEnter;

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(loginUser(userData));
    setEmail("");
    setPassword("");
    props.handleCloseEnter();
  };
  return (
    <Modal
      className={css.modal}
      open={props.open}
      onClose={props.handleCloseEnter}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form className={css.form_wrapper} onSubmit={handleSubmit}>
        <ButtonModalClose onClick={handleCloseEnter} />
        <TextField
          required
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          label="E-mail"
        />
        <TextField
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
          label="Password"
        />
        <Button type="submit">Войти</Button>
      </form>
    </Modal>
  );
};
