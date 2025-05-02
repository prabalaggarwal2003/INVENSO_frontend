import React, {useState} from 'react'
import { useEffect } from 'react';
import axios from 'axios';

function EquipmentType() {
    const [formData, setFormData] = useState({
        equipmentTypeId: [],
        Types: "Select",
        Quantity: "",
        Title: "",
        Description : "",
        isActive : true
      });

      const handleRefresh = () => {
        setFormData(
          {
            equipmentTypeId: [],
            Types: "Select",
            Quantity: "",
            Title: "",
            Description : "",
            isActive : true
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
    const { equipmentTypeId, Types, Quantity, Title ,Description , isActive} = formData;
    axios.post('http://localhost:3000/equipmentType', {equipmentTypeId , Types , Quantity , Title, Description , isActive})
      .then(response => {
        onTaskCreated(response.data);
        setFormData('');
      })
      .catch(error => console.error('Error creating Equipment Type:', error));
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
            <input type="text" name="equipmentTypeId" value={formData.equipmentTypeId} onChange={handleChange} className="form-input" />
          </label>
          <br />
          <label className="form-label">
            Equipment Name:
            <input type="text" name="Title" value={formData.Title} onChange={handleChange} className="form-input" required />
          </label>
          <br />
          <label className="form-label">
            Type:
            <select name="Types" value={formData.Types} onChange={handleChange} className="form-input-drop">
              <option value="select">Select</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="others">Others</option>
            </select>
          </label>
          <br />
          <label className="form-label">
            Quantity:
            <input type="text" name="Quantity" value={formData.Quantity} onChange={handleChange} className="form-input" required />
          </label>
          <br />
          <br />
          <label className="form-label">
            Description:
            <input type="text" name="Description" value={formData.Description} onChange={handleChange} className="form-input" required />
          </label>
          
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