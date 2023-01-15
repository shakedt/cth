import React from "react";
import { Button, Layout, Row, Typography, message, Form, Input } from "antd";

import dataManager from "@/src/utils/dataManger";

const { Title } = Typography;
const { TextArea } = Input;

const TWILIO_ACCOUNT_SID = "ACabe688c138b3e7c702527f33744772b9";

type FormData = {
  phone: string;
  message: string;
};
const SendMessageFrontEndOnly: React.FC = () => {
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
      const data = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic QUNhYmU2ODhjMTM4YjNlN2M3MDI1MjdmMzM3NDQ3NzJiOTplZTQ4NTkxZDFjNTg4NGIxMmU5NGJhODcxODM4MjRhOQ==",
          },
          body: `Body=${message}?&From=+15088500264&To=+${phone}`,
        }
      );

      if (data.status === 200 || data.status === 201) {
        const parsedData = await data.json();
        dataManager.setNewData({
          message: {
            message,
            sid: parsedData.sid,
            phone,
          },
        });
        successMessage();
      } else {
        errorMessage();
      }
    } catch (err) {
      errorMessage();
    }
  };

  return (
    <Layout>
      <Title>Send New Message Front End</Title>
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

export default SendMessageFrontEndOnly;
