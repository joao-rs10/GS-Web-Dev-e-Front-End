import React from 'react';

export default function ProfileModal({ profile, onClose }) {
  
  const handleRecommend = () => {
    alert(`Você recomendou ${profile.nome}!`);
  };

  const handleMessage = () => {
    alert(`Abrindo chat com ${profile.nome}...`);
  };

  // Função para renderizar um array de objetos (como Formação e Experiência)
  const renderSectionList = (title, items, renderItem) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">{title}</h4>
        <ul className="list-disc list-inside space-y-2">
          {items.map(renderItem)}
        </ul>
      </div>
    );
  };

  // Função para renderizar um array de strings (como Skills e Interesses)
  const renderTagList = (title, items) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">{title}</h4>
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


  return (
    // Overlay (fundo escuro)
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose} // Fecha o modal ao clicar fora
    >
      {/* Conteúdo do Modal */}
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Impede que o clique dentro feche o modal
      >
        
        {/* --- HEADER DO MODAL --- */}
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">{profile.nome}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white text-3xl font-light"
          >
            &times;
          </button>
        </div>

        {/* --- CORPO DO MODAL --- */}
        <div className="p-6">
          {/* Seção Pessoal (Foto, Cargo, Resumo) */}
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <img
              src={profile.foto}
              alt={profile.nome}
              className="w-32 h-32 rounded-full mx-auto md:mx-0 object-cover shadow-md"
            />
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-semibold">{profile.cargo}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">{profile.localizacao}</p>
              <p className="text-sm">{profile.resumo}</p>
            </div>
          </div>

          <hr className="my-4 dark:border-gray-700" />

          {/* Seções de Detalhes */}
          {renderTagList("Habilidades Técnicas", profile.habilidadesTecnicas)}
          {renderTagList("Soft Skills", profile.softSkills)}
          
          {renderSectionList("Experiências", profile.experiencias, (exp, i) => (
            <li key={i}>
              <strong>{exp.cargo}</strong> em {exp.empresa} ({exp.inicio} - {exp.fim || 'Atual'})
              <p className="text-sm text-gray-600 dark:text-gray-400 pl-4">{exp.descricao}</p>
            </li>
          ))}

          {renderSectionList("Formação", profile.formacao, (form, i) => (
            <li key={i}>
              <strong>{form.curso}</strong> - {form.instituicao} ({form.ano})
            </li>
          ))}
          
        </div>

        {/* --- FOOTER DO MODAL (Botões) --- */}
        <div className="flex justify-end gap-4 p-4 bg-gray-50 dark:bg-gray-700 border-t dark:border-gray-600 sticky bottom-0 z-10">
          <button
            onClick={handleMessage}
            className="px-5 py-2 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 font-medium transition-colors"
          >
            Enviar Mensagem
          </button>
          <button
            onClick={handleRecommend}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-colors"
          >
            Recomendar
          </button>
        </div>
      </div>
    </div>
  );
}