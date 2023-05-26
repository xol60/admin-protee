import React, { useState } from 'react'
import ListItem from '../../components/Location/ListItem';
import { GoogleMapsProvider } from '@ubilabs/google-maps-react-hooks';
import "@reach/combobox/styles.css";
const mapOptions = {
  zoom: 12,
  center: {
    lat: 10.763046391328121,
    lng: 106.68243948091191,
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
