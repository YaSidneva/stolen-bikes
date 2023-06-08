import { Button, TextField, InputLabel, Select, MenuItem } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getUserData } from "../../store/authorization/authorizationSlice";

export const AddReport = () => {
  const [age, setReport] = useState(false);
  const handleChange = () => {
    setReport(false);
  };

  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const dispatch = useDispatch();
  return (
    <>
      <TextField required id="licenseNumber" label="Номер лицензии" />
      <TextField required id="ownerFullName" label="ФИО клиента" />
      <InputLabel id="type">Тип велосипеда *</InputLabel>
      <Select
        required
        labelId="type"
        id="bike-type-select"
        value={selectedOption}
        onChange={handleOptionChange}
      >
        <MenuItem value={""}>-- Укажите тип велосипеда --</MenuItem>
        <MenuItem value={"city-bike"}>Дорожный (городской) велосипед</MenuItem>
        <MenuItem value={"road-bike"}>Шоссейный велосипед</MenuItem>
        <MenuItem value={"mountain-bike"}>Горный велосипед</MenuItem>
        <MenuItem value={"cyclocross-bike"}>Циклокроссовый велосипед</MenuItem>
        <MenuItem value={"electric-bike"}>Электровелосипед</MenuItem>
      </Select>

      <TextField id="color" label="Цвет велосипеда" />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
            id="date"
          label="Выберите дату"
          value={selectedDate}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      <TextField
        id="description"
        label="Дополнительная информация"
        multiline
        rows={4}
      />

      <Button
        onClick={() => {
          dispatch(getUserData());
        }}
      >
        Отправить
      </Button>
    </>
  );
};
