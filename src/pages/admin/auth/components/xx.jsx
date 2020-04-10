import React, {useState} from 'react';
import {Button, Modal, Form, Input, Radio, Cascader, TreeSelect, Select, Row, Col} from 'antd';

const {Option} = Select;


const UserModal = ({onCreate, record, children}) => {
  const [form] = Form.useForm();

  const [visible, setVisible] = useState(false);

  const layout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
  };

  const tailLayout = {
    labelCol: {span: 3},
    wrapperCol: {span: 21},
  };


  const showModelHandler = e => {
    if (e) e.stopPropagation();
    setVisible(true);
  };

  const hideModelHandler = () => {
    setVisible(false);
  };

  return (
    <span>
       <span onClick={showModelHandler}>{children}</span>
      <Modal
        visible={visible}
        title="创建用户"
        okText="确认"
        cancelText="取消"
        onCancel={hideModelHandler}
        onOk={() => {
          form.validateFields()
            .then(values => {
              form.resetFields();
              onCreate(values);
              hideModelHandler();
            })
            .catch(info => {
              console.log('Validate Failed:', info);
            });
        }}
      >
      <Form
        {...layout}
        size="middle"
        form={form}
        initialValues={{
          username: record.username,
          telephone: record.telephone,
          mail: record.mail,
          deptId: record.deptId,
          status: record.status,
          remark: record.remark,
        }}>

        <Row>
          <Col span={12}>
            <Form.Item
              name="username"
              label="用户名"
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}>
              <Input/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="telephone"
              label="电话"
              rules={[
                {
                  required: true,
                  message: '请输入电话!',
                },
              ]}>
              <Input/>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
           <Form.Item
             name="mail"
             label="邮箱"
             rules={[
               {
                 required: true,
                 message: '请输入邮箱!',
               },
             ]}>
            <Input/>
          </Form.Item>
        </Col>
        <Col span={12}>
            <Form.Item
              name="deptId"
              label="部门"
              rules={[
                {
                  required: true,
                  message: '请选择部门!',
                },
              ]}>
              <TreeSelect
                treeData={[
                  {
                    title: '技术部',
                    value: '0',
                    children: [
                      {
                        title: 'android',
                        value: '1',
                      },
                      {
                        title: 'java',
                        value: '2',
                      },
                    ],
                  },
                ]}
              />
          </Form.Item>
          </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item
            name="status"
            label="状态"
            rules={[
              {
                required: true,
                message: '请选择状态!',
              },
            ]}>
            <Select
              placeholder="请选择状态"
              allowClear>
              <Option value="0">冻结</Option>
              <Option value="1">正常</Option>
              <Option value="2">删除</Option>
            </Select>
        </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
             <Form.Item name="remark" label="备注" {...tailLayout}>
              <Input.TextArea/>
             </Form.Item>
        </Col>
      </Row>
      </Form>
    </Modal>
    </span>
  );
};

export default UserModal;
