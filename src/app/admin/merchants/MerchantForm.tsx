'use client';

import { useActionState } from 'react';
import { createMerchant } from '@/app/admin/merchants/actions';

export function MerchantForm() {
  const [state, action] = useActionState(createMerchant, undefined); // undefined == initial state

  return (
    <form
      action={action}
      encType="multipart/form-data"
      className="mb-8 max-w-xl rounded-lg border border-[#33383E] bg-[#1B1E22] p-6"
    >
      <h2 className="mb-4 text-2xl font-semibold">Add New Merchant</h2>
      <div className="flex flex-col gap-3">
        <input
          name="logoUrl"
          type="file"
          accept="image/*"
          className="rounded-lg border border-[#33383E] bg-[#121212] px-3 py-2 text-white/80"
        />
        <input
          name="name"
          type="text"
          placeholder="Merchant Name"
          className="rounded-lg border border-[#33383E] bg-[#121212] px-3 py-2"
        />
        {state?.errors?.name && (
          <div className="rounded-lg bg-red-900/30 p-3 text-sm text-red-400">
            <p>{state.errors.name}</p>
          </div>
        )}
        <input
          name="cashbackPercent"
          type="number"
          placeholder="Cashback Percent (%)"
          className="rounded-lg border border-[#33383E] bg-[#121212] px-3 py-2"
        />
        {state?.errors?.cashbackPercent && (
          <div className="rounded-lg bg-red-900/30 p-3 text-sm text-red-400">
            <p>{state.errors.cashbackPercent}</p>
          </div>
        )}

        <label className="flex items-center gap-2 text-white/80">
          <input name="partner" type="checkbox" className="accent-orange-500" />
          Partner Merchant
        </label>
        {state?.errors?.partner && (
          <div className="rounded-lg bg-red-900/30 p-3 text-sm text-red-400">
            <p>{state.errors.partner}</p>
          </div>
        )}

        <button
          type="submit"
          className="rounded-lg bg-orange-500 px-4 py-2 text-white transition hover:bg-orange-600"
        >
          Add Merchant
        </button>
      </div>
    </form>
  );
}
