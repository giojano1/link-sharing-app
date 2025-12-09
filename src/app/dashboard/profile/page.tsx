"use client";
import { useState } from "react";
import PageWrapper from "@/components/ui/wrapper/page-wrapper";
import EditUserDataForm from "@/features/profile/components/edit-user-data.form";
import UploadProfilePicture from "@/features/profile/components/upload-profile-picture";

export default function ProfileDetailsPage() {
  const [isPending, setIsPending] = useState(false);

  return (
    <PageWrapper
      title="Profile Details"
      subtitle="Add your details to create a personal touch to your profile."
      formId="profile-form"
      isPending={isPending}
    >
      <UploadProfilePicture />
      <EditUserDataForm onFormStateChange={setIsPending} />
    </PageWrapper>
  );
}
