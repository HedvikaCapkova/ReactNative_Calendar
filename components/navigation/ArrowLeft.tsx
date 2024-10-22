import * as React from 'react';
import { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement>;

export const ArrowLeft = (props: Props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={9}
      height={18}
      fill='none'
      {...props}>
      <path
        fill='#95C9EE'
        d='M8.582.166a.623.623 0 0 1 .035.883L1.51 8.75l7.074 7.7a.624.624 0 1 1-.918.848l-7.5-8.125a.623.623 0 0 1 0-.849L7.667.2c.267-.251.662-.267.916-.033Z'
      />
    </svg>
  );
};
