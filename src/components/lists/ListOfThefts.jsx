import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Modal,
} from "@mui/material";

import { ButtonModalClose } from "../shared/buttons/button/ButtonModalClose";
import css from "./ListOfEmployees.module.scss";
import { Button } from "../shared/buttons/button/button";
import { AddReport } from "../TheftReport/TheftReport";
import { useDispatch, useSelector } from "react-redux";
import { deleteReport, getReports } from "../../store/theftReport/reportSlice";

export const ListOfThefts = () => {

  const data = useSelector((state) => state.reports.data);
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteReport(id, token));
  };

  useEffect(() => {
    dispatch(getReports(token)); // Выполняем запрос к серверу при монтировании компонента
  }, [dispatch, token]);

  if (!data) {
    return <div>Loading...</div>; // Отображаем индикатор загрузки, пока данные загружаются
  }



  return (
    <>
      <TableContainer
        component={Paper}
        style={{ maxHeight: "300px", overflow: "auto", marginBottom: "10px" }}
      >
        <Table className={css.table}>
          <TableHead>
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
              <TableRow key={item._id} className={css.row}>
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
                    onClick={() => handleDelete(item._id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
