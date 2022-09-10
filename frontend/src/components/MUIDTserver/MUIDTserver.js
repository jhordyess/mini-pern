import React from "react";
import MUIDataTable from "mui-datatables";
//
import { request } from "./api-get";

const MUIDTserver = ({
  title = "List",
  options = {},
  columns = [],
  url = "",
}) => {
  const [tData, setData] = React.useState([]);

  const [render, setRender] = React.useState({
    count: 0,
  });

  const [params, setParams] = React.useState({
    page: 0,
    rowsPerPage: 5,
    sortOrder: {},
  });

  const apiOptions = {
    url: url,
    params: params,
    setParams: setParams,
    onResponse: ({ count, list }) => {
      render.count = count;
      setRender({ ...render });
      setData(list);
    },
  };

  const tableOptions = {
    ...options,

    serverSide: true,
    // textLabels: textLabels,
    filter: false,
    search: false,
    rowsPerPageOptions: [1, 5, 10, 20, 50],
    selectableRows: "none",
    selectableRowsHideCheckboxes: true,

    ...params,
    ...render,
    ...request(apiOptions),
  };

  return (
    <MUIDataTable
      title={title}
      data={tData}
      columns={columns}
      options={tableOptions}
    />
  );
};
export default MUIDTserver;
