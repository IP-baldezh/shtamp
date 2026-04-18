import { DeleteButton } from "./delete-button";

export function DeleteEquipmentButton({ id, name }: { id: string; name: string }) {
  return <DeleteButton id={id} title={name} table="equipment" />;
}
