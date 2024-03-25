type SVGProps = {
  width?: string;
  height?: string;
  fillColor?: string;
};

export const FilterIcon: React.FC<SVGProps> = ({
  width = '20',
  height = '20',
  fillColor = 'currentColor',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block"

    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 3v2.157L3.4 14.57a1 1 0 00-.4.78V18a1 1 0 001 1h16a1 1 0 001-1v-2.65a1 1 0 00-.4-.78L14 5.157V3h-4zm1 2.157V5h2v.157L19.6 14H4.4L11 5.157z"
        fill={fillColor}
        transform={`scale(1,-1) translate(0,-${height})`}
      />
    </svg>
  );
};

export const UpChevronIcon: React.FC<SVGProps> = ({
  width = '24',
  height = '24',
  fillColor = 'currentColor',
}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"  className="inline-block">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 9.293l-4.95 4.95a1 1 0 01-1.414-1.414l6.364-6.364a1 1 0 011.414 0l6.364 6.364a1 1 0 01-1.414 1.414L12 9.293z"
        fill={fillColor}
      />
    </svg>
  );
};

export const DownChevronIcon: React.FC<SVGProps> = ({
  width = '24',
  height = '24',
  fillColor = 'currentColor',
}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 14.707l4.95-4.95a1 1 0 011.414 1.414l-6.364 6.364a1 1 0 01-1.414 0L4.636 11.17a1 1 0 011.414-1.414l4.95 4.95z"
        fill={fillColor}
      />
    </svg>
  );
};

export const LeftChevronIcon: React.FC<SVGProps> = ({
  width = '24',
  height = '24',
  fillColor = 'currentColor',
}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"  className="inline-block">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"
        fill={fillColor}
      />
    </svg>
  );
};

export const RightChevronIcon: React.FC<SVGProps> = ({
  width = '24',
  height = '24',
  fillColor = 'currentColor',
}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12l-4.58 4.59z"
        fill={fillColor}
      />
    </svg>
  );
};