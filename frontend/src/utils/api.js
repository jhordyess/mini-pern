import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:3000',
  responseType: 'json',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
})

export default function api({ url, requestType, query = {}, body = {} }) {
  let promise
  switch (requestType) {
    case 'GET':
      promise = API.get(url, { params: query })
      break
    case 'POST':
      promise = API.post(url, body)
      break
    case 'PUT':
      promise = API.put(url, body)
      break
    case 'DELETE':
      promise = API.delete(url, { data: body })
      break
    default:
      console.warn('Unsupported request type')
      return
  }
  return promise
}
