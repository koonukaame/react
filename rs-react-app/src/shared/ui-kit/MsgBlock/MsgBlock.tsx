export type Props = {
  title: string;
  msg: string;
  isItemDetails?: boolean;
};

export function MsgBlock({ title, msg }: Props) {
  return (
    <div
      className={'bg-rose-50 text-rose-800 text-center p-6'}
      data-testid="msg-block"
    >
      <p className="text-lg font-medium mb-2">{title}</p>
      <p className="text-sm">{msg}</p>
    </div>
  );
}
