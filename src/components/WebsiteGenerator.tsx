"use client"
import React, { useState } from 'react';
import { Upload, Wand2, CheckCircle, AlertCircle, Loader } from 'lucide-react';

const WebsiteGenerator = () => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [blockchain, setBlockchain] = useState('SOL');
  const [buyLink, setBuyLink] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationComplete, setGenerationComplete] = useState(false);
  const [urlAvailable, setUrlAvailable] = useState<boolean | null>(null);
  const [urlTaken, setUrlTaken] = useState<boolean>(false);
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [buyLinkValid, setBuyLinkValid] = useState<boolean | null>(null);

  const maxDescriptionLength = 2000;
  const minDescriptionLength = 10;
  const maxUrlLength = 50;
  const maxProjectNameLength = 100;
  const minProjectNameLength = 1;
  const slugPattern = /^[a-z0-9-]{3,50}$/;
  
  const blockchains = [
    { value: 'SOL', label: 'Solana (SOL)' },
    { value: 'ETH', label: 'Ethereum (ETH)' },
    { value: 'BSC', label: 'Binance Smart Chain (BSC)' },
    { value: 'BASE', label: 'Base' },
    { value: 'ARB', label: 'Arbitrum (ARB)' },
    { value: 'AVAX', label: 'Avalanche (AVAX)' },
    { value: 'MATIC', label: 'Polygon (MATIC)' },
    { value: 'OP', label: 'Optimism (OP)' },
    { value: 'FTM', label: 'Fantom (FTM)' },
  ];

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxDescriptionLength) {
      setDescription(value);
      setError(null);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    if (sanitizedValue.length <= maxUrlLength) {
      setCustomUrl(sanitizedValue);
      setPublishedUrl(null);
      setGenerationComplete(false);
      setError(null);
      setUrlTaken(false);
      
      if (sanitizedValue.length === 0) {
        setUrlAvailable(null);
        return;
      }
      
      setUrlAvailable(slugPattern.test(sanitizedValue));
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a valid image file (JPG, PNG, SVG, WebP)');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      setLogo(file);
      const reader = new FileReader();
      reader.onload = (e) => setLogoPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const formatUrl = (urlString: string): string => {
    if (!urlString || urlString.trim().length === 0) {
      return '';
    }

    const trimmed = urlString.trim();
    
    // Check if it starts with http:// or https://
    const hasProtocol = /^https?:\/\//i.test(trimmed);
    
    // If it already has a protocol, return as is
    if (hasProtocol) {
      return trimmed;
    }
    
    // Otherwise, prepend https://
    return `https://${trimmed}`;
  };

  const validateUrl = (urlString: string): boolean => {
    if (!urlString || urlString.trim().length === 0) {
      return false;
    }

    // Remove leading/trailing whitespace
    const trimmed = urlString.trim();
    
    // Check if it starts with http:// or https://
    const hasProtocol = /^https?:\/\//i.test(trimmed);
    
    // Check if it starts with www.
    const startsWithWww = /^www\./i.test(trimmed);
    
    // If it doesn't have a protocol and doesn't start with www., prepend https://
    let urlToValidate = trimmed;
    if (!hasProtocol && !startsWithWww) {
      urlToValidate = `https://${trimmed}`;
    } else if (startsWithWww && !hasProtocol) {
      urlToValidate = `https://${trimmed}`;
    }
    
    try {
      const url = new URL(urlToValidate);
      
      // Validate protocol
      if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        return false;
      }
      
      // Validate hostname (must have a domain and TLD)
      const hostname = url.hostname;
      if (!hostname || hostname.length === 0) {
        return false;
      }
      
      // Check for valid domain format (at least one dot for TLD, or localhost)
      // Pattern: domain.tld or subdomain.domain.tld
      const domainPattern = /^([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i;
      const isLocalhost = hostname === 'localhost' || hostname.startsWith('localhost:');
      
      if (!isLocalhost && !domainPattern.test(hostname)) {
        return false;
      }
      
      return true;
    } catch {
      return false;
    }
  };

  const handleBuyLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setBuyLink(value);
    setError(null);
    
    if (value.length === 0) {
      setBuyLinkValid(null);
      return;
    }
    
    // Validate URL format
    setBuyLinkValid(validateUrl(value));
  };

  const handleGenerate = async () => {
    if (isGenerating) {
      return;
    }

    if (!canGenerate) {
      setError("Please make sure all required fields are valid before generating.");
      return;
    }

    const slug = customUrl.trim().toLowerCase();
    setIsGenerating(true);
    setError(null);
    setGenerationComplete(false);
    setPublishedUrl(null);

    try {
      // First check if URL is available
      const checkResponse = await fetch(`/api/check-url?slug=${encodeURIComponent(slug)}`);
      const checkData = await checkResponse.json();
      
      if (checkResponse.ok && typeof checkData.available === 'boolean' && !checkData.available) {
        setUrlTaken(true);
        setError("This URL has already been taken. Please choose another one.");
        setIsGenerating(false);
        return;
      }

      // Build enhanced prompt with additional project information
      let enhancedPrompt = description.trim();
      
      const projectInfo: string[] = [];
      if (projectName.trim()) {
        projectInfo.push(`Project Name: ${projectName.trim()}`);
      }
      if (shortDescription.trim()) {
        projectInfo.push(`Description: ${shortDescription.trim()}`);
      }
      if (contractAddress.trim()) {
        projectInfo.push(`Contract Address: ${contractAddress.trim()}`);
      }
      if (blockchain) {
        projectInfo.push(`Blockchain: ${blockchain}`);
      }
      if (buyLink.trim() && buyLinkValid === true) {
        const formattedLink = formatUrl(buyLink.trim());
        projectInfo.push(`Buy/Chart Link: ${formattedLink}`);
      }
      
      if (projectInfo.length > 0) {
        enhancedPrompt = `Project Information:\n${projectInfo.join('\n')}\n\nWebsite Requirements:\n${enhancedPrompt}`;
      }

      // Proceed with generation
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: enhancedPrompt, 
          slug, 
          projectName: projectName.trim(),
          shortDescription: shortDescription.trim(),
          contractAddress: contractAddress.trim(),
          blockchain,
          buyLink: buyLink.trim() && buyLinkValid === true 
            ? formatUrl(buyLink.trim())
            : '',
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        // If URL is taken (409), show it in the URL validation area
        if (response.status === 409) {
          setUrlTaken(true);
          const errorMessage =
            typeof (payload as { error?: unknown }).error === "string" && (payload as { error?: string }).error
              ? (payload as { error?: string }).error as string
              : "This URL has already been taken. Please choose another one.";
          setError(errorMessage);
          setIsGenerating(false);
          return;
        }
        const message =
          typeof (payload as { error?: unknown }).error === "string" && (payload as { error?: string }).error
            ? (payload as { error?: string }).error as string
            : `Request failed with status ${response.status}`;
        throw new Error(message);
      }

      const pathFromServer =
        typeof (payload as { path?: unknown }).path === "string"
          ? (payload as { path?: string }).path ?? `/${slug}`
          : `/${slug}`;

      setPublishedUrl(pathFromServer);
      setGenerationComplete(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setIsGenerating(false);
    }
  };

  const canGenerate =
    projectName.trim().length >= minProjectNameLength &&
    contractAddress.trim().length > 0 &&
    blockchain.trim().length > 0 &&
    buyLink.trim().length > 0 &&
    buyLinkValid === true &&
    description.trim().length >= minDescriptionLength &&
    customUrl.length > 0 &&
    urlAvailable === true &&
    logo !== null &&
    !isGenerating;

  if (generationComplete) {
    const slugPath = publishedUrl ?? `/${customUrl.trim().toLowerCase()}`;
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const displayUrl = slugPath.startsWith("http") ? slugPath : `${origin}${slugPath}`;

    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Website Generated Successfully!
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Your crypto website is now live and ready to share with the world.
          </p>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 mb-8 max-w-md mx-auto">
            <p className="text-gray-400 mb-2">Website Link</p>
            <a 
              href={slugPath}
              className="text-purple-400 hover:text-purple-300 font-medium text-lg break-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              {displayUrl}
            </a>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={slugPath}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              Visit Website
            </a>
            <button
              onClick={() => {
                setGenerationComplete(false);
                setProjectName('');
                setDescription('');
                setShortDescription('');
                setCustomUrl('');
                setContractAddress('');
                setBlockchain('SOL');
                setBuyLink('');
                setLogo(null);
                setLogoPreview(null);
                setUrlAvailable(null);
                setUrlTaken(false);
                setPublishedUrl(null);
                setError(null);
                setBuyLinkValid(null);
              }}
              className="text-gray-300 hover:text-white px-8 py-3 rounded-lg font-medium border border-gray-700 hover:border-purple-500/50 transition-all"
            >
              Generate Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Generate Your Crypto Website
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Describe your project, customize the URL, upload your logo, and let our AI create 
          a professional website in seconds.
        </p>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
        <form className="space-y-6">
          {/* Project Name Input */}
          <div>
            <label className="block text-lg font-semibold text-white mb-3">
              Project Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= maxProjectNameLength) {
                  setProjectName(value);
                  setError(null);
                }
              }}
              placeholder=""
              className="w-full bg-gray-900/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
            />
          </div>

          {/* Short Description Input (Optional) */}
          <div>
            <label className="block text-lg font-semibold text-white mb-3">
              Description <span className="text-gray-400 text-sm">(optional)</span>
            </label>
            <input
              type="text"
              value={shortDescription}
              onChange={(e) => {
                setShortDescription(e.target.value);
                setError(null);
              }}
              placeholder="Short description of your project"
              className="w-full bg-gray-900/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
            />
          </div>

          {/* Contract Address and Blockchain - Side by side on desktop */}
          <div className="flex flex-col md:flex-row md:gap-4">
            {/* Contract Address Input */}
            <div className="flex-1">
              <label className="block text-lg font-semibold text-white mb-3">
                Contract Address <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={contractAddress}
                onChange={(e) => {
                  setContractAddress(e.target.value);
                  setError(null);
                }}
                placeholder=""
                className="w-full bg-gray-900/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all font-mono text-sm"
              />
            </div>

            {/* Blockchain Selector */}
            <div className="md:w-60">
              <label className="block text-lg font-semibold text-white mb-3">
                Blockchain <span className="text-red-400">*</span>
              </label>
              <select
                value={blockchain}
                onChange={(e) => {
                  setBlockchain(e.target.value);
                  setError(null);
                }}
                className="w-full bg-gray-900/50 border border-gray-600 rounded-xl px-2 py-3 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
              >
                {blockchains.map((chain) => (
                  <option key={chain.value} value={chain.value} className="bg-gray-900">
                    {chain.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Buy/Chart Link Input */}
          <div>
            <label className="block text-lg font-semibold text-white mb-3">
              Buy/Chart Link <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={buyLink}
                onChange={handleBuyLinkChange}
                placeholder=""
                className={`w-full bg-gray-900/50 border rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all ${
                  buyLinkValid === false ? 'border-red-500 focus:border-red-500' : 
                  buyLinkValid === true ? 'border-green-500 focus:border-green-500' : 
                  'border-gray-600 focus:border-purple-500'
                }`}
              />
              {buyLink && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {buyLinkValid === true && (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  )}
                  {buyLinkValid === false && (
                    <AlertCircle className="w-5 h-5 text-red-400" />
                  )}
                </div>
              )}
            </div>
            {buyLink && buyLinkValid === false && (
              <p className="mt-2 text-sm text-red-400 flex items-center space-x-1">
                <AlertCircle className="w-4 h-4" />
                <span>Please enter a valid URL (e.g., https://example.com, www.example.com, or example.com)</span>
              </p>
            )}
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-lg font-semibold text-white mb-3">
              Website prompt <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Describe your crypto website in detail. Include information about features, design preferences, colors, sections, and any specific functionality you want"
                rows={6}
                className="w-full bg-gray-900/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all resize-none"
              />
              <div className="absolute bottom-3 right-3 text-sm text-gray-400">
                {description.length}/{maxDescriptionLength}
              </div>
            </div>
            {description.length > 0 && description.length < minDescriptionLength && (
              <p className="mt-2 text-sm text-amber-400 flex items-center space-x-1">
                <AlertCircle className="w-4 h-4" />
                <span>Description must be at least {minDescriptionLength} characters</span>
              </p>
            )}
          </div>

          {/* Custom URL Input */}
          <div>
            <label className="block text-lg font-semibold text-white mb-3">
              Custom URL <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <div className="flex items-center">
                <span className="bg-gray-700 text-gray-300 px-4 py-3 rounded-l-xl border border-r-0 border-gray-600">
                  dakucrypto.com/
                </span>
                <input
                  type="text"
                  value={customUrl}
                  onChange={handleUrlChange}
                  placeholder="your-project-name"
                  className="flex-1 bg-gray-900/50 border border-gray-600 rounded-r-xl px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
                />
              </div>
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {customUrl && urlAvailable === true && !urlTaken && (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                )}
                {customUrl && (urlAvailable === false || urlTaken) && (
                  <AlertCircle className="w-5 h-5 text-red-400" />
                )}
              </div>
            </div>
            {customUrl && (
              <p className={`mt-2 text-sm flex items-center space-x-1 ${
                urlAvailable === true && !urlTaken ? 'text-green-400' : 'text-red-400'
              }`}>
                {urlTaken ? (
                  <>
                    <AlertCircle className="w-4 h-4" />
                    <span>This URL has already been taken. Please choose another one.</span>
                  </>
                ) : urlAvailable === true ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Perfect! Your site will be available at /{customUrl}</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4" />
                    <span>Use 3-50 lowercase letters, numbers, or hyphens.</span>
                  </>
                )}
              </p>
            )}
          </div>

          {/* Logo Upload */}
          <div>
            <label className="block text-lg font-semibold text-white mb-3">
              Project Logo <span className="text-red-400">*</span>
            </label>
            <div className="flex items-start space-x-6">
              <div 
                className="flex-1 border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-purple-500/50 transition-colors cursor-pointer"
                onClick={() => document.getElementById('logo-upload')?.click()}
              >
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-300 font-medium mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-gray-400">
                  JPG, PNG, SVG, WebP (Max 5MB)
                </p>
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </div>
              
              {logoPreview && (
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-gray-700 rounded-xl overflow-hidden">
                    <img 
                      src={logoPreview} 
                      alt="Logo preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setLogo(null);
                      setLogoPreview(null);
                    }}
                    className="w-full mt-2 text-xs text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Generate Button */}
          <div className="pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={!canGenerate || isGenerating}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 disabled:from-gray-700 disabled:to-gray-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Generating Website...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  <span>Generate & Publish Website</span>
                </>
              )}
            </button>
            
            {!canGenerate && !isGenerating && (
              <p className="mt-3 text-sm text-gray-400 text-center">
                Please complete all required fields to generate your website
              </p>
            )}
            {error && (
              <p className="mt-3 text-sm text-red-400 text-center">
                {error}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default WebsiteGenerator;

