import "./globals.css";
import { NoteProvider } from "@/components/context";
import { Navbar } from "@/components";

export const metadata = {
  title: "KNote",
  description: "knote it down!",
  generator: "Next.js",
  applicationName: "KNote",
  referrer: "origin-when-cross-origin",
  keywords: ["Next.js", "React", "JavaScript"],
  icons: "/moon/1.svg",
  authors: [
    { name: "kamal kashyap", url: "https://github.com/thekamalkashyap" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="prose max-w-none">
        <NoteProvider>
          <Navbar />
          {children}
        </NoteProvider>
      </body>
    </html>
  );
}
