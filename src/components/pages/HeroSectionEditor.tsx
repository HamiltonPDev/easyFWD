"use client";

import { useState, useEffect } from "react";
import { trpc } from "../../utils/trpc";
import { Section } from "../../models/Page";

interface HeroSectionData {
  title: string;
  subtitle: string;
}

export function HeroSectionEditor({ slug }: { slug: string }) {
  const { data: page, isLoading } = trpc.page.getBySlug.useQuery({ slug });
  const heroSection = page?.sections?.find((s: Section) => s.type === "hero");
  const [form, setForm] = useState<HeroSectionData>({
    title: "",
    subtitle: "",
  });

  useEffect(() => {
    if (heroSection?.data) {
      const heroData = heroSection.data as unknown as HeroSectionData;
      setForm({
        title: heroData.title || "",
        subtitle: heroData.subtitle || "",
      });
    }
  }, [heroSection]);

  const updateSection = trpc.page.updateSection.useMutation();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSave() {
    updateSection.mutate({
      slug,
      sectionType: "hero",
      data: form as unknown as Record<string, unknown>,
    });
  }

  if (isLoading) return <div>Loading...</div>;
  if (!heroSection) return <div>No Hero section found.</div>;

  return (
    <div>
      <h2>Edit Hero Section</h2>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Hero Title"
      />
      <input
        name="subtitle"
        value={form.subtitle}
        onChange={handleChange}
        placeholder="Hero Subtitle"
      />
      <button onClick={handleSave} disabled={updateSection.isPending}>
        {updateSection.isPending ? "Saving..." : "Save"}
      </button>
      {updateSection.error && <div>Error: {updateSection.error.message}</div>}
    </div>
  );
}
