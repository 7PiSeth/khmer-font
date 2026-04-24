import { useState, useRef, useEffect, useCallback } from "react";

const FONTS = [
  { label: "Nokora", value: "'Nokora'" }, // Moved to top for easy access
  { label: "Angkor", value: "'Angkor'" },
  { label: "Battambang", value: "'Battambang'" },
  { label: "Bayon", value: "'Bayon'" },
  { label: "Bokor", value: "'Bokor'" },
  { label: "Chenla", value: "'Chenla'" },
  { label: "Content", value: "'Content'" },
  { label: "Dangrek", value: "'Dangrek'" },
  { label: "Fasthand", value: "'Fasthand'" },
  { label: "Freehand", value: "'Freehand'" },
  { label: "Hanuman", value: "'Hanuman'" },
  { label: "Kantumruy Pro", value: "'Kantumruy Pro'" },
  { label: "Kdam Thmor Pro", value: "'Kdam Thmor Pro'" },
  { label: "Khmer", value: "'Khmer'" },
  { label: "Koh Santepheap", value: "'Koh Santepheap'" },
  { label: "Konkhmer Sleokchher", value: "'Konkhmer Sleokchher'" },
  { label: "Koulen", value: "'Koulen'" },
  { label: "Metal", value: "'Metal'" },
  { label: "Moul", value: "'Moul'" },
  { label: "Moulpali", value: "'Moulpali'" },
  { label: "Noto Sans Khmer", value: "'Noto Sans Khmer'" },
  { label: "Noto Serif Khmer", value: "'Noto Serif Khmer'" },
  { label: "Odor Mean Chey", value: "'Odor Mean Chey'" },
  { label: "Preahvihear", value: "'Preahvihear'" },
  { label: "Siemreap", value: "'Siemreap'" },
  { label: "Suwannaphum", value: "'Suwannaphum'" },
  { label: "Taprom", value: "'Taprom'" }
];

const FONT_SIZES = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 60, 72];

const BLOCK_FORMATS = [
  { label: "Paragraph", value: "p" },
  { label: "Heading 1", value: "h1" },
  { label: "Heading 2", value: "h2" },
  { label: "Heading 3", value: "h3" },
  { label: "Heading 4", value: "h4" },
  { label: "Blockquote", value: "blockquote" },
  { label: "Code Block", value: "pre" },
];

const COLORS = [
  "#000000", "#434343", "#666666", "#999999", "#b7b7b7", "#cccccc", "#d9d9d9", "#ffffff",
  "#ff0000", "#ff9900", "#ffff00", "#00ff00", "#00ffff", "#4a86e8", "#0000ff", "#9900ff",
  "#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0",
];

const TbSep = () => (
  <div style={{ width: 1, height: 20, background: "#ccc", margin: "0 3px", flexShrink: 0 }} />
);

const TbBtn = ({ title, active, onClick, children, style = {} }) => (
  <button
    title={title}
    onMouseDown={e => { e.preventDefault(); onClick?.(); }}
    style={{
      background: active ? "#dbe4ff" : "none",
      border: active ? "1px solid #748ffc" : "1px solid transparent",
      borderRadius: 3, padding: "2px 4px", cursor: "pointer",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: active ? "#3b5bdb" : "#444", height: 26, minWidth: 26,
      fontSize: 12, fontFamily: "inherit", transition: "background .1s",
      ...style,
    }}
  >
    {children}
  </button>
);

