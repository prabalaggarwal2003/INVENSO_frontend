import React, {useState} from 'react'
// model Room {
//   roomId     Int      @id @default(autoincrement())
//   location   String
//   roomNo     Int
//   isCreated  DateTime @default(now())
//   isModified DateTime @default(now())
//   isActive   Boolean
//   status     Status
// }
function Room() {
  

    const [formData, setFormData] = useState({
        roomNo: "",
        roomType: "Select",
        isActive: false,
        floor: "",
        condition: "New",
        location: "Select",
      });

      const handleRefresh = () => {
        setFormData(
          {
            roomNo: "",
            roomType: "Select",
            isActive: false,
            floor: "",
            condition: "New",
            location: "Select",
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
            <input type="text" name="roomno" value={formData.roomNo} onChange={handleChange} className="form-input" required />
          </label>
          <br />
          <label className="form-label">
            Room Type:
            <select name="roomtype" value={formData.roomType} onChange={handleChange} className="form-input-drop">
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
              <input type="radio" name="isActive" value="Yes" checked={formData.isActive === "Yes"} onChange={handleChange} />
              Yes
            </label>
            <label className="form-radio">
              <input type="radio" name="isActive" value="No" checked={formData.isActive === "No"} onChange={handleChange} />
              No
            </label>
          </div>
          <label className="form-label">
            Floor No.:
            <input type="text" name="floor" value={formData.floor} onChange={handleChange} className="form-input" required />
          </label>
          <br />
          <label className="form-label">
            Condition:
            <select name="condition" value={formData.condition} onChange={handleChange} className="form-input-drop">
              <option value="New">New</option>
              <option value="Good">Good</option>
              <option value="Needs Repair">Needs Repair</option>
            </select>
          </label>
          <br />
          <label className="form-label">
            Location:
            <select name="location" value={formData.location} onChange={handleChange} className="form-input-drop">
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