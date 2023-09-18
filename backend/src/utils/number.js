export function addZeros(number = 0, qty = 2) {
  let str = String(number)
  for (let i = str.length; i < qty; i++) {
    str = '0' + str
  }
  return str
}
