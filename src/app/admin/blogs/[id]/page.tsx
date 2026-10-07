"use client";

import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import LexicalEditor from "../../../../components/LexicalEditor";
import { useParams, useRouter } from "next/navigation";
import { getBlog, updateBlog } from "../../actions";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function EditBlogPage() {
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Title is required")
        .min(3, "Title must be at least 3 characters"),
      content: Yup.string()
        .required("Content is required")
        .test("not-empty", "Content cannot be empty", (value) => {
          if (!value) return false;
          try {
            const parsed = JSON.parse(value);
            const rootChildren = parsed?.root?.children;
            if (rootChildren && rootChildren.length === 1) {
              const firstChild = rootChildren[0];
              if (firstChild.type === "paragraph" && (!firstChild.children || firstChild.children.length === 0)) {
                return false;
              }
            }
            return true;
          } catch {
            return !!value;
          }
        }),
    }),
    onSubmit: () => {}, // We handle submission manually to pass the "published" flag easily
  });

  useEffect(() => {
    if (id) {
      getBlog(id).then((blog) => {
        if (blog) {
          formik.setValues({
            title: blog.title,
            content: blog.content,
          });
        }
        setInitialLoading(false);
      });
    }
  }, [id]);

  const handleSave = async (published: boolean) => {
    formik.setTouched({
      title: true,
      content: true,
    });

    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
      return;
    }

    setLoading(true);
    
    const result = await updateBlog(id, {
      title: formik.values.title,
      content: formik.values.content,
      published,
    });
    
    setLoading(false);

    if (result.success) {
      router.push("/admin");
    } else {
      alert(result.error || "Failed to save blog");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex text-gray-900 font-sans">
      <main className="flex-1 flex flex-col min-h-screen max-w-5xl mx-auto w-full">
        
        {/* Header */}
        <header className="px-8 py-6 flex items-center justify-between sticky top-0 z-10 bg-gray-50/80 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Edit Blog</h1>
              <p className="text-sm text-gray-500">Update your blog post</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => handleSave(false)}
              disabled={loading}
              className="px-4 py-2 text-sm font-medium rounded-lg text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-70"
            >
              Save Draft
            </button>
            <button 
              onClick={() => handleSave(true)}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-70"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Publish
            </button>
          </div>
        </header>

        {initialLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          </div>
        ) : (
          <div className="p-8 flex-1 flex flex-col gap-6">
          
          <div className="space-y-1">
            <input 
              type="text" 
              name="title"
              placeholder="Blog Post Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full text-4xl font-bold bg-transparent border-none placeholder:text-gray-300 focus:outline-none focus:ring-0 px-0 py-2 text-gray-900 ${
                formik.touched.title && formik.errors.title ? "placeholder:text-red-300" : ""
              }`}
            />
            {formik.touched.title && formik.errors.title ? (
              <div className="text-red-500 text-sm font-medium">{formik.errors.title}</div>
            ) : null}
          </div>

          <div className="flex-1 flex flex-col relative">
            <LexicalEditor 
              initialContent={formik.values.content}
              onChange={(val) => {
                formik.setFieldValue("content", val);
                if (formik.touched.content) {
                  formik.setFieldTouched("content", true, false);
                }
              }} 
            />
            {formik.touched.content && formik.errors.content ? (
              <div className="text-red-500 text-sm font-medium mt-2">{formik.errors.content}</div>
            ) : null}
          </div>
          
        </div>
        )}
      </main>
    </div>
  );
}
