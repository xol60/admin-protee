import { Box, Flex, SkeletonCircle } from '@chakra-ui/react'


import Item from './Item';

import { Avatar, Button, Checkbox, Form, Input, InputNumber, List, Modal, Select, Skeleton } from 'antd'
import React, { useState, useCallback, useRef, useEffect  } from 'react'
import {GoogleMapsProvider, useGoogleMap } from '@ubilabs/google-maps-react-hooks';
import { ConsoleSqlOutlined } from '@ant-design/icons';
import api from '../../api/axiosClient';
import { DangerousLocation } from '../../module/location.dto';




const ListItem = () => {
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
 const [lat,setLat]=useState(0);
 const[lng,setLng]=useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
 



  const handleCancel = () => {
    setIsModalOpen(false);



  }
  const onFinish = (values: any) => {
    const pro=api.location.create({
    name: values.name,
    description: values.address,
    long: lng,
    lat: lat


    })
    Promise.all([pro]).then(values => {
      if (values[0]) {
        setLocations([...locations,values[0]])
        form.resetFields()
        
      }
      else {
       
      }
      
    });
    if(true){
      setIsModalOpen(false)
    }
   

  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  
  


  
  const map=useGoogleMap()
  const myLatlng = { lat: -25.363, lng: 131.044 };
 
  
    map?.addListener("click", (mapsMouseEvent:any) => {
    
   
    setLat(mapsMouseEvent.latLng.toJSON().lat)
    setLng(mapsMouseEvent.latLng.toJSON().lng)
    setIsModalOpen(true)
    
  });

  if (!true)
    return (
      <Flex
        direction={"column"}
        bg={"whiteAlpha.900"}
        width={"37vw"}
        height="100vh"
        position={"absolute"}
        left={0}
        top={0}
        zIndex={1}
        overflow="hidden"
        px={2}
      >
        <Box padding="6" boxShadow="lg" bg="white" mt={16}>
          <SkeletonCircle size="10" />

        </Box>
        <Box padding="6" boxShadow="lg" bg="white" mt={3}>
          <SkeletonCircle size="10" />

        </Box>
        <Box padding="6" boxShadow="lg" bg="white" mt={3}>
          <SkeletonCircle size="10" />

        </Box>
        <Box padding="6" boxShadow="lg" bg="white" mt={3}>
          <SkeletonCircle size="10" />

        </Box>
        <Box padding="6" boxShadow="lg" bg="white" mt={3}>
          <SkeletonCircle size="10" />

        </Box>
      </Flex>
    );

  return (
    <Flex
      direction={"column"}
      bg={"whiteAlpha.900"}
      width={"37vw"}
      height="100vh"
      position={"absolute"}
      left={0}
      top={0}
      zIndex={1}
      overflow="hidden"
      px={2}
    >
      
      <Flex bg={'white'} overflowY={"scroll"} mt={60} direction={"column"}>
      
      <Modal title="Add Location" open={isModalOpen}  onCancel={handleCancel} footer={[
          
          
        ]}>
        <Form
        form={form}
        
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
    onFinishFailed={onFinishFailed}

          autoComplete="off"
        >
          <Form.Item
      label="Address"
      name="address"
      rules={[{ required: true, message: 'Please input the address of location!' }]}
    >
      <Input placeholder='227 Đ. Nguyễn Văn Cừ, Phường 4, Quận 5, Thành phố Hồ Chí Minh' />
    </Form.Item>
    <Form.Item
      label="Name"
      name="name"
      rules={[{ required: true, message: 'Please input the name of location!' }]}
    >
      <Input placeholder='Trường Đại học Khoa học Tự nhiên ' />
    </Form.Item>
        
         
     
            
      
      <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
        

      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
        </Form>






      </Modal>
           
            

        <List
          className="demo-loadmore-list"

          itemLayout="horizontal"

          dataSource={locations}
          renderItem={(item) => (
            <Item i={item}  ></Item>

          )}
        />
         




      </Flex>
    </Flex>
  )
}

export default ListItem
