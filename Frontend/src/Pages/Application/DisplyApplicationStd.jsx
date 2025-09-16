import axios from "axios";
import React, { useEffect, useState } from "react";

const DisplyApplicationFaculty = ({ Subjects }) => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get roll number from localStorage
  const studentInfo = JSON.parse(localStorage.getItem("studentInfo"));
  const rollNo = studentInfo.rollNo_id; // Make sure this key is correct!

  // ✅ Fetch Applications
  const fetchApplications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7070/api/DisplayApplication-s"
      );
      const allApplications = response.data;

      // ✅ Filter applications by roll number
      const filtered = allApplications.filter(
        (app) => app.rollNo_id === rollNo
      );

      setApplications(allApplications);
      setFilteredApplications(filtered);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // const handleApprove = async (app) => {
  //   try {
  //     const response = await axios.put(
  //       `http://localhost:7070/api/approveApplication/${app.ApplicationId}`,
  //       {
  //         Subject: app.Subject,
  //         date: app.date,
  //         Time: app.Time,
  //       }
  //     );

  //     alert(response.data.message || "Application approved successfully!");
  //     fetchApplications();
  //   } catch (error) {
  //     console.error("Error approving application:", error);
  //     alert("Failed to approve application. Please try again.");
  //   }
  // };

  // const handleReject = async (ApplicationId) => {
  //   try {
  //     const response = await axios.put(
  //       `http://localhost:7070/api/rejectApplication/${ApplicationId}`
  //     );
  //     alert(response.data.message || "Application rejected successfully!");
  //     fetchApplications();
  //   } catch (error) {
  //     console.error("Error rejecting application:", error);
  //     alert("Failed to reject application. Please try again.");
  //   }
  // };

  useEffect(() => {
    fetchApplications();
  }, [Subjects]);

  if (loading) {
    return <p className="text-center text-lg">Loading applications...</p>;
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Application Information
      </h1>

      {filteredApplications.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No applications found for roll number{" "}
          <span className="font-semibold">{rollNo}</span>.
        </p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="px-2 py-2">ApplicationId</th>
                <th className="px-2 py-2">Roll No</th>
                <th className="px-1 py-2">First Name</th>
                <th className="px-1 py-2">Last Name</th>
                <th className="px-2 py-2">Class</th>
                <th className="px-2 py-2">Semester</th>
                <th className="px-2 py-2">Division</th>
                <th className="px-2 py-2">Subject</th>
                <th className="px-2 py-2">Reason</th>
                <th className="px-2 py-2">Date</th>
                <th className="px-2 py-2">Time</th>
                <th className="px-2 py-2">Status</th>
                {/* <th className="px-2 py-2">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((app, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 text-center border-b border-gray-200"
                >
                  <td className="px-2 py-2">{app.ApplicationId}</td>
                  <td className="px-2 py-2">{app.rollNo_id}</td>
                  <td className="px-1 py-2">{app.fName}</td>
                  <td className="px-1 py-2">{app.lName}</td>
                  <td className="px-2 py-2">{app.Class}</td>
                  <td className="px-2 py-2">{app.semester}</td>
                  <td className="px-2 py-2">{app.div}</td>
                  <td className="px-2 py-2">{app.Subject}</td>
                  <td className="px-2 py-2">{app.reason}</td>
                  <td className="px-2 py-2">{formatDate(app.date)}</td>
                  <td className="px-2 py-2">{app.Time}</td>
                  <td className="px-2 py-2">
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
                  {/* <td className="px-2 py-2">
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleApprove(app)}
                        className="bg-green-500 hover:bg-green-600 text-white px-1 py-1 rounded mr-1"
                        disabled={app.Status === "Accept"}
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => handleReject(app.ApplicationId)}
                        className="bg-red-500 hover:bg-red-600 text-white px-1 py-1 rounded"
                        disabled={app.Status === "Reject"}
                      >
                        Reject
                      </button>
                    </div>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DisplyApplicationFaculty;
