import React from 'react'
import './Totalexpense.css'
const TotalExpense = ({totalIncome,totalExpense}) => {
  return (
    <div className='total-section'>
        <h4 >Total Income: <span className='total-income'>{totalIncome} Rs</span></h4>
        <h4 >Total expense: <span className='total-expense'>{totalExpense} Rs</span></h4>
    </div>
  )
}

export default TotalExpense