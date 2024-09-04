import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import useLocalStorage from '../hooks/useLocalStorage';


function App() {
  const [html, setHtml] = useLocalStorage('html', '');
  const [css, setCss] = useLocalStorage('css', '');
  const [js, setJs] = useLocalStorage('js', '');
  const [srcDoc, setSrcDoc] = useState('');
  const [theme, setTheme] = useState('light');

 


  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    }, 250);
    return () => clearTimeout(timeout);
  }, [html, css, js]);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
 


  return (
   <>
     <div className="header">
        <h1>SyntaxCanva</h1>
        <div className="theme-toggle">
          <input
            type="checkbox"
            id="theme-toggle"
            onChange={toggleTheme}
            checked={theme === 'dark'}
          />
          <label htmlFor="theme-toggle" className="slider"></label>
        </div>
      </div>


      <div className="editor upper">
        <Editor
          language="html"
          displayName="HTML"
          value={html}
          onChange={setHtml}
          theme={theme}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
          theme={theme}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
          theme={theme}
        />
      </div>
      <div className="below display">
        <iframe
          srcDoc={srcDoc}
          title="Output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  );
}


export default App;
