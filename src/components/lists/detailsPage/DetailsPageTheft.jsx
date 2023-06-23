import {
  Button,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { ButtonModalClose } from "../../shared/buttons/button/ButtonModalClose";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch, useSelector } from "react-redux";
import css from "/SkillFactory/yeti-react/yeti-react-app/src/components/TheftReport/TheftReport.module.scss";
import { useState } from "react";
import { updateReport } from "../../../store/theftReport/reportSlice";

export const DetailsPageThefts = (props) => {
  console.log(props);
  const data = useSelector((state) => state.employees.data);
  const handleModalClose = props.onClose;
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const [formData, setFormData] = useState({});

  const rowData = props.rowData;

  const [licenseNumber, setSelectedLicense] = useState(null);
  const handleLicenseChange = (event) => {
    setSelectedLicense(event.target.value);
    setFormData({ ...formData, licenseNumber: event.target.value });
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

  const [description, setSelectedDescription] = useState(null);
  const handleDescriptionChange = (event) => {
    setSelectedDescription(event.target.value);
  };

  const [status, setSelectedStatus] = useState(null);
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const [resolution, setSelectedResolution] = useState(null);
  const handleResolutionChange = (event) => {
    setSelectedResolution(event.target.value);
  };

  const [createDate, setSelectedCreateDate] = useState(null);
  const handleCreateDateChange = (event) => {
    setSelectedCreateDate(event.target.value);
  };

  const [updateDate, setSelectedUpdateDate] = useState(null);
  const handleUpdateDateChange = (event) => {
    setSelectedUpdateDate(event.target.value);
  };

  const [clientId, setSelectedClientId] = useState(null);

  const handleSubmit = (event) => {
    dispatch(updateReport(rowData._id, formData, token));
    setFormData({});
    handleModalClose();
    event.preventDefault();
    console.log(event);
    const reportData = {
      clientId: "a1165252-8bf2-4f9d-9200-203074b63881",
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
    handleModalClose();
  };

  return (
    <Modal
      className={css.modal}
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={css.wrapper} style={{ height: "98%" }}>
        <ButtonModalClose onClick={handleModalClose} />
        <form onSubmit={handleSubmit} className={css.form_wrapper}>
          {rowData && (
            <div className={css.form_content}>
              <TextField
                defaultValue={rowData.createdAt}
                className={css.read_only}
                id="createdAt"
                label="Дата создания"
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                defaultValue={rowData.updatedAt}
                className={css.read_only}
                id="updatedAt"
                label="Дата обновления"
                InputProps={{
                  readOnly: true,
                }}
              />

              <TextField
                defaultValue={rowData.clientId}
                className={css.read_only}
                id="clientId"
                label="Client Id"
                InputProps={{
                  readOnly: true,
                }}
              />

              <TextField
                required
                defaultValue={rowData.licenseNumber}
                id="licenseNumber"
                label="Номер лицензии"
                onChange={handleLicenseChange}
              />

              <TextField
                required
                defaultValue={rowData.ownerFullName}
                id="ownerFullName"
                label="ФИО клиента"
                onChange={handleOwnerChange}
              />

              <InputLabel id="officer">Ответственный сотрудник</InputLabel>
              <Select
                defaultValue={rowData.officer}
                defaultOpen
                labelId="officer"
                onChange={handleOfficerChange}
              >
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
                required
                labelId="type"
                id="bike-type-select"
                value={type}
                onChange={handleOptionChange}
              >
                <MenuItem value={""} key={""}>
                  -- Укажите тип велосипеда --
                </MenuItem>
                <MenuItem value={"general"} key={"general"}>
                  Дорожный (городской) велосипед
                </MenuItem>
                <MenuItem value={"sport"} key={"sport"}>
                  Спортивный велосипед
                </MenuItem>
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

              <TextField
                className={css.read_only}
                id="clientId"
                label="Client Id"
                InputProps={{
                  readOnly: true,
                }}
              />

              <InputLabel id="status">Статус сообщения</InputLabel>
              <Select
                defaultValue={rowData.status}
                defaultChecked
                labelId="status"
                displayEmpty
                onChange={handleStatusChange}
              >
                <MenuItem value={""} key={""}>
                  -- Укажите статус сообщения --
                </MenuItem>
                <MenuItem value={"new"} key={"new"}>
                  Новый
                </MenuItem>
                <MenuItem value={"in_progress"} key={"in_progress"}>
                  В работе
                </MenuItem>
                <MenuItem value={"done"} key={"done"}>
                  Завершен
                </MenuItem>
              </Select>

              <TextField
                id="resulotion"
                label="Завершающий комментарий"
                multiline
                rows={4}
                onChange={handleResolutionChange}
              />

              <Button type="submit">Отправить</Button>
            </div>
          )}
        </form>
      </div>
    </Modal>
  );
};
