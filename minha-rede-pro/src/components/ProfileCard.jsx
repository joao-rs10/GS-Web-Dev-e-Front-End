import React from 'react';

export default function ProfileCard({ profile, onCardClick }) {
  return (
    <div
      onClick={() => onCardClick(profile)} 
      className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden
                 cursor-pointer transition-all duration-300
                 border border-transparent hover:border-blue-500
                 hover:shadow-xl hover:scale-[1.02]"
    >
      <img
        className="w-full h-48 object-cover"
        src={profile.foto}
        alt={profile.nome}
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-1">{profile.nome}</h3>
        <p className="text-blue-500 dark:text-blue-400 text-sm font-medium">{profile.cargo}</p>
        
        {/* --- NOVO: Ícone e Localização --- */}
        <div className="flex items-center text-gray-500 dark:text-gray-400 mt-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1.5">
            <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001c.194-.087.382-.199.563-.335l.004-.003C11.69 18.066 16 13.978 16 9.5 16 5.91 13.314 3 10 3S4 5.91 4 9.5c0 4.478 4.31 8.566 5.095 9.098l.004.003c.181.136.369.248.563.335zM10 11.75a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
          </svg>
          <span className="text-xs">{profile.localizacao}</span>
        </div>
        {/* --- Fim da Adição --- */}

        <div className="mt-4 flex flex-wrap gap-2">
          {profile.habilidadesTecnicas.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="text-xs bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 font-semibold text-gray-700 dark:text-gray-200"
            >
              {skill}
            </span>
          ))}
          {profile.habilidadesTecnicas.length > 3 && (
             <span className="text-xs bg-gray-300 dark:bg-gray-600 rounded-full px-3 py-1 font-semibold text-gray-700 dark:text-gray-200">
              +{profile.habilidadesTecnicas.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}