import { ReactNode } from "react";
import { sleep } from '@utils/common';

interface ComponentProps {
  name: string;
  delay?: number,
  className?: string,
  children?: ReactNode;
}

export const Component: React.FC<ComponentProps> = async ({ name, delay = 0, className, children }) => {
  await sleep(delay);

  return (
    <div className={className}>
      <h1>{name}</h1>
      {children}
    </div>
  );
};
