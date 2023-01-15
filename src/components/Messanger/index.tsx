import { useState } from "react";
import { Layout, Menu, MenuProps } from "antd";

import SendMessage from "./SendMessage";
import MessageHistory from "./MessageHistory";
import SendMessageFrontEndOnly from "./SendMessageFrontEndOnly";
import { MessangerProps, SelectedTab } from "@/src/server/types/messanger";
import { useRouter } from "next/router";

const Content = Layout.Content;

const Messanger: React.FC<MessangerProps> = ({
  preSelectedTab = SelectedTab.SendMessage,
}) => {
  const [selectedTab, setSelectedTab] = useState<SelectedTab>(preSelectedTab);
  const router = useRouter();

  const items1: MenuProps["items"] = [
    {
      key: SelectedTab.SendMessage,
      label: `SendMessage`,
      onClick: () => {
        router.push("/");
      },
    },
    {
      key: SelectedTab.MessageHistory,
      label: `Show History`,
      onClick: () => {
        router.push(SelectedTab.MessageHistory);
      },
    },
    {
      key: SelectedTab.SendMessageFrontEnd,
      label: `Send Message Front End`,
      onClick: () => {
        router.push(SelectedTab.SendMessageFrontEnd);
      },
    },
  ];

  return (
    <Layout>
      <div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[selectedTab]}
          items={items1}
        />
      </div>
      <Content>
        {selectedTab === SelectedTab.SendMessage && <SendMessage />}
        {selectedTab === SelectedTab.MessageHistory && <MessageHistory />}
        {selectedTab === SelectedTab.SendMessageFrontEnd && (
          <SendMessageFrontEndOnly />
        )}
      </Content>
    </Layout>
  );
};

export default Messanger;
