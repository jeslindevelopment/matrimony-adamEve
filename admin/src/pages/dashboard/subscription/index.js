import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getSubscriptionPlan } from "../../../features/admin/adminActions";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom"

export default function DataTable() {
    const [size, setSize] = useState(10);
    const [page, setPage] = useState(1);
    const { userToken } = useSelector((state) => state.auth)
    const { subscriptions } = useSelector((state) => state.admin)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getSubscriptionPlan({ userToken }));
    }, []);

    useEffect(() => {
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
            name: "_id",
            label: "Edit",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, meta) => {
                    return (
                        <>
                            <Button onClick={() => navigate("/dashboard/subscription/edit?id=" + value)}>
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
