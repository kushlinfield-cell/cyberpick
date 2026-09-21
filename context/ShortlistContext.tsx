"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type ShortlistState = {
  shortlist: string[];
  requestSent: boolean;
  isShortlisted: (slug: string) => boolean;
  toggleShortlist: (slug: string) => void;
  sendRequest: () => void;
};

const ShortlistContext = createContext<ShortlistState | null>(null);

const STORAGE_KEY = "cyberpick-prototype:shortlist";
const REQUEST_KEY = "cyberpick-prototype:request-sent";

export function ShortlistProvider({ children }: { children: React.ReactNode }) {
  const [shortlist, setShortlist] = useState<string[]>([]);
  const [requestSent, setRequestSent] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setShortlist(JSON.parse(raw));
      const sent = window.localStorage.getItem(REQUEST_KEY);
      if (sent) setRequestSent(sent === "true");
    } catch {
      // localStorage unavailable — fall back to in-memory state only.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(shortlist));
    } catch {
      // ignore
    }
  }, [shortlist, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(REQUEST_KEY, String(requestSent));
    } catch {
      // ignore
    }
  }, [requestSent, hydrated]);

  const toggleShortlist = useCallback((slug: string) => {
    setShortlist((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
    setRequestSent(false);
  }, []);

  const isShortlisted = useCallback((slug: string) => shortlist.includes(slug), [shortlist]);
  const sendRequest = useCallback(() => setRequestSent(true), []);

  const value = useMemo(
    () => ({ shortlist, requestSent, isShortlisted, toggleShortlist, sendRequest }),
    [shortlist, requestSent, isShortlisted, toggleShortlist, sendRequest]
  );

  return <ShortlistContext.Provider value={value}>{children}</ShortlistContext.Provider>;
}

export function useShortlist() {
  const ctx = useContext(ShortlistContext);
  if (!ctx) {
    throw new Error("useShortlist must be used within a ShortlistProvider");
  }
  return ctx;
}
