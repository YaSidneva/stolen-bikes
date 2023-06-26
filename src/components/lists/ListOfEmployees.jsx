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
import css from "./ListOfEmployees.module.scss";
import {
  deleteEmployee,
  getEmployees,
} from "../../store/employees/employeesSlice";
import { useDispatch, useSelector } from "react-redux";
import { FormAddNewOfficer } from "../form/FormAddNewOfficer";
import { Button } from "../shared/buttons/button/button";
import { useNavigate } from "react-router-dom";

export const ListOfEmloyees = () => {
  const data = useSelector((state) => state.employees.data);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpenAddOfficer, setIsOpenAddOfficer] = useState(false);
  const handleOpenAddOfficer = () => {
    setIsOpenAddOfficer(true);
  };

  const handleCloseAddOfficer = () => {
    setIsOpenAddOfficer(false);
  };

  useEffect(() => {
    dispatch(getEmployees(token)); 
  }, [dispatch, token]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const handleRowClick = (rowData) => {
    navigate(`/employees/${rowData._id}`)
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
                key={item._id}
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
    </>
  );
};
