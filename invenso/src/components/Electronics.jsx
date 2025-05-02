import { useState } from "react";
import QRGenerator from "./QRGenerator";  

export default function Electronics() {
  const [formData, setFormData] = useState({
    equipmentId: "",
    equipmentType: "Select",
    inWarranty: false,
    purchaseDate: "",
    condition: "New",
    location: "",
  });

  const handleRefresh = () => {
    setFormData(
      {
      equipmentId: "",
      equipmentType: "",
      inWarranty: false,
      purchaseDate: "",
      condition: "New",
      location: "",
      }
    ),
    setShowQR(false)
  };

  const [showQR, setShowQR] = useState(false); 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowQR(true);
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
              <input type="radio" name="inWarranty" value="Yes" checked={formData.inWarranty === "Yes"} onChange={handleChange} />
              Yes
            </label>
            <label className="form-radio">
              <input type="radio" name="inWarranty" value="No" checked={formData.inWarranty === "No"} onChange={handleChange} />
              No
            </label>
          </div>
          <label className="form-label">
            Purchase Date:
            <input type="date" name="purchaseDate" value={formData.purchaseDate} onChange={handleChange} className="form-input" required />
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
            <input type="text" name="location" value={formData.location} onChange={handleChange} className="form-input" required />
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

