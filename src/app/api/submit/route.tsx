import sendRequest from "@/utils/sendRequest";

export async function POST(req : Request) {
    try {
        const body = await req.json();
        const response = await sendRequest(body.b64String)
        return Response.json({ response: response });

    } catch {
      return Response.json({ success: false, error: 'error' }, { status: 500 });
    }
  }
  