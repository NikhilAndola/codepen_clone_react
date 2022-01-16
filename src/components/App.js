import React, { useEffect, useState } from 'react';
import Editor from "./Editor";
import '../index.css';
import useLocalStorage from '../hooks/useLocalStorage';

function App() {

  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
  <html>
    <body>${html}</body>
    <style>${css}</style>
    <script>${js}</script>
  </html>
  `
      )
    }, 250)
    return () => clearTimeout(timeout)
  }, [html, css, js])

  return (
    <>
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />

        <Editor
          language="js"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>

      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="Output"
          sandbox="allow-scripts allow-modals"
          width="100%"
          frameBorder="0"
          height="100%"
        />
      </div>
    </>
  );
}

export default App;
