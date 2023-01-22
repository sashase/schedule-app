import Head from "next/head"
import { db } from "../utils/firebase.js"
import { doc, getDoc } from "firebase/firestore"
import { Fragment, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { currentDate, weekDays } from "../modules/date"
import WeekDay from "../components/WeekDay.jsx"
import WeekButtons from "../components/WeekButtons.jsx"
import Lesson from "../components/Lesson.jsx"
import getCurrentLesson from "../modules/getCurrentLesson.js"
import Timeline from "../components/Timeline.jsx"

export default function Schedule() {
  const [currentWeekDay, setCurrentWeekDay] = useState("")
  const [currentTime, setCurrentTime] = useState({
    hours: currentDate.time.hours,
    minutes: currentDate.time.minutes
  })
  const [currentSchedule, setCurrentSchedule] = useState("")
  const { query, isReady } = useRouter()

  const getSchedule = async () => {
    const docRef = doc(db, `year${query.year}`, query.week)
    const docSnap = await getDoc(docRef)
    setCurrentSchedule(docSnap.data()[query.group])
  }

  useEffect(() => {
    if (isReady) getSchedule()
    setCurrentWeekDay(
      `${
        query.weekDay == "saturday" || query.weekDay == "sunday"
          ? "monday"
          : query.weekDay
      }`
    )
  }, [query.weekDay, query.week])

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
            currentSchedule[currentWeekDay].map((lesson, key) => {
              return (
                <Fragment key={key}>
                  {lesson.lesson != "" && (
                    <div className="flex gap-8 items-center" key={key}>
                      <Timeline
                        lessonNum={key}
                        currentWeekDay={currentWeekDay}
                        currentLesson={getCurrentLesson(
                          `${currentTime.hours}:${currentTime.minutes}`,
                          query.year
                        )}
                        year={query.year}
                      />
                      <div className="max-w-xs">
                        <Lesson
                          lesson={lesson.lesson}
                          teacher={lesson.teacher}
                          classRoom={lesson.classRoom}
                        />
                      </div>
                    </div>
                  )}
                </Fragment>
              )
            })}
        </div>
      </div>
    </div>
  )
}
