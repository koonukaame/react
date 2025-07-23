export type Props = {
  title: string;
  msg: string;
  isItemDetails?: boolean;
};

export function MsgBlock({ title, msg, isItemDetails = false }: Props) {
  const defaultStyles = 'bg-rose-50 text-rose-800';
  const detailsStyles = 'w-2/3 bg-white text-gray-800';
  const baseStyles = 'text-center p-6';
  return (
    <div
      className={`${isItemDetails ? detailsStyles : defaultStyles} ${baseStyles}`}
      data-testid="msg-block"
    >
      <p className="text-lg font-medium mb-2">{title}</p>
      <p className="text-sm">{msg}</p>
    </div>
  );
}
