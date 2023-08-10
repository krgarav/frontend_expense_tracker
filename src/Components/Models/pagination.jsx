import Pagination from "react-bootstrap/Pagination";
import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { expenseAction } from "../../Store/expense-reducer";
import { useDispatch } from "react-redux";
import classes from "./pagination.module.css";
const Pagechanger = () => {
  const [selectedPage, setSelectedPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [alltabs, setAllTabs] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const row = localStorage.getItem("preferencerow") || 5;
    const getCount = async () => {
      try {
        const response = await axios.get(
          "http://43.205.148.73:3000/expense/get-expense-count/" + row,
          {
            headers: { Authorisation: token },
          }
        );
        const pages = await response.data.pages;
        setTotalPages(pages);
        let items = [];
        for (let number = 1; number <= totalPages; number++) {
          items.push(
            <Pagination.Item
              key={number}
              active={number === selectedPage}
              onClick={() => pageHandler(number)}
            >
              {number}
            </Pagination.Item>
          );
        }
        setAllTabs(items);
      } catch (err) {
        console.log(err);
      }
    };
    getCount();
  }, [totalPages, selectedPage]);

  const pageHandler = (e) => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const row = localStorage.getItem("preferencerow") || 5;
        const response = await fetch(
          `http://43.205.148.73:3000/expense/get-expenses?e=${e}&row=${row}`,
          {
            headers: { Authorisation: token },
          }
        );
        const data = await response.json();
        dispatch(expenseAction.addExpense(data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    setSelectedPage(e);
  };
  const rowHandler = (event) => {
    const row = event.target.value;
    localStorage.setItem("preferencerow", row);
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://43.205.148.73:3000/expense/get-expenses?e=${selectedPage}&row=${row}`,
          {
            headers: { Authorisation: token },
          }
        );
        const data = await response.json();
        dispatch(expenseAction.addExpense(data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  };
  return (
    <Fragment>
      <div className={classes.selecttab} style={{ display: "flex" }}>
        <label htmlFor="rowperpage">Row per page : </label>
        <select id="rowperpage" onChange={rowHandler}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
      <Pagination>
        <Pagination.First />
        <Pagination.Prev />
        {alltabs}
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </Fragment>
  );
};

export default Pagechanger;
