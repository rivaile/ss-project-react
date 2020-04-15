import React, {useState} from 'react';
import {Col, Form, Input, Modal, Row, Select, TreeSelect} from 'antd';

const {Option} = Select;


const AuthModal = ({onCreate, record, moduleTree, children}) => {

  const [form] = Form.useForm();

  const [visible, setVisible] = useState(false);

  const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
  };

  const tailLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
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
        width={700}
        visible={visible}
        title="权限编辑"
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
        }}>
      <Form {...layout} size="middle" form={form}
            initialValues={{
              authModuleId: record.authModuleId,
              name: record.name,
              url: record.url,
              type: record.type,
              status: record.status,
              seq: record.seq,
              remark: record.remark,
            }}>

        <Row>
          <Col span={12}>
            <Form.Item name="authModuleId"
                       label="所属权限模块"
                       rules={[
                         {
                           required: true,
                           message: '请选择所属权限模块!',
                         },
                       ]}>

              <TreeSelect allowClear={true}
                          placeholder='请选择所属权限模块'
                          treeData={moduleTree}/>
          </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="name"
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
            name="type"
            label="类型"
            rules={[
              {
                required: true,
                message: '请选择类型!',
              },
            ]}>
            <Select
              placeholder="请选择类型"
              allowClear>
              <Option value="1">菜单</Option>
              <Option value="2">按钮</Option>
              <Option value="3">其他</Option>
            </Select>
        </Form.Item>
        </Col>
          <Col span={12}>
           <Form.Item
             name="url"
             label="URL"
             rules={[
               {
                 required: true,
                 message: '请输入url!',
               },
             ]}>
            <Input/>
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
</span>
  );
};

export default AuthModal;
