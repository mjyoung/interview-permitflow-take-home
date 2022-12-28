interface Props {
  value: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox({ label, value, onChange }: Props) {
  return (
    <div className="flex gap-2 py-1">
      <input
        type="checkbox"
        name="work-item"
        id={value}
        value={value}
        onChange={onChange}
      />
      <label className="cursor-pointer" htmlFor={value}>
        {label}
      </label>
    </div>
  );
}
