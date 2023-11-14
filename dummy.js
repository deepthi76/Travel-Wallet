import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import MainScreen from "../../Components/MainScreen/MainScreen";
import Accordion from "react-bootstrap/Accordion";
import "./History.css";
import axios from "axios";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { listLogs } from "../../actions/logActions";

const History = () => {
  const dispatch = useDispatch();

  const logList = useSelector((state) => state.logList);
  const { loading, logs, error } = logList;

  // Function to delete notes
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      // Implement your delete logic here
    }
  };

  console.log(logs);

  useEffect(() => {
    console.log("About to dispatch LOG_LIST_REQUEST");
    dispatch(listLogs());
  }, [dispatch]);

  return (
    <>
      <Header />
      <MainScreen title="Dive back in">
        <div className="new-trip-link">
          <a href="./create" className="new-trip">
            Add Trip
          </a>
        </div>
        <Accordion defaultActiveKey="0" alwaysOpen>
          {logs?.map((log, index) => (
            <Accordion.Item key={log._id} eventKey={String(index)}>
              <Card style={{ margin: 10 }}>
                <Accordion.Header>{log.title}</Accordion.Header>
                <Accordion.Body>
                  <h4>
                    <Badge pill bg="light" text="dark">
                      category - {log.category}
                    </Badge>
                  </h4>
                  <blockquote className="blockquote mb-0">
                    <p>{log.destination}</p>
                    <footer className="blockquote-footer">
                      created on {log.date}
                    </footer>
                  </blockquote>
                  <Button
                    href={`/note/${log._id}`}
                    style={{ margin: 5 }}
                    variant="outline-info"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => deleteHandler(log._id)}
                    style={{ margin: 5 }}
                  >
                    Delete
                  </Button>
                </Accordion.Body>
              </Card>
            </Accordion.Item>
          ))}
        </Accordion>
      </MainScreen>
      <Footer />
    </>
  );
};

export default History;
