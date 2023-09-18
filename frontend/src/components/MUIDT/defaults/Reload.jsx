import PropTypes from 'prop-types'
import { IconButton, Tooltip } from '@mui/material'
import CachedIcon from '@mui/icons-material/Cached'

const Reload = ({ action }) => {
  return (
    <Tooltip title={'Reload'}>
      <IconButton onClick={action}>
        <CachedIcon />
      </IconButton>
    </Tooltip>
  )
}

Reload.propTypes = {
  action: PropTypes.func.isRequired
}

export default Reload
