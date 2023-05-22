import React from 'react';
import CustomerForm from './components/CustomerForm';
import CustomerList from './components/CustomerList';
import { CustomerProvider } from './composables/CustomerContext';

function App() {
  return (
    <div>
      <h1>Customer Management</h1>
      <CustomerProvider>
        <CustomerForm />
        <CustomerList />
      </CustomerProvider>
    </div>
  );
}

export default App;

