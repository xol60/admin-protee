import { EditOutlined } from '@ant-design/icons'
import { Avatar, Button, Form, List, Modal, Select, } from 'antd'
import React from 'react'
import api from '../../api/setUpApi'
import { useGoogleMap } from '@ubilabs/google-maps-react-hooks';
import { toast } from 'react-toastify';


import { useNavigate } from 'react-router-dom';
import { Chip } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';

const Item = (i: any) => {



  const [form1] = Form.useForm();
  const lat = Number(i.i.lat)
  const lng = Number(i.i.long)
  const map = useGoogleMap()
  const marker = new google.maps.Marker({ map })
  marker.setPosition({ lng, lat })
  marker.setTitle(i.i.name)
  const [color, setColor] = React.useState("blue");
  const [confirmedStatus, setConfirmedStatus] = React.useState('')
  const [status, setStatus] = React.useState('')
  React.useEffect(() => {
    setConfirmedStatus(i.status);
    setStatus(i.status)
  }, [i.status])
  if (confirmedStatus === 'personal') {
    setConfirmedStatus('Personal')
    setColor("black")
  }
  if (confirmedStatus === 'published') {
    setConfirmedStatus('Published')
    setColor("red")
  }
  if (confirmedStatus === 'waiting_publish') {
    setConfirmedStatus('WaitingPublish')
    setColor("purple")
  }
  if (confirmedStatus === 'hidden') {
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
  const [isModalOpen, setIsModalOpen] = React.useState(false);


  const showModal = () => {
    setIsModalOpen(true);

  };
  const handleOk = () => {
    setIsModalOpen(false);
    const res = api.location.changedetail({
      "id": i.i.id,
      "status": status
    })
    Promise.all([res]).then(values => {
      if (values[0]) {
        toast.success("Update successfully", {
          position: toast.POSITION.TOP_CENTER,
          theme: "colored"
        })
        if (status === 'Personal') {
          setColor("black")
        }
        if (status === 'Published') {
          setColor("red")
        }
        if (status === 'WaitingPublish') {
          setColor("purple")
        }
        if (status === 'Hidden') {
          setColor("blue")
        }
        setConfirmedStatus(status)
      }
    }).catch(error => {
      if (error.response.status === 400) {
        toast.error("Update fail", {
          position: toast.POSITION.TOP_CENTER,
          theme: "colored"
        })
      }
    })
  }
  const handleCancel = () => {
    setIsModalOpen(false);
    form1.resetFields()
  }
  const Centerclick = () => {
    map?.panTo({ lat, lng })
    map?.setZoom(20);
  }
  marker.addListener("click", () => {
    map?.panTo({ lat, lng })
    map?.setZoom(20);
  });

  const navigate = useNavigate()
  const Userclick = () => {
    if (i.i.user) {
      navigate(`/user/${i.i.user.id}`)
    }
  }

  return (
    <List.Item style={{ width: '100%' }}

    >

      <List.Item.Meta
        style={{ width: '100%', marginRight: '40px' }}

        avatar={<Avatar src={i.i.icon} />}
        title={<a onClick={Centerclick}>{i.i.name}</a>}
        description={i.i.description}
      />





      <List.Item.Meta

        avatar={<Avatar onClick={Userclick} src={i.i.user?.avt || process.env.REACT_APP_ADMIN_IMAGE} />}
        title="Creator"
        description={<a style={{ color: 'rgba(24,128,56,1.00)' }} onClick={Userclick}>{i.i.user?.name || "Admin"}</a>}

      />
      <Chip style={{ width: '19%', marginRight: '10px' }} label={confirmedStatus} onClick={showModal} icon={<EditIcon></EditIcon>}></Chip>

      <Modal title="Update Location" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{
            status: confirmedStatus,
            remember: true
          }}
          form={form1}
          autoComplete="off"
        >
          <Form.Item label="Status"
            name="status">
            <Select id='123' onChange={(value) => {
              setStatus(value)
            }}
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