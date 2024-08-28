import React, { useEffect } from "react";
import { color } from "../../assets/css/color/color.js";
import { getInterestList, getShortList } from "../../store/slice/auth.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UsersCard from "../profileListing/UsersCard.js";

export default function MyFavourites() {
  const dispatch = useDispatch();
  const { shortListData } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getShortList());
  }, []);
  console.log("interestListData", shortListData);
  return (
    <section
      className="p-4 "
      style={{ background: color.formBG, minHeight: "88vh" }}
    >
      <div class="profilesContainer row">
        {shortListData?.length > 0
          ? shortListData?.map((item, i) => {
              return (
                <UsersCard
                  type={"favourite"}
                  key={i}
                  item={item?.userDetail[0]}
                />
              );
            })
          : "NO Data found"}
      </div>
    </section>
  );
}
