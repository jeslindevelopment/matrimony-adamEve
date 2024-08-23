import React from "react";
import { color } from "../../assets/css/color/color";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export default function UsersCard(props) {
  const navigate = useNavigate();
  const { key, item, setShowPlanDialog, onViewDeatil } = props;
  console.log("item", item);

  return (
    <div className="col-lg-3 col-md-6 col-sm-12 rounded-4 p-2" key={key}>
      <div className="bg-white py-2 px-1 rounded-4">
        <div class="box ">
          <div class="body">
            <div class="imgprofilesContainer">
              <img
                src="https://images.pexels.com/photos/3601422/pexels-photo-3601422.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt=""
              />
            </div>
            <div class="content d-flex flex-column align-items-center justify-content-center h-100">
              <div className="fs-6 text-center w-100">
                <p className="text-white fw-bold">25 years</p>
                <p className="text-white">
                  5-feet-1-inches, {item?.denomination}, Hindi, Graduate,
                  Commission Agent
                </p>
                <p className="text-white">Rs. 1 – 2 Lacs/year</p>
                <p className="text-white fw-bold">Assam, India</p>
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
          <div className="d-flex justify-content-evenly mb-3">
            <button
              type="button"
              class="btn btn-sm"
              onClick={onViewDeatil}
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
                color={color.hightLightColor}
                width={25}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
