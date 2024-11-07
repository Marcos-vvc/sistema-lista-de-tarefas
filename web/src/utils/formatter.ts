export const formatDate = (date: string): string => {
  const [day, month, year] = date.split('/')

  const isoDate = `${year}-${month}-${day}`

  return isoDate
}

export const priceFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})
