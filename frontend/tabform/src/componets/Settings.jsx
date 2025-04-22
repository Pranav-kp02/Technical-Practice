import React from "react";

const Settings = ({ formData, setFormData }) => {
  const { theme } = formData;
  const handleData = (e) => {
    setFormData((prev) => ({
      ...prev,
      theme: e.target.name,
    }));
  };
  return (
    <div>
      <label>
        <input
          type="radio"
          name="dark"
          checked={theme === "dark"}
          onChange={handleData}
        />
        dark
      </label>
      <label>
        <input
          type="radio"
          name="light"
          checked={theme === "light"}
          onChange={handleData}
        />
        Light
      </label>
    </div>
  );
};

export default Settings;
