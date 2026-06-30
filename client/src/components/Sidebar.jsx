import { NavLink } from "react-router-dom";
import {
  FaBook,
  FaBrain,
  FaProjectDiagram,
  FaFileAlt,
  FaQuestionCircle,
  FaChartLine,
  FaGraduationCap,
  FaBookOpen,
  FaUsers,
} from "react-icons/fa";

const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: <FaChartLine />,
  },
  {
    name: "Study Materials",
    path: "/study-materials",
    icon: <FaBook />,
  },
  {
    name: "Flashcards",
    path: "/flashcards",
    icon: <FaBrain />,
  },
  {
    name: "Mind Maps",
    path: "/mind-maps",
    icon: <FaProjectDiagram />,
  },
  {
    name: "Formula Sheets",
    path: "/formula-sheets",
    icon: <FaFileAlt />,
  },
  {
    name: "Quiz",
    path: "/quiz",
    icon: <FaQuestionCircle />,
  },
  {
    name: "Performance",
    path: "/performance",
    icon: <FaChartLine />,
  },
  {
    name: "Grade Predictor",
    path: "/grade-predictor",
    icon: <FaGraduationCap />,
  },
  {
    name: "Exam Prep",
    path: "/exam-prep",
    icon: <FaBookOpen />,
  },
  {
    name: "Collaboration",
    path: "/collaboration",
    icon: <FaUsers />,
  },
];

function Sidebar() {
  return (
    <aside className="w-72 bg-indigo-700 text-white min-h-screen p-6 shadow-xl">
      <h1 className="text-2xl font-bold mb-8">
        Study Assistant
      </h1>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition ${
                isActive
                  ? "bg-white text-indigo-700 font-semibold"
                  : "hover:bg-indigo-600"
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;