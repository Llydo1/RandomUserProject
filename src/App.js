import React, { useState, useEffect } from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";
const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";
function App() {
  const icons = [
    <FaEnvelopeOpen />,
    <FaUser />,
    <FaCalendarTimes />,
    <FaMap />,
    <FaPhone />,
    <FaLock />,
  ];
  const dataLabel = ["name", "email", "age", "street", "phone", "password"];
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState(null);
  const [title, setTitle] = useState("name");
  const [value, setValue] = useState("Random person");

  const getPerson = async () => {
    try {
      setLoading(true);
      const { results } = await (await fetch(url)).json();
      const result = results[0];
      setPerson({
        image: result.picture.large,
        name: result.name.first + " " + result.name.last,
        email: result.email,
        age: result.dob.age,
        street:
          result.location.street.number + " " + result.location.street.name,
        phone: result.phone,
        password: result.login.password,
      });
      setTitle("name");
      setValue(result.name.first + " " + result.name.last);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPerson();
  }, []);

  const handleValue = (e) => {
    if (e.target.classList.contains("icon")) {
      setTitle(e.target.dataset.label);
      setValue(person[e.target.dataset.label]);
    }
  };
  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img
            src={(person && person.image) || defaultImage}
            alt=""
            className="user-img"
          />
          <p className="user-title">My {title} is</p>
          <p className="user-value"> {value} </p>
          <div className="values-list">
            {icons.map((icon, index) => {
              return (
                <button
                  key={index}
                  className="icon"
                  data-label={dataLabel[index]}
                  onMouseOver={handleValue}
                >
                  {icon}
                </button>
              );
            })}
          </div>
          <button className="btn" type="button" onClick={getPerson}>
            {loading ? "Loading..." : "Random user"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
