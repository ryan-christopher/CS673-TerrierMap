"use client"

import { useState, useEffect } from 'react'
import db from '../app/utils/firestore'
import { collection, getDocs } from 'firebase/firestore'

const Items = () => {
    const [items, setItems] = useState([])

    useEffect(() => {
        const fetchItems = async () => {
            const querySnapshot = await getDocs(collection(db, 'classrooms'))
            setItems(querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }
        fetchItems()
    }, [])

    return (
        <div>
            <h2>Buildings</h2>
            <ul>
                {items.map((item) => {
                    return <li key={item.id}>
                        {item.building_name}
                    </li>
                })}
            </ul>
        </div>
    )
}

export default Items