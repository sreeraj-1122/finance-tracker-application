import React from "react";
import "./finance.css";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const FinanceData = ({ key, type, amount, description, onEdit, onDelete }) => {
  return (
    <div className="finance-data">
      <div className="data" key={key}>
        <p className="type">{type}</p>
        <p className="amount">{amount}</p>
        <p className="description">{description}</p>
        <span onClick={onEdit} className="span-buttons"><FaEdit className="icon-edit"/> </span>
        <span onClick={onDelete} className="span-buttons"><MdDeleteForever className="icon-delete"/>
        </span>
      </div>
    </div>
  );
};

export default FinanceData;
