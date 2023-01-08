import Head from "next/head"
import Link from "next/link"
import groups from "../modules/groups"
import { currentDate } from "../modules/date"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Schedule</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-xs flex flex-col gap-10 text-center text-black text-4xl m-auto my-10">
        {groups.map((group) => {
          return (
            <Link
              key={group.query}
              className="bg-lightPurple py-6 px-18 rounded-2xl shadow-def"
              href={{
                pathname: "/schedule",
                query: {
                  group: group.query,
                  weekDay: currentDate.weekDay.englishName,
                  day: currentDate.day
                }
              }}>
              {group.name}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
