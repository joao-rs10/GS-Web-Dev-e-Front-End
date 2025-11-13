import React from 'react';
import ProfileCard from './ProfileCard.jsx';

export default function ProfileList({ profiles, onCardClick }) {
  
  // Se não houver perfis, mostra uma mensagem
  if (profiles.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
          Nenhum perfil encontrado
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Tente ajustar seus termos de busca ou filtros.
        </p>
      </div>
    );
  }

  // Se houver perfis, mostra o grid
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