"use client";

import { trpc } from "app/utils/trpc";

interface HelloGreetingProps {
  name?: string;
}

export function HelloGreeting({ name }: HelloGreetingProps) {
  const { data, isLoading, error } = trpc.page.hello.useQuery({ name });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{data?.greeting}</div>;
}
