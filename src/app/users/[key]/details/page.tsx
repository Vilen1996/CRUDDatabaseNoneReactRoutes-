"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface Props {
  params: { key: number };
}

export default function Page({ params }: Props) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [salary, setSalary] = useState("");

  useEffect(() => {
    axios.get(`/users/${params.key}`).then((res) => {
      const user = res.data;
      setName(user.name);
      setSurname(user.surname);
      setSalary(user.salary);
    });
  }, [params.key]);

  const handleUpdate = () => {
    axios.put(`/users/${params.key}`, { name, surname, salary }).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <>
      <h1>Update User {params.key}</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Surname"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
      />
      <input
        type="number"
        placeholder="Salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
      />
      <button onClick={handleUpdate}>Update</button>
    </>
  );
}
