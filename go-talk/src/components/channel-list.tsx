"use client";

import type React from "react";
import { useState } from "react";
import { Hash, Volume2, Settings, Plus, X } from "lucide-react";

interface Channel {
  id: number;
  name: string;
  type: "text" | "voice";
}

interface Server {
  id: number;
  name: string;
  color: string;
  channels: Channel[];
}

interface ChannelListProps {
  currentServer: Server;
  setCurrentChannel: (channelName: string) => void;
  addChannel: (channel: Channel) => void;
}

export default function ChannelList({
  currentServer,
  setCurrentChannel,
  addChannel,
}: ChannelListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomType, setNewRoomType] = useState<"text" | "voice">("text");

  const handleAddRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRoomName.trim()) {
      const newChannel = {
        id: currentServer.channels.length + 1,
        name: newRoomName.trim(),
        type: newRoomType,
      };
      addChannel(newChannel);
      setNewRoomName("");
      setNewRoomType("text");
      setIsModalOpen(false);
    }
  };

  return (
    <div className="w-64 bg-white p-4 flex flex-col rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          {currentServer.name}
        </h2>
      </div>
      <div className="flex-grow">
        {currentServer.channels.map((channel) => (
          <button
            key={channel.id}
            className={`w-full text-left p-2 rounded-xl flex items-center gap-2 ${currentServer.color} shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all mb-2 text-gray-800`}
            onClick={() => setCurrentChannel(channel.name)}
          >
            {channel.type === "text" ? (
              <Hash size={20} />
            ) : (
              <Volume2 size={20} />
            )}
            {channel.name}
          </button>
        ))}
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full p-2 rounded-xl flex items-center justify-center gap-2 bg-blue-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all text-gray-800 mt-2"
      >
        <Plus size={20} />
        Add Room
      </button>
      <button className="w-full p-2 rounded-xl flex items-center gap-2 bg-green-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all text-gray-800 mt-2">
        <Settings size={20} />
        Settings
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-80">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Add New Room</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddRoom}>
              <div className="mb-4">
                <label
                  htmlFor="roomName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Room Name
                </label>
                <input
                  type="text"
                  id="roomName"
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  className="w-full p-2 rounded-xl bg-gray-100 text-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none transition-all"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="roomType"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Room Type
                </label>
                <select
                  id="roomType"
                  value={newRoomType}
                  onChange={(e) =>
                    setNewRoomType(e.target.value as "text" | "voice")
                  }
                  className="w-full p-2 rounded-xl bg-gray-100 text-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none transition-all"
                >
                  <option value="text">Text Channel</option>
                  <option value="voice">Voice Channel</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full p-2 rounded-xl bg-blue-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all text-gray-800"
              >
                Create Room
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
