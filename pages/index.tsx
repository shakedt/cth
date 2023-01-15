import Messanger from "@/src/components/Messanger";
import { SelectedTab } from "@/src/server/types/messanger";

export default function Home() {
  return <Messanger preSelectedTab={SelectedTab.SendMessage} />;
}
