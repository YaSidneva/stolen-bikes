import { Button, TextField, Modal, Checkbox, FormControlLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import css from "../header/header.module.scss";
import React, { useState } from "react";
import { ButtonModalClose } from "../shared/buttons/button/ButtonModalClose";
import { createEmployee } from "../../store/employees/employeesSlice";
//import userSlice from "../../store/registration/userSlice";

export const FormAddNewOfficer = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(props.email || "");
  const [password, setPassword] = useState(props.password || "");
  const [firstName, setFirstName] = useState(props.firstName || "");
  const [lastName, setLastName] = useState(props.lastName || "");
  const token = useSelector((state) => state.auth.token);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
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
      firstName,
      lastName,
    };
    dispatch(createEmployee(userData, token));
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    props.onClose();
  };

  return (
    <Modal
      className={css.modal}
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form
        onSubmit={handleSubmit}
        className={css.form_wrapper}
        style={{ height: "80%" }}
      >
        <ButtonModalClose onClick={props.onClose} />
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

    <FormControlLabel control={<Checkbox />} label="Approved" style={{color: 'rgba(0, 0, 0, 0.87)'}}/>    
        <Button type="submit">Добавить</Button>
      </form>
    </Modal>
  );
};
