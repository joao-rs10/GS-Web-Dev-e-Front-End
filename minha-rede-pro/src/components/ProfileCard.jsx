import React from 'react';

export default function ProfileCard({ profile, onCardClick }) {
  return (
    <div
      onClick={() => onCardClick(profile)} 
      className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden
                 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
    >
      <img
        className="w-full h-48 object-cover"
        src={profile.foto}
        alt={profile.nome}
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-1">{profile.nome}</h3>
        <p className="text-blue-500 dark:text-blue-400 text-sm">{profile.cargo}</p>
        
        <div className="mt-3 flex flex-wrap gap-2">
          {profile.habilidadesTecnicas.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="text-xs bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 font-medium"
            >
              {skill}
            </span>
          ))}
          {profile.habilidadesTecnicas.length > 3 && (
             <span className="text-xs bg-gray-300 dark:bg-gray-600 rounded-full px-3 py-1 font-medium">
              +{profile.habilidadesTecnicas.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}