import React, { useState } from 'react';
import {
  KeyRound,
  X,
  CheckCircle,
  AlertCircle,
  Lock,
  Unlock,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export const PinUnlockModal: React.FC = () => {
  const {
    pinModalOpen,
    setPinModalOpen,
    verifyAndUnlockPin,
    activeUnlockedPin,
    pins,
    unlockedVideoIds
  } = useApp();

  const navigate = useNavigate();
  const [pinCode, setPinCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [unlockedDetails, setUnlockedDetails] = useState<{
    code: string;
    count: number;
    patientName: string;
  } | null>(null);

  if (!pinModalOpen) return null;

  const handleUnlock = (codeToVerify?: string) => {
    const code = (codeToVerify || pinCode).trim();
    if (!code) {
      setErrorMsg('Please enter an access PIN code.');
      return;
    }

    setErrorMsg('');
    const result = verifyAndUnlockPin(code);

    if (result.success && result.pin) {
      setSuccessMsg(result.message);
      setUnlockedDetails({
        code: result.pin.code,
        count: result.pin.assignedVideoIds.length,
        patientName: result.pin.patientName
      });

      // Fire subtle celebratory confetti
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#171717', '#525252', '#a3a3a3', '#059669']
      });
    } else {
      setErrorMsg(result.message);
      setSuccessMsg('');
    }
  };

  const handleQuickFill = (code: string) => {
    setPinCode(code);
    handleUnlock(code);
  };

  const handleClose = () => {
    setPinModalOpen(false);
    setErrorMsg('');
    setSuccessMsg('');
    setUnlockedDetails(null);
  };

  const handleGoToLibrary = () => {
    handleClose();
    navigate('/interventions');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-neutral-300 w-full max-w-md rounded-lg shadow-2xl overflow-hidden relative">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-300 flex items-center justify-center text-neutral-900">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-garamond text-xl font-bold text-neutral-950">
                Patient Access PIN
              </h3>
              <p className="text-[11px] text-neutral-500 font-sans">
                Unlock your tailored psychological intervention videos
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="text-neutral-400 hover:text-black transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {unlockedDetails ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <h4 className="font-garamond text-2xl font-bold text-neutral-900">
                  Access Granted
                </h4>
                <p className="text-xs text-neutral-600 mt-1 max-w-xs mx-auto">
                  Welcome, <span className="font-semibold text-neutral-900">{unlockedDetails.patientName}</span>. Your Psychologist has authorized{' '}
                  <span className="font-bold text-neutral-900">{unlockedDetails.count} private intervention sessions</span> under code{' '}
                  <span className="font-mono font-semibold bg-neutral-100 px-1.5 py-0.5 rounded border border-neutral-300">{unlockedDetails.code}</span>.
                </p>
              </div>

              <div className="p-3 bg-neutral-50 border border-neutral-200 rounded text-left text-xs text-neutral-600 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Videos are served via secure, signed time-limited playback links in accordance with clinic security rules.
                </span>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={handleGoToLibrary}
                  className="w-full bg-black text-white py-2.5 rounded font-semibold text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors shadow-xs"
                >
                  View Unlocked Sessions
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Following your psychological consultation at Reality Mind Clinic, your Psychologist issues a unique access code. Enter your code below to decrypt and unlock your assigned clinical exercises and video guidance.
              </p>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Enter 6-Character Access PIN
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={pinCode}
                    onChange={(e) => {
                      setPinCode(e.target.value.toUpperCase());
                      setErrorMsg('');
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                    placeholder="e.g. RMC-2026 or 123456"
                    className="flex-1 uppercase font-mono tracking-widest px-3.5 py-2.5 text-sm border border-neutral-300 rounded focus:outline-hidden focus:border-black focus:ring-1 focus:ring-black bg-neutral-50/50"
                  />
                  <button
                    type="button"
                    onClick={() => handleUnlock()}
                    className="bg-black text-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
                  >
                    <Unlock className="w-3.5 h-3.5" />
                    <span>Unlock</span>
                  </button>
                </div>

                {errorMsg && (
                  <div className="flex items-center gap-1.5 text-xs text-rose-600 mt-2">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {successMsg && (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 mt-2">
                    <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{successMsg}</span>
                  </div>
                )}
              </div>

              {/* Sample PIN shortcuts for testing / presentation */}
              <div className="border-t border-neutral-100 pt-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                  Demo Prescription PINs (Click to test):
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {pins.slice(0, 3).map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleQuickFill(p.code)}
                      className="text-left p-2 rounded border border-neutral-200 hover:border-black hover:bg-neutral-50 transition-all flex items-center justify-between group text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-neutral-900 group-hover:underline">
                            {p.code}
                          </span>
                          <span className="text-[10px] text-neutral-500">
                            for {p.patientName}
                          </span>
                        </div>
                        <p className="text-[10px] text-neutral-500 truncate max-w-[240px]">
                          {p.notes}
                        </p>
                      </div>
                      <span className="text-[10px] bg-neutral-100 text-neutral-800 font-semibold px-2 py-0.5 rounded">
                        {p.assignedVideoIds.length} Videos
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="bg-neutral-50 px-6 py-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
          <span>Need your PIN? Contact 6005754205</span>
          <span className="font-mono">RMC Secure Auth</span>
        </div>
      </div>
    </div>
  );
};
