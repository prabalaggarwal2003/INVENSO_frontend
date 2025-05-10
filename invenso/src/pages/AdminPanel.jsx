// import React from 'react'
// import { Link } from 'react-router-dom'
// import axios from 'axios';
// import { useState , useEffect} from 'react';
// function AdminPanel() {
//   const [message,setMessage]= useState("")
//   useEffect(() => {
//     axios.get('http://localhost:3000/assetManagement/equipmentType')
//           .then(response => {
//             setMessage(response.data);
//             console.log(response);
//           })
//           .catch(error => {
//             console.error('Error fetching data:', error);
//     });
//   }, []);
//   return (
//     <div>
//       <h1 className='text-3xl text-center mt-16'>
//         Welcome to Admin Dashboard
//       </h1>
//       <h2 className='text-2xl text-center mt-4'>
//         View all your reports here and create asset wise inventory
//       </h2>
//       <br />
//       <br />
//       <div className='flex ml-16 text-2xl'>
//         <Link to='/inventory'>
//               <button className='cursor-pointer'>
//                   Create and Manage your Inventory
//               </button>
//           </Link>
//       </div>
//       <br />
//       <br />
//       <div>

//         <h1 className='text-2xl text-center'>
//           View all previous reports below:
//         </h1>
// <br />
        
//         <p>{message}</p>
//       </div>
        
//     </div>
//   )
// }

// export default AdminPanel

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AdminPanel() {
  const [equipmentData, setEquipmentData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [equipmentTypeData, setequipmentTypeData] = useState([]);
  const [issueData, setIssueData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/assetManagement/equipmentType')
      .then(response => {
        setequipmentTypeData(response.data); // assuming response.data is an array
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

      axios.get('http://localhost:3000/room')
      .then(response1 => {
        setRoomData(response1.data); // assuming response.data is an array
        console.log(response1.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

      axios.get('http://localhost:3000/assetManagement/equipment')
      .then(response2 => {
        setEquipmentData(response2.data); // assuming response.data is an array
        console.log(response2.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

      axios.get('http://localhost:3000/assetManagement/issue')
      .then(response3 => {
        setIssueData(response3.data); // assuming response.data is an array
        console.log(response3.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
      
  }, []);

  return (
    <div className='p-6'>
      <h1 className='text-3xl text-center mt-16'>
        Welcome to Admin Dashboard
      </h1>
      <h2 className='text-2xl text-center mt-4'>
        View all your reports here and create asset-wise inventory
      </h2>

      <div className='flex ml-16 text-2xl mt-8'>
        <Link to='/inventory'>
          <button className='cursor-pointer bg-blue-500 text-white px-4 py-2 rounded'>
            Create and Manage your Inventory
          </button>
        </Link>
      </div>

      <div className='mt-12'>
        <h1 className='text-2xl text-center mb-4'>
          View all previous reports below:
        </h1>

        <div className='overflow-x-auto'>
          <table className='min-w-full border border-gray-300'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='px-4 py-2 border'>Equipment Type ID</th>
                <th className='px-4 py-2 border'>Equipment Name</th>
                <th className='px-4 py-2 border'>Quantity</th>
                <th className='px-4 py-2 border'>Type</th>
                <th className='px-4 py-2 border'>Description</th>
                {/* Add more columns as per your data structure */}
              </tr>
            </thead>
            <tbody>
              {equipmentTypeData.length > 0 ? (
                equipmentTypeData.map((item, index) => (
                  <tr key={index} className='text-center'>                               
                    <td className='px-4 py-2 border'>{item.equipmentTypeId}</td>
                    <td className='px-4 py-2 border'>{item.Title}</td>
                    <td className='px-4 py-2 border'>{item.Quantity}</td>
                    <td className='px-4 py-2 border'>{item.Types}</td>
                    <td className='px-4 py-2 border'>{item.Description}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className='px-4 py-2 border text-center' colSpan="4">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
          <br />
          <table className='min-w-full border border-gray-300'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='px-4 py-2 border'>Room No.</th>
                <th className='px-4 py-2 border'>Room Type</th>
                <th className='px-4 py-2 border'>FloorNo</th>
                <th className='px-4 py-2 border'>Condition</th>
                <th className='px-4 py-2 border'>Location</th>
                {/* Add more columns as per your data structure */}
              </tr>
            </thead>
            <tbody>
            {roomData.length > 0 ? (
                roomData.map((item, index) => (
                  <tr key={index} className='text-center'>                               
                    <td className='px-4 py-2 border'>{item.roomId}</td>
                    <td className='px-4 py-2 border'>{item.roomType}</td>
                    <td className='px-4 py-2 border'>{item.FloorNo}</td>
                    <td className='px-4 py-2 border'>{item.Condition}</td>
                    <td className='px-4 py-2 border'>{item.Location}</td>
                    
                  </tr>
                ))
              ) : (
                <tr>
                  <td className='px-4 py-2 border text-center' colSpan="4">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
          <br />
          <table className='min-w-full border border-gray-300'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='px-4 py-2 border'>Equipment ID.</th>
                <th className='px-4 py-2 border'>Equipment Type</th>
                <th className='px-4 py-2 border'>Warranty</th>
                <th className='px-4 py-2 border'>Condition</th>
                <th className='px-4 py-2 border'>Location</th>
                <th className='px-4 py-2 border'>QRCode</th>
                <th className='px-4 py-2 border'>Issue History</th>
                {/* Add more columns as per your data structure */}
              </tr>
            </thead>
            <tbody>
            {equipmentData.length > 0 ? (
                equipmentData.map((item, index) => (
                  <tr key={index} className='text-center'>                               
                    <td className='px-4 py-2 border'>{item.equipmentId}</td>
                    <td className='px-4 py-2 border'>{item.equipmentType}</td>
                    <td className='px-4 py-2 border'>{item.warranty}</td>
                    <td className='px-4 py-2 border'>{item.condition}</td>
                    <td className='px-4 py-2 border'>{item.Location}</td>
                    <td className='px-4 py-2 border'>{item.qrCode}</td>
                    <td className='px-4 py-2 border'>{item.issueHistory}</td>
                    
                  </tr>
                ))
              ) : (
                <tr>
                  <td className='px-4 py-2 border text-center' colSpan="4">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
          <br />
          <table className='min-w-full border border-gray-300'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='px-4 py-2 border'>Issue ID.</th>
                <th className='px-4 py-2 border'>Equipment Type</th>
                <th className='px-4 py-2 border'>Issue History</th>
                <th className='px-4 py-2 border'>Condition</th>
                <th className='px-4 py-2 border'>Location</th>


                {/* Add more columns as per your data structure */}
              </tr>
            </thead>
            <tbody>
            {issueData.length > 0 ? (
                issueData.map((item, index) => (
                  <tr key={index} className='text-center'>                               
                    <td className='px-4 py-2 border'>{item.issueId}</td>
                    <td className='px-4 py-2 border'>{item.equipmentType}</td>
                    <td className='px-4 py-2 border'>{item.issueHistory}</td>
                    <td className='px-4 py-2 border'>{item.condition}</td>
                    <td className='px-4 py-2 border'>{item.Location}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className='px-4 py-2 border text-center' colSpan="4">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
