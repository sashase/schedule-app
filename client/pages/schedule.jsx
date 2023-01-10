import Head from "next/head"
import { db } from "../utils/firebase.js"
import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { weekDays } from "../modules/date"
import timeOfLessons from "../modules/timeOfLessons.js"
import WeekDay from "../components/WeekDay.jsx"
import WeekButtons from "../components/WeekButtons.jsx"
import Lesson from "../components/Lesson.jsx"

export default function Schedule() {
  const [currentWeekDay, setCurrentWeekDay] = useState("")
  const [currentDay, setCurrentDay] = useState()
  const [currentWeek, setCurrentWeek] = useState()
  const [currentSchedule, setCurrentSchedule] = useState("")
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
    setCurrentDay(query.day)
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
      <div>
        <div className="flex flex-wrap items-center gap-10 text-center text-2xl font-bold lg:mx-40 md:mx-20 mx-0 my-7">
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
        <div className="flex gap-10 my-14">
          <div className="flex gap-5">
            <div className="flex flex-col gap-28 items-center max-w-min text-center text-lg leading-5 font-bold mt-4">
              {timeOfLessons.map((time) => {
                return (
                  <p key={time.start}>
                    {time.start}{" "}
                    <span className="font-normal text-sm">{time.end}</span>
                  </p>
                )
              })}
            </div>
            <div className="flex flex-col gap-2 items-center mt-5">
              <div className="w-4 h-4 block rounded-full border-purple border-2" />
              <div className="w-1 h-[15%] bg-purple" />
              <div className="w-4 h-4 block rounded-full border-purple border-2" />
              <div className="w-1 h-[15%] bg-purple" />
              <div className="w-4 h-4 block rounded-full border-purple border-2" />
              <div className="w-1 h-[15%] bg-purple" />
              <div className="w-4 h-4 block rounded-full border-purple border-2" />
              <div className="w-1 h-[15%] bg-purple" />
              <div className="w-4 h-4 block rounded-full border-purple border-2" />
              <div className="w-1 h-[15%] bg-purple" />
              <div className="w-4 h-4 block rounded-full border-purple border-2">
                <div className="w-2 h-2 bg-purple rounded-full m-0.5"></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-10 max-w-xs">
            {currentSchedule &&
              currentSchedule.map((lesson, key) => {
                return (
                  <Lesson
                    key={key}
                    lesson={lesson.lesson}
                    teacher={lesson.teacher}
                    classRoom={lesson.classRoom}
                  />
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}
