import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
    createBrowserRouter,
    Navigate,
    Outlet,
    RouterProvider,
} from 'react-router-dom';

import { Cocktail, Layout, Sidebar } from './features';
import { MessageBox } from './base';

const queryClient = new QueryClient();

const GH_PAGES_URL_POSTFIX = '/cocktail_test';
const COCKTAIL_LIST = ['margarita', 'mojito', 'a1', 'kir'];

const router = createBrowserRouter(
    [
        {
            index: true,
            element: <Navigate to={`/${COCKTAIL_LIST[0]}`} replace />,
        },
        {
            path: '/',
            Component: () => (
                <Layout
                    sidebarSlot={<Sidebar routes={COCKTAIL_LIST} />}
                    routerSlot={<Outlet />}
                />
            ),
            children: [
                ...COCKTAIL_LIST.map((cocktail) => ({
                    path: cocktail,
                    Component: Cocktail,
                })),
                {
                    path: '*',
                    element: <MessageBox message={'404 - Unknown route'} />,
                },
            ],
        },
    ],
    { basename: GH_PAGES_URL_POSTFIX }
);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </StrictMode>
);
