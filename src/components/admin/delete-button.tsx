"use client";

export function DeleteButton({
  action,
  label,
}: {
  action: () => Promise<void>;
  label: string;
}) {
  return (
    <form action={action}>
      <button
        type="submit"
        className="text-sm font-semibold text-red-700 hover:text-red-800"
        onClick={(event) => {
          if (!window.confirm(`Delete this ${label}?`)) event.preventDefault();
        }}
      >
        Delete
      </button>
    </form>
  );
}
