import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [newWage, setNewWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        },
      ]);
    });
  };

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const updateEmployeeWage = (id) => {
    Axios.put("http://localhost:3001/update", { wage: newWage, id: id }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id == id
              ? {
                  id: val.id,
                  name: val.name,
                  country: val.country,
                  age: val.age,
                  position: val.position,
                  wage: newWage,
                }
              : val;
          })
        );
      }
    );

    Axios.get("http://localhost:3001/employees").then((response) => {
      window.location.reload();
    });
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id != id;
        })
      );
    });

    Axios.get("http://localhost:3001/employees").then((response) => {
      window.location.reload();
    });

  };

  return (
    <div className="App">
      <div className="information">
        <h3>Cadastro de Funcion??rios</h3>
        <label>Nome:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Idade:</label>
        <input
          type="number"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <label>Pa??s:</label>
        <input
          type="text"
          onChange={(event) => {
            setCountry(event.target.value);
          }}
        />
        <label>Cargo:</label>
        <input
          type="text"
          onChange={(event) => {
            setPosition(event.target.value);
          }}
        />
        <label>Sal??rio:</label>
        <input
          type="number"
          onChange={(event) => {
            setWage(event.target.value);
          }}
        />
        <button class="add-btn" onClick={addEmployee}>Add Funcion??rio</button>
      </div>
      <div className="employees">
        <button onClick={getEmployees}>Mostras Funcion??rios</button>

        {employeeList.map((val, key) => {
          return (
            <div className="employee">
              <div>
                <h3>Nome: <span>{val.name}</span></h3>
                <h3>Idade: <span>{val.age}</span></h3>
                <h3>Pa??s: <span>{val.country}</span></h3>
                <h3>Cargo: <span>{val.position}</span></h3>
                <h3>Sal??rio: <span>{val.wage}</span></h3>
              </div>
              <div>
                <input
                  type="text"
                  class="teste"
                  placeholder="Atualizar sal??rio..."
                  onChange={(event) => {
                    setNewWage(event.target.value);
                  }}
                />
                <button
                  class="update-btn"
                  onClick={() => {
                    updateEmployeeWage(val.id);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                  class="delete-btn"
                  onClick={() => {
                    deleteEmployee(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
