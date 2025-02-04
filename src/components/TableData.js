import React, { useRef, useState } from "react";
import { Button, Input, Space, Table, Popconfirm, notification } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { deleteContact } from "../actions/ContactAction";

const TableData = ({ data, dispatch, deleteContact }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

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
      align: "center",
      ...getColumnSearchProps("firstName"),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      width: 270,
      align: "center",
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
        <Space>
          <Button type="primary" ghost onClick={() => handleDetail(record)}>
            Detail
          </Button>
          <Button
            type="primary"
            ghost
            style={{ borderColor: "green", color: "green" }}
            onClick={() => handleUpdate(record)}
          >
            Update
          </Button>
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
            onConfirm={() => handleDeleteConfirmed(record)} // Handle delete on Yes
          >
            <Button ype="primary" danger ghost>
              Delete{" "}
            </Button>
          </Popconfirm>
        </Space>
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

  const handleDetail = (record) => {
    // Logic for handling detail button click
    console.log("Detail", record.id);
    navigate("/dashboard/detail-contact/" + record.id);
  };

  const handleUpdate = (record) => {
    // Logic for handling update button click
    console.log("Update", record);
    navigate("/dashboard/update-contact/" + record.id);
  };

  const handleDeleteConfirmed = (recordToDelete) => {
    // Perform the delete logic using the recordToDelete
    console.log("Deleting", recordToDelete);

    deleteContact(recordToDelete.id);

    api.success({
      message: "Success deleted contact",
      // description:
      //   "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
    });

    // api.error({
    //   message: "Failed delete contact",
    //   // description:
    //   //   "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
    // });

    // Close the delete confirmation modal
    // setShowDeleteModal(false);
  };

  return (
    <>
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
    </>
  );
};

export default connect(null, { deleteContact })(TableData);
