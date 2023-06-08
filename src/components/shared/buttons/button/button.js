import css from "./button.module.scss";

export const Button = (props) => {
  return (
    <div
      className={`${props.className} ${css.button}`}
      onClick={props.onClick}
      style={{ display: `${props.hide ? "none" : "block"}` }}
    >
      {props.children}
    </div>
  );
};
