import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Card, Typography, Row, Col } from "antd";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getContactDetail } from "../actions/ContactAction";

const DetailContact = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, isLoading] = useState(true);

  const [contactData, setContactData] = useState({
    // firstName: "John", // Replace with your actual data
    // lastName: "Doe",
    // age: 30,
    // photo:
    //   "https://media.allure.com/photos/611d13fc20f215dc04d04313/16:9/w_1280,c_limit/dylan%20obrien.jpg",
  });

  const handleBackClick = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    // Assuming getContactDetail is an asynchronous action that fetches contact details
    const fetchData = async () => {
      try {
        await props.dispatch(getContactDetail(id));
        setTimeout(() => {
          isLoading(false); // Set loading to false after 3 seconds
        }, 800);
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
  }, [props.getContactDetail, contactData]);

  return (
    <Card title="Detail Contact">
      {loading ? (
        <>
          <Spin
            data-testid="loading-spinner"
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
          <Box>
            <Grid container>
              <Grid xs={2}>
                <Typography.Text strong>First Name</Typography.Text>
              </Grid>
              <Grid xs={0.2}>
                <Typography.Text strong>:</Typography.Text>
              </Grid>
              <Grid xs={8}>
                <Typography.Text>{contactData.firstName}</Typography.Text>
              </Grid>
              <Grid xs={2}>
                <Typography.Text strong>Last Name</Typography.Text>
              </Grid>
              <Grid xs={0.2}>
                <Typography.Text strong>:</Typography.Text>
              </Grid>
              <Grid xs={8}>
                <Typography.Text>{contactData.lastName}</Typography.Text>
              </Grid>
              <Grid xs={2}>
                <Typography.Text strong>Age</Typography.Text>
              </Grid>
              <Grid xs={0.2}>
                <Typography.Text strong>:</Typography.Text>
              </Grid>
              <Grid xs={8}>
                <Typography.Text>{contactData.age}</Typography.Text>
              </Grid>
              <Grid xs={2}>
                <Typography.Text strong>Url Photo</Typography.Text>
              </Grid>
              <Grid xs={0.2}>
                <Typography.Text strong>:</Typography.Text>
              </Grid>
              <Grid xs={8}>
                <Typography.Text>{contactData.photo}</Typography.Text>
              </Grid>
            </Grid>

            <div style={{ marginTop: 10, marginBottom: 20 }}>
              <img
                src={contactData.photo}
                alt="Can not load image"
                style={{ height: "150px" }}
                loading="lazy"
              />
            </div>

            <div>
              <Button onClick={handleBackClick}>Back</Button>
            </div>
          </Box>
        </>
      )}
    </Card>
  );
};

const mapStateToProps = (state) => ({
  // Assuming you have a reducer named 'contactDetail' to store the fetched contact details
  getContactDetail: state.contacts.getContactDetail,
});

export default connect(mapStateToProps)(DetailContact);
