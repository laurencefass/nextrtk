import { ReactNode } from "react";

interface ComponentProps {
    name: string;
    delay?: number,
    className?: string,
    children?: ReactNode;
}
  
const sleep = (ms: number) => new Promise(resolve => {
    setTimeout(resolve, ms);
});

export const Component: React.FC<ComponentProps> = async ({ name, delay = 0, className, children }) => {
    await sleep(delay);

    return (
      <div className={className}>
        <h1>{name}</h1>
        {children}
      </div>
    );
};
  