// app/api/email-templates/[templateId]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/Firebase/admin";
import { EmailDesign } from "@/lib/types/email-editor.types";
import { headers } from "next/headers";

export const dynamic = 'force-dynamic';

// GET a single template by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { templateId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { templateId } = params;
    if (!templateId) {
      return NextResponse.json({ error: "Template ID is required" }, { status: 400 });
    }

    const templateDoc = await db.collection("emailTemplates").doc(templateId).get();

    if (!templateDoc.exists) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 });
    }

    const templateData = templateDoc.data();

    if (templateData?.userId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({ id: templateDoc.id, ...templateData });
    
  } catch (error) {
    console.error("[GET_TEMPLATE_ID]", error);
    return NextResponse.json({ error: "Failed to fetch template" }, { status: 500 });
  }
}

// POST/PUT to save/update a template
export async function POST(
  req: NextRequest,
  { params }: { params: { templateId: string } }
) {
  try {
    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { templateId } = params;
    let design: EmailDesign;
    try {
      design = await req.json();
    } catch (e) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    if (!design) {
      return NextResponse.json({ error: "Design data is required" }, { status: 400 });
    }
    
    const templateRef = db.collection("emailTemplates").doc(templateId === "new" ? db.collection("emailTemplates").doc().id : templateId);
    
    if (templateId !== "new") {
        const existingDoc = await templateRef.get();
        if (existingDoc.exists && existingDoc.data()?.userId !== userId) {
            return NextResponse.json({ error: "Forbidden: You do not own this template." }, { status: 403 });
        }
    }

    // --- FIX IS HERE ---
    // Destructure the 'id' field out of the design object,
    // and spread only the 'rest' of the properties into our data object.
    const { id, ...designDataToSave } = design;
    // --- END OF FIX ---

    const dataToSave = {
        userId: userId,
        userName: user.firstName || user.emailAddresses[0].emailAddress,
        updatedAt: new Date().toISOString(),
        ...(templateId === "new" && { createdAt: new Date().toISOString() }),
        ...designDataToSave, // Spread the design data without its 'id' field
    };
    
    // Now, the 'dataToSave' object will never contain an 'id' field with an undefined value.
    await templateRef.set(dataToSave, { merge: true });

    return NextResponse.json({ success: true, id: templateRef.id });

  } catch (error) {
    console.error("[POST_TEMPLATE_ID]", error);
    return NextResponse.json({ error: "Failed to save template" }, { status: 500 });
  }
}
