import { DeleteButton } from "./delete-button";

export function DeleteCaseButton({ id, title }: { id: string; title: string }) {
  return <DeleteButton id={id} title={title} table="cases" />;
}
