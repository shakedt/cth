import type { NextApiRequest, NextApiResponse } from "next";
import twillio from "twilio";

function isValidBody<T extends Record<string, unknown>>(
  body: any,
  fields: (keyof T)[]
): body is T {
  return Object.keys(body).every((key) => fields.includes(key));
}

const accountId = process.env.TWILLIO_ID;
const token = process.env.TWILLIO_TOKEN;
const twiliioClient = twillio(accountId, token);

// I will not add validations with Joi but usually validations here for length & type should be created.
type RequestBody = {
  phone: string;
  message: string;
};

type ResponseData =
  | {
      message: RequestBody & { sid: string | null };
    }
  | { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // In a work secnario this end point will only be availble for logged in users
  if (req.method === "POST") {
    if (!isValidBody<RequestBody>(req.body, ["phone", "message"])) {
      res.status(402).json({ message: "missing data" });
    }

    const messageBody: ResponseData = {
      message: {
        phone: req.body.phone,
        message: req.body.message,
        sid: null,
      },
    };

    try {
      const message = await twiliioClient.messages.create({
        body: messageBody.message.message,
        from: "+15088500264",
        to: `+${messageBody.message.phone}`,
      });

      /**
       * In a real world app we will now send the data to be saved in the database.
       * I think we have two main approaches here: (All this informationi is general as i don't have product demands and product usage details on the ticket).
       * Save to realtive database which will be slower on save but easier to query. - might not be relvant for this use case as we can only save messageIds or save all he data into our db.
       * Save to a none relative db which will be faster on insert, and slower on pulling but if we just save "userId" and Message Id in some kind of an array shouldn't not be a problem, however pulling N requests from the end point might be an issue, need to check if they have a method of bringing more then one message.
       *
       * P.s i see extra advantages of saving all the data, (data is cheap to store) and if we decide to move forward to a different sms provider migration will be easier.
       *
       * I will send back a the full request plus message id and store it locally on the browser for ease of implementation as this task is set in up to 4 hours time.
       * */

      res
        .status(200)
        .json({ message: { ...messageBody.message, sid: message.sid } });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "something went wrong" });
    }
  }

  // Send Bad Request on anything but post.
  res.status(400);
}
