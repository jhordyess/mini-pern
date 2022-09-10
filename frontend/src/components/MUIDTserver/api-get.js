import api from "@utils/Api";

export const request = ({ url, onResponse, params, setParams }) => {
  const get = async () => {
    try {
      const { data } = await api({
        url: url,
        params: params,
        requestType: "GET",
      });
      await onResponse(data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  return {
    onTableInit: () => {
      get();
    },
    onTableChange: (action, tableState) => {
      let aux = true;
      switch (action) {
        case "sort":
          params.sortOrder = tableState.sortOrder;
          break;
        case "changeRowsPerPage":
          params.rowsPerPage = tableState.rowsPerPage;
          if (params.page !== tableState.page) params.page = tableState.page;
          break;
        case "changePage":
          params.page = tableState.page;
          break;
        default:
          // console.log(action);
          aux = false;
          break;
      }
      if (aux) {
        get();
        setParams({ ...params });
      }
    },
  };
};
