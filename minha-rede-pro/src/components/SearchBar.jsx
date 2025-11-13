import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');

  const handleInputChange = (e) => {
    const newTerm = e.target.value;
    setTerm(newTerm);
    onSearch(newTerm); // Envia o termo de busca para o App.js
  };

  return (
    <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Input de Busca */}
        <input 
          type="text"
          value={term}
          onChange={handleInputChange}
          placeholder="Buscar por nome, área ou skill..."
          className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        {/* Filtros (Layout) */}
        <select className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Todas as Áreas</option>
          <option value="TI">TI</option>
          <option value="Design">Design</option>
          <option value="Saúde">Saúde</option>
        </select>
        <select className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Todas as Cidades</option>
          <option value="São Paulo/SP">São Paulo/SP</option>
          <option value="Curitiba/PR">Curitiba/PR</option>
        </select>
      </div>
    </div>
  );
}