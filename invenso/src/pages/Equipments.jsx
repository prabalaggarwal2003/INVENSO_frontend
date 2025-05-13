// import React, { useState, useEffect } from 'react';

// function Equipments() {
//     const [equipmentData, setEquipmentData] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [filters, setFilters] = useState({
//         location: '',
//         condition: '',
//         equipmentType: '',
//         warranty: ''
//     });
//     const recordsPerPage = 10;

//     useEffect(() => {
//         const token = localStorage.getItem('admin_token');
        
//         axios.get('http://localhost:3000/assetManagement/equipment', {
//             headers: {
//                 'x-admin-token': token,
//             },
//         })
//         .then(response2 => {
//             setEquipmentData(response2.data);
//             console.log(response2.data);
//         })
//         .catch(error => {
//             console.error('Error fetching data:', error);
//         });
//     }, []);

//     // Apply filters to data
//     const getFilteredData = () => {
//         let filteredData = [...equipmentData];
        
//         if (filters.location) {
//             filteredData = filteredData.filter(item => 
//                 item.Location?.toLowerCase().includes(filters.location.toLowerCase())
//             );
//         }
        
//         if (filters.condition) {
//             filteredData = filteredData.filter(item => 
//                 item.condition?.toLowerCase().includes(filters.condition.toLowerCase())
//             );
//         }
        
//         if (filters.equipmentType) {
//             filteredData = filteredData.filter(item => 
//                 item.equipmentType?.toLowerCase().includes(filters.equipmentType.toLowerCase())
//             );
//         }
        
//         if (filters.warranty) {
//             filteredData = filteredData.filter(item => 
//                 item.warranty?.toString().toLowerCase().includes(filters.warranty.toLowerCase())
//             );
//         }
        
//         return filteredData;
//     };

//     // Get current records
//     const filteredData = getFilteredData();
//     const indexOfLastRecord = currentPage * recordsPerPage;
//     const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//     const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);
//     const totalPages = Math.ceil(filteredData.length / recordsPerPage);

//     // Change page
//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     // Handle filter change
//     const handleFilterChange = (e) => {
//         const { name, value } = e.target;
//         setFilters(prev => ({
//             ...prev,
//             [name]: value
//         }));
//         setCurrentPage(1); // Reset to first page when filters change
//     };

//     // Get unique values for dropdown options
//     const getUniqueValues = (key) => {
//         const values = new Set();
//         equipmentData.forEach(item => {
//             if (item[key] !== undefined && item[key] !== null) {
//                 values.add(item[key]);
//             }
//         });
//         return Array.from(values).sort((a, b) => {
//             // Special sorting for warranty (might be numbers or dates)
//             if (key === 'warranty') {
//                 return String(a).localeCompare(String(b));
//             }
//             return String(a).localeCompare(String(b));
//         });
//     };

//     return (
//         <div className="p-4">
//             {/* Filter controls */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 bg-gray-100 rounded-lg">
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
//                     <select
//                         name="location"
//                         value={filters.location}
//                         onChange={handleFilterChange}
//                         className="w-full p-2 border rounded"
//                     >
//                         <option value="">All Locations</option>
//                         {getUniqueValues('Location').map((location, index) => (
//                             <option key={index} value={location}>{location}</option>
//                         ))}
//                     </select>
//                 </div>
                
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
//                     <select
//                         name="condition"
//                         value={filters.condition}
//                         onChange={handleFilterChange}
//                         className="w-full p-2 border rounded"
//                     >
//                         <option value="">All Conditions</option>
//                         {getUniqueValues('condition').map((condition, index) => (
//                             <option key={index} value={condition}>{condition}</option>
//                         ))}
//                     </select>
//                 </div>
                
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Equipment Type</label>
//                     <select
//                         name="equipmentType"
//                         value={filters.equipmentType}
//                         onChange={handleFilterChange}
//                         className="w-full p-2 border rounded"
//                     >
//                         <option value="">All Types</option>
//                         {getUniqueValues('equipmentType').map((type, index) => (
//                             <option key={index} value={type}>{type}</option>
//                         ))}
//                     </select>
//                 </div>
                
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Warranty</label>
//                     <select
//                         name="warranty"
//                         value={filters.warranty}
//                         onChange={handleFilterChange}
//                         className="w-full p-2 border rounded"
//                     >
//                         <option value="">All Warranties</option>
//                         {getUniqueValues('warranty').map((warranty, index) => (
//                             <option key={index} value={warranty}>{warranty}</option>
//                         ))}
//                     </select>
//                 </div>
//             </div>

