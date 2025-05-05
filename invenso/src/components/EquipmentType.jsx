// model EquipmentType {
//   equipmentTypeId Int      @id @default(autoincrement())
//   Types           String
//   Quantity        Int
//   Title           String
//   Description     String
//   isActive        Boolean
// }


// import React, {useState , useEffect} from 'react'
// import axios from 'axios'
// function EquipmentType() {
 
//     const [formData, setFormData] = useState({
//         equipmentTypeId: parseInt(),
//         Title: "",
//         Quantity:0,
//         Types: "Select",
//         isActive:true,
//         Description: ""
//       });

//       const handleRefresh = () => {
//         setFormData(
//           {
//             equipmentTypeId: 0,
//             Title: "",
//             Quantity: 0,
//             Types: "Select",
//             isActive:true,
//             Description: ""
//           }
//         )
//           };

//           const handleChange = (e) => {
//             const { name, value, type, checked } = e.target;
          
//             let parsedValue = value;
//             if (type === "number") {
//               parsedValue = parseInt(value, 10);
//               if (isNaN(parsedValue)) parsedValue = 0;
//             } else if (type === "checkbox") {
//               parsedValue = checked;
//             }
          
//             setFormData({
//               ...formData,
//               [name]: parsedValue,
//             });
//           }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.post('http://localhost:3000/assetManagement/equipmentType',formData)
//         .then(response => {
//           setMessage(response.data);
//         })
//         .catch(error => {
//           console.error('Error fetching data:', error);
//         });
//   };

//   return (

//       <div >
//       <div className="flex justify-center">
//         <br /><br />
//         <form onSubmit={handleSubmit} className="form-container">
//           <h2 className="form-title text-center text-xl">Equipment Types Form</h2>
//           <br />
//           <label className="form-label">
//             Equipment Type ID:
//             <input type="number" name="equipmentTypeId" value={formData.equipmentTypeId} onChange={handleChange} className="form-input" required />
//           </label>
//           <br />
//           <label className="form-label">
//             Equipment Name:
//             <input type="text" name="Title" value={formData.Title} onChange={handleChange} className="form-input" required />
//           </label>
//           <br />
//           <label className="form-label">
//             Type:
//             <select name="Types" value={formData.type} onChange={handleChange} className="form-input-drop">
//               <option value="select">Select</option>
//               <option value="electronics">Electronics</option>
//               <option value="furniture">Furniture</option>
//               <option value="others">Others</option>
//             </select>
//           </label>
//           <br />
//           <label className="form-label">
//             Quantity:
//             <input type="number" name="Quantity" value={formData.Quantity} onChange={handleChange} className="form-input" required />
//           </label>
//           <br />
//           <br />
//           <button type="submit" className="form-button flex justify-center text-xl border-2 border-black rounded-lg p-2 cursor-pointer">Submit</button>
//         </form>
//       </div>
//       <div className="flex justify-center text-xl">
//         <button className="cursor-pointer" onClick={handleRefresh}>
//           Add More
//         </button>
//       </div>
//     </div>

//   )
// }

// export default EquipmentType

import React, { useState } from 'react';
import axios from 'axios';

function EquipmentType() {
  const [formData, setFormData] = useState({
    equipmentTypeId: 0,
    Title: "",
    Quantity: 0,
    Types: "Select",
    isActive: true,
    Description: ""
  });

  const [message, setMessage] = useState(""); // Add this to handle the success message

  const handleRefresh = () => {
    setFormData({
      equipmentTypeId: 0,
      Title: "",
      Quantity: 0,
      Types: "Select",
      isActive: true,
      Description: ""
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let parsedValue = value;
    if (type === "number") {
      parsedValue = parseInt(value, 10);
      if (isNaN(parsedValue)) parsedValue = 0;
    } else if (type === "checkbox") {
      parsedValue = checked;
    }

    setFormData({
      ...formData,
      [name]: parsedValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/assetManagement/equipmentType', formData)
      .then(response => {
        setMessage("Submitted successfully!");
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setMessage("Submission failed.");
      });
  };

  return (
    <div>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="form-container">
          <h2 className="form-title text-center text-xl">Equipment Types Form</h2>
          <br />
          <label className="form-label">
            Equipment Type ID:
            <input
              type="number"
              name="equipmentTypeId"
              value={formData.equipmentTypeId}
              onChange={handleChange}
              className="form-input"
              required
            />
          </label>
          <br />
          <label className="form-label">
            Equipment Name:
            <input
              type="text"
              name="Title"
              value={formData.Title}
              onChange={handleChange}
              className="form-input"
              required
            />
          </label>
          <br />
          <label className="form-label">
            Type:
            <select
              name="Types"
              value={formData.Types}
              onChange={handleChange}
              className="form-input-drop"
            >
              <option value="Select">Select</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="others">Others</option>
            </select>
          </label>
          <br />
          <label className="form-label">
            Quantity:
            <input
              type="number"
              name="Quantity"
              value={formData.Quantity}
              onChange={handleChange}
              className="form-input"
              required
            />
          </label>
          <br />
          <label className="form-label">
            Description:
            <input
              type="textbox"
              name="Description"
              value={formData.Description}
              onChange={handleChange}
              className="form-input"
              required
            />
          </label>
          <br />
          <button
            type="submit"
            className="form-button flex justify-center text-xl border-2 border-black rounded-lg p-2 cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="cursor-pointer border border-gray-500 p-2 rounded"
          onClick={handleRefresh}
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

export default EquipmentType;
