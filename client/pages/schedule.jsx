import Head from "next/head"
import { db } from "../utils/firebase.js"
import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { currentDate, weekDays } from "../modules/date"
import timeOfLessons from "../modules/timeOfLessons.js"
import WeekDay from "../components/WeekDay.jsx"
import WeekButtons from "../components/WeekButtons.jsx"
import Lesson from "../components/Lesson.jsx"
import getCurrentLesson from "../modules/getCurrentLesson.js"

export default function Schedule() {
  const [currentWeek, setCurrentWeek] = useState()
  const [currentWeekDay, setCurrentWeekDay] = useState("")
  const [currentTime, setCurrentTime] = useState({
    hours: currentDate.time.hours,
    minutes: currentDate.time.minutes
  })
  const [currentSchedule, setCurrentSchedule] = useState("")
  const [currentLesson, setCurrentLesson] = useState(
    getCurrentLesson(`${currentTime.hours}:${currentTime.minutes}`)
  )
  const { query, isReady } = useRouter()

  const getSchedule = async () => {
    const docRef = doc(db, query.week, query.group)
    const docSnap = await getDoc(docRef)
    setCurrentSchedule(docSnap.data()[currentWeekDay])
  }

  useEffect(() => {
    query.weekDay == "saturday" || query.weekDay == "sunday"
      ? setCurrentWeekDay("monday")
      : setCurrentWeekDay(query.weekDay)
    setCurrentWeek(query.week)
  }, [query])

  useEffect(() => {
    if (isReady) getSchedule()
  }, [currentWeekDay, currentWeek])

  return (
    <div>
      <Head>
        <title>Schedule</title>
      </Head>
      <div className="lg:mx-20 md:mx-10 mx-0">
        <div className="flex flex-wrap items-center gap-10 text-center text-2xl font-bold my-7">
          {weekDays.map((weekDay, key) => {
            return (
              <WeekDay
                key={key}
                weekDay={weekDay.englishName}
                weekDayShortName={weekDay.shortName}
                currentWeekDay={currentWeekDay}
                query={query}
              />
            )
          })}
          <WeekButtons query={query} />
        </div>
        <div className="flex flex-col gap-10 my-14">
          {currentSchedule &&
            currentSchedule.map((lesson, key) => {
              return (
                <div className="flex gap-3 items-center" key={key}>
                  <div
                    className={`flex gap-3 items-center text-center text-lg leading-5 font-bold ${
                      currentLesson == key &&
                      currentWeekDay == currentDate.weekDay.englishName
                        ? "text-purple"
                        : ""
                    }`}>
                    <p className="w-14">
                      {timeOfLessons[key].start}
                      <br />
                      <span className="font-normal text-sm">
                        {timeOfLessons[key].end}
                      </span>
                    </p>
                    <div className="w-1 h-[15%] bg-purple" />
                  </div>
                  <div className="max-w-xs">
                    <Lesson
                      lesson={lesson.lesson}
                      teacher={lesson.teacher}
                      classRoom={lesson.classRoom}
                    />
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
