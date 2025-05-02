import React, {useState} from 'react'
import Electronics from '../components/Electronics'
import Furniture from '../components/Furniture'

function AddEquipment() {

  const [data, setData] = useState(undefined);

  const options = [
    "Electronics",
    "Furniture",
    ];

    const onOptionChangeHandler = (e) => {
      setData(e.target.value);
  };

  return (
    <>
    <h1 className='text-2xl text-center mt-12'>
      Choose the type of equipment you want to add
    </h1>
    <br />
    <div className='flex justify-center mb-8'>
    <select className='text-xl' onChange={onOptionChangeHandler}>
                <option >Click to view options: </option>
                {options.map((option, index) => {
                    return (
                        <option key={index}>
                            {option}
                        </option>
                    );
                })}
    </select>
    </div>
    
    {data === "Electronics" && <Electronics />}
    {data === "Furniture" && <Furniture />}
    
    </>
  )
}

export default AddEquipment