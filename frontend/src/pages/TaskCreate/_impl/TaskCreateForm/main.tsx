import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useTaskCreate } from '@/domain/task/hooks/useTaskCreate';
import { useCategoryList } from '@/domain/category/hooks/useCategoryList';
import { Button } from '@/core/components/Button';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import type { TaskCreateFormProps } from './types';
import type { TaskPriority, CreateTaskDto } from '@/domain/task/types';

const taskSchema = z
  .object({
    title: z
      .string()
      .min(3, 'O título deve ter pelo menos 3 caracteres')
      .max(100, 'O título deve ter no máximo 100 caracteres')
      .refine((val) => val.trim().length > 0, { message: 'O título da tarefa é obrigatório' }),
    description: z.string().max(500, 'A descrição deve ter no máximo 500 caracteres').optional(),
    deadline: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (!val) return true;
          const date = new Date(val);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return date >= today;
        },
        { message: 'O prazo não pode ser uma data passada' }
      ),
    priority: z.number().int().min(0).max(2).optional(),
    idCategory: z.number().int().positive().optional(),
    newCategory: z
      .string()
      .min(2, 'O nome da nova categoria deve ter entre 2 e 50 caracteres')
      .max(50, 'O nome da nova categoria deve ter entre 2 e 50 caracteres')
      .refine((val) => !val || val.trim().length > 0, {
        message: 'O nome da nova categoria deve ter entre 2 e 50 caracteres',
      })
      .optional(),
  })
  .refine(
    (data) => {
      if (data.idCategory && data.newCategory) {
        return false;
      }
      return true;
    },
    {
      message: 'Selecione uma categoria existente OU crie uma nova',
      path: ['newCategory'],
    }
  );

type TaskFormData = z.infer<typeof taskSchema>;

/**
 * @component TaskCreateForm
 * @summary Form component for creating new tasks with validation
 * @domain task
 * @type form-component
 * @category task-management
 *
 * @props
 * @param {Function} props.onSuccess - Callback on successful creation
 * @param {Function} props.onCancel - Callback on form cancellation
 *
 * @state
 * - formData: Form field values
 * - showCancelModal: Cancel confirmation modal visibility
 * - successMessage: Success notification message
 *
 * @validation
 * - Title: Required, 3-100 characters, no whitespace only
 * - Description: Optional, max 500 characters
 * - Deadline: Optional, cannot be past date
 * - Priority: Optional, 0-2 (Low, Medium, High)
 * - Category: Either select existing OR create new, not both
 */
export const TaskCreateForm = ({ onSuccess, onCancel }: TaskCreateFormProps) => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [categoryMode, setCategoryMode] = useState<'existing' | 'new' | null>(null);

  const { categories, isLoading: categoriesLoading } = useCategoryList();

  const { createTask, isCreating } = useTaskCreate({
    onSuccess: (data) => {
      let message = `Tarefa "${data.title}" criada com sucesso!`;
      if (data.categoryCreated && data.categoryName) {
        message += ` Categoria "${data.categoryName}" criada com sucesso!`;
      }
      setSuccessMessage(message);
      setTimeout(() => {
        onSuccess?.();
      }, 3000);
    },
    onError: (error) => {
      console.error('Error creating task:', error);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      priority: 1,
    },
  });

  const onSubmit: SubmitHandler<TaskFormData> = async (data) => {
    try {
      const submitData: CreateTaskDto = {
        title: data.title,
        description: data.description || undefined,
        deadline: data.deadline ? new Date(data.deadline) : undefined,
        priority: data.priority as TaskPriority,
      };

      if (categoryMode === 'existing' && data.idCategory) {
        submitData.idCategory = data.idCategory;
      } else if (categoryMode === 'new' && data.newCategory) {
        submitData.newCategory = data.newCategory;
      }

      await createTask(submitData);
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  const handleCancelClick = () => {
    setShowCancelModal(true);
  };

  const handleCancelConfirm = () => {
    setShowCancelModal(false);
    onCancel?.();
  };

  const handleCategoryModeChange = (mode: 'existing' | 'new') => {
    if (categoryMode === mode) {
      setCategoryMode(null);
      setValue('idCategory', undefined);
      setValue('newCategory', undefined);
    } else {
      setCategoryMode(mode);
      if (mode === 'existing') {
        setValue('newCategory', undefined);
      } else {
        setValue('idCategory', undefined);
      }
    }
  };

  if (successMessage) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success-100 mb-4">
          <svg
            className="w-8 h-8 text-success-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Sucesso!</h3>
        <p className="text-gray-600">{successMessage}</p>
        <p className="text-sm text-gray-500 mt-2">Redirecionando...</p>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Título <span className="text-red-500">*</span>
          </label>
          <input
            {...register('title')}
            type="text"
            id="title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Digite o título da tarefa"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Descrição
          </label>
          <textarea
            {...register('description')}
            id="description"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Digite uma descrição detalhada (opcional)"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
              Prazo
            </label>
            <input
              {...register('deadline')}
              type="date"
              id="deadline"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {errors.deadline && (
              <p className="mt-1 text-sm text-red-600">{errors.deadline.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
              Prioridade
            </label>
            <select
              {...register('priority', { valueAsNumber: true })}
              id="priority"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="0">Baixa</option>
              <option value="1">Média</option>
              <option value="2">Alta</option>
            </select>
            {errors.priority && (
              <p className="mt-1 text-sm text-red-600">{errors.priority.message}</p>
            )}
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Categoria</h3>

          <div className="space-y-4">
            <div>
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="useExistingCategory"
                  checked={categoryMode === 'existing'}
                  onChange={() => handleCategoryModeChange('existing')}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="useExistingCategory" className="ml-2 text-sm text-gray-700">
                  Selecionar categoria existente
                </label>
              </div>

              {categoryMode === 'existing' && (
                <div>
                  {categoriesLoading ? (
                    <LoadingSpinner size="small" />
                  ) : (
                    <select
                      {...register('idCategory', { valueAsNumber: true })}
                      id="idCategory"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Selecione uma categoria</option>
                      {categories.map((category) => (
                        <option key={category.idCategory} value={category.idCategory}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  )}
                  {errors.idCategory && (
                    <p className="mt-1 text-sm text-red-600">{errors.idCategory.message}</p>
                  )}
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="createNewCategory"
                  checked={categoryMode === 'new'}
                  onChange={() => handleCategoryModeChange('new')}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="createNewCategory" className="ml-2 text-sm text-gray-700">
                  Criar nova categoria
                </label>
              </div>

              {categoryMode === 'new' && (
                <div>
                  <input
                    {...register('newCategory')}
                    type="text"
                    id="newCategory"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Nome da nova categoria"
                  />
                  {errors.newCategory && (
                    <p className="mt-1 text-sm text-red-600">{errors.newCategory.message}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t">
          <Button type="button" variant="ghost" onClick={handleCancelClick} disabled={isCreating}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isCreating}>
            {isCreating ? 'Criando...' : 'Criar Tarefa'}
          </Button>
        </div>
      </form>

      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cancelar cadastro?</h3>
            <p className="text-gray-600 mb-6">
              Tem certeza que deseja cancelar? Todos os dados informados serão perdidos.
            </p>
            <div className="flex justify-end space-x-4">
              <Button variant="ghost" onClick={() => setShowCancelModal(false)}>
                Não, continuar
              </Button>
              <Button variant="danger" onClick={handleCancelConfirm}>
                Sim, cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
