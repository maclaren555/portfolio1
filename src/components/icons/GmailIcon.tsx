import React from 'react';

const GmailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 512 384"
    fill="currentColor"
    {...props}
  >
    <path
      d="M64 336V48l192 160L448 48v288H64z"
    />
    <path
      d="M64 48l192 160L448 48l-192 192L64 48z"
    />
    <path
      d="M448 48L256 208v128h192V48z"
    />
    <path
      d="M64 336V48l192 192-192 96z"
    />
  </svg>
);

export default GmailIcon; 