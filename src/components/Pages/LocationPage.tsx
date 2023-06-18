import React, { useState } from 'react'
import ListItem from '../../components/Location/ListItem';
import { GoogleMapsProvider } from '@ubilabs/google-maps-react-hooks';
import "@reach/combobox/styles.css";

const mapOptions = {
  zoom: 16,
  center: {
    lat: Number(process.env.REACT_APP_LAT_CENTER),
    lng: Number(process.env.REACT_APP_LNG_CENTER),
  },
}
function LocationPage() {
  const [mapContainer, setMapContainer] = useState(null)
  return (
    <GoogleMapsProvider
      googleMapsAPIKey={process.env.REACT_APP_GOOGLEMAP_KEY + ''}
      mapOptions={mapOptions}
      mapContainer={mapContainer}
      libraries={['places']}
    >
      <div ref={(node: any) => setMapContainer(node)} style={{ height: "100vh" }}></div>
      <ListItem  ></ListItem>
      <></>
    </GoogleMapsProvider>
  )
}


export default React.memo(LocationPage)
