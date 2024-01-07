import { currentDate } from "./date"

const isFirstWeek = () => {
  const referenceDate = new Date("2023-09-03")

  const date = new Date(2023, currentDate.monthNum, currentDate.day)

  const timeDiff = date - referenceDate
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24))

  const weekNumber = Math.floor(daysDiff / 7)

  const isFirstWeek = weekNumber % 2 === 0

  if (
    currentDate.weekDay.englishName === "saturday" ||
    currentDate.weekDay.englishName === "sunday"
  ) {
    return !isFirstWeek
  }
  return isFirstWeek
}

export { isFirstWeek }
