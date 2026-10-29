interface Props {
  active: boolean;
  label: string;
  color: string;
  onClick: () => void;
}

export default function ToggleButton({ active, label, color, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="text-xs sm:text-sm px-3 py-1.5 rounded-full border transition-all"
      style={{
        borderColor: active ? color : "#d6d3d1",
        backgroundColor: active ? color : "#ffffff",
        color: active ? "#1c1917" : "#57534e",
        fontWeight: active ? 600 : 400,
        boxShadow: active ? "inset 0 0 0 1px rgba(0,0,0,.08)" : "none",
      }}
    >
      <span
        className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle"
        style={{ backgroundColor: color, border: "1px solid rgba(0,0,0,.15)" }}
      />
      {label}
    </button>
  );
}