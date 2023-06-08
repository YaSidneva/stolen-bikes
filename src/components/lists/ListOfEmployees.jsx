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
    const data = [
      { email: 1, firstName: "John", lastName: 25, approved: 'true' },
      { email: 1, firstName: "John", lastName: 25, approved: 'true' },
      { email: 1, firstName: "John", lastName: 25, approved: 'false' }
    ];
  
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
                <TableCell><ButtonModalClose /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  };