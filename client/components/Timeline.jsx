import { currentDate } from "../modules/date"
import timeOfLessons from "../modules/timeOfLessons.js"

export default function Timeline(props) {
  return (
    <div
      className={`items-center text-center text-lg leading-5 font-bold ${
        props.currentLesson == props.lessonNum &&
        props.currentWeekDay == currentDate.weekDay.englishName
          ? "text-purple"
          : ""
      }`}>
      <p className="w-14">
        {timeOfLessons[props.year - 1][props.lessonNum].start}
        <br />
        <span className="font-normal text-sm">
          {timeOfLessons[props.year - 1][props.lessonNum].end}
        </span>
      </p>
    </div>
  )
}
