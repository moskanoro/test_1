"use client";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle, AlertTriangle } from "lucide-react";

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
  const getColorClass = (density: number) => {
    if (density <= 40) return "bg-green-500";
    if (density <= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getStatusInfo = (density: number) => {
    if (density <= 40) return {
      text: "Low Density - Good time to visit",
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      recommendation: "Recommended to visit now"
    };
    if (density <= 70) return {
      text: "Moderate Density",
      icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
      recommendation: "Expect some waiting time"
    };
    return {
      text: "High Density",
      icon: <AlertCircle className="h-5 w-5 text-red-500" />,
      recommendation: "Consider visiting later"
    };
  };

  const statusInfo = getStatusInfo(density);

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {statusInfo.icon}
          <span className="font-medium">{statusInfo.text}</span>
        </div>
        <span className="text-sm text-muted-foreground">{density}%</span>
      </div>
      <Progress
        value={density}
        className="h-3"
        indicatorClassName={cn(getColorClass(density), "transition-all")}
      />
      {showRecommendation && (
        <p className="text-sm text-muted-foreground mt-2">
          {statusInfo.recommendation}
        </p>
      )}
    </div>
  );
}