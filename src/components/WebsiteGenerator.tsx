"use client"
import React, { useState } from 'react';
import { Upload, Wand2, CheckCircle, AlertCircle, Loader } from 'lucide-react';

const WebsiteGenerator = () => {
  const [description, setDescription] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationComplete, setGenerationComplete] = useState(false);
  const [urlAvailable, setUrlAvailable] = useState<boolean | null>(null);
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const maxDescriptionLength = 2000;
  const minDescriptionLength = 10;
  const maxUrlLength = 50;
  const slugPattern = /^[a-z0-9-]{3,50}$/;

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
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: description.trim(), slug }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        const message =
          typeof (payload as { error?: unknown }).error === "string" && (payload as { error?: string }).error
            ? (payload as { error?: string }).error as string
            : `Request failed with status ${response.status}`;
        throw new Error(message);
      }

      const pathFromServer =
        typeof (payload as { path?: unknown }).path === "string"
          ? (payload as { path?: string }).path
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
    description.trim().length >= minDescriptionLength &&
    customUrl.length > 0 &&
    urlAvailable === true &&
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
            <p className="text-gray-400 mb-2">Your website is live at:</p>
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
              View Your Website
            </a>
            <button
              onClick={() => {
                setGenerationComplete(false);
                setDescription('');
                setCustomUrl('');
                setLogo(null);
                setLogoPreview(null);
                setUrlAvailable(null);
                setPublishedUrl(null);
                setError(null);
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
        <form className="space-y-8">
          {/* Description Input */}
          <div>
            <label className="block text-lg font-semibold text-white mb-3">
              Describe Your Website
            </label>
            <div className="relative">
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Describe your crypto project in detail. Include information about features, design preferences, colors, sections, and any specific functionality you want. For example: 'Create a modern DeFi lending platform with dark theme, analytics dashboard, staking features, and gradient purple accents...'"
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
              Custom URL
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
                {customUrl && urlAvailable === true && (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                )}
                {customUrl && urlAvailable === false && (
                  <AlertCircle className="w-5 h-5 text-red-400" />
                )}
              </div>
            </div>
            {customUrl && (
              <p className={`mt-2 text-sm flex items-center space-x-1 ${
                urlAvailable === true ? 'text-green-400' : 'text-red-400'
              }`}>
                {urlAvailable === true ? (
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
              Project Logo <span className="text-gray-400 font-normal">(Optional)</span>
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

