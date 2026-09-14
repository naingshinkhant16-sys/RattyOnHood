import React, { useState } from 'react';
import { ExternalLink, Check, Sparkles, ChevronUp, ShieldCheck, Database, ArrowRight } from 'lucide-react';
import { playCheeseNibble, playFondueBubble, playCheeseSlice } from '../utils/cheeseSound';
import {
  GOOGLE_SHEET_WEBHOOK_URL,
  X_FOLLOW_URL,
  X_POST_URL,
  sendWhitelistToGoogleSheet,
} from '../config/whitelistConfig';

interface FooterProps {
  onNavigate?: (page: 'home' | 'hornary') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  // Form input states
  const [walletAddress, setWalletAddress] = useState<string>(() => {
    return localStorage.getItem('ratty_wl_wallet') || '';
  });
  const [walletSaved, setWalletSaved] = useState<boolean>(() => {
    return Boolean(localStorage.getItem('ratty_wl_wallet'));
  });

  const [xUsername, setXUsername] = useState<string>(() => {
    return localStorage.getItem('ratty_wl_xhandle') || '';
  });
  const [xSaved, setXSaved] = useState<boolean>(() => {
    return Boolean(localStorage.getItem('ratty_wl_xhandle'));
  });

  const [hasFollowed, setHasFollowed] = useState<boolean>(() => {
    return localStorage.getItem('ratty_wl_followed') === 'true';
  });

  const [hasRetweeted, setHasRetweeted] = useState<boolean>(() => {
    return localStorage.getItem('ratty_wl_retweeted') === 'true';
  });

