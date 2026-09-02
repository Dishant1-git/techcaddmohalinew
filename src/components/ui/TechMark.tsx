/**
 * Brand marks for the technologies we teach, hand-drawn as inline paths — no
 * external asset requests. These carry each vendor's own colours rather than
 * the site palette, which is the one place brand colour belongs.
 *
 * All marks are drawn on a 24×24 grid.
 */

const C = {
  react: "#61DAFB",
  pythonBlue: "#3776AB",
  pythonYellow: "#FFD43B",
  node: "#5FA04E",
  mongo: "#00ED64",
  tfDark: "#FF6F00",
  tfLight: "#FFA800",
  docker: "#2496ED",
  k8s: "#326CE5",
  tailwind: "#38BDF8",
  figmaOrange: "#F24E1E",
  figmaRed: "#FF7262",
  figmaPurple: "#A259FF",
  figmaBlue: "#1ABCFE",
  figmaGreen: "#0ACF83",
} as const;

/**
 * Python is 180°-rotationally symmetric, so one body is drawn and rotated for
 * the other half. `evenodd` punches the eye through instead of painting it.
 */
const PYTHON_BODY =
  "M11.9 2.1c-1.8 0-3.3.2-4.4.5-1.3.4-2 1.2-2 2.4v2.5h6.6v.9H4.4C3 8.4 1.9 9.3 1.5 10.8c-.5 1.7-.5 2.9 0 4.7.4 1.4 1.2 2.4 2.6 2.4h2.1v-2.9c0-1.6 1.4-3 3-3h5c1.3 0 2.4-1 2.4-2.4V5c0-1.2-.9-2.1-2.1-2.4-1-.3-2-.5-2.6-.5Zm-3.5 2c.5 0 1 .4 1 1 0 .5-.5 1-1 1s-1-.5-1-1c0-.6.5-1 1-1Z";

const HEPTAGON = "M12 2 19.82 5.77 21.75 14.23 16.34 21.01 7.66 21.01 2.25 14.23 4.18 5.77Z";

const NODE_HEX = "M12 1.8 21.2 7v10L12 22.2 2.8 17V7Z";

