import { Button, TextField, InputLabel, Select, MenuItem } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getUserData } from "../../store/authorization/authorizationSlice";
import css from "./TheftReport.module.scss";
import { createReport } from "../../store/theftReport/reportSlice";
import { Form } from "../form/Form";

export const AddReport = () => {
  const dispatch = useDispatch();

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
  const token = useSelector((state) => state.auth.token)

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
      description
    };
    if (autontificated) {
      dispatch(createReport(reportData, token))
    }
  }
  

  return (
    <form onSubmit={handleSubmit}> 
      <TextField required id="licenseNumber" label="Номер лицензии" onChange={handleLicenseChange} />
      <TextField required id="ownerFullName" label="ФИО клиента" onChange={handleOwnerChange}/>

      <InputLabel id="officer">Ответственный сотрудник</InputLabel>
      <Select
        className={!autontificated ? css.hide : css.show}
        labelId="officer"
        onChange={handleOfficerChange}
      >
        <MenuItem value={""}>-- Выберите сотрудника --</MenuItem>
        {data?.officers
          ?.filter((item) => item.approved)
          .map((item) => (
            <MenuItem value={item._id}>
              {item.firstName} {item.lastName}
            </MenuItem>
          ))}
      </Select>

      <InputLabel id="type">Тип велосипеда *</InputLabel>
      <Select
        required
        labelId="type"
        id="bike-type-select"
        value={type}
        onChange={handleOptionChange}
      >
        <MenuItem value={""}>-- Укажите тип велосипеда --</MenuItem>
        <MenuItem value={"general"}>Дорожный (городской) велосипед</MenuItem>
        <MenuItem value={"sport"}>Спортивный велосипед</MenuItem>
      </Select>

      <TextField id="color" label="Цвет велосипеда" onChange={handleColorChange}/>

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

      <Button
        type="submit"
      >
        Отправить
      </Button>
    </form>
  );
};
