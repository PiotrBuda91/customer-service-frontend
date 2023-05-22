import React, { useState } from 'react';
import { useCustomerContext } from '../composables/CustomerContext';
import { v4 as uuidv4 } from 'uuid';

const CustomerForm: React.FC = () => {
  const { createCustomer } = useCustomerContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email) return;

    const id = uuidv4();

    createCustomer({ id, name, email });
    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Add Customer</button>
    </form>
  );
};

export default CustomerForm;

