import { useFormik } from 'formik'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../Login';
import { Icon } from '@iconify/react';

const UserRolesModal = ({visible, onClick, edit, ID}) => {
  const [checkedLabels, setCheckedLabels] = useState([])
  const [preDefinedLabels, setPreDefinedLabels] = useState([])
  const { token } = useAuth()

  const formik = useFormik({
    initialValues:{
      RoleName:"",
      AccessRights: ""
    },
    onSubmit: (values) =>{
      const updatedData = {
        RoleName: values.RoleName,
        AccessRights: checkedLabels.toString(),
      }
      addUserRole(updatedData)
    }
  })

  const addUserRole = async(data) => {
    try {
      const reponse = await axios.post('http://localhost:5500/create-user-roles/FnAddUpdateDeleteRecord', data,
      {
        params: { IUFlag: 'I'},
        headers: { Authorization: `Bearer ${token}`}
      })
      alert('User role created successfully')
      onClick()
    } catch (error) {
      console.error('Error', error);
    }
  }
  
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
    const response = await axios.get('http://localhost:5500/create-user-roles/FnShowParticularData',
    {
        params: {RoleId: ID},
        headers: { Authorization: `Bearer ${token}`}
    })
    const data = response.data
    } catch (error) {
        
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
        if (isChecked) {
            // If the title checkbox is checked, set all items to checked
            setHeadingChecked(true);
            setItemsChecked((prevItems) => {
                const updatedItems = {};
                for (const itemName in prevItems) {
                    updatedItems[itemName] = true;
                    handleItemChange(itemName, true);
                }
                return updatedItems;
            });
        } else {
            // If the title checkbox is unchecked, uncheck all items
            const allItemsChecked = Object.values(itemsChecked).every((item) => item);
            if (allItemsChecked) {
                setHeadingChecked(false);
                setItemsChecked((prevItems) => {
                    const updatedItems = {};
                    for (const itemName in prevItems) {
                        updatedItems[itemName] = false;
                        handleItemChange(itemName, false);
                    }
                    return updatedItems;
                });
            }
        }
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

    // const handleChange = (itemName, isChecked) => {
    //     handleItemChange(itemName, isChecked);
    // };

    const clearCheckedItems = () => {
        // Uncheck all items
        setItemsChecked((prevItems) => {
            const updatedItems = {};
            for (const itemName in prevItems) {
                updatedItems[itemName] = false;
                handleItemChange(itemName, false);
            }
            return updatedItems;
        });
    };

    const handleHeadingClick = () => {
      if (!headingChecked) {
          // If the title is unchecked, set all items to checked
          setHeadingChecked(true);
          const updatedItems = {};
          items.forEach((item) => {
              updatedItems[item.name] = true;
              handleItemChange(item.name, true);
          });
          setItemsChecked(updatedItems);
      } else {
          // If the title is checked, uncheck all items
          setHeadingChecked(false);
          const updatedItems = {};
          items.forEach((item) => {
              updatedItems[item.name] = false;
              handleItemChange(item.name, false);
          });
          setItemsChecked(updatedItems);
      }
  };

// Function to handle item checkbox change
const handleChange = (itemName, isChecked) => {
  handleItemChange(itemName, isChecked);
  setItemsChecked((prevItems) => {
      const updatedItems = { ...prevItems, [itemName]: isChecked };
      setHeadingChecked(Object.values(updatedItems).every((item) => item));
      return updatedItems;
  });
};


    return (
        <div className="">
            <div>
                <label className="font-bold text-[16px] flex items-center whitespace-nowrap">
                <Icon icon="carbon:checkbox-checked" className = 'cursor-pointer hover:shadow-lg duration-300 mr-2' width="24" height="24"  style={{color: '#1ec247'}} onClick={handleHeadingClick} />
                    {title}
                    <Icon icon="fluent-emoji-high-contrast:cross-mark-button" className = 'cursor-pointer hover:shadow-lg duration-300 ml-2' width="22" height="22"  style={{color: '#e63333'}} onClick={clearCheckedItems} />                </label>
                <hr className="border-t-2 mt-1 border-black font-bold" />
            </div>
            <div className="mt-2 ml-2">
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
        { name: '624', label: 'Two Field Master' }
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


  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full h-full">
        <div className="bg-gray-200 w-fit h-[100%] overflow-y-scroll p-8 rounded-lg">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[15px] font-semibold text-center">
              User Roles
            </p>
            <Icon
              icon="maki:cross"
              color="white"
              className="cursor-pointer"
              onClick={onClick}
              width="24"
              height="24"
            />
          </div>
          <div className="py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="capatilize font-semibold  text-[13px]">
                  Role Name
                </p>
                <input
                  id="RoleName"
                  type="text"
                  value={formik.values.RoleName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
          </div>
              <div className='grid grid-cols-4 gap-6 gap-x-9 mt-5'>
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
         </div>
         <div className="flex justify-center gap-4 mt-5">
      <button
        type="submit"
        className="px-6 py-2 bg-blue-900 text-white text-lg rounded-md hover:bg-green-600 duration-500 "
      >
        Save User Rights
      </button>
    </div>

        </div>
      </div>
    </form>
  )
}


export default UserRolesModal