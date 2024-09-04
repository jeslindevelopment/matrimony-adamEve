import React, { useState } from "react";
import { color } from "../../assets/css/color/color";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import noImage from "../../assets/images/no-image.jpg";
import { differenceInYears } from "date-fns";
import { useDispatch } from "react-redux";
import { getProfileDetail, shortList } from "../../store/slice/auth";
import PlanDialog from "../../component/dialog/planDialog.js";
export default function UsersCard(props) {
  const navigate = useNavigate();
  const [showPlanDialog, setShowPlanDialog] = useState(false);

  const { key, item, onViewDeatil, type, isInterestList } = props;
  const today = new Date();
  const dispatch = useDispatch();
  const handleShortList = (id) => {
    dispatch(shortList(id, type));
  };
  return (
    <>
      <PlanDialog
        show={showPlanDialog}
        handleClose={() => setShowPlanDialog(false)}
      />
      <div className="col-lg-3 col-md-6 col-sm-12 rounded-4 p-2" key={key}>
        <div className="bg-white py-2 px-1 rounded-4">
          <div class="box ">
            <div class="body">
              <div class="imgprofilesContainer">
                <img src={item?.image ? item?.image : noImage} alt="" />
              </div>
              <div class="content d-flex flex-column align-items-center justify-content-center h-100">
                <div className="fs-6 text-center w-100">
                  <p className="text-white fw-bold">
                    {differenceInYears(today, new Date(item?.dob))} years
                  </p>
                  <p className="text-white">
                    {item?.height && `${item?.height}`}
                  </p>
                  <p className="text-white">
                    {" "}
                    {item?.denomination && `${item?.denomination} `}
                  </p>
                  <p className="text-white">
                    {" "}
                    {item?.language && `${item?.language}`}
                  </p>
                  <p className="text-white">
                    {" "}
                    {item?.education && `${item?.education}`}
                  </p>
                  <p className="text-white">
                    {" "}
                    {item?.occupation && `${item?.occupation}`}
                  </p>
                  <p className="text-white">
                    {" "}
                    {item?.city && `${item?.city}, `}
                    {item?.state && `${item?.state}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4">
            {/* <div className="d-flex justify-content-between align-items-center">
            <div className="fs-6 fw-bold">Ajay</div>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                height: 40,
                width: 40,
                borderRadius: 50,
                background: "#000000bf",
              }}
            >
              <Icon
                icon="vaadin:heart"
                color={color.hightLightColor}
                width={25}
              />
            </div>
          </div> */}
            {!isInterestList && (
              <div className="d-flex justify-content-evenly mb-3">
                <button
                  type="button"
                  class="btn btn-sm"
                  onClick={() => {
                    dispatch(getProfileDetail(item?._id));
                    navigate("/profile-detail", {
                      state: {
                        id: item._id,
                      },
                    });
                  }}
                  style={{
                    background: color.hightLightColor,
                    borderRadius: 10,
                    color: "white",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  View Details{" "}
                </button>
                <button
                  type="button"
                  class="btn btn-sm"
                  onClick={() => setShowPlanDialog(true)}
                  style={{
                    background: color.hightLightColor,
                    borderRadius: 10,
                    color: "white",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  Send Request
                </button>
                <div
                  onClick={() => handleShortList(item?._id)}
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 50,
                    background: "#000000bf",
                    cursor: "pointer",
                  }}
                >
                  <Icon
                    icon="vaadin:heart"
                    color={
                      item?.isShortlisted ? color.hightLightColor : "white"
                    }
                    width={25}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
