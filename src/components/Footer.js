import React from 'react';
import { Layout } from 'antd';

const Footer = () => {
  return (
    <Layout style={{ textAlign: 'center' }}>
      Made by Hasya Ayuni Sonia &copy; {new Date().getFullYear()}
    </Layout>
  );
};

export default Footer;
