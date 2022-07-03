export function useColor(...colors: string[]) {
  const getRandomColor = () => {
    return colors[Math.random() * colors.length | 0]
  }
  return { getRandomColor }
}
