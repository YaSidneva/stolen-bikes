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
import {
  deleteEmployee,
  getEmployees,
} from "../../store/employees/employeesSlice";
import { useDispatch, useSelector } from "react-redux";
import { ButtonAdd } from "../shared/buttons/button/buttonAdd";
import { FormAddNewOfficer } from "../form/FormAddNewOfficer";
import { Button } from "../shared/buttons/button/button";

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

  const [isOpenAddOfficer, setIsOpenAddOfficer] = useState(false);
  const handleOpenAddOfficer = () => {
    setIsOpenAddOfficer(true);
  };

  const handleCloseAddOfficer = () => {
    setIsOpenAddOfficer(false);
  };

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

  const handleDelete = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(deleteEmployee(id, token));
  };

  return (
    <>
      <TableContainer component={Paper} style={{ marginBottom: "1em", maxHeight: 300, overflow: 'auto' }}>
        <Table className={css.table}>
          <TableHead className={css.table_head}>
            <TableRow>
            <TableCell>ClientId</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Имя</TableCell>
              <TableCell>Фамилия</TableCell>
              <TableCell>Доступ</TableCell>
              <TableCell>Удалить</TableCell>
            </TableRow>
          </TableHead>
         
          <TableBody style={{ overflow: 'auto', maxHeight: 250 }}>
            {data?.officers?.map((item) => (
              <TableRow
                key={item.id}
                onClick={() => handleRowClick(item)}
                className={css.row}
              >
                <TableCell>{item.clientId}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.firstName}</TableCell>
                <TableCell>{item.lastName}</TableCell>
                <TableCell>
                  <Checkbox checked={item.approved} disabled />
                </TableCell>
                <TableCell>
                  <ButtonModalClose onClick={(e) => handleDelete(e, item._id)} />
                </TableCell>
              </TableRow>
            ))}
           </TableBody>
        </Table>
      </TableContainer>

      <Button className={css.button} onClick={handleOpenAddOfficer}>
        Добавить сотрудника
      </Button>

      <FormAddNewOfficer
        open={isOpenAddOfficer}
        onClose={handleCloseAddOfficer}
      />

      <DetailsPageEmployee
        open={modalOpen}
        rowData={selectedRow}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};
