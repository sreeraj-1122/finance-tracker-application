import React, { useState } from 'react';
import './home.css';
import FinanceData from './../../components/financeData/FinanceData';
import TotalExpense from '../../components/TotalExpenses/TotalExpense';

const Home = () => {
  const [records, setRecords] = useState([]);
  const [type, setType] = useState('Income');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');

  // Add and edit record
  const handleAddRecord = (e) => {
    e.preventDefault();
    const newRecord = {
      type,
      amount: parseFloat(amount),
      description,
    };

    if (editIndex !== null) {
      const updatedRecords = [...records];
      updatedRecords[editIndex] = newRecord;
      setRecords(updatedRecords);
      setEditIndex(null);
    } else {
      setRecords([...records, newRecord]);
    }

    setType('Income');
    setAmount('');
    setDescription('');
  };

  // Handle edit record
  const handleEditRecord = (index) => {
    const recordToEdit = records[index];
    setType(recordToEdit.type);
    setAmount(recordToEdit.amount.toString());
    setDescription(recordToEdit.description);
    setEditIndex(index);
  };

  // Delete record
  const handleDeleteRecord = (index) => {
    const updatedRecords = records.filter((_, i) => i !== index);
    setRecords(updatedRecords);
  };

  // Filtering records
  const filteredRecords = records
    .filter((record) => !filter || record.type === filter)
    .filter(
      (record) =>
        !search ||
        record.description.toLowerCase().includes(search.toLowerCase())
    );

  // Calculate totals income 
  const totalIncome = records
    .filter(record => record.type === 'Income')
    .reduce((acc, record) => acc + record.amount, 0);
  // Calculate totals income 
    
  const totalExpense = records
    .filter(record => record.type === 'Expense')
    .reduce((acc, record) => acc + record.amount, 0);

  return (
    <div className='main-section'>
      <div className='home'>
        <h1> Finance tracker</h1>
        <input
          className='search'
          type='text'
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder='Search here'
        />
        <form className='input-div' onSubmit={handleAddRecord}>
          <select
            name='type'
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value='Income'>Income</option>
            <option value='Expense'>Expense</option>
          </select>
          <input
            type='number'
            value={amount}
            placeholder={`Enter Your ${type}`}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <input
            type='text'
            value={description}
            placeholder={`Enter ${type} details`}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button type='submit'>{editIndex !== null ? 'Update' : 'Add'}</button>
        </form>

{/* filter  */}

        <select
          className='filter'
          name='filter'
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value=''>All</option>
          <option value='Income'>Income</option>
          <option value='Expense'>Expense</option>
        </select>

    {/* Display added recordes */}

        {filteredRecords.map((record, index) => (
          <FinanceData
            key={index}
            type={record.type}
            amount={record.amount}
            description={record.description}
            onEdit={() => handleEditRecord(index)}
            onDelete={() => handleDeleteRecord(index)}
          />
        ))}

      {/* total expense finding component */}

        <TotalExpense totalIncome={totalIncome} totalExpense={totalExpense} />
      </div>
    </div>
  );
};

export default Home;
