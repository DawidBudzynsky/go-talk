import { Home } from "lucide-react";

interface Server {
  id: number;
  name: string;
  color: string;
}

interface SidebarProps {
  servers: Server[];
  setCurrentServer: (serverName: string) => void;
}

export default function Sidebar({ servers, setCurrentServer }: SidebarProps) {
  return (
    <div className="w-24 bg-white p-4 flex flex-col items-center gap-4 rounded-2xl shadow-lg">
      <button
        className="w-16 h-16 rounded-xl bg-blue-200 flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
        onClick={() => setCurrentServer("Home")}
      >
        <Home className="text-gray-600" />
      </button>
      {servers.map((server) => (
        <button
          key={server.id}
          className={`w-16 h-16 rounded-xl ${server.color} flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all`}
          onClick={() => setCurrentServer(server.name)}
        >
          <span className="text-gray-600 font-bold">{server.name[7]}</span>
        </button>
      ))}
    </div>
  );
}
