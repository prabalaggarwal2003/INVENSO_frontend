import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function UserInputForm() {
  const { equipmentId } = useParams();
  const [equipment, setEquipment] = useState(null);
  const [issueDesc, setIssueDesc] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [username, setUsername] = useState("");
  const [enrollmentNo, setenrollmentNo] = useState("");
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

  const canSubmit = () => {
    const last = localStorage.getItem("lastSubmissionTime");
    const now = Date.now();
    const limit = 10 * 60 * 1000; // 10 minutes in milliseconds

    if (last && now - Number(last) < limit) {
      const remaining = Math.ceil((limit - (now - Number(last))) / 60000);
      alert(`You can submit a new report in ${remaining} minute(s).`);
      return false;
    }

    localStorage.setItem("lastSubmissionTime", now.toString());
    return true;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit()) return;
    if (!issueDesc.trim() || !equipment || isSubmitting) return;

    setIsSubmitting(true);
    const timestamp = new Date().toISOString();
    const formattedIssue = `[${timestamp}]: ${issueDesc}`;

    try {
      // 1. Create new issue in issues table
      // await axios.post("http://localhost:3000/assetManagement/issue", {
      //   username: username,
      //   enrollmentNo: enrollmentNo,
      //   Location: equipment.Location,
      //   equipmentType: equipment.equipmentType,
      //   warranty: equipment.warranty,
      //   purchaseDate: equipment.purchaseDate,
      //   issueHistory: formattedIssue,
      //   condition: equipment.condition,
      //   isActive: true,
      //   Status: "PENDING"
      // });
      console.log("Sending issue payload:", {
  username,
  enrollmentNo,
  Location: equipment.Location,
  equipmentType: equipment.equipmentType,
  warranty: equipment.warranty,
  purchaseDate: equipment.purchaseDate,
  issueHistory: formattedIssue,
  condition: equipment.condition,
  qrCode: equipment.qrCode,
  isActive: true,
  Status: "PENDING"
});

      await axios.post("http://localhost:3000/assetManagement/issue", {
  username: username,
  enrollmentNo: enrollmentNo,
  Location: equipment.Location,
  equipmentType: equipment.equipmentType,
  warranty: equipment.warranty,
  purchaseDate: equipment.purchaseDate,
  issueHistory: formattedIssue,
  condition: equipment.condition,
  isActive: true,
  Status: "PENDING",
  // 🚫 Do NOT send equipmentId if it's not in the model
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
            <label className="form-label">
            Username:
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e)=>{setUsername(e.target.value)}}
              className="form-input"
              required
            />
          </label>
          <br />
          <label className="form-label">
            EnrollmentNo:
            <input
              type="text"
              name="enrollmentNo"
              value={enrollmentNo}
              onChange={(e)=>{setenrollmentNo(e.target.value)}}
              className="form-input"
              required
            />
          </label>
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