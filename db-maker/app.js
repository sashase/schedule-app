import { db } from "./utils/firebase.js"
import * as XLSX from "xlsx/xlsx.mjs"
import * as fs from "fs"
import { Readable } from "stream"
import * as cpexcel from "xlsx/dist/cpexcel.full.mjs"
import { doc, setDoc } from "firebase/firestore"

XLSX.set_fs(fs)
XLSX.stream.set_readable(Readable)
XLSX.set_cptable(cpexcel)

const sheets = [
  XLSX.readFile("./year1.xlsx"),
  XLSX.readFile("./year2.xlsx"),
  XLSX.readFile("./year2r.xlsx"),
  XLSX.readFile("./year3.xlsx"),
  XLSX.readFile("./year4.xlsx")
]

const workbooks = []

sheets.forEach((sheet) => {
  workbooks.push([
    sheet.Sheets[sheet.SheetNames[0]],
    sheet.Sheets[sheet.SheetNames[1]]
  ])
})

const groups = [
  ["group1", "group2", "group3", "group4", "group5", "group6", "group7"],
  ["kp21", "kp22", "ksr21", "kt21", "km21", "ipz21", "kn21"],
  ["kp21r", "kp22r", "ksr21r", "kt21r", "km21r", "ipz21r", "kn21r"],
  ["kp31", "kt31", "km31", "fbs31", "ipz31", "kn31"],
  ["kp41", "kp42", "ipz41", "kn41"]
]

const days = ["monday", "tuesday", "wednesday", "thursday", "friday"]

const startingRows = [
  [2, 9, 16, 23, 30],
  [2, 8, 14, 20, 26],
  [2, 8, 14, 20, 26],
  [2, 9, 16, 23, 30],
  [2, 9, 16, 23, 30]
]

const startingColumns = [
  {
    lesson: "A",
    teacher: "B",
    classRoom: "C"
  },
  {
    lesson: "D",
    teacher: "E",
    classRoom: "F"
  },
  {
    lesson: "G",
    teacher: "H",
    classRoom: "I"
  },
  {
    lesson: "J",
    teacher: "K",
    classRoom: "L"
  },
  {
    lesson: "M",
    teacher: "N",
    classRoom: "O"
  },
  {
    lesson: "P",
    teacher: "Q",
    classRoom: "R"
  },
  {
    lesson: "S",
    teacher: "T",
    classRoom: "U"
  }
]

const addToDb = (year, yearIndex) => {
  let schedule1 = {}
  let schedule2 = {}
  groups[yearIndex].forEach((group, groupKey) => {
    schedule1[group] = {}
    schedule2[group] = {}
    if (yearIndex === 4 && (group === "ipz41" || group === "kn41")) {
      days.push("saturday")
      startingRows[4].push(37)
    }
    days.forEach((day, dayKey) => {
      schedule1[group][day] = []
      schedule2[group][day] = []
      for (let i = 0; i < (yearIndex === 1 || yearIndex === 2 ? 6 : 7); i++) {
        const lessons = []
        const teachers = []
        const classRooms = []
        for (let j = 0; j < 2; j++) {
          lessons.push(
            workbooks[yearIndex][j][
              `${startingColumns[groupKey].lesson}${
                startingRows[yearIndex][dayKey] + i
              }`
            ]?.v
          )
          teachers.push(
            workbooks[yearIndex][j][
              `${startingColumns[groupKey].teacher}${
                startingRows[yearIndex][dayKey] + i
              }`
            ]?.v
          )
          classRooms.push(
            workbooks[yearIndex][j][
              `${startingColumns[groupKey].classRoom}${
                startingRows[yearIndex][dayKey] + i
              }`
            ]?.v
          )
        }
        schedule1[group][day].push({
          lesson: lessons[0] ? lessons[0] : "",
          teacher: teachers[0] ? teachers[0] : "",
          classRoom: classRooms[0] ? classRooms[0] : ""
        })
        schedule2[group][day].push({
          lesson: lessons[1] ? lessons[1] : "",
          teacher: teachers[1] ? teachers[1] : "",
          classRoom: classRooms[1] ? classRooms[1] : ""
        })
      }
    })
  })
  upload(year, schedule1, schedule2)
}

const upload = async (year, schedule1, schedule2) => {
  await setDoc(doc(db, year, "schedule1"), {
    ...schedule1
  })
  await setDoc(doc(db, year, "schedule2"), {
    ...schedule2
  })
}

for (let i = 0; i < 5; i++) {
  addToDb(i === 2 ? `year${i}r` : i > 2 ? `year${i}` : `year${i + 1}`, i)
}
