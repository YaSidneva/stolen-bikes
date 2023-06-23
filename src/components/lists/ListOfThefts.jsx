import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from "@mui/material";

import { ButtonModalClose } from "../shared/buttons/button/ButtonModalClose";
import css from "./ListOfEmployees.module.scss";
import { Button } from "../shared/buttons/button/button";
import { AddReport } from "../TheftReport/TheftReport";
import { useDispatch, useSelector } from "react-redux";
import { deleteReport, getReports } from "../../store/theftReport/reportSlice";
import { DetailsPageThefts } from "./detailsPage/DetailsPageTheft";

export const ListOfThefts = () => {
  const data = useSelector((state) => state.reports.data);
  const token = useSelector((state) => state.auth.token);
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [isOpenAddReport, setIsOpenAddReport] = useState(false);
  const handleOpenAddReport = () => {
    setIsOpenAddReport(true);
  };
  const handleCloseAddReport = () => {
    setIsOpenAddReport(false);
  };

  const dispatch = useDispatch();
  const handleDelete = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(deleteReport(id, token));
  };

  useEffect(() => {
    dispatch(getReports(token));
  }, [dispatch, token]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const handleRowClick = (rowData) => {
    console.log(rowData);
    setSelectedRow(rowData);
    setModalOpen(true);
  };

  return (
    <>
      <TableContainer
        component={Paper}
        style={{ maxHeight: "300px", overflow: "auto", marginBottom: "10px" }}
      >
        <Table className={css.table}>
          <TableHead className={css.table_head}>
            <TableRow>
              <TableCell>Номер лицензии</TableCell>
              <TableCell>ФИО клиента</TableCell>
              <TableCell>Тип велосипеда</TableCell>
              <TableCell>Цвет велосипеда</TableCell>
              <TableCell>Дата кражи</TableCell>
              <TableCell>Дополнительная информация</TableCell>
              <TableCell>ID сотрудника</TableCell>
              <TableCell>Удалить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data?.map((item) => (
              <TableRow
                key={item._id}
                className={css.row}
                onClick={() => handleRowClick(item)}
              >
                <TableCell>{item.licenseNumber}</TableCell>
                <TableCell>{item.ownerFullName}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.color}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.officer}</TableCell>
                <TableCell>
                  <ButtonModalClose
                    variant="contained"
                    color="secondary"
                    onClick={(e) => handleDelete(e, item._id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button className={css.button} onClick={handleOpenAddReport}>
        Сообщить о краже
      </Button>

      <AddReport open={isOpenAddReport} handleClose={handleCloseAddReport} />

      <DetailsPageThefts
        open={modalOpen}
        rowData={selectedRow}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};
