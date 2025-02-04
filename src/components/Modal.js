import React, { useState } from "react";
import { Modal as AntdModal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const Modal = ({ title, content, onOk, onCancel }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async () => {
    setConfirmLoading(true);
    // Perform any additional async logic here if needed
    // For now, just call the onOk function immediately

    setTimeout(() => {
      setConfirmLoading(false);
      onOk();
    }, 2000);
  };

  const handleCancel = () => {
    // Close the modal
    onCancel();
  };

  return (
    <AntdModal
      title={
        <span>
          <ExclamationCircleOutlined
            style={{ color: "red", marginRight: "8px" }}
          />
          {title}
        </span>
      }
      visible={true} // The 'visible' prop should be managed in the parent component
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okText="Yes" // Change the OK button text to "Yes"
      cancelText="Cancel" // Change the Cancel button text to "Cancel"
      okButtonProps={{ style: { backgroundColor: "red", borderColor: "red" } }} // Change the color of the OK button
    >
      <p>{content}</p>
    </AntdModal>
    // <AntdModal
    //   title={title}
    //   visible={true} // The 'visible' prop should be managed in the parent component
    //   onOk={handleOk}
    //   confirmLoading={confirmLoading}
    //   onCancel={handleCancel}
    //   icon={<ExclamationCircleOutlined />} // Add the icon
    // >
    //   <p>
    //     <ExclamationCircleOutlined
    //       style={{ color: "red", marginRight: "8px" }}
    //     />
    //     {content}
    //   </p>
    // </AntdModal>
  );
};

export default Modal;
