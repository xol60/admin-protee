import React, { useState } from 'react'
import { Autocomplete, GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import ListItem from '../../components/Location/ListItem';
import { DangerousLocation, LocationStatusEnum } from '../../module/location.dto';
import { Button } from 'antd';
import Personal from '../../assests/personal_icon.png'
import WaitingPublish from '../../assests/waitting_icon.png'
import Pubished from '../../assests/published_icon.png'
import Hidden from '../../assests/hidden_icon.png'
import {GoogleMapsProvider} from '@ubilabs/google-maps-react-hooks';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { Flex } from '@chakra-ui/react';




function getKeyByValue(value: string) {
  const indexOfS = Object.values(LocationStatusEnum).indexOf(value as unknown as LocationStatusEnum);

  const key: any = Object.keys(LocationStatusEnum)[indexOfS];

  return key;
}



const mapOptions={
  zoom:12,
  center:{
    lat:10.763046391328121,
    lng:106.68243948091191,
  },
}


function LocationPage() {
 
  
  
 

  const isLoading: boolean = true
  const [mapContainer,setMapContainer]=useState(null)
 
 const [selected, setSelected] = useState(null);
 

  return (

    <GoogleMapsProvider


      googleMapsAPIKey="AIzaSyBMrRrm1EiDwptZuK3bfhrJyF2x9qIcn0A"
      mapOptions={mapOptions}
      mapContainer={mapContainer}
      libraries={['places']}
      

      

    > 



      <div ref={(node:any)=>setMapContainer(node)} style={{height:"100vh"}}></div>
       
        <ListItem  ></ListItem>
       
        
       

        <></>
      </GoogleMapsProvider>
     



  )
}
const PlacesAutocomplete = (setSelected: any) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  

  const handleSelect = async (address: any) => {

    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  return (

    <Flex
      position={"absolute"}
      top={0}
      left={0}
      width={"full"}

      py={37}
      zIndex={101}
    >
      <Flex>
        <Combobox onSelect={handleSelect}>
          <ComboboxInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            
            className="combobox-input"
            placeholder="Search an address"
          />
          <ComboboxPopover>
            <ComboboxList>
              {status === "OK" &&
                data.map(({ place_id, description }) => (
                  <ComboboxOption key={place_id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </Flex>
    </Flex>

  );
};

export default React.memo(LocationPage)
