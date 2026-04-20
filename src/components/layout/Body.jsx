import { useState } from 'react';
import { Download, CheckCircle, Archive, Minimize2 } from 'lucide-react';

const FONT_DATA = [
  { id: 'angkor', name: 'Angkor', designer: 'Danh Hong', fileName: 'Angkor.zip', category: 'Display', googleFont: 'Angkor', description: 'Inspired by Khmer inscriptions, perfect for historical contexts.', previewText: 'អង្គរវត្តជាសម្បត្តិបេតិកភណ្ឌពិភពលោក' },
  { id: 'battambang', name: 'Battambang', designer: 'Danh Hong', fileName: 'Battambang.zip', category: 'Body', googleFont: 'Battambang', description: 'A highly legible font optimized for digital screens.', previewText: 'ចំណេះដឹងគឺជាទ្រព្យសម្បត្តិដ៏មានតម្លៃ' },
  { id: 'bayon', name: 'Bayon', designer: 'Danh Hong', fileName: 'Bayon.zip', category: 'Display', googleFont: 'Bayon', description: 'Bold and decorative, suitable for posters and titles.', previewText: 'ប្រាសាទបាយ័នមានមុខបួន' },
  { id: 'bokor', name: 'Bokor', designer: 'Danh Hong', fileName: 'Bokor.zip', category: 'Display', googleFont: 'Bokor', description: 'Unique style reminiscent of vintage Khmer signage.', previewText: 'ភ្នំបូកគោមានខ្យល់អាកាសបរិសុទ្ធ' },
  { id: 'chenla', name: 'Chenla', designer: 'Danh Hong', fileName: 'Chenla.zip', category: 'Classic', googleFont: 'Chenla', description: 'Traditional serif style often used in formal documents.', previewText: 'សករាជថ្មីនៃបច្ចេកវិទ្យា' },
  { id: 'content', name: 'Content', designer: 'Danh Hong', fileName: 'Content.zip', category: 'Standard', googleFont: 'Content', description: 'Clear and widely used for general content typing.', previewText: 'អានច្រើនដឹងច្រើន' },
  { id: 'dangrek', name: 'Dangrek', designer: 'Danh Hong', fileName: 'Dangrek.zip', category: 'Display', googleFont: 'Dangrek', description: 'Tall and modern font for contemporary designs.', previewText: 'ជួរភ្នំដងរែកការពារព្រំដែន' },
  { id: 'fasthand', name: 'Fasthand', designer: 'Danh Hong', fileName: 'Fasthand.zip', category: 'Handwriting', googleFont: 'Fasthand', description: 'Mimics natural quick handwriting style.', previewText: 'សរសេរលឿនរហ័សទាន់ចិត្ត' },
  { id: 'freehand', name: 'Freehand', designer: 'Danh Hong', fileName: 'Freehand.zip', category: 'Handwriting', googleFont: 'Freehand', description: 'Elegant brush-stroke style for creative work.', previewText: 'សិល្បៈនៃការសរសេរដោយសេរី' },
  { id: 'hanuman', name: 'Hanuman', designer: 'Danh Hong', fileName: 'Hanuman.zip', category: 'Body', googleFont: 'Hanuman', description: 'Elegant serif style suitable for literature.', previewText: 'ភាសាខ្មែរ គឺជាភាសាផ្លូវការ' },
  { id: 'kantumruy-pro', name: 'Kantumruy Pro', designer: 'Sovichet Tep (Anagata Design)', fileName: 'Kantumruy_Pro.zip', category: 'Modern', googleFont: 'Kantumruy Pro', description: 'A sleek, versatile sans-serif for professional design.', previewText: 'ភាពច្នៃប្រឌិតគ្មានដែនកំណត់' },
  { id: 'kdam-thmor-pro', name: 'Kdam Thmor Pro', designer: 'Sovichet Tep', fileName: 'Kdam_Thmor_Pro.zip', category: 'Display', googleFont: 'Kdam Thmor Pro', description: 'A sturdy, condensed display font with unique flair.', previewText: 'បច្ចេកវិទ្យាទំនើបជឿនលឿន' },
  { id: 'khmer', name: 'Khmer', designer: 'Danh Hong', fileName: 'Khmer.zip', category: 'Classic', googleFont: 'Khmer', description: 'Standard traditional Khmer unicode font.', previewText: 'ជាតិ សាសនា ព្រះមហាក្សត្រ' },
  { id: 'koh-santepheap', name: 'Koh Santepheap', designer: 'Danh Hong', fileName: 'Koh_Santepheap.zip', category: 'Modern', googleFont: 'Koh Santepheap', description: 'Optimized for newspaper and long-form reading.', previewText: 'សន្តិភាពគឺជាមូលដ្ឋានគ្រឹះ' },
  { id: 'konkhmer-sleokchher', name: 'Konkhmer Sleokchher', designer: 'Suon May Sophanith', fileName: 'Konkhmer_Sleokchher.zip', category: 'Display', googleFont: 'Konkhmer Sleokchher', description: 'Inspired by traditional palm-leaf manuscript writing.', previewText: 'ស្លឹកឈើជ្រុះមិនឆ្ងាយពីគល់' },
  { id: 'koulen', name: 'Koulen', designer: 'Danh Hong', fileName: 'Koulen.zip', category: 'Display', googleFont: 'Koulen', description: 'Heavy and impactful font for headlines.', previewText: 'ជយោ! ព្រះរាជាណាចក្រកម្ពុជា' },
  { id: 'metal', name: 'Metal', designer: 'Danh Hong', fileName: 'Metal.zip', category: 'Display', googleFont: 'Metal', description: 'Sharp, distinctive characters for unique branding.', previewText: 'រឹងមាំដូចដែកថែប' },
  { id: 'moul', name: 'Moul', designer: 'Danh Hong', fileName: 'Moul.zip', category: 'Header', googleFont: 'Moul', description: 'Heavy traditional font used for titles.', previewText: 'ជយោ! ជាតិ សាសនា' },
  { id: 'moulpali', name: 'Moulpali', designer: 'Danh Hong', fileName: 'Moulpali.zip', category: 'Header', googleFont: 'Moulpali', description: 'Traditional heavy-weight decorative font.', previewText: 'សេរីភាព និងសមភាព' },
  { id: 'nokora', name: 'Nokora', designer: 'Danh Hong', fileName: 'Nokora.zip', category: 'Modern', googleFont: 'Nokora', description: 'Clean sans-serif style for digital interfaces.', previewText: 'យុគសម័យឌីជីថល' },
  { id: 'noto-sans-khmer', name: 'Noto Sans Khmer', designer: 'Danh Hong and Monotype Design Studio', fileName: 'Noto_Sans_Khmer.zip', category: 'Standard', googleFont: 'Noto Sans Khmer', description: 'A reliable, highly legible Google standard font.', previewText: 'ការរៀនសូត្រគ្មានទីបញ្ចប់' },
  { id: 'noto-serif-khmer', name: 'Noto Serif Khmer', designer: 'Danh Hong and Monotype Design Studio', fileName: 'Noto_Serif_Khmer.zip', category: 'Standard', googleFont: 'Noto Serif Khmer', description: 'A classic serif counterpart to Noto Sans.', previewText: 'កេរដំណែលវប្បធម៌ដូនតា' },
  { id: 'odor-mean-chey', name: 'Odor Mean Chey', designer: 'Danh Hong', fileName: 'Odor_Mean_Chey.zip', category: 'Display', googleFont: 'Odor Mean Chey', description: 'Strong, rhythmic character strokes.', previewText: 'ខេត្តឧត្តរមានជ័យ' },
  { id: 'preahvihear', name: 'Preahvihear', designer: 'Danh Hong', fileName: 'Preahvihear.zip', category: 'Display', googleFont: 'Preahvihear', description: 'Grand and steady character design.', previewText: 'ប្រាសាទព្រះវិហារ' },
  { id: 'siemreap', name: 'Siemreap', designer: 'Danh Hong', fileName: 'Siemreap.zip', category: 'Body', googleFont: 'Siemreap', description: 'Clean design often used in mobile interfaces.', previewText: 'សិល្បៈនៃការរស់នៅ' },
  { id: 'suwannaphum', name: 'Suwannaphum', designer: 'Danh Hong', fileName: 'Suwannaphum.zip', category: 'Label', googleFont: 'Suwannaphum', description: 'Compact and clear for labels and small text.', previewText: 'សុវណ្ណភូមិ ទឹកដីមាស' },
  { id: 'taprom', name: 'Taprom', designer: 'Danh Hong', fileName: 'Taprom.zip', category: 'Display', googleFont: 'Taprom', description: 'Ornate and decorative traditional style.', previewText: 'ប្រាសាទតាព្រហ្ម' },
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
              className="flex-1 w-full bg-transparent outline-none resize-none text-slate-800 dark:text-slate-100 placeholder-slate-300 dark:placeholder-slate-600 text-2xl sm:text-3xl md:text-4xl"
              style={{
                fontFamily: `'${font.googleFont}', sans-serif`,
                letterSpacing: '0.08em',
                lineHeight: '2.2',
                wordSpacing: '0.3em',
              }}
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
              <h3 className="text-xl font-bold mb-1" style={{ fontFamily: "'Lato', sans-serif" }}>
                {font.name}
              </h3>
              {font.designer && (
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-2" style={{ fontFamily: "'Lato', sans-serif" }}>
                  Designed by {font.designer}
                </p>
              )}
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
    triggerDownload(`./fonts/${font.fileName}`, font.fileName);
    setTimeout(() => setDownloadingId(null), 1500);
  };

  const handleDownloadAll = () => {
    triggerDownload('./fonts/khmer-fonts-collection.zip', 'khmer-fonts-collection.zip');
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