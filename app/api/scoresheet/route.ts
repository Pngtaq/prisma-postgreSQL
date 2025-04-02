import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET all forms with their fields
export async function GET() {
  try {
    const forms = await prisma.forms.findMany({
      include: { fields: true },
    });
    return NextResponse.json(forms);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch forms" },
      { status: 500 }
    );
  }
}

// POST - Create a new form with fields
// POST - Add fields to an existing form
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Ensure formId exists
    if (!data.formId) {
      return NextResponse.json(
        { error: "formId is required" },
        { status: 400 }
      );
    }

    const updatedForm = await prisma.forms.update({
      where: { formId: data.formId },
      data: {
        fields: {
          create: data.fields, // Add new fields to the form
        },
      },
      include: { fields: true },
    });

    return NextResponse.json(updatedForm, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to add fields to the form" },
      { status: 500 }
    );
  }
}

// PATCH - Add new fields to an existing form
export async function PATCH(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data.formId || !data.fields) {
      return NextResponse.json(
        { error: "formId and fields are required" },
        { status: 400 }
      );
    }

    const updatedForm = await prisma.forms.update({
      where: { formId: data.formId },
      data: {
        fields: {
          create: data.fields, // Append new fields
        },
      },
      include: { fields: true },
    });

    return NextResponse.json(updatedForm);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update form" },
      { status: 500 }
    );
  }
}
