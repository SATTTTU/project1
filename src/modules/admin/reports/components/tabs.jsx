"use client"

import { Coffee, MessageSquare, Users } from "lucide-react"

export const Tabs = ({ selectedTab, setSelectedTab, messagesCount, onTabChange }) => {
  const tabs = ["All", "Cooks", "Customers"]
  return (
    <div className="flex p-3 bg-gray-50 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`flex-1 px-3 py-2 rounded-md font-medium text-sm transition-all ${
            selectedTab === tab.toLowerCase() ? "bg-white shadow-sm text-blue-600" : "text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => {
            setSelectedTab(tab.toLowerCase())
            onTabChange && onTabChange()
          }}
        >
          {tab === "All" ? (
            <MessageSquare size={16} className="inline mr-1" />
          ) : tab === "Cooks" ? (
            <Coffee size={16} className="inline mr-1" />
          ) : (
            <Users size={16} className="inline mr-1" />
          )}
          {tab}
          <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
            {messagesCount[tab.toLowerCase()] || 0}
          </span>
        </button>
      ))}
    </div>
  )
}

