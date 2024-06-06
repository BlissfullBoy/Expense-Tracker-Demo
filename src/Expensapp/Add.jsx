import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Add() {
  let [food, setfood] = useState("")
  let [price, setprice] = useState("")
  let [date, setdate] = useState("")
  let api = "https://664d9c05ede9a2b556541b1f.mockapi.io/raj/File"
  let page = useNavigate()
  function Add(e) {
    e.preventDefault()
    axios.post(api, { food, price, date, }).then(() => {
      window.alert("Your Order Added")
      setfood("")
      setprice("")
      setdate("")
      page("/")
      window.location.reload()
    })
      .catch((Error) => {
        window.alert(Error)

      })
  }
  function back(a) {
    a.preventDefault()
    page("/")
  }
  return (
    <div className='add'>
      <form action="" onSubmit={Add}>
        <h1>Expense Tracker</h1>
        <h2>Add Expense</h2>
        <input type="text" placeholder='Enter Title' value={food} onChange={(e) => setfood(e.target.value)} required /> <br /> <br />
        <input type="number" placeholder='Enter Price' value={price} onChange={(e) => setprice(e.target.value)} required /> <br /> <br />
        <input type="date" value={date} onChange={(e) => setdate(e.target.value)} required /> <br /><br />
        <div className='btns'>
          <input type="submit" value={"Add"} id='added' />
          <button onClick={back} id='backed'>Back To Home</button>
        </div>
      </form>
    </div>
  )
}
