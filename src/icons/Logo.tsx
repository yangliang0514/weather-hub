export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <svg
        data-name="Layer 1"
        id="Layer_1"
        viewBox="0 0 64 64"
        width="48"
        height="48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style>
            {`
        .cls-1 { fill: #efcc00; }
        .cls-2 { fill: none; stroke: #efcc00; stroke-linecap: round; stroke-miterlimit: 10; stroke-width: 3px; }
      `}
          </style>
        </defs>
        <title />
        <circle className="cls-1" cx="32" cy="32" r="17" />
        <line className="cls-2" x1="32" x2="32" y1="5" y2="11" />
        <line className="cls-2" x1="32" x2="32" y1="53" y2="59" />
        <line className="cls-2" x1="59" x2="53" y1="32" y2="32" />
        <line className="cls-2" x1="11" x2="5" y1="32" y2="32" />
        <line className="cls-2" x1="51.09" x2="46.85" y1="12.91" y2="17.15" />
        <line className="cls-2" x1="17.15" x2="12.91" y1="46.85" y2="51.09" />
        <line className="cls-2" x1="51.09" x2="46.85" y1="51.09" y2="46.85" />
        <line className="cls-2" x1="17.15" x2="12.91" y1="17.15" y2="12.91" />
      </svg>
      <span className="text-3xl">WeatherApp</span>
    </div>
  );
}
