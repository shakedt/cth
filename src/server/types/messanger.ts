export type MessageProps = {
  phone: string;
  message: string;
  sid: String;
};

export enum SelectedTab {
  SendMessage = "send-message",
  MessageHistory = "message-history",
  SendMessageFrontEnd = "send-message-frontend",
}

export type MessangerProps = {
  preSelectedTab: SelectedTab;
};
