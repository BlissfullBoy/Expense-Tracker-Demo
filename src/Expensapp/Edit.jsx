import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Edit() {
  let [food, setfood] = useState(null)
  let [price, setprice] = useState(null)
  let [date, setdate] = useState(null)
  let [id, setid] = useState(0)
  let api = "https://664d9c05ede9a2b556541b1f.mockapi.io/raj/File"
  let page = useNavigate()
  function save(a) {
    a.preventDefault()
    axios.put(`${api}/${id}`, { food, price, date }).then(() => {
      window.alert("Your Edit Done")
      page("/")
    })
      .catch((Error) => {
        window.alert(Error)
      })
  }
  useEffect(() => {
    setid(localStorage.getItem("id"))
    setfood(localStorage.getItem("food"))
    setprice(localStorage.getItem("price"))
    setdate(localStorage.getItem("date"))

  }, [])
  function back(a) {
    a.preventDefault()
    page("/")
  }
  return (
    <div className='add'>
      <form action="" onSubmit={save}>
        <h1>Expense Tracker</h1>
        <h2>Edit Expense</h2>
        <input type="text" placeholder='Enter Title' value={food} onChange={(e) => setfood(e.target.value)} required /> <br /> <br />
        <input type="number" placeholder='Enter Price' value={price} onChange={(e) => setprice(e.target.value)} required /> <br /> <br />
        <input type="date" value={date} onChange={(e) => setdate(e.target.value)} required /> <br /><br />
        <div className='btns'>
          <input type="submit" value={"Done"} id='added' />
          <button onClick={back} id='backed'>Back To Home</button>
        </div>
      </form>
    </div>
  )
}
