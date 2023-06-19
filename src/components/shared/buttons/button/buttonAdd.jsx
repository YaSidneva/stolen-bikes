import css from "./ButtonAdd.module.scss";

export const ButtonAdd = (props) => {
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
