import './index.css'
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'
import { Card } from './components/ui/card'
import { IconGitFork, IconDeviceDesktopPin, IconMapPin, IconClockHour2, IconWorld, IconZoom } from '@tabler/icons-react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'
import blackPin from './assets/black_pin.svg'

function App() {

  const customIcon = new L.Icon({
    iconUrl: blackPin,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })
  const center = [-34.8941, -56.1528];
  return (
    <div className='w-screen h-screen flex bg-black'>
      <section className='flex flex-col gap-10 h-screen w-1/3 p-8 border-r border-blue-500'>
        <div className='w-full mx-auto flex gap-3 items-center'>
          <Input className='bg-black' placeholder='Enter a IP or a Domain name' />
          <Button className='h-full flex items-center gap-1 border bg-white text-black hover:bg-black hover:text-white hover:border-white transition-all active:scale-95'><IconZoom/> Buscar</Button>
        </div>
        <Card className="w-full p-6 grid gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold text-neutral-300">Network Info</h3> <IconGitFork stroke='1.5'/>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconDeviceDesktopPin stroke='1.5'/><span className="text-sm font-medium">IP Address</span> 
              </div>
              <span className="text-sm font-medium text-neutral-300">192.168.1.100</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconMapPin stroke='1.5' /><span className="text-sm font-medium">Location</span> 
              </div>
              <span className="text-sm font-medium text-neutral-300">San Francisco, CA</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconClockHour2 stroke='1.5'/><span className="text-sm font-medium">Timezone</span>
              </div>
              <span className="text-sm font-medium text-neutral-300">UTC-8</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconWorld stroke='1.5'/><span className="text-sm font-medium">ISP</span>
              </div>
              <span className="text-sm font-medium text-neutral-300">Comcast</span> 
            </div>
          </div>
        </Card>
      </section>
      <MapContainer center={center} zoom={13} className='size-full'>
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        minZoom={0}
        maxZoom={20}
        attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={center} icon={customIcon} />
    </MapContainer>
    </div>
  )
}

export default App
