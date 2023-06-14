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

  
  export const ListOfEmloyees = () => {
    const [data, setData] = useState([
      { id: 1, email: 1, firstName: "John", lastName: 25, approved: 'true' },
      { id: 2, email: 1, firstName: "John", lastName: 25, approved: 'true' },
      { id: 3, email: 1, firstName: "John", lastName: 25, approved: 'false' }
    ]);

    const handleDelete = (id) => {
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
      };
  
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>E-mail</TableCell>
              <TableCell>Имя</TableCell>
              <TableCell>Фамилия</TableCell>
              <TableCell>Доступ</TableCell>
              <TableCell>Удалить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.firstName}</TableCell>
                <TableCell>{item.lastName}</TableCell>
                <TableCell>{item.approved}</TableCell>
                <TableCell><ButtonModalClose  variant="contained" color="secondary" onClick={() => handleDelete(item.id)} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  };