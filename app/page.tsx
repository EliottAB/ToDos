import { Fragment } from "react"
import { Header } from "./components/Header"
import { Todos } from "./components/Todos"
import "./css/pages/home.css"

export default function Home() {
  return (
    <Fragment>
      <Header/>
      <main className="home-main">
        <Todos/>
      </main>
    </Fragment>
  )
}