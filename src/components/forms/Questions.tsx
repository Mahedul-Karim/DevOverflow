"use client";

import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "../util/validations";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { createQuestion } from "@/lib/actions/questions";
import { usePathname, useRouter } from "next/navigation";

type KeyDownFunction = (
  e: React.KeyboardEvent<HTMLInputElement>,
  field: any
) => void;

const type: string = "create";

interface Props {
  userId: string;
}

const Questions: React.FC<Props> = ({ userId }) => {
  const editorRef = useRef<any>();

  const router = useRouter();
  const pathname = usePathname()

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      await createQuestion({
        title: values.title,
        content: values.explanation,
        tags: values.tags,
        author: userId as any,
        path:pathname
      });

      router.push('/')

    } catch (err) {
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleKeyDown: KeyDownFunction = (e, field) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();
      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (tagValue !== "") {
        if (tagValue.length > 15) {
          form.setError("tags", {
            type: "required",
            message: "Tag must be less then 15 characters",
          });
          return;
        }

        if (!field.value.includes(tagValue as never)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
        }
      } else {
        form.trigger();
        return;
      }
    }
  };

  const handleTagRemove = (tag: string, field: any) => {
    const newTag = field.value.filter((t: string) => t !== tag);

    form.setValue("tags", newTag);
  };
  console.log(process.env.NEXT_PUBLIC_TINY_API_KEY);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="text-[16px] font-semibold leading-[20.8px] text-dark-400 dark:text-light-800">
                Question Title<span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <input
                  className="text-[16px] font-normal leading-[22.4px] focus-visible:ring-0 focus-visible:ring-transparent bg-light-800 dark:bg-dark-400 border-none shadow-none outline-none dark:text-light-800 px-3 py-2 min-h-[56px] rounded-md border-light-700 dark:border-dark-400 border"
                  placeholder="Add title"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-[14px] font-normal leading-[19.6px] mt-2.5 text-light-500">
                Add up to 3 tags to describe what your question is about. You
                need to press enter to add a tag
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-[16px] font-semibold leading-[20.8px] text-dark-400 dark:text-light-800">
                Detailed explanation of your problem
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                  onInit={(_evt, editor) => (editorRef.current = editor)}
                  initialValue=""
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  init={{
                    height: 350,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "codesample",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "codesample | bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist",
                    content_style: "body { font-family:Inter; font-size:16px }",
                  }}
                />
              </FormControl>
              <FormDescription className="text-[14px] font-normal leading-[19.6px] mt-2.5 text-light-500">
                Introduce the problem and expand on what you put in the title,
                Minimum 20 characters
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="text-[16px] font-semibold leading-[20.8px] text-dark-400 dark:text-light-800">
                Tags<span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <>
                  <input
                    className="text-[16px] font-normal leading-[22.4px] focus-visible:ring-0 focus-visible:ring-transparent bg-light-800 dark:bg-dark-400 border-none shadow-none outline-none dark:text-light-800 px-3 py-2 min-h-[56px] rounded-md border-light-700 dark:border-dark-400 border"
                    placeholder="Add tags..."
                    onKeyDown={(e) => handleKeyDown(e, field)}
                  />
                  {field.value.length > 0 && (
                    <div className="flex items-center justify-start mt-2.5 gap-2.5">
                      {field.value.map((tag: any) => (
                        <Badge
                          key={tag}
                          className="text-[10px] font-medium leading-[13px] bg-light-800 dark:bg-dark-300 text-light-400 dark:text-light-500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize"
                          onClick={() => handleTagRemove(tag, field)}
                        >
                          {tag}
                          <Image
                            src="/assets/icons/close.svg"
                            alt="close icon"
                            width={12}
                            height={12}
                            className="cursor-pointer object-contain invert-0 dark:invert"
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription className="text-[14px] font-normal leading-[19.6px] mt-2.5 text-light-500">
                Be specific and imagine you&apos;re asking a question to another
                person
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="primary-gradient w-full text-light-900"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>{type === "edit" ? "Editing..." : "Posting..."}</>
          ) : (
            <>{type === "edit" ? "Edit Question" : "Ask a Question"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default Questions;
