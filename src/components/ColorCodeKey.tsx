import clsx from "clsx";

interface ColorCode {
  color: string;
  description: string;
}

export function ColorCodeKey() {
  const colorCodes: ColorCode[] = [
    { color: "bg-emerald", description: "Correct" },
    { color: "bg-sun-flower", description: "Wrong Position" },
    { color: "bg-alizarin", description: "Incorrect" },
  ];

  return (
    <div
      className={"flex items-center justify-between px-4 text-sm text-white"}
    >
      {colorCodes.map((colorCode) => (
        <div
          key={colorCode.description}
          className={"flex flex-col items-center justify-center gap-2"}
        >
          <div className={clsx("h-4 w-4 border", colorCode.color)}></div>
          <span>{colorCode.description}</span>
        </div>
      ))}
    </div>
  );
}
