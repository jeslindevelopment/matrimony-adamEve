import React, { useEffect, useState } from "react";
import { color } from "../../assets/css/color/color";
import "./index.css";

import UsersCard from "./UsersCard";
import PlanDialog from "../../component/dialog/planDialog.js";
import { getUserDetail, getUsersList } from "../../store/slice/auth.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NoDataFound from "../noDataFound.js";

export default function ProfileListing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userListData, userData } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUsersList());
    dispatch(getUserDetail());
  }, []);
  return (
    <section
      className="p-4 "
      style={{ background: color.formBG, minHeight: "88vh" }}
    >
      <div class="profilesContainer row">
        {userListData?.data?.length > 0 ? (
          userListData?.data?.map((item, i) => {
            return (
              <UsersCard
                userData={userData}
                type={"userList"}
                key={i}
                item={item}
              />
            );
          })
        ) : (
          <NoDataFound />
        )}
      </div>
    </section>
  );
}
