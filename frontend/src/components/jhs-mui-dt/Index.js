import MUIDataTable from "mui-datatables";
import { useState } from "react";
import { textLabels } from "./textLabels";
import { request } from "./api-get";

const MUIDTserver = ({
  title = "Lista desconocida",
  options = {},
  columns = [],
  url = "",
}) => {
  const [tData, setData] = useState([]);

  const [render, setRender] = useState({
    count: 0,
  });

  const [params, setParams] = useState({
    page: 0,
    rowsPerPage: 5,
    sortOrder: {},
  });

  const apiOptions = {
    url: url,
    params: params,
    setParams: setParams,
    onResponse: ({ count, data }) => {
      render.count = count;
      setRender({ ...render });
      setData(data);
    },
  };

  const tableOptions = {
    ...options,

    serverSide: true,
    textLabels: textLabels,
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
