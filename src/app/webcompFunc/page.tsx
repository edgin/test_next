'use client'; // Needed if you're using Next.js 13+ app router with React hooks

import XSearch from '../../components/func_wc';

export default function ProfilePage() {
  return (
    <div>
      <h1>Profile</h1>
      <XSearch name="example" />
      <p>Welcome to your profile!</p>
    </div>
  );
}
