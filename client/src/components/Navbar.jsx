import { FaBell, FaUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    <header className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <h2 className="text-2xl font-bold text-gray-800">
        AI Student Study Assistant
      </h2>

      <div className="flex items-center gap-6">
        <FaBell className="text-2xl text-gray-600 cursor-pointer" />

        <div className="flex items-center gap-2">
          <FaUserCircle className="text-4xl text-indigo-700" />

          <div>
            <p className="font-semibold">Student</p>
            <p className="text-sm text-gray-500">
              Welcome Back
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;