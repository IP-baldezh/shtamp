import { DeleteButton } from "./delete-button";

export function DeleteArticleButton({ id, title }: { id: string; title: string }) {
  return <DeleteButton id={id} title={title} table="articles" />;
}
