import { useRouter } from "next/router"

export default function Schedule() {
  const route = useRouter()
  return <h1>{route.query.group}</h1>
}
