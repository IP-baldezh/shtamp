import { DeleteButton } from "./delete-button";

export function DeleteRequestButton({
  id,
  table,
}: {
  id: string;
  table: "contact_requests" | "quote_requests";
}) {
  return <DeleteButton id={id} title="заявку" table={table} />;
}
