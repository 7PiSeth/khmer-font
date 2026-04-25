const flowbite = require("flowbite-react/tailwind");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    flowbite.content(),
  ],
theme: {
  extend: {
    fontFamily: {
      akbalthom_highschool_fun: ['akbalthom_highschool_fun', 'sans-serif'],
      akbalthom_kbach: ['akbalthom_kbach', 'sans-serif'],
      akbalthom_khmerbasic: ['akbalthom_khmerbasic', 'sans-serif'],
      akbalthom_khmergothic: ['akbalthom_khmergothic', 'sans-serif'],
      akbalthom_khmerhand: ['akbalthom_khmerhand', 'sans-serif'],
      akbalthom_khmerler: ['akbalthom_khmerler', 'sans-serif'],
      akbalthom_khmerlight: ['akbalthom_khmerlight', 'sans-serif'],
      akbalthom_khmernew: ['akbalthom_khmernew', 'sans-serif'],
      akbalthom_korea: ['akbalthom_korea', 'sans-serif'],
      akbalthom_naga_bold: ['akbalthom_naga_bold', 'sans-serif'],
      asvadek_air: ['asvadek_air', 'sans-serif'],
      asvadek_blade: ['asvadek_blade', 'sans-serif'],
      asvadek_bokornew: ['asvadek_bokornew', 'sans-serif'],
      asvadek_box: ['asvadek_box', 'sans-serif'],
      asvadek_brushline: ['asvadek_brushline', 'sans-serif'],
      asvadek_edge: ['asvadek_edge', 'sans-serif'],
      asvadek_edgehollow: ['asvadek_edgehollow', 'sans-serif'],
      asvadek_fasthand_bold_italic: ['asvadek_fasthand_bold_italic', 'sans-serif'],
      asvadek_fasthand_bold: ['asvadek_fasthand_bold', 'sans-serif'],
      asvadek_fasthand_italic: ['asvadek_fasthand_italic', 'sans-serif'],
      asvadek_fasthand: ['asvadek_fasthand', 'sans-serif'],
      asvadek_freehand: ['asvadek_freehand', 'sans-serif'],
      asvadek_freehandb: ['asvadek_freehandb', 'sans-serif'],
      asvadek_frightened: ['asvadek_frightened', 'sans-serif'],
      asvadek_hindi: ['asvadek_hindi', 'sans-serif'],
      asvadek_hollow: ['asvadek_hollow', 'sans-serif'],
      asvadek_home_italic: ['asvadek_home_italic', 'sans-serif'],
      asvadek_home: ['asvadek_home', 'sans-serif'],
      asvadek_hongkbach: ['asvadek_hongkbach', 'sans-serif'],
      asvadek_kampuchealove: ['asvadek_kampuchealove', 'sans-serif'],
      asvadek_kbach_s: ['asvadek_kbach_s', 'sans-serif'],
      asvadek_kbachvora: ['asvadek_kbachvora', 'sans-serif'],
      asvadek_lazy: ['asvadek_lazy', 'sans-serif'],
      asvadek_momo_w_italic: ['asvadek_momo_w_italic', 'sans-serif'],
      asvadek_pixel: ['asvadek_pixel', 'sans-serif'],
      asvadek_ribbon: ['asvadek_ribbon', 'sans-serif'],
      asvadek_samurai: ['asvadek_samurai', 'sans-serif'],
      asvadek_wave_italic: ['asvadek_wave_italic', 'sans-serif'],
      asvadek_wave: ['asvadek_wave', 'sans-serif'],
      asvadek_writehand: ['asvadek_writehand', 'sans-serif']
    },
  },
},
  darkMode: 'class', // Enable dark mode
  plugins: [
    flowbite.plugin(),
  ],
};