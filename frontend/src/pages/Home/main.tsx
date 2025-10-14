/**
 * @page HomePage
 * @summary Welcome page for the TODO List application
 * @type landing-page
 * @category public
 */
export const HomePage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Sistema de Gerenciamento de Tarefas
        </h1>
        <p className="text-xl text-gray-600 mb-8">Organize suas tarefas de forma eficiente</p>
        <div className="space-y-4">
          <div className="text-sm text-gray-500">Frontend estrutura base criada com sucesso</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
