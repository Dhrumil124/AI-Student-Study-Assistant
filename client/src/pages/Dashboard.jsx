import { Link } from "react-router-dom";
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

function Dashboard() {
  const cards = [
    {
      title: "Study Materials",
      icon: <FaBook size={28} />,
      color: "from-green-500 to-green-700",
      path: "/study-materials",
    },
    {
      title: "Flashcards",
      icon: <FaBrain size={28} />,
      color: "from-indigo-500 to-indigo-700",
      path: "/flashcards",
    },
    {
      title: "Mind Maps",
      icon: <FaProjectDiagram size={28} />,
      color: "from-purple-500 to-purple-700",
      path: "/mind-maps",
    },
    {
      title: "Formula Sheets",
      icon: <FaFileAlt size={28} />,
      color: "from-cyan-500 to-cyan-700",
      path: "/formula-sheets",
    },
    {
      title: "Quiz",
      icon: <FaQuestionCircle size={28} />,
      color: "from-orange-500 to-orange-700",
      path: "/quiz",
    },
    {
      title: "Performance",
      icon: <FaChartLine size={28} />,
      color: "from-blue-500 to-blue-700",
      path: "/performance",
    },
    {
      title: "Grade Predictor",
      icon: <FaGraduationCap size={28} />,
      color: "from-pink-500 to-pink-700",
      path: "/grade-predictor",
    },
    {
      title: "Exam Preparation",
      icon: <FaBookOpen size={28} />,
      color: "from-red-500 to-red-700",
      path: "/exam-prep",
    },
    {
      title: "Collaboration",
      icon: <FaUsers size={28} />,
      color: "from-teal-500 to-teal-700",
      path: "/collaboration",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-8">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 rounded-3xl text-white p-10 shadow-xl">

        <h1 className="text-5xl font-bold">
          🎓 AI Student Study Assistant
        </h1>

        <p className="mt-4 text-xl text-indigo-100">
          Your complete AI-powered learning companion for smarter studying,
          exam preparation, performance tracking, and academic success.
        </p>

      </div>

      {/* Features */}

      <h2 className="text-3xl font-bold mt-12 mb-8">
        Explore Features
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {cards.map((card) => (

          <Link
            key={card.title}
            to={card.path}
            className={`bg-gradient-to-r ${card.color} rounded-2xl p-8 text-white shadow-lg hover:scale-105 transition duration-300`}
          >

            <div className="flex items-center justify-between">

              <h3 className="text-2xl font-bold">
                {card.title}
              </h3>

              {card.icon}

            </div>

            <p className="mt-6 text-white/90">
              Open {card.title}
            </p>

          </Link>

        ))}

      </div>

      {/* Quick Actions */}

      <div className="mt-14 bg-white rounded-3xl shadow-xl p-8">

        <h2 className="text-3xl font-bold mb-6">
          🚀 Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">

          <Link
            to="/study-materials"
            className="bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-3 rounded-xl"
          >
            Upload Study Material
          </Link>

          <Link
            to="/quiz"
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl"
          >
            Take Quiz
          </Link>

          <Link
            to="/performance"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
          >
            View Performance
          </Link>

          <Link
            to="/grade-predictor"
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-xl"
          >
            Predict Grade
          </Link>

        </div>

      </div>

      {/* About */}

      <div className="mt-14 bg-white rounded-3xl shadow-xl p-8">

        <h2 className="text-3xl font-bold mb-6">
          📖 About This Platform
        </h2>

        <p className="text-lg text-gray-700 leading-8">

          AI Student Study Assistant is an intelligent learning platform
          designed to improve academic performance using Artificial Intelligence.

          Students can upload study materials, generate AI-powered flashcards,
          create mind maps, prepare formula sheets, practice quizzes,
          analyze their performance, predict final grades, prepare for exams,
          and collaborate with classmates—all in one place.

        </p>

      </div>

    </div>
  );
}

export default Dashboard;