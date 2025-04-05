import sendRequest from "@/utils/sendRequest";

export async function POST(req) {
    try {
        const body = await req.json();
        const response = await sendRequest(body.b64String)
        return Response.json({ response: response });

    } catch (err) {
      return Response.json({ success: false, error: err.message }, { status: 500 });
    }
  }
  