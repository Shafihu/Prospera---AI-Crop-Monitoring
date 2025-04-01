/* eslint-disable @typescript-eslint/no-explicit-any */
// Define types for our crop analysis
export type CropIssue = {
  name: string;
  description: string;
  severity: "low" | "medium" | "high";
  probability: number;
};

export type CropRecommendation = {
  action: string;
  timeframe: string;
  importance: "optional" | "recommended" | "critical";
};

export type CropAnalysisResult = {
  status: "healthy" | "at-risk" | "unhealthy";
  confidence: number;
  issues: CropIssue[];
  recommendations: CropRecommendation[];
};

// Database of common crop issues by category
const cropIssueDatabase = {
  pests: [
    {
      name: "Aphids",
      description: "Small sap-sucking insects detected on leaves",
      severity: "medium",
    },
    {
      name: "Spider Mites",
      description: "Tiny arachnids causing stippling on leaves",
      severity: "medium",
    },
    {
      name: "Whiteflies",
      description: "Small white flying insects on the undersides of leaves",
      severity: "medium",
    },
    {
      name: "Thrips",
      description: "Slender insects causing silvery patches on leaves",
      severity: "high",
    },
    {
      name: "Caterpillars",
      description: "Leaf-eating larvae causing irregular holes in foliage",
      severity: "high",
    },
  ],
  diseases: [
    {
      name: "Powdery Mildew",
      description: "White powdery substance on leaf surfaces",
      severity: "medium",
    },
    {
      name: "Leaf Spot",
      description: "Brown or black spots on leaves",
      severity: "medium",
    },
    {
      name: "Rust",
      description: "Orange-brown pustules on leaf undersides",
      severity: "high",
    },
    {
      name: "Blight",
      description: "Rapid browning and death of plant tissues",
      severity: "high",
    },
    {
      name: "Downy Mildew",
      description: "Yellow spots on leaf surfaces with fuzzy growth underneath",
      severity: "high",
    },
  ],
  nutrient: [
    {
      name: "Nitrogen Deficiency",
      description: "Yellowing of older leaves starting from the tips",
      severity: "medium",
    },
    {
      name: "Phosphorus Deficiency",
      description: "Purple or reddish coloration in leaves",
      severity: "medium",
    },
    {
      name: "Potassium Deficiency",
      description: "Yellowing or browning of leaf margins",
      severity: "medium",
    },
    {
      name: "Magnesium Deficiency",
      description: "Interveinal chlorosis in older leaves",
      severity: "low",
    },
    {
      name: "Iron Deficiency",
      description: "Yellowing between veins in young leaves",
      severity: "low",
    },
  ],
  environmental: [
    {
      name: "Water Stress",
      description: "Wilting or curling of leaves",
      severity: "medium",
    },
    {
      name: "Sunburn",
      description: "Bleached or brown patches on exposed leaves",
      severity: "low",
    },
    {
      name: "Cold Damage",
      description: "Blackening or browning of leaf edges",
      severity: "medium",
    },
    {
      name: "Heat Stress",
      description: "Leaf curling and reduced growth",
      severity: "medium",
    },
    {
      name: "Root Compaction",
      description: "Stunted growth and poor water uptake",
      severity: "high",
    },
  ],
} as const;

// Database of recommendations by issue category
const recommendationDatabase = {
  pests: [
    {
      action: "Apply insecticidal soap",
      timeframe: "within 24 hours",
      importance: "recommended",
    },
    {
      action: "Introduce beneficial insects like ladybugs",
      timeframe: "within the week",
      importance: "recommended",
    },
    {
      action: "Apply neem oil spray",
      timeframe: "twice weekly",
      importance: "recommended",
    },
    {
      action: "Remove and destroy heavily infested leaves",
      timeframe: "immediately",
      importance: "critical",
    },
    {
      action: "Set up sticky traps around plants",
      timeframe: "as soon as possible",
      importance: "optional",
    },
  ],
  diseases: [
    {
      action: "Apply fungicide treatment",
      timeframe: "within 48 hours",
      importance: "critical",
    },
    {
      action: "Improve air circulation around plants",
      timeframe: "immediately",
      importance: "recommended",
    },
    {
      action: "Remove and destroy infected plant material",
      timeframe: "immediately",
      importance: "critical",
    },
    {
      action: "Apply copper-based fungicide",
      timeframe: "weekly",
      importance: "recommended",
    },
    {
      action: "Adjust watering to avoid wet foliage",
      timeframe: "ongoing",
      importance: "recommended",
    },
  ],
  nutrient: [
    {
      action: "Apply balanced NPK fertilizer",
      timeframe: "within the week",
      importance: "recommended",
    },
    {
      action: "Add compost to soil",
      timeframe: "next planting cycle",
      importance: "recommended",
    },
    {
      action: "Apply specific nutrient supplement",
      timeframe: "bi-weekly",
      importance: "recommended",
    },
    {
      action: "Conduct soil pH test",
      timeframe: "within 2 weeks",
      importance: "recommended",
    },
    {
      action: "Adjust soil pH if necessary",
      timeframe: "based on test results",
      importance: "critical",
    },
  ],
  environmental: [
    {
      action: "Adjust watering schedule",
      timeframe: "immediately",
      importance: "critical",
    },
    {
      action: "Provide shade during peak sun hours",
      timeframe: "daily",
      importance: "recommended",
    },
    {
      action: "Apply mulch around plants",
      timeframe: "within the week",
      importance: "recommended",
    },
    {
      action: "Protect plants from cold with covers",
      timeframe: "before freezing temperatures",
      importance: "critical",
    },
    {
      action: "Improve soil drainage",
      timeframe: "next planting cycle",
      importance: "recommended",
    },
  ],
  general: [
    {
      action: "Monitor crop daily for changes",
      timeframe: "ongoing",
      importance: "recommended",
    },
    {
      action: "Document symptoms with photos",
      timeframe: "weekly",
      importance: "optional",
    },
    {
      action: "Rotate crops next season",
      timeframe: "next planting cycle",
      importance: "recommended",
    },
    {
      action: "Consult with local agricultural extension",
      timeframe: "if condition worsens",
      importance: "recommended",
    },
    {
      action: "Implement preventive measures",
      timeframe: "before next growing season",
      importance: "recommended",
    },
  ],
} as const;

