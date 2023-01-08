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

const workbook1 = file.Sheets[file.SheetNames[0]]
const workbook2 = file.Sheets[file.SheetNames[1]]

const groups = ["kp21", "kp22", "ksr21", "kt21", "km21", "ipz21", "kn21"]

let schedule1 = {
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

let schedule2 = {
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
      const lesson1 =
        workbook1[`${startingColumns[group].lesson}${startingRows[i] + j}`]?.v
      const teacher1 =
        workbook1[`${startingColumns[group].teacher}${startingRows[i] + j}`]?.v
      const classRoom1 =
        workbook1[`${startingColumns[group].classRoom}${startingRows[i] + j}`]
          ?.v

      const lesson2 =
        workbook2[`${startingColumns[group].lesson}${startingRows[i] + j}`]?.v
      const teacher2 =
        workbook2[`${startingColumns[group].teacher}${startingRows[i] + j}`]?.v
      const classRoom2 =
        workbook2[`${startingColumns[group].classRoom}${startingRows[i] + j}`]
          ?.v

      schedule1[group][Object.keys(schedule1[group])[i]].push({
        lesson: lesson1 ? lesson1 : "",
        teacher: teacher1 ? teacher1 : "",
        classRoom: classRoom1 ? classRoom1 : ""
      })

      schedule2[group][Object.keys(schedule2[group])[i]].push({
        lesson: lesson2 ? lesson2 : "",
        teacher: teacher2 ? teacher2 : "",
        classRoom: classRoom2 ? classRoom2 : ""
      })
    }
  }
}

const uploadDb = async (schedule1, schedule2, docName) => {
  await setDoc(doc(db, "schedule1", docName), {
    ...schedule1
  })
  await setDoc(doc(db, "schedule2", docName), {
    ...schedule2
  })
}

for (let i = 0; i < groups.length; i++) {
  addToDb(groups[i])
  uploadDb(schedule1[groups[i]], schedule2[groups[i]], groups[i])
}
