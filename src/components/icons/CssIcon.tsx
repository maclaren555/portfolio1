import React from 'react';

const CssIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
        <path fill="#1572B6" d="M71 460L30 0h451l-41 460-185 52z"/>
        <path fill="#33A9DC" d="M256 472l149-41 35-394H256z"/>
        <path fill="#EBEBEB" d="M256 208h125l-10 117-115 32v-47h69l5-54H256v-48zm-1-104h136l3-32H255v32z"/>
        <path fill="#FFF" d="M256 313l-115-32 7-85h108v48h-61l-4 44 65 18zM140 72l-3-32h119v32z"/>
    </svg>
);

export default CssIcon; 