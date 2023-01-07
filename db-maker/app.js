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

const groups = ["kp21", "kp22", "ksr21", "kt21", "km21", "ipz21", "kn21"]

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

const startingRows = [2, 8, 14, 20, 26]

const startingColumns = {
  kp21: {
    lesson: "A",
    teacher: "B",
    classRoom: "C"
  },
  kp22: {
    lesson: "D",
    teacher: "E",
    classRoom: "F"
  },
  ksr21: {
    lesson: "G",
    teacher: "H",
    classRoom: "I"
  },
  kt21: {
    lesson: "J",
    teacher: "K",
    classRoom: "L"
  },
  km21: {
    lesson: "M",
    teacher: "N",
    classRoom: "O"
  },
  ipz21: {
    lesson: "P",
    teacher: "Q",
    classRoom: "R"
  },
  kn21: {
    lesson: "S",
    teacher: "T",
    classRoom: "U"
  }
}

const addToDb = (group) => {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 6; j++) {
      const lesson =
        workbook[`${startingColumns[group].lesson}${startingRows[i] + j}`]?.v
      const teacher =
        workbook[`${startingColumns[group].teacher}${startingRows[i] + j}`]?.v
      const classRoom =
        workbook[`${startingColumns[group].classRoom}${startingRows[i] + j}`]?.v

      schedule[group][Object.keys(schedule[group])[i]].push({
        lesson: lesson ? lesson : "",
        teacher: teacher ? teacher : "",
        classRoom: classRoom ? classRoom : ""
      })
    }
  }
}

const uploadDb = async (schedule, docName) => {
  await setDoc(doc(db, "schedule", docName), {
    ...schedule
  })
}

for (let i = 0; i < groups.length; i++) {
  addToDb(groups[i])
  uploadDb(schedule[groups[i]], groups[i])
}
