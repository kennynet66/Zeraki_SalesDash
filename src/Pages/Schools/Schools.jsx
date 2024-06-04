import React, { useState, useEffect } from "react";
import "./Schools.css";
import Modal from "../../components/AddSchoolModal/Modal"; 

const Schools = () => {
  const [schoolData, setSchoolData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch school data from the API
    fetchSchoolData();
  }, []);

  const fetchSchoolData = async () => {
    const response = await fetch("https://api.jsonbin.io/v3/b/6658da63acd3cb34a85042f3", {
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key":
          "$2a$10$/RhQmk2zYw4xtf0MVIJr4uj970fHpVTHT6tHcA0o33Gc.1r1SNSlu",
        "X-Access-Key":
          "$2a$10$L9mMYG9Ndi29Uz48lyd6yeYvQsy52Pz79s4yWuKjFNQ3SZlIZpBC2",
      },
    });

    const data = await response.json()

    setSchoolData(data.record.schools);

  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveSchool = (formData) => {
    fetch("https://api.jsonbin.io/v3/b/6658da63acd3cb34a85042f3", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("School added successfully:", data);
        // Fetch updated school data after adding the school
        fetchSchoolData();
        closeModal(); // Close the modal after adding the school
      })
      .catch((error) => console.error("Error adding school:", error));
  };

  return (
    <>
      <div className="schools">
        <div className="upper">
          <h3>Schools</h3>
          <button onClick={openModal}>Add School</button>
        </div>
        <div className="content">
          <div className="table-header"></div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>School Name</th>
                  <th>Type</th>
                  <th>Invoice Number</th>
                  <th>Collections</th>
                  <th>Due Date</th>
                  <th>Quick Action</th>
                </tr>
              </thead>
              <tbody>
  {schoolData.length > 0 && schoolData.map((school, index) => (
    <tr key={school.id}>
      <td>{index + 1}</td>
      <td>{school.schoolName}</td>
      <td>{school.schoolType}</td>
      <td>{school.invoiceNumber}</td>
      <td>{school.collection}</td>
      <td>{school.dueDate}</td>
      <td className="quick-action">
        <button className="view">View</button>
        <button className="update">Update</button>
        <button className="delete">Delete</button>
      </td>
    </tr>
  ))}
</tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Render the modal only when isModalOpen is true */}
      {isModalOpen && (
        <Modal onClose={closeModal} onSave={handleSaveSchool} />
      )}
    </>
  );
};

export default Schools;
