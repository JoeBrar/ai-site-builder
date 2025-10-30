"use client"

import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Wallet, LogOut, ChevronDown } from 'lucide-react';

const WalletButton = () => {
  const { wallet, publicKey, disconnect, connected } = useWallet();
  const { setVisible } = useWalletModal();
  const [showDropdown, setShowDropdown] = useState(false);

  const formatAddress = (address: string | null) => {
    if (!address) return '';
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const handleConnect = () => {
    setVisible(true);
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      setShowDropdown(false);
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  if (connected && publicKey) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105"
        >
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span className="font-mono">{formatAddress(publicKey.toString())}</span>
          <ChevronDown className="w-4 h-4" />
        </button>

        {showDropdown && (
          <>
            {/* Overlay to close dropdown */}
            <div
              className="fixed inset-0 z-10 bg-transparent"
              onClick={() => setShowDropdown(false)}
            />
            <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-20">
              <div className="p-4 border-b border-gray-700">
                <div className="text-xs text-gray-400 mb-1">Connected with</div>
                <div className="text-sm font-medium text-white">{wallet?.adapter.name || 'Wallet'}</div>
              </div>
              <div className="p-2">
                <div className="px-3 py-2 text-xs font-mono text-gray-300 bg-gray-900 rounded mb-2 break-all">
                  {publicKey.toString()}
                </div>
                <button
                  onClick={handleDisconnect}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Disconnect
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105"
    >
      <Wallet className="w-4 h-4" />
      Connect Wallet
    </button>
  );
};

export default WalletButton;

