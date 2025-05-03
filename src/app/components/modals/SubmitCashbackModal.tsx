"use client";

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface SubmitCashbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubmitCashbackModal({ isOpen, onClose }: SubmitCashbackModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="bg-[#1B1E22] rounded-xl p-8 max-w-sm w-full border border-[#33383E] text-white shadow-xl transition-all">
              <Dialog.Title className="text-2xl font-semibold mb-2">
                Submit Cashback
              </Dialog.Title>
              <p className="text-white/70 mb-4 text-sm">
                Enter the details of your purchase below to submit a cashback request.
              </p>

              {/* Form */}
              <form className="flex flex-col gap-4">
                <div>
                  <label className="text-sm">Purchase Amount</label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="w-full bg-[#121212] border border-[#33383E] rounded-lg px-3 py-2 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm">Date</label>
                  <input
                    type="date"
                    className="w-full bg-[#121212] border border-[#33383E] rounded-lg px-3 py-2 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm">Receipt</label>
                  <input
                    type="file"
                    className="w-full text-sm bg-[#121212] border border-[#33383E] rounded-lg px-3 py-2 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg"
                >
                  Submit
                </button>
              </form>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-2 right-3 text-white/50 hover:text-white text-xl"
              >
                &times;
              </button>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
