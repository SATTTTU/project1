"use client"

export const MessageItem = ({ msg, selected, onSelect }) => (
  <div
    className={`p-4 border-b border-gray-100 cursor-pointer transition-all ${
      selected ? "bg-blue-50 border-l-4 border-l-blue-500" : "hover:bg-gray-50 border-l-4 border-l-transparent"
    } ${msg.unread ? "bg-blue-50/40" : ""}`}
    onClick={() => onSelect(msg)}
  >
    <div className="flex items-start">
      <div className="relative">
        <img
          src={msg.avatar || "/placeholder.svg"}
          alt={msg.sender}
          className="w-10 h-10 rounded-full object-cover border border-gray-200"
        />
        {msg.online && (
          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
        )}
      </div>
      <div className="ml-3 flex-1 min-w-0">
        <div className="flex justify-between items-baseline">
          <h3 className="font-medium text-gray-900 truncate">{msg.sender}</h3>
          <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{msg.time}</span>
        </div>
        <p className={`text-sm mt-1 truncate ${msg.unread ? "font-medium text-gray-900" : "text-gray-600"}`}>
          {msg.text}
        </p>
        <div className="flex items-center mt-1">
          <span
            className={`text-xs ${
              msg.role === "Cook" ? "bg-amber-100 text-amber-800" : "bg-purple-100 text-purple-800"
            } px-2 py-0.5 rounded-full`}
          >
            {msg.role}
          </span>
          {msg.unread && <span className="ml-2 h-2 w-2 rounded-full bg-blue-600"></span>}
        </div>
      </div>
    </div>
  </div>
)

