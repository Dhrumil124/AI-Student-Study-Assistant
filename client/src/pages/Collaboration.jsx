import { useEffect, useState } from "react";

import {
  createGroup,
  getGroups,
  joinGroup,
  leaveGroup,
  deleteGroup,
} from "../services/collaborationService";

function Collaboration() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await getGroups();
      setGroups(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async () => {
    if (!title || !subject || !description) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await createGroup({
        title,
        subject,
        description,
      });

      alert(response.message);

      setTitle("");
      setSubject("");
      setDescription("");

      fetchGroups();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to create study group."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async (id) => {
    try {
      const response = await joinGroup(id);

      alert(response.message);

      fetchGroups();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLeave = async (id) => {
    try {
      const response = await leaveGroup(id);

      alert(response.message);

      fetchGroups();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this study group?")) return;

    try {
      const response = await deleteGroup(id);

      alert(response.message);

      fetchGroups();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8">

      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-8 shadow-xl text-white">

        <h1 className="text-4xl font-bold">
          👥 Study Collaboration
        </h1>

        <p className="mt-2 text-indigo-100">
          Create study groups and collaborate with classmates.
        </p>

      </div>

      {/* Create Group */}

      <div className="mt-10 bg-white rounded-2xl shadow-xl p-8">

        <h2 className="text-2xl font-bold mb-6">
          Create Study Group
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          <input
            type="text"
            placeholder="Group Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="border rounded-lg p-3"
          />

        </div>

        <textarea
          placeholder="Description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded-lg p-3 mt-5"
        />

        <button
          onClick={handleCreate}
          disabled={loading}
          className="mt-6 bg-indigo-700 hover:bg-indigo-800 text-white px-8 py-3 rounded-lg transition"
        >
          {loading ? "Creating..." : "➕ Create Group"}
        </button>

      </div>

      {/* Groups */}

      <div className="mt-10">

        <h2 className="text-2xl font-bold mb-6">
          Available Study Groups
        </h2>

        {groups.length === 0 ? (

          <div className="bg-white rounded-xl shadow-lg p-10 text-center text-gray-500">
            No study groups available.
          </div>

        ) : (

          <div className="grid md:grid-cols-2 gap-6">

            {groups.map((group) => (

              <div
                key={group._id}
                className="bg-white rounded-2xl shadow-lg p-6 border hover:shadow-xl transition"
              >

                <h3 className="text-2xl font-bold text-indigo-700">
                  📚 {group.title}
                </h3>

                <p className="mt-3">
                  <span className="font-semibold">
                    Subject:
                  </span>{" "}
                  {group.subject}
                </p>

                <p className="mt-3 text-gray-700">
                  {group.description}
                </p>

                <p className="mt-4 font-semibold text-purple-700">
                  👥 Members: {group.members.length}
                </p>

                <div className="flex flex-wrap gap-3 mt-6">

                  <button
                    onClick={() => handleJoin(group._id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                  >
                    Join
                  </button>

                  <button
                    onClick={() => handleLeave(group._id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg"
                  >
                    Leave
                  </button>

                  <button
                    onClick={() => handleDelete(group._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Collaboration;