const DUMMY_JSON_BASE_URL = "https://dummyjson.com";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() ?? "";
  const limit = searchParams.get("limit") ?? "10";
  const skip = searchParams.get("skip") ?? "0";

  const path = query.length > 0 ? "/users/search" : "/users";
  const params = new URLSearchParams({ limit, skip });

  if (query.length > 0) {
    params.set("q", query);
  }

  const upstream = await fetch(
    `${DUMMY_JSON_BASE_URL}${path}?${params.toString()}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!upstream.ok) {
    return Response.json(
      { error: `Failed to fetch users (${upstream.status})` },
      { status: upstream.status }
    );
  }

  const data: unknown = await upstream.json();
  return Response.json(data);
}
