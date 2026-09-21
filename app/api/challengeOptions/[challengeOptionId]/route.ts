import { db } from "@/db/drizzle";
import { challengeOptions } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

type Props = {
    params: Promise<{ challengeOptionId: string }>
}

export const GET = async (
  req: Request,
  { params }: Props,
):Promise<void | Response> => {
  
const {challengeOptionId} = await params;

  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const data = await db.query.challengeOptions.findFirst({
    where: { id: parseInt(challengeOptionId) },
  });

  return NextResponse.json(data);
};

export const PUT =async (
  req: Request,
  { params }: Props,
) => {
  const isAdmin = await getIsAdmin();
const {challengeOptionId} = await params;
  
  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const body = await req.json();

  const data = await db
    .update(challengeOptions)
    .set({
      ...body,
    })
    .where(eq(challengeOptions.id,  parseInt(challengeOptionId)))
    .returning();

  return NextResponse.json(data);
};

export const DELETE = async (
  req: Request,
  { params }: Props,
) => {
  const isAdmin = await getIsAdmin();
const {challengeOptionId} = await params;

  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const data = await db
    .delete(challengeOptions)
    .where(eq(challengeOptions.id,  parseInt(challengeOptionId)))
    .returning();

  return NextResponse.json(data);
};
