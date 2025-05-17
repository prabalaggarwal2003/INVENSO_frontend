// import { useState } from "react";
// import QRGenerator from "./QRGenerator";
// import axios from "axios";

// export default function Furniture() {
//   const [message, setMessage] = useState("");
//   const [showQR, setShowQR] = useState(false);

//   const [formData, setFormData] = useState({
//     equipmentId: 0,
//     Location: "New Building",
//     equipmentType: "Chair",
//     warranty: "true",
//     purchaseDate: "",
//     issueHistory: "",
//     condition: "New",
//     isActive: false,
//     qrCode: "", // initially empty
//   });

//   const handleRefresh = () => {
//     setFormData({
//       equipmentId: 0,
//       Location: "New Building",
//       equipmentType: "Chair",
//       warranty: "true",
//       purchaseDate: "",
//       issueHistory: "",
//       condition: "New",
//       isActive: false,
//       qrCode: "", // reset
//     });
//     setShowQR(false);
//     setMessage("");
//   };

//   const handleChange = (e) => {
//     const { name, value, type } = e.target;

//     let parsedValue = value;
//     if (type === "number") {
//       parsedValue = parseInt(value, 10);
//       if (isNaN(parsedValue)) parsedValue = 0;
//     }

//     setFormData({
//       ...formData,
//       [name]: parsedValue,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     let formattedDate = formData.purchaseDate;

//     // Format the purchase date
//     if (formattedDate) {
//       if (formattedDate.length === 16) {
//         formattedDate += ":00";
//       }
//       formattedDate = new Date(formattedDate).toISOString();
//     }

//     // Generate QR code URL dynamically
//     const qrCodeURL = `bpitindia.invenso.com/${formData.equipmentType}/${formData.equipmentId}`;

//     const updatedFormData = {
//       ...formData,
//       purchaseDate: formattedDate,
//       qrCode: qrCodeURL, // include dynamically generated QR
//     };

//     axios
//       .post("https://invenso-backend.onrender.com/assetManagement/equipment", updatedFormData)
//       .then((response) => {
//         setMessage("Submitted successfully!");
//         setShowQR(true);
//       })
//       .catch((error) => {
//         console.error("Error submitting data:", error);
//         setMessage("Submission failed.");
//       });
//   };

//   return (
//     <div>
//       <div className="flex justify-center">
//         <br />
//         <br />
//         <form onSubmit={handleSubmit} className="form-container">
//           <h2 className="form-title text-xl text-center">Furniture Form</h2>
//           <br />
//           <label className="form-label">
//             Equipment ID:
//             <input
//               type="number"
//               name="equipmentId"
//               value={formData.equipmentId}
//               onChange={handleChange}
//               className="form-input"
//               required
//             />
//           </label>
//           <br />
//           <label className="form-label">
//             Equipment Type:
//             <select
//               name="equipmentType"
//               value={formData.equipmentType}
//               onChange={handleChange}
//               className="form-input-drop"
//             >
//               <option value="select">Select</option>
//               <option value="Desk">Desk</option>
//               <option value="Chair">Chair</option>
//               <option value="Whiteboard">Whiteboard</option>
//             </select>
//           </label>
//           <br />
//           <label className="form-label">
//             Purchase Date:
//             <input
//               type="datetime-local"
//               name="purchaseDate"
//               value={formData.purchaseDate}
//               onChange={handleChange}
//               className="form-input"
//               required
//             />
//           </label>
//           <br />
//           <label className="form-label">
//             Condition:
//             <select
//               name="condition"
//               value={formData.condition}
//               onChange={handleChange}
//               className="form-input-drop"
//             >
//               <option value="New">New</option>
//               <option value="Good">Good</option>
//               <option value="Needs_Repair">Needs Repair</option>
//             </select>
//           </label>
//           <br />
//           <label className="form-label">
//             Location:
//             <input
//               type="text"
//               name="Location"
//               value={formData.Location}
//               onChange={handleChange}
//               className="form-input"
//               required
//             />
//           </label>
//           <br />
//           <br />
//           <button
//             type="submit"
//             className="form-button flex justify-center text-xl border-2 border-black rounded-lg p-2 cursor-pointer"
//           >
//             Submit
//           </button>
//         </form>

//         {showQR && (
//           <QRGenerator
//             equipmentId={formData.equipmentId}
//             equipmentType={formData.equipmentType}
//           />
//         )}
//       </div>
//       <br />
//       <div className="flex justify-center text-xl">
//         <button className="cursor-pointer" onClick={handleRefresh}>
//           Add More
//         </button>
//       </div>
//       {message && (
//         <div className="flex justify-center mt-4 text-lg text-blue-600">
//           {message}
//         </div>
//       )}
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import QRGenerator from "./QRGenerator";
import axios from "axios";

