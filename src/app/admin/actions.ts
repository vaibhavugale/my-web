"use server";

import { prisma } from "../../lib/prisma";
import { cookies } from "next/headers";
import { verifyAccessToken } from "../../lib/auth";

export async function getBlogs() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        published: true,
        createdAt: true,
      }
    });
    return blogs;
  } catch (error) {
    console.error("Failed to fetch blogs", error);
    return [];
  }
}

export async function createBlog(data: { title: string; content: string; published: boolean }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    
    if (!token) {
      throw new Error("Unauthorized");
    }

    const payload = await verifyAccessToken(token);
    if (!payload || !payload.userId) {
      throw new Error("Unauthorized");
    }

    const blog = await prisma.blog.create({
      data: {
        title: data.title,
        content: data.content,
        published: data.published,
        authorId: payload.userId as string,
      }
    });

    return { success: true, blogId: blog.id };
  } catch (error) {
    console.error("Failed to create blog", error);
    return { success: false, error: "Failed to create blog" };
  }
}

export async function getBlog(id: string) {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
    });
    return blog;
  } catch (error) {
    console.error("Failed to fetch blog", error);
    return null;
  }
}

export async function updateBlog(id: string, data: { title: string; content: string; published: boolean }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    
    if (!token) {
      throw new Error("Unauthorized");
    }

    const payload = await verifyAccessToken(token);
    if (!payload || !payload.userId) {
      throw new Error("Unauthorized");
    }

    const blog = await prisma.blog.update({
      where: { id, authorId: payload.userId as string },
      data: {
        title: data.title,
        content: data.content,
        published: data.published,
      }
    });

    return { success: true, blogId: blog.id };
  } catch (error) {
    console.error("Failed to update blog", error);
    return { success: false, error: "Failed to update blog" };
  }
}
