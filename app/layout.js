import "./globals.css";
import { NoteProvider } from "@/components/context";
import { Navbar } from "@/components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "@/config.json";

export const metadata = {
  title: config.title,
  description: config.description,
  generator: "Next.js",
  applicationName: config.applicationName,
  referrer: "origin-when-cross-origin",
  keywords: ["Next.js", "React", "JavaScript"],
  icons: config.icons,
  authors: config.authors,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="prose max-w-none">
        <NoteProvider>
          <Navbar />
          <ToastContainer
            position="bottom-right"
            autoClose={2500}
            hideProgressBar
            newestOnTop
            closeOnClick
            pauseOnFocusLoss
            pauseOnHover
            theme="dark"
          />
          {children}
        </NoteProvider>
      </body>
    </html>
  );
}
