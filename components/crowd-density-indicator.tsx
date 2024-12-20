"use client";

import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle, AlertTriangle } from "lucide-react";

// Removed the `cn` utility usage to simplify debugging and avoid potential issues.
// Added inline classes directly to ensure everything works as intended.

interface CrowdDensityIndicatorProps {
  density: number;
  className?: string;
  showRecommendation?: boolean;
}

export function CrowdDensityIndicator({
  density,
  className,
  showRecommendation = false,
}: CrowdDensityIndicatorProps) {
  // Helper function to get the color class based on density
  const getColorClass = (density: number) => {
    if (density <= 40) return "bg-green-500";
    if (density <= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Helper function to get status information
  const getStatusInfo = (density: number) => {
    if (density <= 40)
      return {
        text: "Low Density - Good time to visit",
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
        recommendation: "Recommended to visit now",
      };
    if (density <= 70)
      return {
        text: "Moderate Density",
        icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
        recommendation: "Expect some waiting time",
      };
    return {
      text: "High Density",
      icon: <AlertCircle className="h-5 w-5 text-red-500" />,
      recommendation: "Consider visiting later",
    };
  };

  const statusInfo = getStatusInfo(density);

  return (
    <div className={`space-y-2 ${className || ""}`}>
      <div className="flex items-center justify-between">
        {/* Status Information */}
        <div className="flex items-center gap-2">
          {statusInfo.icon}
          <span className="font-medium">{statusInfo.text}</span>
        </div>
        {/* Density Percentage */}
        <span className="text-sm text-muted-foreground">{density}%</span>
      </div>
      {/* Progress Bar */}
      <Progress
        value={density}
        className={`h-3 transition-all ${getColorClass(density)}`}
      />
      {/* Recommendation Text */}
      {showRecommendation && (
        <p className="text-sm text-muted-foreground mt-2">
          {statusInfo.recommendation}
        </p>
      )}
    </div>
  );
}
