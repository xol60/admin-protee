import { EditOutlined } from '@ant-design/icons'
import { Avatar, Button, Checkbox, Form, Input, List, Modal, Select, Skeleton } from 'antd'
import React, { useState } from 'react'

const Item = (i: any) => {
  const [status, setStatus] = useState()
  const [confirmedStatus, setConfirmedStatus] = useState(i.i.status)
  const [isModalOpen, setIsModalOpen] = useState(false);
  [i.i.status] = useState(i.i.status);
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

    i.i.status = status

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
                { value: 'personal', label: 'personal' },
                { value: 'published', label: 'published' },
                { value: 'waiting_publish', label: 'waiting_publish' },
                { value: 'hidden', label: 'hidden', },]}>


            </Select>

          </Form.Item>
        </Form>






      </Modal>


    </List.Item>
  )
}

export default Item
