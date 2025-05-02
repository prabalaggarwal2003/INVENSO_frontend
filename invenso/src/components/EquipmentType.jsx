import React, {useState} from 'react'

function EquipmentType() {
    const [formData, setFormData] = useState({
        equipmentTypeID: "",
        equipmentName: "",
        quantity: "",
        type: "Select",
      });

      const handleRefresh = () => {
        setFormData(
          {
            equipmentTypeID: "",
            equipmentName: "",
            quantity: "",
            type: "Select",
          }
        )
          };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (

      <div >
      <div className="flex justify-center">
        <br /><br />
        <form onSubmit={handleSubmit} className="form-container">
          <h2 className="form-title text-center text-xl">Equipment Types Form</h2>
          <br />
          <label className="form-label">
            Equipment Type ID:
            <input type="text" name="equipmentTypeID" value={formData.equipmentTypeID} onChange={handleChange} className="form-input" required />
          </label>
          <br />
          <label className="form-label">
            Equipment Name:
            <input type="text" name="equipmentName" value={formData.equipmentName} onChange={handleChange} className="form-input" required />
          </label>
          <br />
          <label className="form-label">
            Type:
            <select name="type" value={formData.type} onChange={handleChange} className="form-input-drop">
              <option value="select">Select</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="others">Others</option>
            </select>
          </label>
          <br />
          <label className="form-label">
            Quantity:
            <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} className="form-input" required />
          </label>
          <br />
          <br />
          <button type="submit" className="form-button flex justify-center text-xl border-2 border-black rounded-lg p-2 cursor-pointer">Submit</button>
        </form>
      </div>
      <div className="flex justify-center text-xl">
        <button className="cursor-pointer" onClick={handleRefresh}>
          Add More
        </button>
      </div>
    </div>

  )
}

export default EquipmentType