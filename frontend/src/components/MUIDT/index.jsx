import { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import MUIDataTable from 'mui-datatables'
import api from '@/utils/api'
// import { spanish } from './options/internationalization'
import tableChanges from './options/tableChanges'
import customToolbar from './options/customToolbar'
import customToolbarSelect from './options/customToolbarSelect'
import renderExpandableRow from './options/renderExpandableRow'
import Alert from '@/components/Alert'

export default function MUIDT({
  url = '',
  title = 'List',
  options = {},
  columns = [],
  formData = [],
  CustomToolbar = null,
  CustomToolbarSelect = null,
  CustomToolbarSelectN = null,
  ExpandableRow = null
}) {
  const alertRef = useRef()

  const [data, setData] = useState([])

  const [render, setRender] = useState({
    count: 0
  })

  const [params, setParams] = useState({
    page: 0,
    rowsPerPage: 5,
    sortOrder: {}
  })

  const alert = ({ msg = 'Unknown', severity = 'error' }) => {
    alertRef.current.handleOpen({
      msg,
      severity
    })
  }

  const serverGet = async () => {
    try {
      const { data: response } = await api({
        url,
        query: params,
        requestType: 'GET'
      })
      const { count, list } = response.data //!
      render.count = count
      setRender({ ...render })
      setData(list)
    } catch (error) {
      // TODO handle other errors
      const _response = error.response?.data
      alert({
        msg: _response?.error || 'Request failed',
        severity: 'error'
      })
    }
  }

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
      action: serverGet
    }),
    ...customToolbar({ CustomToolbar, serverGet, formData, url, alert }),
    ...customToolbarSelect({
      CustomToolbarSelect,
      CustomToolbarSelectN,
      serverGet,
      formData,
      url,
      alert
    }),
    ...renderExpandableRow({ ExpandableRow, url, alert }),
    ...options
  }

  return (
    <>
      <MUIDataTable title={title} data={data} columns={columns} options={_options} />
      <Alert ref={alertRef} />
    </>
  )
}

MUIDT.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
  options: PropTypes.object,
  columns: PropTypes.array.isRequired,
  formData: PropTypes.array,
  CustomToolbar: PropTypes.elementType,
  CustomToolbarSelect: PropTypes.elementType,
  CustomToolbarSelectN: PropTypes.elementType,
  ExpandableRow: PropTypes.elementType
}
