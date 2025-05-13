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

    // Initialize form with initialData when component mounts or initialData changes
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
        setMessage("Submitted successfully!");
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
            axios.post('http://localhost:3000/assetManagement/equipmentType', formData)
                .then(response => {
                    setMessage("Submitted successfully!");
                    handleRefresh();
                })
                .catch(error => {
                    console.error('Error creating equipment type:', error);
                    setMessage("Submission failed.");
                });
        }
    };

    return (
        <div>
            <div className="flex justify-center">
                <form onSubmit={handleSubmit} className="form-container">
                    <h2 className="form-title text-center text-xl">
                        {isUpdate ? "Update Equipment Type" : "Create Equipment Type"}
                    </h2>
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
                            disabled={isUpdate}
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
                        Active:
                        <input
                            type="checkbox"
                            name="isActive"
                            checked={formData.isActive}
                            onChange={handleChange}
                            className="ml-2"
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