import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  children: BreadcrumbItem[];
}

const breadcrumbsData: BreadcrumbItem[] = [
  {
    name: "Servers",
    children: [
      {
        name: "Server 1",
        children: [
          { name: "General", children: [] },
          { name: "Random", children: [] },
        ],
      },
      {
        name: "Server 2",
        children: [
          { name: "Announcements", children: [] },
          { name: "General", children: [] },
        ],
      },
    ],
  },
];

function renderBreadcrumbs(items: BreadcrumbItem[], depth = 0) {
  return (
    <ul className={`${depth > 0 ? "ml-4" : ""}`}>
      {items.map((item, index) => (
        <li key={index} className="flex items-center">
          <ChevronRight size={16} className="mr-1" />
          <span className="text-sm font-medium">{item.name}</span>
          {item.children &&
            item.children.length > 0 &&
            renderBreadcrumbs(item.children, depth + 1)}
        </li>
      ))}
    </ul>
  );
}

export default function Breadcrumbs() {
  return (
    <nav className="bg-blue-50 p-4 border-b border-blue-200">
      <div className="flex items-start">
        {renderBreadcrumbs(breadcrumbsData)}
      </div>
    </nav>
  );
}
