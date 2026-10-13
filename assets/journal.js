/* ==========================================================================
   The journal — client.
   Talks to the small local service in journal/server.py, which keeps every
   entry in a file on this computer (journal/data/journal.jsonl).
   It only wakes on this computer (127.0.0.1 or localhost); on the public
   site it stays silent and nothing of it shows.

   SCJournal.ready          Promise<boolean>  the service answered
   SCJournal.available      boolean           (after ready)
   SCJournal.list(from, to) entries with from <= at < to (ms)
   SCJournal.add(entry)     { kind, at, text?, name?, window?, value?, unit?, done?, matrix? }
   SCJournal.update(entry)  entry with its id; only the given fields change
   SCJournal.remove(id)
   SCJournal.MEASURES       what the day sheet asks for
   ========================================================================== */
(function () {
  'use strict';
  const LOCAL = /^(127\.0\.0\.1|localhost)$/.test(location.hostname) && location.protocol === 'http:';
  const OFF = new URLSearchParams(location.search).get('journal') === 'off';
  const API = '/api/journal';

  /* the measures of a day: 1–5 scales and a number */
  const MEASURES = [
    { name: 'sleep',  label: 'Sleep',  scale: 5, low: 'broken', high: 'deep' },
    { name: 'energy', label: 'Energy', scale: 5, low: 'drained', high: 'full' },
    { name: 'mood',   label: 'Mood',   scale: 5, low: 'heavy', high: 'bright' },
    { name: 'focus',  label: 'Focus',  scale: 5, low: 'scattered', high: 'clear' },
    { name: 'weight', label: 'Weight', unit: 'kg', step: 0.1, min: 20, max: 300 }
  ];

  const J = { available: false, local: LOCAL && !OFF, MEASURES, version: 0 };

  async function call(method, url, body) {
    const opt = { method, headers: {}, cache: 'no-store' };
    if (body) { opt.headers['Content-Type'] = 'application/json'; opt.headers['X-SC-Journal'] = '1'; opt.body = JSON.stringify(body); }
    const r = await fetch(url, opt);
    const data = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(data.error || ('HTTP ' + r.status));
    return data;
  }

  J.ready = (LOCAL && !OFF)
    ? call('GET', API + '/ping').then(d => { J.available = !!d.ok; J.version = d.version; return J.available; }).catch(() => false)
    : Promise.resolve(false);

  J.list = (from, to) => call('GET', `${API}?from=${Math.floor(from)}&to=${Math.ceil(to)}`).then(d => d.entries || []);
  J.add = e => call('POST', API, { op: 'add', entry: e }).then(d => { fire(); return d.entry; });
  J.update = e => call('POST', API, { op: 'update', entry: e }).then(d => { fire(); return d.entry; });
  J.remove = id => call('POST', API, { op: 'delete', entry: { id } }).then(d => { fire(); return d.entry; });

  function fire() { try { document.dispatchEvent(new CustomEvent('sc-journal')); } catch (e) {} }

  window.SCJournal = J;
})();
