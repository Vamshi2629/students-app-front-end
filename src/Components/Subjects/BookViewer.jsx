import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";
import { Howl } from "howler";
import api from "../../api";
import Lottie from "lottie-react";

import { useNavigate } from "react-router-dom";

// import 
import Loading from "../../assets/Loading.json";
// import Loading from ".."

// Setup PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const BookViewer = () => {
  const { id } = useParams();
  const [pdfUrl, setPdfUrl] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [bookSize, setBookSize] = useState({ width: 600, height: 920 });
  const navigate=useNavigate()

  const pageTurnSoundRef = useRef(
    new Howl({
      src: ["/page-flip.mp3"], // Should be in public/
      preload: true,
      html5: true,
      volume: 1,
    })
  );

  // Detect screen size
  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (width < 768) {
        setIsMobile(true);
        setBookSize({ width: 300, height: 400 });
      } else {
        setIsMobile(false);
        const calcWidth = Math.min(800, Math.floor(width * 0.8));
        const calcHeight = Math.min(1000, Math.floor(height * 0.8));
        setBookSize({ width: calcWidth, height: calcHeight });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Fetch PDF
  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await api.get(`/subjects/${id}`);
        const url = response.data?.pdf_url;
        setPdfUrl(url);
      } catch (error) {
        console.error("Failed to load subject:", error);
      }
    };
    fetchSubject();
  }, [id]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    < div className="h-screen">
    <div className="p-4">
  <button
    onClick={() => navigate("/books")}
    className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition duration-200"
  >
    Go to Books
  </button>
</div>

    {/* </div> */}
    <div className="  bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
      
      {pdfUrl ? (
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<Lottie animationData={Loading} loop={true} className="w-72 mx-auto" />}
        >
          {numPages && (
            <HTMLFlipBook
              width={500}
              height={600}
              minWidth={600}
              maxWidth={800}
              minHeight={400}
              maxHeight={1036}
              size="stretch"
              showCover={true}
              mobileScrollSupport={true}
              usePortrait={isMobile}
              onFlip={() => {
                // Play sound only after user interaction
                if (pageTurnSoundRef.current && typeof pageTurnSoundRef.current.play === "function") {
                  pageTurnSoundRef.current.play();
                }
              }}
              className="shadow-2xl rounded-md bg-white"
            >
              {Array.from(new Array(numPages), (_, index) => (
                <div
                  key={`page_${index + 1}`}
                  className="page bg-white flex items-center justify-center"
                >
                  <Page
                    pageNumber={index + 1}
                    width={500}
                    height={400}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </div>
              ))}
            </HTMLFlipBook>
          )}
        </Document>
      ) : (
        <p className="text-gray-700 text-lg"><Lottie animationData={Loading} loop={true} className="w-72 mx-auto" /></p>
      )}

      {/* <iframe
  src="https://res.cloudinary.com/djt4kti0n/raw/upload/v1754307933/ResumeVamshi_toilzq.pdf"
  width="100%"
  height="600px"
  title="PDF Preview"
/> */}

    </div>
    </div>
  );
};

export default BookViewer;
