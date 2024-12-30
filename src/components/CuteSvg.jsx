const CuteSvg = () => (
  <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background Circle */}
    <circle cx="200" cy="200" r="150" fill="#fff" stroke="#252A34" stroke-width="8"/>
    
    {/* Character Body */}
    <g transform="translate(125, 120)">
      {/* Laptop Base */}
      <path d="M30 120 L120 120 L150 150 L0 150 Z" fill="#FF2E63"/>
      <rect x="35" y="60" width="80" height="60" rx="5" fill="#252A34"/>
      
      {/* Screen Content (Code-like lines) */}
      <rect x="45" y="70" width="40" height="3" fill="#08D9D6"/>
      <rect x="45" y="80" width="60" height="3" fill="#FF2E63"/>
      <rect x="45" y="90" width="30" height="3" fill="#08D9D6"/>
      <rect x="45" y="100" width="50" height="3" fill="#FF2E63"/>
      
      {/* Cute Face */}
      <circle cx="75" cy="85" r="25" fill="none" stroke="#08D9D6" stroke-width="3"/>
      {/* Eyes */}
      <circle cx="65" cy="80" r="4" fill="#252A34">
        <animate attributeName="r" values="4;2;4" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="85" cy="80" r="4" fill="#252A34">
        <animate attributeName="r" values="4;2;4" dur="2s" repeatCount="indefinite"/>
      </circle>
      {/* Smile */}
      <path d="M65 90 Q75 100 85 90" stroke="#252A34" stroke-width="3" fill="none"/>
    </g>

    {/* Floating Elements */}
    <g>
      {/* Code Symbols */}
      <path d="M300 150 L320 170 L300 190" stroke="#FF2E63" stroke-width="4" fill="none">
        <animate attributeName="opacity" values="1;0.5;1" dur="3s" repeatCount="indefinite"/>
      </path>
      <path d="M280 150 L260 170 L280 190" stroke="#08D9D6" stroke-width="4" fill="none">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite"/>
      </path>
      
      {/* Floating Dots */}
      <circle cx="290" cy="130" r="5" fill="#FF2E63">
        <animate attributeName="cy" values="130;120;130" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="270" cy="220" r="5" fill="#08D9D6">
        <animate attributeName="cy" values="220;230;220" dur="2.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="320" cy="200" r="5" fill="#252A34">
        <animate attributeName="cy" values="200;190;200" dur="1.5s" repeatCount="indefinite"/>
      </circle>
    </g>
  </svg>
);

export default CuteSvg;