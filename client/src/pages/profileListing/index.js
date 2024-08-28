import React, { useEffect, useState } from "react";
import { color } from "../../assets/css/color/color";
import "./index.css";

import UsersCard from "./UsersCard";
import PlanDialog from "../../component/dialog/planDialog.js";
import { getProfileDetail, getUsersList } from "../../store/slice/auth.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProfileListing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userListData } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getUsersList());
  }, []);
  return (
    <section
      className="p-4 "
      style={{ background: color.formBG, minHeight: "88vh" }}
    >
     
      <div class="profilesContainer row">
        {userListData?.data?.length > 0
          ? userListData?.data?.map((item, i) => {
              return (
                <UsersCard
                  type={"userList"}
                  
                  key={i}
                  item={item}
                />
              );
            })
          : "NO Data found"}
      </div>
    </section>
  );
}
