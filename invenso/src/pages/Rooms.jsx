import axios from 'axios';
import { useState, useEffect } from 'react';
import Room from '../components/Room'; // Assuming the Room form component is in the same directory

function Rooms() {
    const [roomData, setRoomData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        roomType: '',
        location: '',
        condition: '',
        floorNo: ''
    });
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const recordsPerPage = 10;

    useEffect(() => {
        fetchRoomData();
    }, []);

    const fetchRoomData = () => {
        const token = localStorage.getItem('admin_token');
        
        axios.get('https://invenso-backend.onrender.com/assetManagement/room', {
            headers: {
                'x-admin-token': token,
            },
        })
        .then(response1 => {
            setRoomData(response1.data);
            console.log(response1.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    };

    const deleteRoom = async (roomId) => {
        const token = localStorage.getItem('admin_token');
        try {
            await axios.delete(`https://invenso-backend.onrender.com/assetManagement/room/${roomId}`, {
                headers: {
                    'x-admin-token': token,
                },
            });
            fetchRoomData(); // Refresh the data after deletion
        } catch (error) {
            console.error('Error deleting room:', error);
        }
    };

const handleUpdateClick = (room) => {
    console.log("Updating room:", room); // Verify the data
    setSelectedRoom({
        roomId: room.roomId,
        roomType: room.roomType,
        isActive: room.isActive,
        FloorNo: room.FloorNo,
        Condition: room.Condition,
        Location: room.Location
    });
    setShowUpdateForm(true);
};

const handleUpdateSubmit = async (updatedData) => {
    const token = localStorage.getItem('admin_token');
    try {
        await axios.put(`https://invenso-backend.onrender.com/assetManagement/room/${updatedData.roomId}`, updatedData, {
            headers: {
                'x-admin-token': token,
            },
        });
        fetchRoomData(); // Refresh the data
        setShowUpdateForm(false);
        setSelectedRoom(null);
    } catch (error) {
        console.error('Error updating room:', error);
    }
};

    // Apply filters to data
    const getFilteredData = () => {
        let filteredData = [...roomData];
        
        if (filters.roomType) {
            filteredData = filteredData.filter(item => 
                item.roomType?.toLowerCase().includes(filters.roomType.toLowerCase())
            );
        }
        
        if (filters.location) {
            filteredData = filteredData.filter(item => 
                item.Location?.toLowerCase().includes(filters.location.toLowerCase())
            );
        }
        
        if (filters.condition) {
            filteredData = filteredData.filter(item => 
                item.Condition?.toLowerCase().includes(filters.condition.toLowerCase())
            );
        }
        
        if (filters.floorNo) {
            filteredData = filteredData.filter(item => 
                item.FloorNo?.toString().includes(filters.floorNo.toString())
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
        roomData.forEach(item => {
            if (item[key] !== undefined && item[key] !== null) values.add(item[key]);
        });
        return Array.from(values).sort((a, b) => {
            if (key === 'FloorNo') return a - b;
            return String(a).localeCompare(String(b));
        });
    };

    return (
        <div className="p-4">
            {showUpdateForm && selectedRoom ? (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">Update Room Details</h2>
                        <Room 
                            initialData={selectedRoom} 
                            onSubmit={handleUpdateSubmit} 
                            onCancel={() => {
                                setShowUpdateForm(false);
                                setSelectedRoom(null);
                            }}
                            isUpdate={true}
                        />
                    </div>
                </div>
            ) : null}

            {/* Filter controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 bg-gray-100 rounded-lg">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
                    <select
                        name="roomType"
                        value={filters.roomType}
                        onChange={handleFilterChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">All Room Types</option>
                        {getUniqueValues('roomType').map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <select
                        name="location"
                        value={filters.location}
                        onChange={handleFilterChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">All Locations</option>
                        {getUniqueValues('Location').map((location, index) => (
                            <option key={index} value={location}>{location}</option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                    <select
                        name="condition"
                        value={filters.condition}
                        onChange={handleFilterChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">All Conditions</option>
                        {getUniqueValues('Condition').map((condition, index) => (
                            <option key={index} value={condition}>{condition}</option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Floor No.</label>
                    <select
                        name="floorNo"
                        value={filters.floorNo}
                        onChange={handleFilterChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">All Floors</option>
                        {getUniqueValues('FloorNo').map((floor, index) => (
                            <option key={index} value={floor}>Floor {floor}</option>
                        ))}
                    </select>
                </div>
            </div>

            <table className='min-w-full border border-gray-300'>
                <thead>
                    <tr className='bg-gray-100'>
                        <th className='px-4 py-2 border'>Room No.</th>
                        <th className='px-4 py-2 border'>Room Type</th>
                        <th className='px-4 py-2 border'>FloorNo</th>
                        <th className='px-4 py-2 border'>Condition</th>
                        <th className='px-4 py-2 border'>Location</th>
                        <th className='px-4 py-2 border'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRecords.length > 0 ? (
                        currentRecords.map((item, index) => (
                            <tr key={index} className='text-center'>                               
                                <td className='px-4 py-2 border'>{item.roomId}</td>
                                <td className='px-4 py-2 border'>{item.roomType}</td>
                                <td className='px-4 py-2 border'>{item.FloorNo}</td>
                                <td className='px-4 py-2 border'>{item.Condition}</td>
                                <td className='px-4 py-2 border'>{item.Location}</td>
                                <td className='px-4 py-2 border'>
                                    <div className="flex justify-center space-x-2">
                                        <button
                                            onClick={() => handleUpdateClick(item)}
                                            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => deleteRoom(item.roomId)}
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
                                {roomData.length === 0 ? 'No data available' : 'No rooms match your filters'}
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
        </div>
    );
}

export default Rooms;