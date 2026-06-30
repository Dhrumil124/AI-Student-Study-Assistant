function UploadMaterialForm({
  title,
  setTitle,
  subject,
  setSubject,
  materialType,
  setMaterialType,
  setFile,
  loading,
  handleUpload,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">

      <h2 className="text-2xl font-bold text-indigo-700 mb-6">
        📚 Upload Study Material
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="font-semibold text-gray-700">
            Title
          </label>

          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div>
          <label className="font-semibold text-gray-700">
            Subject
          </label>

          <input
            type="text"
            placeholder="Enter Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-2 w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div>
          <label className="font-semibold text-gray-700">
            Material Type
          </label>

          <select
            value={materialType}
            onChange={(e) => setMaterialType(e.target.value)}
            className="mt-2 w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option>Notes</option>
            <option>Textbook</option>
            <option>Past Paper</option>
          </select>
        </div>

        <div>
          <label className="font-semibold text-gray-700">
            Upload File
          </label>

          <input
            id="studyFile"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="mt-2 w-full border rounded-lg p-3"
          />
        </div>

      </div>

      <button
        onClick={handleUpload}
        disabled={loading}
        className="mt-8 bg-indigo-700 hover:bg-indigo-800 text-white px-8 py-3 rounded-lg transition"
      >
        {loading ? "Uploading..." : "Upload Material"}
      </button>

    </div>
  );
}

export default UploadMaterialForm;