//             <table className='min-w-full border border-gray-300'>
//                 <thead>
//                     <tr className='bg-gray-100'>
//                         <th className='px-4 py-2 border'>Equipment ID.</th>
//                         <th className='px-4 py-2 border'>Equipment Type</th>
//                         <th className='px-4 py-2 border'>Warranty</th>
//                         <th className='px-4 py-2 border'>Condition</th>
//                         <th className='px-4 py-2 border'>Location</th>
//                         <th className='px-4 py-2 border'>QRCode</th>
//                         <th className='px-4 py-2 border'>Issue History</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {currentRecords.length > 0 ? (
//                         currentRecords.map((item, index) => (
//                             <tr key={index} className='text-center'>                               
//                                 <td className='px-4 py-2 border'>{item.equipmentId}</td>
//                                 <td className='px-4 py-2 border'>{item.equipmentType}</td>
//                                 <td className='px-4 py-2 border'>{item.warranty}</td>
//                                 <td className='px-4 py-2 border'>{item.condition}</td>
//                                 <td className='px-4 py-2 border'>{item.Location}</td>
//                                 <td className='px-4 py-2 border'>{item.qrCode}</td>
//                                 <td className='px-4 py-2 border'>{item.issueHistory}</td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td className='px-4 py-2 border text-center' colSpan="7">
//                                 {equipmentData.length === 0 ? 'No data available' : 'No equipment matches your filters'}
//                             </td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>

//             {/* Pagination controls */}
//             {filteredData.length > recordsPerPage && (
//                 <div className="flex justify-center mt-4">
//                     <button
//                         onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
//                         disabled={currentPage === 1}
//                         className="mx-1 px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//                     >
//                         Previous
//                     </button>
                    
//                     {[...Array(totalPages).keys()].map(number => (
//                         <button
//                             key={number}
//                             onClick={() => paginate(number + 1)}
//                             className={`mx-1 px-3 py-1 rounded ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//                         >
//                             {number + 1}
//                         </button>
//                     ))}
                    
//                     <button
//                         onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
//                         disabled={currentPage === totalPages}
//                         className="mx-1 px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//                     >
//                         Next
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Equipments;
import { useState, useEffect } from "react";
import QRGenerator from "../components/QRGenerator";
import axios from "axios";

