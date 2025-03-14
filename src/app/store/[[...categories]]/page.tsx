interface CategoryProps {
  params: {
    categories: string[];
    search?: string;
  };
}

export default function Category(props: CategoryProps) {
  const { categories } = props.params;
  // throw new Error("This is an error");
  return (
    <div>
      <h1>Category Dynamic: {categories}</h1>
    </div>
  );
}
