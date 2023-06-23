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
import dayjs from "dayjs";

export const DetailsPageThefts = (props) => {
  console.log(props);
  const data = useSelector((state) => state.employees.data);
  const handleModalClose = props.onClose;
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const [formData, setFormData] = useState({});

  const rowData = props.rowData;

  const [licenseNumber, setSelectedLicense] = useState(rowData?.licenseNumber);
  const handleLicenseChange = (event) => {
    setSelectedLicense(event.target.value);
    setFormData({ ...formData, licenseNumber: event.target.value });
  };

  const [ownerFullName, setSelectedOwner] = useState(rowData?.ownerFullName);
  const handleOwnerChange = (event) => {
    setSelectedOwner(event.target.value);
  };

  const [officer, setSelectedOfficer] = useState(rowData?.officer);
  const handleOfficerChange = (event) => {
    setSelectedOfficer(event.target.value);
  };

  const [date, setSelectedDate] = useState(rowData?.date);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [type, setSelectedOption] = useState(rowData?.type);
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [color, setSelectedColor] = useState(rowData?.color);
  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const [description, setSelectedDescription] = useState(rowData?.description);
  const handleDescriptionChange = (event) => {
    setSelectedDescription(event.target.value);
  };

  const [status, setSelectedStatus] = useState(rowData?.status);
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const [resolution, setSelectedResolution] = useState(rowData?.resolution);
  const handleResolutionChange = (event) => {
    setSelectedResolution(event.target.value);
  };

  const handleSubmit = (event) => {
    
    setFormData({});
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
      status,
      resolution
    };
    dispatch(updateReport(rowData._id, reportData, token));
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
                defaultValue={rowData.type}
                labelId="type"
                id="bike-type-select"
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
              defaultValue={rowData.color}
                id="color"
                label="Цвет велосипеда"
                onChange={handleColorChange}
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                defaultValue={dayjs(new Date(rowData.date))}
                  id="date"
                  label="Выберите дату"
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>

              <TextField
              defaultValue={rowData.description}
                id="description"
                label="Дополнительная информация"
                multiline
                rows={4}
                onChange={handleDescriptionChange}
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
              defaultValue={rowData.resulotion}
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
