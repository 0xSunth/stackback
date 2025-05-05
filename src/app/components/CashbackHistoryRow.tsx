import Image from 'next/image';

interface CashbackHistoryRowProps {
  date: string;
  logo: string;
  merchant: string;
  status: string;
  amount: string;
  onClick?: () => void; // Ajout ici
}

export default function CashbackHistoryRow({
  date,
  logo,
  merchant,
  status,
  amount,
  onClick,
}: CashbackHistoryRowProps) {
  return (
    <tr
      onClick={onClick} // Déclenche la modal
      className="cursor-pointer border-t border-[#33383E] transition hover:bg-[#1B1E22]/50"
    >
      <td className="px-4 py-3">{date}</td>
      <td className="flex items-center gap-2 px-4 py-3">
        <Image
          src={logo}
          alt={merchant}
          width={20}
          height={20}
          className="max-h-5 max-w-5 object-contain"
        />
        <span>{merchant}</span>
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
      <td className="px-4 py-3 text-right font-semibold">{amount}</td>
    </tr>
  );
}
