import * as React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx={14} cy={14} r={14} fill="url(#paint0_linear_801_54)" />
      <path
        d="M22.9829 11.4332C22.9662 10.6368 22.9537 9.84043 22.8035 9.05238C22.4032 6.96343 20.8392 5.46656 18.7331 5.16218C17.7822 5.02458 16.823 5.02042 15.8679 5.01208C14.3916 4.99123 12.9152 4.99957 11.443 5.02042C10.6464 5.03292 9.84986 5.0496 9.06163 5.19971C6.95551 5.59998 5.45829 7.16774 5.15802 9.28171C5.02456 10.2282 5.01622 11.1789 5.00788 12.1253C4.9912 13.5889 5.00371 15.0566 5.02039 16.5201C5.02873 17.329 5.04958 18.142 5.19972 18.9426C5.60009 21.0315 7.16404 22.5284 9.27016 22.8328C10.2294 22.9704 11.1928 22.9745 12.1562 22.9871C13.62 23.0037 15.088 22.9912 16.5519 22.9746C17.3568 22.9662 18.1617 22.9537 18.9541 22.7911C19.9801 22.5784 20.8726 22.1365 21.5941 21.3609C22.4699 20.4228 22.8285 19.2761 22.9161 18.0294C23.0079 16.6868 22.9995 15.3359 22.9787 13.9891C22.987 13.1386 22.9995 12.288 22.9829 11.4332ZM21.3814 14.0058C21.373 15.24 21.4064 16.4784 21.3313 17.7126C21.2896 18.3964 21.1937 19.0677 20.8559 19.6764C20.3304 20.6229 19.4838 21.0941 18.4411 21.2525C17.7405 21.3609 17.0315 21.3693 16.3225 21.3734C14.6335 21.3818 12.9444 21.3859 11.2595 21.3651C10.5672 21.3568 9.87071 21.3484 9.19092 21.1775C7.81047 20.8356 6.93466 19.8515 6.74699 18.4339C6.65524 17.7376 6.63021 17.0371 6.63021 16.3366C6.62187 14.5437 6.60102 12.7508 6.6469 10.962C6.66358 10.2907 6.68026 9.61527 6.88462 8.96482C7.26413 7.74314 8.11075 7.03848 9.3494 6.78831C10.1501 6.6257 10.9634 6.62987 11.7766 6.6257C13.4157 6.61319 15.0547 6.61319 16.6937 6.63404C17.3985 6.64237 18.1075 6.64654 18.804 6.82167C20.2011 7.16774 21.0728 8.13925 21.2604 9.57775C21.3772 10.4534 21.3772 11.3373 21.3814 12.2171C21.3855 12.8092 21.3814 13.4054 21.3814 14.0058Z"
        fill="#0E0E0E"
      />
      <path
        d="M13.9665 9.37745C11.4391 9.38162 9.37891 11.4789 9.37891 14.0307C9.38308 16.5533 11.4809 18.6214 14.0332 18.6172C16.5564 18.613 18.625 16.5116 18.6208 13.964C18.6166 11.4414 16.5189 9.37328 13.9665 9.37745ZM13.979 16.9994C12.3108 16.9994 11.0012 15.6568 11.0012 13.9598C11.0012 12.3045 12.3525 10.9952 14.0582 10.9994C15.6806 10.9994 17.0068 12.3545 17.0068 14.0098C17.0026 15.6818 15.6681 16.9994 13.979 16.9994Z"
        fill="#0E0E0E"
      />
      <path
        d="M18.8273 8.12242C18.2268 8.11408 17.7347 8.59358 17.7305 9.18983C17.7263 9.77774 18.2018 10.2614 18.794 10.2697C19.3779 10.2781 19.8741 9.79859 19.8783 9.21485C19.8867 8.62277 19.4112 8.13076 18.8273 8.12242Z"
        fill="#0E0E0E"
      />
      <defs>
        <linearGradient
          id="paint0_linear_801_54"
          x1={14}
          y1={0}
          x2={14}
          y2={28}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#029DE1" />
          <stop offset={1} stopColor="#312883" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Icon;
