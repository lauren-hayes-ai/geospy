"use client";

import { useState, useEffect, useCallback } from "react";

interface ApiKey {
  id: string;
  key_prefix: string;
  name: string;
  daily_limit: number;
  created_at: string;
  usage_today: number;
}

export default function Dashboard() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [newKey, setNewKey] = useState<string | null>(null);
  const [keyName, setKeyName] = useState("Default");

  const fetchKeys = useCallback(async () => {
    const res = await fetch("/api/keys");
    if (res.ok) {
      const data = await res.json();
      setKeys(data.keys || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchKeys(); }, [fetchKeys]);

  const createKey = async () => {
    const res = await fetch("/api/keys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: keyName }),
    });
    if (res.ok) {
      const data = await res.json();
      setNewKey(data.key);
      setKeyName("Default");
      fetchKeys();
    }
  };

  const revokeKey = async (id: string) => {
    await fetch("/api/keys/" + id, { method: "DELETE" });
    fetchKeys();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-400 mb-8">Manage your API keys and monitor usage. (Auth0 sign-in pending setup)</p>

      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-8 text-sm text-yellow-300">
        ⚠️ Auth0 integration pending — dashboard functionality will be enabled once Auth0 credentials are configured.
      </div>

      {newKey && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 mb-8">
          <div className="text-sm text-emerald-400 font-medium mb-2">New API Key Created</div>
          <code className="text-lg font-mono text-white bg-gray-800 px-4 py-2 rounded block break-all">{newKey}</code>
        </div>
      )}

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Create API Key</h2>
        <div className="flex gap-3">
          <input type="text" value={keyName} onChange={(e) => setKeyName(e.target.value)} placeholder="Key name" className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm flex-1 focus:outline-none focus:border-emerald-500" />
          <button onClick={createKey} className="bg-emerald-600 hover:bg-emerald-500 px-6 py-2 rounded-lg text-sm font-medium transition">Create Key</button>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-800"><h2 className="text-lg font-semibold">Your API Keys</h2></div>
        {loading ? (
          <div className="p-6 text-gray-400">Loading...</div>
        ) : keys.length === 0 ? (
          <div className="p-6 text-gray-400">No API keys yet.</div>
        ) : (
          <div className="divide-y divide-gray-800">
            {keys.map((k) => (
              <div key={k.id} className="p-6 flex items-center justify-between">
                <div>
                  <div className="font-medium">{k.name}</div>
                  <div className="text-sm text-gray-400 font-mono">{k.key_prefix}........</div>
                  <div className="text-xs text-gray-500 mt-1">{k.usage_today} / {k.daily_limit} used today</div>
                </div>
                <button onClick={() => revokeKey(k.id)} className="text-sm text-red-400 border border-red-400/30 px-4 py-2 rounded-lg">Revoke</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
