"use client"

import { Search } from "lucide-react"
import { MessageItem } from "./messageitem"

export const MessageList = ({ messages, selectedMessage, onSelectMessage }) => (
  <div className="overflow-auto h-[calc(100vh-185px)]">
    {messages.length > 0 ? (
      messages.map((msg) => (
        <MessageItem key={msg.id} msg={msg} selected={selectedMessage?.id === msg.id} onSelect={onSelectMessage} />
      ))
    ) : (
      <div className="p-8 text-center text-gray-500">
        <Search size={36} className="mx-auto mb-2 text-gray-300" />
        <p>No messages found.</p>
      </div>
    )}
  </div>
)

