
import './App.css'
import Api from './components/Api'
import Header from './components/Header'
import FavoriteFilms from './components/FavoriteFilms'
import { Outlet } from 'react-router'

function App() {
  

  return (
    <>
    <Header />
	<main>
		<Outlet />
	</main>
	
    </>
  )
}

export default App