export default function Equipments() {
  const [message, setMessage] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [equipmentData, setEquipmentData] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  const [formData, setFormData] = useState({
    equipmentId: 0,
    Location: "New Building",
    equipmentType: "Fan",
    warranty: "true",
    purchaseDate: "",
    issueHistory: "",
    condition: "New",
    isActive: false,
    qrCode: "",
  });

  // Fetch equipment data on component mount
  useEffect(() => {
    fetchEquipmentData();
  }, []);

  const fetchEquipmentData = () => {
    const token = localStorage.getItem('admin_token');
    axios.get('http://localhost:3000/assetManagement/equipment', {
      headers: {
        'x-admin-token': token,
      },
    })
    .then(response => {
      setEquipmentData(response.data);
    })
    .catch(error => {
      console.error('Error fetching equipment data:', error);
    });
  };

  const handleRefresh = () => {
    setFormData({
      equipmentId: 0,
      Location: "New Building",
      equipmentType: "Fan",
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

    setFormData({
      ...formData,
      [name]: parsedValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let formattedDate = formData.purchaseDate;
    if (formattedDate) {
      if (formattedDate.length === 16) {
        formattedDate += ":00";
      }
      formattedDate = new Date(formattedDate).toISOString();
    }

    const qrCodeURL = `bpitindia.invenso.com/${formData.equipmentType}/${formData.equipmentId}`;

    const updatedFormData = {
      ...formData,
      purchaseDate: formattedDate,
      qrCode: qrCodeURL,
    };

    axios
      .post("http://localhost:3000/assetManagement/equipment", updatedFormData)
      .then((response) => {
        setMessage("Submitted successfully!");
        setShowQR(true);
        fetchEquipmentData(); // Refresh the equipment list
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        setMessage("Submission failed.");
      });
  };

  const handleUpdateClick = (equipment) => {
    setSelectedEquipment(equipment);
    setFormData({
      equipmentId: equipment.equipmentId,
      Location: equipment.Location,
      equipmentType: equipment.equipmentType,
      warranty: equipment.warranty,
      purchaseDate: equipment.purchaseDate ? equipment.purchaseDate.slice(0, 16) : "",
      issueHistory: equipment.issueHistory,
      condition: equipment.condition,
      isActive: equipment.isActive,
      qrCode: equipment.qrCode,
    });
    setShowUpdateForm(true);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    let formattedDate = formData.purchaseDate;
    if (formattedDate) {
      if (formattedDate.length === 16) {
        formattedDate += ":00";
      }
      formattedDate = new Date(formattedDate).toISOString();
    }

    const qrCodeURL = `bpitindia.invenso.com/${formData.equipmentType}/${formData.equipmentId}`;

    const updatedFormData = {
      ...formData,
      purchaseDate: formattedDate,
      qrCode: qrCodeURL,
    };

    const token = localStorage.getItem('admin_token');
    axios.put(`http://localhost:3000/assetManagement/equipment/${formData.equipmentId}`, updatedFormData, {
      headers: {
        'x-admin-token': token,
      },
    })
    .then((response) => {
      setMessage("Updated successfully!");
      setShowQR(true);
      fetchEquipmentData();
      setShowUpdateForm(false);
    })
    .catch((error) => {
      console.error("Error updating equipment:", error);
      setMessage("Update failed.");
    });
  };

  const deleteEquipment = (equipmentId) => {
    const token = localStorage.getItem('admin_token');
    axios.delete(`http://localhost:3000/assetManagement/equipment/${equipmentId}`, {
      headers: {
        'x-admin-token': token,
      },
    })
    .then(response => {
      setMessage("Equipment deleted successfully!");
      fetchEquipmentData();
    })
    .catch(error => {
      console.error('Error deleting equipment:', error);
      setMessage("Deletion failed.");
    });
  };

  return (
    <div>
      {/* Update Form Modal */}
      {showUpdateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Update Equipment</h2>
            <form onSubmit={handleUpdateSubmit} className="form-container">
              {/* Form fields same as create form */}
              <label className="form-label">
                Equipment ID:
                <input
                  type="number"
                  name="equipmentId"
                  value={formData.equipmentId}
                  onChange={handleChange}
                  className="form-input"
                  required
                  disabled
                />
              </label>
              <br />
              <label className="form-label">
                Equipment Type:
                <select
                  name="equipmentType"
                  value={formData.equipmentType}
                  onChange={handleChange}
                  className="form-input-drop"
                >
                  <option value="select">Select</option>
                  <option value="Fan">Fan</option>
                  <option value="AC">AC</option>
                  <option value="PC">PC</option>
                  <option value="Chair">Chair</option>
                  <option value="Whiteboard">Whiteboard</option>
                  <option value="Desk">Desk</option>
                </select>
              </label>
              <br />
              <label className="form-label">
                Purchase Date:
                <input
                  type="datetime-local"
                  name="purchaseDate"
                  value={formData.purchaseDate}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </label>
              <br />
              <label className="form-label">
                Condition:
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="form-input-drop"
                >
                  <option value="New">New</option>
                  <option value="Good">Good</option>
                  <option value="Needs_Repair">Needs Repair</option>
                </select>
              </label>
              <br />
              <label className="form-label">
                Location:
                <input
                  type="text"
                  name="Location"
                  value={formData.Location}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </label>
              <br />
              <div className="flex justify-center space-x-4">
                <button
                  type="submit"
                  className="form-button flex justify-center text-xl border-2 border-black rounded-lg p-2 cursor-pointer"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowUpdateForm(false);
                    handleRefresh();
                  }}
                  className="form-button flex justify-center text-xl border-2 border-black rounded-lg p-2 cursor-pointer bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Form */}
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="form-container">
          <h2 className="form-title text-xl text-center">Equipment Form</h2>
          <br />
          {/* Form fields same as before */}
          {/* ... */}
        </form>
      </div>

      {/* Equipment List Table */}
      <div className="mt-8 p-4">
        <h2 className="text-xl font-bold mb-4">Equipment List</h2>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Type</th>
              <th className="px-4 py-2 border">Location</th>
              <th className="px-4 py-2 border">Condition</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {equipmentData.map((item) => (
              <tr key={item.equipmentId} className="text-center">
                <td className="px-4 py-2 border">{item.equipmentId}</td>
                <td className="px-4 py-2 border">{item.equipmentType}</td>
                <td className="px-4 py-2 border">{item.Location}</td>
                <td className="px-4 py-2 border">{item.condition}</td>
                <td className="px-4 py-2 border">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => handleUpdateClick(item)}
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => deleteEquipment(item.equipmentId)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
      {message && (
        <div className="flex justify-center mt-4 text-lg text-blue-600">
          {message}
        </div>
      )}
    </div>
  );
}