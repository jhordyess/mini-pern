import PropTypes from 'prop-types'
import DialogContentText from '@mui/material/DialogContentText'
import DeleteIcon from '@mui/icons-material/Delete'
//
import Toolbar from '../Toolbar'
import api from '@/utils/api'

const Delete = ({
  url,
  ids = [],
  title = 'Delete',
  toolLabel = 'Delete',
  okButtonLabel = 'Continue',
  cancelButtonLabel = 'Cancel',
  afterSubmit,
  onClose,
  alert
}) => {
  const onSubmit = async () => {
    try {
      const { data: response } = await api({
        url,
        body: { ids },
        requestType: 'DELETE'
      })
      alert({
        msg: response?.message || 'Deleted',
        severity: 'success'
      })
      if (afterSubmit) await afterSubmit()
    } catch (error) {
      const _response = error.response?.data
      alert({
        msg: _response?.error || 'Request failed',
        severity: 'error'
      })
    }
  }

  return (
    <Toolbar
      {...{
        title,
        toolLabel,
        Icon: DeleteIcon,
        okButtonLabel,
        cancelButtonLabel,
        onSubmit,
        onClose
      }}
      FormBody={
        <DialogContentText>
          Are you sure to delete {ids.length} item
          {ids.length > 1 ? 's' : ''}? Please confirm.
        </DialogContentText>
      }
    />
  )
}

Delete.propTypes = {
  url: PropTypes.string.isRequired,
  ids: PropTypes.array.isRequired,
  title: PropTypes.string,
  toolLabel: PropTypes.string,
  okButtonLabel: PropTypes.string,
  cancelButtonLabel: PropTypes.string,
  afterSubmit: PropTypes.func,
  onClose: PropTypes.func,
  alert: PropTypes.func.isRequired
}

export default Delete
