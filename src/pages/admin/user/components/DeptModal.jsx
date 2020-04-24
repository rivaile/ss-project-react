import React, {useState} from 'react';
import {Col, Form, Input, Modal, Row, Select, TreeSelect} from 'antd';

const {Option} = Select;


const DeptModal = ({onCreate, onCancel, record, deptTree, visible}) => {

  const [form] = Form.useForm();

  const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
  };

  const tailLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
  };


  return (
    <Modal
      visible={visible}
      title="创建部门"
      okText="确认"
      cancelText="取消"
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
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
        {...layout}
        size="middle"
        form={form}
        initialValues={{
          id: record.id,
          name: record.name,
          parentId: record.parentId,
          seq: record.seq,
          remark: record.remark,
        }}>

        <Form.Item
          style={{display: "none"}}
          name="id"
          label="id"
        >
          <Input/>
        </Form.Item>
        <Row>
          <Col span={12}>
            <Form.Item
              name="parentId"
              label="上级部门"
              rules={[
                {
                  required: true,
                  message: '请选择上级部门!',
                },
              ]}>
              <TreeSelect
                treeData={deptTree}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="name"
              label="名称"
              rules={[
                {
                  required: true,
                  message: '请输入名称!',
                },
              ]}>
              <Input/>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              name="seq"
              label="顺序"
              rules={[
                {
                  required: true,
                  message: '请输入顺序!',
                },
              ]}>
              <Input/>
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
  );
};

export default DeptModal;
