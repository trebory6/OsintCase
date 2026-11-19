import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { I18nProvider, useI18n } from './i18n/index.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { UiPrefsProvider } from './context/UiPrefsContext.jsx';
import { ProjectProvider } from './context/ProjectContext.jsx';
import { AppConfigProvider } from './context/AppConfigContext.jsx';
import { CustomIconsProvider } from './context/CustomIconsContext.jsx';
import '@fontsource/chakra-petch/500.css';
import '@fontsource/chakra-petch/600.css';
import '@fontsource/chakra-petch/700.css';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import './styles/themes.css';
import './styles/global.css';
import './styles/case.css';
import './styles/typography.css';
import './styles/refine.css';

// Polyfill: crypto.randomUUID is secure-context only (HTTPS or localhost).
// Over plain HTTP (e.g. a Tailscale hostname) it is undefined, so fall back to a
// UUID v4 generator backed by crypto.getRandomValues (available in all contexts).
if (typeof crypto !== 'undefined' && typeof crypto.randomUUID !== 'function') {
  crypto.randomUUID = () => {
    const b = crypto.getRandomValues(new Uint8Array(16));
    b[6] = (b[6] & 0x0f) | 0x40;
    b[8] = (b[8] & 0x3f) | 0x80;
    const h = Array.from(b, (x) => x.toString(16).padStart(2, '0')).join('');
    return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
  };
}


// Dil değişince arayüz yeniden kurulur; dosya verisi ProjectProvider'da
// kaldığı için açık dosya kaybolmaz.
function LocalizedApp() {
  const { lang } = useI18n();
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return <App key={lang} />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <I18nProvider>
    <AppConfigProvider>
      <CustomIconsProvider>
        <ThemeProvider>
          <UiPrefsProvider>
            <ProjectProvider>
              <LocalizedApp />
            </ProjectProvider>
          </UiPrefsProvider>
        </ThemeProvider>
      </CustomIconsProvider>
    </AppConfigProvider>
    </I18nProvider>
  </StrictMode>,
);
