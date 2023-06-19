import React, { useState } from 'react';
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
import css from './ListOfEmployees.module.scss'

export const ListOfThefts = () => {
  const [data, setData] = useState([
    { id: 1, licenseNumber: "John", ownerFullName: 25, type: '123', color: 'black', date: '456', description: 'balbla', officer:'II' },
    { id: 2, licenseNumber: "John", ownerFullName: 25, type: '123', color: 'black', date: '456', description: 'balbla', officer:'II' },
    { id: 3, licenseNumber: "John", ownerFullName: 25, type: '123', color: 'black', date: '456', description: 'balbla', officer:'II' }
]);

const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  return (
    <TableContainer component={Paper}>
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
          {data.map((item) => (
            <TableRow key={item.id}  className={css.row}>
              <TableCell>{item.licenseNumber}</TableCell>
              <TableCell>{item.ownerFullName}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.color}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.officer}</TableCell>
              <TableCell><ButtonModalClose  variant="contained" color="secondary" onClick={() => handleDelete(item.id)}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
};
