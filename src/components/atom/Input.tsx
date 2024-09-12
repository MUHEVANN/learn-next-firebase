type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: InputProps) {
  return <input {...props} className="px-4 py-2 outline-none bg-[#f5f5f5]" />;
}
