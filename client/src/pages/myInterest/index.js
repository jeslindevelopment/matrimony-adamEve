import React, { useEffect } from "react";
import { color } from "../../assets/css/color/color";
import { getInterestList } from "../../store/slice/auth.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UsersCard from "../profileListing/UsersCard.js";

export default function MyInterest() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { interestListData } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getInterestList())
  }, []);
  console.log("interestListData",interestListData)
  return (
    <section
      className="p-4 "
      style={{ background: color.formBG, minHeight: "88vh" }}
    >
      <div class="profilesContainer row">
        {interestListData?.length > 0
          ? interestListData?.map((item, i) => {
              return (
                <UsersCard
                  isInterestList
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
