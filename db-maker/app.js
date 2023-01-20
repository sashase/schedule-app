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

const workbooks = [
  [file1.Sheets[file1.SheetNames[0]], file1.Sheets[file1.SheetNames[1]]],
  [file2.Sheets[file2.SheetNames[0]], file2.Sheets[file2.SheetNames[1]]]
]

const groups = [
  ["group1", "group2", "group3", "group4", "group5", "group6", "group7"],
  ["kp21", "kp22", "ksr21", "kt21", "km21", "ipz21", "kn21"]
]

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
]

let year1 = {
  schedule1: {
    group1: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: []
    },
    group2: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: []
    },
    group3: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: []
    },
    group4: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: []
    },
    group5: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: []
    },
    group6: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: []
    },
    group7: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: []
    }
  },
  schedule2: {
    group1: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: []
    },
    group2: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: []
    },
    group3: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: []
    },
    group4: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: []
    },
    group5: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: []
    },
    group6: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: []
    },
    group7: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: []
    }
  }
}

let year2 = {
  schedule1: {
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
  },
  schedule2: {
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
}

const startingRows = [
  [2, 9, 16, 23, 30],
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

const addToDb = (year, group, groupIndex) => {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < (year == 0 ? 7 : 6); j++) {
      const lesson1 =
        workbooks[year][0][
          `${startingColumns[groupIndex].lesson}${startingRows[year][i] + j}`
        ]?.v
      const teacher1 =
        workbooks[year][0][
          `${startingColumns[groupIndex].teacher}${startingRows[year][i] + j}`
        ]?.v
      const classRoom1 =
        workbooks[year][0][
          `${startingColumns[groupIndex].classRoom}${startingRows[year][i] + j}`
        ]?.v

      const lesson2 =
        workbooks[year][1][
          `${startingColumns[groupIndex].lesson}${startingRows[year][i] + j}`
        ]?.v
      const teacher2 =
        workbooks[year][1][
          `${startingColumns[groupIndex].teacher}${startingRows[year][i] + j}`
        ]?.v
      const classRoom2 =
        workbooks[year][1][
          `${startingColumns[groupIndex].classRoom}${startingRows[year][i] + j}`
        ]?.v

      if (year == 0) {
        year1.schedule1[group][Object.keys(year1.schedule1[group])[i]].push({
          lesson: lesson1 ? lesson1 : "",
          teacher: teacher1 ? teacher1 : "",
          classRoom: classRoom1 ? classRoom1 : ""
        })
        year1.schedule2[group][Object.keys(year1.schedule2[group])[i]].push({
          lesson: lesson2 ? lesson2 : "",
          teacher: teacher2 ? teacher2 : "",
          classRoom: classRoom2 ? classRoom2 : ""
        })
      } else {
        year2.schedule1[group][Object.keys(year2.schedule1[group])[i]].push({
          lesson: lesson1 ? lesson1 : "",
          teacher: teacher1 ? teacher1 : "",
          classRoom: classRoom1 ? classRoom1 : ""
        })
        year2.schedule2[group][Object.keys(year2.schedule2[group])[i]].push({
          lesson: lesson2 ? lesson2 : "",
          teacher: teacher2 ? teacher2 : "",
          classRoom: classRoom2 ? classRoom2 : ""
        })
      }
    }
  }
}

const uploadDb = async (schedule1, schedule2, year) => {
  await setDoc(doc(db, `year${year}`, "schedule1"), {
    ...schedule1
  })
  await setDoc(doc(db, `year${year}`, "schedule2"), {
    ...schedule2
  })
}

for (let i = 0; i < 2; i++) {
  for (let j = 0; j < 7; j++) {
    addToDb(i, groups[i][j], j)
  }
}

uploadDb(year1.schedule1, year1.schedule2, "1")
uploadDb(year2.schedule1, year2.schedule2, "2")

// !!TO REFACTOR!!
