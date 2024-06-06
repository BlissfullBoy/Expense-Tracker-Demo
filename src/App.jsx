import './App.css'
import Add from './Expensapp/Add'
import { Route, Routes } from 'react-router-dom'
import Filter from './Expensapp/Filter'
import Edit from './Expensapp/Edit'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/Add' element={<Add></Add>} />
        <Route path="/" element={<Filter></Filter>} />
        <Route path='/ed' element={<Edit></Edit>} />
      </Routes>
    </div>
  )
}

export default App
