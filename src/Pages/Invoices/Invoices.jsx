import React, { useState, useEffect } from "react";
import "./Invoices.css";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await fetch(
        "https://api.jsonbin.io/v3/b/6658da63acd3cb34a85042f3",
        {
          headers: {
            "Content-Type": "application/json",
            "X-Master-Key":
              "$2a$10$/RhQmk2zYw4xtf0MVIJr4uj970fHpVTHT6tHcA0o33Gc.1r1SNSlu",
            "X-Access-Key":
              "$2a$10$L9mMYG9Ndi29Uz48lyd6yeYvQsy52Pz79s4yWuKjFNQ3SZlIZpBC2",
          },
        }
      );

      const data = await response.json();

      setInvoices(data.record.invoices)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="invoices">
      <div className="table-header">
        <h3>Invoices</h3>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Invoice Number</th>
              <th>School Name</th>
              <th>Invoice Items</th>
              <th>Creation Date</th>
              <th>Due Date</th>
              <th>Paid Amount</th>
              <th>Completion Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr key={invoice.id}>
                {console.log("Invoice",invoice)}
                <td>{index + 1}</td>
                <td>{invoice.invoiceNumber}</td>
                <td>{invoice.schoolName}</td>
                <td>
                  <ul>
                    {invoice.invoiceItems.map((item, index) => (
                      <li key={index}>
                        {item.itemName}: ${item.amount}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{invoice.creationDate}</td>
                <td>{invoice.dueDate}</td>
                <td>${invoice.paidAmount.toLocaleString()}</td>
                <td>{invoice.completionStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Invoices;
