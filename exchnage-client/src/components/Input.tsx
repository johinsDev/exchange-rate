export default function Input({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative w-full">
      <label className="block font-semibold mb-2 text-white">{label}</label>
      <input
        className="h-16 p-4 mb-4 w-full bg-white border-none focus:outline-none rounded-2xl mb-10 shadow-lg overflow-hidden"
        {...props}
      />
    </div>
  );
}
