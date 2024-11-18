/* eslint-disable react/prop-types */

import { Link, useLocation } from 'react-router-dom';


const SidebarItem = ({ to, children, onClick }) => {
  const location = useLocation(); // Get current location
  const isActive = location.pathname === to; // Check if the current path matches the link

  return (
    <div className={` cursor-pointer mt-6  ${isActive ? 'bg-gray-400' : 'hover:bg-gray-400'} px-0 md:px-6`}>
      {to ? (
        <Link
          to={to}
          className={`block  rounded mb-4 `}
        >
          {children}
        </Link>
      ) : (
        <button
          onClick={onClick}
          className="block  rounded w-full text-left"
        >
          {children}
        </button>
      )}
    </div>
  );
};


const Sidebar = ({ items }) => {
  return (
    <div className="sidebar p-2 w-32 md:w-64 bg-gray-700 text-white ">
      <ul>
      <Link to='/admin/dashboard' class="text-xl font-semibold md:px-6">EMS</Link>
        {items.map((item, index) => (
          <li key={index} >
            
            <SidebarItem to={item.to} onClick={item.onClick}>
              <div className='flex gap-4 items-center w-full h-full py-2 px-1'>
              <div className='w-18'>{item.icon}</div> {item.label}
              </div>
             
            </SidebarItem>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Sidebar;
