import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap');

  :root {
    --bg: #050508;
    --surface: #0d0d14;
    --surface2: #13131e;
    --border: rgba(255,255,255,0.06);
    --border2: rgba(255,255,255,0.1);
    --text: #f0f0f8;
    --text2: #6b6b80;
    --text3: #3a3a50;
    --accent: #6c63ff;
    --accent2: #9d97ff;
    --green: #00d68f;
    --red: #ff4757;
    --yellow: #ffd32a;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Outfit', sans-serif;
    min-height: 100vh;
  }

  .app {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 260px 1fr;
    grid-template-rows: auto 1fr;
  }

  /* Sidebar */
  .sidebar {
    grid-row: 1 / 3;
    background: var(--surface);
    border-right: 1px solid var(--border);
    padding: 32px 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 32px;
    padding: 0 8px;
  }

  .logo-icon {
    width: 36px;
    height: 36px;
    background: var(--accent);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
  }

  .logo-text {
    font-size: 17px;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: var(--text);
  }

  .logo-text span { color: var(--accent2); }

  .nav-section {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--text3);
    padding: 0 8px;
    margin: 16px 0 6px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.15s;
    color: var(--text2);
    font-size: 14px;
    font-weight: 500;
    border: 1px solid transparent;
  }

  .nav-item:hover { background: var(--surface2); color: var(--text); }

  .nav-item.active {
    background: rgba(108,99,255,0.12);
    color: var(--accent2);
    border-color: rgba(108,99,255,0.2);
  }

  .nav-icon { font-size: 16px; width: 20px; text-align: center; }

  .nav-badge {
    margin-left: auto;
    background: var(--accent);
    color: white;
    font-size: 10px;
    font-weight: 700;
    padding: 2px 7px;
    border-radius: 100px;
  }

  .nav-badge.green { background: var(--green); }

  .sidebar-footer {
    margin-top: auto;
    padding: 16px 8px 0;
    border-top: 1px solid var(--border);
  }

  .sidebar-footer-text {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: var(--text3);
    letter-spacing: 0.05em;
    line-height: 1.8;
  }

  /* Topbar */
  .topbar {
    grid-column: 2;
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    padding: 0 40px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .topbar-title {
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  .topbar-sub {
    font-size: 13px;
    color: var(--text2);
    margin-top: 1px;
  }

  .status-dot {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: var(--green);
  }

  .status-dot::before {
    content: '';
    width: 7px;
    height: 7px;
    background: var(--green);
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  /* Main */
  .main {
    grid-column: 2;
    padding: 40px;
    overflow-y: auto;
  }

  /* Niche selector */
  .niche-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 10px;
    margin-bottom: 28px;
  }

  .niche-card {
    padding: 14px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.15s;
    text-align: center;
  }

  .niche-card:hover { border-color: var(--border2); background: var(--surface2); }

  .niche-card.selected {
    background: rgba(108,99,255,0.1);
    border-color: rgba(108,99,255,0.4);
  }

  .niche-emoji { font-size: 24px; margin-bottom: 6px; }
  .niche-name { font-size: 12px; font-weight: 600; color: var(--text); }
  .niche-desc { font-size: 11px; color: var(--text2); margin-top: 2px; }

  /* Input area */
  .input-row {
    display: flex;
    gap: 12px;
    margin-bottom: 32px;
  }

  .topic-input {
    flex: 1;
    background: var(--surface);
    border: 1px solid var(--border2);
    border-radius: 12px;
    padding: 16px 20px;
    color: var(--text);
    font-family: 'Outfit', sans-serif;
    font-size: 15px;
    outline: none;
    transition: border-color 0.2s;
  }

  .topic-input:focus { border-color: var(--accent); }
  .topic-input::placeholder { color: var(--text3); }

  .gen-btn {
    padding: 16px 28px;
    background: var(--accent);
    border: none;
    border-radius: 12px;
    color: white;
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
    letter-spacing: 0.02em;
  }

  .gen-btn:hover:not(:disabled) {
    background: var(--accent2);
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(108,99,255,0.3);
  }

  .gen-btn:disabled { opacity: 0.4; cursor: not-allowed; }

  /* Quick topics */
  .quick-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--text3);
    margin-bottom: 10px;
  }

  .quick-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 32px; }

  .quick-chip {
    padding: 6px 14px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 100px;
    font-size: 12px;
    color: var(--text2);
    cursor: pointer;
    transition: all 0.15s;
  }

  .quick-chip:hover { border-color: var(--accent); color: var(--accent2); background: rgba(108,99,255,0.06); }

  /* Results grid */
  .results { display: flex; flex-direction: column; gap: 16px; animation: fadeUp 0.4s ease; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .result-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

  .result-block {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    transition: border-color 0.15s;
  }

  .result-block:hover { border-color: var(--border2); }
  .result-block.full { grid-column: 1 / -1; }

  .block-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 18px;
    border-bottom: 1px solid var(--border);
    background: rgba(255,255,255,0.01);
  }

  .block-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text2);
    font-family: 'JetBrains Mono', monospace;
  }

  .block-icon { font-size: 14px; }

  .copy-pill {
    padding: 4px 12px;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 100px;
    font-size: 11px;
    font-family: 'JetBrains Mono', monospace;
    color: var(--text2);
    cursor: pointer;
    transition: all 0.15s;
  }

  .copy-pill:hover { border-color: var(--accent); color: var(--accent2); }
  .copy-pill.copied { background: rgba(0,214,143,0.1); border-color: rgba(0,214,143,0.3); color: var(--green); }

  .block-body {
    padding: 18px;
    font-size: 14px;
    line-height: 1.7;
    color: #c8c8e0;
  }

  .title-text {
    font-size: 18px;
    font-weight: 700;
    color: var(--text);
    letter-spacing: -0.01em;
    line-height: 1.4;
  }

  /* Scenes */
  .scenes { display: flex; flex-direction: column; }

  .scene {
    padding: 18px;
    border-bottom: 1px solid var(--border);
    transition: background 0.15s;
  }

  .scene:last-child { border-bottom: none; }
  .scene:hover { background: rgba(255,255,255,0.01); }

  .scene-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .scene-badge {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .scene-num {
    width: 26px;
    height: 26px;
    background: rgba(108,99,255,0.15);
    border: 1px solid rgba(108,99,255,0.3);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    color: var(--accent2);
  }

  .scene-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text3);
  }

  .scene-script {
    font-size: 14px;
    color: #c8c8e0;
    line-height: 1.7;
    margin-bottom: 12px;
  }

  .scene-prompt-box {
    background: rgba(108,99,255,0.06);
    border: 1px solid rgba(108,99,255,0.15);
    border-radius: 10px;
    padding: 12px 14px;
  }

  .scene-prompt-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 6px;
  }

  .scene-prompt-text {
    font-size: 12px;
    color: var(--accent2);
    line-height: 1.6;
    font-family: 'JetBrains Mono', monospace;
  }

  /* Tags */
  .tags-wrap { display: flex; flex-wrap: wrap; gap: 8px; padding: 18px; }

  .tag {
    padding: 5px 12px;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 100px;
    font-size: 12px;
    color: var(--text2);
    font-family: 'JetBrains Mono', monospace;
  }

  /* Steps */
  .steps { display: flex; flex-direction: column; gap: 0; }

  .step {
    display: flex;
    gap: 16px;
    align-items: flex-start;
    padding: 14px 18px;
    border-bottom: 1px solid var(--border);
    transition: background 0.15s;
  }

  .step:last-child { border-bottom: none; }
  .step:hover { background: rgba(255,255,255,0.01); }

  .step-num {
    width: 28px;
    height: 28px;
    background: var(--surface2);
    border: 1px solid var(--border2);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    color: var(--text2);
    flex-shrink: 0;
    margin-top: 1px;
  }

  .step-text { font-size: 13px; color: var(--text2); line-height: 1.6; padding-top: 4px; }

  /* Error */
  .error-box {
    padding: 16px; background: rgba(255,71,87,0.08);
    border: 1px solid rgba(255,71,87,0.2); border-radius: 12px;
    font-size: 13px; color: var(--red); font-family: 'JetBrains Mono', monospace;
    margin-bottom: 20px;
  }

  /* Loading */
  .loading-bar {
    width: 100%; height: 2px; background: var(--surface2);
    border-radius: 2px; overflow: hidden; margin-bottom: 32px;
  }

  .loading-bar-inner {
    height: 100%;
    background: linear-gradient(90deg, var(--accent), var(--accent2), var(--accent));
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    width: 60%;
  }

  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  .loading-msg {
    text-align: center;
    padding: 60px 20px;
    color: var(--text2);
    font-size: 14px;
    line-height: 2;
  }

  .loading-msg .big { font-size: 32px; margin-bottom: 12px; }

  /* Mobile */
  @media (max-width: 768px) {
    .app { grid-template-columns: 1fr; grid-template-rows: auto auto 1fr; }
    .sidebar { grid-row: auto; height: auto; position: static; flex-direction: row; flex-wrap: wrap; padding: 16px; gap: 4px; }
    .logo { margin-bottom: 0; margin-right: 16px; }
    .nav-section { display: none; }
    .sidebar-footer { display: none; }
    .topbar { grid-column: 1; padding: 0 20px; }
    .main { grid-column: 1; padding: 20px; }
    .result-row { grid-template-columns: 1fr; }
    .niche-grid { grid-template-columns: repeat(3, 1fr); }
  }
