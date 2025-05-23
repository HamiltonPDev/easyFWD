"use client";

import { trpc } from "../../utils/trpc";
import { IPage } from "../../models/Page";

export function PageList() {
  const { data, isLoading, error } = trpc.page.getAll.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {data?.map((page: IPage) => (
        <li key={page._id.toString()}>
          <strong>{page.title}</strong> — <em>{page.slug}</em>
        </li>
      ))}
    </ul>
  );
}
