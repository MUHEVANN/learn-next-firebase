import Input from "./atom/Input";
import Label from "./atom/Label";

type InputLabelProps = {
  label: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
};

export default function InputLabel({ label, inputProps }: InputLabelProps) {
  return (
    <div className="flex flex-col gap-1">
      <Label label={label} />
      <Input {...inputProps} />
    </div>
  );
}
