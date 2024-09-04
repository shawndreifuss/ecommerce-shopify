// components/ThemeTester.js

import { useState } from 'react';

const ThemeTester = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  return (
    <div className="p-6">
      <button
        className="mb-4 px-4 py-2 border border-border bg-primary text-primary-foreground rounded"
        onClick={toggleTheme}
      >
        Toggle Theme
      </button>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-card border border-border  text-card-foreground rounded">Card</div>
        <div className="p-4 bg-popover text-popover-foreground rounded">Popover</div>
        <div className="p-4 bg-muted text-muted-foreground rounded">Muted</div>
        <div className="p-4 bg-accent text-accent-foreground rounded">Accent</div>
        <div className="p-4 bg-destructive text-destructive-foreground rounded">Destructive</div>
      </div>
    </div>
  );
};

export default ThemeTester;
