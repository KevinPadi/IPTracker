import './index.css'
import LeafletMap from './components/LeafletMap'
import { useContext, useEffect } from 'react'
import DataContext from './context/DataContext'
import { Toaster } from './components/ui/toaster'
import Sidebar from './components/SideBar'
import SearchBar from './components/SearchBar'
import CardInfo from './components/CardInfo'

function App() {
  const { error, showToast }= useContext(DataContext)

  useEffect(() => {
    if(error.state === true) {
      showToast('"Uh oh! Something went wrong."')
    }
  }, [error])

  return (
    <div className='w-screen h-screen md:flex bg-black relative'>
      <Sidebar />
      <div className='absolute flex-col w-screen h-screen flex justify-between md:hidden p-2'>
        <CardInfo />
        <SearchBar />
      </div>
      <LeafletMap />
      <Toaster />
    </div>
  )
}

export default App
