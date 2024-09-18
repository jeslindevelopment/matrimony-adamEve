import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { Button } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useSelector, useDispatch } from "react-redux";
import { getContactList } from "../../features/admin/adminActions";

export default function DataTable() {
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(1);
  const { contacts, contactCount } = useSelector((state) => state.admin);
  const { userToken } = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContactList({ userToken, size, page }));
  }, [page, size]);

  useEffect(() => {
    setDataSource(contacts);
  }, [contacts]);

  const [dataSource, setDataSource] = useState([]);

  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return !value ? "-" : value
        },
      },
    },
    {
      name: "email",
      label: "Email",

      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return !value ? "-" : value
        },
      },
    },
    {
      name: "phone",
      label: "Phone",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return !value ? "-" : value
        },
      },
    },
    {
      name: "subject",
      label: "Subject",

      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return !value ? "-" : value
        },
      },
    },
    {
      name: "message",
      label: "Message",

      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return !value ? "-" : value
        },
      },
    }
  ];

  return (
    <div className="App wrapper">
      <MUIDataTable
        title={"User List"}
        data={dataSource}
        columns={columns}
        options={{
          selectableRows: false, // <===== will turn off checkboxes in rows
          count: contactCount,
          rowsPerPage: size,
          page: page,
          changeRowsPerPage: (number) => setSize(number),
          onChangePage: (number) => { console.log(number); setPage(number + 1) }
        }}
      />
    </div>
  );
}
