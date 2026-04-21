import { useState } from 'react';
import { Download, CheckCircle, Archive, Minimize2, PenLine } from 'lucide-react';
import { Editor } from '@tinymce/tinymce-react';

const FONT_DATA = [
  { id: 'angkor', name: 'Angkor', designer: 'Danh Hong', fileName: 'Angkor.zip', category: 'Display', googleFont: 'Angkor', description: 'Inspired by Khmer inscriptions, perfect for historical contexts.', previewText: 'ចេះមកពី រៀន មានមកពី រក' },
  { id: 'battambang', name: 'Battambang', designer: 'Danh Hong', fileName: 'Battambang.zip', category: 'Body', googleFont: 'Battambang', description: 'A highly legible font optimized for digital screens.', previewText: 'ចំណេះវិជ្ជា គឺជាទ្រព្យជាប់ខ្លួន' },
  { id: 'bayon', name: 'Bayon', designer: 'Danh Hong', fileName: 'Bayon.zip', category: 'Display', googleFont: 'Bayon', description: 'Bold and decorative, suitable for posters and titles.', previewText: 'ការអប់រំ គឺជាអាវុធដ៏មានអានុភាពបំផុត' },
  { id: 'bokor', name: 'Bokor', designer: 'Danh Hong', fileName: 'Bokor.zip', category: 'Display', googleFont: 'Bokor', description: 'Unique style reminiscent of vintage Khmer signage.', previewText: 'ធ្វើស្រែទាន់ក្ដៅដី ស្រឡាញ់ស្រីទាន់ក្ដៅចិត្ត' },
  { id: 'chenla', name: 'Chenla', designer: 'Danh Hong', fileName: 'Chenla.zip', category: 'Classic', googleFont: 'Chenla', description: 'Traditional serif style often used in formal documents.', previewText: 'ទឹកថ្លាលែងត្រី ទឹកល្អក់ចាប់ត្រី' },
  { id: 'content', name: 'Content', designer: 'Danh Hong', fileName: 'Content.zip', category: 'Standard', googleFont: 'Content', description: 'Clear and widely used for general content typing.', previewText: 'ចិត្តល្អ បុណ្យជួយ' },
  { id: 'dangrek', name: 'Dangrek', designer: 'Danh Hong', fileName: 'Dangrek.zip', category: 'Display', googleFont: 'Dangrek', description: 'Tall and modern font for contemporary designs.', previewText: 'សុខភាព គឺជាទ្រព្យសម្បត្តិដ៏លើសលប់' },
  { id: 'fasthand', name: 'Fasthand', designer: 'Danh Hong', fileName: 'Fasthand.zip', category: 'Handwriting', googleFont: 'Fasthand', description: 'Mimics natural quick handwriting style.', previewText: 'កុំពត់ស្រឡៅ កុំប្រដៅមនុស្សខូច' },
  { id: 'freehand', name: 'Freehand', designer: 'Danh Hong', fileName: 'Freehand.zip', category: 'Handwriting', googleFont: 'Freehand', description: 'Elegant brush-stroke style for creative work.', previewText: 'ទូកទៅ កំពង់នៅ' },
  { id: 'hanuman', name: 'Hanuman', designer: 'Danh Hong', fileName: 'Hanuman.zip', category: 'Body', googleFont: 'Hanuman', description: 'Elegant serif style suitable for literature.', previewText: 'ចូលស្ទឹងតាមបទ ចូលស្រុកតាមចំណូល' },
  { id: 'kantumruy-pro', name: 'Kantumruy Pro', designer: 'Sovichet Tep (Anagata Design)', fileName: 'Kantumruy_Pro.zip', category: 'Modern', googleFont: 'Kantumruy Pro', description: 'A sleek, versatile sans-serif for professional design.', previewText: 'សម្ដីសជាតិ មារយាទសពូជ' },
  { id: 'kdam-thmor-pro', name: 'Kdam Thmor Pro', designer: 'Sovichet Tep', fileName: 'Kdam_Thmor_Pro.zip', category: 'Display', googleFont: 'Kdam Thmor Pro', description: 'A sturdy, condensed display font with unique flair.', previewText: 'មិត្តល្អ ជួយគ្នាក្នុងគ្រាក្រ' },
  { id: 'khmer', name: 'Khmer', designer: 'Danh Hong', fileName: 'Khmer.zip', category: 'Classic', googleFont: 'Khmer', description: 'Standard traditional Khmer unicode font.', previewText: 'សូវស្លាប់បាប កុំឱ្យស្លាប់អរ' },
  { id: 'koh-santepheap', name: 'Koh Santepheap', designer: 'Danh Hong', fileName: 'Koh_Santepheap.zip', category: 'Modern', googleFont: 'Koh Santepheap', description: 'Optimized for newspaper and long-form reading.', previewText: 'ចង់ចេះឱ្យធ្វើល្ងង់' },
  { id: 'konkhmer-sleokchher', name: 'Konkhmer Sleokchher', designer: 'Suon May Sophanith', fileName: 'Konkhmer_Sleokchher.zip', category: 'Display', googleFont: 'Konkhmer Sleokchher', description: 'Inspired by traditional palm-leaf manuscript writing.', previewText: 'ខ្លៅជឿ ឆោតសួរ' },
  { id: 'koulen', name: 'Koulen', designer: 'Danh Hong', fileName: 'Koulen.zip', category: 'Display', googleFont: 'Koulen', description: 'Heavy and impactful font for headlines.', previewText: 'ដើរឱ្យមានបី ដេកឱ្យមានបួន' },
  { id: 'metal', name: 'Metal', designer: 'Danh Hong', fileName: 'Metal.zip', category: 'Display', googleFont: 'Metal', description: 'Sharp, distinctive characters for unique branding.', previewText: 'កុំទុកចិត្តមេឃ កុំទុកចិត្តផ្កាយ' },
  { id: 'moul', name: 'Moul', designer: 'Danh Hong', fileName: 'Moul.zip', category: 'Header', googleFont: 'Moul', description: 'Heavy traditional font used for titles.', previewText: 'ឈាមស្រែកស្បែកហៅ' },
  { id: 'moulpali', name: 'Moulpali', designer: 'Danh Hong', fileName: 'Moulpali.zip', category: 'Header', googleFont: 'Moulpali', description: 'Traditional heavy-weight decorative font.', previewText: 'តក់ៗពេញបំពង់' },
  { id: 'nokora', name: 'Nokora', designer: 'Danh Hong', fileName: 'Nokora.zip', category: 'Modern', googleFont: 'Nokora', description: 'Clean sans-serif style for digital interfaces.', previewText: 'ការតស៊ូ នាំមកនូវជោគជ័យ' },
  { id: 'noto-sans-khmer', name: 'Noto Sans Khmer', designer: 'Danh Hong and Monotype Design Studio', fileName: 'Noto_Sans_Khmer.zip', category: 'Standard', googleFont: 'Noto Sans Khmer', description: 'A reliable, highly legible Google standard font.', previewText: 'រៀនគ្មានទីបញ្ចប់' },
  { id: 'noto-serif-khmer', name: 'Noto Serif Khmer', designer: 'Danh Hong and Monotype Design Studio', fileName: 'Noto_Serif_Khmer.zip', category: 'Standard', googleFont: 'Noto Serif Khmer', description: 'A classic serif counterpart to Noto Sans.', previewText: 'សន្តិភាព ផ្ដើមចេញពីយើងម្នាក់ៗ' },
  { id: 'odor-mean-chey', name: 'Odor Mean Chey', designer: 'Danh Hong', fileName: 'Odor_Mean_Chey.zip', category: 'Display', googleFont: 'Odor Mean Chey', description: 'Strong, rhythmic character strokes.', previewText: 'ពេលវេលា គឺជាមាសប្រាក់' },
  { id: 'preahvihear', name: 'Preahvihear', designer: 'Danh Hong', fileName: 'Preahvihear.zip', category: 'Display', googleFont: 'Preahvihear', description: 'Grand and steady character design.', previewText: 'អ្នកប្រាជ្ញ ស្វែងរកចំណេះ អ្នកល្ងង់ ស្វែងរកកំហុស' },
  { id: 'siemreap', name: 'Siemreap', designer: 'Danh Hong', fileName: 'Siemreap.zip', category: 'Body', googleFont: 'Siemreap', description: 'Clean design often used in mobile interfaces.', previewText: 'ស្គាល់ខ្លួនឯង ឈ្នះអស់សត្រូវ' },
  { id: 'suwannaphum', name: 'Suwannaphum', designer: 'Danh Hong', fileName: 'Suwannaphum.zip', category: 'Label', googleFont: 'Suwannaphum', description: 'Compact and clear for labels and small text.', previewText: 'បរាជ័យ គឺជាមេរៀននៃជោគជ័យ' },
  { id: 'taprom', name: 'Taprom', designer: 'Danh Hong', fileName: 'Taprom.zip', category: 'Display', googleFont: 'Taprom', description: 'Ornate and decorative traditional style.', previewText: 'សេចក្ដីស្មោះត្រង់ជាគ្រឿងអលង្ការដ៏មានតម្លៃ' },
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

  return (
    <>
      {/* Fullscreen Preview Overlay */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-slate-950 flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded">
                {font.category}
              </span>
              <h3 className="text-lg font-bold" style={{ fontFamily: "'Lato', sans-serif" }}>
                {font.name}
              </h3>
            </div>
            <button
              onClick={handleMinimize}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-600 transition-all text-xs font-bold active:scale-95"
            >
              <Minimize2 size={14} />
              Minimize
            </button>
          </div>

          <div className="flex-1 flex flex-col p-6 sm:p-12 overflow-auto">
            <textarea
              autoFocus
              value={previewText}
              onChange={(e) => setPreviewText(e.target.value)}
              className="flex-1 w-full bg-transparent outline-none resize-none text-slate-800 dark:text-slate-100 text-2xl sm:text-3xl md:text-4xl"
              style={{
                fontFamily: `'${font.googleFont}', sans-serif`,
                letterSpacing: '0.08em',
                lineHeight: '2.2',
                wordSpacing: '0.3em',
              }}
              placeholder="វាយអក្សរនៅទីនេះ..."
            />
          </div>
        </div>
      )}

      {/* Normal Card UI */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-xl">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-80 p-5 sm:p-6 bg-slate-50/50 dark:bg-slate-800/30 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded">
                  {font.category}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-1" style={{ fontFamily: "'Lato', sans-serif" }}>
                {font.name}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                {font.description}
              </p>
            </div>

            <button
              onClick={() => onDownload(font)}
              disabled={downloadingId === font.id}
              className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold transition-all ${
                downloadingId === font.id
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-900 dark:bg-slate-800 text-white hover:bg-blue-600 active:scale-[0.97]'
              }`}
            >
              {downloadingId === font.id ? <CheckCircle size={18} /> : <Download size={18} />}
              {downloadingId === font.id ? 'Starting...' : 'Download'}
            </button>
          </div>

          <div className="flex-1 p-5 sm:p-8 flex flex-col justify-center min-h-[140px]">
            <div
              onClick={handleTextClick}
              className="text-xl sm:text-2xl md:text-3xl text-slate-800 dark:text-slate-100 text-center lg:text-left cursor-text hover:opacity-70 transition-opacity"
              style={{
                fontFamily: `'${font.googleFont}', sans-serif`,
                lineHeight: '2.2',
              }}
            >
              {previewText || font.previewText}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-50 dark:border-slate-800/50 flex items-center justify-between text-[10px] text-slate-400">
              <span className="uppercase tracking-[0.25em]">ក ខ គ ឃ ង ច ឆ ជ ឈ ញ</span>
              <span className="italic">tap to edit</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Body = ({ searchTerm }) => {
  const [downloadingId, setDownloadingId] = useState(null);
  const [showEditor, setShowEditor] = useState(false);

  // TinyMCE Font Formatting: Name='Google Font Name', sans-serif;
  const khmerFontFormats = FONT_DATA.map(f => `${f.name}='${f.googleFont}', sans-serif`).join(';');
  const googleFontsUrl = FONT_DATA.map(f => f.googleFont.replace(/ /g, '+')).join('|');

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
      {/* TinyMCE Modal Overlay */}
      {showEditor && (
        <div className="fixed inset-0 z-[60] bg-white dark:bg-slate-950 flex flex-col">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <PenLine size={16} className="text-blue-600" />
              <span className="font-bold text-sm" style={{ fontFamily: "'Lato', sans-serif" }}>
                Khmer Rich Text Editor
              </span>
            </div>
            <button
              onClick={() => setShowEditor(false)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-600 transition-all text-xs font-bold active:scale-95"
            >
              <Minimize2 size={14} />
              Close Editor
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            <Editor
              apiKey="8hbojyhxg3e1thxrfp3xzks2rdz1autw90biep7q3l8laf1q"
              init={{
                height: '100%',
                menubar: true,
                plugins: ['advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media', 'table', 'wordcount'],
                toolbar: 'undo redo | fontfamily fontsize | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | forecolor backcolor | removeformat',
                font_family_formats: khmerFontFormats,
                content_style: `
                  @import url('https://fonts.googleapis.com/css2?family=${googleFontsUrl}&display=swap');
                  body { font-family: 'Battambang', sans-serif; font-size: 18px; line-height: 2; padding: 2rem; }
                `,
                skin: document.documentElement.classList.contains('dark') ? 'oxide-dark' : 'oxide',
                content_css: document.documentElement.classList.contains('dark') ? 'dark' : 'default',
              }}
              initialValue="<p>វាយអក្សរខ្មែរនៅទីនេះ...</p>"
            />
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="mb-8 sm:mb-10 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-4xl font-bold mb-1 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Khmer Unicode Archive
            </h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
              Free high-quality fonts for your creative projects.
            </p>
          </div>
          <button
            onClick={handleDownloadAll}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 text-sm active:scale-95"
          >
            <Archive size={18} />
            Download All 27 Fonts
          </button>
        </div>

        {/* Launch Button */}
        <button
          onClick={() => setShowEditor(true)}
          className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 hover:border-blue-400 hover:text-blue-600 transition-all group"
        >
          <PenLine size={18} className="group-hover:scale-110 transition-transform" />
          <span className="font-bold text-sm sm:text-base">Try Khmer Rich Text Editor</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold">
            27 Fonts
          </span>
        </button>
      </div>

      {/* Fonts Grid */}
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