import React, { useState } from 'react'; // Importe o useState

export default function ProfileModal({ profile, onClose }) {
  
  // Novo estado para controlar a aba ativa
  const [activeTab, setActiveTab] = useState('sobre');

  const handleRecommend = () => {
    alert(`Você recomendou ${profile.nome}!`);
  };

  const handleMessage = () => {
    alert(`Abrindo chat com ${profile.nome}...`);
  };

  // Funções de renderização (continuam as mesmas)
  const renderSectionList = (title, items, renderItem) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-3">{title}</h4>
        <ul className="list-disc list-inside space-y-3">
          {items.map(renderItem)}
        </ul>
      </div>
    );
  };

  const renderTagList = (title, items) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-3">{title}</h4>
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <span key={item} className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-sm font-medium px-2.5 py-0.5 rounded-full">
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  };
  
  // Componente pequeno para o botão da Aba
  const TabButton = ({ tabName, label }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`py-3 px-6 font-medium border-b-2 transition-colors
        ${activeTab === tabName 
          ? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400' 
          : 'text-gray-500 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
        }
      `}
    >
      {label}
    </button>
  );


  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col" // Nova classe 'flex flex-col'
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* --- HEADER DO MODAL (com foto e botões) --- */}
        <div className="p-6 relative">
          {/* Botão de Fechar (movido para o canto) */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white text-3xl font-light"
          >
            &times;
          </button>
          
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <img
              src={profile.foto}
              alt={profile.nome}
              className="w-32 h-32 rounded-full object-cover shadow-md"
            />
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">{profile.nome}</h2>
              <h3 className="text-xl font-semibold mt-1">{profile.cargo}</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">{profile.localizacao}</p>
            </div>
          </div>
          
          {/* Botões de Ação (movidos para baixo da foto) */}
          <div className="flex justify-center md:justify-start gap-4 pt-5">
            <button
              onClick={handleRecommend}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-colors"
            >
              Recomendar
            </button>
            <button
              onClick={handleMessage}
              className="px-5 py-2 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 font-medium transition-colors"
            >
              Enviar Mensagem
            </button>
          </div>
        </div>

        {/* --- ABAS DE NAVEGAÇÃO --- */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex px-6 -mb-px">
            <TabButton tabName="sobre" label="Sobre" />
            <TabButton tabName="experiencia" label="Experiência e Formação" />
          </nav>
        </div>

        {/* --- CORPO DO MODAL (com overflow) --- */}
        <div className="p-6 overflow-y-auto"> {/* Este é o novo container com scroll */}
          
          {/* Conteúdo da Aba "Sobre" */}
          {activeTab === 'sobre' && (
            <div>
              <h3 className="text-xl font-semibold mb-2">Resumo</h3>
              <p className="text-sm mb-6">{profile.resumo}</p>
              
              <hr className="my-6 dark:border-gray-700" />
              
              {renderTagList("Habilidades Técnicas", profile.habilidadesTecnicas)}
              {renderTagList("Soft Skills", profile.softSkills)}
              {renderTagList("Áreas de Interesse", profile.areaInteresses)}
              
              {renderSectionList("Idiomas", profile.idiomas, (lang, i) => (
                <li key={i}>
                  <strong>{lang.idioma}</strong> - {lang.nivel}
                </li>
              ))}
            </div>
          )}
          
          {/* Conteúdo da Aba "Experiência" */}
          {activeTab === 'experiencia' && (
            <div>
              {renderSectionList("Experiências", profile.experiencias, (exp, i) => (
                <li key={i} className="mb-2">
                  <strong className="block text-lg">{exp.cargo}</strong>
                  <span className="text-blue-500 dark:text-blue-400">{exp.empresa}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm block">({exp.inicio} - {exp.fim || 'Atual'})</span>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{exp.descricao}</p>
                </li>
              ))}
              
              <hr className="my-6 dark:border-gray-700" />

              {renderSectionList("Formação", profile.formacao, (form, i) => (
                <li key={i}>
                  <strong className="block text-lg">{form.curso}</strong>
                  <span className="text-gray-600 dark:text-gray-300">{form.instituicao} ({form.ano})</span>
                </li>
              ))}
              
              {/* Você pode adicionar 'Projetos' e 'Certificações' aqui também */}
              {renderTagList("Certificações", profile.certificacoes)}
            </div>
          )}

        </div>

        {/* Footer do Modal foi removido, pois os botões estão no header */}
        
      </div>
    </div>
  );
}