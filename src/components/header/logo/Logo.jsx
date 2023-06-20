import { useNavigate } from "react-router-dom";
import css from "./Logo.module.scss";
export const Logo = () => {
  const navigate = useNavigate();
  return (
    <img
    src='./favicon.svg'
      alt="logo"
      className={css.logo}
      onClick={() => navigate("/")}
    />
  );
};
