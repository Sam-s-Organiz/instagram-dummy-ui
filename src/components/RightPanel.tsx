import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const RightPanel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, []);

  return (
    <div className={styles.rightPanel}>
      <h2>Who to Follow</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RightPanel;