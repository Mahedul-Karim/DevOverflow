"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Editor } from "@tinymce/tinymce-react";

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
import { ProfileSchema } from "@/components/util/validations";
import { usePathname, useRouter } from "next/navigation";
import { updateUser } from "@/lib/actions/user";

interface Props {
  clerkId: string;
  user: string;
}

const ProfileForm: React.FC<Props> = ({ clerkId, user }) => {
  const parsedUser = JSON.parse(user);

  const router = useRouter();
  const pathname = usePathname();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: parsedUser.name || "",
      username: parsedUser.username || "",
      portfolioWebsite: parsedUser.portfolioWebsite || "",
      location: parsedUser.location || "",
      bio: parsedUser.bio || "",
    },
  });

  async function onSubmit(values: z.infer<typeof ProfileSchema>) {
    try {
      setIsSubmitting(true);

      await updateUser({
        clerkId,
        updateData: {
          name: values.name,
          username: values.username,
          portfolioWebsite: values.portfolioWebsite,
          location: values.location,
          bio: values.bio,
        },
        path: pathname,
      });

      router.back();
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full gap-9 mt-9 flex-col"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-3.5 flex w-full flex-col">
              <FormLabel className="text-[16px] font-semibold leading-[20.8px] text-dark-400 dark:text-light-800">
                Name<span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <input
                  className="text-[16px] font-normal leading-[22.4px] focus-visible:ring-0 focus-visible:ring-transparent bg-light-800 dark:bg-dark-400 border-none shadow-none outline-none dark:text-light-800 px-3 py-2 min-h-[56px] rounded-md border-light-700 dark:border-dark-400 border"
                  placeholder="Your name"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="space-y-3.5 flex w-full flex-col">
              <FormLabel className="text-[16px] font-semibold leading-[20.8px] text-dark-400 dark:text-light-800">
                Username<span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <input
                  className="text-[16px] font-normal leading-[22.4px] focus-visible:ring-0 focus-visible:ring-transparent bg-light-800 dark:bg-dark-400 border-none shadow-none outline-none dark:text-light-800 px-3 py-2 min-h-[56px] rounded-md border-light-700 dark:border-dark-400 border"
                  placeholder="Your username"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="portfolioWebsite"
          render={({ field }) => (
            <FormItem className="space-y-3.5 flex w-full flex-col">
              <FormLabel className="text-[16px] font-semibold leading-[20.8px] text-dark-400 dark:text-light-800">
                Portfolio Link
              </FormLabel>
              <FormControl className="mt-3.5">
                <input
                  className="text-[16px] font-normal leading-[22.4px] focus-visible:ring-0 focus-visible:ring-transparent bg-light-800 dark:bg-dark-400 border-none shadow-none outline-none dark:text-light-800 px-3 py-2 min-h-[56px] rounded-md border-light-700 dark:border-dark-400 border"
                  placeholder="Your portfolio url"
                  type="url"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="space-y-3.5 flex w-full flex-col">
              <FormLabel className="text-[16px] font-semibold leading-[20.8px] text-dark-400 dark:text-light-800">
                Location
              </FormLabel>
              <FormControl className="mt-3.5">
                <input
                  className="text-[16px] font-normal leading-[22.4px] focus-visible:ring-0 focus-visible:ring-transparent bg-light-800 dark:bg-dark-400 border-none shadow-none outline-none dark:text-light-800 px-3 py-2 min-h-[56px] rounded-md border-light-700 dark:border-dark-400 border"
                  placeholder="Where are you from?"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="space-y-3.5 flex w-full flex-col">
              <FormLabel className="text-[16px] font-semibold leading-[20.8px] text-dark-400 dark:text-light-800">
                Bio
              </FormLabel>
              <FormControl className="mt-3.5">
                <textarea
                  className="text-[16px] font-normal leading-[22.4px] focus-visible:ring-0 focus-visible:ring-transparent bg-light-800 dark:bg-dark-400 border-none shadow-none outline-none dark:text-light-800 px-3 py-2 min-h-[56px] rounded-md border-light-700 dark:border-dark-400 border"
                  placeholder="What's special about you?"
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <div className="mt-7 flex justify-end">
          <Button
            type="submit"
            className="primary-gradient w-full text-light-900"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
