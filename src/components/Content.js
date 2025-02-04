import React, { useState, useRef } from "react";
import { Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  Flex,
  Radio,
  Col,
  Row,
  Input,
  Space,
  Table,
  Popconfirm,
  notification,
} from "antd";
import Typography from "@mui/material/Typography";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

const Content = () => {
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      firstName: `Bilbo ${i}`,
      lastName: "Baggins",
      age: i + 1,
      photo:
        "http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550",
      // name: `Edward King ${i}`,
      // age: 32,
      // address: `London, Park Lane no. ${i}`,
    });
  }

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "No",
      align: "center",
      width: 100,
      render: (text, record, index) => index + 1,
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      width: 270,
      align: "center", // Pusatkan judul kolom
      // render: (text) => <div style={{ textAlign: 'left' }}>{text}</div>, // Geser teks isi kolom ke kiri di dalam sel
      ...getColumnSearchProps("firstName"),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      width: 270,
      align: "center", // Pusatkan judul kolom
      // render: (text) => <div style={{ textAlign: 'left' }}>{text}</div>, // Geser teks isi kolom ke kiri di dalam sel
      ...getColumnSearchProps("lastName"),
    },

    {
      title: "Age",
      dataIndex: "age",
      width: 100,
      align: "center",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Action",
      align: "center",
      render: (text, record) => (
        <Row>
          <Col span={8}>
            <Button type="primary" ghost onClick={() => handleDetail(record)}>
              Detail
            </Button>
          </Col>
          <Col span={8}>
            <Button
              type="primary"
              ghost
              style={{ borderColor: "green", color: "green" }}
              onClick={() => handleUpdate(record)}
            >
              Update
            </Button>
          </Col>
          <Col span={8}>
            <Popconfirm
              placement="topRight"
              title="Delete contact"
              description={`Are you sure you want to delete ${record.firstName} ${record.lastName}?`}
              okText="Yes"
              cancelText="No"
              okButtonProps={{
                style: { backgroundColor: "red", borderColor: "red" },
              }}
              icon={
                <ExclamationCircleOutlined
                  style={{
                    color: "red",
                  }}
                />
              }
              // onOk={() => handleDeleteConfirmed(recordToDelete)}
              //   onCancel={() => setShowDeleteModal(false)}
              onConfirm={() => handleDeleteConfirmed(record)} // Handle delete on Yes
            >
              <Button
                onClick={() => handleDelete(record)}
                ype="primary"
                danger
                ghost
              >
                Delete{" "}
              </Button>
            </Popconfirm>
            {/* <Button
              ype="primary"
              danger
              ghost
              onClick={() => handleDelete(record)}
            >
              Delete
            </Button> */}
          </Col>
        </Row>
      ),
    },
  ];

  const [tableConfig, setTableConfig] = useState({
    pageSize: 50,
    showSizeChanger: true,
    pageSizeOptions: ["50", "100", "200"],
    total: data.length,
  });

  const handleTableChange = (pagination, filters, sorter) => {
    // Handle changes in pagination, filters, and sorter here
    console.log(pagination);
    setTableConfig({
      ...tableConfig,
      ...pagination,
    });
  };

  const navigate = useNavigate();

  const handleAddContactClick = () => {
    // Mengarahkan ke "/dashboard/add-contact" saat tombol Add Contact diklik
    navigate("/dashboard/add-contact");
  };

  const handleDetail = (record) => {
    // Logic for handling detail button click
    console.log("Detail", record);
    navigate("/dashboard/detail-contact");
  };

  const handleUpdate = (record) => {
    // Logic for handling update button click
    console.log("Update", record);
    navigate("/dashboard/update-contact");
  };

  const handleDelete = (record) => {
    // Logic for handling delete button click
    console.log("Delete", record);
    // You can set the record to be deleted in the state
    setRecordToDelete(record);
    // Open the confirmation modal
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = (recordToDelete) => {
    // Perform the delete logic using the recordToDelete
    console.log("Deleting", recordToDelete);

    api.success({
      message: "Success deleted contact",
      // description:
      //   "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
    });

    api.error({
      message: "Failed delete contact",
      // description:
      //   "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
    });
    // Close the delete confirmation modal
    setShowDeleteModal(false);
  };
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
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          ...tableConfig,
        }}
        onChange={handleTableChange}
        scroll={{ y: 240 }}
        bordered
      />
      {contextHolder}
      {/* <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p> */}
      {/* {showDeleteModal && (
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          okText="Yes"
          cancelText="No"
          onOk={() => handleDeleteConfirmed(recordToDelete)}
          onCancel={() => setShowDeleteModal(false)}
        >
          <Button danger>Delete</Button>
        </Popconfirm>
        // <Modal
        //   title="Delete Confirmation"
        //   content={`Are you sure you want to delete ${recordToDelete.firstName} ${recordToDelete.lastName}?`}
        //   onOk={() => handleDeleteConfirmed(recordToDelete)}
        //   onCancel={() => setShowDeleteModal(false)}
        // />
      )} */}
    </Card>
  );
};
export default Content;
