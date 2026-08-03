/* Ikoner: VVS, ventilation och el i flerbostadshus. */
window.BQ_ICONS = Object.assign(window.BQ_ICONS || {}, {

  avloppsror: `<svg viewBox="0 0 120 120">
    <path d="M14 44 h58 v32 H14 Z" fill="#2f3a45"/>
    <path d="M8 40 h14 v40 H8 Z" fill="#3a3f45"/>
    <path d="M72 40 h12 v40 H72 Z" fill="#3a3f45"/>
    <path d="M84 44 h22 v32 H84 Z" fill="#2f3a45"/>
    <ellipse cx="106" cy="60" rx="6" ry="16" fill="#4a5560"/>
    <path d="M24 50 h44" stroke="#4a5560" stroke-width="2"/>
    <path d="M60 76 v26 h20" fill="none" stroke="#2f3a45" stroke-width="20" stroke-linejoin="round"/>
    <path d="M60 76 v26 h20" fill="none" stroke="#3f4a55" stroke-width="4" stroke-linejoin="round"/>
  </svg>`,

  golvbrunn: `<svg viewBox="0 0 120 120">
    <path d="M6 40 q54 -14 108 0 v6 q-54 -12 -108 0 Z" fill="#dfe6ec"/>
    <path d="M6 46 q54 -12 108 0 v54 H6 Z" fill="#e6e9ec"/>
    <ellipse cx="60" cy="56" rx="34" ry="16" fill="#8f9aa6"/>
    <ellipse cx="60" cy="56" rx="26" ry="11" fill="#4a5560"/>
    <g stroke="#c9d2da" stroke-width="3">
      <path d="M40 56 h40 M48 49 h24 M48 63 h24"/>
    </g>
    <path d="M52 68 v22 h22" fill="none" stroke="#2f3a45" stroke-width="14" stroke-linejoin="round"/>
    <path d="M74 84 h30" stroke="#2f3a45" stroke-width="14"/>
  </svg>`,

  vattenlas: `<svg viewBox="0 0 120 120">
    <path d="M46 10 v34" stroke="#b8c2cc" stroke-width="16"/>
    <path d="M46 44 q0 30 22 30 q22 0 22 -30 v-8" fill="none" stroke="#b8c2cc" stroke-width="16" stroke-linecap="round"/>
    <path d="M90 36 v-6 h22" fill="none" stroke="#b8c2cc" stroke-width="16" stroke-linejoin="round"/>
    <path d="M46 10 v34" stroke="#dfe6ec" stroke-width="6"/>
    <path d="M52 62 q16 10 32 -2" fill="none" stroke="#9fd0ea" stroke-width="8" stroke-linecap="round"/>
    <ellipse cx="46" cy="10" rx="12" ry="4" fill="#8f9aa6"/>
    <rect x="34" y="40" width="24" height="8" rx="3" fill="#8f9aa6"/>
  </svg>`,

  radiator: `<svg viewBox="0 0 120 120">
    <g fill="#f4f7fa" stroke="#b8c2cc" stroke-width="2">
      <rect x="18" y="26" width="12" height="62" rx="5"/><rect x="34" y="26" width="12" height="62" rx="5"/>
      <rect x="50" y="26" width="12" height="62" rx="5"/><rect x="66" y="26" width="12" height="62" rx="5"/>
      <rect x="82" y="26" width="12" height="62" rx="5"/>
    </g>
    <path d="M14 34 h84 M14 80 h84" stroke="#c9d2da" stroke-width="5"/>
    <path d="M94 44 h12 a8 8 0 0 1 8 8 v8" fill="none" stroke="#8f9aa6" stroke-width="5"/>
    <rect x="4" y="40" width="16" height="12" rx="5" fill="#4a5560"/>
    <path d="M24 96 v10 M60 96 v10 M90 96 v10" stroke="#c9d2da" stroke-width="4"/>
  </svg>`,

  ftx: `<svg viewBox="0 0 120 120">
    <rect x="18" y="26" width="84" height="68" rx="8" fill="#c9d2da" stroke="#8f9aa6" stroke-width="3"/>
    <rect x="26" y="34" width="30" height="52" rx="4" fill="#f4f7fa"/>
    <path d="M32 44 l18 16 M50 44 l-18 16" stroke="#8f9aa6" stroke-width="3"/>
    <path d="M28 70 h26 M28 78 h26" stroke="#9fd0ea" stroke-width="3"/>
    <circle cx="80" cy="52" r="15" fill="#dfe6ec" stroke="#8f9aa6" stroke-width="2"/>
    <path d="M80 42 q10 6 0 10 q-10 -6 0 -10 Z" fill="#8f9aa6"/>
    <path d="M90 60 q-10 6 -18 -2" fill="none" stroke="#8f9aa6" stroke-width="3"/>
    <rect x="66" y="74" width="28" height="12" rx="3" fill="#4a5560"/>
    <path d="M28 26 v-12 M52 26 v-12 M72 26 v-12 M94 26 v-12" stroke="#8f9aa6" stroke-width="7"/>
  </svg>`,

  ventilationskanal: `<svg viewBox="0 0 120 120">
    <g fill="#c9d2da" stroke="#8f9aa6" stroke-width="2">
      <rect x="6" y="42" width="34" height="34" rx="3"/>
      <rect x="40" y="38" width="8" height="42" rx="2"/>
      <rect x="48" y="42" width="30" height="34" rx="3"/>
      <rect x="78" y="38" width="8" height="42" rx="2"/>
    </g>
    <path d="M86 42 h10 a20 20 0 0 1 20 20 v14 h-24 V62 a6 6 0 0 0 -6 -6 Z" fill="#c9d2da" stroke="#8f9aa6" stroke-width="2"/>
    <path d="M14 50 h20 M56 50 h16" stroke="#e6e9ec" stroke-width="4"/>
    <path d="M92 76 h24" stroke="#8f9aa6" stroke-width="3"/>
    <g stroke="#9fd0ea" stroke-width="3" fill="none">
      <path d="M18 88 h20 M46 88 h20 M74 88 h20"/>
    </g>
  </svg>`,

  elcentral: `<svg viewBox="0 0 120 120">
    <rect x="16" y="18" width="88" height="84" rx="8" fill="#e6e9ec" stroke="#8f9aa6" stroke-width="3"/>
    <rect x="24" y="30" width="72" height="26" rx="3" fill="#f4f7fa" stroke="#b8c2cc" stroke-width="2"/>
    <g fill="#3a3f45">
      <rect x="30" y="34" width="8" height="18" rx="2"/><rect x="42" y="34" width="8" height="18" rx="2"/>
      <rect x="54" y="34" width="8" height="18" rx="2"/><rect x="66" y="34" width="8" height="18" rx="2"/>
      <rect x="78" y="34" width="8" height="18" rx="2"/>
    </g>
    <g fill="#d94f3d"><rect x="30" y="34" width="8" height="6" rx="2"/><rect x="66" y="34" width="8" height="6" rx="2"/></g>
    <rect x="24" y="64" width="72" height="24" rx="3" fill="#f4f7fa" stroke="#b8c2cc" stroke-width="2"/>
    <g fill="#3a3f45">
      <rect x="30" y="68" width="8" height="16" rx="2"/><rect x="42" y="68" width="8" height="16" rx="2"/>
      <rect x="54" y="68" width="8" height="16" rx="2"/><rect x="66" y="68" width="8" height="16" rx="2"/>
    </g>
    <rect x="80" y="68" width="14" height="16" rx="3" fill="#e0a21c"/>
    <path d="M104 56 h8" stroke="#8f9aa6" stroke-width="4"/>
  </svg>`,

  kabelstege: `<svg viewBox="0 0 120 120">
    <g transform="rotate(-10 60 60)">
      <path d="M8 40 h104 v6 H8 Z" fill="#8f9aa6"/>
      <path d="M8 84 h104 v6 H8 Z" fill="#8f9aa6"/>
      <g fill="#b8c2cc">
        <rect x="16" y="44" width="8" height="42"/><rect x="40" y="44" width="8" height="42"/>
        <rect x="64" y="44" width="8" height="42"/><rect x="88" y="44" width="8" height="42"/>
      </g>
      <path d="M8 54 q30 10 60 0 t44 0" fill="none" stroke="#d94f3d" stroke-width="5"/>
      <path d="M8 64 q30 10 60 0 t44 0" fill="none" stroke="#1b73b8" stroke-width="5"/>
      <path d="M8 74 q30 10 60 0 t44 0" fill="none" stroke="#3ea55c" stroke-width="5"/>
    </g>
  </svg>`,

  kopplingsdosa: `<svg viewBox="0 0 120 120">
    <circle cx="60" cy="60" r="38" fill="#e6e9ec" stroke="#8f9aa6" stroke-width="3"/>
    <circle cx="60" cy="60" r="26" fill="#f4f7fa" stroke="#b8c2cc" stroke-width="2"/>
    <g fill="#8f9aa6">
      <circle cx="60" cy="30" r="6"/><circle cx="60" cy="90" r="6"/>
      <circle cx="30" cy="60" r="6"/><circle cx="90" cy="60" r="6"/>
    </g>
    <path d="M60 24 v-14 M60 96 v14 M24 60 h-14 M96 60 h14" stroke="#4a5560" stroke-width="6" stroke-linecap="round"/>
    <rect x="48" y="52" width="24" height="16" rx="3" fill="#c9d2da"/>
    <g stroke="#4a5560" stroke-width="2"><path d="M54 52 v16 M66 52 v16"/></g>
  </svg>`,

  tomror: `<svg viewBox="0 0 120 120">
    <path d="M10 88 q20 -60 44 -30 q22 28 44 -30" fill="none" stroke="#e0a21c" stroke-width="16" stroke-linecap="round"/>
    <path d="M10 88 q20 -60 44 -30 q22 28 44 -30" fill="none" stroke="#f0c04a" stroke-width="8" stroke-linecap="round"/>
    <g stroke="#c78c14" stroke-width="2">
      <path d="M18 74 l10 6 M30 58 l10 6 M50 56 l6 10 M66 74 l10 4 M82 54 l10 4 M94 36 l10 4"/>
    </g>
  </svg>`,

  sprinkler: `<svg viewBox="0 0 120 120">
    <path d="M6 22 h108 v14 H6 Z" fill="#c9d2da" stroke="#8f9aa6" stroke-width="2"/>
    <rect x="52" y="36" width="16" height="16" rx="3" fill="#8f9aa6"/>
    <path d="M44 52 h32 v6 H44 Z" fill="#b8c2cc"/>
    <path d="M56 58 h8 v10 h-8 Z" fill="#d94f3d"/>
    <path d="M46 70 h28" stroke="#8f9aa6" stroke-width="4"/>
    <g stroke="#9fd0ea" stroke-width="4" stroke-linecap="round">
      <path d="M40 80 l-10 16 M52 84 l-6 18 M68 84 l6 18 M80 80 l10 16 M60 86 v18"/>
    </g>
  </svg>`,

  varmvattenberedare: `<svg viewBox="0 0 120 120">
    <rect x="30" y="14" width="60" height="88" rx="16" fill="#f4f7fa" stroke="#8f9aa6" stroke-width="3"/>
    <rect x="38" y="46" width="44" height="26" rx="4" fill="#dfe6ec"/>
    <path d="M46 56 q8 -8 16 0 t12 0" fill="none" stroke="#d94f3d" stroke-width="3"/>
    <circle cx="60" cy="86" r="8" fill="#c9d2da" stroke="#8f9aa6" stroke-width="2"/>
    <path d="M60 82 v8" stroke="#4a5560" stroke-width="3"/>
    <path d="M40 14 v-8 M80 14 v-8" stroke="#8f9aa6" stroke-width="8" stroke-linecap="round"/>
    <path d="M40 6 h-14" stroke="#1b73b8" stroke-width="6"/>
    <path d="M80 6 h14" stroke="#d94f3d" stroke-width="6"/>
  </svg>`,

  fjarrvarmecentral: `<svg viewBox="0 0 120 120">
    <rect x="18" y="20" width="84" height="80" rx="6" fill="#e6e9ec" stroke="#8f9aa6" stroke-width="3"/>
    <rect x="28" y="30" width="24" height="44" rx="4" fill="#c9d2da" stroke="#8f9aa6" stroke-width="2"/>
    <g stroke="#8f9aa6" stroke-width="2"><path d="M28 40 h24 M28 52 h24 M28 64 h24"/></g>
    <path d="M62 34 h30" stroke="#d94f3d" stroke-width="6" stroke-linecap="round"/>
    <path d="M62 48 h30" stroke="#1b73b8" stroke-width="6" stroke-linecap="round"/>
    <circle cx="72" cy="70" r="10" fill="#f4f7fa" stroke="#8f9aa6" stroke-width="2"/>
    <path d="M72 70 l6 -6" stroke="#d94f3d" stroke-width="3"/>
    <circle cx="92" cy="70" r="6" fill="#e0a21c"/>
    <path d="M34 100 v10 M86 100 v10" stroke="#8f9aa6" stroke-width="5"/>
  </svg>`,

  golvvarme: `<svg viewBox="0 0 120 120">
    <path d="M8 88 h104 v18 H8 Z" fill="#c9c3ad" stroke="#a29a80" stroke-width="2"/>
    <path d="M14 82 q0 -22 16 -22 t16 22 t16 -22 t16 22 t16 -22 t14 22" fill="none" stroke="#d94f3d" stroke-width="9" stroke-linecap="round"/>
    <path d="M14 82 q0 -22 16 -22 t16 22 t16 -22 t16 22 t16 -22 t14 22" fill="none" stroke="#e88a7a" stroke-width="4" stroke-linecap="round"/>
    <path d="M8 82 h104 v8 H8 Z" fill="#f0d24a" opacity="0.5"/>
    <g stroke="#d94f3d" stroke-width="2" opacity="0.6">
      <path d="M30 46 v-10 M60 42 v-10 M90 46 v-10"/>
    </g>
  </svg>`,

  jordfelsbrytare: `<svg viewBox="0 0 120 120">
    <rect x="34" y="16" width="52" height="88" rx="6" fill="#f4f7fa" stroke="#8f9aa6" stroke-width="3"/>
    <rect x="42" y="30" width="36" height="30" rx="4" fill="#3a3f45"/>
    <rect x="42" y="30" width="36" height="12" rx="4" fill="#d94f3d"/>
    <rect x="50" y="70" width="20" height="14" rx="3" fill="#c9d2da" stroke="#8f9aa6" stroke-width="2"/>
    <path d="M56 74 h8" stroke="#4a5560" stroke-width="3"/>
    <path d="M44 92 h32" stroke="#b8c2cc" stroke-width="3"/>
    <path d="M46 16 v-8 M74 16 v-8 M46 104 v8 M74 104 v8" stroke="#8f9aa6" stroke-width="6"/>
    <path d="M62 46 l-8 12 h10 l-6 10" fill="none" stroke="#f0c04a" stroke-width="3"/>
  </svg>`,

  stamledning: `<svg viewBox="0 0 120 120">
    <path d="M52 6 v100" stroke="#2f3a45" stroke-width="22"/>
    <path d="M52 6 v100" stroke="#3f4a55" stroke-width="8"/>
    <g fill="#3a3f45">
      <rect x="38" y="28" width="28" height="8" rx="2"/><rect x="38" y="70" width="28" height="8" rx="2"/>
    </g>
    <path d="M63 44 h30" stroke="#2f3a45" stroke-width="12" stroke-linecap="round"/>
    <path d="M63 88 h30" stroke="#2f3a45" stroke-width="12" stroke-linecap="round"/>
    <path d="M6 44 h34 M6 88 h34" stroke="#b8c2cc" stroke-width="8" stroke-linecap="round" opacity="0"/>
    <g stroke="#8f9aa6" stroke-width="3" stroke-dasharray="4 5">
      <path d="M6 56 h108 M6 100 h108"/>
    </g>
  </svg>`,

  vattenutkastare: `<svg viewBox="0 0 120 120">
    <path d="M20 30 h80 v56 H20 Z" fill="#b5563f" opacity="0.35"/>
    <rect x="44" y="40" width="32" height="26" rx="6" fill="#c9d2da" stroke="#8f9aa6" stroke-width="2"/>
    <circle cx="60" cy="34" r="10" fill="#8f9aa6"/>
    <path d="M52 34 h16" stroke="#c9d2da" stroke-width="4"/>
    <path d="M56 66 v14 h-8" fill="none" stroke="#8f9aa6" stroke-width="8" stroke-linejoin="round"/>
    <path d="M46 84 q-4 12 0 18" fill="none" stroke="#9fd0ea" stroke-width="4"/>
    <path d="M76 52 h20" stroke="#8f9aa6" stroke-width="6"/>
  </svg>`

});
