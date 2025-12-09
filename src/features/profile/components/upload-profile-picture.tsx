import { Card, CardContent } from "@/components/ui/card";
import { Image } from "lucide-react";

export default function UploadProfilePicture() {
  return (
    <Card>
      <CardContent className="flex items-center justify-between gap-6">
        <h2 className="flex-1">Profile Picture</h2>
        <div className="size-[190px] bg-muted rounded-[12px] flex items-center justify-center gap-2  flex-col">
          <Image className="h-10 w-10" />
          <span>Upload Image</span>
        </div>
        <p className="flex-1 text-[12px] text-muted-foreground">
          Image must be below 1024x1024px. Use PNG or JPG format.
        </p>
      </CardContent>
    </Card>
  );
}
