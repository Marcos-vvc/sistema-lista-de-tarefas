export const priceFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})

// Função para formatar uma data
export const formatDate = (date: string | Date) => {
  const dateObj = new Date(date)
  return dateFormatter.format(dateObj)
}