`;

const NICHES = [
  { id: "truecrime", emoji: "🔪", name: "True Crime", desc: "Dark & suspenseful", topics: ["The Zodiac Killer", "Jack the Ripper", "DB Cooper", "The Black Dahlia", "Ted Bundy", "Aileen Wuornos"] },
  { id: "facts", emoji: "🧠", name: "Facts", desc: "Mind-blowing info", topics: ["5 Space Facts That Will Blow Your Mind", "The Deepest Place on Earth", "Ancient Civilizations Mysteries", "The Human Brain Facts", "Ocean Creatures Nobody Knows"] },
  { id: "motivation", emoji: "🔥", name: "Motivation", desc: "Inspire & uplift", topics: ["How Elon Musk Thinks Differently", "The 5AM Club Secret", "Why Most People Stay Broke", "The Power of Discipline", "What Successful People Do Daily"] },
  { id: "history", emoji: "📜", name: "History", desc: "Untold stories", topics: ["The Lost City of El Dorado", "Ancient Egypt Secrets", "The Real Story of Cleopatra", "How Rome Really Fell", "The Mystery of Stonehenge"] },
  { id: "science", emoji: "🔬", name: "Science", desc: "Discoveries & tech", topics: ["NASA's Most Shocking Discovery", "What Happens After You Die", "The Simulation Theory Explained", "CERN's Dark Experiments", "AI Will Change Everything"] },
  { id: "mystery", emoji: "👁️", name: "Mystery", desc: "Unexplained events", topics: ["The Bermuda Triangle Truth", "Area 51 Declassified", "The Voynich Manuscript", "Skinwalker Ranch Evidence", "The Dyatlov Pass Incident"] },
];

const STEPS = [
  "Copy each scene's video prompt → paste into Kling AI or Pika Labs → generate the clip",
  "Download all 5 video clips to your device",
  "Open CapCut (free app) → import clips in order",
  "Add voiceover using your own voice or a text-to-speech app like ElevenLabs",
  "Add the hook as a bold text overlay on scene 1",
  "Add background music from CapCut's free library",
  "Export as 9:16 vertical video at 1080p",
  "Upload to YouTube Shorts with the title, description and tags above",
];

export default function App() {
  const [niche, setNiche] = useState("truecrime");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(null);

  const selectedNiche = NICHES.find(n => n.id === niche);

  const generate = async () => {
    if (!topic.trim()) return;
    setLoading(true); setError(""); setResult(null);

    try {
      const response = await fetch("/.netlify/functions/youtube", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, niche: selectedNiche.name })
      });

      const data = await response.json();
      const text = data.content?.[0]?.text || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setResult(parsed);
    } catch (e) {
      setError("Failed to generate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">

        {/* Sidebar */}
        <div className="sidebar">
          <div className="logo">
            <div className="logo-icon">▶</div>
            <div className="logo-text">Tube<span>AI</span></div>
          </div>

          <div className="nav-section">Tools</div>
          <div className="nav-item active"><span className="nav-icon">⚡</span> Generator <span className="nav-badge green">Free</span></div>
          <div className="nav-item"><span className="nav-icon">📊</span> Analytics</div>
          <div className="nav-item"><span className="nav-icon">📁</span> Saved Videos</div>

          <div className="nav-section">Niches</div>
          {NICHES.map(n => (
            <div key={n.id} className={`nav-item ${niche === n.id ? "active" : ""}`} onClick={() => { setNiche(n.id); setTopic(""); setResult(null); }}>
              <span className="nav-icon">{n.emoji}</span> {n.name}
            </div>
          ))}

          <div className="sidebar-footer">
            <div className="sidebar-footer-text">
              Powered by AI<br />
              Free to use<br />
              Made for creators
            </div>
          </div>
        </div>

        {/* Topbar */}
        <div className="topbar">
          <div>
            <div className="topbar-title">{selectedNiche.emoji} {selectedNiche.name} YouTube Shorts</div>
            <div className="topbar-sub">{selectedNiche.desc} — generate a full video package in seconds</div>
          </div>
          <div className="status-dot">AI Ready</div>
        </div>

        {/* Main */}
        <div className="main">

          {/* Niche Selector */}
          <div className="quick-label">Select Niche</div>
          <div className="niche-grid">
            {NICHES.map(n => (
              <div key={n.id} className={`niche-card ${niche === n.id ? "selected" : ""}`} onClick={() => { setNiche(n.id); setTopic(""); setResult(null); }}>
                <div className="niche-emoji">{n.emoji}</div>
                <div className="niche-name">{n.name}</div>
                <div className="niche-desc">{n.desc}</div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="input-row">
            <input
              className="topic-input"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              onKeyDown={e => e.key === "Enter" && generate()}
              placeholder={`Enter a ${selectedNiche.name.toLowerCase()} topic...`}
            />
            <button className="gen-btn" onClick={generate} disabled={loading || !topic.trim()}>
              {loading ? "Generating..." : "⚡ Generate"}
            </button>
          </div>

          {/* Quick Topics */}
          <div className="quick-label">Quick Topics</div>
          <div className="quick-chips">
            {selectedNiche.topics.map(t => (
              <div key={t} className="quick-chip" onClick={() => setTopic(t)}>{t}</div>
            ))}
          </div>

          {/* Error */}
          {error && <div className="error-box">⚠ {error}</div>}

          {/* Loading */}
          {loading && (
            <div>
              <div className="loading-bar"><div className="loading-bar-inner" /></div>
              <div className="loading-msg">
                <div className="big">⚡</div>
                Generating your full YouTube package...<br />
                <span style={{fontSize: 12, color: "var(--text3)"}}>Script · Video Prompts · Title · Tags · Description</span>
              </div>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="results">

              {/* Title + Hook */}
              <div className="result-row">
                <div className="result-block">
                  <div className="block-header">
                    <div className="block-title"><span className="block-icon">📌</span> YouTube Title</div>
                    <button className={`copy-pill ${copied === "title" ? "copied" : ""}`} onClick={() => copy(result.title, "title")}>{copied === "title" ? "✓ Copied" : "Copy"}</button>
                  </div>
                  <div className="block-body"><div className="title-text">{result.title}</div></div>
                </div>
                <div className="result-block">
                  <div className="block-header">
                    <div className="block-title"><span className="block-icon">⚡</span> Opening Hook</div>
                    <button className={`copy-pill ${copied === "hook" ? "copied" : ""}`} onClick={() => copy(result.hook, "hook")}>{copied === "hook" ? "✓ Copied" : "Copy"}</button>
                  </div>
                  <div className="block-body">{result.hook}</div>
                </div>
              </div>

              {/* Scenes */}
              <div className="result-block full">
                <div className="block-header">
                  <div className="block-title"><span className="block-icon">🎬</span> 5 Scenes — Script + Video Prompts</div>
                  <button className={`copy-pill ${copied === "scenes" ? "copied" : ""}`} onClick={() => copy(result.scenes?.map((s,i) => `SCENE ${i+1}\nScript: ${s.script}\nVideo Prompt: ${s.videoPrompt}`).join("\n\n"), "scenes")}>{copied === "scenes" ? "✓ Copied" : "Copy All"}</button>
                </div>
                <div className="scenes">
                  {result.scenes?.map((scene, i) => (
                    <div key={i} className="scene">
                      <div className="scene-top">
                        <div className="scene-badge">
                          <div className="scene-num">{i + 1}</div>
                          <div className="scene-label">Scene {i + 1} of 5</div>
                        </div>
                        <button className={`copy-pill ${copied === "s"+i ? "copied" : ""}`} onClick={() => copy(`${scene.script}\n\nVideo Prompt: ${scene.videoPrompt}`, "s"+i)}>{copied === "s"+i ? "✓" : "Copy"}</button>
                      </div>
                      <div className="scene-script">{scene.script}</div>
                      <div className="scene-prompt-box">
                        <div className="scene-prompt-label">🎬 AI Video Prompt</div>
                        <div className="scene-prompt-text">{scene.videoPrompt}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Thumbnail + Description */}
              <div className="result-row">
                <div className="result-block">
                  <div className="block-header">
                    <div className="block-title"><span className="block-icon">🖼️</span> Thumbnail Concept</div>
                    <button className={`copy-pill ${copied === "thumb" ? "copied" : ""}`} onClick={() => copy(result.thumbnail, "thumb")}>{copied === "thumb" ? "✓ Copied" : "Copy"}</button>
                  </div>
                  <div className="block-body">{result.thumbnail}</div>
                </div>
                <div className="result-block">
                  <div className="block-header">
                    <div className="block-title"><span className="block-icon">📝</span> Description</div>
                    <button className={`copy-pill ${copied === "desc" ? "copied" : ""}`} onClick={() => copy(result.description, "desc")}>{copied === "desc" ? "✓ Copied" : "Copy"}</button>
                  </div>
                  <div className="block-body">{result.description}</div>
                </div>
              </div>

              {/* Tags */}
              <div className="result-block full">
                <div className="block-header">
                  <div className="block-title"><span className="block-icon">🏷️</span> Tags</div>
                  <button className={`copy-pill ${copied === "tags" ? "copied" : ""}`} onClick={() => copy(result.tags?.join(", "), "tags")}>{copied === "tags" ? "✓ Copied" : "Copy All"}</button>
                </div>
                <div className="tags-wrap">
                  {result.tags?.map(tag => <span key={tag} className="tag">#{tag}</span>)}
                </div>
              </div>

              {/* Next Steps */}
              <div className="result-block full">
                <div className="block-header">
                  <div className="block-title"><span className="block-icon">✅</span> Your Next Steps</div>
                </div>
                <div className="steps">
                  {STEPS.map((step, i) => (
                    <div key={i} className="step">
                      <div className="step-num">{i + 1}</div>
                      <div className="step-text">{step}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </>
  );
}
