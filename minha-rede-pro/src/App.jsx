import React, { useState, useEffect } from 'react';
import perfisData from './data/perfis.json'; // Importa seu JSON
import ProfileList from './components/ProfileList.jsx';
import ProfileModal from './components/ProfileModal.jsx';
import SearchBar from './components/SearchBar.jsx';

// Apague a importação do './App.css' se ela ainda estiver aqui

export default function App() {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Carrega os dados do JSON
  useEffect(() => {
    setProfiles(perfisData);
    setFilteredProfiles(perfisData);
  }, []);

  // Função de filtro (busca por nome, área ou skill)
  const handleSearch = (term) => {
    const lowerTerm = term.toLowerCase();
    if (lowerTerm === "") {
      setFilteredProfiles(profiles); // Se a busca for vazia, mostra todos
      return;
    }
    
    const filtered = profiles.filter((profile) =>
      profile.nome.toLowerCase().includes(lowerTerm) ||
      profile.area.toLowerCase().includes(lowerTerm) ||
      profile.habilidadesTecnicas.some(skill => skill.toLowerCase().includes(lowerTerm))
    );
    setFilteredProfiles(filtered);
  };
  
  // Funções do Modal
  const openModal = (profile) => {
    setSelectedProfile(profile);
  };
  const closeModal = () => {
    setSelectedProfile(null);
  };

  // Aplica/Remove a classe 'dark' do <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      
      {/* --- HEADER --- */}
      <header className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
          Futuro.Work
        </h1>
        {/* Botão de Dark Mode */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-xl"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>
      
      {/* --- MAIN CONTENT --- */}
      <main className="container mx-auto p-4">
        <SearchBar onSearch={handleSearch} />
        
        <ProfileList 
          profiles={filteredProfiles} 
          onCardClick={openModal} 
        />
      </main>

      {/* --- MODAL --- */}
      {selectedProfile && (
        <ProfileModal 
          profile={selectedProfile} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
}