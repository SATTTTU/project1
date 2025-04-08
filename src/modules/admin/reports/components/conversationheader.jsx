"use client"

import { Menu, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const ConversationHeader = ({ message, toggleSidebar }) => {
  const navigate = useNavigate()

  return (
    <div className="p-4 border-b border-gray-200 bg-white z-10 flex items-center">
      {/* Back Arrow */}
      <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 mr-2" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} />
      </button>

      <div className="relative">
        <img
          src={message.avatar || ""}
          alt={message.sender}
          className="w-10 h-10 rounded-full object-cover border border-gray-200"
        />
        {message.online && (
          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
        )}
      </div>

      <div className="ml-3">
        <h2 className="font-semibold text-gray-900">{message.sender}</h2>
        <div className="flex items-center">
          <span
            className={`text-xs ${
              message.role === "Cook" ? "bg-amber-100 text-amber-800" : "bg-purple-100 text-purple-800"
            } px-2 py-0.5 rounded-full`}
          >
            {message.role}
          </span>
          <span className="mx-2 text-xs text-gray-500">•</span>
          <span className="text-xs text-gray-500">{message.online ? "Online" : "Last seen: " + message.time}</span>
        </div>
      </div>

      <div className="ml-auto flex space-x-2">
        <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 md:hidden" onClick={toggleSidebar}>
          <Menu size={18} />
        </button>
      </div>
    </div>
  )
}

