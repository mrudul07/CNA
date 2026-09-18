import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import PlaceholderPage from "./pages/PlaceholderPage";
import Overview from "./pages/Overview";
import NetworkExplorer from "./pages/NetworkExplorer";
import Investigations from "./pages/Investigations";
import Alerts from "./pages/Alerts";
import AIAnalysis from "./pages/AIAnalysis";
import Timeline from "./pages/Timeline";
import Entities from "./pages/Entities";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/briefing" element={<LandingPage />} />
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Overview />} />
          <Route path="network" element={<NetworkExplorer />} />
          <Route path="investigations" element={<Investigations />} />
          <Route path="entities" element={<Entities />} />
          <Route path="cases" element={<PlaceholderPage title="Case Records" />} />
          <Route path="timeline" element={<Timeline />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="data" element={<PlaceholderPage title="Data Sources" />} />
          <Route path="ai-analysis" element={<AIAnalysis />} />
          <Route path="audit" element={<PlaceholderPage title="System Audit Log" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

