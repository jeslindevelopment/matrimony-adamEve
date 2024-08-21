import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { Button } from "@mui/material";
import { Icon } from "@iconify/react";
import { Helmet } from "react-helmet-async";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../features/user/userActions";

export default function DataTable() {
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(1);
  const { userList } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  console.log(userList, "state.users");

  useEffect(() => {
    dispatch(getUsers({ userToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmI3Nzg2ZjY2ZTQyODY0NzZjNjNhNjUiLCJyb2xlIjoidXNlciIsImlhdCI6MTcyNDA2ODAwOSwiZXhwIjoxNzI0NjcyODA5fQ.UgZthBR2VBY5x4MkZLt5L2a3krHQbG_blL6ibJLlabA", size, page }));
  }, []);

  useEffect(() => {
    console.log(userList, "userList")
    setDataSource(userList);
  }, [userList]);

  const [dataSource, setDataSource] = useState([]);

  const columns = [
    {
      name: "firstname",
      label: "Firstname",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return !value ? "-" : value
        },
      },
    },
    {
      name: "surname",
      label: "Surname",

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
          console.log(value, "value")
          return !value ? "-" : value
        },
      },
    },
    {
      name: "education",
      label: "Education",

      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return !value ? "-" : value
        },
      },
    },
    {
      name: "city",
      label: "City",

      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return !value ? "-" : value
        },
      },
    },
    {
      name: "state",
      label: "State",

      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return !value ? "-" : value
        },
      },
    },
    {
      name: "country",
      label: "Country",

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
      name: "denomination",
      label: "Denomination",

      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return !value ? "-" : value
        },
      },
    },
    {
      name: "dob",
      label: "DOB",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return !value ? "-" : value
        },
      },
    },
    // {
    //   name: "maritalStatus",
    //   label: "Marital Status",
    //   options: {
    //     filter: true,
    //     sort: false,
    //   },
    //   customBodyRender: (value) => {
    //     return !value ? "-" : value
    //   },
    // },
    {
      name: "maritalStatus",
      label: "Marital Status",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return !value ? "-" : value
        },
      },
    },
    {
      name: "subscriptionPlan",
      label: "Subscription Plan",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return !value ? "-" : value
        },
      },
    },
    {
      name: "",
      label: "",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <Helmet>
                <title> DataTable </title>
              </Helmet>
              {tableMeta.columnIndex}
              {userList[tableMeta.columnIndex]} {value} {updateValue}
              {userList[tableMeta.columnIndex] && <Button onClick={() => alert("Edit")}>
                Free Plan
              </Button>}
              <Button
                onClick={() => alert("Delete")}
                style={{ marginLeft: "-1rem" }}
              >
                <Icon
                  icon="ic:baseline-delete"
                  color="red"
                  width="25"
                  height="25"
                />
              </Button>
            </>
          );
        },
      },
    },
  ];

  return (
    <div className="App wrapper">
      <h4>User Data </h4>

      <MUIDataTable
        title={"Events List"}
        data={dataSource}
        columns={columns}
        options={{
          selectableRows: false, // <===== will turn off checkboxes in rows
        }}
      />
    </div>
  );
}
