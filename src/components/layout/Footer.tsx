"use client";

import { useEffect, useState } from "react";

export function Footer() {
  const [year, setYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-gray-100 text-center py-4 mt-8">
      <span>© {year} Restaurant. All rights reserved.</span>
    </footer>
  );
}
