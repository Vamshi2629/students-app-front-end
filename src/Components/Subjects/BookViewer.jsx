import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";
import { Howl } from "howler";
import api from "../../api";
import Lottie from "lottie-react";
import Loading from "../../assets/Loading.json";
// import { useNavigation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// ✅ Use public CDN worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

const BookViewer = () => {
  const { id } = useParams();
  const [pdfUrl, setPdfUrl] = useState("");
  const [numPages, setNumPages] = useState(null);
  const pageTurnSoundRef = useRef(null);
  const [bookSize, setBookSize] = useState({
    width: window.innerWidth > 768 ? 600 : 300,
    height: window.innerWidth > 768 ? 800 : 500,
  });
  const navigate = useNavigate()

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    const fetchPdfUrl = async () => {
      try {
        const response = await api.get(`/subjects/${id}`);
        const url = response.data?.pdf_url;
        console.log("Fetched subject data:", response.data);
        console.log("PDF URL:", url);

        if (url) {
          setPdfUrl(url);
          // Test if the URL is accessible
          const testResponse = await fetch(url, { method: 'HEAD' });
          console.log("URL accessibility test:", testResponse.status);
        } else {
          console.error("No PDF URL found for this subject");
        }
      } catch (error) {
        console.error("Failed to load subject or PDF:", error);
      }
    };


    fetchPdfUrl();

    const handleResize = () => {
      setBookSize({
        width: window.innerWidth > 768 ? 600 : 300,
        height: window.innerWidth > 768 ? 800 : 500,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [id]);

  useEffect(() => {
    pageTurnSoundRef.current = new Howl({
      src: ["/page-flip.mp3"], // ✅ Ensure this sound file exists in public folder
    });
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onDocumentLoadError = (error) => {
    console.error("PDF load error:", error);
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
    <div className=" bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
      {pdfUrl ? (
        <Document
          file={pdfUrl }
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={
            <Lottie animationData={Loading} loop={true} className="w-72 mx-auto" />
          }
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
                if (
                  pageTurnSoundRef.current &&
                  typeof pageTurnSoundRef.current.play === "function"
                ) {
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
        <Lottie animationData={Loading} loop={true} className="w-72 mx-auto" />
      )}
    </div>
     </div>
  );
};

export default BookViewer;
