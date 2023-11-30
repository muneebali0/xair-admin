import moment from "moment/moment";
import React, { useState } from "react";
import { useEffect } from "react";

export default function RemainingTimer({ data }) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);

  let date = new Date();
  var options = { weekday: "long" };
  var dayOfWeek = date.toLocaleString("en-US", options);
  let is_class_today = data.class_days.find(
    (class_day) => class_day.class_day == dayOfWeek
  );
  const getTime = () => {
    const today = moment(is_class_today.class_time, "hh:mm A").format(
      "YYYY-MM-DD HH:mm:ss"
    );
    const targetTime = new Date(today);
    const currentTime = new Date();
    const timeDifference = targetTime - currentTime;
    setRemainingTime(timeDifference);
    const secondsDifference = Math.floor(timeDifference / 1000);
    const hours = Math.floor(secondsDifference / 3600);
    const minutes = Math.floor((secondsDifference % 3600) / 60);
    const seconds = secondsDifference % 60;
    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);
  };

  useEffect(() => {
    if (is_class_today) {
      const interval = setInterval(() => getTime(), 1000);
      return () => clearInterval(interval);
    }
  }, [data]);

  return (
    <>
      {data.class_days.length == 0 ? (
        <div></div>
      ) : !is_class_today ? (
        <div className="no-class-today">No Class Today </div>
      ) : remainingTime > 0 ? (
        <div className="d-flex remaining-time">
          <div className="hours">{`${hours < 10 ? "0" + hours : hours}:`}</div>
          <div className="hours">{`${
            minutes < 10 ? "0" + minutes : minutes
          }:`}</div>
          <div className="hours">{`${
            seconds < 10 ? "0" + seconds : seconds
          }`}</div>
        </div>
      ) : hours === -1 && minutes + is_class_today.class_duration >= 0 ? (
        <div className="class-started">Class Started </div>
      ) : (
        <div className="class-finished">Class Finished</div>
      )}
    </>
  );
}
