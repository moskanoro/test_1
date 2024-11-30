"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Settings } from "lucide-react";
import type { UserPreferences } from "@/lib/types";

interface PreferencesDialogProps {
  preferences: UserPreferences;
  onSave: (preferences: UserPreferences) => void;
}

export function PreferencesDialog({ preferences, onSave }: PreferencesDialogProps) {
  const [localPreferences, setLocalPreferences] = useState(preferences);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Preferences</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Crowd Density Notification Threshold</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[localPreferences.crowdDensityThreshold]}
                onValueChange={([value]) =>
                  setLocalPreferences({
                    ...localPreferences,
                    crowdDensityThreshold: value,
                  })
                }
                max={100}
                step={1}
              />
              <span className="w-12 text-sm">{localPreferences.crowdDensityThreshold}%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Label>Enable Notifications</Label>
            <Switch
              checked={localPreferences.notificationsEnabled}
              onCheckedChange={(checked) =>
                setLocalPreferences({
                  ...localPreferences,
                  notificationsEnabled: checked,
                })
              }
            />
          </div>
          <Button onClick={() => onSave(localPreferences)} className="w-full">
            Save Preferences
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}