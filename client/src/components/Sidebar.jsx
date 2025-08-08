import React, { useContext, useEffect, useState } from 'react';
import assets from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    unseenMessages,
  } = useContext(ChatContext);

  const { authUser, logout, onlineUsers } = useContext(AuthContext);
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const filteredUsers = input
    ? users.filter((user) =>
        user.fullname.toLowerCase().includes(input.toLowerCase())
      )
    : users;

  useEffect(() => {
    getUsers();
  }, [onlineUsers]);

  return (
    <div
      className={`bg-[#8185B2]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white shadow-lg backdrop-blur-md border border-white/10 ${
        selectedUser ? 'max-md:hidden' : ''
      }`}
    >
      {/* Header */}
      <div className="pb-5">
        <div className="flex justify-between items-center">
          <img src={assets.logo} alt="logo" className="max-w-40" />
          <div className="relative py-2 group">
            <img
              src={authUser?.profilePic || assets.menu_icon}
              alt="Menu"
              className="max-h-8 w-8 rounded-full border border-white object-cover cursor-pointer"
            />
            <div className="absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block">
              <p
                onClick={() => navigate('/profile')}
                className="cursor-pointer text-sm"
              >
                Edit Profile
              </p>
              <hr className="my-2 border-t border-gray-500" />
              <p onClick={logout} className="cursor-pointer text-sm">
                Logout
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5">
          <img src={assets.search_icon} alt="Search" className="w-3" />
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1"
            placeholder="Search User..."
          />
        </div>
      </div>

      {/* User List */}
      <div className="flex flex-col gap-2 mt-4">
        {filteredUsers.map((user, index) => (
          <div
            onClick={() => {setSelectedUser(user); setUnseenMessages(prev=>({...prev,[user._id]:0}))}}
            key={index}
            className={`relative flex items-start gap-3 p-3 rounded-lg cursor-pointer hover:bg-[#282142]/40 transition-all ${
              selectedUser?._id === user._id ? 'bg-[#282142]/50' : ''
            }`}
          >
            <img
              src={user?.profilePic || assets.avatar_icon}
              alt="avatar"
              className="w-[35px] aspect-square rounded-full object-cover"
            />
            <div className="flex flex-col justify-center leading-tight">
              <p className="text-sm font-medium">
                {user.fullname || 'Unnamed'}
              </p>
              {onlineUsers.includes(user._id) ? (
                <span className="text-green-400 text-[11px]">Online</span>
              ) : (
                <span className="text-neutral-400 text-[11px]">Offline</span>
              )}
            </div>
            {unseenMessages[user._id] > 0 && (
              <p className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] h-5 w-5 flex justify-center items-center rounded-full bg-violet-600 text-white">
                {unseenMessages[user._id]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
