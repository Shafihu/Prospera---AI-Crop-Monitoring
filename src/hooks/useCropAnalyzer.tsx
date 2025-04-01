"use client";

import { useState, useEffect } from "react";

const useCropAnalyzer = () => {
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const tmImage = await import("@teachablemachine/image");

        const baseUrl = window.location.origin;
        const modelUrl = `${baseUrl}/my_model`;

        console.log("Fetching model.json...");
        const response = await fetch(`${modelUrl}/model.json`);
        const modelJson = await response.json();
        console.log("Model JSON:", modelJson);

        const loadedModel = await tmImage.load(
          `${modelUrl}/model.json`,
          `${modelUrl}/metadata.json`
        );

        setModel(loadedModel);
        console.log("✅ Model Loaded Successfully");
      } catch (err: any) {
        console.error("❌ Error loading model:", err);
        setError(err.message || "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (typeof window !== "undefined") {
      loadModel();
    }
  }, []);

  return { model, loading, error };
};

export default useCropAnalyzer;
