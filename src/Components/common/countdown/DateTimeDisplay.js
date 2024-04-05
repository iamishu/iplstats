const DateTimeDisplay = ({ value, type, isDanger }) => {
  return (
    <div className={isDanger ? 'countdown danger' : 'countdown'}>
      <p>{value < 10 ? "0" + value : value}</p>
      <span>{type}</span>
    </div>
  );
};

export default DateTimeDisplay;