import * as React from "react";

// Definisci il tipo per i props (usiamo React.SVGProps<SVGSVGElement>)
const PlayIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width="6em"
    height="6em"
    fill="#7842f5"
    stroke="#7842f5"
    strokeWidth={0.005}
    viewBox="-45.9 -45.9 550.8 550.8"
    {...props}
  >
  <defs>
  <linearGradient id="normalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "rgb(51, 50, 50)", stopOpacity: 2 }} />
            <stop offset="100%" style={{ stopColor: "rgb(162, 0, 255)", stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="invertedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "rgb(162, 0, 255)", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "rgb(51, 50, 50)", stopOpacity: 2 }} />
          </linearGradient>
    </defs>

    <path  d="M229.5 0C102.751 0 0 102.751 0 229.5S102.751 459 229.5 459 459 356.249 459 229.5 356.249 0 229.5 0zm80.792 239.651-111.764 76.084a12.281 12.281 0 0 1-19.19-10.151V153.416a12.281 12.281 0 0 1 19.19-10.151l111.764 76.084a12.28 12.28 0 0 1 0 20.302z" />
  </svg>
);

export default PlayIcon;