export const formatDate = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

export const isDateDisabled = (date: number) => {
  return date < (new Date().setDate(new Date().getDate() - 1))
}
