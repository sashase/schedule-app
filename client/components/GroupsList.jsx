import { currentDate } from "../modules/date"
import Link from "next/link"
import groups from "../modules/groups"

export default function GroupsList(props) {
  return (
    <div className="flex flex-col gap-3 text-center text-black  mx-auto my-10">
      <h2 className="text-3xl">{props.year}</h2>
      <hr className="border-1 border-purple opacity-20"/>
      {props.groups.map((group, key) => {
        return (
          <Link
            key={group.query}
            className="bg-lightPurple text-xl py-3 px-9 rounded-2xl shadow-groups my-2"
            href={{
              pathname: "/schedule",
              query: {
                year: props.yearIndex + 1,
                group: props.yearIndex == 0 ? props.groups[key].query : props.groups[key].query,
                weekDay: currentDate.weekDay.englishName,
                week: "schedule1"
              }
            }}>
            {group.name}
          </Link>
        )
      })}
    </div>
  )
}
