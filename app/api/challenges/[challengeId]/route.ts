import { db } from "@/db/drizzle";
import { challenges } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

type Props = {
    params: Promise<{ challengeId: number }>
}

export const GET = async (
  req: Request,
  { params }: Props,
) => {
  
const {challengeId} = await params;

  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const data = await db.query.challenges.findFirst({
    where: { id: challengeId },
  });

  return NextResponse.json(data);
};

export const PUT =async (
  req: Request,
  { params }: Props,
) => {
  const isAdmin = await getIsAdmin();
const {challengeId} = await params;
  
  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const body = await req.json();

  const data = await db
    .update(challenges)
    .set({
      ...body,
    })
    .where(eq(challenges.id, challengeId))
    .returning();

  return NextResponse.json(data);
};

export const DELETE = async (
  req: Request,
  { params }: Props,
) => {
  const isAdmin = await getIsAdmin();
const {challengeId} = await params;

  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const data = await db
    .delete(challenges)
    .where(eq(challenges.id, challengeId))
    .returning();

  return NextResponse.json(data);
};
