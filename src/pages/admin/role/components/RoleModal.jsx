import React, {useState} from 'react';
import {Col, Form, Input, Modal, Row, Select} from 'antd';

const {Option} = Select;


const RoleModal = ({onCreate, record, children, action}) => {
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
        title={action == "create" ? "创建角色" : "编辑角色"}
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
          name: record.name,
          status: record.status,
          remark: record.remark,
        }}>

        <Row>
          <Col span={12}>
            <Form.Item
              name="name"
              label="名称"
              rules={[
                {
                  required: true,
                  message: '请输入角色名称!',
                },
              ]}>
              <Input/>
            </Form.Item>
          </Col>
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

export default RoleModal;
