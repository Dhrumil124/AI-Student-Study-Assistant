import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMindMap } from "../services/mindMapService";

function MindMaps() {
  const { studyMaterialId } = useParams();

  const [mindMap, setMindMap] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (studyMaterialId) {
      loadMindMap();
    }
  }, [studyMaterialId]);

  const loadMindMap = async () => {
    try {
      setLoading(true);

      const response = await getMindMap(studyMaterialId);

      setMindMap(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!studyMaterialId) {
    return (
      <div className="max-w-6xl mx-auto py-20 text-center">
        <h1 className="text-5xl font-bold text-indigo-700">
          🗺 AI Mind Maps
        </h1>

        <p className="mt-5 text-lg text-gray-600">
          Go to <span className="font-semibold">Study Materials</span> and click
          <span className="text-indigo-700 font-semibold">
            {" "}Generate Mind Map
          </span>.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-20">

        <div className="w-14 h-14 mx-auto rounded-full border-4 border-indigo-200 border-t-indigo-700 animate-spin"></div>

        <p className="mt-5 text-xl font-semibold">
          Generating AI Mind Map...
        </p>

      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8">

      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 rounded-3xl shadow-xl p-8 text-white">

        <h1 className="text-4xl font-bold">
          🗺 AI Mind Map
        </h1>

        <p className="mt-3 text-indigo-100">
          AI Generated Hierarchical Visualization
        </p>

      </div>

      {!mindMap ? (

        <div className="mt-10 bg-white rounded-3xl shadow-lg p-12 text-center text-gray-500">
          No Mind Map Found.
        </div>

      ) : (

        <div className="mt-10 bg-white rounded-3xl shadow-xl border border-gray-200 p-10">

          <div className="bg-indigo-50 rounded-2xl p-8 border-l-8 border-indigo-600">

            <pre className="whitespace-pre-wrap overflow-x-auto font-mono text-[17px] leading-10 text-gray-800">
              {mindMap.content}
            </pre>

          </div>

        </div>

      )}

    </div>
  );
}

export default MindMaps;