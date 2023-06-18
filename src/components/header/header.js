import { useState } from "react";
import css from "./header.module.scss";
import { Button } from "../shared/buttons/button/button";
import { ButtonModalClose } from "../shared/buttons/button/ButtonModalClose";
import { Form } from "../form/Form";
import { FormRegistration } from "../form/FormRegistration";
import { ListOfThefts } from "../lists/ListOfThefts";
import { ListOfEmloyees } from "../lists/ListOfEmployees";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authorization/loginSlice";

export const Header = () => {
  const [openEnt, setOpenEnter] = useState(false);
  const dispatch = useDispatch();
  const handleCloseEnter = () => {
    setOpenEnter(false);
  };
  const handleClickEnter = () => {
    setOpenEnter(true);
  };

  const handleLogout = () => {
    dispatch(logout());
  }

  const [openReg, setOpenReg] = useState(false);
  const handleCloseReg = () => {
    setOpenReg(false);
  };
  const handleClick = () => {
    setOpenReg(true);
  };

  const [openTheftsList, setOpenTheftsList] = useState(false);
  const handleCloseTheftsList = () => {
    setOpenTheftsList(false);
  };

  const [openEmployeesList, setOpenEmployeesList] = useState(false);
  const handleCloseEmployeesList = () => {
    setOpenEmployeesList(false);
  };

  const autontificated = useSelector((state) =>
    state.auth.token ? true : false
  );

  return (
    <header className={css.header}>
      <h1>
        Сообщи о краже, спаси велосипеды! Yeti watch - глаза и уши наших
        городов.
      </h1>
      <nav className={css.nav}>
        <Button
          hide={!autontificated}
          className={css.button}
          onClick={() => setOpenTheftsList(true)}
        >
          Список краж
        </Button>

        <Button
          hide={!autontificated}
          className={css.button}
          onClick={() => setOpenEmployeesList(true)}
        >
          Список сотрудников
        </Button>

        <Button
          hide={autontificated}
          className={css.button}
          onClick={handleClickEnter}
        >
          Войти
        </Button>

        <Button
          hide={autontificated}
          className={css.button}
          onClick={handleClick}
        >
          Зарегистрироваться
        </Button>

        <Button
          hide={!autontificated}
          className={css.button}
          onClick={() => handleLogout()}
        >
          Выйти
        </Button>
      </nav>

      {/* <Modal
        className={css.modal}
        open={openEnt}
        onClose={handleCloseEnter}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={css.form_wrapper}>
          <ButtonModalClose onClick={() => setOpenEnter(false)} />
          <Form />
        </div>
      </Modal> */}

      <Form open={openEnt} handleCloseEnter={handleCloseEnter} />

      <FormRegistration open={openReg} handleCloseReg={handleCloseReg} />

      <Modal
        className={css.modal}
        open={openTheftsList}
        onClose={handleCloseTheftsList}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={`${css.wrapper_list} ${css.form_wrapper} `}>
          <ButtonModalClose onClick={() => setOpenTheftsList(false)} />
          <ListOfThefts />
        </div>
      </Modal>

      <Modal
        className={css.modal}
        open={openEmployeesList}
        onClose={handleCloseEmployeesList}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={`${css.wrapper_list} ${css.form_wrapper} `}>
          <ButtonModalClose onClick={() => setOpenEmployeesList(false)} />
          <ListOfEmloyees />
        </div>
      </Modal>
    </header>
  );
};