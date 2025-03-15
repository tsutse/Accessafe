import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "./lib/queryClient";
import DemoPage from "@/components/demo/DemoPage";
import { AccessibilityProvider } from "@/lib/AccessibilityContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={DemoPage} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AccessibilityProvider>
        <Router />
        <Toaster />
      </AccessibilityProvider>
    </QueryClientProvider>
  );
}

export default App;
