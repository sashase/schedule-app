import Head from "next/head"
import Link from "next/link"
import { db } from "../utils/firebase.js"
import { doc, getDoc, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { output } from "../components/Nav.jsx"

export default function Schedule() {
  const [currentDay, setCurrentDay] = useState("")
  const [currentSchedule, setCurrentSchedule] = useState("")
  const route = useRouter()

  const getSchedule = async () => {
    const docRef = doc(db, "schedule", route.query.group)
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      setCurrentSchedule(snapshot.data()[currentDay])

    })
    // const docSnap = await getDoc(docRef)
    // setCurrentSchedule(docSnap.data()[currentDay])
    return unsubscribe
  }

  useEffect(() => {
    setCurrentDay(route.query.day)
  }, [route.query.day])

  // useEffect(() => {
  //   if (!route.isReady) return
  //   setCurrentDay(route.query.day)
  //   getSchedule()
  // }, [route.query])

  getSchedule()

  return (
    <div>
      <Head>
        <title>Schedule</title>
      </Head>
      <div>
        <div className="flex items-center gap-10 text-center text-2xl font-bold lg:mx-40 sm:mx-0">
          <Link
            href={{
              pathname: "/schedule",
              query: { ...route.query, day: "monday" }
            }}
            className={
              currentDay == "monday" ? "text-purple text-3xl" : "text-darkGray"
            }>
            Пн
            <br />
            <span
              className={currentDay == "monday" ? "underline" : "text-black"}>
              2
            </span>
          </Link>
          <Link
            href={{
              pathname: "/schedule",
              query: { ...route.query, day: "tuesday" }
            }}
            className={
              currentDay == "tuesday" ? "text-purple text-3xl" : "text-darkGray"
            }>
            Вт
            <br />
            <span
              className={currentDay == "tuesday" ? "underline" : "text-black"}>
              3
            </span>
          </Link>
          <Link
            href={{
              pathname: "/schedule",
              query: { ...route.query, day: "wednesday" }
            }}
            className={
              currentDay == "wednesday"
                ? "text-purple text-3xl"
                : "text-darkGray"
            }>
            Ср
            <br />
            <span
              className={
                currentDay == "wednesday" ? "underline" : "text-black"
              }>
              4
            </span>
          </Link>
          <Link
            href={{
              pathname: "/schedule",
              query: { ...route.query, day: "thursday" }
            }}
            className={
              currentDay == "thursday"
                ? "text-purple text-3xl"
                : "text-darkGray"
            }>
            Чт
            <br />
            <span
              className={currentDay == "thursday" ? "underline" : "text-black"}>
              5
            </span>
          </Link>
          <Link
            href={{
              pathname: "/schedule",
              query: { ...route.query, day: "friday" }
            }}
            className={
              currentDay == "friday" ? "text-purple text-3xl" : "text-darkGray"
            }>
            Пт
            <br />
            <span
              className={currentDay == "friday" ? "underline" : "text-black"}>
              6
            </span>
          </Link>
        </div>
        <div>
          {currentSchedule &&
            currentSchedule.map((lesson) => {
              return (
                <div>
                  <h2>Lesson: {lesson.lesson}</h2>
                  <h2>Classroom: {lesson.classRoom}</h2>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
