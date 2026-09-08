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

  javascript: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="2" fill="#F7DF1E" />
      <path
        fill="#111"
        d="M12.9 18.3c.4.7 1 1.2 2 1.2.8 0 1.4-.4 1.4-1 0-.7-.6-1-1.5-1.4l-.5-.2c-1.5-.6-2.5-1.4-2.5-3.1 0-1.5 1.2-2.7 3-2.7 1.3 0 2.2.5 2.9 1.6l-1.6 1c-.3-.6-.7-.8-1.3-.8s-1 .4-1 .8c0 .6.4.8 1.2 1.2l.5.2c1.8.8 2.8 1.5 2.8 3.2 0 1.8-1.4 2.8-3.3 2.8-1.9 0-3.1-.9-3.7-2.1l1.6-.7Zm-6.1.2c.3.5.6.9 1.2.9.6 0 .9-.2.9-1.1v-6.2h2v6.2c0 2-1.2 2.9-2.9 2.9-1.5 0-2.5-.8-3-1.8l1.8-.9Z"
      />
    </>
  ),

  java: (
    <g fill="#E76F00">
      <path d="M7.8 13.8h7.6c.5 0 .9.4.9.9v2.4a3.7 3.7 0 0 1-3.7 3.7h-2a3.7 3.7 0 0 1-3.7-3.7v-2.4c0-.5.4-.9.9-.9Z" />
      <path d="M16.9 14.8h1a2 2 0 1 1 0 4h-1v-1.7h1a.3.3 0 0 0 0-.6h-1v-1.7Z" />
      <path d="M12.4 3.4c1.5 1.6-.4 2.8-.4 2.8s2.8-1.4 1.5-3.2c-1.2-1.6-1.9-2.4.5-2.8 0 0-4.6.7-1.6 3.2Z" />
      <path d="M10 7.6c1.1 1.2-.3 2.1-.3 2.1s2.1-1 1.1-2.4c-.9-1.2-1.4-1.8.4-3 0 0-3.5 1-1.2 3.3Z" />
    </g>
  ),

  cplusplus: (
    <>
      <path fill="#00599C" d="M12 1.8 21.5 7v10L12 22.2 2.5 17V7L12 1.8Z" />
      <path
        fill="#fff"
        d="M12 7.2a4.8 4.8 0 1 0 4.2 7.1l-2.1-1.2a2.4 2.4 0 1 1 0-2.2l2.1-1.2A4.8 4.8 0 0 0 12 7.2Z"
      />
      <path fill="#fff" d="M17.5 11.2h-.9v.9h-.9v.9h.9v.9h.9v-.9h.9v-.9h-.9v-.9ZM20.2 11.2h-.9v.9h-.9v.9h.9v.9h.9v-.9h.9v-.9h-.9v-.9Z" />
    </>
  ),

  angular: (
    <>
      <path fill="#DD0031" d="M12 1.8 2.6 5.1l1.5 12.4L12 22.2l7.9-4.7 1.5-12.4L12 1.8Z" />
      <path fill="#C3002F" d="M12 1.8v20.4l7.9-4.7 1.5-12.4L12 1.8Z" />
      <path fill="#fff" d="M12 5.1 6.3 17.4h2.1l1.2-2.9h4.8l1.2 2.9h2.1L12 5.1Zm1.7 7.7h-3.4L12 8.7l1.7 4.1Z" />
    </>
  ),

  vue: (
    <>
      <path fill="#41B883" d="M2 3.5h4l6 10.3 6-10.3h4L12 21 2 3.5Z" />
      <path fill="#34495E" d="M7.2 3.5h3.1L12 6.6l1.7-3.1h3.1L12 12 7.2 3.5Z" />
    </>
  ),

  spring: (
    <path
      fill="#6DB33F"
      d="M20.6 3.4a9.6 9.6 0 0 1-1.1 2 10.9 10.9 0 1 0-1.6 15.2 10.7 10.7 0 0 0 3-4.6c1-2.9.5-6.6-1.3-9.5.5-1 .8-2 1-3.1ZM6 19.2a1 1 0 1 1-.1-1.4 1 1 0 0 1 .1 1.4Zm14.5-3.2c-2.4 3.2-7.5 2.1-10.8 2.3 0 0-.6 0-1.2.1 0 0 .2-.1.5-.2 2.5-.9 3.7-1 5.2-1.8 2.8-1.4 5.6-4.6 6.2-7.9-1 3-4.2 5.6-7 6.7-2 .7-5.5 1.4-5.5 1.4l-.1-.1c-2.4-1.2-2.4-6.2 1.9-7.9 1.9-.7 3.7-.3 5.7-.8 2.2-.5 4.7-2.2 5.7-4.3 1.1 3.4 2.5 8.7-.6 12.5Z"
    />
  ),

  redis: (
    <g fill="#DC382D">
      <path d="M12 2.8 2.5 6.6 12 10.4l9.5-3.8L12 2.8Z" />
      <path d="M2.5 9.2v2.1L12 15.1l9.5-3.8V9.2L12 13 2.5 9.2Z" />
      <path d="M2.5 13.9V16L12 19.8l9.5-3.8v-2.1L12 17.7l-9.5-3.8Z" />
    </g>
  ),

  firebase: (
    <>
      <path fill="#FFA000" d="m3.9 17.3 2.4-15.1c.1-.5.8-.6 1-.1l2.5 4.7L3.9 17.3Z" />
      <path fill="#F57C00" d="m3.9 17.3 8.4-11.6 2.3 3.2L3.9 17.3Z" />
      <path fill="#FFCA28" d="m3.9 17.3 12.9-8.4 3.3 12.2c.1.4-.3.8-.7.6L3.9 17.3Z" />
    </>
  ),

  github: (
    <path
      fill="#111827"
      d="M12 1.8a10.2 10.2 0 0 0-3.2 19.9c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .8.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7 1 .7 2v2.9c0 .3.2.6.7.5A10.2 10.2 0 0 0 12 1.8Z"
    />
  ),

  azure: (
    <g fill="#0078D4">
      <path d="M9.6 3.2h4.9l-5.1 15.1-6.4 1.1L9.6 3.2Z" />
      <path d="M11.2 8.4 15.3 20H7.4l4.6-.8-3-3.6 2.2-7.2Z" opacity=".75" />
      <path d="m14.8 3.2 6.6 16.9h-6l-2.9-8.6 2.3-8.3Z" opacity=".9" />
    </g>
  ),

  googlecloud: (
    <>
      <path fill="#EA4335" d="M14.5 8.3h.7l2-2 .1-.9a9 9 0 0 0-14.7 4.4c.2-.2.6-.2.6-.2l4-.6s.2-.3.3-.3a5 5 0 0 1 7-.4Z" />
      <path fill="#4285F4" d="M20.1 9.8a9 9 0 0 0-2.7-4.4l-2.8 2.8a5 5 0 0 1 1.8 3.9v.5a2.5 2.5 0 0 1 0 5h-5l-.5.5v3l.5.5h5a6.5 6.5 0 0 0 3.7-11.8Z" />
      <path fill="#34A853" d="M6.4 21.6h5v-4h-5a2.4 2.4 0 0 1-1-.2l-.7.2-2 2-.2.7a6.5 6.5 0 0 0 3.9 1.3Z" />
      <path fill="#FBBC05" d="M6.4 8.6A6.5 6.5 0 0 0 2.5 20.3l2.9-2.9a2.5 2.5 0 0 1 1-4.8c.9 0 1.7.5 2.1 1.2l2.9-2.9a6.5 6.5 0 0 0-5-2.3Z" />
    </>
  ),

  vercel: <path fill="#111827" d="M12 3 22 20H2L12 3Z" />,

  numpy: (
    <>
      <path fill="#4DABCF" d="M12 2.2 5.2 5.6l2.4 1.2L12 4.6l4.4 2.2 2.4-1.2L12 2.2Z" />
      <path fill="#4D77CF" d="M4 6.8v8.4l6.8 3.4v-2.7l-4.4-2.2V8.1L4 6.8Z" />
      <path fill="#4D77CF" d="M20 6.8v8.4l-6.8 3.4v-2.7l4.4-2.2V8.1L20 6.8Z" />
      <path fill="#4DABCF" d="M12 8.4 8.6 10v4l3.4 1.7 3.4-1.7v-4L12 8.4Z" />
    </>
  ),

  sqlite: (
    <>
      <path fill="#003B57" d="M3.5 4.5a2 2 0 0 1 2-2h9.6l4.4 4.4v13.6a2 2 0 0 1-2 2H5.5a2 2 0 0 1-2-2v-16Z" />
      <path
        fill="#0F80CC"
        d="M20.4 3.4c-.8-.7-1.9-.4-2.9.5l-.4.4c-1.8 1.9-3.4 5.4-3.9 8.1.2.4.3.9.4 1.3l.2.9c-.1-.2-.1-.4-.2-.6-.1.6-.1 1.1 0 1.5.2.4.5.7.8.7.5-1.2 1.2-2.4 2-3.5l-.2 1.2c1.2-1.5 2-3.4 2.4-5.5.6-1.7 1.4-3.4 2.1-4.3l-.3-.7Z"
      />
    </>
  ),

  netlify: (
    <path
      fill="#00C7B7"
      d="M12 2.2 21.8 12 12 21.8 2.2 12 12 2.2Zm0 3.4L5.6 12l6.4 6.4 6.4-6.4L12 5.6Zm0 3.1L15.4 12 12 15.4 8.6 12 12 8.7Z"
    />
  ),

  cloudflare: (
    <>
      <path fill="#F38020" d="M16.8 17H5.6a3.6 3.6 0 0 1-.6-7.1 5.1 5.1 0 0 1 9.7-1.5 3.9 3.9 0 0 1 2.1 8.6Z" />
      <path fill="#FBAD41" d="M17.6 9.6a4 4 0 0 1 3.5 5.8.4.4 0 0 1-.4.2h-3.5a5 5 0 0 0 .4-6Z" />
    </>
  ),

  digitalocean: (
    <g fill="#0080FF">
      <path d="M12 21.8v-4a5.8 5.8 0 1 0-5.8-5.8h-4A9.8 9.8 0 1 1 12 21.8Z" />
      <path d="M8.6 18.3h3.4v-3.4H8.6v3.4Z" />
      <path d="M6 21h2.6v-2.6H6V21Z" />
      <path d="M3.8 18.4H6v-2.2H3.8v2.2Z" />
    </g>
  ),

  opencv: (
    <>
      <path fill="#FF0000" d="M12 2.6a4.4 4.4 0 0 1 2.4 8.1 6.4 6.4 0 0 0-4.8 0A4.4 4.4 0 0 1 12 2.6Zm0 2a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8Z" />
      <path fill="#00B84D" d="M4.5 16.9a4.4 4.4 0 0 1 3.9-7.4 6.4 6.4 0 0 0 2.4 4.2 4.4 4.4 0 0 1-6.3 3.2Zm1.7-1a2.4 2.4 0 1 0 2.4-4.2 2.4 2.4 0 0 0-2.4 4.2Z" />
      <path fill="#0057E7" d="M19.5 16.9a4.4 4.4 0 0 1-6.3-3.2 6.4 6.4 0 0 0 2.4-4.2 4.4 4.4 0 0 1 3.9 7.4Zm-1.7-1a2.4 2.4 0 1 0-2.4-4.2 2.4 2.4 0 0 0 2.4 4.2Z" />
    </>
  ),

  openai: (
    <path
      fill="#10A37F"
      d="M21 10.1a5.4 5.4 0 0 0-.5-4.4 5.5 5.5 0 0 0-5.9-2.6A5.4 5.4 0 0 0 10.5 1a5.5 5.5 0 0 0-5.2 3.8 5.4 5.4 0 0 0-3.6 2.6 5.5 5.5 0 0 0 .7 6.4 5.4 5.4 0 0 0 .5 4.4 5.5 5.5 0 0 0 5.9 2.6A5.4 5.4 0 0 0 13 23a5.5 5.5 0 0 0 5.2-3.8 5.4 5.4 0 0 0 3.6-2.6 5.5 5.5 0 0 0-.8-6.5Zm-8 11.3a4 4 0 0 1-2.6-.9l.1-.1 4.4-2.5c.2-.1.4-.4.4-.7v-6.2l1.8 1.1v5.1a4.1 4.1 0 0 1-4.1 4.2Zm-8.8-3.8a4 4 0 0 1-.5-2.7l.1.1 4.4 2.5c.2.1.5.1.7 0l5.4-3.1v2.1l-4.5 2.6a4.1 4.1 0 0 1-5.6-1.5ZM3.1 8.4a4 4 0 0 1 2.1-1.8v5.2c0 .3.1.5.4.7l5.4 3.1-1.8 1-4.5-2.5a4.1 4.1 0 0 1-1.6-5.7Zm15.3 3.5-5.4-3.1 1.8-1L18.8 10a4.1 4.1 0 0 1-.6 7.4v-5.2c0-.2-.1-.5-.4-.6Zm1.8-2.7-.1-.1-4.4-2.5a.7.7 0 0 0-.7 0L9.6 9.7V7.6l4.5-2.6a4.1 4.1 0 0 1 6.1 4.2ZM8.6 12.9l-1.8-1V6.7a4.1 4.1 0 0 1 6.7-3.2l-.1.1-4.4 2.5c-.2.1-.4.4-.4.7v6.1Zm1-2.1L12 9.4l2.4 1.4v2.8L12 15l-2.4-1.4v-2.8Z"
    />
  ),

  keras: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="3" fill="#D00000" />
      <path
        d="M8.2 6.4v11.2M8.2 12.2l5.6-5.8M10.3 13.9l4.9 3.7"
        stroke="#fff"
        strokeWidth="1.9"
        strokeLinecap="round"
        fill="none"
      />
    </>
  ),

  typescript: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="2.5" fill="#3178C6" />
      <path
        d="M12.6 12.6h6M15.6 12.6v6.2"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M11.3 17.9c-.5.6-1.4.9-2.4.9-1.6 0-2.7-.8-3.1-1.9l1.6-.9c.3.6.8 1 1.5 1 .6 0 .9-.2.9-.6 0-1.1-3.6-.8-3.6-3.3 0-1.5 1.2-2.5 2.9-2.5 1.3 0 2.3.5 2.8 1.5l-1.5 1c-.3-.5-.7-.8-1.3-.8-.5 0-.8.2-.8.6 0 1.1 3.6.7 3.6 3.3 0 .7-.2 1.2-.6 1.7Z"
        fill="#fff"
      />
    </>
  ),

  nextjs: (
    <>
      <circle cx="12" cy="12" r="10" fill="#111827" />
      <path
        d="M8.6 16.4V7.9l7.4 9.4M15.5 7.9v5.6"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </>
  ),

  aws: (
    <g fill="#FF9900">
      <path d="M8.9 10.6c0 .4.1.7.2.9.1.2.3.4.5.6v.2c0 .1 0 .2-.1.2l-.5.3h-.2c-.1 0-.2 0-.2-.1a4 4 0 0 1-.5-.7c-.6.7-1.3 1-2.2 1-.6 0-1.1-.2-1.5-.6-.4-.4-.6-.9-.6-1.5 0-.7.2-1.2.7-1.6.5-.4 1.2-.6 2-.6.3 0 .6 0 .9.1l1 .2v-.6c0-.6-.1-1-.4-1.2-.2-.3-.6-.4-1.3-.4a3.6 3.6 0 0 0-1.7.4h-.3c-.1 0-.2-.1-.2-.3v-.4c0-.1 0-.2.1-.3l.2-.1a4.6 4.6 0 0 1 2.1-.5c.9 0 1.6.2 2 .6.4.4.6 1.1.6 2v2.5Zm-3 1.1c.3 0 .6 0 .9-.2l.8-.5c.1-.2.2-.3.3-.5v-.8a5.9 5.9 0 0 0-1.5-.2c-.5 0-.9.1-1.2.3-.2.2-.4.5-.4.9s.1.6.3.8c.2.2.5.2.8.2Z" />
      <path d="M20.4 16.7c-2.3 1.7-5.6 2.6-8.4 2.6a15.3 15.3 0 0 1-10.3-3.9c-.2-.2 0-.5.3-.3a20.8 20.8 0 0 0 10.3 2.7c2.5 0 5.3-.5 7.9-1.6.4-.2.7.2.2.5Z" />
      <path d="M21.3 15.6c-.3-.4-2-.2-2.7-.1-.2 0-.3-.2-.1-.3 1.3-1 3.6-.7 3.8-.4.3.3-.1 2.6-1.3 3.6-.2.2-.4.1-.3-.1.3-.8 1-2.4.6-2.7Z" />
    </g>
  ),

  terraform: (
    <g fill="#7B42BC">
      <path d="M9.3 6.1 14 8.8v5.5L9.3 11.6V6.1Z" />
      <path d="M14.6 8.8 19.3 6.1v5.5l-4.7 2.7V8.8Z" />
      <path d="M4 3.1 8.7 5.8v5.5L4 8.6V3.1Z" />
      <path d="M9.3 12.4 14 15.1v5.5l-4.7-2.7v-5.5Z" />
    </g>
  ),

  meta: (
    <path
      fill="#0866FF"
      d="M3 9.9c0-2.4 1.2-4.1 3.2-4.1 1.6 0 2.6 1 3.7 2.7l1.4 2.6c.5-.9.9-1.7 1.4-2.5C14 6.5 15.2 5.8 16.6 5.8c2.4 0 4.2 2.2 4.2 5.6 0 2.9-1.4 4.8-3.5 4.8-1.5 0-2.5-.7-3.6-2.5l-1.3-2.2-1 1.7c-1.4 2.3-2.5 3-4 3C4.5 16.2 3 14 3 9.9Zm13.2-1.2c-.8 0-1.4.5-2 1.5l1.7 2.7c.6 1 1 1.4 1.6 1.4.8 0 1.3-1 1.3-2.6 0-1.9-.7-3-1.7-3Zm-9.9.1c-.9 0-1.5 1-1.5 2.7 0 1.8.7 2.8 1.6 2.8.6 0 1.2-.4 1.9-1.6l1-1.7-1.3-2c-.6-.9-1.1-1.3-1.7-1.3Z"
    />
  ),

  wordpress: (
    <>
      <circle cx="12" cy="12" r="10" fill="#21759B" />
      <path
        fill="#fff"
        d="M4.4 12c0 3 1.7 5.6 4.3 6.8L5 9.3c-.4.9-.6 1.8-.6 2.7Zm12.8-.4c0-.9-.3-1.6-.6-2.1-.4-.6-.8-1.2-.8-1.8 0-.7.5-1.4 1.3-1.4h.1A7.5 7.5 0 0 0 12 4.4a7.6 7.6 0 0 0-6.3 3.4h.5c.8 0 2-.1 2-.1.4 0 .5.6.1.6l-.9.1 2.7 8 1.6-4.8-1.1-3.2-.8-.1c-.4 0-.4-.6.1-.6 0 0 1.2.1 1.9.1.8 0 2-.1 2-.1.4 0 .5.6.1.6l-.9.1 2.6 7.9.8-2.5c.4-1.1.6-1.9.6-2.6Zm-5.1 1-2.2 6.4c.7.2 1.4.3 2.1.3.9 0 1.7-.1 2.4-.4l-2.3-6.3Zm6.6-4.3c0 .8-.1 1.6-.6 2.7l-2.4 7A7.6 7.6 0 0 0 19.6 12c0-1.4-.3-2.6-.9-3.7Z"
      />
    </>
  ),

  shopify: (
    <>
      <path
        fill="#95BF47"
        d="M15.9 5.6c-.1-.1-.2-.1-.3-.1l-1 .2c-.4-1.3-1.2-2.4-2.5-2.4h-.1c-.4-.5-.9-.7-1.3-.7-3 0-4.4 3.8-4.9 5.7l-2 .6c-.6.2-.6.2-.7.8L2.6 20l9.2 1.7 1.4-16.4-.4.1c.1-.6 0-1.1-.2-1.4.5.2.9.8 1.1 1.7l1-.2.2.1Z"
      />
      <path fill="#5E8E3E" d="m15.6 5.5-3.8 16.2 5-1.1-1.9-15c0-.1-.1-.1-.2-.1h.9Z" />
      <path
        fill="#fff"
        d="m13.4 9.6-.6 1.8s-.6-.3-1.3-.3c-1 0-1.1.6-1.1.8 0 1.1 2.6 1.5 2.6 3.8 0 1.8-1.1 3-2.7 3-1.9 0-2.9-1.2-2.9-1.2l.5-1.7s1 .9 1.9.9c.6 0 .8-.4.8-.7 0-1.4-2.1-1.5-2.1-3.6 0-1.7 1.3-3.5 3.9-3.5.9 0 1.4.3 1.4.3l-.4.4Z"
      />
    </>
  ),

  canva: (
    <>
      <circle cx="12" cy="12" r="10" fill="#00C4CC" />
      <path
        fill="#fff"
        d="M15.4 14.3c-.2 0-.3.1-.4.3-.6 1.2-1.6 2-2.6 2-1.2 0-2-1-2-2.7 0-2.8 1.6-5.1 3-5.1.6 0 .9.4.9 1 0 .5-.2 1-.4 1.4-.1.2 0 .4.2.3.9-.1 1.7-.9 1.7-1.9 0-1.1-1-2-2.4-2-2.8 0-5.2 2.8-5.2 6 0 2.5 1.5 4.2 3.8 4.2 1.9 0 3.4-1.4 3.7-3 .1-.4-.1-.5-.3-.5Z"
      />
    </>
  ),

  googleads: (
    <>
      <path
        fill="#FBBC04"
        d="M2.9 16.3 9.6 4.7c.5-.9 1.7-1.2 2.6-.7.9.5 1.2 1.7.7 2.6L6.2 18.2c-.5.9-1.7 1.2-2.6.7-.9-.5-1.2-1.7-.7-2.6Z"
      />
      <path
        fill="#4285F4"
        d="M21.1 16.3 14.4 4.7c-.5-.9-1.7-1.2-2.6-.7-.9.5-1.2 1.7-.7 2.6l6.7 11.6c.5.9 1.7 1.2 2.6.7.9-.5 1.2-1.7.7-2.6Z"
      />
      <circle cx="4.8" cy="17.5" r="2.7" fill="#34A853" />
    </>
  ),

  analytics: (
    <>
      <rect x="16" y="3" width="5.2" height="18" rx="2.6" fill="#F9AB00" />
      <rect x="9.4" y="9" width="5.2" height="12" rx="2.6" fill="#E37400" />
      <circle cx="5.4" cy="18.2" r="2.8" fill="#E37400" />
    </>
  ),

  searchconsole: (
    <>
      <circle cx="10.5" cy="10.5" r="6.4" fill="none" stroke="#4285F4" strokeWidth="2" />
      <path d="m15.4 15.4 4.6 4.6" stroke="#4285F4" strokeWidth="2.3" strokeLinecap="round" />
      <path
        d="M8 12.6v-1.9M10.5 12.6V8.4M13 12.6V9.8"
        stroke="#34A853"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </>
  ),

  excel: (
    <>
      <rect x="2.5" y="4" width="19" height="16" rx="2" fill="#217346" />
      <path d="M7.4 8.6 13 15.4M13 8.6l-5.6 6.8" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M15.6 8.8h4M15.6 12h4M15.6 15.2h4"
        stroke="#fff"
        strokeOpacity=".55"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </>
  ),

  splunk: (
    <>
      <circle cx="12" cy="12" r="10" fill="#111827" />
      <path
        d="M7.8 7.4 15 12l-7.2 4.6"
        fill="none"
        stroke="#65A637"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),

  nginx: (
    <>
      <path d="M12 1.8 21.2 7v10L12 22.2 2.8 17V7Z" fill="#009639" />
      <path
        d="M8.7 16.2V8.1l6.6 7.6V7.9"
        fill="none"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),

  linux: (
    <>
      <path
        fill="#1b1b1b"
        d="M12 1.8c-2.3 0-3.8 1.8-3.8 4.3 0 1 .1 1.8-.2 2.5-.4 1-1.5 1.9-2.1 3.3-.5 1.1-.6 2.3-1 3.1-.4.8-1 1.4-1 2.1 0 .9.7 1.2 1.8 1.4 1 .2 2.2.4 3 1.1.7.5 1.6 1.1 3.3 1.1s2.6-.6 3.3-1.1c.8-.7 2-.9 3-1.1 1.1-.2 1.8-.5 1.8-1.4 0-.7-.6-1.3-1-2.1-.4-.8-.5-2-1-3.1-.6-1.4-1.7-2.3-2.1-3.3-.3-.7-.2-1.5-.2-2.5 0-2.5-1.5-4.3-3.8-4.3Z"
      />
      <ellipse cx="9.9" cy="6.9" rx="1.15" ry="1.6" fill="#fff" />
      <ellipse cx="14.1" cy="6.9" rx="1.15" ry="1.6" fill="#fff" />
      <circle cx="10.15" cy="7.15" r=".62" fill="#111" />
      <circle cx="13.85" cy="7.15" r=".62" fill="#111" />
      <path fill="#FCC624" d="M12 8.5c1 0 1.9.7 1.9 1.2s-.9 1.2-1.9 1.2-1.9-.7-1.9-1.2.9-1.2 1.9-1.2Z" />
      <path
        fill="#FCC624"
        d="M9.1 18.6c.6 1 1.7 1.6 2.9 1.6s2.3-.6 2.9-1.6c-.8-.6-1.9-.9-2.9-.9s-2.1.3-2.9.9Z"
      />
    </>
  ),

  google: (
    <>
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.75-.07-1.47-.19-2.16H12v4.09h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.89-1.74 2.98-4.3 2.98-7.45Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.96-.9 6.62-2.42l-3.24-2.5c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H3.06v2.58A10 10 0 0 0 12 22Z"
      />
      <path fill="#FBBC05" d="M6.41 13.92a5.99 5.99 0 0 1 0-3.84V7.5H3.06a10 10 0 0 0 0 9l3.35-2.58Z" />
      <path
        fill="#EA4335"
        d="M12 5.96c1.47 0 2.79.5 3.83 1.5l2.87-2.87C16.95 2.99 14.7 2 12 2A10 10 0 0 0 3.06 7.5l3.35 2.58C7.2 7.72 9.4 5.96 12 5.96Z"
      />
    </>
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
  openai: "OpenAI",
  keras: "Keras",
  typescript: "TypeScript",
  nextjs: "Next.js",
  aws: "AWS",
  terraform: "Terraform",
  meta: "Meta",
  wordpress: "WordPress",
  shopify: "Shopify",
  canva: "Canva",
  googleads: "Google Ads",
  analytics: "Google Analytics",
  searchconsole: "Search Console",
  excel: "Microsoft Excel",
  splunk: "Splunk",
  nginx: "Nginx",
  linux: "Linux",
  google: "Google",
  javascript: "JavaScript",
  java: "Java",
  cplusplus: "C++",
  angular: "Angular",
  vue: "Vue.js",
  spring: "Spring",
  redis: "Redis",
  firebase: "Firebase",
  github: "GitHub",
  azure: "Microsoft Azure",
  googlecloud: "Google Cloud",
  vercel: "Vercel",
  netlify: "Netlify",
  cloudflare: "Cloudflare",
  digitalocean: "DigitalOcean",
  opencv: "OpenCV",
  numpy: "NumPy",
  sqlite: "SQLite",
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
