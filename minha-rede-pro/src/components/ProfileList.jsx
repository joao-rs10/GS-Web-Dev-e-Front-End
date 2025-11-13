import React from 'react';
import ProfileCard from './ProfileCard.jsx';

export default function ProfileList({ profiles, onCardClick }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {profiles.map((profile) => (
        <ProfileCard 
          key={profile.id} 
          profile={profile} 
          onCardClick={onCardClick}
        />
      ))}
    </div>
  );
}