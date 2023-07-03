import { Flex } from '@chakra-ui/react'

import HomeIcon from '@mui/icons-material/Home';
import Item from './Item';
import { useSearchParams } from "react-router-dom"
import { Button, Form, Input, List, Modal, Dropdown, InputNumber } from 'antd'
import type { MenuProps } from 'antd';

import React, { useState, } from 'react'
import { useGoogleMap } from '@ubilabs/google-maps-react-hooks';

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
import AddLocationIcon from '@mui/icons-material/AddLocation';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import SettingsIcon from '@mui/icons-material/Settings';
import RefreshIcon from '@mui/icons-material/Refresh';
import FilterListIcon from '@mui/icons-material/FilterList';
import CategoryIcon from '@mui/icons-material/Category';
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';


import { AppBar, IconButton, Toolbar, Typography, Box, Badge, Menu, MenuItem, Avatar, Divider, ListItemIcon } from '@mui/material';
const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: grey[500],
    },

  },
});

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
  const [isModalOpen2, setIsModalOpen2] = React.useState<boolean>(false);
  const [radius, setRadius] = React.useState<Number>()


  const [form2] = Form.useForm();
  const showModal2 = () => {
    try {
      const res = api.settings.getRadius()
      Promise.all([res]).then(values => {
        setRadius(values[0].data)
        setIsModalOpen2(true)
      })
        .catch(error => {

        })
    }
    catch (err) {
      console.log(err);
    }

  }
  const handleCancel2 = () => {

    setIsModalOpen2(false);
    form2.resetFields();

  }
  const onFinishFailed2 = (errorInfo: any) => {

  };
  const onFinish2 = (values: any) => {
    setIsModalOpen2(false)
    if (values.radius === radius) {


    }
    else {
      const res = api.settings.setRadius({
        "data": values.radius,

      })
      Promise.all([res]).then(value => {
        if (value[0]) {
          setRadius(values.radius)
          toast.success("Change radius of locations successfully", {
            position: toast.POSITION.TOP_CENTER,
            theme: "colored"
          })

        }
      })

        .catch(error => {
          if (error.response.status === 400) {

            toast.error("Change radius of locations fail", {
              position: toast.POSITION.TOP_CENTER,
              theme: "colored"
            })
          }
        })
    }

  };


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (

    <Flex
      direction={"column"}
      bg={"whiteAlpha.900"}
      width={"40vw"}
      height="100vh"
      position={"absolute"}
      left={0}
      top={0}
      zIndex={1}
      overflow="hidden"
      px={0}
    >


      <Flex bg={'white'} overflowY={"scroll"} mt={60} direction={"column"}>

        <Box sx={{ flexGrow: 1 }}>
          <ThemeProvider theme={theme}>
            <AppBar color='primary' position="static">
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  title='Back to homepage'
                  sx={{ mr: 2 }}
                >
                  <HomeIcon onClick={() => { navigate('/homepage') }} />
                </IconButton>
                <IconButton sx={{ mr: 2 }} edge="start" title='Refresh condition' size="large" color="inherit">

                  <RefreshIcon onClick={() => { navigate(`/locations?&filter=&sortField=&status=`) }} />

                </IconButton>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                  <Dropdown menu={{ items: sortValues, onClick: onSortClick }}>

                    <IconButton onClick={(e) => e.preventDefault()}
                      size="large"
                      edge="start"
                      color="inherit"
                      title='Sort by'
                      sx={{ mr: 2 }}
                    >
                      <FilterListIcon />
                    </IconButton>

                  </Dropdown>
                  <Dropdown menu={{ items: statusValues, onClick: onStatusClick }}>

                    <IconButton onClick={(e) => e.preventDefault()}
                      size="large"
                      edge="start"
                      color="inherit"
                      title='Status of location'
                      sx={{ mr: 2 }}
                    >
                      <CategoryIcon />
                    </IconButton>

                  </Dropdown>
                  <IconButton onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    color='inherit'
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}>
                    <Badge color="error">
                      <MenuIcon />
                    </Badge>
                  </IconButton>







                </Box>



              </Toolbar>
            </AppBar>
          </ThemeProvider>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={showModal2}>
            <IconButton title='Set radius of location' size="large" color="inherit">
              <Badge color="error">
                <SettingsIcon />
              </Badge>
            </IconButton>Set radius
          </MenuItem>
          <MenuItem onClick={() => { setIsOpen(true) }}>
            <IconButton title='Search a location' size="large" color="inherit">
              <Badge color="error">
                <LocationSearchingIcon />
              </Badge>
            </IconButton>Search
          </MenuItem>
          <MenuItem onClick={showModal1}>
            <IconButton
              size="large"
              title="Add a location"
              color="inherit"
            >
              <Badge color="error">
                <AddLocationIcon />
              </Badge>
            </IconButton>Create
          </MenuItem>


        </Menu>








        <Modal title="Add Location" open={isModalOpen} onCancel={handleCancel} footer={[


        ]}>
          <Form
            form={form}


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

        <Modal title="Set radius of location" open={isModalOpen2} onCancel={handleCancel2} footer={[


        ]}>
          <Form
            form={form2}


            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{
              radius: radius
            }}
            onFinish={onFinish2}
            onFinishFailed={onFinishFailed2}

            autoComplete="off"
          >

            <Form.Item
              label="Radius"
              name="radius"
              rules={[{ required: true, message: 'The radius of locations must not be empty!' }]}
            >
              <InputNumber min={500} ></InputNumber>
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
