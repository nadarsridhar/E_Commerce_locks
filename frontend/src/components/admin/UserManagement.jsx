// import React from 'react'

// import  {useState}  from "react";


// const UserManagement = () => {
//     const users = [
//     {
//         _id: 123123,
//         name: "Jhon Doe",
//         email:"john@example.com",
//         role:"admin",
//     },
//    ];
   
   
//   const [formData, setFormData] = useState({
//     name:"",
//     email:"",
//     password:"",
//     role:"customer",//Default role 
//   });
                                           
//   const handlechange = (e) => {
//     setFormData({
//         ...formData,
//         [e.target.name]: e.target.value,
//     });
//   };
                                           
//  const handleSubmit = (e) => {
//      e.preventDefault();
//      console.log(formData);
//      //Reset the form after submission
//      setFormData({
//                  name:"",
//                  email:"",
//                  password:"",
//                  role:"customer",
//                  });
//  };
 
//  const handleRoleChange = (userId, newRole) => {
//      console.log({id: userId, role: newRole});
//  };
 
//  const handleDeleteUser = (userId) => {
//      if(window.confirm("Are you sure you want to delete this user?")) {
//         console.log("deleting user with ID", userId);
//      }
//  };

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-6">User Management</h2>
//       {/* Add New User Form*/}
//     <div className="p-6 rounded-lg mb-6">
//       <h3 className="text-lg font-bold mb-4">Add New User</h3>
//       <form onSubmit={handleSubmit}>
//          <div className="mb-4">
//          <label className="block text-gray-700">Name</label>
//          <input 
//          type="text" 
//          name="name" 
//          value={formData.name} 
//          onChange={handlechange}
//          className="w-full p-2 border rounded"
//          required 
//          />
//          </div>
         
//          <div className="mb-4">
//          <label className="block text-gray-700">Email</label>
//          <input 
//          type="email" 
//          name="email" 
//          value={formData.email} 
//          onChange={handlechange}
//          className="w-full p-2 border rounded"
//          required 
//          />
//          </div>
         
//          <div className="mb-4">
//          <label className="block text-gray-700">Password</label>
//          <input 
//          type="password" 
//          name="password" 
//          value={formData.password} 
//          onChange={handlechange}
//          className="w-full p-2 border rounded"
//          required 
//          />
//          </div>
         
//          <div className="mb-4">
//          <label className="block text-gray-700">Role</label>
//            <select 
//            name="role" 
//            value={formData.role} 
//            onChange={handlechange}
//            className="w-full p-2 border rounded"
//            >
//              <option value="customer">customer</option>
//              <option value="admin">Admin</option>
//            </select>
//          </div>
//          <button 
//          type="submit"
//          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
//          >
//          Add User
//          </button>
//       </form>
//     </div>
    
//     {/* User List Management*/}
//     <div className="overflow-x-auto shadow-md sm:rounded-lg">
//      <table className="min-w-full text-left text-gray-500">
//      <thead className="bg-gray-100 text-xs uppercase text-gray-700">
//        <tr>
//        <th className="py-3 px-4">Name</th>
//        <th className="py-3 px-4">Email</th>
//        <th className="py-3 px-4">Role</th>
//        <th className="py-3 px-4">Acions</th>
//        </tr>
//      </thead>
//      <tbody>
//        {users.map((user)=> (
//                             <tr key={user._id} className="border-b hover:bg-grey-50">
//                               <td className="p-4 font-medium text-gray-900  whitespace-nowrap">
//                                {user.name}
//                               </td>
//                               <td className="p-4">{user.email}</td>
//                               <td className="p-4">
//                                  <select 
//                                  value={user.role} 
//                                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
//                                  className="p-2 boder rounded"
//                                  >
//                                  <option value="customer">Customer</option>
//                                  <option value="admin">Admin</option>
//                                  </select>
//                               </td>
//                               <td className="p-4">
//                                 <button 
//                                 onClick={() => handleDeleteUser(user._id)}
//                                 className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                                 >
//                                  Delete 
//                                  </button>
//                               </td>
//                             </tr>
//                             ))}
//                     </tbody>
//                     </table>
//     </div>
//     </div>
//   );
// };
// export default UserManagement;


// import React, { useState, useEffect } from "react";
// import axios from "axios";

// axios.defaults.baseURL = "http://localhost:9000";

// const UserManagement = () => {
//   const [users, setUsers] = useState([]);

