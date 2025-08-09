export type Props = {
  title: string;
  msg: string;
  isItemDetails?: boolean;
};

export const MsgBlock = ({ title, msg }: Props) => {
  return (
    <div
      className={
        'w-full bg-rose-50 text-rose-800 text-center p-6 dark:bg-neutral-900 dark:text-stone-200'
      }
      data-testid="msg-block"
    >
      <p className="text-lg font-medium mb-2">{title}</p>
      <p className="text-sm">{msg}</p>
    </div>
  );
};
