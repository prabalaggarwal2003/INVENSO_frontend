import { useState } from "react";
import QRGenerator from "./QRGenerator";  

export default function Electronics() {
  const [formData, setFormData] = useState({
    equipmentId: "1",
    Location: "New Building",
    equipmentType: "Fan",
    warranty: "String",
    purchaseDate: "2020-01-01T00:00:00.000Z",
    issueHistory: "String",
    condition: "New",
    qrCode: "/String",
    isCreated: "2025-05-03T18:51:32.336Z",
    isModified: "2025-05-03T18:51:32.336Z",
    isActive: true
  });

  const handleRefresh = () => {
    setFormData(
      {
        equipmentId: "1",
        Location: "New Building",
        equipmentType: "Fan",
        warranty: "String",
        purchaseDate: "2020-01-01T00:00:00.000Z",
        issueHistory: "String",
        condition: "New",
        qrCode: "/String",
        isCreated: "2025-05-03T18:51:32.336Z",
        isModified: "2025-05-03T18:51:32.336Z",
        isActive: true
      }
    ),
    setShowQR(false)
  };

  const [showQR, setShowQR] = useState(false); 

  const handleChange = (e) => {
    const { name, value, type } = e.target;
  
    let parsedValue = value;
    if (type === "number") {
      parsedValue = parseInt(value, 10);
      if (isNaN(parsedValue)) parsedValue = 0;
    }
  
    setFormData({
      ...formData,
      [name]: parsedValue,
    });
  };

  const handleSubmit = (e) => {
            e.preventDefault();
            axios.post('http://localhost:3000/assetManagement/equipment', formData)
              .then(response => {
                setMessage("Submitted successfully!");
              })
              .catch(error => {
                console.error('Error fetching data:', error);
                setMessage("Submission failed.");
              });
          };

  return (
    <div >
      <div className="flex justify-center">
        <br /><br />
        <form onSubmit={handleSubmit} className="form-container">
          <h2 className="form-title text-xl text-center">Electronics Form</h2>
          <br />
          <label className="form-label">
            Equipment ID:
            <input type="text" name="equipmentId" value={formData.equipmentId} onChange={handleChange} className="form-input" required />
          </label>
          <br />
          <label className="form-label">
            Equipment Type:
            <select name="equipmentType" value={formData.equipmentType} onChange={handleChange} className="form-input-drop">
              <option value="select">Select</option>
              <option value="AC">AC</option>
              <option value="PC">PC</option>
              <option value="Printer">Printer</option>
            </select>
          </label>
          <br />
          <div className="form-radio-container">
            <span className="form-label">Warranty:</span>
            <label className="form-radio">
            <input type="radio" name="warranty" value={true} checked={formData.warranty === true} onChange={() => setFormData({...formData, isActive: true})} />
            True
            </label>
            <label className="form-radio">
            <input type="radio" name="warranty" value={false} checked={formData.warranty === false} onChange={() => setFormData({...formData, isActive: false})} />
            False
            </label>
          </div>
          <label className="form-label">
            Purchase Date:
            <input type="datetime-local" name="purchaseDate" value={formData.purchaseDate} onChange={handleChange} className="form-input" required />
          </label>
          <br />
          <label className="form-label">
            Condition:
            <select name="condition" value={formData.condition} onChange={handleChange} className="form-input-drop">
              <option value="New">New</option>
              <option value="Good">Good</option>
              <option value="Needs Repair">Needs Repair</option>
            </select>
          </label>
          <br />
          <label className="form-label">
            Location:
            <input type="text" name="Location" value={formData.Location} onChange={handleChange} className="form-input" required />
          </label>
          <br />
          <br />
          <button type="submit" className="form-button flex justify-center text-xl border-2 border-black rounded-lg p-2 cursor-pointer">Submit</button>
        </form>

        {showQR && <QRGenerator equipmentId={formData.equipmentId} equipmentType={formData.equipmentType} />}
      </div>
      <br />
      <div className="flex justify-center text-xl">
        <button className="cursor-pointer" onClick={handleRefresh}>
          Add More
        </button>
      </div>
    </div>
  );
}

