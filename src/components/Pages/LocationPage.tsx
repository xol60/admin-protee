import React, { useState } from 'react'
import { Autocomplete, GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import ListItem from '../../components/Location/ListItem';
import { DangerousLocation, LocationStatusEnum } from '../../module/location.dto';
import { Button } from 'antd';
import personal from '../../assests/personal_icon.png'
import waitting_published from '../../assests/waitting_icon.png'
import published from '../../assests/published_icon.png'
import hidden from '../../assests/hidden_icon.png'
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

const containerStyle = {
  width: '2000px',
  height: '940px'
};

function getKeyByValue(value: string) {
  const indexOfS = Object.values(LocationStatusEnum).indexOf(value as unknown as LocationStatusEnum);

  const key: any = Object.keys(LocationStatusEnum)[indexOfS];

  return key;
}

function createData(
  id: string,
  name: string,
  description: string,
  loca: number[],
  sta: string,
): DangerousLocation {
  const str: keyof typeof LocationStatusEnum = getKeyByValue(sta);
  return { id, name, description, long: loca[0], lat: loca[1], status: str as unknown as LocationStatusEnum };
}

const rows = [
  createData('1', 'Quán ăn Cường Vui 2', 'Nhà hàng  220,Đường Trần Hưng Đạo ,Quận Cái Răng', [11, 23], 'published'),
  createData('1', 'Quán ăn Cường Vui 2', 'Nhà hàng  220,Đường Trần Hưng Đạo ,Quận Cái Răng', [12, 22], 'published'),
  createData('1', 'Quán ăn Cường Vui 2', 'Nhà hàng  220,Đường Trần Hưng Đạo ,Quận Cái Răng', [13, 5], 'personal'),
  createData('1', 'Quán ăn Cường Vui 2', 'Nhà hàng  220,Đường Trần Hưng Đạo ,Quận Cái Răng', [14, 5], 'personal'),
  createData('1', 'Quán ăn Cường Vui 2', 'Nhà hàng  220,Đường Trần Hưng Đạo ,Quận Cái Răng', [15, 5], 'hidden'),
  createData('1', 'Quán ăn Cường Vui 2', 'Nhà hàng  220,Đường Trần Hưng Đạo ,Quận Cái Răng', [16, 2], 'hidden'),
  createData('1', 'Quán ăn Cường Vui 2', 'Nhà hàng  220,Đường Trần Hưng Đạo ,Quận Cái Răng', [17, 5], 'published'),
  createData('1', 'Quán ăn Cường Vui 2', 'Nhà hàng  220,Đường Trần Hưng Đạo ,Quận Cái Răng', [18, 5], 'published'),
  createData('1', 'Quán ăn Cường Vui 2', 'Nhà hàng  220,Đường Trần Hưng Đạo ,Quận Cái Răng', [19, 5], 'waiting_publish'),
  createData('1', 'Quán ăn Cường Vui 2', 'Nhà hàng  220,Đường Trần Hưng Đạo ,Quận Cái Răng', [20, 45], 'waiting_publish'),

];

function LocationPage() {
  const [selected, setSelected] = useState(null);
  const [center, setCenter] = React.useState({ lat: 10.762622, lng: 106.660172 })
  const onClick = () => {
    setCenter({ lng: rows[1].long, lat: rows[1].lat })
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
        {rows
          .map((row) => {
            console.log(row.status)
            return (
              <Marker position={{ lng: row.long, lat: row.lat }} title={row.name} />
            )
          })}
        <ListItem places={rows} isLoading={isLoading}></ListItem>

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

  console.log(ready)

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
                rows.map(({ id, description }) => (
                  <ComboboxOption key={id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </Flex>
    </Flex>

  );
};

export default React.memo(LocationPage)
