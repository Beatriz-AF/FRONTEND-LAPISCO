import { useState, useEffect } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="area-tema">
      <p>Tema</p>
      <button id="toggleTema" onClick={() => setDark((d) => !d)}>
        {dark ? "☀️" : "🌙"}
      </button>
    </div>
  );
}