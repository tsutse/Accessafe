import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "./lib/queryClient";
import DemoPage from "@/components/demo/DemoPage";
import NotFound from "@/pages/not-found";
import { AccessibilityProvider } from "@/lib/AccessibilityContext";
import { useEffect } from "react";

function ImplementationExample() {
  useEffect(() => {
    window.location.href = '/implementation-example.html';
  }, []);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={DemoPage} />
      <Route path="/implementation-example" component={ImplementationExample} />
      <Route component={NotFound} />
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
