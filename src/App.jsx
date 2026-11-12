/**
 * Copyright (c) 2025-present mrofisr
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// src/App.jsx
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import LanguageChooser from "@/components/LanguageChooser";
import LanguageToggle from "@/components/LanguageToggle";
import MainContent from "@/pages/MainContent";
import LandingPage from "@/pages/LandingPage";
import config from "@/config/config";
import { useLanguage } from "@/lib/language";

/**
 * App component serves as the root of the application.
 *
 * It manages the state to determine whether the invitation content should be shown.
 * Initially, the invitation is closed and the LandingPage component is rendered.
 * Once triggered, the Layout component containing MainContent is displayed.
 *
 * This component also uses HelmetProvider and Helmet to set up various meta tags:
 *   - Primary meta tags: title and description.
 *   - Open Graph tags for Facebook.
 *   - Twitter meta tags for summary and large image preview.
 *   - Favicon link and additional meta tags for responsive design and theme color.
 *
 * @component
 * @example
 * // Renders the App component
 * <App />
 */
function App() {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [hasChosenLanguage, setHasChosenLanguage] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();
  const title = t(config.data.title);
  const description = t(config.data.description);

  return (
    <HelmetProvider>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={config.data.ogImage} />
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={window.location.href} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={config.data.ogImage} />
        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href={config.data.favicon} />
        {/* Additional Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#FDA4AF" /> {/* Rose-300 color */}
      </Helmet>

      <AnimatePresence>
        {!hasChosenLanguage && (
          <LanguageChooser onChoose={() => setHasChosenLanguage(true)} />
        )}
      </AnimatePresence>
      {hasChosenLanguage && <LanguageToggle />}

      <AnimatePresence mode="wait">
        {!isInvitationOpen ? (
          <LandingPage onOpenInvitation={() => setIsInvitationOpen(true)} />
        ) : (
          <Layout>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<MainContent />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        )}
      </AnimatePresence>
    </HelmetProvider>
  );
}

export default App;
