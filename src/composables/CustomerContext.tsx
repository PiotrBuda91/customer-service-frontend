import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';

interface Customer {
  id: string;
  name: string;
  email: string;
}

interface CustomerContextProps {
  customers: Customer[];
  createCustomer: (customer: Customer) => void;
  deleteCustomer: (id: string) => void;
}
const LOCALHOST = 'https://localhost:44355';

const api = axios.create({
  baseURL: LOCALHOST,
});

const CustomerContext = createContext<CustomerContextProps | undefined>(undefined);

export const CustomerProvider: React.FC<{ children: ReactNode }> = ({ children}) => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await api.get<Customer[]>('/api/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createCustomer = async (customer: Customer) => {
    setCustomers([customer, ...customers])
    await api.post<Customer>('/api/customers', customer).catch((error) => console.error(error));
  };  

  const deleteCustomer = async (id: string) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
    try {
      await api.delete(`/api/customers/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const contextValue: CustomerContextProps = {
    customers,
    createCustomer,
    deleteCustomer,
  };

  return (
    <CustomerContext.Provider value={contextValue}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomerContext = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomerContext must be used within a CustomerProvider');
  }
  return context;
};

