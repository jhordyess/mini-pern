export const formatOrderBy = (relation = [], sortOrder = {}) => {
  let order = []
  if (typeof sortOrder === 'string') {
    sortOrder = JSON.parse(sortOrder)
  }
  if (typeof sortOrder.name !== 'undefined' && typeof sortOrder.direction !== 'undefined') {
    const aux = {}
    const n_1 = relation.find(str => str.table === sortOrder.name)
    if (typeof n_1 !== 'undefined') {
      const temp = {}
      temp[n_1.column] = String(sortOrder.direction)
      aux[n_1.table] = temp
    } else {
      aux[sortOrder.name] = String(sortOrder.direction)
    }
    order = [aux]
  }
  return order
}

export const addZeros = (number = 0, qty = 2) => {
  let str = String(number)
  for (let i = str.length; i < qty; i++) {
    str = '0' + str
  }
  return str
}
