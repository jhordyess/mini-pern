export default function tableChanges({ params, setParams, action }) {
  return {
    onTableInit: () => {
      action()
    },
    onTableChange: (accion, tableState) => {
      let aux = true
      switch (accion) {
        case 'sort':
          params.sortOrder = tableState.sortOrder
          break
        case 'changeRowsPerPage':
          params.rowsPerPage = tableState.rowsPerPage
          if (params.page !== tableState.page) params.page = tableState.page
          break
        case 'changePage':
          params.page = tableState.page
          break
        default:
          // console.log(accion);
          aux = false
          break
      }
      if (aux) {
        action()
        setParams({ ...params })
      }
    }
  }
}
