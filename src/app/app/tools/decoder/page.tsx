import Link from "next/link";

export default function DecoderPage() {
  return (
    <div className="min-h-[calc(100vh-49px)]">
      <div className="px-8 pt-6">
        <Link
          href="/app/dashboard"
          className="text-sm uppercase tracking-widest transition-colors text-foreground/35 hover:text-matrix"
        >
          &larr; Dashboard
        </Link>
      </div>
      <iframe
        src="/mobile_caesar_decoder.html"
        className="w-full h-[calc(100vh-97px)] border-0"
        title="Caesar Cipher Decoder"
      />
    </div>
  );
}
