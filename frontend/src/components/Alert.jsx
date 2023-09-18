import { forwardRef, useState, useImperativeHandle } from 'react'
import MUIAlert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

const Alert = forwardRef(function Alert(_, ref) {
  const [open, setOpen] = useState(false)

  useImperativeHandle(ref, () => ({
    handleOpen
  }))

  const [data, setData] = useState({ msg: '', severity: 'success' })

  const handleOpen = ({ msg, severity }) => {
    setData({ msg, severity })
    setOpen(true)
  }

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
    // setData({ msg: "", severity: "success" });
  }
  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
      <MUIAlert onClose={handleClose} severity={data.severity} sx={{ width: '100%' }}>
        {data.msg}
      </MUIAlert>
    </Snackbar>
  )
})

export default Alert
