import "./styles.css";
import { data } from "./data.js";
import "bootstrap/dist/css/bootstrap.min.css";
import React,{ useEffect, useState } from "react";
import update from "immutability-helper";
import classNames from "classnames";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Book({ item, remove, displayMode }) {
  return (
    <Col
      className={classNames([
        "book",
        {
          discount: item.is_discount
        }
      ])}
      xs={!displayMode ? 6 : 4}
    >
      <img className="w-100" src={item.img} alt="" />
      <h4>{item.name}</h4>
      <h5> {item.is_discount ? "打折中" : ""}</h5>
      {item.is_discount && (
        <h5>
          優惠價
          <span className="red"> {item.discount * 100}</span>折 ：
          <span className="red"> {parseInt(item.price * item.discount)}</span>{" "}
          元
        </h5>
      )}
      {!item.is_discount && (
        <h5>
          原價： <span className="red"> {item.price}</span>{" "}
        </h5>
      )}
      <button onClick={remove}>Remove</button>
    </Col>
  );
}

export default function App() {
  const [rawData, setRawData] = useState(data);
  const [filteredData, setFilteredData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [displayMode, setDisplayMode] = useState(true);

  useEffect(() => {
    setFilteredData(
      rawData.filter((book) =>
        book.name.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  }, [keyword, rawData]);

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <h1 className="my-5">Bookstore</h1>
            {keyword && <h2>Search result of: {keyword}</h2>}
            <input
              type="text"
              value={keyword}
              placeholder="搜尋"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <div>
              <label>
                Display Mode:
                <input
                  type="checkbox"
                  value={displayMode}
                  onChange={(e) => {
                    // console.log(e.target.checked);
                    setDisplayMode(!displayMode);
                  }}
                />
              </label>
            </div>
          </Col>
        </Row>

        <Row>
          {rawData.map((item, itemId) => (
            <span>
              <label className="mx-2">
                <span>{itemId}</span>
                <input
                  key={itemId}
                  type="checkbox"
                  checked={item.is_discount}
                  onChange={(e) => {
                    setRawData(
                      update(rawData, {
                        [itemId]: {
                          $toggle: ["is_discount"]
                        }
                      })
                    );
                    // console.log(e.target.value);
                  }}
                />
              </label>
            </span>
          ))}
        </Row>

        <Row>
          {filteredData.map((item) => (
            <Book
              item={item}
              key={item.name}
              displayMode={displayMode}
              remove={() => {
                let index = rawData.findIndex((book) => book.name === item.name);
                setRawData(
                  update(rawData, {
                    $splice: [[index, 1]]
                  })
                );
                console.log(rawData);
              }}
            ></Book>
          ))}
        </Row>
      </Container>
    </div>
  );
}
