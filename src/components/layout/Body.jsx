import { useState } from 'react';
import { Download, CheckCircle, Archive, Minimize2, PenLine } from 'lucide-react';
import RichTextEditor from '../common/RichTextEditor'; // Updated to use your custom component

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
  { id: 'konkhmer-sleokchher', name: 'Konkhmer Sleokchher', designer: 'Suon May Sophanith', fileName: 'KonkhmerSleokchher.zip', category: 'Display', googleFont: 'Konkhmer Sleokchher', description: 'Inspired by traditional palm-leaf manuscript writing.', previewText: 'ខ្លៅជឿ ឆោតសួរ' },
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
  {
    id: 'akbalthom_highschool_fun',
    name: 'AKbalthom HighSchool-Fun',
    designer: 'AKbalthom',
    fileName: 'AKbalthom HighSchool-Fun.ttf',
    category: 'Display',
    googleFont: 'unknown',
    description: 'A playful and youthful font inspired by high school creativity.',
    previewText: 'ចំណេះវិជ្ជា គឺជាស្ពានឆ្ពោះទៅរកភាពជោគជ័យ'
  },
  {
    id: 'akbalthom_kbach',
    name: 'AKbalthom Kbach',
    designer: 'AKbalthom',
    fileName: 'AKbalthom Kbach.ttf',
    category: 'Display',
    googleFont: 'unknown',
    description: 'A traditional Khmer art-inspired font with intricate Kbach details.',
    previewText: 'វប្បធម៌រលត់ ជាតិរលាយ វប្បធម៌ពណ្ណរាយ ជាតិថ្កើងថ្កាន'
  },
  {
    id: 'akbalthom_khmerbasic',
    name: 'AKbalthom KhmerBasic',
    designer: 'AKbalthom',
    fileName: 'AKbalthom KhmerBasic.ttf',
    category: 'Display',
    googleFont: 'unknown',
    description: 'A clean and standard Khmer font suitable for everyday reading.',
    previewText: 'ការអប់រំ គឺជាអាវុធដ៏មានអានុភាពបំផុត'
  },
  {
    id: 'akbalthom_khmergothic',
    name: 'AKbalthom KhmerGothic',
    designer: 'AKbalthom',
    fileName: 'AKbalthom KhmerGothic.ttf',
    category: 'Display',
    googleFont: 'unknown',
    description: 'A modern Gothic-style Khmer font with bold and sharp lines.',
    previewText: 'ភាពអត់ធ្មត់ គឺជាដើមឈើដែលមានរសជាតិល្វីង ប៉ុន្តែផ្លែផ្អែម'
  },
  {
    id: 'akbalthom_khmerhand',
    name: 'AKbalthom KhmerHand',
    designer: 'AKbalthom',
    fileName: 'AKbalthom KhmerHand.ttf',
    category: 'Display',
    googleFont: 'unknown',
    description: 'A font that mimics natural Khmer handwriting.',
    previewText: 'ដាំដើមឈើនៅថ្ងៃនេះ ដើម្បីម្លប់នៅថ្ងៃស្អែក'
  },
  {
    id: 'akbalthom_khmerler',
    name: 'AKbalthom KhmerLer',
    designer: 'AKbalthom',
    fileName: 'AKbalthom KhmerLer.ttf',
    category: 'Display',
    googleFont: 'unknown',
    description: 'A stylized Khmer font with a unique upward-leaning aesthetic.',
    previewText: 'សេចក្តីព្យាយាម គង់បានសម្រេច'
  },
  {
    id: 'akbalthom_khmerlight',
    name: 'AKbalthom KhmerLight',
    designer: 'AKbalthom',
    fileName: 'AKbalthom KhmerLight.ttf',
    category: 'Display',
    googleFont: 'unknown',
    description: 'An elegant and thin Khmer font for a minimalist look.',
    previewText: 'មិត្តល្អ គឺរមែងជួយគ្នាក្នុងគ្រាក្រ'
  },
  {
    id: 'akbalthom_khmernew',
    name: 'AKbalthom KhmerNew',
    designer: 'AKbalthom',
    fileName: 'AKbalthom KhmerNew.ttf',
    category: 'Display',
    googleFont: 'unknown',
    description: 'A contemporary update to classic Khmer typography.',
    previewText: 'ស្គាល់ខ្លួនឯង ឈ្នះអស់មារសត្រូវ'
  },
  {
    id: 'akbalthom_korea',
    name: 'AKBALTHOM Korea',
    designer: 'AKbalthom',
    fileName: 'AKBALTHOM Korea.ttf',
    category: 'Display',
    googleFont: 'unknown',
    description: 'A Khmer font with visual influences from Korean typography.',
    previewText: 'ពេលវេលា គឺជាមាសប្រាក់'
  },
  {
    id: 'akbalthom_naga_bold',
    name: 'AKbalthom Naga Bold',
    designer: 'AKbalthom',
    fileName: 'AKbalthom Naga Bold.ttf',
    category: 'Display',
    googleFont: 'unknown',
    description: 'A powerful and thick font inspired by the strength of the Naga.',
    previewText: 'សន្តិភាព នាំមកនូវសេចក្តីចម្រើន'
  },
  {
    id: 'asvadek_air',
    name: 'ASvadek Air',
    designer: 'Asva dek',
    fileName: 'ASvadek Air.ttf',
    category: 'Display',
    googleFont: 'unknown',
    description: 'A light and airy font that feels modern and spacious.',
    previewText: 'អានសៀវភៅច្រើន បើកភ្នែកមើលពិភពលោក'
  },
  {
    id: 'asvadek_blade',
    name: 'ASvadek Blade',
    designer: 'Asva dek',
    fileName: 'ASvadek Blade.ttf',
    category: 'Display',
    googleFont: 'unknown',
    description: 'A sharp and edgy font with a cutting-edge feel.',
    previewText: 'សុខភាពល្អ គឺជាទ្រព្យសម្បត្តិដ៏មហាសាល'
  },
  {
    id: 'asvadek_bokornew',
    name: 'ASvadek Bokornew',
    designer: 'Asva dek',
    fileName: 'ASvadek Bokornew.ttf',
    category: 'Display',
    googleFont: 'unknown',
    description: 'A refreshed look for the classic Bokor style.',
    previewText: 'ញញឹមជានិច្ច ដើម្បីជីវិតស្រស់បំព្រង'
  },
  {
    id: 'asvadek_box',
    name: 'ASvadek Box',
    designer: 'Asva dek',
    fileName: 'ASvadek Box.ttf',
    category: 'Display',
    googleFont: 'unknown',
    description: 'A square-themed font with a solid, structured appearance.',
    previewText: 'ធ្វើល្អ បានល្អ ធ្វើអាក្រក់ បានអាក្រក់'
  },
  {
    id: 'asvadek_brushline',
    name: 'ASvadek Brushline',
    designer: 'Asva dek',
    fileName: 'ASvadek Brushline.ttf',
    category: 'Display',
    googleFont: 'unknown',
    description: 'A fluid font that captures the texture of a brush stroke.',
    previewText: 'ស្រឡាញ់អ្វីដែលអ្នកធ្វើ ធ្វើអ្វីដែលអ្នកស្រឡាញ់'
  },
  {
    id: 'asvadek_edge',
    name: 'ASvadek Edge',
    designer: 'Asva dek',
    fileName: 'ASvadek Edge.ttf',
    category: 'Display',
    googleFont: 'unknown',
    description: 'A bold font focusing on sharp corners and distinctive edges.',
    previewText: 'កុំទុកការងារថ្ងៃនេះ ដល់ថ្ងៃស្អែក'
  },
  {
    id: 'asvadek_edgehollow',
    name: 'ASvadek EdgeHollow',
    designer: 'Asva dek',
    fileName: 'ASvadek EdgeHollow.ttf',
    category: 'Display',
    googleFont: 'unknown',
    description: 'An outline version of the Edge font for a lighter impact.',
    previewText: 'ទឹកត្រជាក់ ត្រីកុមេរ'
  },
  {
    id: 'asvadek_fasthand_bold_italic',
    name: 'ASvadek FastHand Bold-Italic',
    designer: 'Asva dek',
    fileName: 'ASvadek FastHand Bold-Italic.ttf',
    category: 'Display',
    googleFont: 'unknown',
    description: 'A dynamic and forceful italicized handwriting font.',
    previewText: 'រៀនពីកំហុស ដើម្បីភាពជោគជ័យ'
  },
  {
    id: 'asvadek_fasthand_bold',
    name: 'ASvadek FastHand Bold',
    designer: 'Asva dek',
    fileName: 'ASvadek FastHand Bold.ttf',
    category: 'Display',
    googleFont: 'unknown',
    description: 'A strong, bold script font that suggests speed and confidence.',
    previewText: 'ចិត្តល្អ នាំមកនូវមិត្តល្អ'
  },
  {
    id: 'asvadek_fasthand_italic',
    name: 'ASvadek FastHand Italic',
    designer: 'Asva dek',
    fileName: 'ASvadek FastHand Italic.ttf',
    category: 'Display',
    googleFont: 'unknown',
    description: 'A swift, slanted handwriting style for an informal touch.',
    previewText: 'ការគោរពគ្នា គឺជាមូលដ្ឋាននៃសេចក្តីស្រឡាញ់'
  },
  {
    id: 'asvadek_fasthand',
    name: 'ASvadek FastHand',
    designer: 'Asva dek',
    fileName: 'ASvadek FastHand.ttf',
    category: 'Display',
    googleFont: 'unknown',
    description: 'A standard quick-writing Khmer script.',
    previewText: 'ក្តីស្រមៃ គ្មានដែនកំណត់'
  },
  {
    id: 'asvadek_freehand',
    name: 'ASvadek FreeHand',
    designer: 'Asva dek',
    fileName: 'ASvadek FreeHand.ttf',
    category: 'Display',
    googleFont: 'unknown',
    description: 'A font that celebrates the freedom of manual sketching.',
    previewText: 'ដើរដោយទំនុកចិត្ត ទៅរកគោលដៅ'
  },
  {
    id: 'asvadek_freehandb',
    name: 'ASvadek FreeHandb',
    designer: 'Asva dek',
    fileName: 'ASvadek FreeHandb.ttf',
    category: 'Display',
    googleFont: 'unknown',
    description: 'A variations of the FreeHand style with thicker strokes.',
    previewText: 'សេចក្តីថ្លៃថ្នូរ មិនអាចទិញបានដោយប្រាក់'
  },
  {
    id: 'asvadek_frightened',
    name: 'ASvadek Frightened',
    designer: 'Asva dek',
    fileName: 'ASvadek Frightened.ttf',
    category: 'Display',
    googleFont: 'unknown',
    description: 'A dramatic, shaky font designed for suspense or horror themes.',
    previewText: 'ភាពក្លាហាន មិនមែនជាការអវត្តមាននៃភាពភ័យខ្លាច'
  },
  {
    id: 'asvadek_hindi',
    name: 'ASvadek Hindi',
    designer: 'Asva dek',
    fileName: 'ASvadek Hindi.ttf',
    category: 'Display',
    googleFont: 'unknown',
    description: 'A Khmer font designed with aesthetic hints of Devanagari script.',
    previewText: 'សន្តិភាពក្នុងចិត្ត គឺជាសុភមង្គលពិត'
  },
  {
    id: 'asvadek_hollow',
    name: 'ASvadek Hollow',
    designer: 'Asva dek',
    fileName: 'ASvadek Hollow.ttf',
    category: 'Display',
    googleFont: 'unknown',
    description: 'A stylized outline font that works well for large titles.',
    previewText: 'រស់នៅប្រកបដោយអត្ថន័យ'
  },
  {
    id: 'asvadek_home_italic',
    name: 'ASvadek Home_italic',
    designer: 'Asva dek',
    fileName: 'ASvadek Home_italic.ttf',
    category: 'Display',
    googleFont: 'unknown',
    description: 'A cozy and slanted font that feels personal and welcoming.',
    previewText: 'គ្រួសារ គឺជាកម្លាំងចិត្តដ៏អស្ចារ្យ'
  },
  {
    id: 'asvadek_home',
    name: 'ASvadek Home',
    designer: 'Asva dek',
    fileName: 'ASvadek Home.ttf',
    category: 'Display',
    googleFont: 'unknown',
    description: 'A simple, comfortable font for domestic-themed designs.',
    previewText: 'ផ្ទះគឺជាកន្លែងដែលមានក្តីស្រឡាញ់'
  },
  {
    id: 'asvadek_hongkbach',
    name: 'ASvadek Hongkbach',
    designer: 'Asva dek',
    fileName: 'ASvadek Hongkbach.ttf',
    category: 'Display',
    googleFont: 'unknown',
    description: 'A decorative font blending traditional ornaments with modern style.',
    previewText: 'សិល្បៈ គឺជាដង្ហើមនៃជីវិត'
  },
  {
    id: 'asvadek_kampuchealove',
    name: 'ASvadek KampucheaLove',
    designer: 'Asva dek',
    fileName: 'ASvadek KampucheaLove.ttf',
    category: 'Display',
    googleFont: 'unknown',
    description: 'A font dedicated to the love and spirit of Cambodia.',
    previewText: 'ស្រឡាញ់ខ្មែរ ប្រើប្រាស់ផលិតផលខ្មែរ'
  },
  {
    id: 'asvadek_kbach_s',
    name: 'ASvadek Kbach S',
    designer: 'Asva dek',
    fileName: 'ASvadek Kbach S.ttf',
    category: 'Display',
    googleFont: 'unknown',
    description: 'A small-sized decorative Kbach font for subtle details.',
    previewText: 'មរតកដូនតា ត្រូវរក្សាឱ្យបានគង់វង្ស'
  },
  {
    id: 'asvadek_kbachvora',
    name: 'ASvadek KbachVora',
    designer: 'Asva dek',
    fileName: 'ASvadek KbachVora.ttf',
    category: 'Display',
    googleFont: 'unknown',
    description: 'An elaborate and ornate Kbach font for festive usage.',
    previewText: 'បុណ្យអុំទូក ជាបុណ្យប្រពៃណីជាតិ'
  },
  {
    id: 'asvadek_lazy',
    name: 'ASvadek Lazy',
    designer: 'Asva dek',
    fileName: 'ASvadek Lazy.ttf',
    category: 'Display',
    googleFont: 'unknown',
    description: 'A relaxed and casual font with a laid-back vibe.',
    previewText: 'ចេះមកពី រៀន មានមកពី រក'
  },
  {
    id: 'asvadek_momo_w_italic',
    name: 'ASvadek Momo W-italic',
    designer: 'Asva dek',
    fileName: 'ASvadek Momo W-italic.ttf',
    category: 'Display',
    googleFont: 'unknown',
    description: 'A wide, italicized font with a playful personality.',
    previewText: 'ភាពជោគជ័យ ចាប់ផ្តើមពីការសម្រេចចិត្ត'
  },
  {
    id: 'asvadek_pixel',
    name: 'ASvadek Pixel',
    designer: 'Asva dek',
    fileName: 'ASvadek Pixel.ttf',
    category: 'Display',
    googleFont: 'unknown',
    description: 'A retro digital-style font composed of visible pixels.',
    previewText: 'បច្ចេកវិទ្យា ផ្លាស់ប្តូរជីវិត'
  },
  {
    id: 'asvadek_ribbon',
    name: 'ASvadek Ribbon',
    designer: 'Asva dek',
    fileName: 'ASvadek Ribbon.ttf',
    category: 'Display',
    googleFont: 'unknown',
    description: 'A font where letters flow like elegant ribbons.',
    previewText: 'សេចក្តីសង្ឃឹម គឺជាពន្លឺនៃជីវិត'
  },
  {
    id: 'asvadek_samurai',
    name: 'ASvadek Samurai',
    designer: 'Asva dek',
    fileName: 'ASvadek Samurai.ttf',
    category: 'Display',
    googleFont: 'unknown',
    description: 'A sharp, disciplined font with Eastern aesthetic influences.',
    previewText: 'វិន័យ នាំមកនូវសេចក្តីថ្លៃថ្នូរ'
  },
  {
    id: 'asvadek_wave_italic',
    name: 'ASvadek Wave Italic',
    designer: 'Asva dek',
    fileName: 'ASvadek Wave Italic.ttf',
    category: 'Display',
    googleFont: 'unknown',
    description: 'An italicized font with a flowing, wavy motion.',
    previewText: 'ទឹកចិត្តសប្បុរស មិនចេះរីងស្ងួត'
  },
  {
    id: 'asvadek_wave',
    name: 'ASvadek Wave',
    designer: 'Asva dek',
    fileName: 'ASvadek Wave.ttf',
    category: 'Display',
    googleFont: 'unknown',
    description: 'A rhythmic font inspired by the movement of water.',
    previewText: 'ជីវិតដូចជាជំនោរខ្យល់'
  },
  {
    id: 'asvadek_writehand',
    name: 'ASvadek Writehand',
    designer: 'Asva dek',
    fileName: 'ASvadek Writehand.ttf',
    category: 'Display',
    googleFont: 'unknown',
    description: 'A standard handwritten font for personal notes.',
    previewText: 'សរសេរដោយបេះដូង'
  }
];

