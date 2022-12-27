import classNames from 'classnames';

interface Option {
  value: string;
  label: string;
}

interface Props {
  className?: string;
  name: string;
  options: Option[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select({ className, name, options, onChange }: Props) {
  return (
    <select
      id={name}
      className={classNames(
        className,
        'rounded-lg border border-zinc-600 bg-zinc-700 p-2.5 text-sm text-white placeholder-zinc-700 focus:border-blue-500 focus:ring-blue-500'
      )}
      onChange={onChange}
      defaultValue=""
    >
      <option disabled value="">
        Select an option
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
