import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getFormulaSheet } from "../services/formulaSheetService";

function FormulaSheets() {

  const { studyMaterialId } = useParams();

  const [formulaSheet, setFormulaSheet] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (studyMaterialId) {
      loadFormulaSheet();
    }

  }, [studyMaterialId]);

  const loadFormulaSheet = async () => {

    try {

      setLoading(true);

      const response = await getFormulaSheet(studyMaterialId);

      setFormulaSheet(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  if (!studyMaterialId) {

    return (

      <div className="max-w-5xl mx-auto py-20 text-center">

        <h1 className="text-4xl font-bold text-cyan-700">
          📑 Formula Sheets
        </h1>

        <p className="mt-5 text-lg text-gray-600">
          Generate a Formula Sheet from the
          <span className="font-semibold">
            {" "}Study Materials
          </span>
          {" "}page.
        </p>

      </div>

    );

  }

  if (loading) {

    return (

      <div className="text-center py-20">

        <div className="w-14 h-14 mx-auto rounded-full border-4 border-cyan-200 border-t-cyan-700 animate-spin"></div>

        <p className="mt-5 text-xl font-semibold">
          Generating Formula Sheet...
        </p>

      </div>

    );

  }

  return (

    <div className="max-w-6xl mx-auto py-8">

      <div className="bg-gradient-to-r from-cyan-600 to-blue-700 rounded-3xl p-8 shadow-xl text-white">

        <h1 className="text-4xl font-bold">
          📑 Formula Sheet
        </h1>

        <p className="mt-2 text-cyan-100">
          AI Generated Quick Revision Notes
        </p>

      </div>

      {!formulaSheet ? (

        <div className="mt-8 bg-white rounded-2xl shadow-lg p-10 text-center text-gray-500">
          No Formula Sheet Found.
        </div>

      ) : (

       <div className="mt-8 bg-white rounded-2xl shadow-xl border p-8">

  <pre className="whitespace-pre-wrap font-sans text-[16px] leading-8 text-gray-800">
    {formulaSheet.content}
  </pre>

</div>

      )}

    </div>

  );

}

export default FormulaSheets;