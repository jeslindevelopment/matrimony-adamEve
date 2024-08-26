import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { Button } from "@mui/material";
import { Icon } from "@iconify/react";
import { Helmet } from "react-helmet-async";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../../features/user/userActions";
import { updateUser } from "../../../features/admin/adminActions";
import { useNavigate } from "react-router-dom"

export default function DataTable() {
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(1);
  const { userList } = useSelector((state) => state.users);
  const { userToken } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUsers({ userToken, size, page }));
  }, []);

  useEffect(() => {
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
                {userList[meta.rowIndex] && userList[meta.rowIndex].subscriptionPlan != "Free" ? <Button onClick={() => updateFreeSubscription(userList[meta.rowIndex]._id)}>
                  Free Plan
                </Button> : <Button onClick={() => removeFreeSubscription(userList[meta.rowIndex]._id)}>
                  Remove Free Plan
                </Button>
                }
                <Button onClick={() => navigate(`/dashboard/users/profile?id=${userList[meta.rowIndex]._id}`)} >
                  <Icon
                    icon="ri:edit-fill"
                    color="#21618C"
                    width="25"
                    height="25"
                  />
                </Button>
              </div>
            </>
          );
        },
      },
    },
    {
      name: "_id",
      label: "_id",
      options: {
        filter: false,
        sort: false,
        // customBodyRender: (value, meta) => {
        //   return (
        //     <>
        //       <Button>
        //         <Icon
        //           icon="ri:edit-fill"
        //           color="#21618C"
        //           width="25"
        //           height="25"
        //         />
        //       </Button>
        //     </>
        //   )
        // }
      }
    }
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
        }}
      />
    </div>
  );
}
