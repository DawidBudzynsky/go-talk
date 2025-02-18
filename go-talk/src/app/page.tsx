import { useState } from "react"
import Sidebar from "@/components/sidebar"
import ChannelList from "@/components/channel-list"
import ChatArea from "@/components/chat-area"

interface Channel {
  id: number
  name: string
  type: "text" | "voice"
}

interface Server {
  id: number
  name: string
  color: string
  channels: Channel[]
}

interface Message {
  id: number
  author: string
  content: string
}

export default function Home() {
  const [servers, setServers] = useState<Server[]>([
    {
      id: 1,
      name: "Server 1",
      color: "bg-blue-100",
      channels: [
        { id: 1, name: "general", type: "text" },
        { id: 2, name: "voice", type: "voice" },
      ],
    },
    {
      id: 2,
      name: "Server 2",
      color: "bg-green-100",
      channels: [
        { id: 1, name: "announcements", type: "text" },
        { id: 2, name: "chat", type: "text" },
      ],
    },
  ])
  const [currentServer, setCurrentServer] = useState<Server>(servers[0])
  const [currentChannel, setCurrentChannel] = useState<Channel>(servers[0].channels[0])
  const [messages, setMessages] = useState<{ [key: string]: Message[] }>({
    "Server 1-general": [
      { id: 1, author: "User1", content: "Hello, Server 1 general!" },
      { id: 2, author: "User2", content: "Hi there! How are you?" },
    ],
    "Server 1-voice": [],
    "Server 2-announcements": [{ id: 1, author: "Admin", content: "Welcome to Server 2!" }],
    "Server 2-chat": [{ id: 1, author: "User3", content: "Hey everyone, how's it going?" }],
  })

  const handleServerChange = (serverName: string) => {
    const newServer = servers.find((s) => s.name === serverName) || servers[0]
    setCurrentServer(newServer)
    setCurrentChannel(newServer.channels[0])
  }

  const handleChannelChange = (channelName: string) => {
    const newChannel = currentServer.channels.find((c) => c.name === channelName) || currentServer.channels[0]
    setCurrentChannel(newChannel)
  }

  const addChannel = (newChannel: Channel) => {
    const updatedServers = servers.map((server) =>
      server.id === currentServer.id ? { ...server, channels: [...server.channels, newChannel] } : server,
    )
    setServers(updatedServers)
    setCurrentServer(updatedServers.find((s) => s.id === currentServer.id)!)
  }

  const addMessage = (message: Message) => {
    const key = `${currentServer.name}-${currentChannel.name}`
    setMessages((prevMessages) => ({
      ...prevMessages,
      [key]: [...(prevMessages[key] || []), message],
    }))
  }

  return (
    <main className="flex h-screen bg-gray-100 p-4 gap-4">
      <Sidebar servers={servers} setCurrentServer={handleServerChange} />
      <ChannelList currentServer={currentServer} setCurrentChannel={handleChannelChange} addChannel={addChannel} />
      <ChatArea
        currentServer={currentServer}
        currentChannel={currentChannel}
        messages={messages[`${currentServer.name}-${currentChannel.name}`] || []}
        addMessage={addMessage}
      />
    </main>
  )
}

