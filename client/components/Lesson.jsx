export default function Lesson(props) {
  return (
    <div
      className={
        props.lesson
          ? "flex flex-col justify-between shadow-def rounded-3xl py-3 px-5 min-h-[100px]"
          : "flex flex-col bg-grayPurple shadow-def rounded-3xl py-3 px-5 min-h-[5.5rem]"
      }>
      {props.lesson ? (
        <h3 className="text-lg m-auto font-bold">{props.lesson}</h3>
      ) : (
        <h3 className="text-2xl m-auto text-gray font-bold">Немає пари</h3>
      )}
      <div className="flex justify-between">
        <p className="text-gray text-sm">{props.teacher}</p>
        <p className="text-gray text-sm">{props.classRoom}</p>
      </div>
    </div>
  )
}
