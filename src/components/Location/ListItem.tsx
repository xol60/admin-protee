import { Box, Flex, SkeletonCircle } from '@chakra-ui/react'


import Item from './Item';
import { useSearchParams } from "react-router-dom"
import { Button, Form, Input, List, Modal, Tooltip, Dropdown, Space } from 'antd'
import type { MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import React, { useState, } from 'react'
import { useGoogleMap } from '@ubilabs/google-maps-react-hooks';
import { HomeOutlined, PlusOutlined, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import api from '../../api/setUpApi';
import { DangerousLocation } from '../../module/location.dto';
import PlacesAutocomplete from 'react-places-autocomplete';
import {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { QueryLocationDto } from '../../module/location.dto'
import SearchModal from '../Modal/SearchModal'

const sortValues: MenuProps['items'] = [
  {
    label: 'Name',
    key: 'name',
  },
  {
    label: 'Status',
    key: 'status',
  },
  {
    label: 'Description',
    key: 'description',
  },
];

const statusValues: MenuProps['items'] = [
  {
    label: 'Personal',
    key: 'personal',
  },
  {
    label: 'Waitting Publish',
    key: 'waiting_publish',
  },
  {
    label: 'Published',
    key: 'published',
  },
  {
    label: 'Hidden',
    key: 'hidden',
  },
];

<script src={"https://maps.googleapis.com/maps/api/js?key=" + process.env.REACT_APP_GOOGLEMAP_KEY + "&libraries=places"}></script>
const ListItem = () => {
  const [locations, setLocations] = React.useState<DangerousLocation[]>([])
  const navigate = useNavigate()
  const [queryParameters] = useSearchParams()
  const [query, setQuery] = React.useState<QueryLocationDto>({ filter: queryParameters.get("filter") + '', sortField: queryParameters.get("sortField") + '', status: queryParameters.get("status") + '' })
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  React.useEffect(() => {
    try {
      const res1 = api.location.list(query);

      Promise.all([res1]).then(values => {

        setLocations(values[0]);
      });
    }
    catch (err) {
      console.error(err)
    }
  }, [query])
  React.useEffect(() => {
    setQuery({ filter: queryParameters.get("filter") + '', sortField: queryParameters.get("sortField") + '', status: queryParameters.get("status") + '' })
  }, [queryParameters]);
  const map = useGoogleMap()





  map?.addListener("click", (mapsMouseEvent: any) => {
    setLat(mapsMouseEvent.latLng.toJSON().lat)
    setLng(mapsMouseEvent.latLng.toJSON().lng)
    setIsModalOpen(true)
    form.resetFields()
  });
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const handleCancel = () => {
    setIsModalOpen(false);

  }
  const onFinish = (values: any) => {
    setIsModalOpen(false)
    const pro = api.location.create({
      name: values.name,
      description: values.address,
      long: lng,
      lat: lat
    })
    Promise.all([pro]).then(values => {

      setLocations([...locations, values[0]])


      toast.success("Add new dangerous location successfully", {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored"
      })
    }).catch(error => {
      if (error.response.status === 400) {
        toast.error("Add new dangerous location fail.Please check your input address", {
          position: toast.POSITION.TOP_CENTER,
          theme: "colored"
        })
      }
    })





  };
  const [form1] = Form.useForm();

  const onFinishFailed = (errorInfo: any) => {

  };
  const onSortClick: MenuProps['onClick'] = ({ key }) => {
    navigate(`/locations?&filter=${query.filter + ''}&sortField=${key}&status=${query.status}`)

  };
  const onStatusClick: MenuProps['onClick'] = ({ key }) => {

    navigate(`/locations?&filter=${query.filter + ''}&sortField=${query.sortField}&status=${key}`)

  };
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const handleCancel1 = () => {

    setIsModalOpen1(false);

  }
  const onFinishFailed1 = (errorInfo: any) => {

  };
  const onFinish1 = (values: any) => {
    setIsModalOpen1(false)
    geocodeByAddress(values.address)
      .then((results: any) => getLatLng(results[0]))
      .then((latLng: any) => {
        const pro = api.location.create({
          name: values.name,
          description: values.address,
          long: latLng.lng,
          lat: latLng.lat
        })
        Promise.all([pro]).then(values => {
          if (values[0]) {
            setLocations([...locations, values[0]])

            toast.success("Add new dangerous location successfully", {
              position: toast.POSITION.TOP_CENTER,
              theme: "colored"
            })

          }
        });
      })
      .catch(error => {
        if (error.response.status === 400) {
          setIsModalOpen1(false)
          toast.error("Add new dangerous location fail.Please check your input address", {
            position: toast.POSITION.TOP_CENTER,
            theme: "colored"
          })
        }
      });

  };
  const [address, setAddress] = useState("");
  const handleChange = (address: any) => {
    setAddress(address)
  };
  const handleSelect = (address: any) => {
    form1.setFieldsValue({ address: address })
  };
  const showModal1 = () => {
    setIsModalOpen1(true)
    form1.resetFields()
  }

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

        <Tooltip  >
          <Button style={{ margin: '10px' }} title='Come back Home Page' onClick={() => { navigate('/homepage') }} type="primary" shape="circle" size="large" icon={<HomeOutlined />}></Button>
          <Dropdown menu={{ items: sortValues, onClick: onSortClick }}>
            <a onClick={(e) => e.preventDefault()}>
              <Button style={{ margin: '10px' }} type="primary" size="large" icon={<DownOutlined />}>Sort By</Button>
            </a>
          </Dropdown>
          <Dropdown menu={{ items: statusValues, onClick: onStatusClick }}>
            <a onClick={(e) => e.preventDefault()}>
              <Button style={{ margin: '10px' }} type="primary" size="large" icon={<DownOutlined />}>Status</Button>
            </a>
          </Dropdown>
          <Button style={{ margin: '10px' }} title='Add a new location' onClick={showModal1} type="primary" size="large" shape="circle" icon={<PlusOutlined />}></Button>
          <Button style={{ margin: '10px' }} title='Search name of location' onClick={() => { setIsOpen(true) }} type="primary" shape="circle" size="large" icon={<SearchOutlined />}></Button>
          <Button style={{ margin: '10px' }} title='Refresh condition' onClick={() => { navigate(`/locations?&filter=&sortField=&status=`) }} shape="circle" type="primary" size="large" icon={<UndoOutlined />}></Button>
        </Tooltip>

        <Modal title="Add Location" open={isModalOpen} onCancel={handleCancel} footer={[


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
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input the name of location!' }]}
            >
              <Input placeholder='Trường Đại học Khoa học Tự nhiên ' />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Please input the address of location!' }]}
            >
              <Input placeholder='227 Đ. Nguyễn Văn Cừ, Phường 4, Quận 5, Thành phố Hồ Chí Minh' />
            </Form.Item>





            <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>

        </Modal>


        <Modal title="Add Location" open={isModalOpen1} onCancel={handleCancel1} footer={[


        ]}>
          <Form
            form={form1}

            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish1}
            onFinishFailed={onFinishFailed1}

            autoComplete="off"
          >

            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input the name of location!' }]}
            >
              <Input placeholder='Trường Đại học Khoa học Tự nhiên ' />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Please input the address of location!' }]}
            >
              <PlacesAutocomplete
                value={address}
                onChange={handleChange}
                onSelect={handleSelect}
              >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }: any) => (
                  <div>
                    <Input width='100%'
                      {...getInputProps({
                        placeholder: 'Search Places ...',
                        className: 'location-search-input',
                      })}
                    />
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion: any) => {
                        const className = suggestion.active
                          ? 'suggestion-item--active'
                          : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: '#689ee4', cursor: 'pointer' }
                          : { backgroundColor: '#ffffff', cursor: 'pointer' };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>

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
            <Item i={item} status={item.status} ></Item>

          )}
        />
      </Flex>
      <SearchModal isOpen={isOpen} setIsOpen={setIsOpen} isLocation={true} />
    </Flex>
  )
}

export default ListItem
