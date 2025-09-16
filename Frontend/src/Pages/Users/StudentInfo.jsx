// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function StudentInfo() {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [editRowId, setEditRowId] = useState(null);
//   const [formData, setFormData] = useState({});

//   // ✅ Fetch students
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:7070/api/displayUsers-s"
//         );
//         const studentOnly = response.data.filter(
//           (user) => user.role === "student"
//         );
//         setStudents(studentOnly);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch students");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStudents();
//   }, []);

//   // ✅ Handle edit button click
//   const handleEdit = (student) => {
//     setEditRowId(student.rollNo_id);
//     setFormData({ ...student });
//   };

//   // ✅ Cancel editing
//   const handleCancel = () => {
//     setEditRowId(null);
//     setFormData({});
//   };

//   // ✅ Update user
//   const handleUpdate = async () => {
//     if (!formData.rollNo_id) {
//       alert("❌ User ID is missing. Cannot update User.");
//       return;
//     }
//     try {
//       const response = await axios.put(
//         `http://localhost:7070/api/EditUserProfiles/${formData.rollNo_id}`,
//         formData
//       );
//       alert("✅ User updated successfully!");

//       // Update state without refetch
//       setStudents((prev) =>
//         prev.map((s) =>
//           s.rollNo_id === formData.rollNo_id ? response.data.user : s
//         )
//       );

//       localStorage.setItem("studentInfo", JSON.stringify(response.data.user));
//       handleCancel();
//     } catch (error) {
//       console.error("Error updating user:", error.response || error);
//       alert(error.response?.data?.message || "❌ Failed to update user.");
//     }
//   };

//   // ✅ Delete user
//   const handleDelete = async (rollNo_id) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;

//     try {
//       const response = await axios.delete(
//         `http://localhost:7070/api/DeleteUsers/${rollNo_id}`
//       );
//       alert("✅ User deleted successfully!");

//       // Remove deleted student from state
//       setStudents((prev) => prev.filter((s) => s.rollNo_id !== rollNo_id));
//     } catch (error) {
//       console.error("Error deleting user:", error.response || error);
//       alert(error.response?.data?.message || "❌ Failed to delete user.");
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
//     <div className="p-6  min-h-screen">
//       <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
//         Student Information
//       </h2>

//       <div className="overflow-x-auto shadow-lg rounded-lg">
//         <table className="min-w-full bg-white border border-gray-200 rounded-lg">
//           <thead className="bg-blue-600 text-white">
//             <tr>
//               <th className="py-3 px-4 text-left">Department</th>
//               <th className="py-3 px-4 text-left">Batch</th>
//               <th className="py-3 px-4 text-left">Class</th>
//               <th className="py-3 px-4 text-left">Semester</th>
//               <th className="py-3 px-4 text-left">Division</th>
//               <th className="py-3 px-4 text-left">Roll No</th>
//               <th className="py-3 px-4 text-left">First Name</th>
//               <th className="py-3 px-4 text-left">Middle Name</th>
//               <th className="py-3 px-4 text-left">Last Name</th>
//               <th className="py-3 px-4 text-left">Email</th>
//               <th className="py-3 px-4 text-left">Contact</th>
//               <th className="py-3 px-4 text-left">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {students.length > 0 ? (
//               students.map((student, index) => (
//                 <tr
//                   key={`${student.rollNo_id}-${index}`}
//                   className={`border-b hover:bg-gray-100 ${
//                     index % 2 === 0 ? "bg-gray-50" : "bg-white"
//                   }`}
//                 >
//                   {/* Department */}
//                   <td className="py-2 px-4">
//                     {editRowId === student.rollNo_id ? (
//                       <select
//                         value={formData.department || ""}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             department: e.target.value,
//                           })
//                         }
//                         className="border px-2 py-1 rounded"
//                       >
//                         <option value="">-- Select Department --</option>
//                         <option value="CSE">CSE</option>
//                         <option value="IT">IT</option>
//                         <option value="ECE">ECE</option>
//                         <option value="EEE">EEE</option>
//                         <option value="ME">ME</option>
//                         <option value="CE">CE</option>
//                       </select>
//                     ) : (
//                       student.department
//                     )}
//                   </td>

