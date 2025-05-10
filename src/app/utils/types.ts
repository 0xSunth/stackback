export interface Merchant {
  id: string;
  name: string;
  cashbackPercent: number;
  logoUrl: string;
  partner: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CashbackRequests {
  id: string;
  user_id: string;
  merchant_id: string;
  amount_btc: number;
  status: 'pending' | 'approved' | 'rejected';
  receiptUrl: string | undefined;
  created_at: string;
}

export interface CashbackRequestWithRelations {
  id: string;
  amount_btc: number;
  status: 'pending' | 'approved' | 'rejected';
  receiptUrl: string | undefined;
  createdAt: string;
  userEmail: string;
  merchantName: string;
}

export type CashbackStatus = 'pending' | 'approved' | 'rejected';