//   const [formData, setFormData] = useState({
//     name: "",
//     mobile: "+91",         // ✅ Starts with +91
//     email: "",
//     password: "",
//     role: "customer",
//   });

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get("/api/admin/users", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(response.data);
//     } catch (error) {
//       console.error("Failed to fetch users", error);
//       alert("Failed to fetch users");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // ✅ Enforce +91 for mobile
//     if (name === "mobile") {
//       if (!value.startsWith("+91")) return;
//       if (value.length > 13) return; // +91 + 10 digits
//     }

//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // ✅ Validate mobile
//     const mobileDigits = formData.mobile.slice(3);
//     if (!/^\d{10}$/.test(mobileDigits)) {
//       alert("Please enter a valid 10-digit mobile number after +91");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");
//       await axios.post("/api/admin/users", formData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert("User added successfully!");
//       fetchUsers();
//       setFormData({
//         name: "",
//         mobile: "+91",
//         email: "",
//         password: "",
//         role: "customer",
//       });
//     } catch (error) {
//       console.error("Failed to add user", error);
//       alert("Failed to add user");
//     }
//   };

//   const handleRoleChange = async (userId, newRole) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(`/api/admin/users/${userId}`, { role: newRole }, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert("User role updated!");
//       fetchUsers();
//     } catch (error) {
//       console.error("Failed to update user role", error);
//       alert("Failed to update user role");
//     }
//   };

//   const handleDeleteUser = async (userId) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       try {
//         const token = localStorage.getItem("token");
//         await axios.delete(`/api/admin/users/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         alert("User deleted successfully!");
//         fetchUsers();
//       } catch (error) {
//         console.error("Failed to delete user", error);
//         alert("Failed to delete user");
//       }
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-6">User Management</h2>

//       {/* Add New User Form */}
//       <div className="p-6 rounded-lg mb-6 bg-white shadow">
//         <h3 className="text-lg font-bold mb-4">Add New User</h3>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700">Mobile Number</label>
//             <input
//               type="text"
//               name="mobile"
//               value={formData.mobile}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               required
//               placeholder="+91XXXXXXXXXX"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700">Role</label>
//             <select
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//             >
//               <option value="customer">Customer</option>
//               <option value="admin">Admin</option>
//             </select>
//           </div>

//           <button
//             type="submit"
//             className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
//           >
//             Add User
//           </button>
//         </form>
//       </div>

//       {/* User List Management */}
//       <div className="overflow-x-auto shadow-md sm:rounded-lg">
//         <table className="min-w-full text-left text-gray-500">
//           <thead className="bg-gray-100 text-xs uppercase text-gray-700">
//             <tr>
//               <th className="py-3 px-4">Name</th>
//               <th className="py-3 px-4">Mobile</th>
//               <th className="py-3 px-4">Email</th>
//               <th className="py-3 px-4">Role</th>
//               <th className="py-3 px-4">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user._id} className="border-b hover:bg-gray-50">
//                 <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
//                   {user.name}
//                 </td>
//                 <td className="p-4">{user.mobile}</td>
//                 <td className="p-4">{user.email}</td>
//                 <td className="p-4">
//                   <select
//                     value={user.role}
//                     onChange={(e) => handleRoleChange(user._id, e.target.value)}
//                     className="p-2 border rounded"
//                   >
//                     <option value="customer">Customer</option>
//                     <option value="admin">Admin</option>
//                   </select>
//                 </td>
//                 <td className="p-4">
//                   <button
//                     onClick={() => handleDeleteUser(user._id)}
//                     className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UserManagement;


import React, { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:9000";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "+91",
    email: "",
    password: "",
    role: "customer",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users", error);
      alert("Failed to fetch users");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile") {
      if (!value.startsWith("+91")) return;
      if (value.length > 13) return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mobileDigits = formData.mobile.slice(3);
    if (!/^\d{10}$/.test(mobileDigits)) {
      alert("Please enter a valid 10-digit mobile number after +91");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post("/api/admin/users", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("User added successfully!");
      fetchUsers();
      setFormData({
        name: "",
        mobile: "+91",
        email: "",
        password: "",
        role: "customer",
      });
    } catch (error) {
      console.error("Failed to add user", error);
      alert("Failed to add user");
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`/api/admin/users/${userId}`, { role: newRole }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("User role updated!");
      fetchUsers();
    } catch (error) {
      console.error("Failed to update user role", error);
      alert("Failed to update user role");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`/api/admin/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("User deleted successfully!");
        fetchUsers();
      } catch (error) {
        console.error("Failed to delete user", error);
        alert("Failed to delete user");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>

      {/* Add New User Form */}
      <div className="p-6 rounded-lg mb-6 bg-white shadow">
        <h3 className="text-lg font-bold mb-4">Add New User</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Mobile Number</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
              placeholder="+91XXXXXXXXXX"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Add User
          </button>
        </form>
      </div>

      {/* User List Management */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Mobile</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                  {user.name}
                </td>
                <td className="p-4">{user.mobile}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="p-2 border rounded"
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