const FontCard = ({ font, downloadingId, onDownload }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [previewText, setPreviewText] = useState(font.previewText);

  const handleTextClick = () => setIsExpanded(true);
  const handleMinimize = () => setIsExpanded(false);

  return (
    <>
      {isExpanded && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-slate-950 flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded">
                {font.category}
              </span>
              <h3 className="text-lg font-bold">{font.name}</h3>
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
                fontFamily: `'${font.googleFont==='unknown' ? font.id : font.googleFont}', sans-serif`,
                letterSpacing: '0.08em',
                lineHeight: '2.2',
                wordSpacing: '0.3em',
              }}
              placeholder="វាយអក្សរនៅទីនេះ..."
            />
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-xl">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-80 p-5 sm:p-6 bg-slate-50/50 dark:bg-slate-800/30 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded">
                  {font.category}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-1">{font.name}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                {font.description}
              </p>
            </div>
            <button
              onClick={() => onDownload(font)}
              disabled={downloadingId === font.id}
              className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold transition-all ${downloadingId === font.id
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
                fontFamily: `'${font.googleFont==='unknown' ? font.id : font.googleFont}', sans-serif`,
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

  // Prepare font formats for the custom RichTextEditor
  const khmerFonts = FONT_DATA.map(f => ({
    label: f.name,
    value: `'${f.googleFont}', sans-serif`
  }));

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
      {/* Global Style to load Google Fonts for the Editor */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=${googleFontsUrl}&display=swap');
      `}</style>

      {/* Custom Editor Modal Overlay */}
      {showEditor && (
        <div className="fixed inset-0 z-[60] bg-white dark:bg-slate-950 flex flex-col p-4 sm:p-8">
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2">
              <PenLine size={18} className="text-blue-600" />
              <span className="font-bold text-sm">Khmer Rich Text Editor</span>
            </div>
            <button
              onClick={() => setShowEditor(false)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-600 transition-all text-xs font-bold"
            >
              <Minimize2 size={14} />
              Close Editor
            </button>
          </div>
          <div className="flex-1 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl">
            <RichTextEditor customFonts={khmerFonts} />
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="mb-8 sm:mb-10 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-4xl font-bold mb-1 tracking-tight">
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
            Download All 67 Fonts
          </button>
        </div>

        <button
          onClick={() => setShowEditor(true)}
          className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 hover:border-blue-400 hover:text-blue-600 transition-all group"
        >
          <PenLine size={18} className="group-hover:scale-110 transition-transform" />
          <span className="font-bold text-sm sm:text-base">Try Khmer Rich Text Editor</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold">
            67 Fonts
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