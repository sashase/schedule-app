import Link from "next/link"

const date = {
  weekDay: new Date().getDay(),
  day: new Date().getDate(),
  month: new Date().getMonth()
}

export let output = {
  weekDay: "",
  day: date.day,
  month: ""
}

switch (date.weekDay) {
  case 1:
    output.weekDay = "Пн"
    break
  case 2:
    output.weekDay = "Вт"
    break
  case 3:
    output.weekDay = "Ср"
    break
  case 4:
    output.weekDay = "Чт"
    break
  case 5:
    output.weekDay = "Пт"
    break
  case 6:
    output.weekDay = "Сб"
    break
  case 7:
    output.weekDay = "Нд"
    break

  default:
    break
}

switch (date.month) {
  case 0:
    output.month = "Січ"
    break
  case 1:
    output.month = "Лют"
    break
  case 2:
    output.month = "Бер"
    break
  case 3:
    output.month = "Квіт"
    break
  case 4:
    output.month = "Трав"
    break
  case 5:
    output.month = "Чер"
    break
  case 6:
    output.month = "Лип"
    break
  case 7:
    output.month = "Сер"
    break
  case 8:
    output.month = "Вер"
    break
  case 9:
    output.month = "Жов"
    break
  case 10:
    output.month = "Лис"
    break
  case 11:
    output.month = "Груд"
    break

  default:
    break
}

export default function Nav() {
  return (
    <div>
      <nav className="flex justify-between items-center my-7">
        <Link href={"/"} className="font-pacifico text-purple text-4xl">
          Scheduler
        </Link>
        <h2 className="text-2xl text-black">
          {output.weekDay}, {output.day} {output.month}.
        </h2>
      </nav>
      <hr className="border-1 border-purple border-opacity-10"/>
    </div>
  )
}
