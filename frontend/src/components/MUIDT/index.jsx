import React from "react";
import MUIDataTable from "mui-datatables";
//
import api from "@utils/Api";
import { spanish } from "./options/internationalization";
import tableChanges from "./options/tableChanges";
import customToolbar from "./options/customToolbar";
import customToolbarSelect from "./options/customToolbarSelect";
import renderExpandableRow from "./options/renderExpandableRow";
import Alert from "@components/Alert";

const MUIDT = ({
  url = "",
  title = "List",
  options = {},
  columns = [],
  formData = [],
  CustomToolbar = null,
  CustomToolbarSelect = null,
  CustomToolbarSelectN = null,
  ExpandableRow = null,
}) => {
  const alertRef = React.useRef();

  const [data, setData] = React.useState([]);

  const [render, setRender] = React.useState({
    count: 0,
  });

  const [params, setParams] = React.useState({
    page: 0,
    rowsPerPage: 5,
    sortOrder: {},
  });

  const alert = ({ msg = "Unknow", severity = "error" }) => {
    alertRef.current.handleOpen({
      msg,
      severity,
    });
  };

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
      // TODO handle other errors
      const _response = error.response?.data;
      alert({
        msg: _response?.data?.error || "Request failed",
        severity: "error",
      });
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
    ...customToolbar({ CustomToolbar, serverGet, formData, url, alert }),
    ...customToolbarSelect({
      CustomToolbarSelect,
      CustomToolbarSelectN,
      serverGet,
      formData,
      url,
      alert,
    }),
    ...renderExpandableRow({ ExpandableRow, url, alert }),
    ...options,
  };

  return (
    <>
      <MUIDataTable
        title={title}
        data={data}
        columns={columns}
        options={_options}
      />
      <Alert ref={alertRef} />
    </>
  );
};
export default MUIDT;
