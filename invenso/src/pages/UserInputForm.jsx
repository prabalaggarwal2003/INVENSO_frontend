import { useState, useParams } from "react";

function UserInputForm() {
  const [input, setInput] = useState("");
  const { equipmentType, equipmentId } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User input submitted:", input);
    // You can send this data to your backend or store it
  };

  return (
    <div>
      <h2>Submit Info for {equipmentType} - {equipmentId}</h2>
      <div className="flex flex-col items-center mt-20">
      <h1 className="text-2xl mb-4">Submit Your Response</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your response"
          className="border p-2 rounded w-64"
        />
        <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </form>
    </div>
    </div>
    
  );
}

export default UserInputForm;
