import { useState } from "react";
import css from "./header.module.scss";
import { Button } from "../shared/buttons/button/button";
import { Form } from "../form/Form";
import { FormRegistration } from "../form/FormRegistration";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authorization/loginSlice";
import { useNavigate } from "react-router-dom";
import { Logo } from "./logo/Logo";

export const Header = () => {
  const navigate = useNavigate();

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
    navigate("/")
  };

  const [openReg, setOpenReg] = useState(false);
  const handleCloseReg = () => {
    setOpenReg(false);
  };
  const handleClick = () => {
    setOpenReg(true);
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
      <nav className={!autontificated ? css.nav : css.nav_auth}>
        <Logo/>
        <Button
          hide={!autontificated}
          className={css.button}
          onClick={() => navigate("/thefts")}
        >
          Список краж
        </Button>

        <Button
          hide={!autontificated}
          className={css.button}
          onClick={() => navigate("/employees")}
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

      <Form open={openEnt} handleCloseEnter={handleCloseEnter} />

      <FormRegistration open={openReg} handleCloseReg={handleCloseReg} />
    </header>
  );
};
