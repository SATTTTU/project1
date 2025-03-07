
import { useState } from "react"
import { Sidebar } from "./Sidebar/Sidebar"
import { Header } from "./Header/Header"
import { MainContent } from "./Main/MainContent"

export const Layout=()=> {
  const [balance] = useState(12000)
  const [orderItems, setOrderItems] = useState([])

  const addToOrder = (item) => {
    setOrderItems([...orderItems, item])
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* <Sidebar /> */}

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 flex">
          <MainContent onAddToOrder={addToOrder} />
          {/* <Sidebar balance={balance} orderItems={orderItems} /> */}
        </div>
      </div>
    </div>
  )
}

