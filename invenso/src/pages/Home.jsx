import Lottie from 'lottie-react'
import homeAnimation from '../lotties/homeAnimation.json'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import About from '../components/About'

function Home() {
  const navigate = useNavigate();
   const [enrollmentNo, setEnrollmentNo] = useState('');
  const [issueResults, setIssueResults] = useState([]);
  const [error, setError] = useState(null);

  const handleAdminAccess = () => {
    const token = prompt('Enter admin token:');
    console.log('Token entered:', token);
    console.log('Expected token:', import.meta.env.VITE_ADMIN_TOKEN);
    if (token === import.meta.env.VITE_ADMIN_TOKEN) {
      localStorage.setItem('admin_token', token); 
      navigate('/adminpanel');
    } else {
      alert('Invalid admin token. Try again!');
    }
  };

  const fetchIssuesByEnrollment = async () => {
    try {
      const response = await axios.get(`https://invenso-backend.onrender.com/assetManagement/issue/enrollment/${enrollmentNo}`);
      setIssueResults(response.data);
      setError(null);
    } catch (err) {
      setIssueResults([]);
      setError('No issues found or server error.');
    }
  };
  return (
    <div>
    <section  className="main1">
    <img src="https://images.shiksha.com/mediadata/images/1512469113phpxVkQNz.png" alt="" className='w-full brightness-50 h-[34rem]'/>
    <div className='absolute top-1/3 left-1/4 -translate-1/2 1/2'>
    <h1 className='text-center text-6xl mt-16 text-white'>
            Welcome to INVENSO
        </h1>
        <p className='text-justify text-2xl mt-4 text-white'>
            This is BPIT's official ASSET MANAGEMENT SYSTEM
            </p>
            </div>
    </section>
        
<br />

<div className='flex flex-row justify-evenly'>
  <Lottie animationData ={homeAnimation} className='w-1/4 h-[20rem] '/>
  <p className='text-3xl mt-32'>
  Smart Tracking. Seamless Management. Smarter Campus.
  </p>
</div>
<br />
<div>
  <About/>
</div>
<br />
<br />
<br />
        <div className='flex flex-row justify-center'>
        <h2 className='text-2xl font-bold text-center mr-4 mt-2'>Log into Admin Panel</h2>
      <button className='bg-blue-500 text-white px-4 py-2 rounded-lg' onClick={handleAdminAccess}>Admin Access</button>
    </div>
<br />
<br />
<div className='mt-10 px-4 mb-12'>
        <h2 className='text-2xl font-bold text-center'>Check Your Issue History</h2>
        <div className='flex justify-center mt-4'>
          <input
            type="text"
            placeholder="Enter Enrolment No."
            value={enrollmentNo}
            onChange={(e) => setEnrollmentNo(e.target.value)}
            className='border px-4 py-2 rounded-l w-64 text-md'
          />
          <button
            onClick={fetchIssuesByEnrollment}
            className='bg-blue-500 text-white px-4 py-2 rounded-r'
          >
            Search
          </button>
        </div>

        {error && <p className='text-red-500 text-center mt-4'>{error}</p>}

        {issueResults.length > 0 && (
          <div className='mt-6 overflow-x-auto'>
            <table className='min-w-full border border-gray-300 text-sm'>
              <thead>
                <tr className='bg-gray-100'>
                  <th className='px-4 py-2 border'>Issue ID</th>
                  <th className='px-4 py-2 border'>Equipment Type</th>
                  <th className='px-4 py-2 border'>Condition</th>
                  <th className='px-4 py-2 border'>Location</th>
                  <th className='px-4 py-2 border'>Status</th>
                </tr>
              </thead>
              <tbody>
                {issueResults.map((item, index) => (
                  <tr key={index} className='text-center'>
                    <td className='px-4 py-2 border'>{item.issueId}</td>
                    <td className='px-4 py-2 border'>{item.equipmentType}</td>
                    <td className='px-4 py-2 border'>{item.condition}</td>
                    <td className='px-4 py-2 border'>{item.Location}</td>
                    <td className='px-4 py-2 border'>{item.Status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>  
    </div>
    
  )
}

export default Home