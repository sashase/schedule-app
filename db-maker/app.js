import { db } from "./utils/firebase.js"
import * as XLSX from "xlsx/xlsx.mjs"
import * as fs from "fs"
import { Readable } from "stream"
import * as cpexcel from "xlsx/dist/cpexcel.full.mjs"
import { doc, setDoc } from "firebase/firestore"

XLSX.set_fs(fs)
XLSX.stream.set_readable(Readable)
XLSX.set_cptable(cpexcel)

const file = XLSX.readFile("./file.xlsx")

const workbook = file.Sheets[file.SheetNames[0]]

let schedule = {
  kp21: {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: []
  },
  kp22: {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: []
  },
  ksr21: {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: []
  },
  kt21: {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: []
  },
  km21: {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: []
  },
  ipz21: {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: []
  },
  kn21: {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: []
  }
}

const addToDb = async (schedule, docName) => {
  await setDoc(doc(db, "schedule", docName), {
    ...schedule
  })
}

const kp21 = schedule[Object.keys(schedule)[0]]
const ipz21 = schedule[Object.keys(schedule)[5]]
const startRow = [1, 7, 13, 19, 25]

for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 6; j++) {
    const lessonKp = workbook[`A${startRow[i] + j}`]?.v
    const classKp = workbook[`B${startRow[i] + j}`]?.v
    const lessonIpz = workbook[`C${startRow[i] + j}`]?.v
    const classIpz = workbook[`D${startRow[i] + j}`]?.v

    schedule.kp21[Object.keys(kp21)[i]]?.push({
      lesson: lessonKp ? lessonKp : "-",
      class: classKp ? classKp : "N/A"
    })
    schedule.ipz21[Object.keys(ipz21)[i]]?.push({
      lesson: lessonIpz ? lessonIpz : "-",
      class: classIpz ? classIpz : "N/A"
    })
  }
}

addToDb(schedule.kp21, "kp21")
addToDb(schedule.ipz21, "ipz21")