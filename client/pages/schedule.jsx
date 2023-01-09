import Head from "next/head"
import Link from "next/link"
import { db } from "../utils/firebase.js"
import { doc, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { weekDays } from "../modules/date"
import timeOfLessons from "../modules/timeOfLessons.js"

export default function Schedule() {
  const [currentWeekDay, setCurrentWeekDay] = useState("")
  const [currentDay, setCurrentDay] = useState()
  const [currentSchedule, setCurrentSchedule] = useState("")
  const { query, isReady } = useRouter()

  const getSchedule = async () => {
    const docRef = doc(db, query.week, query.group)
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      setCurrentSchedule(snapshot.data()[currentWeekDay])
    })
    return unsubscribe
  }

  useEffect(() => {
    query.weekDay == "saturday" || query.weekDay == "sunday"
      ? setCurrentWeekDay("monday")
      : setCurrentWeekDay(query.weekDay)
    setCurrentDay(query.day)
  }, [query])
  
  if (isReady) getSchedule()

  return (
    <div>
      <Head>
        <title>Schedule</title>
      </Head>
      <div>
        <div className="flex flex-wrap items-center gap-10 text-center text-2xl font-bold lg:mx-40 md:mx-20 mx-0 my-7">
          {weekDays.map((weekDay) => {
            return (
              <Link
                key={weekDay.englishName}
                href={{
                  pathname: "/schedule",
                  query: { ...query, weekDay: weekDay.englishName }
                }}
                className={
                  currentWeekDay == weekDay.englishName
                    ? "text-purple text-3xl"
                    : "text-darkGray"
                }>
                {weekDay.shortName}
              </Link>
            )
          })}
          <div className="flex gap-5 text-sm font-bold lg:m-0 m-auto">
            <Link
              className={
                query.week == "schedule1"
                  ? "bg-purple text-white shadow-def rounded-3xl py-3 px-5 transition-all duration-300 outline-none"
                  : "bg-grayPurple text-black shadow-def rounded-3xl py-3 px-5 transition-all duration-300 outline-none"
              }
              href={{
                pathname: "/schedule",
                query: {
                  ...query,
                  week: "schedule1"
                }
              }}>
              1 тиждень
            </Link>
            <Link
              className={
                query.week == "schedule2"
                  ? "bg-purple text-white shadow-def rounded-3xl py-3 px-5 transition-all duration-300 outline-none"
                  : "bg-grayPurple text-black shadow-def rounded-3xl py-3 px-5 transition-all duration-300 outline-none"
              }
              href={{
                pathname: "/schedule",
                query: {
                  ...query,
                  week: "schedule2"
                }
              }}>
              2 тиждень
            </Link>
          </div>
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
                  <div
                    key={key}
                    className={
                      lesson.lesson
                        ? "flex flex-col justify-between shadow-def rounded-3xl py-3 px-5 min-h-[100px]"
                        : "flex flex-col bg-grayPurple shadow-def rounded-3xl py-3 px-5 min-h-[5.5rem]"
                    }>
                    {lesson.lesson ? (
                      <h3 className="text-lg m-auto font-bold">
                        {lesson.lesson}
                      </h3>
                    ) : (
                      <h3 className="text-2xl m-auto text-gray font-bold">
                        Немає пари
                      </h3>
                    )}
                    <div className="flex justify-between">
                      <p className="text-gray text-sm">{lesson.teacher}</p>
                      <p className="text-gray text-sm">{lesson.classRoom}</p>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}
