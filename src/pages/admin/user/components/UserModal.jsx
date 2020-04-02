import React, {useState} from 'react';
import {Button, Modal, Form, Input, Radio} from 'antd';

const UserModal = ({visible, onCreate, onCancel}) => {

  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="创建用户"
      okText="确认"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form.validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="horizontal"
        name="form_in_modal"
        initialValues={{
          username: '',
        }}>
        <Form.Item
          name="username"
          label="用户名"
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        >
          <Input/>
        </Form.Item>

        <Form.Item name="mail" label="邮箱">
          <Input/>
        </Form.Item>

        <Form.Item name="deptId" label="部门">
          <Input/>
        </Form.Item>
        
        <Form.Item name="status" label="状态">
          <Input/>
        </Form.Item>
      </Form>

    </Modal>
  );
};

export default UserModal;
