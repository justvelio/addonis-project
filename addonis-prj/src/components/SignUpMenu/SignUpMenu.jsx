import React, { useState } from 'react';
import {
  Popover,
  Transition,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import SignUpModal from '../SignUpModal/SignUpModal';
import { FingerPrintIcon, AtSymbolIcon } from '@heroicons/react/solid';

const solutions = [
  { name: 'The Old Way', description: 'The way your ancestors used to register', href: '#', icon: AtSymbolIcon },
  { name: 'DNA', description: 'Use your DNA file that you received when you were made in the Artificial Womb', href: '#', icon: FingerPrintIcon },
];

export default function SignUpMenu() {
  const [selectedOption, setSelectedOption] = useState(null); // Add state for selected option
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const onCloseSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

  const onOpenSignUpModal = (option) => {
    setSelectedOption(option);
    setIsSignUpModalOpen(true);
  };

  return (
    <div>
      <Popover className="relative">
        <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-slate-100">
          <span>Sign Up</span>
          <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
        </Popover.Button>

        <Transition
          as={React.Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="z-10 mt-5 absolute w-72 -right-2">
          <div className="w-full overflow-hidden rounded-3xl bg-slate-700 text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4">
              {solutions.map((item) => (
                <div
                  key={item.name}
                  className={`group relative flex gap-x-6 rounded-sm p-4 ${
                    item.name === 'The Old Way'
                      ? 'hover:bg-slate-800 cursor-pointer'
                      : 'bg-slate-800 pointer-events-none filter brightness-50'
                  }`}
                  onClick={() => (item.name === 'The Old Way' ? onOpenSignUpModal(item.name) : null)}
                >
                    <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-slate-200 group-hover:bg-slate-300">
                      <item.icon className="h-6 w-6 text-slate-900 group-hover:text-blue-700" aria-hidden="true" />
                    </div>
                    <div>
                      <a href={item.href} className="font-semibold text-slate-200">
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-slate-300">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>

      <SignUpModal isOpen={isSignUpModalOpen} onClose={onCloseSignUpModal} selectedOption={selectedOption} />
    </div>
  );
}
