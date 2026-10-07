"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getPublishedBlogs() {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        content: false, // Don't fetch full content for the list
        image: true,
        createdAt: true,
      },
    });
    return blogs;
  } catch (error) {
    console.error("Error fetching published blogs:", error);
    return [];
  }
}

export async function getBlogById(id: string) {
  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id,
      },
      include: {
        author: {
          select: {
            name: true,
          }
        }
      }
    });
    return blog;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}