// Function to randomly select items from an array
function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Map model prediction classes to issue categories
function mapPredictionToCategories(prediction: any): string[] {
  // This function should be customized based on your specific model's output
  // For now, we'll use a simple mapping based on the class name or probability

  // Example implementation:
  const categories: string[] = [];

  // Get the top prediction class
  const topClass = prediction[0]?.className?.toLowerCase() || "";
  const topProbability = prediction[0]?.probability || 0;

  // Add categories based on the prediction
  if (topClass.includes("pest") || topClass.includes("insect")) {
    categories.push("pests");
  }

  if (
    topClass.includes("disease") ||
    topClass.includes("fungus") ||
    topClass.includes("mildew")
  ) {
    categories.push("diseases");
  }

  if (topClass.includes("deficiency") || topClass.includes("nutrient")) {
    categories.push("nutrient");
  }

  if (
    topClass.includes("water") ||
    topClass.includes("sun") ||
    topClass.includes("heat")
  ) {
    categories.push("environmental");
  }

  // If no specific categories were identified, add some based on probability
  if (categories.length === 0) {
    if (topProbability > 0.7) {
      // High probability might indicate a clear issue
      categories.push("diseases", "pests");
    } else if (topProbability > 0.4) {
      // Medium probability might indicate environmental or nutrient issues
      categories.push("environmental", "nutrient");
    } else {
      // Low probability might indicate general health concerns
      categories.push("general");
    }
  }

  // Always add general category for good measure
  if (!categories.includes("general")) {
    categories.push("general");
  }

  return categories;
}

// Generate a dynamic analysis result based on model prediction
export function generateAnalysisResult(prediction: any): CropAnalysisResult {
  const topClass = prediction[0]?.className?.toLowerCase() || "";
  const topProbability = prediction[0]?.probability || 0;

  // Determine status based on actual class and probability
  let status: "healthy" | "at-risk" | "unhealthy";
  if (topClass === "healthy") {
    status = topProbability > 0.8 ? "healthy" : "at-risk";
  } else {
    status = topProbability > 0.8 ? "unhealthy" : "at-risk";
  }

  // Map prediction to categories
  const categories = mapPredictionToCategories(prediction);

  // Generate issues based on categories
  const issues: CropIssue[] = [];
  categories.forEach((category) => {
    if (category in cropIssueDatabase) {
      // Get 1-2 random issues from this category
      const categoryIssues =
        cropIssueDatabase[category as keyof typeof cropIssueDatabase];
      const selectedIssues = getRandomItems(
        categoryIssues,
        Math.floor(Math.random() * 2) + 1
      );

      // Add to issues with a random probability
      selectedIssues.forEach((issue) => {
        issues.push({
          ...issue,
          probability: Number.parseFloat(
            (0.4 + Math.random() * 0.5).toFixed(2)
          ),
        });
      });
    }
  });

  // Sort issues by severity and probability
  issues.sort((a, b) => {
    const severityOrder = { high: 3, medium: 2, low: 1 };
    const aSeverity = severityOrder[a.severity as keyof typeof severityOrder];
    const bSeverity = severityOrder[b.severity as keyof typeof severityOrder];

    if (aSeverity !== bSeverity) {
      return bSeverity - aSeverity;
    }

    return b.probability - a.probability;
  });

  // Limit to top 3-5 issues
  const topIssues = issues.slice(0, Math.floor(Math.random() * 3) + 3);

  // Generate recommendations based on the identified issues
  const recommendations: CropRecommendation[] = [];
  categories.forEach((category) => {
    if (category in recommendationDatabase) {
      // Get 1-3 random recommendations from this category
      const categoryRecs =
        recommendationDatabase[category as keyof typeof recommendationDatabase];
      const selectedRecs = getRandomItems(
        categoryRecs,
        Math.floor(Math.random() * 3) + 1
      );

      // Add to recommendations
      recommendations.push(...selectedRecs);
    }
  });

  // Sort recommendations by importance
  recommendations.sort((a, b) => {
    const importanceOrder = { critical: 3, recommended: 2, optional: 1 };
    const aImportance =
      importanceOrder[a.importance as keyof typeof importanceOrder];
    const bImportance =
      importanceOrder[b.importance as keyof typeof importanceOrder];

    return bImportance - aImportance;
  });

  // Limit to top 4-6 recommendations
  const topRecommendations = recommendations.slice(
    0,
    Math.floor(Math.random() * 3) + 4
  );

  return {
    status,
    confidence: Math.round(topProbability * 100),
    issues: topIssues,
    recommendations: topRecommendations,
  };
}
