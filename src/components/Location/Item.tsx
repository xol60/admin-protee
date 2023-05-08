import { EditOutlined } from '@ant-design/icons'
import { Avatar, Button, Checkbox, Form, Input, List, Modal, Select, Skeleton } from 'antd'
import React, { useState } from 'react'
import api from '../../api/axiosClient'

const Item = (i: any) => {
  const [status, setStatus] = useState()
  const [confirmedStatus, setConfirmedStatus] = useState(i.i.status)
  if(confirmedStatus=='personal'){
    setConfirmedStatus('Personal')
  }
  if(confirmedStatus=='published'){
    setConfirmedStatus('Published')
  }
  if(confirmedStatus=='waiting_publish'){
    setConfirmedStatus('WaitingPublish')
  }
  if(confirmedStatus=='hidden'){
    setConfirmedStatus('Hidden')
  }
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleSubmit = async (values: any) => {

    console.log(
      values)
  }
  const showModal = () => {
    setIsModalOpen(true);

  };

  const handleOk = () => {
    setIsModalOpen(false);

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
  return (
    <List.Item
      actions={[<Button onClick={showModal}><EditOutlined /></Button>]}
    >

      <Skeleton avatar title={false} loading={i.i.loading} active>
        <List.Item.Meta

          title={i.i.name}
          description={i.i.description}

        />
        <List.Item.Meta
          title={confirmedStatus}></List.Item.Meta>





      </Skeleton>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
