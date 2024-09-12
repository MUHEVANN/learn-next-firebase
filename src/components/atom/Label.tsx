type LabelProps = {
  label: string;
};

const Label = ({ label }: LabelProps) => {
  return <label className="capitalize">{label}</label>;
};

export default Label;
