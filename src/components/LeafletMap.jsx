import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'
import blackPin from '../assets/black_pin.svg'

const LeafletMap = () => {
  const customIcon = new L.Icon({
    iconUrl: blackPin,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })
  const center = [-34.8941, -56.1528];
  return (
    <MapContainer center={center} zoom={13} className='size-full'>
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        minZoom={0}
        maxZoom={20}
        attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={center} icon={customIcon} />
    </MapContainer>
  )
}

export default LeafletMap