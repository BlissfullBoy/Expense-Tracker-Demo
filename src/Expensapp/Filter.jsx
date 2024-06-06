import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Filter() {
    const [search, setSearch] = useState("");
    const [view, setView] = useState([]);
    const [filteredView, setFilteredView] = useState([]);
    const [budget, setbudget] = useState("")
    const api = "https://664d9c05ede9a2b556541b1f.mockapi.io/raj/File";
    const navigate = useNavigate();
    const page = useNavigate();
    useEffect(() => {
        axios.get(api)
            .then((file) => {
                setView(file.data);
                setFilteredView(file.data);
            })
            .catch((error) => {
                alert(error);
            });
    }, []);
    useEffect(() => {
        const filtered = view.filter(expen =>
            expen.food.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredView(filtered);
    }, [search, view]);
    function addbtn() {
        navigate("/Add");
    }

    function del(id) {
        axios.delete(`${api}/${id}`)
            .then(() => {
                window.alert("Your Order Delete");
                axios.get(api)
                    .then((file) => {
                        setView(file.data);
                    });
            })
            .catch((error) => {
                alert(error);
            });
    }
    function ed(id, food, price, date) {
        localStorage.setItem("id", id)
        localStorage.setItem("food", food)
        localStorage.setItem("price", price)
        localStorage.setItem("date", date)
        page("/ed")
    }

    const totalSpent = filteredView.reduce((total, item) => total + parseFloat(item.price), 0);
    const totalExpenses = filteredView.length;
    const remaining = budget - totalSpent
    return (
        <div>
            <div className='top'>
                <div className='search'>
                    <h1>EXPENSE TRACKER</h1>
                    <input
                        type="text"
                        placeholder='Search Expense'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} />
                    <button><i className="fa-solid fa-magnifying-glass"></i></button>
                </div>
                <div className='budget'>
                    <input type="number" placeholder="Enter Your Amount" value={budget} onChange={(e) => setbudget(e.target.value)} required />
                    <h1>MY BUDGET:{budget}</h1>
                </div>
            </div>
            <div className='spent'>
                <h1>REMAINING:{remaining}</h1>
            </div>
            <div className='spent'>
                <h3>You've spent ${totalSpent.toFixed(2)}</h3>
                <h3>in a total of {totalExpenses} expense{totalExpenses !== 1 ? 's' : ''}</h3>
            </div>

            <div className='order'>
                {filteredView.map((item) => (
                    <div key={item.id} className='expense'>
                        <h1>{item.food}</h1>
                        <p>{item.date}</p>
                        <p>${item.price}</p>
                        <button onClick={() => del(item.id)} id='del'><i className="fa-solid fa-trash"></i></button>
                        <button onClick={() => ed(item.id, item.food, item.price, item.date)}><i className="fa-solid fa-pen-to-square" id='ed'></i></button>
                    </div>
                ))}
            </div>
            <button id='add' onClick={addbtn}><i className="fa-solid fa-plus fa-1xl"></i></button>
        </div>
    );
}
