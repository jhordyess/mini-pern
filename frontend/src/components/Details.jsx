import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import api from '@/utils/api'

const fetchData = async url => {
  try {
    const { data: response } = await api({
      url,
      params: { type: 'details' },
      requestType: 'GET'
    })

    let { details, createdAt } = response.data

    createdAt = new Date(createdAt).toLocaleDateString('es-BO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    return { details, createdAt }
  } catch (error) {
    // const _response = error.response?.data
    alert("Can't get data")
    return { details: '', createdAt: '' }
  }
}

const Details = ({ url }) => {
  const [data, setData] = useState({
    details: '',
    createdAt: ''
  })

  useEffect(() => {
    async function getData() {
      const { details, createdAt } = await fetchData(url)
      setData({ details, createdAt })
    }
    getData()
  }, [url])

  return (
    <div>
      <div>
        <h4>Details</h4>
        <p>{data.details}</p>
      </div>
      <div>
        <h4>Created at</h4>
        <p>{data.createdAt}</p>
      </div>
    </div>
  )
}

Details.propTypes = {
  url: PropTypes.string.isRequired
}

export default Details
