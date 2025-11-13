import React, { useState, useEffect } from 'react';
import perfisData from './data/perfis.json';
import ProfileList from './components/ProfileList.jsx';
import ProfileModal from './components/ProfileModal.jsx';
import SearchBar from './components/SearchBar.jsx';

export default function App() {
  // Estados para os dados
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  
  // Estados para os filtros
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState(''); // '' significa "Todas"
  const [selectedCity, setSelectedCity] = useState(''); // '' significa "Todas"

  // Estados para as opções dos filtros
  const [uniqueAreas, setUniqueAreas] = useState([]);
  const [uniqueCities, setUniqueCities] = useState([]);

  // Efeito 1: Carrega os dados e define as opções dos filtros (roda 1 vez)
  useEffect(() => {
    setProfiles(perfisData);
    setFilteredProfiles(perfisData);

    // Extrai áreas e cidades únicas do JSON
    const areas = [...new Set(perfisData.map(p => p.area).filter(Boolean))];
    const cities = [...new Set(perfisData.map(p => p.localizacao).filter(Boolean))];
    
    setUniqueAreas(areas.sort());
    setUniqueCities(cities.sort());
  }, []);

  // Efeito 2: Roda a lógica de filtro CADA VEZ que um filtro muda
  useEffect(() => {
    let tempProfiles = [...profiles];
    const lowerTerm = searchTerm.toLowerCase();

    // 1. Filtra por Texto
    if (searchTerm) {
      tempProfiles = tempProfiles.filter((profile) =>
        profile.nome.toLowerCase().includes(lowerTerm) ||
        profile.area.toLowerCase().includes(lowerTerm) ||
        profile.habilidadesTecnicas.some(skill => skill.toLowerCase().includes(lowerTerm))
      );
    }

    // 2. Filtra por Área
    if (selectedArea) {
      tempProfiles = tempProfiles.filter(profile => profile.area === selectedArea);
    }

    // 3. Filtra por Cidade
    if (selectedCity) {
      tempProfiles = tempProfiles.filter(profile => profile.localizacao === selectedCity);
    }

    // Atualiza a lista final de perfis
    setFilteredProfiles(tempProfiles);

  }, [searchTerm, selectedArea, selectedCity, profiles]); // Dependências do filtro
  
  // Funções do Modal
  const openModal = (profile) => setSelectedProfile(profile);
  const closeModal = () => setSelectedProfile(null);

  // Aplica/Remove a classe 'dark' do <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-200">
      
      <header className="sticky top-0 z-40 w-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-md">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            TalentLink
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-xl"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>
      
      <main className="container mx-auto p-4">
        <SearchBar 
          // Passa as funções que atualizam o estado
          onSearchChange={setSearchTerm}
          onAreaChange={setSelectedArea}
          onCityChange={setSelectedCity}
          
          // Passa as listas de opções para os <select>
          areas={uniqueAreas}
          cities={uniqueCities}
        />
        
        <ProfileList 
          profiles={filteredProfiles} 
          onCardClick={openModal} 
        />
      </main>

      {selectedProfile && (
        <ProfileModal 
          profile={selectedProfile} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
}