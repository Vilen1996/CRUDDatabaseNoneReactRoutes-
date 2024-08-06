import { addUser, getAllUsers, deleteUser } from "@/lib/api";

export const POST = async (req: Request) => {
  const body = await req.json();
  const result = addUser(body);
  if (result.changes) {
    return Response.json({ status: "ok" });
  } else {
    return Response.json({ status: "error" });
  }
};

export const GET = () => {
  const result = getAllUsers();
  return Response.json(result);
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
