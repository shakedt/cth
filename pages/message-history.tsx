import Messanger from "@/src/components/Messanger";
import { SelectedTab } from "@/src/server/types/messanger";

export default function MessangerFrontEnd() {
  return <Messanger preSelectedTab={SelectedTab.MessageHistory} />;
}
