const xlsx = require("xlsx")

const file = xlsx.readFile("./file.xlsx")

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
  },
}

const kp21 = schedule[Object.keys(schedule)[0]]
const startRow = [16, 22, 28, 34, 40]


for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 6; j++) {
    const lessonKp = workbook[`D${startRow[i]+j}`]?.v
    const lessonIpz = workbook[`N${startRow[i]+j}`]?.v
    schedule.kp21[Object.keys(kp21)[i]]?.push(lessonKp ? lessonKp : "no lesson")
    schedule.ipz21[Object.keys(kp21)[i]]?.push(lessonIpz ? lessonIpz : "no lesson")
  }
}
console.log("KP21: ");
console.log(schedule.kp21)
console.log("IPZ21: ")
console.log(schedule.ipz21);