'use client'
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
interface User {
    id: number;
    name: string;
    email: string;
}

const supabaseUrl = 'https://hggsyznmryiouqxpfdso.supabase.co'
const supabaseKey = 'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnZ3N5em5tcnlpb3VxeHBmZHNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYxOTA2NTQsImV4cCI6MjA0MTc2NjY1NH0.egQIcRKWwDugD9ygFOrXAAfhWfH703aISre57LaofRE'
const supabase = createClient(supabaseUrl, supabaseKey)

export function UserTables() {
    const [users, setUsers] = useState<User[]>([]);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    useEffect(() => {
        getUsers();
    }, []);

    async function getUsers() {
        const { data, error } = await supabase
            .from<User>('users')
            .select('*');

        if (error) {
            console.error('Error fetching users:', error);
        } else {
            setUsers(data || []);
        }
    }

    async function updateUser(user: User) {
        const { data, error } = await supabase
            .from('users')
            .update({ name: user.name, email: user.email})
            .eq('id', user.id);

        if (error) {
            console.error('Error updating user:', error);
        } else {
            if (data) {
                setUsers(users.map(u => (u.id === user.id ? data[0] : u)));
            }
            setEditingUser(null);
        }
    }

    function handleEdit(id: number) {
        // Handle edit logic here
    }

    function handleDelete(id: number) {
        // Handle delete logic here
    }

    function handleSave() {
        if(editingUser) {
            updateUser(editingUser);
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (editingUser) {
            setEditingUser({ ...editingUser, [e.target.name]: e.target.value });
        }
    }

    return (
        <div>
            {editingUser && (
                <div>
                    <input
                        type='text'
                        name='name'
                        value={editingUser.name}
                        onChange={handleChange}
                    />
                    <input
                        type='text'
                        name='email'
                        value={editingUser.email}
                        onChange={handleChange}
                    />
                    <button onClick={handleSave}>Save</button>
                </div>
            )}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => handleEdit(user.id)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}