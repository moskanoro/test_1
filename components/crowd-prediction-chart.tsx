"use client";

import { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import type { CrowdPrediction } from "@/lib/types";

interface CrowdPredictionChartProps {
  predictions: CrowdPrediction[];
  bestTimeToVisit: number;
}

export function CrowdPredictionChart({ predictions, bestTimeToVisit }: CrowdPredictionChartProps) {
  const formattedData = useMemo(() => 
    predictions.map(pred => ({
      ...pred,
      time: `${pred.hour}:00`,
      color: pred.hour === bestTimeToVisit ? "var(--chart-1)" : undefined
    }))
  , [predictions, bestTimeToVisit]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Crowd Prediction
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={formattedData}>
              <defs>
                <linearGradient id="colorDensity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="time" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="density"
                stroke="hsl(var(--chart-1))"
                fillOpacity={1}
                fill="url(#colorDensity)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          Best time to visit: <span className="font-medium">{bestTimeToVisit}:00</span>
        </div>
      </CardContent>
    </Card>
  );
}