import React, { useEffect } from "react";
import { color } from "../../assets/css/color/color";
import { getInterestList } from "../../store/slice/auth.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UsersCard from "../profileListing/UsersCard.js";
import NoDataFound from "../noDataFound.js";
import { GENDER_TYPE, INTEREST_TYPES } from "../../constant/index.js";
import AESelect from "../../component/AESelect/index.js";

export default function MyInterest() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { interestListData } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getInterestList());
  }, []);
  return (
    <section
      className="p-4 "
      style={{ background: color.formBG, minHeight: "88vh" }}
    >
      <div className="d-flex justify-content-end">
        <AESelect
          background="white"
          style={{
            width: "fit-content",
          }}
          placeholder="Select Interest Type"
          onChange={(e) => {
            if (e.target.value == "Send Interest") {
              dispatch(getInterestList());
            } else {
              dispatch(getInterestList("Recieved"));
            }
          }}
          options={INTEREST_TYPES}
        />
      </div>
      <div class="profilesContainer row">
        {interestListData?.length > 0 ? (
          interestListData?.map((item, i) => {
            return (
              <UsersCard
                isInterestList
                status={item?.status}
                senderId={item?.sendUserId}
                key={i}
                item={item?.userDetail[0]}
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
