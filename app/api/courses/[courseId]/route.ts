import { db } from "@/db/drizzle";
import { courses } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

type Props = {
    params: Promise<{ courseId: number }>
}

export const GET = async (
  req: Request,
  { params }: Props,
) => {
  
const {courseId} = await params;

  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const data = await db.query.courses.findFirst({
    where: { id: courseId },
  });

  return NextResponse.json(data);
};

export const PUT =async (
  req: Request,
  { params }: Props,
) => {
  const isAdmin = await getIsAdmin();
const {courseId} = await params;
  
  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const body = await req.json();

  const data = await db
    .update(courses)
    .set({
      ...body,
    })
    .where(eq(courses.id, courseId))
    .returning();

  return NextResponse.json(data);
};

export const DELETE = async (
  req: Request,
  { params }: Props,
) => {
  const isAdmin = await getIsAdmin();
const {courseId} = await params;

  if (!isAdmin) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const data = await db
    .delete(courses)
    .where(eq(courses.id, courseId))
    .returning();

  return NextResponse.json(data);
};
