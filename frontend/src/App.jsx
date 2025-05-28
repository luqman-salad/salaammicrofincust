import React from 'react';

import { Routes, Route } from 'react-router-dom';
import CustomerList from './pages/CustomerList';
import AddCustomer from './pages/AddCustomer';
import EditCustomer from './pages/EditCustomer';

function App() {
  return (
    <Routes>
      <Route path="/" element={<CustomerList />} />
      <Route path="/add" element={<AddCustomer />} />
      <Route path="/customers/:id" element={<EditCustomer />} />
    </Routes>
  );
}

export default App;
