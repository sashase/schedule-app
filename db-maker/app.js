import { db } from "./utils/firebase.js"
import * as XLSX from "xlsx/xlsx.mjs"
import * as fs from "fs"
import { Readable } from "stream"
import * as cpexcel from "xlsx/dist/cpexcel.full.mjs"
import { doc, setDoc } from "firebase/firestore"

XLSX.set_fs(fs)
XLSX.stream.set_readable(Readable)
XLSX.set_cptable(cpexcel)

const file1 = XLSX.readFile("./file1.xlsx")
const file2 = XLSX.readFile("./file2.xlsx")
const file3 = XLSX.readFile("./file3.xlsx")

const workbooks = [
  [file1.Sheets[file1.SheetNames[0]], file1.Sheets[file1.SheetNames[1]]],
  [file2.Sheets[file2.SheetNames[0]], file2.Sheets[file2.SheetNames[1]]],
  [file3.Sheets[file3.SheetNames[0]], file3.Sheets[file3.SheetNames[1]]]
]

const groups = [
  ["group1", "group2", "group3", "group4", "group5", "group6", "group7"],
  ["kp21", "kp22", "ksr21", "kt21", "km21", "ipz21", "kn21"],
  ["kp21r", "kp22r", "ksr21r", "kt21r", "km21r", "ipz21r", "kn21r"]
]

const days = ["monday", "tuesday", "wednesday", "thursday", "friday"]

const startingRows = [
  [2, 9, 16, 23, 30],
  [2, 8, 14, 20, 26],
  [2, 8, 14, 20, 26]
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
    days.forEach((day, dayKey) => {
      schedule1[group][day] = []
      schedule2[group][day] = []
      for (let i = 0; i < (yearIndex == 0 ? 7 : 6); i++) {
        const lesson1 =
          workbooks[yearIndex][0][
            `${startingColumns[groupKey].lesson}${
              startingRows[yearIndex][dayKey] + i
            }`
          ]?.v
        const teacher1 =
          workbooks[yearIndex][0][
            `${startingColumns[groupKey].teacher}${
              startingRows[yearIndex][dayKey] + i
            }`
          ]?.v
        const classRoom1 =
          workbooks[yearIndex][0][
            `${startingColumns[groupKey].classRoom}${
              startingRows[yearIndex][dayKey] + i
            }`
          ]?.v
        const lesson2 =
          workbooks[yearIndex][1][
            `${startingColumns[groupKey].lesson}${
              startingRows[yearIndex][dayKey] + i
            }`
          ]?.v
        const teacher2 =
          workbooks[yearIndex][1][
            `${startingColumns[groupKey].teacher}${
              startingRows[yearIndex][dayKey] + i
            }`
          ]?.v
        const classRoom2 =
          workbooks[yearIndex][1][
            `${startingColumns[groupKey].classRoom}${
              startingRows[yearIndex][dayKey] + i
            }`
          ]?.v
        schedule1[group][day].push({
          lesson: lesson1 ? lesson1 : "",
          teacher: teacher1 ? teacher1 : "",
          classRoom: classRoom1 ? classRoom1 : ""
        })
        schedule2[group][day].push({
          lesson: lesson2 ? lesson2 : "",
          teacher: teacher2 ? teacher2 : "",
          classRoom: classRoom2 ? classRoom2 : ""
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

for (let i = 0; i < 3; i++) {
  addToDb(i != 2 ? `year${i + 1}` : `year${i}r`, i)
}
