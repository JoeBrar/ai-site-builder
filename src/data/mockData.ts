export interface Website {
  id: string;
  name: string;
  description: string;
  customUrl: string;
  logoUrl?: string;
  visitCount: number;
  createdAt: string;
  isFeatured?: boolean;
  category?: string;
}

export const mockWebsites: Website[] = [
  {
    id: '1',
    name: 'DeFiMax Protocol',
    description: 'Revolutionary yield farming protocol with automated liquidity optimization and multi-chain support. Earn maximum rewards with minimal risk through our advanced algorithmic strategies.',
    customUrl: 'defimax',
    logoUrl: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    visitCount: 15420,
    createdAt: '2025-01-15T10:30:00Z',
    isFeatured: true,
    category: 'DeFi'
  },
  {
    id: '2',
    name: 'MetaVerse Coin',
    description: 'Next-generation virtual world currency powering immersive gaming experiences. Trade, build, and explore in the ultimate metaverse ecosystem with seamless NFT integration.',
    customUrl: 'metaverse-coin',
    logoUrl: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    visitCount: 8930,
    createdAt: '2025-01-14T15:45:00Z',
    category: 'Gaming'
  },
  {
    id: '3',
    name: 'SecureVault DAO',
    description: 'Community-governed security protocol for decentralized insurance. Protect your crypto assets with collective governance and transparent risk assessment mechanisms.',
    customUrl: 'securevault-dao',
    visitCount: 12650,
    createdAt: '2025-01-13T09:20:00Z',
    isFeatured: true,
    category: 'DAO'
  },
  {
    id: '4',
    name: 'GreenChain Energy',
    description: 'Sustainable blockchain solution for renewable energy trading. Connect solar panel owners with energy consumers through transparent, eco-friendly smart contracts.',
    customUrl: 'greenchain-energy',
    logoUrl: 'https://images.pexels.com/photos/1097930/pexels-photo-1097930.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    visitCount: 6780,
    createdAt: '2025-01-12T14:10:00Z',
    category: 'Sustainability'
  },
  {
    id: '5',
    name: 'ArtFlow NFT',
    description: 'Premium NFT marketplace for digital artists and collectors. Discover unique artworks, participate in exclusive drops, and build your digital art portfolio.',
    customUrl: 'artflow-nft',
    logoUrl: 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    visitCount: 18230,
    createdAt: '2025-01-11T11:55:00Z',
    isFeatured: true,
    category: 'NFT'
  },
  {
    id: '6',
    name: 'SwapBridge Protocol',
    description: 'Cross-chain DEX aggregator with optimal price discovery. Trade any token across multiple blockchains with minimal slippage and maximum efficiency.',
    customUrl: 'swapbridge',
    visitCount: 9840,
    createdAt: '2025-01-10T16:30:00Z',
    category: 'DeFi'
  },
  {
    id: '7',
    name: 'CryptoLearn Academy',
    description: 'Blockchain education platform with interactive courses and certifications. Master DeFi, NFTs, and Web3 development through hands-on learning experiences.',
    customUrl: 'cryptolearn',
    logoUrl: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    visitCount: 7320,
    createdAt: '2025-01-09T13:15:00Z',
    category: 'Education'
  },
  {
    id: '8',
    name: 'LiquidStake Pro',
    description: 'Advanced liquid staking solution with automatic reward compounding. Stake your ETH and receive liquid tokens while maintaining full flexibility and earning optimal yields.',
    customUrl: 'liquidstake-pro',
    visitCount: 11560,
    createdAt: '2025-01-08T08:40:00Z',
    isFeatured: true,
    category: 'Staking'
  },
  {
    id: '9',
    name: 'GameFi Arena',
    description: 'Competitive gaming platform with play-to-earn mechanics. Battle other players, win tournaments, and earn cryptocurrency rewards in our skill-based gaming ecosystem.',
    customUrl: 'gamefi-arena',
    logoUrl: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    visitCount: 13790,
    createdAt: '2025-01-07T12:00:00Z',
    category: 'Gaming'
  },
  {
    id: '10',
    name: 'QuantumVault',
    description: 'Quantum-resistant cryptocurrency wallet with military-grade security. Protect your digital assets with future-proof encryption and advanced threat detection.',
    customUrl: 'quantumvault',
    visitCount: 5670,
    createdAt: '2025-01-06T17:25:00Z',
    category: 'Security'
  },
  {
    id: '11',
    name: 'SocialToken Hub',
    description: 'Creator economy platform for personal tokens and fan engagement. Launch your social token, reward loyal followers, and monetize your community interactions.',
    customUrl: 'socialtoken-hub',
    logoUrl: 'https://images.pexels.com/photos/1181472/pexels-photo-1181472.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    visitCount: 8450,
    createdAt: '2025-01-05T10:50:00Z',
    category: 'Social'
  },
  {
    id: '12',
    name: 'EcoMint Carbon',
    description: 'Carbon credit marketplace powered by blockchain technology. Trade verified carbon offsets, track environmental impact, and contribute to global sustainability goals.',
    customUrl: 'ecomint-carbon',
    visitCount: 4320,
    createdAt: '2025-01-04T14:35:00Z',
    category: 'Sustainability'
  },
  {
    id: '13',
    name: 'FlashLoan Master',
    description: 'Advanced flash loan aggregator with arbitrage opportunities. Execute complex DeFi strategies with borrowed capital and automated profit maximization algorithms.',
    customUrl: 'flashloan-master',
    visitCount: 16780,
    createdAt: '2025-01-03T09:10:00Z',
    isFeatured: true,
    category: 'DeFi'
  },
  {
    id: '14',
    name: 'MusicChain Records',
    description: 'Decentralized music distribution platform for independent artists. Publish your music as NFTs, receive direct fan support, and maintain full creative control.',
    customUrl: 'musicchain',
    logoUrl: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    visitCount: 9230,
    createdAt: '2025-01-02T11:20:00Z',
    category: 'Entertainment'
  },
  {
    id: '15',
    name: 'DerivaTrade Pro',
    description: 'Professional derivatives trading platform with advanced analytics. Trade futures, options, and perpetual contracts with institutional-grade tools and deep liquidity.',
    customUrl: 'derivatrade-pro',
    visitCount: 14560,
    createdAt: '2025-01-01T16:45:00Z',
    category: 'Trading'
  },
  {
    id: '16',
    name: 'HealthData Chain',
    description: 'Secure health data management on blockchain. Own your medical records, share with healthcare providers securely, and participate in medical research programs.',
    customUrl: 'healthdata-chain',
    logoUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    visitCount: 6120,
    createdAt: '2024-12-31T13:30:00Z',
    category: 'Healthcare'
  },
  {
    id: '17',
    name: 'RealEstate DAO',
    description: 'Fractional real estate investment through blockchain technology. Own shares of premium properties, receive rental income, and participate in property governance decisions.',
    customUrl: 'realestate-dao',
    visitCount: 10890,
    createdAt: '2024-12-30T08:15:00Z',
    isFeatured: true,
    category: 'Real Estate'
  },
  {
    id: '18',
    name: 'CyberSports Token',
    description: 'Esports betting and fantasy platform with transparent odds. Bet on your favorite teams, create fantasy leagues, and earn rewards based on player performance.',
    customUrl: 'cybersports-token',
    logoUrl: 'https://images.pexels.com/photos/1181290/pexels-photo-1181290.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    visitCount: 12340,
    createdAt: '2024-12-29T15:40:00Z',
    category: 'Sports'
  },
  {
    id: '19',
    name: 'SupplyVault',
    description: 'Blockchain-based supply chain transparency solution. Track products from origin to consumer, verify authenticity, and ensure ethical sourcing standards.',
    customUrl: 'supplyvault',
    visitCount: 7650,
    createdAt: '2024-12-28T12:25:00Z',
    category: 'Supply Chain'
  },
  {
    id: '20',
    name: 'AiTrade Oracle',
    description: 'AI-powered trading signals and market analysis platform. Get real-time insights, automated trading strategies, and risk management tools powered by machine learning.',
    customUrl: 'aitrade-oracle',
    logoUrl: 'https://images.pexels.com/photos/1181243/pexels-photo-1181243.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    visitCount: 18920,
    createdAt: '2024-12-27T10:05:00Z',
    isFeatured: true,
    category: 'AI Trading'
  }
];