const ColorPicker = ({ label, onApply }) => {
  const [custom, setCustom] = useState("#e03131");
  return (
    <div style={{
      position: "absolute", top: 30, left: 0, zIndex: 3000,
      background: "#fff", border: "1px solid #ccc", borderRadius: 4,
      padding: 8, boxShadow: "0 4px 16px rgba(0,0,0,.18)", width: 198,
      fontFamily: "system-ui, sans-serif",
    }}>
      <div style={{ fontSize: 11, color: "#777", marginBottom: 5 }}>{label}</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(8,22px)", gap: 2, marginBottom: 6 }}>
        {COLORS.map(c => (
          <div key={c} onMouseDown={e => { e.preventDefault(); onApply(c); }}
            style={{
              width: 22, height: 22, background: c, borderRadius: 3, cursor: "pointer",
              border: c === "#ffffff" ? "1px solid #ccc" : "1px solid rgba(0,0,0,.1)"
            }} />
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <input type="color" value={custom} onChange={e => setCustom(e.target.value)}
          style={{ width: 32, height: 22, padding: 0, border: "1px solid #ccc", borderRadius: 3, cursor: "pointer" }} />
        <span style={{ fontSize: 11, color: "#666" }}>Custom</span>
        <button onMouseDown={e => { e.preventDefault(); onApply(custom); }}
          style={{ fontSize: 11, padding: "3px 8px", border: "1px solid #ced4da", borderRadius: 3, background: "#fff", cursor: "pointer" }}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default function RichTextEditor() {
  const editorRef = useRef(null);
  const sourceRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isSourceMode, setIsSourceMode] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [openPicker, setOpenPicker] = useState(null);
  const [showTablePicker, setShowTablePicker] = useState(false);
  const [tpHover, setTpHover] = useState([-1, -1]);
  const [fmts, setFmts] = useState({});
  const [blockTag, setBlockTag] = useState("p");
  const [words, setWords] = useState(0);
  const [chars, setChars] = useState(0);
  // CHANGED: Set default font to Nokora
  const [font, setFont] = useState("Nokora");
  const [size, setSize] = useState(16);
  const [fgColor, setFgColor] = useState("#e03131");
  const [bgColor, setBgColor] = useState("#ffd43b");

  const ex = useCallback((cmd, val = null) => {
    setOpenMenu(null); setOpenPicker(null); setShowTablePicker(false);
    editorRef.current?.focus();
    document.execCommand(cmd, false, val);
    updateFormats();
  }, []);

  const updateFormats = useCallback(() => {
    const cmds = ["bold", "italic", "underline", "strikeThrough", "subscript", "superscript",
      "justifyLeft", "justifyCenter", "justifyRight", "justifyFull",
      "insertUnorderedList", "insertOrderedList"];
    const state = {};
    cmds.forEach(c => { state[c] = document.queryCommandState(c); });
    setFmts(state);
    const tag = document.queryCommandValue("formatBlock").toLowerCase();
    if (tag) setBlockTag(tag);
  }, []);

  const updateCounts = useCallback(() => {
    const text = editorRef.current?.innerText || "";
    setWords(text.trim() ? text.trim().split(/\s+/).length : 0);
    setChars(text.length);
  }, []);

  const applyBlock = val => { setOpenMenu(null); editorRef.current?.focus(); document.execCommand("formatBlock", false, val); setBlockTag(val); };
  const applyFont = val => { setFont(val.replace(/'/g, "")); editorRef.current?.focus(); document.execCommand("fontName", false, val); };
  const applySize = val => {
    setSize(val); editorRef.current?.focus();
    const sel = window.getSelection();
    if (sel?.rangeCount > 0 && !sel.isCollapsed) {
      const span = document.createElement("span");
      span.style.fontSize = val + "px";
      try { sel.getRangeAt(0).surroundContents(span); } catch { }
    }
  };
  const applyFgColor = c => { setFgColor(c); setOpenPicker(null); editorRef.current?.focus(); document.execCommand("foreColor", false, c); };
  const applyBgColor = c => { setBgColor(c); setOpenPicker(null); editorRef.current?.focus(); document.execCommand("hiliteColor", false, c); };

  const insertLink = () => { setOpenMenu(null); const url = prompt("Enter URL:", "https://"); if (url) { editorRef.current?.focus(); document.execCommand("createLink", false, url); } };
  const insertImage = () => { setOpenMenu(null); const url = prompt("Enter image URL:", "https://"); if (url) { editorRef.current?.focus(); document.execCommand("insertHTML", false, `<img src="${url}" style="max-width:100%;border-radius:4px"/>`); } };
  const insertHR = () => { setOpenMenu(null); editorRef.current?.focus(); document.execCommand("insertHTML", false, "<hr/><p><br></p>"); };
  const insertDate = () => { setOpenMenu(null); editorRef.current?.focus(); document.execCommand("insertHTML", false, new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })); };
  const insertTable = (rows, cols) => {
    setShowTablePicker(false); setOpenMenu(null);
    let html = "<table>"; for (let r = 0; r < rows; r++) { html += "<tr>"; for (let c = 0; c < cols; c++)html += r === 0 ? "<th>&nbsp;</th>" : "<td>&nbsp;</td>"; html += "</tr>"; } html += "</table><p><br></p>";
    editorRef.current?.focus(); document.execCommand("insertHTML", false, html);
  };

  const toggleSource = () => {
    if (!isSourceMode) { sourceRef.current.value = editorRef.current.innerHTML; editorRef.current.style.display = "none"; sourceRef.current.style.display = "block"; }
    else { editorRef.current.innerHTML = sourceRef.current.value; sourceRef.current.style.display = "none"; editorRef.current.style.display = ""; }
    setIsSourceMode(s => !s);
  };

  useEffect(() => {
    const h = e => { if (!e.target.closest("[data-rte-menu]") && !e.target.closest("[data-rte-picker]")) { setOpenMenu(null); setOpenPicker(null); setShowTablePicker(false); } };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  useEffect(() => {
    const el = editorRef.current;
    const h = e => {
      if (!(e.ctrlKey || e.metaKey)) return;
      const map = { b: "bold", i: "italic", u: "underline", z: "undo", y: "redo" };
      if (map[e.key]) { e.preventDefault(); ex(map[e.key]); }
    };
    el?.addEventListener("keydown", h);
    return () => el?.removeEventListener("keydown", h);
  }, [ex]);

  // Menu + dropdown helpers
  const MenuItem = ({ id, label, children }) => (
    <div style={{ position: "relative" }} data-rte-menu>
      <button onMouseDown={e => { e.preventDefault(); setOpenMenu(openMenu === id ? null : id); setOpenPicker(null); setShowTablePicker(false); }}
        style={{ background: openMenu === id ? "#e9ecef" : "none", border: "none", padding: "4px 9px", fontSize: 13, color: "#333", cursor: "pointer", borderRadius: 3, display: "flex", alignItems: "center", gap: 4, height: 26 }}>
        {label} <span style={{ fontSize: 9, color: "#666" }}>▾</span>
      </button>
      {openMenu === id && (
        <div style={{ position: "absolute", top: "100%", left: 0, zIndex: 3000, background: "#fff", border: "1px solid #ccc", borderRadius: 3, boxShadow: "0 4px 12px rgba(0,0,0,.15)", minWidth: 190, padding: "4px 0" }}>
          {children}
        </div>
      )}
    </div>
  );

  const DD = ({ label, shortcut, onClick }) => (
    <div onMouseDown={e => { e.preventDefault(); onClick?.(); setOpenMenu(null); }}
      style={{ display: "flex", alignItems: "center", gap: 10, padding: "5px 14px", fontSize: 13, color: "#333", cursor: "pointer", whiteSpace: "nowrap" }}
      onMouseEnter={e => e.currentTarget.style.background = "#f0f0f0"}
      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
      <span>{label}</span>
      {shortcut && <span style={{ marginLeft: "auto", fontSize: 11, color: "#999" }}>{shortcut}</span>}
    </div>
  );
  const DDSep = () => <hr style={{ border: "none", borderTop: "1px solid #e0e0e0", margin: "3px 0" }} />;

  return (
    <div style={{
      border: "1px solid #adb5bd", borderRadius: isFullscreen ? 0 : 4,
      display: "flex", flexDirection: "column", background: "#fff",
      boxShadow: isFullscreen ? "none" : "0 1px 3px rgba(0,0,0,.08)",
      fontFamily: "system-ui, -apple-system, sans-serif",
      height: "100%", // Add this line
      ...(isFullscreen ? { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 } : {}),
    }}>

      {/* Menubar */}
      <div style={{ display: "flex", alignItems: "center", padding: "0 4px", height: 34, background: "#f8f9fa", borderBottom: "1px solid #dee2e6", gap: 2, flexShrink: 0 }}>
        <MenuItem id="file" label="File">
          <DD label="New document" onClick={() => { if (!editorRef.current?.innerHTML.trim() || confirm("Clear?")) { editorRef.current.innerHTML = ""; updateCounts(); } }} />
          <DDSep />
          <DD label="Print…" shortcut="Ctrl+P" onClick={() => window.print()} />
        </MenuItem>
        <MenuItem id="edit" label="Edit">
          <DD label="Undo" shortcut="Ctrl+Z" onClick={() => ex("undo")} />
          <DD label="Redo" shortcut="Ctrl+Y" onClick={() => ex("redo")} />
          <DDSep />
          <DD label="Select All" shortcut="Ctrl+A" onClick={() => ex("selectAll")} />
          <DDSep />
          <DD label="Clear formatting" onClick={() => ex("removeFormat")} />
        </MenuItem>
        <MenuItem id="insert" label="Insert">
          <DD label="Link…" onClick={insertLink} />
          <DD label="Image from URL…" onClick={insertImage} />
          <DD label="Horizontal line" onClick={insertHR} />
          <DDSep />
          <DD label="Current date" onClick={insertDate} />
        </MenuItem>
        <MenuItem id="format" label="Format">
          <DD label={<strong>Bold</strong>} shortcut="Ctrl+B" onClick={() => ex("bold")} />
          <DD label={<em>Italic</em>} shortcut="Ctrl+I" onClick={() => ex("italic")} />
          <DD label={<u>Underline</u>} shortcut="Ctrl+U" onClick={() => ex("underline")} />
          <DD label={<s>Strikethrough</s>} onClick={() => ex("strikeThrough")} />
          <DDSep />
          {BLOCK_FORMATS.map(f => <DD key={f.value} label={f.label} onClick={() => applyBlock(f.value)} />)}
        </MenuItem>
        <MenuItem id="view" label="View">
          <DD label="Toggle Fullscreen" onClick={() => { setIsFullscreen(f => !f); setIsMinimized(false); }} />
        </MenuItem>
        <div style={{ marginLeft: "auto", display: "flex", gap: 5, alignItems: "center" }}>
          <button onMouseDown={e => { e.preventDefault(); setIsMinimized(m => !m); setIsFullscreen(false); }}
            style={{ width: 12, height: 12, borderRadius: "50%", background: "#f59e0b", border: "none", cursor: "pointer" }} title="Minimize" />
          <button onMouseDown={e => { e.preventDefault(); setIsFullscreen(f => !f); setIsMinimized(false); }}
            style={{ width: 12, height: 12, borderRadius: "50%", background: "#10b981", border: "none", cursor: "pointer" }} title="Fullscreen" />
        </div>
      </div>

      {!isMinimized && (<>
        {/* Toolbar */}
        <div style={{ background: "#f8f9fa", borderBottom: "1px solid #dee2e6", flexShrink: 0 }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1, padding: "3px 5px" }}>

            <TbBtn title="Undo" onClick={() => ex("undo")}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M3 7v6h6" /><path d="M3.5 13C7 5.5 17 5 20 10s1 13-5 14" /></svg></TbBtn>
            <TbBtn title="Redo" onClick={() => ex("redo")}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M21 7v6h-6" /><path d="M20.5 13C17 5.5 7 5 4 10s-1 13 5 14" /></svg></TbBtn>
            <TbSep />

            <select value={blockTag} onChange={e => applyBlock(e.target.value)}
              style={{ height: 26, border: "1px solid #ced4da", borderRadius: 3, fontSize: 12, padding: "0 5px", background: "#fff", cursor: "pointer", color: "#333", outline: "none", minWidth: 116 }}>
              {BLOCK_FORMATS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
            </select>
            <TbSep />

            <select value={`'${font}'`} onChange={e => applyFont(e.target.value)}
              style={{ height: 26, border: "1px solid #ced4da", borderRadius: 3, fontSize: 12, padding: "0 5px", background: "#fff", cursor: "pointer", color: "#333", outline: "none", minWidth: 132 }}>
              {FONTS.map(f => <option key={f.value} value={f.value} style={{ fontFamily: f.value }}>{f.label}</option>)}
            </select>

            <select value={size} onChange={e => applySize(e.target.value)}
              style={{ height: 26, border: "1px solid #ced4da", borderRadius: 3, fontSize: 12, padding: "0 5px", background: "#fff", cursor: "pointer", color: "#333", outline: "none", width: 56 }}>
              {FONT_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <TbSep />

            <TbBtn title="Bold" active={fmts.bold} onClick={() => ex("bold")}><strong style={{ fontSize: 14, fontFamily: "Georgia" }}>B</strong></TbBtn>
            <TbBtn title="Italic" active={fmts.italic} onClick={() => ex("italic")}><em style={{ fontSize: 14, fontFamily: "Georgia" }}>I</em></TbBtn>
            <TbBtn title="Underline" active={fmts.underline} onClick={() => ex("underline")}><u style={{ fontSize: 14, fontFamily: "Georgia" }}>U</u></TbBtn>
            <TbBtn title="Strikethrough" active={fmts.strikeThrough} onClick={() => ex("strikeThrough")}><s style={{ fontSize: 13, fontFamily: "Georgia" }}>S</s></TbBtn>
            <TbBtn title="Subscript" active={fmts.subscript} onClick={() => ex("subscript")}><span style={{ fontSize: 12, fontFamily: "Georgia" }}>x<sub style={{ fontSize: 8 }}>2</sub></span></TbBtn>
            <TbBtn title="Superscript" active={fmts.superscript} onClick={() => ex("superscript")}><span style={{ fontSize: 12, fontFamily: "Georgia" }}>x<sup style={{ fontSize: 8 }}>2</sup></span></TbBtn>
            <TbSep />

            <div style={{ position: "relative" }} data-rte-picker>
              <TbBtn title="Text Color" onClick={() => setOpenPicker(p => p === "fg" ? null : "fg")}>
                <svg width="15" height="15" viewBox="0 0 16 16"><text x="1" y="12" fontSize="13" fontWeight="900" fontFamily="Georgia" fill={fgColor}>A</text><rect x="1" y="13.5" width="14" height="2" rx="1" fill={fgColor} /></svg>
              </TbBtn>
              {openPicker === "fg" && <ColorPicker label="Text Color" onApply={applyFgColor} />}
            </div>
            <div style={{ position: "relative" }} data-rte-picker>
              <TbBtn title="Highlight" onClick={() => setOpenPicker(p => p === "bg" ? null : "bg")}>
                <svg width="15" height="15" viewBox="0 0 16 16"><rect x="1" y="1" width="14" height="10" rx="2" fill={bgColor} /><text x="4.5" y="9.5" fontSize="8" fontWeight="bold" fill="#333">H</text><rect x="1" y="13.5" width="14" height="2" rx="1" fill={bgColor} /></svg>
              </TbBtn>
              {openPicker === "bg" && <ColorPicker label="Highlight Color" onApply={applyBgColor} />}
            </div>
            <TbSep />

            <TbBtn title="Align Left" active={fmts.justifyLeft} onClick={() => ex("justifyLeft")}><svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><rect x="0" y="2" width="16" height="1.5" rx="1" /><rect x="0" y="6" width="10" height="1.5" rx="1" /><rect x="0" y="10" width="14" height="1.5" rx="1" /><rect x="0" y="14" width="8" height="1.5" rx="1" /></svg></TbBtn>
            <TbBtn title="Align Center" active={fmts.justifyCenter} onClick={() => ex("justifyCenter")}><svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><rect x="0" y="2" width="16" height="1.5" rx="1" /><rect x="3" y="6" width="10" height="1.5" rx="1" /><rect x="1" y="10" width="14" height="1.5" rx="1" /><rect x="4" y="14" width="8" height="1.5" rx="1" /></svg></TbBtn>
            <TbBtn title="Align Right" active={fmts.justifyRight} onClick={() => ex("justifyRight")}><svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><rect x="0" y="2" width="16" height="1.5" rx="1" /><rect x="6" y="6" width="10" height="1.5" rx="1" /><rect x="2" y="10" width="14" height="1.5" rx="1" /><rect x="8" y="14" width="8" height="1.5" rx="1" /></svg></TbBtn>
            <TbBtn title="Justify" active={fmts.justifyFull} onClick={() => ex("justifyFull")}><svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><rect x="0" y="2" width="16" height="1.5" rx="1" /><rect x="0" y="6" width="16" height="1.5" rx="1" /><rect x="0" y="10" width="16" height="1.5" rx="1" /><rect x="0" y="14" width="10" height="1.5" rx="1" /></svg></TbBtn>
            <TbSep />

            <TbBtn title="Bullet List" active={fmts.insertUnorderedList} onClick={() => ex("insertUnorderedList")}><svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><circle cx="2" cy="4" r="1.5" /><rect x="5" y="3" width="11" height="1.8" rx="1" /><circle cx="2" cy="9" r="1.5" /><rect x="5" y="8" width="11" height="1.8" rx="1" /><circle cx="2" cy="14" r="1.5" /><rect x="5" y="13" width="11" height="1.8" rx="1" /></svg></TbBtn>
            <TbBtn title="Numbered List" active={fmts.insertOrderedList} onClick={() => ex("insertOrderedList")}><svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><rect x="5" y="3" width="11" height="1.8" rx="1" /><rect x="5" y="8" width="11" height="1.8" rx="1" /><rect x="5" y="13" width="11" height="1.8" rx="1" /><text x="0" y="5.5" fontSize="5.5" fontWeight="bold">1.</text><text x="0" y="10.5" fontSize="5.5" fontWeight="bold">2.</text><text x="0" y="15.5" fontSize="5.5" fontWeight="bold">3.</text></svg></TbBtn>
            <TbBtn title="Outdent" onClick={() => ex("outdent")}><svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><rect x="0" y="1" width="16" height="1.5" rx="1" /><rect x="5" y="5" width="11" height="1.5" rx="1" /><rect x="5" y="9" width="11" height="1.5" rx="1" /><rect x="0" y="13" width="16" height="1.5" rx="1" /><polygon points="4,7 0.5,5 0.5,9" /></svg></TbBtn>
            <TbBtn title="Indent" onClick={() => ex("indent")}><svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><rect x="0" y="1" width="16" height="1.5" rx="1" /><rect x="5" y="5" width="11" height="1.5" rx="1" /><rect x="5" y="9" width="11" height="1.5" rx="1" /><rect x="0" y="13" width="16" height="1.5" rx="1" /><polygon points="0,7 3.5,5 3.5,9" /></svg></TbBtn>
            <TbSep />

            <TbBtn title="Insert Link" onClick={insertLink}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" /></svg></TbBtn>
            <TbBtn title="Remove Link" onClick={() => ex("unlink")}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" /><line x1="4" y1="4" x2="20" y2="20" /></svg></TbBtn>
            <TbBtn title="Insert Image" onClick={insertImage}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg></TbBtn>

            <div style={{ position: "relative" }} data-rte-picker>
              <TbBtn title="Insert Table" onClick={() => { setShowTablePicker(s => !s); setOpenPicker(null); }}>
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="1" width="14" height="14" rx="1" /><line x1="1" y1="5.5" x2="15" y2="5.5" /><line x1="1" y1="10" x2="15" y2="10" /><line x1="5.5" y1="5.5" x2="5.5" y2="15" /><line x1="10" y1="5.5" x2="10" y2="15" /></svg>
              </TbBtn>
              {showTablePicker && (
                <div style={{ position: "absolute", top: 30, left: 0, zIndex: 3000, background: "#fff", border: "1px solid #ccc", borderRadius: 4, padding: 8, boxShadow: "0 4px 16px rgba(0,0,0,.18)" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(8,20px)", gap: 2 }}>
                    {Array.from({ length: 64 }, (_, i) => {
                      const r = Math.floor(i / 8), c = i % 8;
                      const hl = r <= tpHover[0] && c <= tpHover[1];
                      return <div key={i} onMouseEnter={() => setTpHover([r, c])} onMouseLeave={() => setTpHover([-1, -1])}
                        onMouseDown={e => { e.preventDefault(); insertTable(r + 1, c + 1); }}
                        style={{ width: 20, height: 20, borderRadius: 2, cursor: "pointer", background: hl ? "#dbe4ff" : "#f8f9fa", border: `1px solid ${hl ? "#748ffc" : "#ddd"}` }} />;
                    })}
                  </div>
                  <div style={{ fontSize: 11, color: "#666", marginTop: 4, textAlign: "center" }}>
                    {tpHover[0] >= 0 ? `${tpHover[0] + 1} × ${tpHover[1] + 1} table` : "0 × 0 table"}
                  </div>
                </div>
              )}
            </div>

            <TbBtn title="Horizontal Rule" onClick={insertHR}><svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><rect x="0" y="7" width="16" height="2" rx="1" /><rect x="2" y="3" width="2" height="3.5" rx="1" /><rect x="12" y="3" width="2" height="3.5" rx="1" /></svg></TbBtn>
            <TbSep />
            <TbBtn title="Clear Formatting" onClick={() => ex("removeFormat")}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M4 7h16M4 12h10M4 17h6" /><line x1="16" y1="13" x2="22" y2="19" /><line x1="22" y1="13" x2="16" y2="19" /></svg></TbBtn>
            <TbBtn title="HTML Source" active={isSourceMode} onClick={toggleSource}
              style={{ marginLeft: "auto", fontFamily: "monospace", fontSize: 11, fontWeight: 700, padding: "2px 7px", minWidth: "auto" }}>
              &lt;/&gt;
            </TbBtn>
          </div>
        </div>

        {/* Editor */}
        {/* CHANGED: Initial fontFamily style to 'Nokora' */}
        <div style={{ flex: 1, overflowY: "auto", background: "#fff", minHeight: 320, cursor: "text" }} onClick={() => editorRef.current?.focus()}>
          <div ref={editorRef} contentEditable suppressContentEditableWarning
            onKeyUp={() => { updateFormats(); updateCounts(); }}
            onMouseUp={updateFormats} onInput={updateCounts}
            style={{ minHeight: 320, padding: "20px 24px", outline: "none", fontFamily: "'Nokora', serif", fontSize: 16, lineHeight: 1.75, color: "#212529", caretColor: "#3b5bdb" }}
          />
          <textarea ref={sourceRef}
            style={{ display: "none", width: "100%", minHeight: 320, padding: 16, fontFamily: "'Courier New',monospace", fontSize: 13, border: "none", outline: "none", resize: "none", background: "#1e1e2e", color: "#cdd6f4", lineHeight: 1.6 }}
            spellCheck={false} />
        </div>

        {/* Status bar */}
        <div style={{ display: "flex", alignItems: "center", padding: "0 10px", height: 24, background: "#f8f9fa", borderTop: "1px solid #dee2e6", fontSize: 11, color: "#6c757d", fontFamily: "system-ui", gap: 12, flexShrink: 0 }}>
          <span style={{ color: "#495057" }}>{blockTag || "p"}</span>
          <span>Words: {words}</span>
          <span>Chars: {chars}</span>
          <span style={{ marginLeft: "auto" }}>{font.replace(/'/g, "")} · {size}pt</span>
        </div>
      </>)}

      <style>{`
        [contenteditable]:empty::before{content:"Start typing or paste content here…";color:#aaa;font-style:italic;pointer-events:none}
        [contenteditable] h1{font-size:28px;font-weight:700;line-height:1.2;margin:0 0 12px;color:#1a1a2e}
        [contenteditable] h2{font-size:22px;font-weight:600;line-height:1.3;margin:0 0 10px;color:#1a1a2e}
        [contenteditable] h3{font-size:18px;font-weight:600;line-height:1.4;margin:0 0 8px;color:#1a1a2e}
        [contenteditable] h4{font-size:15px;font-weight:600;line-height:1.5;margin:0 0 6px;color:#1a1a2e}
        [contenteditable] p{margin:0 0 10px}
        [contenteditable] blockquote{border-left:4px solid #748ffc;padding:8px 16px;margin:0 0 10px;color:#555;font-style:italic;background:#f8f9ff;border-radius:0 4px 4px 0}
        [contenteditable] pre{background:#f4f5f7;padding:12px 16px;border-radius:5px;font-family:'Courier New',monospace;font-size:13.5px;line-height:1.5;margin:0 0 10px;border:1px solid #e0e0e0}
        [contenteditable] a{color:#3b5bdb;text-decoration:underline}
        [contenteditable] ul,[contenteditable] ol{padding-left:24px;margin:0 0 10px}
        [contenteditable] li{margin-bottom:3px}
        [contenteditable] hr{border:none;border-top:2px solid #dee2e6;margin:16px 0}
        [contenteditable] table{border-collapse:collapse;width:100%;margin:0 0 10px}
        [contenteditable] td,[contenteditable] th{border:1px solid #ced4da;padding:6px 10px;text-align:left}
        [contenteditable] th{background:#f1f3f5;font-weight:600}
        [contenteditable] img{max-width:100%;border-radius:4px}
      `}</style>
    </div>
  );
}