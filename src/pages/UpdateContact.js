import React, { useState, useEffect, useRef } from "react";
import { Form, Input, InputNumber, Button, Card, Space, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { getContactDetail, putUpdateContact } from "../actions/ContactAction";
import { reduxForm, Field, SubmissionError } from "redux-form";
const mapStateToProps = (state) => ({
  // Assuming you have a reducer named 'contactDetail' to store the fetched contact details
  getContactDetail: state.contacts.getContactDetail,
  // return {
  //   initialValues: {
  //     firstName: state.contacts.getContactDetail.firstName,
  //     lastName: state.contacts.getContactDetail.lastName,
  //     age: state.contacts.getContactDetail.age,
  //     photo: state.contacts.getContactDetail.photo,
  //   },
  // };
});

let UpdateContact = (props) => {
  const { id } = useParams();

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, isLoading] = useState(true);

  const [contactData, setContactData] = useState({
    // firstName: "John", // Replace with your actual data
    // lastName: "Doe",
    // age: 30,
    // photo: "https://example.com/photo.jpg",
  });

  // useEffect to set the form values when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        await props.dispatch(getContactDetail(id));
        setTimeout(() => {
          isLoading(false); // Set loading to false after 3 seconds
        }, 500);
      } catch (error) {
        console.error("Error fetching contact details:", error);
        isLoading(false); // Handle errors and set loading to false
      }
    };

    fetchData();
  }, [id, props.dispatch]);

  useEffect(() => {
    // Update form values when contact details are fetched
    setContactData(props.getContactDetail);
    console.log("ini props", props.getContactDetail);
    form.setFieldsValue(contactData);
  }, [props.getContactDetail, contactData]);

  const onFinish = async (values) => {
    // Perform update logic with the updated values
    // console.log("Updated values:", id, values);
    // message.success("Submit success!");
    try {
      // Panggil action creator untuk menyimpan data
      await props.putUpdateContact(id, values);
      console.log("ini values", values);
      message.success("Submit success!");
      // navigate("/dashboard");
    } catch (error) {
      // Tangani kesalahan dari server dan tampilkan pesan
      message.error("Submit failed!");
      console.error("Server error:", error);
      // Tangani kesalahan dari server dan tampilkan pesan
      throw new SubmissionError({ _error: "Submission failed" });
    }
    // navigate("/dashboard");
  };

  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  const handleBackClick = () => {
    // Mengarahkan ke "/dashboard/add-contact" saat tombol Add Contact diklik
    navigate("/dashboard");
  };

  return (
    <Card title="Update Contact">
      {loading ? (
        <>
          <Spin
            indicator={
              <LoadingOutlined
                style={{
                  fontSize: 24,
                }}
                spin
              />
            }
          />
        </>
      ) : (
        <>
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
            <Form.Item name="firstName" label="First Name" id="firstName">
              <Input />
            </Form.Item>
            <Form.Item name="lastName" label="Last Name">
              <Input id="lastName" />
            </Form.Item>
            <Form.Item
              name="age"
              label="Age"
              rules={[
                {
                  type: "number",
                },
              ]}
            >
              <InputNumber id="age" />
            </Form.Item>
            <Form.Item
              name="photo"
              label="Url Photo"
              rules={[
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
              <Input id="photo" />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button onClick={handleBackClick}>Back</Button>
                <Button type="primary" htmlType="submit">
                  Save Changes
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </>
      )}
    </Card>
  );
};

UpdateContact = reduxForm({
  form: "FormUpdateContact",
})(UpdateContact);

export default connect(mapStateToProps, { putUpdateContact })(UpdateContact);
