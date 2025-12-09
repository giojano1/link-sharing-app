import { Folder } from "lucide-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function EmptyLinks() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Folder />
        </EmptyMedia>
        <EmptyTitle>No Links Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any links yet. Get started by creating your
          first link.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
