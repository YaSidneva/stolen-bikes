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
import css from './ListOfThefts.module.scss'

export const ListOfThefts = () => {
  const data = [
    { id: 1, licenseNumber: "John", ownerFullName: 25, type: '123', color: 'black', date: '456', description: 'balbla', officer:'II' },
    { id: 2, licenseNumber: "John", ownerFullName: 25, type: '123', color: 'black', date: '456', description: 'balbla', officer:'II' },
    { id: 3, licenseNumber: "John", ownerFullName: 25, type: '123', color: 'black', date: '456', description: 'balbla', officer:'II' }
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
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
            <TableRow key={item.id}>
              <TableCell>{item.licenseNumber}</TableCell>
              <TableCell>{item.ownerFullName}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.color}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.officer}</TableCell>
              <TableCell><ButtonModalClose /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
};
