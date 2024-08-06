import { updateUser, getUserById, deleteUser } from "@/lib/api";

export const PUT = async (
  req: Request,
  { params: { key } }: { params: { key: number } }
) => {
  const body = await req.json();
  const result = updateUser({ ...body, id: key });

  return Response.json({ status: 500 });
};

export const GET = async (
  req: Request,
  { params: { key } }: { params: { key: number } }
) => {
  try {
    const user = getUserById(key);
    if (!user) {
      return new Response("User not found", { status: 404 });
    }
    return Response.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response("Internal server error", { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return new Response("User ID not provided", { status: 400 });
  }

  try {
    const result = deleteUser(parseInt(id));
    if (result.changes) {
      return new Response("User deleted successfully", { status: 200 });
    } else {
      return new Response("User not found", { status: 404 });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    return new Response("Internal server error", { status: 500 });
  }
};
