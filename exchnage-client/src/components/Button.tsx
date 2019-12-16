export default function Button({
  loading,
  onClick,
  label
}: {
  loading: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-500 font-semibold px-5 py-4 text-white h:text-white relative text-base inline-block rounded text-center w-1/4 focus:outline-none ${
        loading ? "cursor-not-allowed opacity-50" : ""
      }`}
    >
      {loading ? "Loading ..." : label}
    </button>
  );
}
