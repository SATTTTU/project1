import React, { useState } from 'react'
import { useFetchOrder } from '../api/getorder'

 export const OrderListPage = () => {
    const [value,setValue]=useState([]);
     const {data}=useFetchOrder()
        console.log(data)
        setValue(data)
  return (
    value.map((item)=>(
        <div key={item.id}>
            <h1>{item.id}</h1>
            <h1>{item.name}</h1>
            <h1>{item.price}</h1>
            <h1>{item.status}</h1>
        </div>
    ))
    
  )
}
