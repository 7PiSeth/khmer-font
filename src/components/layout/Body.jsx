import { useState } from 'react';
import { Download, CheckCircle, Archive, Minimize2 } from 'lucide-react';

const FONT_DATA = [
  { id: 'khmer-os', name: 'Khmer OS', fileName: 'KhmerOS.ttf', size: '2 KB', category: 'Standard', googleFont: 'Hanuman', description: 'Standard Unicode font for general documentation.', previewText: 'ព្រះរាជាណាចក្រកម្ពុជា' },
  { id: 'moul', name: 'Khmer Moul', fileName: 'KhmerOS_Moul.ttf', size: '42 KB', category: 'Headers', googleFont: 'Moul', description: 'Traditional heavy-weight font for titles.', previewText: 'ជយោ! ជាតិ សាសនា' },
  { id: 'battambang', name: 'Khmer Battambang', fileName: 'KhmerOS_Battambang.ttf', size: '85 KB', category: 'Labels', googleFont: 'Battambang', description: 'Modern and clear font for digital screens.', previewText: 'ចំណេះដឹងគឺជាទ្រព្យសម្បត្តិ' },
  { id: 'siemreap', name: 'Khmer Siemreap', fileName: 'KhmerOS_Siemreap.ttf', size: '72 KB', category: 'Body', googleFont: 'Siemreap', description: 'Optimized for high-density reading surfaces.', previewText: 'សិល្បៈនៃការរស់នៅ' },
  { id: 'hanuman', name: 'Khmer Hanuman', fileName: 'KhmerOS_Hanuman.ttf', size: '120 KB', category: 'Body Text', googleFont: 'Hanuman', description: 'Elegant serif style for literature.', previewText: 'ភាសាខ្មែរ គឺជាភាសាផ្លូវការ' },
];

const FontCard = ({ font, downloadingId, onDownload }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [previewText, setPreviewText] = useState(font.previewText);

  const handleTextClick = () => {
    setIsEditing(true);
    setIsExpanded(true);
  };

  const handleMinimize = () => {
    setIsExpanded(false);
    setIsEditing(false);
  };

  const handleBlur = () => {
    if (!isExpanded) setIsEditing(false);
  };

  return (
    <>
      {/* Fullscreen Overlay */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-slate-950 flex flex-col">

          {/* Overlay Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <span
                className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded"
                style={{ fontFamily: "'Battambang', sans-serif" }}
              >
                {font.category}
              </span>
              <h3 className="text-lg font-bold" style={{ fontFamily: "'Lato', sans-serif" }}>
                {font.name}
              </h3>
            </div>
            <button
              onClick={handleMinimize}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-all text-xs font-bold active:scale-95"
            >
              <Minimize2 size={14} />
              Minimize
            </button>
          </div>

          {/* Overlay Editable Area */}
          <div className="flex-1 flex flex-col p-6 sm:p-12 overflow-auto">
            <textarea
              autoFocus
              value={previewText}
              onChange={(e) => setPreviewText(e.target.value)}
              className="flex-1 w-full bg-transparent outline-none resize-none text-slate-800 dark:text-slate-100 leading-relaxed placeholder-slate-300 dark:placeholder-slate-600 text-4xl sm:text-6xl md:text-7xl"
              style={{ fontFamily: `'${font.googleFont}', sans-serif` }}
              placeholder="វាយអក្សរនៅទីនេះ..."
            />
          </div>

          {/* Overlay Footer */}
          <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="uppercase tracking-widest">ក ខ គ ឃ ង ច ឆ ជ ឈ ញ</span>
            <span>Khmer Unicode 13.0</span>
          </div>
        </div>
      )}

      {/* Normal Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-xl">
        <div className="flex flex-col lg:flex-row">

          {/* Left Panel */}
          <div className="lg:w-80 p-5 sm:p-6 bg-slate-50/50 dark:bg-slate-800/30 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded"
                  style={{ fontFamily: "'Battambang', sans-serif" }}
                >
                  {font.category}
                </span>
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
                  {font.size}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Lato', sans-serif" }}>
                {font.name}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6" style={{ fontFamily: "'Lato', sans-serif" }}>
                {font.description}
              </p>
            </div>

            <button
              onClick={() => onDownload(font)}
              disabled={downloadingId === font.id}
              className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl sm:rounded-2xl font-bold transition-all ${downloadingId === font.id
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-900 dark:bg-slate-800 text-white hover:bg-blue-600 active:scale-[0.97]'
                }`}
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {downloadingId === font.id ? <CheckCircle size={18} /> : <Download size={18} />}
              {downloadingId === font.id ? 'Starting...' : 'Download'}
            </button>
          </div>

          {/* Right Panel - Preview */}
          <div className="flex-1 p-5 sm:p-8 flex flex-col justify-center min-h-[140px] sm:min-h-[180px]">
            <div
              onClick={handleTextClick}
              className="text-xl sm:text-2xl md:text-3xl text-slate-800 dark:text-slate-100 leading-loose text-center lg:text-left cursor-text hover:opacity-70 transition-opacity select-none tracking-widest"
              style={{
                fontFamily: `'${font.googleFont}', sans-serif`,
                letterSpacing: '0.08em',
                lineHeight: '2.2',
                wordSpacing: '0.3em',
              }}
            >
              {previewText || font.previewText}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-50 dark:border-slate-800/50 flex items-center justify-between text-[10px] sm:text-xs text-slate-400 font-medium">
              <span
                className="uppercase tracking-[0.25em]"
                style={{ letterSpacing: '0.25em' }}
              >
                ក ខ គ ឃ ង ច ឆ ជ ឈ ញ
              </span>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-600 italic tracking-wide">
                tap to edit
              </span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

const Body = ({ searchTerm }) => {
  const [downloadingId, setDownloadingId] = useState(null);

  const filteredFonts = FONT_DATA.filter(f =>
    f.name.toLowerCase().includes(searchTerm?.toLowerCase() ?? '') ||
    f.category.toLowerCase().includes(searchTerm?.toLowerCase() ?? '')
  );

  const triggerDownload = (path, name) => {
    const link = document.createElement('a');
    link.href = path;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownload = (font) => {
    setDownloadingId(font.id);
    triggerDownload(`./src/assets/${font.fileName}`, font.fileName);
    setTimeout(() => setDownloadingId(null), 1500);
  };

  const handleDownloadAll = () => {
    triggerDownload('./src/assets/khmer-fonts-collection.zip', 'khmer-fonts-collection.zip');
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 sm:mt-12">
      <div className="mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <h2 className="text-2xl sm:text-4xl font-bold mb-1 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Khmer Unicode Archive
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400" style={{ fontFamily: "'Lato', sans-serif" }}>
            Free high-quality fonts for your creative projects.
          </p>
        </div>

        <button
          onClick={handleDownloadAll}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 text-sm sm:text-base active:scale-95"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          <Archive size={18} />
          Download All Fonts
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        {filteredFonts.map((font) => (
          <FontCard
            key={font.id}
            font={font}
            downloadingId={downloadingId}
            onDownload={handleDownload}
          />
        ))}
      </div>

      {filteredFonts.length === 0 && (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
          <p className="text-slate-400">គ្មានលទ្ធផលស្វែងរក</p>
        </div>
      )}
    </main>
  );
};

export default Body;