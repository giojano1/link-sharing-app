"use client";
import PageWrapper from "@/components/ui/wrapper/page-wrapper";
import AddLinkBtn from "@/features/links/components/add-link-btn";
import { EmptyLinks } from "@/features/links/components/empty-links";
import { useState } from "react";

export default function LinksPage() {
  const [isPending] = useState(false);

  return (
    <PageWrapper
      title="Customize your links"
      subtitle="Add/edit/remove links below and then share all your profiles with the world!."
      formId="profile-form"
      isPending={isPending}
      actionButton={<AddLinkBtn />}
    >
      <EmptyLinks />
    </PageWrapper>
  );
}
