import { type RouteObject, createBrowserRouter } from 'react-router';

import { ErrorPage, RootErrorPage } from '@/components/ErrorPage';
import { RootLayout } from '@/layouts/RootLayout';
import { AboutPage } from '@/pages/AboutPage';
import { BonesPage } from '@/pages/BonesPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { RoutePage } from '@/pages/RoutePage';
import { ShoppingPage } from '@/pages/ShoppingPage';

/** Nav links shown in the app bar, in order. */
export const navItems = [
  { to: '/', label: 'Route' },
  { to: '/bones', label: 'Bones' },
  { to: '/shopping', label: 'Shopping' },
  { to: '/about', label: 'About' },
];

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RootErrorPage />,
    children: [
      {
        // Pathless route: a page that throws shows ErrorPage inside the layout,
        // so the app bar and navigation keep working.
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <RoutePage /> },
          { path: 'bones', element: <BonesPage /> },
          { path: 'shopping', element: <ShoppingPage /> },
          { path: 'about', element: <AboutPage /> },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
];

export function createAppRouter() {
  // BASE_URL is Vite's `base` ("/" locally, "/<repo>/" on GitHub Pages).
  return createBrowserRouter(routes, { basename: import.meta.env.BASE_URL });
}
