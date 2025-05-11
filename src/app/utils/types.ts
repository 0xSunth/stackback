export interface Merchant {
  id: string;
  name: string;
  cashbackPercent: number;
  logoUrl: string;
  partner: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CashbackStatus = 'pending' | 'approved' | 'rejected';

export interface CashbackRequests {
  id: string;
  userId: string;
  merchantId: string;
  amountBtc: number;
  status: CashbackStatus;
  receiptUrl: string | undefined;
  createdAt: string;
}

export interface CashbackRequestWithRelations {
  id: string;
  amount_btc: number;
  status: CashbackStatus;
  receiptUrl: string | undefined;
  createdAt: string;
  userEmail: string;
  merchantName: string;
}
