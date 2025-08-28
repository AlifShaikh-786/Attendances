import axios from "axios";
import React, { useEffect, useState } from "react";

const DisplyApplication = ({ Subjects }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Applications
  const fetchApplications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7070/api/DisplayApplication-s"
      );
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Approve Application (send full data)
  const handleApprove = async (app) => {
    try {
      const response = await axios.put(
        `http://localhost:7070/api/approveApplication/${app.rollNo_id}`,
        {
          Subject: app.Subject,
          date: app.date,
          Time: app.Time,
        }
      );

      alert(response.data.message || "Application approved successfully!");
      fetchApplications(); // Refresh after update
    } catch (error) {
      console.error("Error approving application:", error);
      alert("Failed to approve application. Please try again.");
    }
  };

  // ✅ Reject Application
  const handleReject = async (rollNo_id) => {
    try {
      const response = await axios.put(
        `http://localhost:7070/api/rejectApplication/${rollNo_id}`
      );
      alert(response.data.message || "Application rejected successfully!");
      fetchApplications();
    } catch (error) {
      console.error("Error rejecting application:", error);
      alert("Failed to reject application. Please try again.");
    }
  };

  // ✅ Fetch data on component mount or when Subjects changes
  useEffect(() => {
    fetchApplications();
  }, [Subjects]);

  // ✅ Loading State
  if (loading) {
    return <p className="text-center text-lg">Loading applications...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Application Information
      </h1>

      {applications.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No applications found for{" "}
          <span className="font-semibold">{Subjects}</span>.
        </p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2">Roll No</th>
                <th className="px-4 py-2">First Name</th>
                <th className="px-4 py-2">Middle Name</th>
                <th className="px-4 py-2">Last Name</th>
                <th className="px-4 py-2">Batch</th>
                <th className="px-4 py-2">Class</th>
                <th className="px-4 py-2">Semester</th>
                <th className="px-4 py-2">Division</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Contact</th>
                <th className="px-4 py-2">Subject</th>
                <th className="px-4 py-2">Reason</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 text-center border-b border-gray-200"
                >
                  <td className="px-4 py-2">{app.rollNo_id}</td>
                  <td className="px-4 py-2">{app.fName}</td>
                  <td className="px-4 py-2">{app.mName}</td>
                  <td className="px-4 py-2">{app.lName}</td>
                  <td className="px-4 py-2">{app.batch}</td>
                  <td className="px-4 py-2">{app.Class}</td>
                  <td className="px-4 py-2">{app.semester}</td>
                  <td className="px-4 py-2">{app.div}</td>
                  <td className="px-4 py-2">{app.email}</td>
                  <td className="px-4 py-2">{app.contact}</td>
                  <td className="px-4 py-2">{app.Subject}</td>
                  <td className="px-4 py-2">{app.reason}</td>
                  <td className="px-4 py-2">{app.date}</td>
                  <td className="px-4 py-2">{app.Time}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        app.Status === "Accept"
                          ? "bg-green-500"
                          : app.Status === "Reject"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {app.Status || "Pending"}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleApprove(app)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mr-2"
                        disabled={app.Status === "Accept"}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(app.rollNo_id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        disabled={app.Status === "Reject"}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DisplyApplication;
