import React, { useEffect, useState } from "react";

import { Table, Typography, Layout } from "antd";

import dataManager from "@/src/utils/dataManger";
import { MessageProps } from "@/src/server/types/messager";

const { Title } = Typography;

const columns = [
  {
    title: "sid",
    dataIndex: "sid",
    key: "sid",
  },
  {
    title: "phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "message",
    dataIndex: "message",
    key: "message",
  },
];

const MessageHistory = ({}) => {
  const [messages, setMessages] = useState<Array<MessageProps>>([]);

  useEffect(() => {
    const fetchMessageHistory = async () => {
      const messages = dataManager.getAllData();

      setMessages(messages);
    };

    fetchMessageHistory();
  }, []);

  return (
    <Layout>
      <Title>Message History</Title>
      <Layout>
        <Layout.Content>
          <Table dataSource={messages} columns={columns} />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default MessageHistory;
