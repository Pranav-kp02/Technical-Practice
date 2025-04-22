import React, { useState } from "react";
import Profile from "./Profile";
import Intrest from "./Intrest";
import Settings from "./Settings";

const TabForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    name: "tom",
    age: "19",
    email: "tom@tom.com",
    intrest: ["coding", "music"],
    theme: "dark",
  });

  const [error, setError] = useState([]);

  const tab = [
    {
      name: "Profile",
      componet: Profile,
      validate: () => {
        const err = {};
        if (!formData.name || formData.name.length < 2) {
          err.name = "Name is not valid";
        }
        if (!formData.age || formData.age < 18) {
          err.age = "age is not valid";
        }
        if (!formData.email || formData.email.length < 2) {
          err.email = "email is not valid";
        }
        setError(err);
        return err.age || err.email || err.name ? false : true;
      },
    },
    {
      name: "Intrest",
      componet: Intrest,
      validate: () => {
        const err = {};
        if (!formData.intrest || formData.intrest.length < 1) {
          err.intrest = "select atlest one";
        }
        setError(err);
        return err.intrest ? false : true;
      },
    },
    {
      name: "Settings",
      componet: Settings,
      validate: () => {
        return true;
      },
    },
  ];

  const handleTabChange = (index) => {
    setActiveTab(index);
  };
  const handleNextbutton = () => {
    if (tab[activeTab].validate()) {
      setActiveTab((prev) => prev + 1);
    }
  };
  const handlePrevButton = () => {
    if (tab[activeTab].validate()) {
      setActiveTab((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log("formData", formData);
  };

  const ActiveTabComponet = tab[activeTab].componet;
  return (
    <>
      <div className="heading-container">
        {tab.map((ele, i) => (
          <div className="heading" key={i} onClick={() => handleTabChange(i)}>
            {ele.name}
          </div>
        ))}
      </div>
      <div className="tab-body">
        <ActiveTabComponet
          formData={formData}
          setFormData={setFormData}
          error={error}
        />
      </div>
      <div>
        {activeTab > 0 && <button onClick={handlePrevButton}>Prev</button>}
        {activeTab < tab.length - 1 && (
          <button onClick={handleNextbutton}>Next</button>
        )}
        {activeTab === tab.length - 1 && (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </>
  );
};

export default TabForm;
