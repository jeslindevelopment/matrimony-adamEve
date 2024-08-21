import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getSubscriptionPlan } from "../../features/auth/authActions";
import { Icon } from "@iconify/react";

export default function DataTable() {
    const [size, setSize] = useState(10);
    const [page, setPage] = useState(1);
    const { subscriptions } = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSubscriptionPlan({}));
    }, []);

    useEffect(() => {
        console.log(subscriptions, "subscriptions")
        setDataSource(subscriptions);
    }, [subscriptions]);

    const [dataSource, setDataSource] = useState([]);

    const columns = [
        {
            name: "name",
            label: "Name",
            options: {
                filter: true,
                sort: true,
                // customBodyRender: (value) => {
                //     return !value ? "-" : value
                // },
            },
        },
        {
            name: "fee",
            label: "Fee",
            options: {
                filter: true,
                sort: false,
                // customBodyRender: (value) => {
                //     return !value ? "-" : value
                // },
            },
        },
        {
            name: "freeContacts",
            label: "Free Contacts",
            options: {
                filter: true,
                sort: false,
                // customBodyRender: (value) => {
                //     return !value ? "-" : value
                // },
            },
        },
        {
            name: "photosAllowed",
            label: "Photos Allowed",
            options: {
                filter: true,
                sort: false,
                // customBodyRender: (value) => {
                //     return !value ? "-" : value
                // },
            },
        },
        {
            name: "validity",
            label: "Validity",
            options: {
                filter: true,
                sort: false,
                // customBodyRender: (value) => {
                //     return !value ? "-" : value
                // },
            },
        },
        {
            name: "profileType",
            label: "Profile Type",
            options: {
                filter: true,
                sort: false,
                // customBodyRender: (value) => {
                //     return !value ? "-" : value
                // },
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
                            <Button onClick={() => alert("Edit")}>
                                <Icon
                                    icon="ri:edit-fill"
                                    color="#21618C"
                                    width="25"
                                    height="25"
                                />
                            </Button>
                        </>
                    )
                }
            }
        }
    ];

    return (
        <div className="App wrapper">
            <MUIDataTable
                title={"Subscription Plan"}
                data={dataSource}
                columns={columns}
                options={{
                    selectableRows: false, // <===== will turn off checkboxes in rows
                }}
            />
        </div>
    );
}
