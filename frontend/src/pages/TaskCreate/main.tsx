import { useNavigate } from 'react-router-dom';
import { TaskCreateForm } from './_impl/TaskCreateForm';

/**
 * @page TaskCreatePage
 * @summary Page for creating new tasks with form validation and category management
 * @domain task
 * @type form-page
 * @category task-management
 *
 * @routing
 * - Path: /tasks/new
 * - Guards: Authentication required
 *
 * @layout
 * - Layout: RootLayout
 * - Sections: Header, Form
 *
 * @data
 * - Sources: Task API, Category API
 * - Loading: Form loading states
 * - Caching: Category list cached
 *
 * @userFlows
 * - Primary: User fills form and creates task
 * - Secondary: User creates new category during task creation
 * - Error: Validation errors displayed inline
 */
export const TaskCreatePage = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Nova Tarefa</h1>
          <p className="mt-2 text-sm text-gray-600">
            Preencha as informações abaixo para criar uma nova tarefa
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <TaskCreateForm onSuccess={handleSuccess} onCancel={handleCancel} />
        </div>
      </div>
    </div>
  );
};

export default TaskCreatePage;
