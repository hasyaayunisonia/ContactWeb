import React, { useState, useRef } from "react";
import { Card } from "antd";
import { Button, Form, Input, message, Space, InputNumber } from "antd";
import { useNavigate } from "react-router-dom";
import { reduxForm, Field, SubmissionError } from "redux-form";
import { connect } from "react-redux";
import { postCreateContact } from "../actions/ContactAction";

const renderInput = ({ input, label, meta: { touched, error, warning } }) => (
  <Form.Item
    label={label}
    validateStatus={touched && error ? "error" : ""}
    help={
      touched && error
        ? error
        : warning && <span style={{ color: "orange" }}>{warning}</span>
    }
  >
    <Input {...input} id={input.name} />
  </Form.Item>
);

const renderInputNumber = ({
  input,
  label,
  meta: { touched, error, warning },
}) => (
  <Form.Item
    label={label}
    validateStatus={touched && error ? "error" : ""}
    help={
      touched && error
        ? error
        : warning && <span style={{ color: "orange" }}>{warning}</span>
    }
  >
    <InputNumber {...input} id={input.name} />
  </Form.Item>
);

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "First Name is required";
  }
  if (!values.lastName) {
    errors.lastName = "Last Name is required";
  }
  if (!values.age) {
    errors.age = "Age is required";
  }
  if (isNaN(Number(values.age))) {
    errors.age = "Age must be a number";
  }
  if (!values.photo) {
    errors.photo = "Url Photo is required";
  } else if (values.photo.length < 3) {
    errors.photo = "Minimum length is 3 characters";
  }
  // Tambahkan aturan validasi lainnya
  return errors;
};

const warn = (values) => {
  const warnings = {};
  if (values.photo && values.photo.length < 10) {
    warnings.photo = "The URL might be too short.";
  }
  // Tambahkan aturan peringatan lainnya jika diperlukan
  return warnings;
};

let AddContact = (props) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/dashboard");
  };

  const onSubmit = async (values) => {
    try {
      // Panggil action creator untuk menyimpan data
      await props.postCreateContact(values);
      console.log("ini values", values);
      message.success("Submit success!");
      // navigate("/dashboard");
    } catch (error) {
      // Tangani kesalahan dari server dan tampilkan pesan
      throw new SubmissionError({ _error: "Submission failed" });
    }
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
        onFinish={props.handleSubmit(onSubmit)}
        autoComplete="off"
        data-testid="FormAddContact"
      >
        <Field name="firstName" component={renderInput} label="First Name" />

        <Field name="lastName" component={renderInput} label="Last Name" />

        <Field name="age" component={renderInputNumber} label="Age" />

        <Field name="photo" component={renderInput} label="Url Photo" />

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
  form: "FormAddContact",
  validate,
  warn,
})(AddContact);

export default connect(null, { postCreateContact })(AddContact);
