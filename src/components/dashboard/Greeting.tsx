import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';

const Greeting = () => {
    const [firstName, setFirstName] = useState('');

    useEffect(() => {
        const user = getAuth().currentUser;
        if (user) {
            const db = getDatabase();
            get(ref(db, `users/${user.uid}/first_name`)).then(snapshot => {
                setFirstName(snapshot.val() || user.displayName?.split(' ')[0] || 'User');
            });
        }
    }, []);

    return (
        <h1 className="text-3xl font-display text-primary mb-8">
            Hello, {firstName}!
        </h1>
    );
};

export default Greeting; 