import React, { useState, useRef } from "react";
import { Card } from "antd";
import { Button, Form, Input, message, Space, InputNumber } from "antd";
import { useNavigate } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { postCreateContact } from "../actions/ContactAction";

const fields = ["firstName", "lastName", "age", "photo"];
let AddContact = (props) => {
  const { handleSubmit } = props;
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const handleBackClick = () => {
    // Mengarahkan ke "/dashboard/add-contact" saat tombol Add Contact diklik
    navigate("/dashboard");
  };

  const onFinish = (values) => {
    console.log("ini isi form", values);
    message.success("Submit success!");
    // navigate("/dashboard");
  };
  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  return (
    <Card title="Add Contact">
      <Form
        labelCol={{
          span: 2,
        }}
        wrapperCol={{
          span: 14,
        }}
        form={form}
        layout="horizontal"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: "First Name is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: "Last Name is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="age"
          label="Age"
          rules={[
            { required: true, message: "Age is required" },
            {
              type: "number",
              //   min: 0,
              //   max: 99,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="photo"
          label="Url Photo"
          rules={[
            { required: true, message: "Url Photo is required" },
            {
              type: "url",
              warningOnly: true,
            },
            {
              type: "string",
              min: 3,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button onClick={handleBackClick}>Back</Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

AddContact = reduxForm({
  // <----- THIS IS THE IMPORTANT PART!
  form: "FormAddContact", // a unique name for this form
  fields: ["firstName", "lastName", "age", "photo"], // all the fields in your form
})(AddContact);

export default connect()(AddContact);
