"use client";

import { trpc } from "../../utils/trpc";
import { useState } from "react";

export function PageCreateForm() {
  const utils = trpc.useUtils();
  const createPage = trpc.page.create.useMutation({
    onSuccess: () => {
      utils.page.getAll.invalidate();
    },
  });

  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    imageUrl: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    createPage.mutate(form);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <input
        name="slug"
        value={form.slug}
        onChange={handleChange}
        placeholder="Slug"
        required
      />
      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="Content"
        required
      />
      <input
        name="imageUrl"
        value={form.imageUrl}
        onChange={handleChange}
        placeholder="Image URL"
      />
      <button type="submit" disabled={createPage.isPending}>
        {createPage.isPending ? "Creating..." : "Create Page"}
      </button>
      {createPage.error && <div>Error: {createPage.error.message}</div>}
    </form>
  );
}
