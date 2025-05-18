import axios from 'axios';
import React, { useState, useEffect } from 'react';

function EquipmentType({ initialData, onSubmit, onCancel, isUpdate = false }) {
    const [formData, setFormData] = useState({
        equipmentTypeId: 0,
        Title: "",
        Quantity: 0,
        Types: "Select",
        isActive: true,
        Description: ""
    });

    const [message, setMessage] = useState("");

    useEffect(() => {
        if (isUpdate && initialData) {
            setFormData({
                equipmentTypeId: initialData.equipmentTypeId || 0,
                Title: initialData.Title || "",
                Quantity: initialData.Quantity || 0,
                Types: initialData.Types || "Select",
                isActive: initialData.isActive || true,
                Description: initialData.Description || ""
            });
        }
    }, [initialData, isUpdate]);

    const handleRefresh = () => {
        setFormData({
            equipmentTypeId: 0,
            Title: "",
            Quantity: 0,
            Types: "Select",
            isActive: true,
            Description: ""
        });
        setMessage("Equipment Type added successfully!");
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
        if (isUpdate) {
            onSubmit(formData);
        } else {
            axios.post('https://invenso-backend.onrender.com/assetManagement/equipmentType', formData)
                .then(response => {
                    setMessage("Equipment Type added successfully!");
                    handleRefresh();
                })
                .catch(error => {
                    console.error('Error creating equipment type:', error);
                    setMessage("Submission failed.");
                });
        }
    };

    return (
        <div className='p-4'>
            <div className="flex justify-center">
                <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
                    <h2 className="text-xl font-bold text-center mb-6">
                        {isUpdate ? "Update Equipment Type" : "Create Equipment Type"}
                    </h2>
                    <div className="space-y-2">
                    <label className="block">
                        Equipment Type ID:
                        <input
                            type="number"
                            name="equipmentTypeId"
                            value={formData.equipmentTypeId}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mt-1"
                            required
                            disabled={isUpdate}
                        />
                    </label>
                    </div>
                    <div className="space-y-2">
                    <label className="block">
                        Equipment Name:
                        <input
                            type="text"
                            name="Title"
                            value={formData.Title}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mt-1"
                            required
                        />
                    </label>
                    </div>

                    <div className="space-y-2">
                    <label className="block">
                        Type:
                        <select
                            name="Types"
                            value={formData.Types}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mt-1"
                        >
                            <option value="Select">Select</option>
                            <option value="electronics">Electronics</option>
                            <option value="furniture">Furniture</option>
                            <option value="others">Others</option>
                        </select>
                    </label>
                    </div>

                    <div className="space-y-2">
                    <label className="block">
                        Quantity:
                        <input
                            type="number"
                            name="Quantity"
                            value={formData.Quantity}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mt-1"
                            required
                        />
                    </label>
                    </div>

                    <div className="space-y-2">
                    <label className="block">
                        Active:
                        <input
                            type="checkbox"
                            name="isActive"
                            checked={formData.isActive}
                            onChange={handleChange}
                            className="ml-4 w-6 h-6 rounded"
                        />
                    </label>
                    </div>

                    <div className="space-y-2">
                    <label className="block">
                        Description:
                        <input
                            type="textbox"
                            name="Description"
                            value={formData.Description}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mt-1"
                            required
                        />
                    </label>
                    </div>

                    <div className="flex justify-center space-x-4">
                        <button
                            type="submit"
                            className="form-button flex justify-center text-xl border-2 border-black rounded-lg p-2 cursor-pointer"
                        >
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
            
            
            
            {message && (
                <div className={`flex justify-center mt-4 text-lg ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
                    {message}
                </div>
            )}
        </div>
    );
}

export default EquipmentType;