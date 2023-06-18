import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Checkbox,
} from "@mui/material";
import { ButtonModalClose } from "../shared/buttons/button/ButtonModalClose";
import { DetailsPageEmployee } from "./detailsPage/DetailsPageEmployee";
import css from "./ListOfEmployees.module.scss";
import { getEmployees } from "../../store/employees/employeesSlice";
import { useDispatch, useSelector } from "react-redux";

export const ListOfEmloyees = () => {
  //   const [data, setData] = useDispatch(getEmployees());
  //   useState([
  //     { id: 1, email: 1, firstName: "John", lastName: 25, approved: true },
  //     { id: 2, email: 1, firstName: "John", lastName: 25, approved: true },
  //     { id: 3, email: 1, firstName: "John", lastName: 25, approved: false },
  //   ]);
  const data = useSelector((state) => state.employees.data);
  const token = useSelector((state) => state.auth.token);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployees(token)); // Выполняем запрос к серверу при монтировании компонента
  }, [dispatch, token]);

  if (!data) {
    return <div>Loading...</div>; // Отображаем индикатор загрузки, пока данные загружаются
  }

  console.log(data);

  const handleRowClick = (rowData) => {
    setSelectedRow(rowData);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    // const updatedData = data.filter((item) => item.id !== id);
    // setData(updatedData);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={css.table}>
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
            {data?.officers?.map((item) => (
              <TableRow
                key={item.id}
                onClick={() => handleRowClick(item)}
                className={css.raw}
              >
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.firstName}</TableCell>
                <TableCell>{item.lastName}</TableCell>
                <TableCell>
                  <Checkbox checked={item.approved} disabled />
                </TableCell>
                <TableCell>
                  <ButtonModalClose onClick={() => handleDelete(item.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <DetailsPageEmployee
        open={modalOpen}
        rowData={selectedRow}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};
