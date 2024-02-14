'use client';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import { updateUser } from '@/app/actions';

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName ?? '');
  const [lastName, setLastName] = useState(user?.lastName ?? '');

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const clerkId = user.id;
    const params: { firstName?: string; lastName?: string } = {};
    if (firstName) params.firstName = firstName;
    if (lastName) params.lastName = lastName;

    try {
      await updateUser(clerkId, params);

      setFirstName('');
      setLastName('');

      // Reload user data to reflect the latest updates
      user.reload();
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div>
        <h1>Current User Data:</h1>
        <p>ID: {user.id}</p>
        <p>First Name: {user.firstName}</p>
        <p>Last Name: {user.lastName}</p>
      </div>
      <form onSubmit={handleSubmit} className="mt-8">
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <button type="submit" className="mt-4">
          Update User
        </button>
      </form>
    </main>
  );
}
