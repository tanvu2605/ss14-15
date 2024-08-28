import { useEffect, useState } from "react";
import axios from "axios";

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  address: Address;
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}
          >
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>
              Address: {user.address.street}, {user.address.suite},{" "}
              {user.address.city}, {user.address.zipcode}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
