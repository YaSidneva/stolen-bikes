import { Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { getUserData } from "../../store/authorization/authorizationSlice";

export const FormRegistration = () => {
    const dispatch = useDispatch();
  return (
    <>
      <TextField
        required
        id="outlined-required"
        label="E-mail"
      />
      <TextField
        required
        id="outlined-required"
        label="Password"
      />
      <TextField
        required
        id="outlined-required"
        label="Client ID"
      />
      <TextField
        id="outlined-required"
        label="Имя"
      />
      <TextField
        id="outlined-required"
        label="Фамилия"
      />
      <Button onClick={()=> {
        dispatch(getUserData()); 
      }}>Зарегистрироваться</Button>
    </>
  );
};