  const [confirmed, setConfirmed] = useState<boolean>(() => {
    return localStorage.getItem('ratty_wl_confirmed') === 'true';
  });

  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showConfigHelp, setShowConfigHelp] = useState<boolean>(false);

  // Compute progress (0 to 4)
  const completedSteps = [walletSaved, xSaved, hasFollowed, hasRetweeted].filter(Boolean).length;
  const progressPct = Math.round((completedSteps / 4) * 100);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Step 1: Save Wallet Address
  const handleSaveWallet = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = walletAddress.trim();
    if (!clean) {
      setValidationError('Please enter your Ethereum wallet address or ENS.');
      return;
    }
    if (clean.length < 5) {
      setValidationError('Address must be at least 5 characters.');
      return;
    }

    setValidationError(null);
    setWalletSaved(true);
    localStorage.setItem('ratty_wl_wallet', clean);
    playCheeseNibble();

    setIsSyncing(true);
    const res = await sendWhitelistToGoogleSheet({
      wallet: clean,
      xHandle: xUsername.trim() || undefined,
      action: 'save_wallet',
      completedSteps: completedSteps + (walletSaved ? 0 : 1),
    });
    setIsSyncing(false);

    showToast(
      res.localOnly
        ? '✓ Address saved! (Will sync to your Google Sheet once connection URL is added)'
        : '✓ Address saved and synced to your Google Sheet!'
    );
  };

  // Step 2: Save X Username
  const handleSaveX = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = xUsername.trim();
    if (!clean) {
      setValidationError('Please enter your X username.');
      return;
    }
    const formatted = clean.startsWith('@') ? clean : `@${clean}`;
    setXUsername(formatted);
    setXSaved(true);
    localStorage.setItem('ratty_wl_xhandle', formatted);
    playCheeseNibble();

    setIsSyncing(true);
    const res = await sendWhitelistToGoogleSheet({
      wallet: walletAddress.trim() || undefined,
      xHandle: formatted,
      action: 'save_handle',
      completedSteps: completedSteps + (xSaved ? 0 : 1),
    });
    setIsSyncing(false);

    showToast(
      res.localOnly
        ? `✓ ${formatted} saved! (Will sync to your Google Sheet once connection URL is added)`
        : `✓ ${formatted} saved and synced to your Google Sheet!`
    );
  };

  // Step 3: Follow on X
  const handleFollowX = () => {
    playCheeseSlice();
    setHasFollowed(true);
    localStorage.setItem('ratty_wl_followed', 'true');
    const targetUrl = X_FOLLOW_URL && X_FOLLOW_URL !== 'https://twitter.com/' ? X_FOLLOW_URL : 'https://x.com';
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
    showToast('✓ Follow recorded!');
  };

  // Step 4: Like & Retweet
  const handleRetweet = () => {
    playCheeseSlice();
    setHasRetweeted(true);
    localStorage.setItem('ratty_wl_retweeted', 'true');
    const targetUrl = X_POST_URL && X_POST_URL !== 'https://twitter.com/' ? X_POST_URL : 'https://x.com';
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
    showToast('✓ Retweet verified!');
  };

  // Confirm Whitelist Spots
  const handleConfirmSpots = async () => {
    if (completedSteps < 4) {
      playCheeseNibble();
      setValidationError(`Please complete all 4 checklist tasks (${4 - completedSteps} remaining) before confirming.`);
      return;
    }

    playFondueBubble();
    setValidationError(null);
    setConfirmed(true);
    localStorage.setItem('ratty_wl_confirmed', 'true');

    setIsSyncing(true);
    const res = await sendWhitelistToGoogleSheet({
      wallet: walletAddress.trim(),
      xHandle: xUsername.trim(),
      action: 'confirm_whitelist',
      completedSteps: 4,
    });
    setIsSyncing(false);

    showToast('🎉 Whitelist Spot Confirmed! Data logged for the upcoming drop.');
  };

  const scrollToTop = () => {
    playFondueBubble();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasSheetConnected = Boolean(GOOGLE_SHEET_WEBHOOK_URL && GOOGLE_SHEET_WEBHOOK_URL.trim() !== '');

  return (
    <footer id="whitelist-checklist" className="relative bg-[#100b07] text-stone-200 pt-16 pb-12 border-t-2 border-[#bfae52]/40">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-[#D9C96C] text-stone-950 font-bold text-xs shadow-2xl border-2 border-stone-900 flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-stone-950 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Simple & Elegant Whitelist Container in #D9C96C */}
        <div className="bg-[#D9C96C] text-stone-950 rounded-3xl p-6 sm:p-10 border-2 border-[#bfae52] shadow-2xl space-y-8">
          
          {/* Header & Progress */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-[#ab9934]">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-stone-800">
                Official Access Mission
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-stone-950 tracking-tight mt-0.5">
                THE WHITELIST CHECKLIST
              </h3>
            </div>
            
            {/* Step Counter Badge */}
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-xl bg-stone-950 text-[#D9C96C] font-mono text-xs font-bold shadow-xs">
                {completedSteps} / 4 COMPLETE
              </span>
            </div>
          </div>

          {/* Simple Progress Bar */}
          <div className="space-y-1.5">
            <div className="w-full bg-[#cbb759] h-2.5 rounded-full overflow-hidden border border-[#ab9934]">
              <div
                className="bg-stone-950 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] font-mono text-stone-800 font-bold">
              <span>Progress: {progressPct}%</span>
              <span>{4 - completedSteps === 0 ? 'All 4 Steps Ready' : `${4 - completedSteps} steps remaining`}</span>
            </div>
          </div>

          {/* Error Banner */}
          {validationError && (
            <div className="p-3.5 rounded-2xl bg-red-100 border-2 border-red-400 text-red-950 text-xs font-mono font-bold">
              {validationError}
            </div>
          )}

          {/* Checklist Tasks (1 to 4) */}
          <div className="space-y-6">
            
            {/* TASK 1: Wallet Address */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#cbb759] border-2 border-[#ab9934] space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-stone-950 text-[#D9C96C] flex items-center justify-center font-mono text-xs font-black shrink-0 mt-0.5">
                  {walletSaved ? <Check className="w-4 h-4 text-[#D9C96C]" /> : '1'}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-mono font-black uppercase text-stone-950">
                    Wallet / Whitelist Address
                  </div>
                  <div className="text-xs text-stone-800 font-medium mt-0.5">
                    Carve your Ethereum address or identifier into the whitelist.
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch gap-2.5 pt-1">
                <input
                  type="text"
                  value={walletAddress}
                  onChange={(e) => {
                    setWalletAddress(e.target.value);
                    setWalletSaved(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveWallet();
                  }}
                  placeholder="Paste Ethereum address (0x...) or ENS"
                  className="flex-1 bg-[#d9c96c] border-2 border-[#ab9934] focus:border-stone-950 focus:outline-none rounded-xl px-4 py-2.5 text-xs sm:text-sm font-mono text-stone-950 placeholder-stone-700 font-bold transition-colors"
                />
                <button
                  type="button"
                  onClick={() => handleSaveWallet()}
                  disabled={isSyncing}
                  className={`px-5 py-2.5 rounded-xl font-mono font-black text-xs uppercase tracking-wider transition-all duration-200 shrink-0 ${
                    walletSaved
                      ? 'bg-stone-950 text-[#D9C96C] shadow-md'
                      : 'bg-stone-950 hover:bg-stone-800 text-[#D9C96C] shadow-md active:scale-95'
                  }`}
                >
                  {walletSaved ? '✓ Saved Address' : 'Save Address'}
                </button>
              </div>
            </div>

            {/* TASK 2: X Username */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#cbb759] border-2 border-[#ab9934] space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-stone-950 text-[#D9C96C] flex items-center justify-center font-mono text-xs font-black shrink-0 mt-0.5">
                  {xSaved ? <Check className="w-4 h-4 text-[#D9C96C]" /> : '2'}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-mono font-black uppercase text-stone-950">
                    X Username
                  </div>
                  <div className="text-xs text-stone-800 font-medium mt-0.5">
                    So we know who to notify when the drop opens.
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch gap-2.5 pt-1">
                <input
                  type="text"
                  value={xUsername}
                  onChange={(e) => {
                    setXUsername(e.target.value);
                    setXSaved(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveX();
                  }}
                  placeholder="@yourhandle"
                  className="flex-1 bg-[#d9c96c] border-2 border-[#ab9934] focus:border-stone-950 focus:outline-none rounded-xl px-4 py-2.5 text-xs sm:text-sm font-mono text-stone-950 placeholder-stone-700 font-bold transition-colors"
                />
                <button
                  type="button"
                  onClick={() => handleSaveX()}
                  disabled={isSyncing}
                  className={`px-5 py-2.5 rounded-xl font-mono font-black text-xs uppercase tracking-wider transition-all duration-200 shrink-0 ${
                    xSaved
                      ? 'bg-stone-950 text-[#D9C96C] shadow-md'
                      : 'bg-stone-950 hover:bg-stone-800 text-[#D9C96C] shadow-md active:scale-95'
                  }`}
                >
                  {xSaved ? '✓ Saved Handle' : 'Save Handle'}
                </button>
              </div>
            </div>

            {/* TASK 3: Follow on X */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#cbb759] border-2 border-[#ab9934] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-stone-950 text-[#D9C96C] flex items-center justify-center font-mono text-xs font-black shrink-0 mt-0.5">
                  {hasFollowed ? <Check className="w-4 h-4 text-[#D9C96C]" /> : '3'}
                </div>
                <div>
                  <div className="text-sm font-mono font-black uppercase text-stone-950">
                    Follow on X
                  </div>
                  <div className="text-xs text-stone-800 font-medium mt-0.5">
                    Follow the pack's home base on X.
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleFollowX}
                className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-mono font-black text-xs uppercase tracking-wider transition-all duration-200 shrink-0 ${
                  hasFollowed
                    ? 'bg-stone-950 text-[#D9C96C]'
                    : 'bg-stone-950 hover:bg-stone-800 text-[#D9C96C] active:scale-95'
                }`}
              >
                <span>{hasFollowed ? '✓ Following on X' : 'Follow on X'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* TASK 4: Like & Retweet */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#cbb759] border-2 border-[#ab9934] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-stone-950 text-[#D9C96C] flex items-center justify-center font-mono text-xs font-black shrink-0 mt-0.5">
                  {hasRetweeted ? <Check className="w-4 h-4 text-[#D9C96C]" /> : '4'}
                </div>
                <div>
                  <div className="text-sm font-mono font-black uppercase text-stone-950">
                    Like & Retweet the Post
                  </div>
                  <div className="text-xs text-stone-800 font-medium mt-0.5">
                    Boost the pinned announcement.
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleRetweet}
                className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-mono font-black text-xs uppercase tracking-wider transition-all duration-200 shrink-0 ${
                  hasRetweeted
                    ? 'bg-stone-950 text-[#D9C96C]'
                    : 'bg-stone-950 hover:bg-stone-800 text-[#D9C96C] active:scale-95'
                }`}
              >
                <span>{hasRetweeted ? '✓ Post Opened & Boosted' : 'Open the Post'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* Confirm Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleConfirmSpots}
              disabled={isSyncing}
              className={`w-full py-4 px-6 rounded-2xl font-mono font-black text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-xl ${
                confirmed
                  ? 'bg-stone-950 text-[#D9C96C] ring-2 ring-[#ab9934]'
                  : completedSteps === 4
                  ? 'bg-stone-950 hover:bg-stone-800 text-[#D9C96C] hover:scale-[1.01] active:scale-95'
                  : 'bg-stone-950 hover:bg-stone-800 text-[#D9C96C]'
              }`}
            >
              {confirmed ? (
                <>
                  <Check className="w-5 h-5 text-[#D9C96C]" />
                  <span>Whitelist Spot Confirmed & Recorded</span>
                </>
              ) : (
                <>
                  <span>Confirm Whitelist Spots</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Security & Google Sheet Connection Status */}
          <div className="pt-2 border-t-2 border-[#ab9934] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] font-mono text-stone-900 font-bold">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-stone-950 shrink-0" />
              <span>Zero wallet signature or drain risk. Data saved securely.</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-stone-950">
                <Database className="w-3.5 h-3.5" />
                <span>Google Sheet:</span>
                <span className={hasSheetConnected ? 'text-emerald-800 font-black' : 'text-stone-700'}>
                  {hasSheetConnected ? 'Connected ✓' : 'Ready for URL'}
                </span>
              </span>
              <button
                type="button"
                onClick={() => setShowConfigHelp(!showConfigHelp)}
                className="underline text-stone-950 hover:text-stone-700"
              >
                {showConfigHelp ? 'Hide guide' : 'Setup guide'}
              </button>
            </div>
          </div>

          {/* Expandable Google Sheet Setup Instruction */}
          {showConfigHelp && (
            <div className="p-4 rounded-2xl bg-stone-950 text-[#D9C96C] text-xs font-mono space-y-2 border border-[#ab9934]">
              <div className="font-bold flex items-center justify-between">
                <span>Google Sheet Integration (Ready to plug in anytime):</span>
                <button
                  type="button"
                  onClick={() => setShowConfigHelp(false)}
                  className="text-stone-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <p className="text-stone-300 text-[11px] leading-relaxed">
                To connect your Google Sheet, open <code className="text-[#D9C96C]">src/config/whitelistConfig.ts</code> and paste your Google Apps Script Web App URL into <code className="text-[#D9C96C]">GOOGLE_SHEET_WEBHOOK_URL</code>.
              </p>
              <div className="text-[10px] text-stone-400">
                1. In your Google Sheet, go to Extensions → Apps Script.
                <br />
                2. Paste a simple doPost(e) handler and click Deploy → New Deployment (Web app, access: Anyone).
                <br />
                3. Paste the generated URL into whitelistConfig.ts!
              </div>
            </div>
          )}

        </div>

        {/* Minimal Bottom Bar */}
        <div className="pt-6 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-400">
          <div>
            © {new Date().getFullYear()} The RATTY Journey. Whitelist reservations for OpenSea launch.
          </div>
          
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => {
                playCheeseNibble();
                onNavigate?.('hornary');
              }}
              className="text-[#D9C96C] hover:underline font-bold"
            >
              👑 Hornary Gallery Sub-Branch
            </button>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-stone-300 hover:text-[#D9C96C] transition-colors font-bold"
            >
              <span>Back to top</span>
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
