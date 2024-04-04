import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../Login';

const UserRights = ({ID}) => {
  const [checkedLabels, setCheckedLabels] = useState([])
  const [preDefinedLabels, setPreDefinedLabels] = useState([])
  const { token } = useAuth()

  const handleItemChange = (itemName, isChecked) => {
    setCheckedLabels(prevItems => {
      const updatedItems = new Set(prevItems);
      if (isChecked) {
        updatedItems.add(itemName);
      } else {
        updatedItems.delete(itemName);
      }
      return Array.from(updatedItems);
    });
  };

  useEffect(() => {
    console.log('Checked Labels', checkedLabels);
  }, [checkedLabels]);

  const fetchAccessRights = async () =>{
    try {
      const response = await axios.get('http://localhost:5500/users/allowed-access',{
        params :{ EmployeeId: ID },
        headers: { Authorization: `Bearer ${token}`}
      })
      const data = response.data.accessrights
      const dataNums = data.split(',').map(Number);
      setPreDefinedLabels(dataNums)
      console.log('Predefined rights', data)
    } catch (error) {
      console.error('Error', error);
    }
  } 

  useEffect(() => {
    const allLabels = [...preDefinedLabels, ...checkedLabels];
    const threeDigitLabels = allLabels.filter(label => label >= 100 && label <= 999);
    const checkedLabelsStrings = threeDigitLabels.map(label => String(label));
    setCheckedLabels(prevState => [...prevState, ...checkedLabelsStrings]);
}, [preDefinedLabels]);  

  useEffect(() => {
    fetchAccessRights()
  },[ID, token])

  const ToggleMenu = ({ title, items, handleItemChange, checkedLabels }) => {
    const [headingChecked, setHeadingChecked] = useState(false);
    const [itemsChecked, setItemsChecked] = useState(() => {
      const initialState = {};
      items.forEach((item) => {
        initialState[item.name] = false;
      });
      return initialState;
    });

    // useEffect to update headingChecked when all items are checked
    useEffect(() => {
      setHeadingChecked(Object.values(itemsChecked).every((item) => item));
    }, [itemsChecked]);

    // Function to handle heading checkbox change
    const handleHeadingChange = (event) => {
      const isChecked = event.target.checked;
      setHeadingChecked(isChecked);
      setItemsChecked((prevItems) => {
        const updatedItems = {};
        for (const itemName in prevItems) {
          updatedItems[itemName] = isChecked;
          handleItemChange(itemName, isChecked);
        }
        return updatedItems;
      });
    };

    // Function to handle item checkbox change
    const handleItemCheckboxChange = (event) => {
      const { name, checked } = event.target;
      setItemsChecked((prevItems) => ({
        ...prevItems,
        [name]: checked,
      }));
      handleItemChange(name, checked);
    };

    const handleChange = (itemName, isChecked) => {
      handleItemChange(itemName, isChecked);
    };

    return (
      <div className="">
        <div>
          <label className="font-bold text-[16px] flex items-center whitespace-nowrap">
            <input
              type="checkbox"
              className="h-5 w-5 mr-2"
              checked={checkedLabels.includes(title)}
              onChange={handleHeadingChange}
            />
            {title}
          </label>
          <hr className="border-t-2 mt-1 border-black font-bold" />
        </div>
        <div className="mt-2">
          <ul>
            {items.map((item) => (
              <li key={item.name}>
                <label className="text-[14px] flex items-center mt-1 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="h-4 w-4 mr-2"
                    name={item.name}
                    checked={checkedLabels.includes(item.name)}
                    onChange={(e) => handleChange(item.name, e.target.checked)}
                  />
                  {item.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const addAccessRights = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5500/users/accessrights',
        checkedLabels,
        {
          params: { EmployeeId: ID },
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      alert('Access rights updated successfully')
      console.log(response.data);
    } catch (error) {
      alert('User not registered')
      console.error('Error', error);
    }
  };
  

  const Menu1 = [
    {
      title: 'Company Settings',
      items: [
        { name: '549', label: 'Company Configuration' },
        { name: '703', label: 'Company Master' },
        { name: '872', label: 'Financial Year Master' },
        { name: '287', label: 'Bank Master' },
        { name: '610', label: 'Cost Center Master' },
        { name: '954', label: 'Department Master' },
        { name: '736', label: 'Three Field Master' },
        { name: '624', label: 'Two Field Master' },
        { name: '777', label: 'User Roles'}
      ],      
    },
  ];

  const Menu2 = [    {
    title: 'Employee Settings',
    items: [
      { name: '431', label: 'Employee Settings' },
      { name: '217', label: 'Employee Master' },
      { name: '820', label: 'Employee Type Master' },
      { name: '598', label: 'Employee Grade Master' },
      { name: '143', label: 'Designation Master' },
      { name: '502', label: 'KRA Master' },
      { name: '395', label: 'Job Responsibility Master' },
      { name: '786', label: 'Employee Band Master' }
    ]    
  },
]

const Menu3 = [    {
  title: 'Attendance Settings',
  items: [
    { name: '875', label: 'Job Type Master' },
    { name: '752', label: 'Shift Master' },
    { name: '201', label: 'Weekly Off Master' },
    { name: '409', label: 'Holiday Master' },
    { name: '148', label: 'Attendance Device Master' }
  ]  
},
]

const Menu4 = [    {
  title: 'Payroll Management',
  items: [
    { name: '269', label: 'Earning Heads Master' },
    { name: '370', label: 'Deduction Heads Master' },
    { name: '548', label: 'Employee Type Earning Master' },
    { name: '753', label: 'Employee Type Deduction Master' },
    { name: '654', label: 'Professional Tax Setting' },
    { name: '531', label: 'Advance Request' },
    { name: '317', label: 'Advance Approval' },
    { name: '497', label: 'Advance Repayment' }
  ]
  
},
]

const Menu5 = [    {
  title: 'Leaves Management',
  items: [
    { name: '460', label: 'Leave Type Master' },
    { name: '706', label: 'Leave Balance Upload' },
    { name: '153', label: 'Leave Application' },
    { name: '418', label: 'Leave Approvals' }
  ]  
},
]

const Menu6 = [    {
  title: 'Attendance Management',
  items: [
    { name: '273', label: 'Shift Roster' },
    { name: '159', label: 'Manual Attendance Entry' },
    { name: '523', label: 'Manual Attendance Approval' },
    { name: '926', label: 'Out Door Duty Attendance Entry' },
    { name: '832', label: 'Out Door Duty Attendance Approval' },
    { name: '871', label: 'Employee Gate Pass Entry' },
    { name: '619', label: 'Employee Gate Pass Approval' },
    { name: '625', label: 'Job Allocation' },
    { name: '758', label: 'Daily Attendance Processing' },
    { name: '690', label: 'Attendance Import' },
    { name: '907', label: 'Monthly Attendance Processing' }
  ]  
},
]

const Menu7 = [    {
  title: 'Salary Management',
  items: [
    { name: '879', label: 'Daily Overtime Processing' },
    { name: '182', label: 'Monthly Overtime Processing' },
    { name: '305', label: 'Overtime Approvals' },
    { name: '724', label: 'Advance Management' },
    { name: '407', label: 'Earning-Deduction Imports' },
    { name: '603', label: 'Salary Processing' },
    { name: '141', label: 'Salary Corrections' }
  ]  
},
]

const Menu8 = [    {
  title: 'Register',
  items: [
    { name: '593', label: 'Master Register' }
  ]    
},
]

const menus = [
  Menu1,
  Menu2,
  Menu3,
  Menu4,
  Menu5,
  Menu6,
  Menu7,
];

return (
  <>
 <div className='grid grid-cols-4 gap-5'>
      {menus.map((menu, index) => (
        <div key={index}>
          {menu.map((subMenu, subIndex) => (
            <ToggleMenu
              key={subIndex}
              title={subMenu.title}
              items={subMenu.items}
              handleItemChange={handleItemChange}
              checkedLabels={checkedLabels}
            />
          ))}
        </div>
      ))}
    </div>
    <div className="flex justify-center gap-4 mt-5">
      <button
        type="submit"
        onClick={addAccessRights}
        className="px-6 py-2 bg-blue-900 text-white text-lg rounded-md hover:bg-green-600 duration-500 "
      >
        Save User Rights
      </button>
    </div>
  </>
);
}

export default UserRights
