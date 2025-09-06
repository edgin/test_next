'use client';

import React from 'react';
import { useEffect, useState } from 'react';

type Post = { id: number; title: string, body: string };


export default function Home () {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

 useEffect(() => {
    let alive = true;

    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json) => alive && setData(json))
      .catch((e) => alive && setErr(e.message))
      .finally(() => alive && setLoading(false));

  }, []);


return (
  <div>
    <div className="frontlogo">
      <div className="banner">
        <span className="tagline">Luxury macarons made by hand</span>
          {loading && <p>Loading…</p>}
          {err && <p style={{ color: 'crimson' }}>Error: {err}</p>}
          {data && (
            <ul>
              {data.map((p) => (
                <li key={p.id}>{p.id}{p.title}</li>
              ))}
            </ul>
          )}
      </div>
    </div>
  </div>
  )
}
