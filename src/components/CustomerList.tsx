import React from 'react';
import { useCustomerContext } from '../composables/CustomerContext';

const CustomerList: React.FC = () => {
  const { customers, deleteCustomer } = useCustomerContext();

  const handleDelete = (id: string) => {
    deleteCustomer(id);
  };

  return (
    <div>
      {customers.map((customer) => (
        <li key={customer.id}>
          <div>
            <div>Name: {customer.name}</div>
            <div>Email: {customer.email}</div>
          </div>          
          <button onClick={() => handleDelete(customer.id)}>Delete</button>
        </li>
      ))}
    </div>
  );
};

export default CustomerList;
