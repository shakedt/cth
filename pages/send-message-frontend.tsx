import Messanger from "@/src/components/Messanger";
import { SelectedTab } from "@/src/server/types/messanger";
// import twillio from "twilio";

export default function MessangerFrontEnd() {
  return <Messanger preSelectedTab={SelectedTab.SendMessageFrontEnd} />;
}

// export async function getServerSideProps(context) {
//   const accountId = process.env.TWILLIO_ID;
//   const token = process.env.TWILLIO_TOKEN;
//   const twiliioClient = twillio(accountId, token);

//   return {
//     props: {
//       twiliioClient: JSON.stringify(twiliioClient),
//     }, // will be passed to the page component as props
//   };
// }
