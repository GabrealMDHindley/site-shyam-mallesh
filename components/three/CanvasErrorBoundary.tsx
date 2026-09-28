"use client";

import { Component, ReactNode } from "react";
import HeroFallback from "@/components/three/HeroFallback";

// Defense in depth: if the 3D scene throws for any reason (WebGL context loss, a
// driver quirk, an unexpected runtime error), fall back to the static styled
// background instead of crashing the whole page. The design-principles doc requires
// the site stay fully usable if WebGL/3D fails.
export default class CanvasErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("3D hero scene failed, falling back to static hero:", error);
  }

  render() {
    if (this.state.hasError) return <HeroFallback />;
    return this.props.children;
  }
}
