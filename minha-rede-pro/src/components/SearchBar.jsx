import React, { useState } from 'react';

// Recebe as novas props do App.jsx
export default function SearchBar({ 
  onSearchChange, 
  onAreaChange, 
  onCityChange, 
  areas, 
  cities 
}) {
  
  const [term, setTerm] = useState('');

  // Atualiza o estado local E o estado do App.js
  const handleInputChange = (e) => {
    const newTerm = e.target.value;
    setTerm(newTerm);
    onSearchChange(newTerm); 
  };

  // Estilo base para os inputs e selects
  const inputStyle = "p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";

  return (
    <div className="mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row gap-4">
        
        {/* --- INPUT DE BUSCA --- */}
        <input 
          type="text"
          value={term}
          onChange={handleInputChange}
          placeholder="Buscar por nome, área ou skill..."
          className={`flex-grow ${inputStyle}`}
        />
        
        {/* --- FILTRO DE ÁREA (DINÂMICO) --- */}
        <select 
          onChange={(e) => onAreaChange(e.target.value)} 
          className={inputStyle}
        >
          <option value="">Todas as Áreas</option>
          {areas.map((area) => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>
        
        {/* --- FILTRO DE CIDADE (DINÂMICO) --- */}
        <select 
          onChange={(e) => onCityChange(e.target.value)} 
          className={inputStyle}
        >
          <option value="">Todas as Cidades</option>
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

      </div>
    </div>
  );
}