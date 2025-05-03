import Image from "next/image";

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
      className="border-t border-[#33383E] hover:bg-[#1B1E22]/50 transition cursor-pointer"
    >
      <td className="px-4 py-3">{date}</td>
      <td className="px-4 py-3 flex items-center gap-2">
        <Image
          src={logo}
          alt={merchant}
          width={20}
          height={20}
          className="object-contain max-h-5 max-w-5"
        />
        <span>{merchant}</span>
      </td>
      <td
        className={`px-4 py-3 
          ${status === "Confirmed" ? "text-green-400 rounded-lg px-2 py-1" :
            status === "Rejected" ? "text-red-400 rounded-lg px-2 py-1" :
            "text-orange-400  rounded-lg px-2 py-1"}
        `}
      >
        {status}
      </td>
      <td className="px-4 py-3 text-right font-semibold">{amount}</td>
    </tr>
  );
}
