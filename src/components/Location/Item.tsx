import { EditOutlined } from '@ant-design/icons'
import { Avatar, Button, Checkbox, Form, Input, List, Modal, Select, Skeleton } from 'antd'
import React, { useState, useCallback, useRef, useEffect  } from 'react'
import api from '../../api/axiosClient'
import { getGlobalState, setGlobalState } from '../../state'
import {GoogleMapsProvider,useGoogleMap} from '@ubilabs/google-maps-react-hooks';
import { Marker } from '@react-google-maps/api'

const Item = (i: any) => {
  
  

  
  const[lat,setLat]=useState(Number(i.i.lat))
  
  const[lng,setLng]=useState(Number(i.i.long))
  const map=useGoogleMap()
  const marker=new google.maps.Marker({map})
  marker.setPosition({lng,lat})
  
  marker.setTitle(i.i.name)
  const [color,setColor]=useState("blue");
  const [confirmedStatus, setConfirmedStatus] = useState(i.i.status)
  if(confirmedStatus=='personal'){
    setConfirmedStatus('Personal')
    setColor("black")
  }
  if(confirmedStatus=='published'){
    setConfirmedStatus('Published')
    setColor("red")
  }
  if(confirmedStatus=='waiting_publish'){
    setConfirmedStatus('WaitingPublish')
    setColor("purple")
  }
  if(confirmedStatus=='hidden'){
    setConfirmedStatus('Hidden')
    setColor("blue")
    
  }

  const svgMarker = {
    path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: color,
    fillOpacity: 0.6,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(0, 20),
  };
  marker.setIcon(svgMarker)
  
  const [status, setStatus] = useState()
  
 
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  
 
  const showModal = () => {
    setIsModalOpen(true);

  };

  const handleOk = () => {
    setIsModalOpen(false);
    if(status=='Personal'){
        
      setColor("black")
    }
    if(status=='Published'){
      
      setColor("red")
    }
    if(status=='WaitingPublish'){
    
      setColor("purple")
    }
    if(status=='Hidden'){
      
      setColor("blue")
      
    }

    setConfirmedStatus(status)
    
   
 
    try {
      
      
      const res = api.location.changedetail({
          "id": i.i.id,
          "status":status
      })
      Promise.all([res]).then(values => {
          if (values[0]) {

              console.log('success')

          }
      });
  }
  catch (err) {
      console.log(err);
  }

    console.log(i.i)


  }

  const handleCancel = () => {
    setIsModalOpen(false);



  }
  const click=()=>{
    
    map?.panTo({lat,lng})
    
    
  }
  return (
    <List.Item
      actions={[<Button onClick={showModal}><EditOutlined /></Button>]}
    >

      <Skeleton avatar title={false} loading={i.i.loading} active>
        <List.Item.Meta

        

          title={<a onClick={click}>{i.i.name}</a>}
          description={i.i.description}

        />
        <List.Item.Meta
          title={confirmedStatus}></List.Item.Meta>





      </Skeleton>
      <Modal title="Update Location" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}

          autoComplete="off"
        >
          <Form.Item>
            <Select id='123' onChange={(value) => {
              setStatus(value)
            }} defaultValue={confirmedStatus}
              options={[
                { value: 'Personal', label: 'Personal' },
                { value: 'Published', label: 'Published' },
                { value: 'WaitingPublish', label: 'WaitingPublish' },
                { value: 'Hidden', label: 'Hidden', },]}>


            </Select>

          </Form.Item>
        </Form>






      </Modal>


    </List.Item>
  )
}

export default Item
