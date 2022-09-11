import React from "react";
import MUIDataTable from "mui-datatables";
//
import api from "@utils/Api";
import { spanish } from "./options/internationalization";
import tableChanges from "./options/tableChanges";
import customToolbar from "./options/customToolbar";
import customToolbarSelect from "./options/customToolbarSelect";
import renderExpandableRow from "./options/renderExpandableRow";

const MUIDTserver = ({
  url = "",
  title = "List",
  options = {},
  columns = [],
  formData = [],
  CustomToolbar = null,
  CustomToolbarSelect = null,
  CustomToolbarSelectN = null,
  Detail = null,
}) => {
  const [data, setData] = React.useState([]);

  const [render, setRender] = React.useState({
    count: 0,
  });

  const [params, setParams] = React.useState({
    page: 0,
    rowsPerPage: 5,
    sortOrder: {},
  });

  const serverGet = async () => {
    try {
      const { data: response } = await api({
        url,
        params,
        requestType: "GET",
      });
      const { count, list } = response.data; //!
      render.count = count;
      setRender({ ...render });
      setData(list);
    } catch (error) {
      console.log("error", error);
    }
  };

  const _options = {
    serverSide: true,
    // textLabels: spanish,
    rowsPerPageOptions: [1, 5, 10, 20, 50],
    filter: false,
    search: false,
    // selectableRowsHideCheckboxes: true,
    selectableRowsOnClick: true,
    expandableRows: true,
    expandableRowsHeader: false,
    ...params,
    ...render,
    ...tableChanges({
      params,
      setParams,
      action: serverGet,
    }),
    ...customToolbar({ CustomToolbar, serverGet, formData, url }),
    ...customToolbarSelect({
      CustomToolbarSelect,
      CustomToolbarSelectN,
      serverGet,
      formData,
      url,
    }),
    ...renderExpandableRow({ Detail, url }),
    ...options,
  };

  return (
    <MUIDataTable
      title={title}
      data={data}
      columns={columns}
      options={_options}
    />
  );
};
export default MUIDTserver;