//                   {/* Batch */}
//                   <td className="py-2 px-4">
//                     {editRowId === student.rollNo_id ? (
//                       <select
//                         value={formData.batch || ""}
//                         onChange={(e) =>
//                           setFormData({ ...formData, batch: e.target.value })
//                         }
//                         className="border px-2 py-1 rounded"
//                       >
//                         <option value="">-- Select Batch --</option>
//                         <option value="2021-2025">2021-2025</option>
//                         <option value="2022-2026">2022-2026</option>
//                         <option value="2023-2027">2023-2027</option>
//                       </select>
//                     ) : (
//                       student.batch
//                     )}
//                   </td>

//                   {/* Class */}
//                   <td className="py-2 px-4">
//                     {editRowId === student.rollNo_id ? (
//                       <select
//                         value={formData.Class || ""}
//                         onChange={(e) =>
//                           setFormData({ ...formData, Class: e.target.value })
//                         }
//                         className="border px-2 py-1 rounded"
//                       >
//                         <option value="">-- Select Class --</option>
//                         <option value="FE">FE</option>
//                         <option value="SE">SE</option>
//                         <option value="TE">TE</option>
//                         <option value="BE">BE</option>
//                       </select>
//                     ) : (
//                       student.Class
//                     )}
//                   </td>

//                   {/* Semester */}
//                   <td className="py-2 px-4">
//                     {editRowId === student.rollNo_id ? (
//                       <select
//                         value={formData.semester || ""}
//                         onChange={(e) =>
//                           setFormData({ ...formData, semester: e.target.value })
//                         }
//                         className="border px-2 py-1 rounded"
//                       >
//                         <option value="">-- Select Semester --</option>
//                         {[...Array(8)].map((_, i) => (
//                           <option key={i + 1} value={i + 1}>
//                             Semester {i + 1}
//                           </option>
//                         ))}
//                       </select>
//                     ) : (
//                       student.semester
//                     )}
//                   </td>

//                   {/* Division */}
//                   <td className="py-2 px-4">
//                     {editRowId === student.rollNo_id ? (
//                       <select
//                         value={formData.div || ""}
//                         onChange={(e) =>
//                           setFormData({ ...formData, div: e.target.value })
//                         }
//                         className="border px-2 py-1 rounded"
//                       >
//                         <option value="">-- Select Division --</option>
//                         <option value="A">A</option>
//                         <option value="B">B</option>
//                         <option value="C">C</option>
//                         <option value="D">D</option>
//                       </select>
//                     ) : (
//                       student.div
//                     )}
//                   </td>

//                   {/* Roll No */}
//                   <td className="py-2 px-4">{student.rollNo_id}</td>

//                   {/* First Name */}
//                   <td className="py-2 px-4">
//                     {editRowId === student.rollNo_id ? (
//                       <input
//                         type="text"
//                         value={formData.fName || ""}
//                         onChange={(e) =>
//                           setFormData({ ...formData, fName: e.target.value })
//                         }
//                         className="border px-2 py-1 rounded"
//                       />
//                     ) : (
//                       student.fName
//                     )}
//                   </td>

//                   {/* Middle Name */}
//                   <td className="py-2 px-4">
//                     {editRowId === student.rollNo_id ? (
//                       <input
//                         type="text"
//                         value={formData.mName || ""}
//                         onChange={(e) =>
//                           setFormData({ ...formData, mName: e.target.value })
//                         }
//                         className="border px-2 py-1 rounded"
//                       />
//                     ) : (
//                       student.mName
//                     )}
//                   </td>

//                   {/* Last Name */}
//                   <td className="py-2 px-4">
//                     {editRowId === student.rollNo_id ? (
//                       <input
//                         type="text"
//                         value={formData.lName || ""}
//                         onChange={(e) =>
//                           setFormData({ ...formData, lName: e.target.value })
//                         }
//                         className="border px-2 py-1 rounded"
//                       />
//                     ) : (
//                       student.lName
//                     )}
//                   </td>

//                   {/* Email */}
//                   <td className="py-2 px-4">
//                     {editRowId === student.rollNo_id ? (
//                       <input
//                         type="email"
//                         value={formData.email || ""}
//                         onChange={(e) =>
//                           setFormData({ ...formData, email: e.target.value })
//                         }
//                         className="border px-2 py-1 rounded"
//                       />
//                     ) : (
//                       student.email
//                     )}
//                   </td>

