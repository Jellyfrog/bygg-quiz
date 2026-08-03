/* Ikoner: byggmaterial, infästningar och isolering. */
window.BQ_ICONS = Object.assign(window.BQ_ICONS || {}, {

  traskruv: `<svg viewBox="0 0 120 120">
    <g transform="rotate(20 60 60)">
      <path d="M42 14 h36 v8 H42 Z" fill="#8f9aa6"/>
      <path d="M42 22 h36 l-8 10 H50 Z" fill="#b8c2cc"/>
      <path d="M52 12 h16 v6 h-16 Z" fill="#5d6a76"/>
      <path d="M54 32 h12 v46 l-6 22 -6 -22 Z" fill="#c9d2da"/>
      <g fill="#8f9aa6">
        <path d="M52 38 h16 l-4 5 h-16 Z"/><path d="M52 48 h16 l-4 5 h-16 Z"/>
        <path d="M52 58 h16 l-4 5 h-16 Z"/><path d="M52 68 h14 l-4 5 h-14 Z"/>
        <path d="M53 78 h11 l-4 5 h-11 Z"/>
      </g>
    </g>
  </svg>`,

  gipsskruv: `<svg viewBox="0 0 120 120">
    <g transform="rotate(20 60 60)">
      <path d="M40 16 q20 -10 40 0 l-10 12 H50 Z" fill="#2f3a45"/>
      <path d="M54 16 h12 v5 H54 Z" fill="#7c8894"/>
      <path d="M54 28 h12 v48 l-6 24 -6 -24 Z" fill="#3a3f45"/>
      <g fill="#5d6a76">
        <path d="M52 34 h16 l-4 5 h-16 Z"/><path d="M52 44 h16 l-4 5 h-16 Z"/>
        <path d="M52 54 h16 l-4 5 h-16 Z"/><path d="M52 64 h15 l-4 5 h-15 Z"/>
        <path d="M53 74 h12 l-4 5 h-12 Z"/>
      </g>
    </g>
  </svg>`,

  spik: `<svg viewBox="0 0 120 120">
    <g transform="rotate(15 60 60)">
      <ellipse cx="60" cy="20" rx="20" ry="7" fill="#b8c2cc"/>
      <path d="M40 20 q20 8 40 0 v3 q-20 8 -40 0 Z" fill="#8f9aa6"/>
      <path d="M55 24 h10 v62 l-5 20 -5 -20 Z" fill="#c9d2da"/>
      <path d="M60 24 v82" stroke="#8f9aa6" stroke-width="1.5"/>
    </g>
  </svg>`,

  mutter: `<svg viewBox="0 0 120 120">
    <path d="M60 14 L102 38 v44 L60 106 L18 82 V38 Z" fill="#8f9aa6"/>
    <path d="M60 14 L102 38 v44 L60 106 L18 82 V38 Z" fill="none" stroke="#6d7885" stroke-width="3"/>
    <circle cx="60" cy="60" r="20" fill="#c9d2da"/>
    <circle cx="60" cy="60" r="20" fill="none" stroke="#6d7885" stroke-width="3"/>
    <circle cx="60" cy="60" r="20" fill="none" stroke="#8f9aa6" stroke-width="2" stroke-dasharray="3 4"/>
  </svg>`,

  bricka: `<svg viewBox="0 0 120 120">
    <circle cx="60" cy="60" r="42" fill="#b8c2cc"/>
    <circle cx="60" cy="60" r="42" fill="none" stroke="#8f9aa6" stroke-width="3"/>
    <circle cx="60" cy="60" r="18" fill="#f4f7fa"/>
    <circle cx="60" cy="60" r="18" fill="none" stroke="#8f9aa6" stroke-width="3"/>
    <path d="M28 34 a42 42 0 0 1 24 -14" fill="none" stroke="#e6ecf1" stroke-width="5"/>
  </svg>`,

  bult: `<svg viewBox="0 0 120 120">
    <g transform="rotate(-30 60 60)">
      <path d="M60 8 L86 22 v28 L60 64 L34 50 V22 Z" fill="#8f9aa6"/>
      <circle cx="60" cy="36" r="9" fill="#6d7885"/>
      <rect x="50" y="56" width="20" height="52" fill="#c9d2da"/>
      <g fill="#8f9aa6">
        <path d="M48 62 h24 v4 H48 Z"/><path d="M48 72 h24 v4 H48 Z"/>
        <path d="M48 82 h24 v4 H48 Z"/><path d="M48 92 h24 v4 H48 Z"/><path d="M48 102 h24 v4 H48 Z"/>
      </g>
    </g>
  </svg>`,

  expander: `<svg viewBox="0 0 120 120">
    <rect x="18" y="46" width="84" height="28" rx="4" fill="#c9d2da" stroke="#8f9aa6" stroke-width="2"/>
    <path d="M18 46 h20 v28 H18 Z" fill="#8f9aa6"/>
    <path d="M38 50 h34 v20 H38 Z" fill="#e6ecf1"/>
    <path d="M38 50 v20 M50 50 v20 M62 50 v20" stroke="#8f9aa6" stroke-width="2"/>
    <path d="M72 46 h14 l16 14 -16 14 H72 Z" fill="#b8c2cc"/>
    <path d="M86 40 q10 20 0 40" fill="none" stroke="#6d7885" stroke-width="3"/>
    <path d="M8 52 h10 v16 H8 Z" fill="#6d7885"/>
  </svg>`,

  gipsskiva: `<svg viewBox="0 0 120 120">
    <path d="M14 28 h74 l18 10 v54 l-18 -10 H14 Z" fill="#f0eee6" stroke="#c9c3ad" stroke-width="2"/>
    <path d="M88 28 v10 l18 10 -18 -10" fill="#e0dccc" stroke="#c9c3ad" stroke-width="2"/>
    <path d="M88 38 v54" stroke="#c9c3ad" stroke-width="2"/>
    <path d="M14 82 h74" stroke="#c9c3ad" stroke-width="2"/>
    <path d="M22 40 h40 M22 50 h56 M22 60 h30" stroke="#d8d2c0" stroke-width="3"/>
    <path d="M14 28 h74 v6 H14 Z" fill="#dcd6c2"/>
  </svg>`,

  regel: `<svg viewBox="0 0 120 120">
    <path d="M10 40 h72 l24 -14 v46 l-24 14 H10 Z" fill="#d9a95e" stroke="#a97f3d" stroke-width="2"/>
    <path d="M82 40 l24 -14" stroke="#a97f3d" stroke-width="2"/>
    <path d="M82 40 v46" stroke="#a97f3d" stroke-width="2"/>
    <path d="M18 48 q30 6 60 0 M18 60 q30 8 60 0 M18 72 q30 6 60 0" fill="none" stroke="#bd8f4b" stroke-width="2"/>
    <path d="M10 40 h72 v-8 l24 -6 v6 l-24 14" fill="#e8c184" stroke="#a97f3d" stroke-width="2"/>
  </svg>`,

  limtrabalk: `<svg viewBox="0 0 120 120">
    <path d="M8 34 h80 l24 -12 v52 l-24 12 H8 Z" fill="#e0b878" stroke="#a97f3d" stroke-width="2"/>
    <g stroke="#b98f4f" stroke-width="2">
      <path d="M8 42 h80 M8 50 h80 M8 58 h80 M8 66 h80 M8 74 h80"/>
    </g>
    <path d="M88 34 v52" stroke="#a97f3d" stroke-width="2"/>
    <path d="M88 34 l24 -12 v52 l-24 12" fill="#c99f5f" stroke="#a97f3d" stroke-width="2"/>
  </svg>`,

  plywood: `<svg viewBox="0 0 120 120">
    <path d="M12 44 h70 l26 -14 v40 l-26 14 H12 Z" fill="#e8c184" stroke="#a97f3d" stroke-width="2"/>
    <path d="M82 44 v40" stroke="#a97f3d" stroke-width="2"/>
    <g stroke="#a97f3d" stroke-width="1.5">
      <path d="M82 50 l26 -14 M82 58 l26 -14 M82 66 l26 -14 M82 74 l26 -14"/>
    </g>
    <path d="M20 56 q26 -6 52 2 M20 68 q26 -6 52 2" fill="none" stroke="#c99f5f" stroke-width="2"/>
  </svg>`,

  osb: `<svg viewBox="0 0 120 120">
    <path d="M12 40 h72 l24 -12 v44 l-24 12 H12 Z" fill="#d6a860" stroke="#a97f3d" stroke-width="2"/>
    <g fill="#c1904a" opacity="0.85">
      <rect x="18" y="46" width="22" height="7" rx="1" transform="rotate(-12 29 49)"/>
      <rect x="44" y="44" width="26" height="7" rx="1" transform="rotate(9 57 47)"/>
      <rect x="20" y="60" width="28" height="7" rx="1" transform="rotate(6 34 63)"/>
      <rect x="52" y="58" width="24" height="7" rx="1" transform="rotate(-14 64 61)"/>
      <rect x="24" y="74" width="24" height="7" rx="1" transform="rotate(-6 36 77)"/>
      <rect x="52" y="74" width="26" height="7" rx="1" transform="rotate(11 65 77)"/>
    </g>
    <path d="M84 40 v44" stroke="#a97f3d" stroke-width="2"/>
  </svg>`,

  cementsack: `<svg viewBox="0 0 120 120">
    <path d="M30 22 q30 -8 60 0 v78 q-30 8 -60 0 Z" fill="#c9c3ad" stroke="#a29a80" stroke-width="2"/>
    <path d="M30 22 q30 -8 60 0 q-30 10 -60 0 Z" fill="#ddd7c2"/>
    <rect x="38" y="44" width="44" height="24" rx="3" fill="#f4f2e8"/>
    <path d="M44 52 h32 M44 60 h24" stroke="#8a8264" stroke-width="3"/>
    <path d="M34 78 q26 8 52 0" fill="none" stroke="#a29a80" stroke-width="2"/>
    <path d="M34 88 q26 8 52 0" fill="none" stroke="#a29a80" stroke-width="2"/>
  </svg>`,

  armeringsjarn: `<svg viewBox="0 0 120 120">
    <g stroke="#8a6a55" stroke-width="10" stroke-linecap="round" fill="none">
      <path d="M10 40 h100"/><path d="M10 76 h100"/>
    </g>
    <g stroke="#6d5344" stroke-width="3">
      <path d="M18 33 l8 14 M34 33 l8 14 M50 33 l8 14 M66 33 l8 14 M82 33 l8 14 M98 33 l8 14"/>
      <path d="M18 69 l8 14 M34 69 l8 14 M50 69 l8 14 M66 69 l8 14 M82 69 l8 14 M98 69 l8 14"/>
    </g>
  </svg>`,

  armeringsnat: `<svg viewBox="0 0 120 120">
    <g stroke="#8a6a55" stroke-width="6" stroke-linecap="round">
      <path d="M14 26 h92 M14 50 h92 M14 74 h92 M14 98 h92"/>
    </g>
    <g stroke="#6d5344" stroke-width="6" stroke-linecap="round">
      <path d="M26 14 v92 M50 14 v92 M74 14 v92 M98 14 v92"/>
    </g>
    <g fill="#5c4438">
      <circle cx="26" cy="26" r="3"/><circle cx="50" cy="50" r="3"/><circle cx="74" cy="74" r="3"/>
    </g>
  </svg>`,

  tegel: `<svg viewBox="0 0 120 120">
    <g fill="#b5563f" stroke="#8c3f2d" stroke-width="2">
      <rect x="8" y="30" width="46" height="20" rx="2"/>
      <rect x="60" y="30" width="46" height="20" rx="2"/>
      <rect x="-8" y="54" width="46" height="20" rx="2"/>
      <rect x="44" y="54" width="46" height="20" rx="2"/>
      <rect x="96" y="54" width="30" height="20" rx="2"/>
      <rect x="8" y="78" width="46" height="20" rx="2"/>
      <rect x="60" y="78" width="46" height="20" rx="2"/>
    </g>
    <g stroke="#e6e0d4" stroke-width="3">
      <path d="M0 52 h120 M0 76 h120"/>
    </g>
  </svg>`,

  lecablock: `<svg viewBox="0 0 120 120">
    <path d="M12 42 h72 l22 -12 v46 l-22 12 H12 Z" fill="#9a958c" stroke="#6f6a62" stroke-width="2"/>
    <path d="M84 42 v46" stroke="#6f6a62" stroke-width="2"/>
    <path d="M84 42 l22 -12" stroke="#6f6a62" stroke-width="2"/>
    <g fill="#7c776f">
      <rect x="24" y="52" width="16" height="26" rx="3"/>
      <rect x="48" y="52" width="16" height="26" rx="3"/>
    </g>
    <g fill="#b8b3a8" opacity="0.8">
      <circle cx="18" cy="60" r="2.5"/><circle cx="44" cy="48" r="2.5"/><circle cx="70" cy="62" r="2.5"/>
      <circle cx="30" cy="84" r="2.5"/><circle cx="74" cy="82" r="2.5"/><circle cx="60" cy="70" r="2.5"/>
    </g>
  </svg>`,

  mineralull: `<svg viewBox="0 0 120 120">
    <path d="M12 40 h72 l22 -12 v44 l-22 12 H12 Z" fill="#f0d24a" stroke="#c9a91f" stroke-width="2"/>
    <path d="M84 40 v44" stroke="#c9a91f" stroke-width="2"/>
    <path d="M84 40 l22 -12" stroke="#c9a91f" stroke-width="2"/>
    <g stroke="#d6b62c" stroke-width="2" fill="none">
      <path d="M16 48 q14 6 28 0 t28 0 M16 58 q14 6 28 0 t28 0 M16 68 q14 6 28 0 t28 0 M16 78 q14 6 28 0 t28 0"/>
    </g>
    <path d="M12 40 h72 v-4 h-72 Z" fill="#f7e28a"/>
  </svg>`,

  losull: `<svg viewBox="0 0 120 120">
    <path d="M8 96 h104 v10 H8 Z" fill="#b8c2cc"/>
    <g fill="#e9dfc0" stroke="#cdbf94" stroke-width="1.5">
      <circle cx="30" cy="86" r="13"/><circle cx="52" cy="90" r="11"/><circle cx="74" cy="86" r="14"/>
      <circle cx="94" cy="92" r="10"/><circle cx="42" cy="74" r="12"/><circle cx="64" cy="72" r="13"/>
      <circle cx="86" cy="72" r="10"/><circle cx="26" cy="66" r="9"/>
    </g>
    <g fill="#e9dfc0" opacity="0.85">
      <circle cx="52" cy="52" r="6"/><circle cx="76" cy="48" r="5"/><circle cx="36" cy="44" r="4"/>
      <circle cx="64" cy="34" r="4"/>
    </g>
    <path d="M92 20 l-10 22" stroke="#8f9aa6" stroke-width="6" stroke-linecap="round"/>
  </svg>`,

  cellplast: `<svg viewBox="0 0 120 120">
    <path d="M12 40 h72 l22 -12 v44 l-22 12 H12 Z" fill="#f7f7f4" stroke="#c3c3bd" stroke-width="2"/>
    <path d="M84 40 v44" stroke="#c3c3bd" stroke-width="2"/>
    <path d="M84 40 l22 -12" stroke="#c3c3bd" stroke-width="2"/>
    <g fill="none" stroke="#dcdcd6" stroke-width="1.5">
      <circle cx="24" cy="52" r="5"/><circle cx="38" cy="62" r="6"/><circle cx="54" cy="50" r="5"/>
      <circle cx="68" cy="60" r="6"/><circle cx="30" cy="74" r="5"/><circle cx="48" cy="76" r="6"/>
      <circle cx="70" cy="76" r="5"/><circle cx="58" cy="64" r="4"/>
    </g>
    <path d="M84 40 l22 -12 v10 l-22 12 Z" fill="#e8e8e2"/>
  </svg>`,

  xps: `<svg viewBox="0 0 120 120">
    <path d="M12 40 h72 l22 -12 v44 l-22 12 H12 Z" fill="#e58fb0" stroke="#b86183" stroke-width="2"/>
    <path d="M84 40 v44" stroke="#b86183" stroke-width="2"/>
    <path d="M84 40 l22 -12 v44 l-22 12" fill="#d3799c" stroke="#b86183" stroke-width="2"/>
    <g stroke="#d3799c" stroke-width="2">
      <path d="M12 52 h72 M12 64 h72 M12 76 h72"/>
    </g>
    <path d="M12 40 h72 v-5 h-72 Z" fill="#f0a8c2"/>
  </svg>`,

  angsparr: `<svg viewBox="0 0 120 120">
    <path d="M14 20 q16 10 0 20 t0 20 t0 20 t0 20" fill="none" stroke="#9fd0ea" stroke-width="0"/>
    <path d="M18 16 h84 v88 H18 Z" fill="#bfe0f2" opacity="0.6"/>
    <path d="M18 16 h84 v88 H18 Z" fill="none" stroke="#5fa8cf" stroke-width="2"/>
    <g stroke="#7ec0e0" stroke-width="2" fill="none">
      <path d="M26 16 v88 M42 16 v88 M58 16 v88 M74 16 v88 M90 16 v88"/>
    </g>
    <path d="M8 30 q12 -8 12 8 t12 8" fill="none" stroke="#5fa8cf" stroke-width="3"/>
    <path d="M102 76 q10 8 10 -6" fill="none" stroke="#5fa8cf" stroke-width="3"/>
    <g fill="#3a8fbd">
      <rect x="34" y="52" width="52" height="14" rx="7" opacity="0.8"/>
    </g>
  </svg>`,

  vindskydd: `<svg viewBox="0 0 120 120">
    <path d="M20 14 h80 v92 H20 Z" fill="#4a5560"/>
    <path d="M20 14 h80 v92 H20 Z" fill="none" stroke="#2f3a45" stroke-width="2"/>
    <g stroke="#6d7885" stroke-width="2">
      <path d="M20 30 h80 M20 46 h80 M20 62 h80 M20 78 h80 M20 94 h80"/>
    </g>
    <path d="M32 22 h56 v18 H32 Z" fill="#e0a21c" opacity="0.9"/>
    <path d="M8 20 q14 40 0 84" fill="none" stroke="#8f9aa6" stroke-width="3"/>
    <path d="M100 66 q12 10 12 -8" fill="none" stroke="#2f3a45" stroke-width="3"/>
  </svg>`,

  takpapp: `<svg viewBox="0 0 120 120">
    <g transform="rotate(-14 60 60)">
      <rect x="20" y="34" width="80" height="52" rx="6" fill="#3a3f45"/>
      <ellipse cx="20" cy="60" rx="10" ry="26" fill="#4a5560"/>
      <ellipse cx="20" cy="60" rx="4" ry="11" fill="#2f3a45"/>
      <path d="M100 34 a10 26 0 0 1 0 52" fill="#2f3a45"/>
      <g stroke="#5d6a76" stroke-width="2">
        <path d="M40 36 v48 M60 36 v48 M80 36 v48"/>
      </g>
    </g>
  </svg>`,

  takpannor: `<svg viewBox="0 0 120 120">
    <g fill="#b5563f" stroke="#8c3f2d" stroke-width="2">
      <path d="M10 34 q10 -10 20 0 v14 q-10 -10 -20 0 Z"/>
      <path d="M34 34 q10 -10 20 0 v14 q-10 -10 -20 0 Z"/>
      <path d="M58 34 q10 -10 20 0 v14 q-10 -10 -20 0 Z"/>
      <path d="M82 34 q10 -10 20 0 v14 q-10 -10 -20 0 Z"/>
      <path d="M10 56 q10 -10 20 0 v14 q-10 -10 -20 0 Z"/>
      <path d="M34 56 q10 -10 20 0 v14 q-10 -10 -20 0 Z"/>
      <path d="M58 56 q10 -10 20 0 v14 q-10 -10 -20 0 Z"/>
      <path d="M82 56 q10 -10 20 0 v14 q-10 -10 -20 0 Z"/>
      <path d="M10 78 q10 -10 20 0 v14 q-10 -10 -20 0 Z"/>
      <path d="M34 78 q10 -10 20 0 v14 q-10 -10 -20 0 Z"/>
      <path d="M58 78 q10 -10 20 0 v14 q-10 -10 -20 0 Z"/>
      <path d="M82 78 q10 -10 20 0 v14 q-10 -10 -20 0 Z"/>
    </g>
  </svg>`,

  fogskum: `<svg viewBox="0 0 120 120">
    <rect x="38" y="30" width="44" height="70" rx="8" fill="#e0a21c"/>
    <rect x="38" y="46" width="44" height="34" fill="#f4f7fa"/>
    <path d="M44 54 h32 M44 64 h24" stroke="#c78c14" stroke-width="4"/>
    <rect x="48" y="18" width="24" height="14" rx="4" fill="#8f9aa6"/>
    <path d="M60 18 v-8" stroke="#4a5560" stroke-width="6" stroke-linecap="round"/>
    <path d="M60 8 q14 -4 20 6" fill="none" stroke="#4a5560" stroke-width="5" stroke-linecap="round"/>
    <g fill="#f0e3c2">
      <circle cx="86" cy="18" r="7"/><circle cx="96" cy="24" r="6"/><circle cx="92" cy="32" r="5"/>
    </g>
  </svg>`,

  silikon: `<svg viewBox="0 0 120 120">
    <g transform="rotate(-16 60 60)">
      <rect x="18" y="42" width="66" height="34" rx="4" fill="#c9d2da" stroke="#8f9aa6" stroke-width="2"/>
      <rect x="24" y="48" width="54" height="22" rx="2" fill="#1b73b8"/>
      <path d="M30 54 h40 M30 62 h28" stroke="#9fd0ea" stroke-width="3"/>
      <path d="M84 48 l18 8 -18 8 Z" fill="#8f9aa6"/>
      <path d="M100 52 l12 4 -12 4 Z" fill="#e0a21c"/>
      <circle cx="116" cy="56" r="4" fill="#f4f7fa"/>
    </g>
  </svg>`,

  spackel: `<svg viewBox="0 0 120 120">
    <path d="M28 34 h64 v60 a6 6 0 0 1 -6 6 H34 a6 6 0 0 1 -6 -6 Z" fill="#e6e9ec" stroke="#a9b3bc" stroke-width="2"/>
    <path d="M24 26 h72 v10 H24 Z" fill="#b8c2cc" stroke="#8f9aa6" stroke-width="2"/>
    <rect x="36" y="48" width="48" height="26" rx="3" fill="#1b73b8"/>
    <path d="M42 56 h36 M42 66 h22" stroke="#9fd0ea" stroke-width="4"/>
    <path d="M40 20 q20 -8 40 0" fill="none" stroke="#8f9aa6" stroke-width="4"/>
  </svg>`,

  murbruk: `<svg viewBox="0 0 120 120">
    <path d="M22 46 h76 l-8 46 a8 8 0 0 1 -8 6 H38 a8 8 0 0 1 -8 -6 Z" fill="#8f9aa6"/>
    <ellipse cx="60" cy="46" rx="38" ry="10" fill="#b8c2cc"/>
    <ellipse cx="60" cy="48" rx="30" ry="7" fill="#d8d2c0"/>
    <path d="M40 34 l14 12" stroke="#6d7885" stroke-width="6" stroke-linecap="round"/>
    <path d="M34 24 l10 12 -14 4 Z" fill="#c9d2da"/>
    <g fill="#c9c3ad">
      <circle cx="52" cy="47" r="2"/><circle cx="66" cy="49" r="2"/><circle cx="74" cy="45" r="2"/>
    </g>
  </svg>`,

  makadam: `<svg viewBox="0 0 120 120">
    <g fill="#8f9aa6" stroke="#6d7885" stroke-width="1.5">
      <path d="M18 92 l12 -14 16 6 -6 14 Z"/>
      <path d="M46 96 l10 -16 18 4 -4 14 Z"/>
      <path d="M76 94 l12 -12 14 8 -8 12 Z"/>
      <path d="M28 72 l14 -12 12 8 -8 12 Z"/>
      <path d="M58 68 l14 -10 12 10 -10 10 Z"/>
      <path d="M86 70 l12 -8 8 12 -12 6 Z"/>
      <path d="M14 74 l10 -8 6 12 -12 4 Z"/>
      <path d="M44 52 l12 -8 10 10 -12 8 Z"/>
      <path d="M72 50 l12 -6 6 12 -12 4 Z"/>
    </g>
  </svg>`,

  drankerror: `<svg viewBox="0 0 120 120">
    <g transform="rotate(-8 60 60)">
      <rect x="10" y="46" width="100" height="30" rx="6" fill="#3a3f45"/>
      <g fill="#5d6a76">
        <rect x="18" y="46" width="8" height="30"/><rect x="34" y="46" width="8" height="30"/>
        <rect x="50" y="46" width="8" height="30"/><rect x="66" y="46" width="8" height="30"/>
        <rect x="82" y="46" width="8" height="30"/><rect x="98" y="46" width="8" height="30"/>
      </g>
      <g fill="#2f3a45">
        <circle cx="30" cy="52" r="3"/><circle cx="46" cy="52" r="3"/><circle cx="62" cy="52" r="3"/>
        <circle cx="78" cy="52" r="3"/><circle cx="94" cy="52" r="3"/>
      </g>
      <ellipse cx="10" cy="61" rx="6" ry="15" fill="#4a5560"/>
    </g>
  </svg>`,

  markduk: `<svg viewBox="0 0 120 120">
    <path d="M14 30 q22 12 44 0 t44 0 v58 q-22 12 -44 0 t-44 0 Z" fill="#5d6a76"/>
    <g stroke="#8f9aa6" stroke-width="1.5" opacity="0.8">
      <path d="M14 44 q22 12 44 0 t44 0 M14 58 q22 12 44 0 t44 0 M14 72 q22 12 44 0 t44 0"/>
      <path d="M28 32 v56 M42 34 v56 M56 36 v56 M70 34 v56 M84 32 v56"/>
    </g>
    <path d="M96 24 q14 6 6 18" fill="none" stroke="#8f9aa6" stroke-width="3"/>
  </svg>`,

  kantsten: `<svg viewBox="0 0 120 120">
    <path d="M10 56 h76 l22 -12 v34 l-22 12 H10 Z" fill="#9a958c" stroke="#6f6a62" stroke-width="2"/>
    <path d="M86 56 v34" stroke="#6f6a62" stroke-width="2"/>
    <path d="M10 56 h76 v-6 l22 -12 v6" fill="#b0aba1" stroke="#6f6a62" stroke-width="2"/>
    <path d="M14 78 h68" stroke="#8a857c" stroke-width="2"/>
    <path d="M16 96 h90" stroke="#c9c3ad" stroke-width="6"/>
  </svg>`,

  syllisolering: `<svg viewBox="0 0 120 120">
    <path d="M10 62 h100 v10 H10 Z" fill="#3ea55c"/>
    <path d="M10 62 h100 v10 H10 Z" fill="none" stroke="#2e7f47" stroke-width="2"/>
    <g stroke="#2e7f47" stroke-width="1.5">
      <path d="M24 62 v10 M40 62 v10 M56 62 v10 M72 62 v10 M88 62 v10"/>
    </g>
    <path d="M18 42 h84 v20 H18 Z" fill="#d9a95e" stroke="#a97f3d" stroke-width="2"/>
    <path d="M10 82 h100 v14 H10 Z" fill="#c9c3ad" stroke="#a29a80" stroke-width="2"/>
    <g fill="#a29a80"><circle cx="30" cy="89" r="2"/><circle cx="60" cy="89" r="2"/><circle cx="90" cy="89" r="2"/></g>
  </svg>`,

  gipsband: `<svg viewBox="0 0 120 120">
    <circle cx="58" cy="60" r="40" fill="#f0eee6" stroke="#c9c3ad" stroke-width="2"/>
    <circle cx="58" cy="60" r="14" fill="#e0dccc" stroke="#c9c3ad" stroke-width="2"/>
    <g stroke="#d8d2c0" stroke-width="1.5" fill="none">
      <circle cx="58" cy="60" r="22"/><circle cx="58" cy="60" r="30"/>
    </g>
    <path d="M96 46 q14 10 12 30 l-16 -4 q2 -14 -8 -20 Z" fill="#f4f2e8" stroke="#c9c3ad" stroke-width="2"/>
    <g stroke="#c9c3ad" stroke-width="1"><path d="M96 52 l10 8 M94 60 l12 6"/></g>
  </svg>`

});
