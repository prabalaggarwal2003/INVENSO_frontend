import axios from 'axios';
import React, { useState, useEffect } from 'react';
import EquipmentType from '../components/EquipmentType'; // Import your form component

function Equipmenttype() {
    const [message, setMessage] = useState("");
    const [equipmentTypeData, setEquipmentTypeData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        types: '',
        title: ''
    });
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedEquipmentType, setSelectedEquipmentType] = useState(null);
    const recordsPerPage = 10;

    useEffect(() => {
        fetchEquipmentTypeData();
    }, []);

    const fetchEquipmentTypeData = () => {
        const token = localStorage.getItem('admin_token');
        
        axios.get('http://localhost:3000/assetManagement/equipmentType', {
            headers: {
                'x-admin-token': token,
            },
        })
        .then(response => {
            setEquipmentTypeData(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    };

    const deleteEquipmentType = async (equipmentTypeId) => {
        const token = localStorage.getItem('admin_token');
        try {
            await axios.delete(`http://localhost:3000/assetManagement/equipmentType/${equipmentTypeId}`, {
                headers: {
                    'x-admin-token': token,
                },
            });
            fetchEquipmentTypeData(); // Refresh the data after deletion
        } catch (error) {
            console.error('Error deleting equipment type:', error);
        }
    };

    const handleUpdateClick = (equipmentType) => {
        setSelectedEquipmentType({
            equipmentTypeId: equipmentType.equipmentTypeId,
            Title: equipmentType.Title,
            Quantity: equipmentType.Quantity,
            Types: equipmentType.Types,
            isActive: equipmentType.isActive,
            Description: equipmentType.Description
        });
        setShowUpdateForm(true);
    };

    const handleUpdateSubmit = async (updatedData) => {
        const token = localStorage.getItem('admin_token');
        try {
            await axios.put(`http://localhost:3000/assetManagement/equipmentType/${updatedData.equipmentTypeId}`, updatedData, {
                headers: {
                    'x-admin-token': token,
                },
            });
            fetchEquipmentTypeData(); // Refresh the data after update
            setShowUpdateForm(false);
            setSelectedEquipmentType(null);
        } catch (error) {
            console.error('Error updating equipment type:', error);
        }
    };

    // Apply filters to data
    const getFilteredData = () => {
        let filteredData = [...equipmentTypeData];
        
        if (filters.types) {
            filteredData = filteredData.filter(item => 
                item.Types?.toLowerCase().includes(filters.types.toLowerCase())
            );
        }
        
        if (filters.title) {
            filteredData = filteredData.filter(item => 
                item.Title?.toLowerCase().includes(filters.title.toLowerCase())
            );
        }
        
        return filteredData;
    };

    // Get current records
    const filteredData = getFilteredData();
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(filteredData.length / recordsPerPage);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle filter change
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
        setCurrentPage(1); // Reset to first page when filters change
    };

    // Get unique values for dropdown options
    const getUniqueValues = (key) => {
        const values = new Set();
        equipmentTypeData.forEach(item => {
            if (item[key] !== undefined && item[key] !== null) values.add(item[key]);
        });
        return Array.from(values).sort((a, b) => String(a).localeCompare(String(b)));
    };

    return (
        <div className="p-4">
            {showUpdateForm && selectedEquipmentType ? (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">Update Equipment Type</h2>
                        <EquipmentType 
                            initialData={selectedEquipmentType} 
                            onSubmit={handleUpdateSubmit} 
                            onCancel={() => {
                                setShowUpdateForm(false);
                                setSelectedEquipmentType(null);
                            }}
                            isUpdate={true}
                        />
                    </div>
                </div>
            ) : null}

            {/* Filter controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-gray-100 rounded-lg">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Equipment Type</label>
                    <select
                        name="types"
                        value={filters.types}
                        onChange={handleFilterChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">All Types</option>
                        {getUniqueValues('Types').map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Equipment Name</label>
                    <select
                        name="title"
                        value={filters.title}
                        onChange={handleFilterChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">All Names</option>
                        {getUniqueValues('Title').map((title, index) => (
                            <option key={index} value={title}>{title}</option>
                        ))}
                    </select>
                </div>
            </div>

            <table className='min-w-full border border-gray-300'>
                <thead>
                    <tr className='bg-gray-100'>
                        <th className='px-4 py-2 border'>Equipment Type ID</th>
                        <th className='px-4 py-2 border'>Equipment Name</th>
                        <th className='px-4 py-2 border'>Quantity</th>
                        <th className='px-4 py-2 border'>Type</th>
                        <th className='px-4 py-2 border'>Description</th>
                        <th className='px-4 py-2 border'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRecords.length > 0 ? (
                        currentRecords.map((item, index) => (
                            <tr key={index} className='text-center'>                               
                                <td className='px-4 py-2 border'>{item.equipmentTypeId}</td>
                                <td className='px-4 py-2 border'>{item.Title}</td>
                                <td className='px-4 py-2 border'>{item.Quantity}</td>
                                <td className='px-4 py-2 border'>{item.Types}</td>
                                <td className='px-4 py-2 border'>{item.Description}</td>
                                <td className='px-4 py-2 border'>
                                    <div className="flex justify-center space-x-2">
                                        <button
                                            onClick={() => handleUpdateClick(item)}
                                            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => deleteEquipmentType(item.equipmentTypeId)}
                                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className='px-4 py-2 border text-center' colSpan="6">
                                {equipmentTypeData.length === 0 ? 'No data available' : 'No equipment types match your filters'}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

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
            {message && (
        <div className="flex justify-center mt-4 text-lg text-blue-600">
          {message}
        </div>
      )}
        </div>
    );
}

export default Equipmenttype;