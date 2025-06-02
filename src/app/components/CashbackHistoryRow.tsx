import Image from 'next/image';
import { CashbackRequestWithRelations } from '../utils/types';

interface CashbackHistoryRowProps {
  request: CashbackRequestWithRelations;
  onClick?: () => void;
}

export default function CashbackHistoryRow({ request, onClick }: CashbackHistoryRowProps) {
  return (
    <tr
      onClick={onClick}
      className="cursor-pointer border-t border-[#33383E] transition hover:bg-[#1B1E22]/50"
    >
      <td className="px-4 py-3">{request.createdAt}</td>
      <td className="flex items-center gap-2 px-4 py-3">
        <Image
          src={'logo'}
          alt={request.merchantName}
          width={20}
          height={20}
          className="max-h-5 max-w-5 object-contain"
        />
        <span>{request.merchantName}</span>
      </td>
      <td
        className={`px-4 py-3 ${
          status === 'Confirmed'
            ? 'rounded-lg px-2 py-1 text-green-400'
            : status === 'Rejected'
              ? 'rounded-lg px-2 py-1 text-red-400'
              : 'rounded-lg px-2 py-1 text-orange-400'
        } `}
      >
        {status}
      </td>
      <td className="px-4 py-3 text-right font-semibold">
        {request.amount} {request.currency}
      </td>
    </tr>
  );
}
