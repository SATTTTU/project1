import { CheckCircle, User } from "react-feather";
import { ChatInput } from "./chat-input";

 export const Conversation = ({ conversation, message, replyText, setReplyText }) => (
    <>
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          {/* Date separator */}
          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-3 text-xs text-gray-500 bg-gray-50">
              {message.time.includes("day") ? message.time : "Today"}
            </span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>
  
          {conversation.map((msg, idx) => (
            <div key={msg.id} className={`mb-4 flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
              {!msg.isUser && (
                <div className="mr-3 flex-shrink-0">
                  <img
                    src={message.avatar}
                    alt={msg.sender}
                    className="w-8 h-8 rounded-full border border-gray-200"
                  />
                </div>
              )}
              <div
                className={`max-w-md rounded-lg p-3 ${
                  msg.isUser
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 shadow-sm rounded-bl-none"
                }`}
              >
                {!msg.isUser && <div className="font-medium text-sm text-gray-700 mb-1">{msg.sender}</div>}
                <p className="text-sm">{msg.text}</p>
                <div className={`mt-1 text-xs flex justify-end ${msg.isUser ? "text-blue-100" : "text-gray-500"}`}>
                  {msg.time}
                  {msg.isUser && idx === conversation.length - 1 && (
                    <CheckCircle size={12} className="ml-1 text-blue-100" />
                  )}
                </div>
              </div>
            </div>
          ))}
  
          {/* Optional sending indicator */}
          {message.id === 2 && (
            <div className="flex justify-start mb-4 opacity-70">
              <div className="mr-3 flex-shrink-0">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User size={16} className="text-gray-500" />
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm max-w-md">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 rounded-full bg-gray-300 animate-bounce"></div>
                  <div className="h-2 w-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  <div className="h-2 w-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ChatInput replyText={replyText} setReplyText={setReplyText} />
    </>
  );