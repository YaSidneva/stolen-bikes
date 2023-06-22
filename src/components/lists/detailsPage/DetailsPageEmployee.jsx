import React, { useState } from "react";
import { Checkbox, Button, Modal, TextField, styled } from "@mui/material";
import { ButtonModalClose } from "../../shared/buttons/button/ButtonModalClose";
import css from "/SkillFactory/yeti-react/yeti-react-app/src/components/lists/detailsPage/DetailsPageEmployee.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateEmployee } from "../../../store/employees/employeesSlice";

export const DetailsPageEmployee = (props) => {
  const handleModalClose = props.onClose;
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [formData, setFormData] = useState({});

  const rowData = props.rowData;

  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    dispatch(updateEmployee(rowData._id, formData, token));
    setFormData({})
    handleModalClose();
  };
  const handleFirstNameChange = (e) => {
    setFormData({ ...formData, firstName: e.target.value });
  };
  const handleLastNameChange = (e) => {
    setFormData({ ...formData, lastName: e.target.value });
  };
  const handlePasswordChange = (e) => {
    setFormData({ ...formData, password: e.target.value });
  };
  const handleApproveChange = (e) => {
    setFormData({ ...formData, approved: e.target.checked });
  };

  return (
    <Modal open={props.open} onClose={handleModalClose} className={css.modal}>
      <form
        className={`${css.wrapper_list} ${css.form_wrapper} `}
        onSubmit={handleSubmit}
      >
        <ButtonModalClose onClick={handleModalClose} />
        {rowData && (
          <div className={css.details_employee}>
            <TextField
              className={css.read_only}
              id="clientId"
              label="Client Id"
              defaultValue={rowData.clientId}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              className={css.read_only}
              id="email"
              label="E-mail"
              defaultValue={rowData.email}
              InputProps={{
                readOnly: true,
              }}
            />

            <TextField
              id="password"
              label="Password"
              defaultValue={'******'}
              onChange={handlePasswordChange}
            />

            <TextField
              id="firstName"
              label="First name"
              defaultValue={rowData.firstName}
              onChange={handleFirstNameChange}
            />

            <TextField
              required
              id="lastName"
              label="Last name"
              defaultValue={rowData.lastName}
              onChange={handleLastNameChange}
            />
            <p>
              {" "}
              Approved:
              <Checkbox
                defaultChecked={rowData.approved ? true : false}
                placeholder="123"
                onChange={handleApproveChange}
              />
            </p>
          </div>
        )}
        <Button className={css.button} type="submit">
          Сохранить
        </Button>
      </form>
    </Modal>
  );
};
