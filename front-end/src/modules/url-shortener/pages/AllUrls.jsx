import React, { useEffect, useState } from "react";

const API_BASE = (import.meta.env.VITE_BASE_URL || "http://localhost:1234").replace(/\/+$/,'');

const AllUrls = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email"); // if controller reads email from header

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const url = `${API_BASE}/urls`;
        console.log("FETCH ->", url);
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "X-User-Email": email || ""
          }
        });
        const text = await res.text();
        if (!res.ok) throw new Error(`Failed to fetch URLs (${res.status})`);
        let data;
        try { data = JSON.parse(text); }
        catch { throw new Error("API did not return JSON: " + text.slice(0, 120)); }

        const list = (Array.isArray(data) ? data : data?.urls || []).map(u => ({
          id: u.id || u._id,
          original: u.original ?? u.originalUrl ?? u.bigurl,
          short: u.short ?? (u.shortCode ? `${window.location.origin}/${u.shortCode}` : (u.shortid ? `${API_BASE}/small/${u.shortid}` : "")),
          createdAt: u.createdAt,
          clicks: u.clicks ?? 0
        }));
        if (!ignore) setUrls(list);
      } catch (e) {
        if (!ignore) setErr(e.message || "Error while loading URLs");
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => { ignore = true; };
  }, [token, email]);

  const copyToClipboard = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    alert("Copied: " + text);
  };

  const handleDelete = async (id) => {
    if (!id) return;
    try {
      const url = `${API_BASE}/urls/${id}`;
      console.log("DELETE ->", url);
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "X-User-Email": email || ""
        }
      });
      if (!res.ok) throw new Error(`Delete failed (${res.status})`);
      setUrls(prev => prev.filter(u => u.id !== id));
    } catch (e) {
      alert(e.message || "Delete failed");
    }
  };

  if (loading) return <p className="text-gray-600">Loading URLs...</p>;
  if (err) return <p className="text-red-600">{err}</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">My URLs</h2>
      {urls.length === 0 ? (
        <p className="text-gray-500">No URLs found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left text-sm uppercase">
                <th className="p-3">Original URL</th>
                <th className="p-3">Short URL</th>
                <th className="p-3">Created On</th>
                <th className="p-3">Clicks</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {urls.map((url) => (
                <tr key={url.id} className="border-b hover:bg-gray-50 text-sm text-gray-800">
                  <td className="p-3 max-w-xs truncate" title={url.original}>{url.original}</td>
                  <td className="p-3 flex items-center gap-2">
                    {url.short ? (
                      <a href={url.short} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                        {url.short}
                      </a>
                    ) : <span className="text-gray-500">-</span>}
                    {url.short && (
                      <button onClick={() => copyToClipboard(url.short)} className="text-xs px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">
                        Copy
                      </button>
                    )}
                  </td>
                  <td className="p-3">{url.createdAt ? new Date(url.createdAt).toLocaleString() : "-"}</td>
                  <td className="p-3 text-center">{url.clicks}</td>
                  <td className="p-3 flex gap-2">
                    <button onClick={() => copyToClipboard(url.original)} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                      Copy
                    </button>
                    <button onClick={() => handleDelete(url.id)} className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllUrls;
