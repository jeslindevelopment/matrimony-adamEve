import React from "react";

export default function DetailListBox({title,text}) {
  return (
    <>
      <div class="col-5 col-md-3 profile-detail-bg border-bottom border-white rounded-1 mt-1">
        <div class="p-2"> {title}</div>
      </div>
      <div  class="col-7 col-md-9 profile-detail-bg border-start border-bottom border-white rounded-1 mt-1">
        <div class="p-2">{text?text:'N/A'} </div>
      </div>
    </>
  );
}
