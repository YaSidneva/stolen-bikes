import { Button, TextField, Modal } from "@mui/material";
import { useDispatch } from "react-redux";
import css from "../header/header.module.scss";
//import { getUserData } from "../../store/authorization/authorizationSlice";
import React, { useState } from "react";
import { registerUser } from "../../store/registration/userSlice";
import { ButtonModalClose } from "../shared/buttons/button/ButtonModalClose";
//import userSlice from "../../store/registration/userSlice";

export const FormRegistration = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clientId, setClientId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // const [openReg, setOpenReg] = useState(props.open);
  const handleCloseReg = props.handleCloseReg;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleClientIdChange = (e) => {
    setClientId(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
      clientId,
      firstName,
      lastName,
    };
    dispatch(registerUser(userData));
    setEmail("");
    setPassword("");
    setClientId("");
    setFirstName("");
    setLastName("");
  };

  return (
    <Modal
      // onSubmit={handleSubmit}
      className={css.modal}
      open={props.open}
      onClose={props.handleCloseReg}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form
        onSubmit={handleSubmit}
        className={css.form_wrapper}
        style={{ height: "80%" }}
      >
        <ButtonModalClose onClick={handleCloseReg} />
        <TextField
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
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
        <TextField
          type="text"
          id="clientId"
          value={clientId}
          onChange={handleClientIdChange}
          required
          label="Client ID"
        />
        <TextField
          type="text"
          id="firstName"
          value={firstName}
          onChange={handleFirstNameChange}
          label="Имя"
        />
        <TextField
          type="text"
          id="lastName"
          value={lastName}
          onChange={handleLastNameChange}
          label="Фамилия"
        />
        <Button type="submit">Зарегистрироваться</Button>
      </form>
    </Modal>
  );
};
