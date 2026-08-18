import React from 'react';

interface SchoolLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  variant?: 'emblem' | 'with-text' | 'badge' | 'official';
  className?: string;
  glow?: boolean;
  language?: 'en' | 'ta';
  showSubtitle?: boolean;
}

export const SchoolLogo: React.FC<SchoolLogoProps> = ({
  size = 'md',
  variant = 'emblem',
  className = '',
  glow = false,
  language = 'en',
  showSubtitle = true,
}) => {
  // Dimension mapping for scalable sizing
  const sizeMap = {
    xs: 'w-7 h-7',
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
    '2xl': 'w-32 h-32 sm:w-36 sm:h-36',
    '3xl': 'w-44 h-44 sm:w-52 sm:h-52',
  };

  const emblemSize = sizeMap[size] || 'w-11 h-11';

  const EmblemSVG = (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full transition-transform ${emblemSize} ${
        glow ? 'drop-shadow-[0_4px_16px_rgba(226,183,85,0.45)]' : 'shadow-xs'
      } ${className}`}
    >
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full object-contain filter drop-shadow-2xs select-none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Holy Madonna's Matriculation Higher Secondary School Logo Lalapet"
      >
        <defs>
          {/* Outer Gold Gradient */}
          <linearGradient id={`goldRim-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2B755" />
            <stop offset="25%" stopColor="#FFF0A5" />
            <stop offset="50%" stopColor="#C5962B" />
            <stop offset="75%" stopColor="#FDE887" />
            <stop offset="100%" stopColor="#966C15" />
          </linearGradient>

          {/* Inner Background Radial Gradient */}
          <radialGradient id={`creamBg-${size}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFF0" />
            <stop offset="60%" stopColor="#FFF5C8" />
            <stop offset="100%" stopColor="#FEE488" />
          </radialGradient>

          {/* Inner Gold Medallion Gradient */}
          <radialGradient id={`innerMedallion-${size}`} cx="45%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFF4B8" />
            <stop offset="40%" stopColor="#FCD265" />
            <stop offset="75%" stopColor="#E5A924" />
            <stop offset="100%" stopColor="#B87C0D" />
          </radialGradient>

          {/* Diya Bowl Metallic Gradient */}
          <linearGradient id={`diyaBowl-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EAA332" />
            <stop offset="35%" stopColor="#FFF2A1" />
            <stop offset="65%" stopColor="#B8441F" />
            <stop offset="100%" stopColor="#6E1B0A" />
          </linearGradient>

          {/* Flame Core Gradient */}
          <radialGradient id={`flameGlow-${size}`} cx="50%" cy="70%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#FFF066" />
            <stop offset="60%" stopColor="#FF7A00" />
            <stop offset="100%" stopColor="#D92000" />
          </radialGradient>

          {/* Ribbon Gradient */}
          <linearGradient id={`ribbonPink-${size}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F5A8C4" />
            <stop offset="50%" stopColor="#FCD5E5" />
            <stop offset="100%" stopColor="#F5A8C4" />
          </linearGradient>

          {/* Path for Top Outer Text */}
          <path id={`textPathTopOuter-${size}`} d="M 68 250 A 182 182 0 1 1 432 250" fill="none" />
          {/* Path for Bottom Outer Text */}
          <path id={`textPathBottomOuter-${size}`} d="M 72 250 A 178 178 0 0 0 428 250" fill="none" />

          {/* Path for Inner Medallion Top Text */}
          <path id={`textPathInnerTop-${size}`} d="M 172 250 A 78 78 0 1 1 328 250" fill="none" />
          {/* Path for Inner Medallion Bottom Text */}
          <path id={`textPathInnerBottom-${size}`} d="M 175 250 A 75 75 0 0 0 325 250" fill="none" />
        </defs>

        {/* 1. Outer Deep Navy Rim & Base Ring */}
        <circle cx="250" cy="250" r="244" fill="#0C2056" stroke={`url(#goldRim-${size})`} strokeWidth="5" />
        <circle cx="250" cy="250" r="236" fill="none" stroke={`url(#goldRim-${size})`} strokeWidth="2.5" />

        {/* 2. Main Cream & Golden Outer Band Area */}
        <circle cx="250" cy="250" r="230" fill={`url(#creamBg-${size})`} stroke="#0C2056" strokeWidth="2.5" />
        <circle cx="250" cy="250" r="148" fill="none" stroke="#0C2056" strokeWidth="2.5" />

        {/* 3. Outer Ring Curved Typography: Top */}
        <text fontFamily="'Plus Jakarta Sans', 'Arial Black', Arial, sans-serif" fontWeight="900" fontSize="22.5" fill="#0A1E52" letterSpacing="1.8">
          <textPath href={`#textPathTopOuter-${size}`} startOffset="50%" textAnchor="middle">
            HOLY MADONNA'S MATRIC HR. SEC. SCHOOL
          </textPath>
        </text>

        {/* 4. Outer Ring Curved Typography: Bottom */}
        <text fontFamily="'Plus Jakarta Sans', 'Arial Black', Arial, sans-serif" fontWeight="900" fontSize="26" fill="#0A1E52" letterSpacing="4">
          <textPath href={`#textPathBottomOuter-${size}`} startOffset="50%" textAnchor="middle">
            ★ ★ ★   LALAPET   ★ ★ ★
          </textPath>
        </text>

        {/* 5. Inner Golden Seal / Medallion */}
        <circle cx="250" cy="246" r="138" fill={`url(#innerMedallion-${size})`} stroke="#A0720A" strokeWidth="3" />
        <circle cx="250" cy="246" r="130" fill="none" stroke="#FFF5B8" strokeWidth="1.5" />
        <circle cx="250" cy="246" r="95" fill="#FFFDE8" stroke="#A0720A" strokeWidth="2.5" />

        {/* Sunburst Rays behind Diya */}
        <g stroke="#F39C12" strokeWidth="1.4" opacity="0.65">
          <line x1="250" y1="210" x2="250" y2="165" />
          <line x1="250" y1="210" x2="270" y2="168" />
          <line x1="250" y1="210" x2="288" y2="178" />
          <line x1="250" y1="210" x2="300" y2="195" />
          <line x1="250" y1="210" x2="305" y2="215" />
          <line x1="250" y1="210" x2="230" y2="168" />
          <line x1="250" y1="210" x2="212" y2="178" />
          <line x1="250" y1="210" x2="200" y2="195" />
          <line x1="250" y1="210" x2="195" y2="215" />
        </g>

        {/* Inner Medallion Text: Top (Crimson) */}
        <text fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="900" fontSize="10.8" fill="#881515" letterSpacing="0.8">
          <textPath href={`#textPathInnerTop-${size}`} startOffset="50%" textAnchor="middle">
            HOLY MADONNA'S MATRIC HR. SEC. SCHOOL
          </textPath>
        </text>

        {/* Inner Medallion Text: Bottom (Emerald Green + Magenta Stars) */}
        <text fontFamily="'Plus Jakarta Sans', 'Arial Black', Arial, sans-serif" fontWeight="900" fontSize="14.5" fill="#0C6B2F" letterSpacing="2.2">
          <textPath href={`#textPathInnerBottom-${size}`} startOffset="50%" textAnchor="middle">
            ★ LALAPET ★
          </textPath>
        </text>

        {/* 6. Traditional Diya (Oil Lamp) Illustration */}
        <g transform="translate(0, 5)">
          {/* Outer Diya Flame Aura */}
          <ellipse cx="250" cy="200" rx="28" ry="36" fill="#FFE57F" opacity="0.45" />

          {/* Radiant Flame Rays */}
          <path d="M 250 162 C 265 185 272 204 266 218 C 260 228 240 228 234 218 C 228 204 235 185 250 162 Z" fill={`url(#flameGlow-${size})`} stroke="#FFF4A3" strokeWidth="1.5" />
          {/* Inner White Core Flame */}
          <path d="M 250 178 C 257 194 260 206 257 215 C 253 220 247 220 243 215 C 240 206 243 194 250 178 Z" fill="#FFFFFF" opacity="0.9" />

          {/* Diya Lamp Bowl (Upper Lip & Base) */}
          <ellipse cx="250" cy="226" rx="46" ry="12" fill="#F4A62A" stroke="#8A3205" strokeWidth="2" />
          <ellipse cx="250" cy="225" rx="42" ry="9" fill="#FFF2A3" />

          {/* Lamp Body / Vessel */}
          <path d="M 204 226 C 208 248 230 262 250 262 C 270 262 292 248 296 226 C 285 235 268 240 250 240 C 232 240 215 235 204 226 Z" fill={`url(#diyaBowl-${size})`} stroke="#6A1C00" strokeWidth="2.5" />

          {/* Lamp Pedestal / Stand */}
          <path d="M 238 262 L 234 268 C 230 271 270 271 266 268 L 262 262 Z" fill="#D38115" stroke="#7A2202" strokeWidth="1.5" />
        </g>

        {/* 7. Motto Ribbon Scroll */}
        <g transform="translate(0, 10)">
          {/* Ribbon Shadow & Tail Cutouts */}
          <path d="M 136 322 L 175 308 L 175 336 L 148 342 L 136 322 Z" fill="#D47898" stroke="#8E2D4E" strokeWidth="1" />
          <path d="M 364 322 L 325 308 L 325 336 L 352 342 L 364 322 Z" fill="#D47898" stroke="#8E2D4E" strokeWidth="1" />

          {/* Ribbon Body */}
          <path d="M 166 310 L 334 310 C 342 310 348 316 346 324 L 343 334 C 341 341 334 345 326 345 L 174 345 C 166 345 159 341 157 334 L 154 324 C 152 316 158 310 166 310 Z" fill={`url(#ribbonPink-${size})`} stroke="#A03358" strokeWidth="1.8" />

          {/* Ribbon Motto Text */}
          <text x="250" y="331" fontFamily="'Plus Jakarta Sans', 'Arial Black', Arial, sans-serif" fontWeight="900" fontSize="14.5" fill="#0C2056" textAnchor="middle" letterSpacing="1.2">
            LIGHT TO ENLIGHTEN
          </text>
        </g>
      </svg>
    </div>
  );

  if (variant === 'emblem') {
    return EmblemSVG;
  }

  if (variant === 'with-text') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {EmblemSVG}
        <div className="flex flex-col">
          <span className="text-sm sm:text-base md:text-lg font-extrabold tracking-tight text-[#2C2A26] font-['Cinzel',serif] uppercase group-hover:text-[#5A5A40] transition-colors leading-tight">
            Holy Madonna's School
          </span>
          {showSubtitle && (
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-[#706B63] uppercase">
              {language === 'ta' ? 'மெட்ரிகுலேஷன் மேல்நிலைப் பள்ளி • லாலாபேட்டை' : 'Matriculation Higher Secondary • Lalapet'}
            </span>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'official') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        {EmblemSVG}
        <div className="mt-3">
          <h3 className="text-base sm:text-lg font-bold font-['Cinzel',serif] text-[#2C2A26] uppercase">
            Holy Madonna's Matric. Hr. Sec. School
          </h3>
          <p className="text-xs font-semibold text-[#5A5A40] tracking-wider uppercase">
            Lalapet, Ranipet Dist. • Light to Enlighten
          </p>
        </div>
      </div>
    );
  }

  // Variant: badge
  return (
    <div className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#FCFAF7] border border-[#E5E0D8] shadow-2xs ${className}`}>
      {EmblemSVG}
      <div className="flex flex-col text-left">
        <span className="text-xs font-bold text-[#2C2A26] leading-none">Holy Madonna's MHSS</span>
        <span className="text-[9px] font-medium text-[#706B63]">Lalapet</span>
      </div>
    </div>
  );
};
