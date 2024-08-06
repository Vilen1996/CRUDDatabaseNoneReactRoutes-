"use client";

import { InputUser } from "@/lib/types";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function Add() {
  const router = useRouter();
  const [user, setUser] = useState<InputUser>({
    name: "",
    surname: "",
    salary: 45484,
  });

  const [error, setError] = useState<string>("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!user.name.trim() || !user.surname.trim()) {
      setError("Please fill all the fields");
    } else {
      setError("");
      axios.post("/users", user).then((res) => {
        router.push("/");
      });
    }
  };
  return (
    <>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="text"
          placeholder="name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="surname"
          value={user.surname}
          onChange={(e) => setUser({ ...user, surname: e.target.value })}
        />
        <input
          type="number"
          placeholder="salary"
          value={user.salary}
          onChange={(e) => setUser({ ...user, salary: +e.target.value })}
        />
        <br />
        <button>submit</button>
      </form>
    </>
  );
}
