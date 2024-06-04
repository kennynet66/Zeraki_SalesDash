import React, { useState, useEffect } from "react";
import { BlockTitle } from "../../../styles/global/default";
import { TopProductsWrap } from "./TopProducts.styles";

const TopProducts = () => {
  // State to store the fetched data
  const [schoolData, setSchoolData] = useState([]);

  const jsonAPI = 'https://api.jsonbin.io/v3/b/665f6148ad19ca34f874390c';

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch(jsonAPI, {
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key":
          "$2a$10$/RhQmk2zYw4xtf0MVIJr4uj970fHpVTHT6tHcA0o33Gc.1r1SNSlu",
        "X-Access-Key":
          "$2a$10$L9mMYG9Ndi29Uz48lyd6yeYvQsy52Pz79s4yWuKjFNQ3SZlIZpBC2",
      }
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the fetched data
        setSchoolData(data.record.schools);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); 

  return (
    <TopProductsWrap>
      <div className="block-head">
        <BlockTitle className="block-title">
          <h3>Schools</h3>
        </BlockTitle>
      </div>
      <div className="tbl-products">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>School Name</th>
              <th>Product type</th>
              <th>Collections</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {schoolData.map((school, index) => (
              <tr key={school.id}>
                <td>{index + 1}</td>
                <td>{school.schoolName}</td>
                <td>${school.productType}</td>
                <td>{school.collections}</td>
                <td>{school.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TopProductsWrap>
  );
};

export default TopProducts;
