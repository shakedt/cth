import React from "react";
import { Button, Layout, Row, Typography, message, Form, Input } from "antd";
import dataManager from "@/src/utils/dataManger";

const { Title } = Typography;
const { TextArea } = Input;

type FormData = {
  phone: string;
  message: string;
};

const SendMessage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const successMessage = () => {
    messageApi.open({
      type: "success",
      content: "Message Sent successfully.",
    });
  };

  const errorMessage = () => {
    messageApi.open({
      type: "error",
      content: "Something went wrong",
    });
  };

  const onFinish = async ({ phone, message }: FormData): Promise<void> => {
    try {
      const data = await fetch("api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, message }),
      });

      if (data.status !== 200) {
        errorMessage();
      } else {
        const parsedData = await data.json();

        dataManager.setNewData(parsedData);
        successMessage();
      }
    } catch (err) {
      errorMessage();
    }
  };

  return (
    <Layout>
      <Title>Send New Message </Title>
      {contextHolder}
      <Layout>
        <Layout.Content>
          <Form onFinish={onFinish}>
            <Row gutter={8}>
              <Form.Item
                label="Phone"
                name="phone"
                style={{
                  width: "100vh",
                  padding: "10px",
                  margin: "0 8px",
                }}
                rules={[
                  {
                    required: true,
                    message: "Phone number is required",
                  },
                ]}
              >
                <Input allowClear placeholder="please input a verfied phone" />
              </Form.Item>
            </Row>
            <Row gutter={8}>
              <Form.Item
                label="Message"
                name="message"
                rules={[{ required: true, message: "Message is required" }]}
                style={{
                  width: "100vh",
                  padding: "10px",
                  margin: "0 8px",
                }}
              >
                <TextArea
                  allowClear
                  rows={4}
                  placeholder="maxLength is 250"
                  maxLength={250}
                />
              </Form.Item>
            </Row>
            <Row>
              <Button
                htmlType="submit"
                type="primary"
                style={{ width: "100vw" }}
              >
                Send
              </Button>
            </Row>
          </Form>
        </Layout.Content>
        <Layout.Footer></Layout.Footer>
      </Layout>
    </Layout>
  );
};

export default SendMessage;
