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

const CrossIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg width={13} height={13} xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M11.59.41 12 7.06 7.47 2.53 12 1.47 10.94 6 6.41 1.47 2 2.53.94 7.06 5.59 11.59 10.12 7.06 11.59 12 10.53 10.94 6 6.41 10.53 2 11.59.41Z" />
    </svg>
);

const EditIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg width={14} height={14} xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M13.479 2.872 11.082.474a.8.8 0 0 0-1.128 0L8.728 1.617l1.415 1.415 1.243-1.243a.8.8 0 0 1 1.128 0l1.415 1.415a.8.8 0 0 1 0 1.128l-1.243 1.243 1.415 1.415 1.058-1.058a.8.8 0 0 0 0-1.128Zm-10.9 10.9a.8.8 0 0 0 0 1.128l1.415 1.415a.8.8 0 0 0 1.128 0l1.058-1.058-1.415-1.415-1.243 1.243a.8.8 0 0 1-1.128 0L2.58 11.082a.8.8 0 0 1 0-1.128l1.243-1.243L2.408 8.296a.8.8 0 0 0 0-1.128Z" />
    </svg>
);

const ChevronIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg width={10} height={10} xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M2.5 3.5L5 6l2.5-2.5M7.5 6.5L5 9l-2.5-2.5" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
);

const CheckIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg width={12} height={9} xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M10.5 1.5L4 8l-3-3" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
);

const DragIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg width={8} height={12} xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx={2} cy={2} r={1.5} />
        <circle cx={6} cy={2} r={1.5} />
        <circle cx={2} cy={6} r={1.5} />
        <circle cx={6} cy={6} r={1.5} />
        <circle cx={2} cy={10} r={1.5} />
        <circle cx={6} cy={10} r={1.5} />
    </svg>
);

const DarkThemeIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg width={16} height={16} xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            d="M6.474.682c.434-.11.718.406.481.78A6.067 6.067 0 0 0 6.01 4.72c0 3.418 2.827 6.187 6.314 6.187.89.002 1.77-.182 2.584-.54.408-.18.894.165.724.57-1.16 2.775-3.944 4.73-7.194 4.73-4.292 0-7.771-3.41-7.771-7.615 0-3.541 2.466-6.518 5.807-7.37Zm8.433.07c.442-.294.969.232.674.674l-.525.787a1.943 1.943 0 0 0 0 2.157l.525.788c.295.441-.232.968-.674.673l-.787-.525a1.943 1.943 0 0 0-2.157 0l-.786.525c-.442.295-.97-.232-.675-.673l.525-.788a1.943 1.943 0 0 0 0-2.157l-.525-.787c-.295-.442.232-.968.674-.673l.787.525a1.943 1.943 0 0 0 2.157 0Z"
            fill="#828FA3"
        />
    </svg>
);

const LightThemeIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg width={19} height={19} xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            d="M9.167 15.833a.833.833 0 0 1 .833.834v.833a.833.833 0 0 1-1.667 0v-.833a.833.833 0 0 1 .834-.834ZM3.75 13.75a.833.833 0 0 1 .59 1.422l-1.25 1.25a.833.833 0 0 1-1.18-1.178l1.25-1.25a.833.833 0 0 1 .59-.244Zm10.833 0c.221 0 .433.088.59.244l1.25 1.25a.833.833 0 0 1-1.179 1.178l-1.25-1.25a.833.833 0 0 1 .59-1.422ZM9.167 5a4.167 4.167 0 1 1 0 8.334 4.167 4.167 0 0 1 0-8.334Zm-7.5 3.333a.833.833 0 0 1 0 1.667H.833a.833.833 0 1 1 0-1.667h.834Zm15.833 0a.833.833 0 0 1 0 1.667h-.833a.833.833 0 0 1 0-1.667h.833Zm-1.667-6.666a.833.833 0 0 1 .59 1.422l-1.25 1.25a.833.833 0 1 1-1.179-1.178l1.25-1.25a.833.833 0 0 1 .59-.244Zm-13.333 0c.221 0 .433.088.59.244l1.25 1.25a.833.833 0 0 1-1.18 1.178L1.91 3.09a.833.833 0 0 1 .59-1.422ZM9.167 0A.833.833 0 0 1 10 .833v.834a.833.833 0 1 1-1.667 0V.833A.833.833 0 0 1 9.167 0Z"
            fill="#828FA3"
        />
    </svg>
);

export {
    BoardIcon,
    AddTaskIconMobile,
    VerticalEllipsisIcon,
    ShowSidebarIcon,
    HideSidebarIcon,
    CrossIcon,
    EditIcon,
    ChevronIcon,
    CheckIcon,
    DragIcon,
    DarkThemeIcon,
    LightThemeIcon,
};
