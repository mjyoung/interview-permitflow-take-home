interface Props {
  id: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox({ id, label, onChange }: Props) {
  return (
    <div className="flex gap-2 py-1" key={id}>
      <input
        type="checkbox"
        name="work-item"
        id={id}
        value={id}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
