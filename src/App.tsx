import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { VehicleLocation, getLiveLocations } from './live-locations';
import { Icon, icon } from 'leaflet';
import { iconAT } from './ATIcon';


const AUCKLAND_POSITON: [number, number] = [-36.8485, 174.7633];

function App() {

  const [time, setTime] = useState(new Date());

  const [liveLocations, setLiveLocations] = useState<VehicleLocation[]>([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      setTime(new Date());
      console.log('Getting live locations');
      const refreshedLiveLocations = await getLiveLocations();
      console.log('Got live locations', refreshedLiveLocations.length);

      setLiveLocations(refreshedLiveLocations);
    }, 1_000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="PageWrapper">


      <MapContainer className='MapWrapper' style={{ width: "100%", height: "100%" }} center={AUCKLAND_POSITON} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          liveLocations && liveLocations.length > 0 && liveLocations.map((vl => (
            <Marker key={vl.id} position={[vl.latitude, vl.longitude]} icon={iconAT}>
              <Popup>
                Route: {vl.route_id} <br />
                Plate: {vl.vehicle_licence_plate}
                <br />
                <code>
                  {Object.keys(vl).map((k) => (
                    <div>
                      {k}: {vl[k as keyof VehicleLocation]}
                    </div>
                  ))}

                </code>
              </Popup>
            </Marker>
          ))
          )
          // liveLocations && 

          // liveLocations.length > 0 && liveLocations.map((vl => { (
          //   <Marker position={[liveLocations[0].latitude, liveLocations[0].longitude]}>
          //     <Popup>
          //       {liveLocations[0].route_id} -
          //       {liveLocations[0].vehicle_licence_plate} 
          //     </Popup>
          //   </Marker>
          // )
          // }))
        }
      </MapContainer>
    </div>
  );
}

export default App;
