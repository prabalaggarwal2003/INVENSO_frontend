import React, {useState} from 'react'
import axios from 'axios';
function Room() {
    const [formData, setFormData] = useState({
        roomId: 0,
        roomType: "Select",
        isActive: false,
        FloorNo: 0,
        Condition: "New",
        Location: "Select",
      });

      const handleRefresh = () => {
        setFormData(
          {
            roomId:0,
            roomType: "Select",
            isActive: false,
            FloorNo: 0,
            Condition: "New",
            Location: "Select",
          }
        )
          };
          const [message, setMessage] = useState("");

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
            axios.post('http://localhost:3000/room', formData)
              .then(response => {
                setMessage("Submitted successfully!");
              })
              .catch(error => {
                console.error('Error fetching data:', error);
                setMessage("Submission failed.");
              });
          };

  return (
    <div >
      <div className="flex justify-center">
        <br /><br />
        <form onSubmit={handleSubmit} className="form-container">
          <h2 className="form-title text-center text-xl">Rooms Form</h2>
          <br />
          <label className="form-label">
            Room No.:
            <input type="number" name="roomId" value={formData.roomId} onChange={handleChange} className="form-input" required />
          </label>
          <br />
          <label className="form-label">
            Room Type:
            <select name="roomType" value={formData.roomType} onChange={handleChange} className="form-input-drop">
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
          <br />
          <div className="form-radio-container">
            <span className="form-label">Active:</span>
            <label className="form-radio">
              <input type="radio" name="isActive" value={true} checked={formData.isActive === true} onChange={() => setFormData({...formData, isActive: true})} />
              True
            </label>
            <label className="form-radio">
            <input type="radio" name="isActive" value={false} checked={formData.isActive === false} onChange={() => setFormData({...formData, isActive: false})} />
              False
            </label>
          </div>
          <label className="form-label">
            Floor No.:
            <input type="number" name="FloorNo" value={formData.FloorNo} onChange={handleChange} className="form-input" required />
          </label>
          <br />
          <label className="form-label">
            Condition:
            <select name="Condition" value={formData.Condition} onChange={handleChange} className="form-input-drop">
              <option value="New">New</option>
              <option value="Good">Good</option>
              <option value="Needs_Repair">Needs Repair</option>
            </select>
          </label>
          <br />
          <label className="form-label">
            Location:
            <select name="Location" value={formData.Location} onChange={handleChange} className="form-input-drop">
              <option value="select">Select</option>
              <option value="oldbuilding">Old Building</option>
              <option value="newbuilding">New Building</option>
            </select>
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

export default Room