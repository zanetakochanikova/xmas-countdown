import React from 'react';
import { useState, useEffect } from 'react';
import logo from './xmas.jpg';
import moment from "moment";
import { Row, Col, message } from 'antd';
import './App.scss';

const initialState = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
};

function App() {
  const [countdown, setCountdown] = useState(initialState);
  const [isXMasDay, setIsXmasDay] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let interval;
    if (!isXMasDay) {
      interval = setInterval(() => {
        calculate();
      }, 1000);
    }
    return () => clearInterval(interval);
  });

  const calculate = () => {
    const today = moment();
    const xmas = moment("2021-12-24 00:00:00");
    const leftTime = xmas - today;

    const seconds = 1000;
    const minutes = seconds * 60;
    const hours = minutes * 60;
    const days = hours * 24;

    const leftDays = Math.floor(leftTime / days);
    const leftHours = Math.floor((leftTime % days) / hours);
    const leftMinutes = Math.floor((leftTime % hours) / minutes);
    const leftSeconds = Math.floor((leftTime % minutes) / seconds);

    if (leftTime < 0) {
      setIsXmasDay(true);
      messageXmas();
      setCountdown(initialState);
    }
    else {
      setCountdown({
        days: leftDays,
        hours: leftHours,
        minutes: leftMinutes,
        seconds: leftSeconds
      });
    }
    !isLoaded && setIsLoaded(true);
  }

  const messageXmas = () => message.open({
    content: 'CHRISTMAS DAY IS HERE!',
    duration: 0,
    key: 'message',
    onClick: () => message.destroy('message')
  });

  return (
    isLoaded &&
    <div className="countdown-layout"  style={{backgroundImage: `url(${logo})`}}>
      <Row className="title" >
        Countdown until Christmas
      </Row>
      <Row className="countdown-wrapper" gutter={{ xs: 5, sm: 8, md: 16, lg: 24 }}>
        {Object.entries(countdown).map(countdownKeyValue =>  
          <Col key={countdownKeyValue[0]} className="col-element" span={4}>
            <b>{countdownKeyValue[0]}</b>
            <div className="value">{countdownKeyValue[1]}</div>
          </Col>
        )}
      </Row>
    </div>
  );
}

export default App;
