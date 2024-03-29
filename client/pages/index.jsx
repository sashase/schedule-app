import Head from "next/head"
import { useState } from "react"
import Popup from "../components/Popup"

export default function Home() {
  const years = ["I", "II", "II дист.", "III", "IV"]
  const [isOpen, setIsOpen] = useState(false)
  const [yearChosen, setYearChosen] = useState("")

  const handleButtonClick = (e) => {
    setYearChosen(e.target.name)
    setIsOpen(true)
  }

  return (
    <div>
      <Head>
        <title>Schedule</title>
        <meta
          name="description"
          content="Effortless college schedule checking app"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-xs lg:max-w-[80%] sm:max-w-md my-8 mx-auto text-center">
        <h2 className="text-dark dark:text-gray-300 text-3xl">Оберіть курс</h2>
        <div className="flex flex-col items-center gap-5 my-8">
          {years.map((year, key) => {
            return (
              <button
                name={key}
                className="bg-lightGreen dark:bg-darkModeGray text-black dark:text-gray-300 text-2xl w-32 h-14 rounded-full shadow-groups my-2"
                onClick={(e) => handleButtonClick(e)}
                key={key}>
                {year}
              </button>
            )
          })}
        </div>
        <div className={`${isOpen ? "animate-fadein" : ""}`}>
          {isOpen && <Popup setIsOpen={setIsOpen} year={yearChosen} />}
        </div>
      </div>
    </div>
  )
}
