"use server"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function deleteEvent(id: string) {
  await db.event.delete({where: {id}})
  revalidatePath("/organization/org_2foNFud76UWXx38suPFURxh5jUP")
}