import axios from "axios";
import React, { useEffect, useState } from "react";

const FacultyInfo = () => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editRowId, setEditRowId] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7070/api/displayUsers-s"
        );
        // ✅ Only take faculty, not students
        const facultyOnly = response.data.filter(
          (user) => user.role === "faculty"
        );
        setFaculty(facultyOnly);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch faculty");
      } finally {
        setLoading(false);
      }
    };

    fetchFaculty();
  }, []);

  // ✅ Handle edit
  const handleEdit = (facultyMember) => {
    setEditRowId(facultyMember.facultyId_id);
    setFormData({ ...facultyMember });
  };

  // ✅ Cancel edit
  const handleCancel = () => {
    setEditRowId(null);
    setFormData({});
  };

  // ✅ Update user
  const handleUpdate = async () => {
    if (!formData.facultyId_id) {
      alert("❌ User ID is missing. Cannot update User.");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:7070/api/EditUserProfiles/${formData.facultyId_id}`,
        formData
      );
      alert("✅ User updated successfully!");

      // Update state without refetch
      setFaculty((prev) =>
        prev.map((f) =>
          f.facultyId_id === formData.facultyId_id ? response.data.user : f
        )
      );

      localStorage.setItem("facultyInfo", JSON.stringify(response.data.user));
      handleCancel();
    } catch (error) {
      console.error("Error updating user:", error.response || error);
      alert(error.response?.data?.message || "❌ Failed to update user.");
    }
  };

  // ✅ Delete user
  const handleDelete = async (facultyId_id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(
        `http://localhost:7070/api/DeleteUsers/${facultyId_id}`
      );
      alert("✅ User deleted successfully!");

      // Remove from state
      setFaculty((prev) => prev.filter((f) => f.facultyId_id !== facultyId_id));
    } catch (error) {
      console.error("Error deleting user:", error.response || error);
      alert(error.response?.data?.message || "❌ Failed to delete user.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
        Faculty Information
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Faculty ID</th>
              <th className="py-3 px-4 text-left">Department</th>
              <th className="py-3 px-4 text-left">First Name</th>
              <th className="py-3 px-4 text-left">Middle Name</th>
              <th className="py-3 px-4 text-left">Last Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Contact</th>
              <th className="py-3 px-4 text-left">Subject</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {faculty.length > 0 ? (
              faculty.map((member, index) => (
                <tr
                  key={`${member.facultyId_id}-${index}`}
                  className={`border-b hover:bg-gray-100 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  {/* Faculty ID */}
                  <td className="py-3 px-4">{member.facultyId_id}</td>

                  {/* Department */}
                  <td className="py-2 px-4">
                    {editRowId === member.facultyId_id ? (
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
                        <option value="MCA">MCA</option>
                        <option value="MBA">MBA</option>
                        {/* Add more */}
                      </select>
                    ) : (
                      member.department
                    )}
                  </td>

                  {/* First Name */}
                  <td className="py-2 px-4">
                    {editRowId === member.facultyId_id ? (
                      <input
                        type="text"
                        value={formData.fName || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, fName: e.target.value })
                        }
                        className="border px-2 py-1 rounded"
                      />
                    ) : (
                      member.fName
                    )}
                  </td>

                  {/* Middle Name */}
                  <td className="py-2 px-4">
                    {editRowId === member.facultyId_id ? (
                      <input
                        type="text"
                        value={formData.mName || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, mName: e.target.value })
                        }
                        className="border px-2 py-1 rounded"
                      />
                    ) : (
                      member.mName
                    )}
                  </td>

                  {/* Last Name */}
                  <td className="py-2 px-4">
                    {editRowId === member.facultyId_id ? (
                      <input
                        type="text"
                        value={formData.lName || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, lName: e.target.value })
                        }
                        className="border px-2 py-1 rounded"
                      />
                    ) : (
                      member.lName
                    )}
                  </td>

                  {/* Email */}
                  <td className="py-2 px-4">
                    {editRowId === member.facultyId_id ? (
                      <input
                        type="email"
                        value={formData.email || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="border px-2 py-1 rounded"
                      />
                    ) : (
                      member.email
                    )}
                  </td>

                  {/* Contact */}
                  <td className="py-2 px-4">
                    {editRowId === member.facultyId_id ? (
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
                      member.contact
                    )}
                  </td>

                  {/* Subject */}
                  <td className="py-3 px-4">
                    {editRowId === member.facultyId_id ? (
                      <input
                        type="text"
                        value={formData.subject?.join(", ") || ""} // show as comma-separated
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            subject: e.target.value
                              .split(",")
                              .map((s) => s.trim()), // convert back to array
                          })
                        }
                        placeholder="Enter subjects, separated by commas"
                        className="border px-1 py-1 rounded w-full"
                      />
                    ) : member.subject && member.subject.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {member.subject.map((sub, i) => (
                          <span
                            key={i}
                            className="bg-blue-100 px-2 py-1 rounded-md text-sm"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400">No Subjects</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-2 px-4">
                    {editRowId === member.facultyId_id ? (
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
                      <div className="flex ">
                        <button
                          onClick={() => handleEdit(member)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(member.facultyId_id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-2"
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
                  colSpan="9"
                  className="text-center py-4 text-gray-500 font-medium"
                >
                  No Faculty Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FacultyInfo;
