import { useState, useEffect } from "react";
import QRGenerator from "../components/QRGenerator";
import axios from "axios";

export default function Equipments() {
  const [message, setMessage] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [equipmentData, setEquipmentData] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [filters, setFilters] = useState({
    equipmentType: '',
    warranty: '',
    location: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

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
    axios.get('https://invenso-backend.onrender.com/assetManagement/equipment', {
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

  // Apply filters to data
  const getFilteredData = () => {
    let filteredData = [...equipmentData];
    
    if (filters.equipmentType) {
      filteredData = filteredData.filter(item => 
        item.equipmentType?.toLowerCase().includes(filters.equipmentType.toLowerCase())
      );
    }
    
    if (filters.warranty) {
      filteredData = filteredData.filter(item => 
        item.warranty?.toString().toLowerCase().includes(filters.warranty.toLowerCase())
      );
    }
    
    if (filters.location) {
      filteredData = filteredData.filter(item => 
        item.Location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    return filteredData;
  };

  // Get current records for pagination
  const filteredData = getFilteredData();
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setCurrentPage(1);
  };

  const getUniqueValues = (key) => {
    const values = new Set();
    equipmentData.forEach(item => {
      if (item[key] !== undefined && item[key] !== null) {
        values.add(item[key]);
      }
    });
    return Array.from(values).sort((a, b) => String(a).localeCompare(String(b)));
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

    const token = localStorage.getItem('admin_token');
    axios.post("https://invenso-backend.onrender.com/assetManagement/equipment", updatedFormData, {
      headers: {
        'x-admin-token': token,
      },
    })
    .then((response) => {
      setMessage("Submitted successfully!");
      setShowQR(true);
      fetchEquipmentData();
    })
    .catch((error) => {
      console.error("Error submitting data:", error);
      setMessage("Submission failed. " + (error.response?.data?.message || ""));
    });
  };

  const handleUpdateClick = (equipment) => {
    setSelectedEquipment(equipment);
    setFormData({
      equipmentId: equipment.equipmentId,
      Location: equipment.Location,
      equipmentType: equipment.equipmentType,
      warranty: String(equipment.warranty), // Ensure warranty is string
      purchaseDate: equipment.purchaseDate ? equipment.purchaseDate.slice(0, 16) : "",
      issueHistory: equipment.issueHistory || "",
      condition: equipment.condition || "New",
      isActive: equipment.isActive || false,
      qrCode: equipment.qrCode || "",
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
    axios.put(`https://invenso-backend.onrender.com/assetManagement/equipment/${formData.equipmentId}`, updatedFormData, {
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
      setMessage("Update failed. " + (error.response?.data?.message || ""));
    });
  };

  const deleteEquipment = (equipmentId) => {
   

    const token = localStorage.getItem('admin_token');
    axios.delete(`https://invenso-backend.onrender.com/assetManagement/equipment/${equipmentId}`, {
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
      setMessage("Deletion failed. " + (error.response?.data?.message || ""));
    });
  };

  return (
    <div className="p-4">
      {/* Update Form Modal */}
      {showUpdateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Update Equipment</h2>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Equipment ID:
                  </label>
                  <input
                    type="number"
                    name="equipmentId"
                    value={formData.equipmentId}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Equipment Type:
                  </label>
                  <select
                    name="equipmentType"
                    value={formData.equipmentType}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="Fan">Fan</option>
                    <option value="AC">AC</option>
                    <option value="PC">PC</option>
                    <option value="Chair">Chair</option>
                    <option value="Whiteboard">Whiteboard</option>
                    <option value="Desk">Desk</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Purchase Date:
                  </label>
                  <input
                    type="datetime-local"
                    name="purchaseDate"
                    value={formData.purchaseDate}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Condition:
                  </label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="New">New</option>
                    <option value="Good">Good</option>
                    <option value="Needs_Repair">Needs Repair</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location:
                  </label>
                  <input
                    type="text"
                    name="Location"
                    value={formData.Location}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Warranty:
                  </label>
                  <select
                    name="warranty"
                    value={formData.warranty}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-center space-x-4 mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowUpdateForm(false);
                    handleRefresh();
                  }}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Form */}
      {/* <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">Add New Equipment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Equipment ID:
              </label>
              <input
                type="number"
                name="equipmentId"
                value={formData.equipmentId}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Equipment Type:
              </label>
              <select
                name="equipmentType"
                value={formData.equipmentType}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="Fan">Fan</option>
                <option value="AC">AC</option>
                <option value="PC">PC</option>
                <option value="Chair">Chair</option>
                <option value="Whiteboard">Whiteboard</option>
                <option value="Desk">Desk</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Purchase Date:
              </label>
              <input
                type="datetime-local"
                name="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Condition:
              </label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="New">New</option>
                <option value="Good">Good</option>
                <option value="Needs_Repair">Needs Repair</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location:
              </label>
              <input
                type="text"
                name="Location"
                value={formData.Location}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Warranty:
              </label>
              <select
                name="warranty"
                value={formData.warranty}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center space-x-4 mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleRefresh}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Reset
            </button>
          </div>
        </form>
      </div> */}

      {/* Filter controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-100 rounded-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Equipment Type</label>
          <select
            name="equipmentType"
            value={filters.equipmentType}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded text-sm"
          >
            <option value="">All Types</option>
            {getUniqueValues('equipmentType').map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 ">condition</label>
          <select
            name="condition"
            value={filters.condition}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded text-sm"
          >
            <option value="Good">Good</option>
            <option value="New">New</option>
            <option value="Needs_Repair">Needs_Repair</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <select
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded text-sm"
          >
            <option value="">All Locations</option>
            {getUniqueValues('Location').map((location, index) => (
              <option key={index} value={location}>{location}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Equipment List Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Equipment List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Type</th>
                <th className="px-4 py-2 border">Location</th>
                <th className="px-4 py-2 border">Condition</th>
                <th className="px-4 py-2 border">Warranty</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.length > 0 ? (
                currentRecords.map((item) => (
                  <tr key={item.equipmentId} className="text-center hover:bg-gray-50">
                    <td className="px-4 py-2 border">{item.equipmentId}</td>
                    <td className="px-4 py-2 border">{item.equipmentType}</td>
                    <td className="px-4 py-2 border">{item.Location}</td>
                    <td className="px-4 py-2 border">{item.condition}</td>
                    <td className="px-4 py-2 border">{item.warranty ? "Yes" : "No"}</td>
                    <td className="px-4 py-2 border">  
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleUpdateClick(item)}
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => deleteEquipment(item.equipmentId)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-2 border text-center" colSpan="6">
                    {equipmentData.length === 0 ? 'No data available' : 'No equipment matches your filters'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        {filteredData.length > recordsPerPage && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
              disabled={currentPage === 1}
              className="mx-1 px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            
            {[...Array(totalPages).keys()].map(number => (
              <button
                key={number}
                onClick={() => paginate(number + 1)}
                className={`mx-1 px-3 py-1 rounded ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                {number + 1}
              </button>
            ))}
            
            <button
              onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
              disabled={currentPage === totalPages}
              className="mx-1 px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {message && (
        <div className={`mt-4 p-3 rounded text-center ${
          message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}>
          {message}
        </div>
      )}

      {showQR && formData.qrCode && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">QR Code</h3>
          <QRGenerator url={formData.qrCode} />
        </div>
      )}
    </div>
  );
}
