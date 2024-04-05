import DateTimeDisplay from "./DateTimeDisplay";
import useCountDown from "../../utils/useCountdown";

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="show-counter">
      {days ? (<DateTimeDisplay isDanger={false} type="days" value={days} />) : ""}
      <DateTimeDisplay isDanger={false} type="hrs" value={hours} />
      <DateTimeDisplay isDanger={false} type="mins" value={minutes} />
      <DateTimeDisplay isDanger={false} type="secs" value={seconds} />
    </div>
  );
};

const CountDownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountDown(targetDate);
  return (
    <ShowCounter
      days={days}
      hours={hours}
      minutes={minutes}
      seconds={seconds}
    />
  );
};

export default CountDownTimer;
