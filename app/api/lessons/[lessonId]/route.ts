import { db } from "@/db/drizzle";
import { lessons } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

type Props = {
    params: Promise<{ lessonId: number }>
}

export const GET = async (
  req: Request,
  { params }: Props,
) => {
  
const {lessonId} = await params;

  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const data = await db.query.lessons.findFirst({
    where: { id: lessonId },
  });

  return NextResponse.json(data);
};

export const PUT =async (
  req: Request,
  { params }: Props,
) => {
  const isAdmin = await getIsAdmin();
const {lessonId} = await params;
  
  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const body = await req.json();

  const data = await db
    .update(lessons)
    .set({
      ...body,
    })
    .where(eq(lessons.id, lessonId))
    .returning();

  return NextResponse.json(data);
};

export const DELETE = async (
  req: Request,
  { params }: Props,
) => {
  const isAdmin = await getIsAdmin();
const {lessonId} = await params;

  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const data = await db
    .delete(lessons)
    .where(eq(lessons.id, lessonId))
    .returning();

  return NextResponse.json(data);
};
