import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Room({ initialData, onSubmit, onCancel, isUpdate = false }) {
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        roomId: 0,
        roomType: "Select",
        isActive: false,
        FloorNo: 0,
        Condition: "New",
        Location: "Select",
    });

    useEffect(() => {
        if (isUpdate && initialData) {
            setFormData({
                roomId: initialData.roomId || 0,
                roomType: initialData.roomType || "Select",
                isActive: initialData.isActive || false,
                FloorNo: initialData.FloorNo || 0,
                Condition: initialData.Condition || "New",
                Location: initialData.Location || "Select",
            });
        }
    }, [initialData, isUpdate]);

    const handleRefresh = () => {
        setFormData({
            roomId: 0,
            roomType: "Select",
            isActive: false,
            FloorNo: 0,
            Condition: "New",
            Location: "Select",
        });
        setMessage("Room added successfully!");
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
        if (isUpdate) {
            // If in update mode, call the onSubmit prop (which should handle the update)
            onSubmit(formData);
        } else {
            // If in create mode, make the POST request
            axios.post('https://invenso-backend.onrender.com/assetManagement/assetManagement/room', formData)
                .then(response => {
                    setMessage("Room added successfully!");
                    handleRefresh(); // Reset form for new entry
                    // If you want to trigger a refresh of the room list, you could add:
                    // if (onSubmit) onSubmit(); // This would be a callback from parent
                })
                .catch(error => {
                    console.error('Error creating room:', error);
                    setMessage(error.response?.data?.message || "Submission failed.");
                });
        }
    };

    return (
        <div className='p-4'>
            <div className="flex justify-center">
                <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
                    <h2 className="text-xl font-bold text-center mb-6">
                        {isUpdate ? "Update Room" : "Create New Room"}
                    </h2>
                    <div className="space-y-2">
                    <label className="block">
                        Room No.:
                        <input 
                            type="number" 
                            name="roomId" 
                            value={formData.roomId} 
                            onChange={handleChange} 
                            className="w-full p-2 border rounded mt-1" 
                            required 
                            disabled={isUpdate} // Disable roomId field in update mode
                        />
                    </label>
                    </div>
                    <div className="space-y-2">
                    <label className="block">
                        Room Type:
                        <select name="roomType" value={formData.roomType} onChange={handleChange} className="w-full p-2 border rounded mt-1">
                            <option value="select">Select</option>
                            <option value="classroom">Classroom</option>
                            <option value="seminar hall">Seminar Hall</option>
                            <option value="office">Office</option>
                            <option value="lab">Labs</option>
                            <option value="washroom">Washroom</option>
                            <option value="storeroom">Storeroom</option>
                            <option value="others">Others</option>
                        </select>
                    </label>
                    </div>

                    <div className="space-y-2">
                        <span className="block">Active:</span>
                        <label className="block">
                            <input 
                                type="radio" 
                                name="isActive" 
                                value={true} 
                                checked={formData.isActive === true} 
                                onChange={() => setFormData({...formData, isActive: true})} 
                            />
                            True
                        </label>
                        
                        <label className="form-radio">
                            <input 
                                type="radio" 
                                name="isActive" 
                                value={false} 
                                checked={formData.isActive === false} 
                                onChange={() => setFormData({...formData, isActive: false})} 
                            />
                            False
                        </label>
                    </div>
                    <div className="space-y-2">
                    <label className="block">
                        Floor No.:
                        <input type="number" name="FloorNo" value={formData.FloorNo} onChange={handleChange} className="w-full p-2 border rounded mt-1" required />
                    </label>
                    </div>
                    <div className="space-y-2">
                    <label className="block">
                        Condition:
                        <select name="Condition" value={formData.Condition} onChange={handleChange} className="w-full p-2 border rounded mt-1">
                            <option value="New">New</option>
                            <option value="Good">Good</option>
                            <option value="Needs_Repair">Needs Repair</option>
                        </select>
                    </label>
                    </div>
                    <div className="space-y-2">
                    <label className="block">
                        Location:
                        <select name="Location" value={formData.Location} onChange={handleChange} className="w-full p-2 border rounded mt-1">
                            <option value="select">Select</option>
                            <option value="oldbuilding">Old Building</option>
                            <option value="newbuilding">New Building</option>
                        </select>
                    </label>
                    </div>
                    
                    <div className="flex justify-center space-x-4">
                        <button type="submit" className="form-button flex justify-center text-xl border-2 border-black rounded-lg p-2 cursor-pointer">
                            {isUpdate ? "Update" : "Submit"}
                        </button>
                        {isUpdate && (
                            <button 
                                type="button" 
                                onClick={onCancel}
                                className="form-button flex justify-center text-xl border-2 border-black rounded-lg p-2 cursor-pointer bg-gray-200"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>
            
            {/* {!isUpdate && (
                <div className="flex justify-center text-xl">
                    <button className="cursor-pointer" onClick={handleRefresh}>
                        Add More
                    </button>
                </div>
            )} */}
            
            {message && (
                <div className={`flex justify-center mt-4 text-lg ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
                    {message}
                </div>
            )}
        </div>
    );
}

export default Room;