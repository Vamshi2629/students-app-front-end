// src/pdf-worker.js
export default new Worker(
  new URL("pdfjs-dist/build/pdf.worker.mjs", import.meta.url),
  { type: "module" }
);
