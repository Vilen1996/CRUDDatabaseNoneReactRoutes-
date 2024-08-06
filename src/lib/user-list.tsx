"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IUser } from "./types";
import axios from "axios";

export const UserList = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    axios.get("/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  const handleDelete = (id: number) => {
    axios
      .delete(`/users/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setUsers(users.filter((user) => user.id !== id));
        }
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <>
      <h3>UserList</h3>
      <Link href="/users/add">Add User</Link>
      {users.map((elm) => (
        <div key={elm.id} style={{ marginTop: 30 }}>
          <p>
            {elm.name} {elm.surname}
          </p>
          <strong>{elm.salary} AMD</strong>
          <br />
          <Link href={"users/" + elm.id + "/details"}>Edit</Link>
          <button
            onClick={() => handleDelete(elm.id)}
            style={{ marginLeft: 10 }}
          >
            Delete
          </button>
        </div>
      ))}
    </>
  );
};
