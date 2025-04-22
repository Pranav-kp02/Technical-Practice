import React from "react";

const Intrest = ({ formData, setFormData, error }) => {
  const { intrest } = formData;
  const handleData = (e) => {
    setFormData((prev) => ({
      ...prev,
      intrest: e.target.checked
        ? [...prev.intrest, e.target.name]
        : prev.intrest.filter((i) => i !== e.target.name),
    }));
  };
  return (
    <div>
      <div>
        <label>
          <input
            type="checkbox"
            name="coding"
            checked={intrest.includes("coding")}
            onChange={handleData}
          />
          Coding
        </label>
        <label>
          <input
            type="checkbox"
            name="music"
            checked={intrest.includes("music")}
            onChange={handleData}
          />
          Music
        </label>
      </div>
      <div>{error.intrest && <span>{error.intrest}</span>}</div>
    </div>
  );
};

export default Intrest;
