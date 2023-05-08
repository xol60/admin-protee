import React, { useState } from 'react'
import { Autocomplete, GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import ListItem from '../../components/Location/ListItem';
import { DangerousLocation, LocationStatusEnum } from '../../module/location.dto';
import { Button } from 'antd';
import Personal from '../../assests/personal_icon.png'
import WaitingPublish from '../../assests/waitting_icon.png'
import Pubished from '../../assests/published_icon.png'
import Hidden from '../../assests/hidden_icon.png'
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
import api from '../../api/axiosClient';

const containerStyle = {
  width: '2000px',
  height: '940px'
};

function getKeyByValue(value: string) {
  const indexOfS = Object.values(LocationStatusEnum).indexOf(value as unknown as LocationStatusEnum);

  const key: any = Object.keys(LocationStatusEnum)[indexOfS];

  return key;
}






function LocationPage() {
  const [locations, setLocations] = React.useState<DangerousLocation[]>([])
  React.useEffect(() => {
    try {
      const res1 = api.location.list({ filter: '' });
      
      Promise.all([res1]).then(values => {
        console.log(values[0]);
        setLocations(values[0]);
      });
    }
    catch (err) {
      console.error(err)
    }
  }, [])
  const [selected, setSelected] = useState(null);
  const [center, setCenter] = React.useState({ lat: 10.762622, lng: 106.660172 })
  const onClick = () => {
    setCenter({ lng: locations[1].long, lat: locations[1].lat })
  }

  const isLoading: boolean = true
  
  return (

    <LoadScript


      googleMapsApiKey="AIzaSyBMrRrm1EiDwptZuK3bfhrJyF2x9qIcn0A"
      libraries={['places']}

    >



      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {locations
          .map((location) => {
            console.log(typeof location.status)
            return (
              <Marker position={{ lng: location.long, lat: location.lat }} title={location.name} />
            )
          })}
        <ListItem places={locations} isLoading={isLoading}></ListItem>

        <></>
      </GoogleMap>
      <Button onClick={onClick} >Click me</Button>
    </LoadScript>



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
            disabled={!ready}
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
