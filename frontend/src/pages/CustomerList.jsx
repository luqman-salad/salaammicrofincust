import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get('https://salaammicrofincust.onrender.com/api/customers');
      setCustomers(res.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleDelete = async (id) => {
  const confirmDelete = confirm("Are you sure you want to delete this customer?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`https://salaammicrofincust.onrender.com/api/customers/${id}`);
    alert("Customer deleted successfully.");
    fetchCustomers(); // Refresh list
  } catch (error) {
    console.error("Error deleting customer:", error);
    alert("Failed to delete customer.");
  }
};


  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="sm:max-w-5xl mx-auto bg-white shadow p-3 rounded overflow-x-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Customers</h1>
          <button
            onClick={() => navigate("/add")}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-bold"
          >
            + Add Customer
          </button>
        </div>

        <table className="min-w-full border-collapse table-auto">
          <thead>
            <tr className="bg-green-100 text-left">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No customers found.
                </td>
              </tr>
            )}

            {customers? customers.map((customer) => (
              <tr key={customer.id} className="border-b border-green-600 hover:bg-green-50">
                <td className="px-4 py-2">{customer.name}</td>
                <td className="px-4 py-2">{customer.email}</td>
                <td className="px-4 py-2">{customer.phone}</td>
                <td className="px-4 py-2">{customer.address}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => navigate(`/customers/${customer.id}`)}
                    className="text-white bg-green-700 px-2 py-1 rounded cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(customer.id)}
                    className="text-white bg-red-700 px-2 py-1 rounded cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )) : "loading..."}
            
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomerList;
