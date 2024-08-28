import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { Button } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useSelector, useDispatch } from "react-redux";
import { getContactList } from "../../features/admin/adminActions";
import { updateUser } from "../../features/admin/adminActions";

export default function DataTable() {
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(1);
  const { contacts } = useSelector((state) => state.admin);
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
        customBodyRender: (value, meta) => {
          return (
            <>
              <Helmet>
                <title> DataTable </title>
              </Helmet>
              <div style={{ display: "flex" }}>
                {contacts[meta.rowIndex] && contacts[meta.rowIndex].subscriptionPlan != "Free" ? <Button onClick={() => updateFreeSubscription(contacts[meta.rowIndex]._id)}>
                  Free Plan
                </Button> : <Button onClick={() => removeFreeSubscription(contacts[meta.rowIndex]._id)}>
                  Remove Free Plan
                </Button>}
                {/* <Button
                  onClick={() => alert("Delete")}
                  style={{ marginLeft: "-1rem" }}
                >
                  <Icon
                    icon="ic:baseline-delete"
                    color="red"
                    width="25"
                    height="25"
                  />
                </Button> */}
              </div>
            </>
          );
        },
      },
    },
  ];

  const updateFreeSubscription = (id) => {
    const payload = {
      subscriptionPlan: "Free",
      subscriptionDate: new Date(),
      id
    }
    dispatch(updateUser({ userToken, payload }))
  }

  const removeFreeSubscription = (id) => {
    const payload = {
      subscriptionPlan: null,
      subscriptionDate: null,
      id
    }
    dispatch(updateUser({ userToken, payload }))
  }

  return (
    <div className="App wrapper">
      <MUIDataTable
        title={"User List"}
        data={dataSource}
        columns={columns}
        options={{
          selectableRows: false, // <===== will turn off checkboxes in rows
          count: count,
          rowsPerPage: size,
          page: page,
          changeRowsPerPage: (number) => setSize(number),
          onChangePage: (number) => { console.log(number); setPage(number + 1) }
        }}
      />
    </div>
  );
}