export default function Furniture() {
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  const [message, setMessage] = useState("");
  const [showQR, setShowQR] = useState(false);

  const [formData, setFormData] = useState({
    equipmentId: 0,
    Location: "New Building",
    equipmentType: "select",
    warranty: "true",
    purchaseDate: "",
    issueHistory: "",
    condition: "New",
    isActive: false,
    qrCode: "",
  });

  // Fetch all equipment types and filter "furniture"
  useEffect(() => {
    axios.get("https://invenso-backend.onrender.com/assetManagement/equipmentType")
      .then((res) => {
        const furnitureTypes = res.data.filter(
          (item) => item.Types.toLowerCase() === "furniture"
        );
        setEquipmentTypes(furnitureTypes);
      })
      .catch((err) => console.error("Error fetching equipment types", err));
  }, []);

  const handleRefresh = () => {
    setFormData({
      equipmentId: 0,
      Location: "New Building",
      equipmentType: "select",
      warranty: "true",
      purchaseDate: "",
      issueHistory: "",
      condition: "New",
      isActive: false,
      qrCode: "",
    });
    setShowQR(false);
    setMessage("");
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let parsedValue = value;
    if (type === "number") {
      parsedValue = parseInt(value, 10);
      if (isNaN(parsedValue)) parsedValue = 0;
    }
    setFormData({ ...formData, [name]: parsedValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formattedDate = formData.purchaseDate;
    if (formattedDate && formattedDate.length === 16) {
      formattedDate += ":00";
      formattedDate = new Date(formattedDate).toISOString();
    }

    const qrCodeURL = `bpitindia.invenso.com/${formData.equipmentType}/${formData.equipmentId}`;

    const updatedFormData = {
      ...formData,
      purchaseDate: formattedDate,
      qrCode: qrCodeURL,
    };

    axios.post("https://invenso-backend.onrender.com/assetManagement/equipment", updatedFormData)
      .then(() => {
        setMessage("Submitted successfully!");
        setShowQR(true);
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        setMessage("Submission failed.");
      });
  };

  return (
    <div className="p-4">
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <h2 className="text-xl font-bold text-center mb-6">Furniture Form</h2>
          
          <div className="space-y-2">
            <label className="block">
              Equipment ID:
              <input 
                type="number" 
                name="equipmentId" 
                value={formData.equipmentId} 
                onChange={handleChange} 
                className="w-full p-2 border rounded mt-1" 
                required 
              />
            </label>
          </div>

          <div className="space-y-2">
            <label className="block">
              Equipment Type:
              <select 
                name="equipmentType" 
                value={formData.equipmentType} 
                onChange={handleChange} 
                className="w-full p-2 border rounded mt-1"
              >
                <option value="select">Select</option>
                {equipmentTypes.map(type => (
                  <option key={type.equipmentTypeId} value={type.Title}>
                    {type.Title}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="space-y-2">
            <label className="block">
              Purchase Date:
              <input 
                type="datetime-local" 
                name="purchaseDate" 
                value={formData.purchaseDate} 
                onChange={handleChange} 
                className="w-full p-2 border rounded mt-1" 
                required 
              />
            </label>
          </div>

          <div className="space-y-2">
            <label className="block">
              Condition:
              <select 
                name="condition" 
                value={formData.condition} 
                onChange={handleChange} 
                className="w-full p-2 border rounded mt-1"
              >
                <option value="New">New</option>
                <option value="Good">Good</option>
                <option value="Needs_Repair">Needs Repair</option>
              </select>
            </label>
          </div>

          <div className="space-y-2">
            <label className="block">
              Location:
              <input 
                type="text" 
                name="Location" 
                value={formData.Location} 
                onChange={handleChange} 
                className="w-full p-2 border rounded mt-1" 
                required 
              />
            </label>
          </div>

          <div className="pt-4">
            <button 
              type="submit" 
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      
      {showQR && (
        <div className="flex justify-center mt-6">
          <QRGenerator 
            equipmentId={formData.equipmentId} 
            equipmentType={formData.equipmentType} 
          />
        </div>
      )}
      
      <div className="flex justify-center mt-6">
        <button 
          onClick={handleRefresh}
          className="text-blue-500 hover:text-blue-700"
        >
          Add More
        </button>
      </div>
      
      {message && (
        <div className="flex justify-center mt-4 text-lg text-blue-600">
          {message}
        </div>
      )}
    </div>
  );
}
