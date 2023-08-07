import { useParams } from "react-router";
import { Fragment, useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import classes from "./reportGeneration.module.css";
import Header from "../Header/header";
import axios from "axios";
import AllDownloads from "../Models/alldownloads";
const ReportGeneration = () => {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [downloads, setDownloads] = useState([]);
  const { state } = useParams();
  useEffect(() => {
    const expense = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://13.126.227.177:3000/expense/get-all-expenses",
        {
          headers: { Authorisation: token },
        }
      );

      const sortedItem = response.data.sort((a, b) => {
        const aDate = new Date(a.createdAt).getTime();
        const bDate = new Date(b.createdAt).getTime();
        return bDate - aDate;
      });
      setData(sortedItem);
    };
    expense();
  }, []);
  const dailyTableData = data.map((item) => {
    const date = item.createdAt.split("T")[0];
    return (
      <tr key={item.id}>
        <td>{date}</td>
        <td>{item.description}</td>
        <td>{item.category}</td>
        <td>{item.amount}</td>
      </tr>
    );
  });
  const weeklyTableData = data.map((item) => {
    const date = item.createdAt.split("T")[0];
    const fullDate = new Date(date);
    const month = fullDate.getMonth();
    const weekDay = fullDate.getDay();
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthName = months[month];
    const weekDayName = daysOfWeek[weekDay];

    return { monthName, weekDayName, amount: item.amount };
  });

  const monthlySum = {};
  const weeklySum = {};

  weeklyTableData.forEach((item) => {
    if (!monthlySum[item.monthName]) {
      monthlySum[item.monthName] = 0;
    }
    monthlySum[item.monthName] += item.amount;

    if (!weeklySum[item.weekDayName]) {
      weeklySum[item.weekDayName] = 0;
    }
    weeklySum[item.weekDayName] += item.amount;
  });

  const monthlyTableRows = Object.entries(monthlySum).map(
    ([monthName, amount]) => (
      <tr key={monthName}>
        <td>{monthName}</td>
        <td>{amount}</td>
      </tr>
    )
  );

  const weeklyTableRows = Object.entries(weeklySum).map(
    ([weekDayName, amount]) => (
      <tr key={weekDayName}>
        <td>Total</td>
        <td>{weekDayName}</td>
        <td>{amount}</td>
      </tr>
    )
  );
  const downloadHandler = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://13.126.227.177:3000/expense/download", {
      headers: { Authorisation: token },
    });
    window.location.href = response.data.fileURL;
  };
  const showExpenseHandler = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://13.126.227.177:3000/expense/show-download",
      {
        headers: { Authorisation: token },
      }
    );
    setModalShow(true);
    setDownloads(response.data.data);
    console.log(response.data.data);
  };
  return (
    <Fragment>
      <Header />
      {state === "true" && (
        <Container>
          <h4 className={classes.heading}>Daily Expense</h4>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Expense</th>
              </tr>
            </thead>
            <tbody>{dailyTableData}</tbody>
          </Table>
          <hr />
          <h4 className={classes.heading}>Weekly Expense</h4>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Month</th>
                <th>Week Day</th>
                <th>Expense</th>
              </tr>
            </thead>
            <tbody>{weeklyTableRows}</tbody>
          </Table>
          <hr />
          <h4 className={classes.heading}>Monthly Expense</h4>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Month</th>
                <th>Expense</th>
              </tr>
            </thead>
            <tbody>{monthlyTableRows}</tbody>
          </Table>
        </Container>
      )}
      {state === "true" && (
        <div className={classes.btn}>
          <Button onClick={showExpenseHandler}>Show Downloaded Expenses</Button>
          <Button onClick={downloadHandler}>Download Expenses</Button>
        </div>
      )}
      {state === "false" && (
        <Container>
          <h4>User Not premium.</h4>
          <p>
            Please <strong>Buy Premium</strong> For Day To Day Expenses.
          </p>
        </Container>
      )}
      <AllDownloads
        show={modalShow}
        item={downloads}
        onHide={() => setModalShow(false)}
      />
    </Fragment>
  );
};

export default ReportGeneration;
