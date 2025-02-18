import type React from "react"
import { useState } from "react"
import { Send, ChevronRight } from "lucide-react"

interface Message {
  id: number
  author: string
  content: string
}

interface Channel {
  id: number
  name: string
  type: "text" | "voice"
}

interface Server {
  id: number
  name: string
  color: string
}

interface ChatAreaProps {
  currentServer: Server
  currentChannel: Channel
  messages: Message[]
  addMessage: (message: Message) => void
}

export default function ChatArea({ currentServer, currentChannel, messages, addMessage }: ChatAreaProps) {
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      addMessage({
        id: messages.length + 1,
        author: "You",
        content: newMessage.trim(),
      })
      setNewMessage("")
    }
  }

  return (
    <div className={`flex-grow flex flex-col ${currentServer.color} rounded-2xl shadow-lg overflow-hidden`}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <span>{currentServer.name}</span>
          <ChevronRight size={16} />
          <span>{currentChannel.name}</span>
        </div>
        <h2 className="text-xl font-bold text-gray-800">Welcome to #{currentChannel.name}</h2>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className="mb-4 p-2 bg-white rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <span className="font-bold text-gray-800">{message.author}: </span>
            <span className="text-gray-700">{message.content}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="p-4 bg-white">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow p-2 rounded-xl bg-gray-100 text-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none transition-all"
          />
          <button
            type="submit"
            className="p-2 rounded-xl bg-blue-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
          >
            <Send size={20} className="text-gray-800" />
          </button>
        </div>
      </form>
    </div>
  )
}

