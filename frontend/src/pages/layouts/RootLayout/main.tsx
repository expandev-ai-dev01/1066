import { Outlet } from 'react-router-dom';

/**
 * @component RootLayout
 * @summary Root layout component that wraps all pages
 * @type layout-component
 * @category layout
 */
export const RootLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
    </div>
  );
};
