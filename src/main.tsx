import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createHashRouter, RouterProvider } from 'react-router'
import FavoriteFilms from './components/FavoriteFilms.tsx'
import Api from './components/Api.tsx'

const router = createHashRouter([
	{
		path: "/",
		Component: App,
		children: [
			{
				path: "",
				Component: Api
			},
			{
				path: "favoritefilms",
				Component: FavoriteFilms
			}
		]
	}
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