const marks: Record<string, React.ReactNode> = {
  react: (
    <>
      <circle cx="12" cy="12" r="2.05" fill={C.react} />
      <g fill="none" stroke={C.react} strokeWidth="1.05">
        <ellipse cx="12" cy="12" rx="10.2" ry="4.1" />
        <ellipse cx="12" cy="12" rx="10.2" ry="4.1" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10.2" ry="4.1" transform="rotate(120 12 12)" />
      </g>
    </>
  ),

  python: (
    <>
      <path d={PYTHON_BODY} fill={C.pythonBlue} fillRule="evenodd" />
      <path
        d={PYTHON_BODY}
        fill={C.pythonYellow}
        fillRule="evenodd"
        transform="rotate(180 12 12)"
      />
    </>
  ),

  node: (
    <>
      <path d={NODE_HEX} fill={C.node} />
      <path
        d="M12 7.6v8.8M9.2 9.6h4.2a1.5 1.5 0 0 1 0 3H10a1.5 1.5 0 0 0 0 3h4.4"
        fill="none"
        stroke="rgba(4,26,10,0.6)"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </>
  ),

  // One compound path with evenodd, so the stem is cut out of the leaf rather
  // than painted over it — the chip background shows through either way.
  mongodb: (
    <path
      fill={C.mongo}
      fillRule="evenodd"
      d="M12 1.7c3.1 3.9 4.7 7 4.7 10.1 0 3.7-2.1 6.4-4.7 9-2.6-2.6-4.7-5.3-4.7-9 0-3.1 1.6-6.2 4.7-10.1Zm-.45 3.1v15.4h.9V4.8Z"
    />
  ),

  tensorflow: (
    <>
      <path d="M12.6 1.8 21.4 6.9v3.6l-5.1-3v11.3l-3.7 2.4V1.8Z" fill={C.tfDark} />
      <path d="M11.4 4.1v6.1L7.7 12.3V8.7L4 10.8V7.2l7.4-3.1Z" fill={C.tfLight} />
    </>
  ),

  docker: (
    <g fill={C.docker}>
      <path d="M3.4 10.6h3v3h-3zM6.9 10.6h3v3h-3zM10.4 10.6h3v3h-3zM13.9 10.6h3v3h-3zM6.9 7.2h3v3h-3zM10.4 7.2h3v3h-3zM10.4 3.8h3v3h-3z" />
      <path d="M1.6 14.7h19.1c.3 1-.1 2.2-.8 3 .5 1.7-.2 3.4-1.6 4.4-1.5 1.1-3.7 1.5-6.1 1.5-4.5 0-8.3-1.7-9.6-5.4a8 8 0 0 1-1-3.5Z" />
      <path
        d="M18.4 8.4c1.1 0 2 .5 2.5 1.4.7-.4 1.7-.3 2.1.2-.3 1.1-1.6 1.7-3 1.6"
        fill="none"
        stroke={C.docker}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </g>
  ),

  kubernetes: (
    <>
      <path d={HEPTAGON} fill={C.k8s} />
      <g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="2.2" strokeWidth="1.2" />
        <g strokeWidth="1.1">
          <path d="M12 9.8V5.9M14.1 10.8l2.7-2.3M14.5 13.3l3.5.9M13 15.6l1.4 3.4M11 15.6l-1.4 3.4M9.5 13.3l-3.5.9M9.9 10.8 7.2 8.5" />
        </g>
      </g>
    </>
  ),

  figma: (
    <>
      <path d="M11.3 2H8.6a3.35 3.35 0 0 0 0 6.7h2.7V2Z" fill={C.figmaOrange} />
      <path d="M12.7 2h2.7a3.35 3.35 0 0 1 0 6.7h-2.7V2Z" fill={C.figmaRed} />
      <path d="M11.3 8.7H8.6a3.35 3.35 0 0 0 0 6.7h2.7V8.7Z" fill={C.figmaPurple} />
      <circle cx="15.4" cy="12.05" r="3.35" fill={C.figmaBlue} />
      <path d="M11.3 15.4H8.6a3.35 3.35 0 1 0 2.7 5.35V15.4Z" fill={C.figmaGreen} />
    </>
  ),

  // Ring open at the top with the torch stem and dot above it.
  pytorch: (
    <g fill="#EE4C2C">
      <path d="M16.2 6.35a6 6 0 1 1-8.5 0l1.75 1.75a3.53 3.53 0 1 0 5 0l1.75-1.75Z" />
      <path d="M12 1.6 14.6 4.2 12 6.8V1.6Z" />
      <circle cx="15.9" cy="5.1" r="1.2" />
    </g>
  ),

  pandas: (
    <>
      <rect x="3.6" y="4" width="3.2" height="7" rx="1" fill="#130654" />
      <rect x="3.6" y="13" width="3.2" height="7" rx="1" fill="#130654" />
      <rect x="10.4" y="1.8" width="3.2" height="5" rx="1" fill="#E70488" />
      <rect x="10.4" y="8.8" width="3.2" height="13.4" rx="1" fill="#130654" />
      <rect x="17.2" y="4" width="3.2" height="7" rx="1" fill="#130654" />
      <rect x="17.2" y="13" width="3.2" height="7" rx="1" fill="#FFCA00" />
    </>
  ),

  jupyter: (
    <g fill="#F37626">
      <circle cx="5.4" cy="4.6" r="1.5" />
      <circle cx="18.6" cy="19.4" r="1.7" />
      <circle cx="18.3" cy="4.3" r="1.2" />
      <path d="M12 6.4c4.1 0 7.6 1.8 9 4.3-.6-3.9-4.4-6.9-9-6.9S3.6 6.8 3 10.7c1.4-2.5 4.9-4.3 9-4.3Z" />
      <path d="M12 17.6c-4.1 0-7.6-1.8-9-4.3.6 3.9 4.4 6.9 9 6.9s8.4-3 9-6.9c-1.4 2.5-4.9 4.3-9 4.3Z" />
    </g>
  ),

  git: (
    <>
      <path d="M12 1.6 22.4 12 12 22.4 1.6 12Z" fill="#F05032" />
      <g fill="#fff" stroke="#fff">
        <path d="M9.4 8.4v7.2M10 12.5l4-3.2" fill="none" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9.4" cy="7.6" r="1.5" strokeWidth="0" />
        <circle cx="9.4" cy="16.4" r="1.5" strokeWidth="0" />
        <circle cx="14.9" cy="8.6" r="1.5" strokeWidth="0" />
      </g>
    </>
  ),

  powerbi: (
    <g fill="#F2C811">
      <rect x="3.4" y="8" width="4.3" height="13" rx="1.1" />
      <rect x="9.85" y="4.5" width="4.3" height="16.5" rx="1.1" />
      <rect x="16.3" y="1.6" width="4.3" height="19.4" rx="1.1" />
    </g>
  ),

  tableau: (
    <g fill="#E97627">
      <rect x="11.05" y="1.8" width="1.9" height="20.4" rx="0.6" />
      <rect x="1.8" y="11.05" width="20.4" height="1.9" rx="0.6" />
      <rect x="6.4" y="4.6" width="1.2" height="6.2" rx="0.4" />
      <rect x="6.4" y="13.2" width="1.2" height="6.2" rx="0.4" />
      <rect x="16.4" y="4.6" width="1.2" height="6.2" rx="0.4" />
      <rect x="16.4" y="13.2" width="1.2" height="6.2" rx="0.4" />
    </g>
  ),

  tailwind: (
    <g fill={C.tailwind}>
      <path d="M12 5.5c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.23 1.6.93 2.3 1.7 1.2 1.3 2.6 2.8 5.5 2.8 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.23-1.6-.93-2.3-1.7C16.3 7 14.9 5.5 12 5.5Z" />
      <path d="M6 12.7c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.23 1.6.93 2.3 1.7 1.2 1.3 2.6 2.8 5.5 2.8 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.23-1.6-.93-2.3-1.7-1.2-1.3-2.6-2.8-5.5-2.8Z" />
    </g>
  ),
};

const labels: Record<string, string> = {
  react: "React",
  python: "Python",
  node: "Node.js",
  mongodb: "MongoDB",
  tensorflow: "TensorFlow",
  docker: "Docker",
  kubernetes: "Kubernetes",
  figma: "Figma",
  tailwind: "Tailwind CSS",
  pytorch: "PyTorch",
  pandas: "pandas",
  jupyter: "Jupyter",
  git: "Git",
  powerbi: "Power BI",
  tableau: "Tableau",
};

export default function TechMark({
  name,
  size = 24,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} role="img" className={className}>
      <title>{labels[name] ?? name}</title>
      {marks[name] ?? marks.react}
    </svg>
  );
}
