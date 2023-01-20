const lessonTimes = [
  {
    start: "10:00",
    end: "11:20"
  },
  {
    start: "11:30",
    end: "12:50"
  },
  {
    start: "13:10",
    end: "14:30"
  },
  {
    start: "14:40",
    end: "16:00"
  },
  {
    start: "16:10",
    end: "17:30"
  },
  {
    start: "17:40",
    end: "19:00"
  }
]

const getCurrentLesson = (value) => {
  let res
  lessonTimes.forEach((lesson, key) => {
    if (value >= lesson.start && value <= lesson.end) {
      res = key
    }
  })
  return res
}

export default getCurrentLesson