import { Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { getUserData } from "../../store/authorization/authorizationSlice";

export const Form = () => {
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
      <Button onClick={()=> {
        dispatch(getUserData()); 
      }}>Submit</Button>
    </>
  );
};
