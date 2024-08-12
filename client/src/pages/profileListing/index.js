import React, { useState } from "react";
import { color } from "../../assets/css/color/color";
import "./index.css";

import UsersCard from "./UsersCard";
import PlanDialog from "../../component/dialog/planDialog.js";

export default function ProfileListing() {
  const array = ["", "", "", "", "", "", ""];
  const [showPlanDialog, setShowPlanDialog] = useState("");
  return (
    <section
      className="p-4 "
      style={{ background: color.formBG, minHeight: "88vh" }}
    >
      <PlanDialog
        show={showPlanDialog}
        handleClose={() => setShowPlanDialog(false)}
      />
      <div class="profilesContainer row">
        {array?.map((item, i) => {
          return (
            <UsersCard
              setShowPlanDialog={setShowPlanDialog}
              key={i}
              item={item}
            />
          );
        })}
      </div>
    </section>
  );
}
