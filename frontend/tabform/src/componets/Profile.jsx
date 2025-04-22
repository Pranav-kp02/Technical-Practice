import React from "react";

const Profile = ({ formData, setFormData, error }) => {
  const { name, age, email } = formData;
  const handleFormChange = (e, item) => {
    setFormData((prev) => ({
      ...prev,
      [item]: e.target.value,
    }));
  };
  return (
    <div>
      <label>Name :</label>
      <input
        type="text"
        value={name}
        onChange={(e) => handleFormChange(e, "name")}
      />
      <div>{error.name && <span>{error.name}</span>}</div>
      <label>Age :</label>
      <input
        type="number"
        value={age}
        onChange={(e) => handleFormChange(e, "age")}
      />
      <div>{error.age && <span>{error.age}</span>}</div>
      <label>Email :</label>
      <input
        type="text"
        value={email}
        onChange={(e) => handleFormChange(e, "email")}
      />
      <div>{error.email && <span>{error.email}</span>}</div>
    </div>
  );
};

export default Profile;
