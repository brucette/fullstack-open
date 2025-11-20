const Filter = ({ value, onChange }) => {
  return (
    <div>
      search names with
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Filter
