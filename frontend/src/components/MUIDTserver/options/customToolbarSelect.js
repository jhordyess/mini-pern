import React from "react";
//
import Update from "./../defaults/create-update/Update";
import Delete from "./../defaults/Delete";

const getIDs = (selectedRows, displayData) => {
  let IDs = [];
  selectedRows.data.forEach((row) => {
    const disDat = displayData.find((objt) => objt.dataIndex === row.dataIndex);
    if (disDat && typeof disDat.data !== "undefined") IDs.push(disDat.data[0]);
  });
  return IDs;
};

export default function customToolbarSelect({
  url,
  formData,
  serverGet,
  CustomToolbarSelect,
  CustomToolbarSelectN,
}) {
  return {
    //TODO Hacer persistente los conponentes
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => {
      const IDs = getIDs(selectedRows, displayData);

      const resetRows = async () => {
        await setSelectedRows([]);
      };

      return (
        <div style={{ marginRight: 24 }}>
          {IDs.length === 1 && (
            <>
              <Update
                url={url + "/" + IDs[0]}
                formData={formData}
                afterSubmit={serverGet}
                onClose={resetRows}
              />
              {CustomToolbarSelect && (
                <CustomToolbarSelect
                  url={url}
                  id={IDs[0]}
                  afterSubmit={serverGet}
                  onClose={resetRows}
                />
              )}
            </>
          )}
          {IDs.length >= 1 && (
            <>
              <Delete
                url={url}
                ids={IDs}
                afterSubmit={serverGet}
                onClose={resetRows}
              />
              {CustomToolbarSelectN && (
                <CustomToolbarSelectN
                  url={url}
                  ids={IDs}
                  afterSubmit={serverGet}
                  onClose={resetRows}
                />
              )}
            </>
          )}
        </div>
      );
    },
  };
}
