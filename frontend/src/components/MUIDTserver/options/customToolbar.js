import React from "react";
//
import Reload from "./../defaults/Reload";
import Create from "./../defaults/create-update/Create";

export default function customToolbar({
  url,
  formData,
  serverGet,
  CustomToolbar,
}) {
  return {
    customToolbar: () => (
      <>
        <Reload action={serverGet} />
        <Create afterSubmit={serverGet} formData={formData} url={url} />
        {CustomToolbar && <CustomToolbar afterSubmit={serverGet} url={url} />}
      </>
    ),
  };
}
