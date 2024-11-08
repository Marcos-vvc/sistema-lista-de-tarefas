export const formatDate = (date: string): string => {
  const [day, month, year] = date.split('/')

  const isoDate = `${year}-${month}-${day}`

  return isoDate
}

export const convertToISODate = (date: string): string => {
  const [day, month, year] = date.split('/')

  if (!day || !month || !year) {
    return ''
  }

  const isoDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`

  return isoDate
}

export const priceFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})
