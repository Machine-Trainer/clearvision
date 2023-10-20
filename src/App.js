// App.js
import React, { useEffect, useState } from 'react';
import Header from './Header';
import UserList from './UserList';
import LoadingIndicator from './LoadingIndicator';
import ErrorDisplay from './ErrorDisplay';

function App() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Header />
            {loading ? <LoadingIndicator /> : error ? <ErrorDisplay message={error} /> : <UserList users={users} />}
        </div>
    );
}

export default App;