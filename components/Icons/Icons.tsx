import * as React from 'react';
import { SVGProps } from 'react';

const BoardIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg width={16} height={16} xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89v4.22h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
    </svg>
);

const AddTaskIconMobile = (props: SVGProps<SVGSVGElement>) => (
    <svg width={12} height={12} xmlns="http://www.w3.org/2000/svg" {...props}>
        <path fill="#FFF" d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z" />
    </svg>
);

const VerticalEllipsisIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg width={5} height={20} xmlns="http://www.w3.org/2000/svg" {...props}>
        <g fill="#828FA3" fillRule="evenodd">
            <circle cx={2.308} cy={2.308} r={2.308} />
            <circle cx={2.308} cy={10} r={2.308} />
            <circle cx={2.308} cy={17.692} r={2.308} />
        </g>
    </svg>
);

const ShowSidebarIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg width={16} height={11} xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M15.875 8.625H5.75V10.5h10.125V8.625Zm0-4.125H5.75v1.875h10.125V4.5ZM0 0v1.875h15.875V0H0Zm0 4.5v1.875h4.125V4.5H0Zm0 4.125V10.5h4.125V8.625H0Z" />
    </svg>
);

const HideSidebarIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg width={18} height={16} xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M2.625 1.125H15.75v13.5H2.625V1.125ZM1.125 0v15.75h15.75V0H1.125Zm2.25 2.25h11.25v2.25H3.375V2.25Zm0 3.75h11.25v2.25H3.375V6Zm0 3.75h11.25v2.25H3.375V9.75Z" />
    </svg>
);
