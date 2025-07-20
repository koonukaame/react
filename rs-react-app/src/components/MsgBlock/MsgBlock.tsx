export type Props = {
  title: string;
  msg: string;
};

export function MsgBlock({ title, msg }: Props) {
  return (
    <div
      className="text-center text-rose-600 bg-rose-50 py-6 px-4 mt-4"
      data-testid="msg-block"
    >
      <p className="text-lg font-medium mb-2">{title}</p>
      <p className="text-sm">{msg}</p>
    </div>
  );
}
