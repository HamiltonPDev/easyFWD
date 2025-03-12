interface CategoryProps {
  params: {
    categories: string[];
    search?: string;
  };
}

export default function Category(props: CategoryProps) {
  const { categories } = props.params;

  console.log("Categories Dynamic: ", categories);

  return (
    <div>
      <h1>Category Dynamic: {categories}</h1>
    </div>
  );
}
