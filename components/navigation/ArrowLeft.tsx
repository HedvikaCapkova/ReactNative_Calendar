import Svg, { Path, SvgProps } from 'react-native-svg';

export default function ArrowLeft(props: SvgProps) {
  return (
    <Svg
      width={9}
      height={18}
      fill='currentColor'
      viewBox='0 0 9 18'
      {...props}>
      <Path
        fill='#95C9EE'
        d='M8.58173 0.166095C8.71602 0.28879 8.78313 0.456641 8.78313 0.625079C8.78313 0.777071 8.72821 0.929024 8.61712 1.0493L1.51024 8.75008L8.58446 16.4493C8.81884 16.7032 8.80419 17.0993 8.54906 17.3325C8.29516 17.5669 7.90102 17.551 7.66664 17.2977L0.166641 9.17271C-0.0555469 8.93224 -0.0555469 8.5649 0.166641 8.32427L7.66664 0.199274C7.93329 -0.0522648 8.32782 -0.0682804 8.58173 0.166095Z'
      />
    </Svg>
  );
}