//                   {/* Contact */}
//                   <td className="py-2 px-4">
//                     {editRowId === student.rollNo_id ? (
//                       <input
//                         type="tel"
//                         pattern="[0-9]{10}"
//                         maxLength={10}
//                         value={formData.contact || ""}
//                         onChange={(e) =>
//                           setFormData({ ...formData, contact: e.target.value })
//                         }
//                         className="border px-2 py-1 rounded"
//                       />
//                     ) : (
//                       student.contact
//                     )}
//                   </td>

//                   {/* Actions */}
//                   <td className="py-2 px-4">
//                     {editRowId === student.rollNo_id ? (
//                       <div className="flex gap-2">
//                         <button
//                           onClick={handleUpdate}
//                           className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
//                         >
//                           Save
//                         </button>
//                         <button
//                           onClick={handleCancel}
//                           className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
//                         >
//                           Cancel
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="flex ">
//                         <button
//                           onClick={() => handleEdit(member)}
//                           className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(member.facultyId_id)}
//                           className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-2"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan="12"
//                   className="text-center py-4 text-gray-500 font-medium"
//                 >
//                   No Student Data Found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function StudentInfo() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editRowId, setEditRowId] = useState(null);
  const [formData, setFormData] = useState({});

  // ✅ Fetch students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7070/api/displayUsers-s"
        );
        const studentOnly = response.data.filter(
          (user) => user.role === "student"
        );
        setStudents(studentOnly);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // ✅ Handle edit button click
  const handleEdit = (student) => {
    setEditRowId(student.rollNo_id);
    setFormData({ ...student });
  };

  // ✅ Cancel editing
  const handleCancel = () => {
    setEditRowId(null);
    setFormData({});
  };

  // ✅ Update user
  const handleUpdate = async () => {
    if (!formData.rollNo_id) {
      alert("❌ User ID is missing. Cannot update User.");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:7070/api/EditUserProfiles/${formData.rollNo_id}`,
        formData
      );
      alert("✅ User updated successfully!");

      // Update state without refetch
      setStudents((prev) =>
        prev.map((s) =>
          s.rollNo_id === formData.rollNo_id ? response.data.user : s
        )
      );

      localStorage.setItem("studentInfo", JSON.stringify(response.data.user));
      handleCancel();
    } catch (error) {
      console.error("Error updating user:", error.response || error);
      alert(error.response?.data?.message || "❌ Failed to update user.");
    }
  };

  // ✅ Delete user
  const handleDelete = async (rollNo_id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:7070/api/DeleteUsers/${rollNo_id}`);
      alert("✅ User deleted successfully!");

      setStudents((prev) => prev.filter((s) => s.rollNo_id !== rollNo_id));
    } catch (error) {
      console.error("Error deleting user:", error.response || error);
      alert(error.response?.data?.message || "❌ Failed to delete user.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="p-6 min-h-screen rounded-2xl">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
        Student Information
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-2 text-left">Department</th>
              <th className="py-3 px-2 text-left">Batch</th>
              <th className="py-3 px-2 text-left">Class</th>
              <th className="py-3 px-2 text-left">Semester</th>
              <th className="py-3 px-2 text-left">Division</th>
              <th className="py-3 px-2 text-left">Roll No</th>
              <th className="py-3 px-2 text-left">First Name</th>
              <th className="py-3 px-2 text-left">Middle Name</th>
              <th className="py-3 px-2 text-left">Last Name</th>
              <th className="py-3 px-2 text-left">Email</th>
              <th className="py-3 px-2 text-left">Contact</th>
              <th className="py-3 px-2 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {students.length > 0 ? (
              students.map((student, index) => (
                <tr
                  key={`${student.rollNo_id}-${index}`}
                  className={`border-b hover:bg-gray-100 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  {/* Department */}
                  <td className="py-2 px-4">
                    {editRowId === student.rollNo_id ? (
                      <select
                        value={formData.department || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            department: e.target.value,
                          })
                        }
                        className="border px-2 py-1 rounded"
                      >
                        <option value="">-- Select Department --</option>
                        <option value="CSE">CSE</option>
                        <option value="IT">IT</option>
                        <option value="ECE">ECE</option>
                        <option value="EEE">EEE</option>
                        <option value="ME">ME</option>
                        <option value="CE">CE</option>
                      </select>
                    ) : (
                      student.department
                    )}
                  </td>

                  {/* Batch */}
                  <td className="py-2 px-4">
                    {editRowId === student.rollNo_id ? (
                      <select
                        value={formData.batch || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, batch: e.target.value })
                        }
                        className="border px-2 py-1 rounded"
                      >
                        <option value="">-- Select Batch --</option>
                        <option value="2021-2025">2021-2025</option>
                        <option value="2022-2026">2022-2026</option>
                        <option value="2023-2027">2023-2027</option>
                      </select>
                    ) : (
                      student.batch
                    )}
                  </td>

                  {/* Class */}
                  <td className="py-2 px-4">
                    {editRowId === student.rollNo_id ? (
                      <select
                        value={formData.Class || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, Class: e.target.value })
                        }
                        className="border px-2 py-1 rounded"
                      >
                        <option value="">-- Select Class --</option>
                        <option value="FE">FE</option>
                        <option value="SE">SE</option>
                        <option value="TE">TE</option>
                        <option value="BE">BE</option>
                      </select>
                    ) : (
                      student.Class
                    )}
                  </td>

                  {/* Semester */}
                  <td className="py-2 px-4">
                    {editRowId === student.rollNo_id ? (
                      <select
                        value={formData.semester || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, semester: e.target.value })
                        }
                        className="border px-2 py-1 rounded"
                      >
                        <option value="">-- Select Semester --</option>
                        {[...Array(8)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            Semester {i + 1}
                          </option>
                        ))}
                      </select>
                    ) : (
                      student.semester
                    )}
                  </td>

                  {/* Division */}
                  <td className="py-2 px-4">
                    {editRowId === student.rollNo_id ? (
                      <select
                        value={formData.div || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, div: e.target.value })
                        }
                        className="border px-2 py-1 rounded"
                      >
                        <option value="">-- Select Division --</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                      </select>
                    ) : (
                      student.div
                    )}
                  </td>

                  {/* Roll No */}
                  <td className="py-2 px-4">{student.rollNo_id}</td>

                  {/* First Name */}
                  <td className="py-2 px-4">
                    {editRowId === student.rollNo_id ? (
                      <input
                        type="text"
                        value={formData.fName || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, fName: e.target.value })
                        }
                        className="border px-2 py-1 rounded"
                      />
                    ) : (
                      student.fName
                    )}
                  </td>

                  {/* Middle Name */}
                  <td className="py-2 px-4">
                    {editRowId === student.rollNo_id ? (
                      <input
                        type="text"
                        value={formData.mName || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, mName: e.target.value })
                        }
                        className="border px-2 py-1 rounded"
                      />
                    ) : (
                      student.mName
                    )}
                  </td>

                  {/* Last Name */}
                  <td className="py-2 px-4">
                    {editRowId === student.rollNo_id ? (
                      <input
                        type="text"
                        value={formData.lName || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, lName: e.target.value })
                        }
                        className="border px-2 py-1 rounded"
                      />
                    ) : (
                      student.lName
                    )}
                  </td>

                  {/* Email */}
                  <td className="py-2 px-4">
                    {editRowId === student.rollNo_id ? (
                      <input
                        type="email"
                        value={formData.email || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="border px-2 py-1 rounded"
                      />
                    ) : (
                      student.email
                    )}
                  </td>

                  {/* Contact */}
                  <td className="py-2 px-4">
                    {editRowId === student.rollNo_id ? (
                      <input
                        type="tel"
                        pattern="[0-9]{10}"
                        maxLength={10}
                        value={formData.contact || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, contact: e.target.value })
                        }
                        className="border px-2 py-1 rounded"
                      />
                    ) : (
                      student.contact
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-2 px-4">
                    {editRowId === student.rollNo_id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={handleUpdate}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(student)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(student.rollNo_id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="12"
                  className="text-center py-4 text-gray-500 font-medium"
                >
                  No Student Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
