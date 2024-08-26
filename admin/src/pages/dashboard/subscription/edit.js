
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import { getSubscriptionDetail } from "../../../features/admin/adminActions"
import { useSelector, useDispatch } from "react-redux";
import AEInput from "../../../components/AEInput";
import AEButton from "../../../components/AEButton";
import { color } from "../../../assets/css/color/color";
import { showNotification } from "../../../features/notification/notificationSlice";

const SubscriptionEdit = () => {
    const { userToken } = useSelector((state) => state.auth)
    const { subscriptionData } = useSelector((state) => state.admin)
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");

    useEffect(() => {
        if (id) {
            dispatch(getSubscriptionDetail({ userToken, id }));
        }
    }, [id]);

    useEffect(() => {
        if (subscriptionData) {
            setFormData(subscriptionData);
            setFormData((formData) => ({
                ...formData,
            }));
        }
    }, [subscriptionData]);

    const handleUpdate = () => {
        const reg = new RegExp('^[0-9]+$');
        let checkKeys = ["freeContacts", "photosAllowed", "contactAllowed", "validity"]
        Object.keys(formData).forEach(keys => {
            if (checkKeys.includes(keys)) {
                if (!(reg.test(formData[keys]) || formData[keys] === "unlimited")) {
                    dispatch(showNotification({
                        type: "danger",
                        message: `${keys} should be a number or unlimited`
                    }))
                    return;
                }
            }
        })

        dispatch()
    }

    return (
        <section
            className="py-4 "
            style={{ background: color.formBG, minHeight: "88vh" }}
        >
            <div
                className="auto-container bg-white rounded-4"
                style={{ padding: 20 }}
            >
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <label className="form-label">Fee</label>
                        <AEInput
                            value={formData?.fee}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    fee: e.target.value,
                                });
                            }}
                            background="#b99a4570"
                            placeholder="Fee"
                        />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <label className="form-label">Validity (In months)</label>
                        <AEInput
                            value={formData?.validity}
                            type="number"
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    validity: e.target.value,
                                });
                            }}
                            background="#b99a4570"
                            placeholder="Validity (In months)"
                        />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 ">
                        <label className="form-label">Free Contacts</label>
                        <AEInput
                            background="#b99a4570"
                            placeholder="Free Contacts"
                            value={formData?.freeContacts}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    freeContacts: e.target.value,
                                });
                            }}
                        />{" "}
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <label className="form-label">Contacts Allowed</label>
                        <AEInput
                            background="#b99a4570"
                            placeholder="Contact Allowed"
                            maxLength={10}
                            value={formData?.contactAllowed}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    contactAllowed: e.target.value.slice(0, 10),
                                });
                            }}
                        />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12W ">
                        <label className="form-label">Photos Allowed</label>
                        <AEInput
                            value={formData?.photosAllowed}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    photosAllowed: e.target.value,
                                });
                            }}
                            background="#b99a4570"
                            placeholder="Photos Allowed"
                        />
                    </div>
                </div>
                <div className="row py-4">
                    <div className="d-flex justify-content-end">
                        <div>
                            <AEButton
                                fullWidth
                                title="Update"
                                onClick={handleUpdate}
                            //  isLoader={isLoader}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default SubscriptionEdit;