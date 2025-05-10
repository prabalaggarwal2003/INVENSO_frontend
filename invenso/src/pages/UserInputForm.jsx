
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// function UserInputForm() {
//   const [message, setMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const { equipmentType, equipmentId } = useParams();
//   const [newIssue, setNewIssue] = useState("");
//   const [equipmentData, setEquipmentData] = useState(null);

//   // Fetch existing equipment data on load
//   useEffect(() => {
//     axios.get(`http://localhost:3000/assetManagement/equipment/${equipmentId}`)
//       .then((response) => {
//         setEquipmentData(response.data);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Failed to fetch equipment data:", error);
//         setMessage("Failed to load equipment data.");
//         setIsLoading(false);
//       });
//   }, [equipmentId]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!newIssue.trim()) return;

//     const timestamp = new Date().toISOString();
//     const updatedHistory = equipmentData.issueHistory 
//       ? `${equipmentData.issueHistory}\n\n[${timestamp}]: ${newIssue}`
//       : `[${timestamp}]: ${newIssue}`;

//     axios.put(
//       `http://localhost:3000/assetManagement/equipment/${equipmentId}`,
//       { ...equipmentData, issueHistory: updatedHistory }
//     )
//       .then(() => {
//         setMessage("Issue Reported !");
//         setNewIssue("");
//         // Refresh data to show the update
//         return axios.get(`http://localhost:3000/assetManagement/equipment/${equipmentId}`);
//       })
//       .then((response) => setEquipmentData(response.data))
//       .catch((error) => {
//         console.error("Submission failed:", error);
//         setMessage("Failed to report issue.");
//       });
//   };

//   if (isLoading) return <div>Loading equipment data...</div>;
//   if (!equipmentData) return <div>Equipment not found.</div>;

//   return (
//     <div className="flex flex-col items-center mt-20">
//       <h2 className="text-2xl mb-4">
//         Submit Report for {equipmentType} (ID: {equipmentId})
//       </h2>
      
//       {/* Current Issue History (Read-only) */}
//       <div className="mb-6 w-full max-w-2xl">
//         <h3 className="font-semibold mb-2">Existing Issue History:</h3>
//         <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">
//           {equipmentData.issueHistory || "No issues recorded yet."}
//         </pre>
//       </div>

//       {/* Form to Add New Issues */}
//       <form onSubmit={handleSubmit} className="w-full max-w-2xl">
//         <textarea
//           value={newIssue}
//           onChange={(e) => setNewIssue(e.target.value)}
//           placeholder="Describe the issue..."
//           className="border p-2 rounded w-full mb-4 h-32"
//           required
//         />
//         <button
//           type="submit"
//           className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Submit Report
//         </button>
//       </form>

//       {message && (
//         <div className={`mt-4 ${message.includes("Failed") ? "text-red-600" : "text-green-600"}`}>
//           {message}
//         </div>
//       )}
//     </div>
//   );
// }

// export default UserInputForm;
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function UserInputForm() {
  const { equipmentId } = useParams();
  const [equipment, setEquipment] = useState(null);
  const [issueDesc, setIssueDesc] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch equipment data
  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/assetManagement/equipment/${equipmentId}`
        );
        setEquipment(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setMessage("Failed to load equipment data");
      }
    };
    fetchEquipment();
  }, [equipmentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!issueDesc.trim() || !equipment || isSubmitting) return;

    setIsSubmitting(true);
    const timestamp = new Date().toISOString();
    const formattedIssue = `[${timestamp}]: ${issueDesc}`;

    try {
      // 1. Create new issue in issues table
      await axios.post("http://localhost:3000/assetManagement/issue", {
        Location: equipment.Location,
        equipmentType: equipment.equipmentType,
        warranty: equipment.warranty,
        purchaseDate: equipment.purchaseDate,
        issueHistory: formattedIssue,
        condition: equipment.condition,
        qrCode: equipment.qrCode,
        isActive: true,
      });

      // 2. Update equipment's issueHistory using PUT
      const updatedEquipment = {
        ...equipment,
        issueHistory: equipment.issueHistory
          ? `${equipment.issueHistory}\n\n${formattedIssue}`
          : formattedIssue,
      };

      await axios.put(
        `http://localhost:3000/assetManagement/equipment/${equipmentId}`,
        updatedEquipment
      );

      // Refresh data
      const res = await axios.get(
        `http://localhost:3000/assetManagement/equipment/${equipmentId}`
      );
      setEquipment(res.data);
      setIssueDesc("");
      setMessage("Issue logged and equipment updated successfully!");
    } catch (err) {
      console.error("Operation failed:", err.response?.data || err);
      setMessage(
        `Error: ${err.response?.data?.message || "Failed to update records"}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!equipment) return <div className="p-4">Loading equipment data...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Issue Management for {equipment.equipmentType}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Issues */}
        <div className="border rounded-lg p-4 bg-white shadow">
          <h2 className="font-semibold text-lg mb-3">Issue History</h2>
          <div className="bg-gray-50 p-3 rounded whitespace-pre-wrap h-64 overflow-y-auto">
            {equipment.issueHistory || "No issues recorded yet"}
          </div>
        </div>

        {/* New Issue Form */}
        <div className="border rounded-lg p-4 bg-white shadow">
          <h2 className="font-semibold text-lg mb-3">Log New Issue</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={issueDesc}
              onChange={(e) => setIssueDesc(e.target.value)}
              placeholder="Describe the issue..."
              className="border p-3 rounded w-full h-40 focus:ring-2 focus:ring-blue-500"
              required
              disabled={isSubmitting}
            />
            <button
              type="submit"
              className={`w-full py-2 px-4 rounded text-white ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Submit Issue"}
            </button>
          </form>
        </div>
      </div>

      {/* Status Message */}
      {message && (
        <div
          className={`mt-6 p-3 rounded-lg text-center ${
            message.includes("Error") || message.includes("Failed")
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}

export default UserInputForm;