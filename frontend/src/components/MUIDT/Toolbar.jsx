import { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Tooltip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  DialogTitle
} from '@mui/material'
import HelpIcon from '@mui/icons-material/Help'

const Toolbar = ({
  title = 'Title',
  toolLabel = 'Action',
  Icon = HelpIcon,
  okButtonLabel = 'Accept',
  cancelButtonLabel = 'Cancel',
  FormBody = null,
  onSubmit = null,
  onOpen = null,
  onClose = null
}) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = async () => {
    setOpen(true)
    if (onOpen) await onOpen()
  }

  const handleClose = async () => {
    setOpen(false)
    if (onClose) await onClose()
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (onSubmit) await onSubmit()
    await handleClose() //* 😎
  }

  return (
    <>
      <Tooltip title={toolLabel}>
        <IconButton onClick={handleClickOpen}>
          <Icon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent
            dividers
            // sx={{ display: "flex", flexWrap: "wrap" }}
            sx={{
              '& .MuiTextField-root': { m: 1, width: '27ch' }
            }}
          >
            {FormBody ? FormBody : null}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>{cancelButtonLabel}</Button>
            <Button type="submit">{okButtonLabel}</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

Toolbar.propTypes = {
  title: PropTypes.string,
  toolLabel: PropTypes.string,
  Icon: PropTypes.elementType,
  okButtonLabel: PropTypes.string,
  cancelButtonLabel: PropTypes.string,
  FormBody: PropTypes.node,
  onSubmit: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func
}

export default Toolbar
