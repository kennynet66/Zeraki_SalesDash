import React, { useState, useEffect } from "react";
import { SalesMapWrap } from "./SalesMap.styles";
import { BlockContentWrap, BlockTitle } from "../../../styles/global/default";

const InvoiceTable = () => {
  const [invoices, setInvoices] = useState([]);

  const JSONAPI = "https://api.jsonbin.io/v3/b/6658da63acd3cb34a85042f3";

  useEffect(() => {
    // Fetch invoice data from the API
    fetch(JSONAPI, {
      headers: {
        // "Content-Type": "application/json",
        "X-Master-Key":
          "$2a$10$/RhQmk2zYw4xtf0MVIJr4uj970fHpVTHT6tHcA0o33Gc.1r1SNSlu",
        "X-Access-Key":
          "$2a$10$L9mMYG9Ndi29Uz48lyd6yeYvQsy52Pz79s4yWuKjFNQ3SZlIZpBC2",
      }
    })
      .then((response) => response.json())
      .then((data) => setInvoices(data.record.schools.map(({ id, schoolName, invoiceNumber, amountDue, dueDate }) => ({ id, schoolName, invoiceNumber, amountDue, dueDate }))))
      .catch((error) => console.error("Error fetching invoices data:", error));
  }, []);

  return (
    <SalesMapWrap>
      <div className="block-head">
        <BlockTitle className="block-title">
          <h3>Invoices Due</h3>
        </BlockTitle>
      </div>
      <BlockContentWrap className="map-chart">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>School Name</th>
              <th>Invoice Number</th>
              {/* <th>Amount Due</th> */}
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr key={invoice.id}>
                <td>{index + 1}</td>
                <td>{invoice.schoolName}</td>
                <td>{invoice.invoiceNumber}</td>
                {/* <td>${invoice.amountDue.toLocaleString()}</td> */}
                <td>{invoice.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </BlockContentWrap>
    </SalesMapWrap>
  );
};

export default InvoiceTable;
