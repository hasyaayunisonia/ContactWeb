import React, { useState, useEffect, useRef } from "react";
import { Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import TableData from "../components/TableData";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { getContactsList } from "../actions/ContactAction";

const mapStateToProps = (state) => {
  return {
    getContactsList: state.contacts.getContactsList,
  };
};

const Dashboard = (props) => {
  const navigate = useNavigate();

  const handleAddContactClick = () => {
    // Mengarahkan ke "/dashboard/add-contact" saat tombol Add Contact diklik
    navigate("/dashboard/add-contact");
  };

  useEffect(() => {
    props.dispatch(getContactsList());
  }, []);
  return (
    <Card>
      <Typography variant="h6" mb={3} gutterBottom>
        List Contacts
      </Typography>
      <div style={{ marginBottom: "16px" }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="default"
          onClick={handleAddContactClick}
        >
          Add Contact
        </Button>
      </div>
      {props.getContactsList ? (
        <TableData data={props.getContactsList}></TableData>
      ) : (
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
      )}
    </Card>
  );
};
export default connect(mapStateToProps, null)(Dashboard);
