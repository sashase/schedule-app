import Link from "next/link"

export default function WeekDay(props) {
  return (
    <Link
      href={{
        pathname: "/schedule",
        query: { ...props.query, weekDay: props.weekDay }
      }}
      className={
        props.currentWeekDay == props.weekDay
          ? "text-purple text-3xl"
          : "text-darkGray"
      }>
      {props.weekDayShortName}
    </Link>
  )
}

// weekDay and weekDayShortName are about particular week day that this component displays
// currentWeekDay is current selected week day