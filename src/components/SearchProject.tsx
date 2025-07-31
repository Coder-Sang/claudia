import { Card } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";

export interface SearchProjectProps {
  keyword: string;
  setKeyword: (keyword: string) => void;
  isActive: boolean;
}

export function SearchProject({
  keyword,
  setKeyword,
  isActive,
}: SearchProjectProps) {
  const [show, setShow] = useState(false);
  const inputRef = useRef(null as HTMLInputElement | null);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
        const modKey = isMac ? e.metaKey : e.ctrlKey;

        if (modKey) {
          switch (e.key) {
            case "f":
              e.preventDefault();
              setShow(!show);
              break;
          }
        
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  useEffect(() => {
    if (!isActive) {
      return;
    }
    if (show) {
      inputRef.current?.focus();
    }
  }, [show]);

  return (
    <Card
      hidden={!show}
      className="absolute top-8 right-12 px-4 py-3 min-w-80 hover:shadow-md"
      style={{
        borderColor: "var(--color-muted-foreground)",
        backgroundColor: "var(--color-background)",
      }}
    >
      <input
        ref={inputRef}
        id="search-project-input"
        type="text"
        placeholder="Search Project"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </Card>
  );
}
