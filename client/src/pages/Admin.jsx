import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiRefreshCw, FiLogOut, FiLock, FiInbox, FiSearch, FiExternalLink } from 'react-icons/fi';
import { API_BASE } from '../config';

const API = `${API_BASE}/api/contacts`;
const KEY_STORE = 'navya_admin_key';

function fmtDate(d) {
  if (!d) return '';
  return new Date(d).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });
}

function Admin() {
  const [key, setKey] = useState(() => localStorage.getItem(KEY_STORE) || '');
  const [input, setInput] = useState('');
  const [authed, setAuthed] = useState(false);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  const fetchData = async (adminKey) => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(API, { headers: { 'x-admin-key': adminKey } });
      setRows(res.data.data || []);
      setAuthed(true);
      setKey(adminKey);
      localStorage.setItem(KEY_STORE, adminKey);
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Invalid passcode. Please try again.');
        localStorage.removeItem(KEY_STORE);
        setAuthed(false);
      } else {
        setError('Could not reach the server. Make sure the backend is running on port 5001.');
      }
    } finally {
      setLoading(false);
    }
  };

  // auto-login if a key is already stored
  useEffect(() => {
    if (key) fetchData(key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    localStorage.removeItem(KEY_STORE);
    setKey('');
    setAuthed(false);
    setRows([]);
    setInput('');
  };

  const filtered = rows.filter((r) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return [r.name, r.companyName, r.phone, r.email, r.city, r.businessType, r.message]
      .filter(Boolean)
      .some((v) => String(v).toLowerCase().includes(q));
  });

  /* ---------------------------------------------------- passcode gate ---- */
  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b2545] px-4">
        <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl">
          <div className="flex items-center gap-2.5">
            <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="Navya Customs logo" className="h-10 w-10 rounded-full object-cover" />
            <div>
              <p className="text-sm font-extrabold text-[#0b2545]">Navya Admin</p>
              <p className="text-xs text-slate-400">Submissions Dashboard</p>
            </div>
          </div>

          <h1 className="mt-6 flex items-center gap-2 text-lg font-bold text-[#0b2545]">
            <FiLock className="text-emerald-600" /> Enter passcode
          </h1>
          <p className="mt-1 text-sm text-slate-500">Access is restricted to Navya Customization staff.</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (input.trim()) fetchData(input.trim());
            }}
            className="mt-5"
          >
            <input
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Admin passcode"
              autoFocus
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
            />
            {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:opacity-60"
            >
              {loading ? 'Checking…' : 'Unlock Dashboard'}
            </button>
          </form>

          <Link to="/" className="mt-4 block text-center text-xs text-slate-400 hover:text-emerald-600">
            ← Back to website
          </Link>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------- dashboard ---- */
  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      {/* top bar */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-[#0b2545] text-white">
        <div className="mx-auto flex max-w-[1300px] items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="Navya Customs logo" className="h-9 w-9 rounded-full object-cover" />
            <div className="leading-tight">
              <p className="text-sm font-extrabold">Navya Admin</p>
              <p className="text-[11px] text-slate-300">Quote Submissions</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Link to="/" className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-white/10 sm:flex">
              <FiExternalLink size={15} /> View site
            </Link>
            <button
              onClick={() => fetchData(key)}
              className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-2 text-sm font-medium transition hover:bg-white/20"
            >
              <FiRefreshCw size={15} className={loading ? 'animate-spin' : ''} /> Refresh
            </button>
            <button onClick={logout} className="flex items-center gap-1.5 rounded-lg bg-rose-500/90 px-3 py-2 text-sm font-medium transition hover:bg-rose-600">
              <FiLogOut size={15} /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1300px] px-4 py-6 sm:px-6">
        {/* stat + search */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <FiInbox size={22} />
            </span>
            <div>
              <p className="text-2xl font-extrabold text-[#0b2545]">{rows.length}</p>
              <p className="text-sm text-slate-500">Total quote requests</p>
            </div>
          </div>
          <div className="flex items-center rounded-xl border border-slate-200 bg-white px-3 py-2 sm:w-72">
            <FiSearch className="text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, email, city…"
              className="w-full bg-transparent px-2 text-sm outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        {error && <p className="mb-4 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}

        {/* table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Contact</th>
                  <th className="px-4 py-3 font-semibold">City</th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold">Size</th>
                  <th className="px-4 py-3 font-semibold">Qty</th>
                  <th className="px-4 py-3 font-semibold">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center text-slate-400">
                      {loading ? 'Loading…' : rows.length === 0 ? 'No submissions yet.' : 'No matches for your search.'}
                    </td>
                  </tr>
                ) : (
                  filtered.map((r) => (
                    <tr key={r._id} className="align-top transition hover:bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-500">{fmtDate(r.createdAt)}</td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-[#0b2545]">{r.name}</p>
                        {r.companyName && <p className="text-xs text-slate-400">{r.companyName}</p>}
                      </td>
                      <td className="px-4 py-3">
                        <a href={`tel:${r.phone}`} className="block text-slate-700 hover:text-emerald-600">{r.phone}</a>
                        <a href={`mailto:${r.email}`} className="block text-xs text-slate-400 hover:text-emerald-600">{r.email}</a>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{r.city || '—'}</td>
                      <td className="px-4 py-3 text-slate-600">{r.businessType || '—'}</td>
                      <td className="px-4 py-3 text-slate-600">{r.bottleSize || '—'}</td>
                      <td className="px-4 py-3 text-slate-600">{r.quantity || '—'}</td>
                      <td className="px-4 py-3 text-slate-600">
                        <span className="line-clamp-2 max-w-xs" title={r.message}>{r.message}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-slate-400">
          Data source: MongoDB · navya-customization · contacts
        </p>
      </main>
    </div>
  );
}

export default Admin;
