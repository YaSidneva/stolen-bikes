import { Button, TextField, InputLabel, Select, MenuItem, Modal } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import css from "./TheftReport.module.scss";
import {
  createReport,
  createReportPublic,
} from "../../store/theftReport/reportSlice";
import { ButtonModalClose } from "../shared/buttons/button/ButtonModalClose";

export const AddReport = (props) => {
  const dispatch = useDispatch();
  const handleClose = props.handleClose;

  const [licenseNumber, setSelectedLicense] = useState(null);
  const handleLicenseChange = (event) => {
    setSelectedLicense(event.target.value);
  };

  const [ownerFullName, setSelectedOwner] = useState(null);
  const handleOwnerChange = (event) => {
    setSelectedOwner(event.target.value);
  };

  const [officer, setSelectedOfficer] = useState(null);
  const handleOfficerChange = (event) => {
    setSelectedOfficer(event.target.value);
  };

  const [date, setSelectedDate] = useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [type, setSelectedOption] = useState("");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [color, setSelectedColor] = useState(null);
  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const [description, setSelectedCDescription] = useState(null);
  const handleDescriptionChange = (event) => {
    setSelectedCDescription(event.target.value);
  };

  const autontificated = useSelector((state) =>
    state.auth.token ? true : false
  );
  const token = useSelector((state) => state.auth.token);

  const data = useSelector((state) => state.employees.data);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    const reportData = {
      licenseNumber,
      ownerFullName,
      officer,
      type,
      color,
      date,
      description,
    };

    const reportDataPublic = {
      licenseNumber,
      ownerFullName,
      type,
      color,
      date,
      description,
      clientId: "a1165252-8bf2-4f9d-9200-203074b63881",
    };
    if (autontificated) {
      dispatch(createReport(reportData, token));
    } else {
      dispatch(createReportPublic(reportDataPublic));
    }

    handleClose();
  };

  return (
    <Modal
      className={css.modal}
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={css.wrapper}>
        <ButtonModalClose onClick={props.handleClose} />
        <form onSubmit={handleSubmit} className={css.form_wrapper}>
          <TextField
            required
            id="licenseNumber"
            label="Номер лицензии"
            onChange={handleLicenseChange}
          />
          <TextField
            required
            id="ownerFullName"
            label="ФИО клиента"
            onChange={handleOwnerChange}
          />

          <InputLabel
            id="officer"
            className={!autontificated ? css.hide : css.show}
          >
            Ответственный сотрудник
          </InputLabel>
          <Select
            className={!autontificated ? css.hide : css.show}
            labelId="officer"
            defaultValue={" "}
            onChange={handleOfficerChange}
          >
            <MenuItem value={" "} key={""}>-- Выберите сотрудника --</MenuItem>
            {data?.officers
              ?.filter((item) => item.approved)
              .map((item) => (
                <MenuItem value={item._id} key={item._id}>
                  {item.firstName} {item.lastName}
                </MenuItem>
              ))}
          </Select>

          <InputLabel id="type">Тип велосипеда *</InputLabel>
          <Select
            labelId="type"
            id="bike-type-select"
            onChange={handleOptionChange}
            required 
            inputProps={{
              required: true,}}
          >
            <MenuItem value={"general"} key={"general"}>
              Дорожный (городской) велосипед
            </MenuItem>
            <MenuItem value={"sport"} key={'sport'}>Спортивный велосипед</MenuItem>
          </Select>

          <TextField
            id="color"
            label="Цвет велосипеда"
            onChange={handleColorChange}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              id="date"
              label="Выберите дату"
              value={date}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <TextField
            id="description"
            label="Дополнительная информация"
            multiline
            rows={4}
            onChange={handleDescriptionChange}
          />

          <Button type="submit">Отправить</Button>
        </form>
      </div>
    </Modal>
  );
};
