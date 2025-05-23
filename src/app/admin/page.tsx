import { PageList } from "../../components/pages/PageList";
import { PageCreateForm } from "../../components/pages/PageCreateForm";
import { HeroSectionEditor } from "../../components/pages/HeroSectionEditor";

export default function AdminPage() {
  return (
    <main>
      <h1>Admin</h1>
      <HeroSectionEditor slug="home" />
      <PageList />
      <PageCreateForm />
    </main>
  );
}
