import * as React from "react";
const PuasaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width="1em"
    height="1em"
    fill="#fff"
    stroke="#fff"
    viewBox="0 0 496.158 496.158"
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

    <path
      d="M496.158 248.085C496.158 111.064 385.088.003 248.082.003 111.07.002 0 111.062 0 248.085c0 137.002 111.07 248.071 248.083 248.071 137.005-.001 248.075-111.07 248.075-248.071z"
      style={{
        fill: "#8c00ff",
      }}
    />
    <path
      d="M223.082 121.066h-60.006c-5.523 0-10 4.479-10 10V365.09c0 5.523 4.477 10 10 10h60.006c5.523 0 10-4.477 10-10V131.066c0-5.521-4.477-10-10-10zM333.082 121.066h-60.006c-5.523 0-10 4.479-10 10V365.09c0 5.523 4.477 10 10 10h60.006c5.523 0 10-4.477 10-10V131.066c0-5.521-4.477-10-10-10z"
      style={{
        fill: "#fff",
      }}
    />
  </svg>
);
export default PuasaIcon;
