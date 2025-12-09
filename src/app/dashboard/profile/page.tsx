import PageWrapper from "@/components/ui/wrapper/page-wrapper";
import EditUserDataForm from "@/features/profile/components/edit-user-data.form";
import UploadProfilePicture from "@/features/profile/components/upload-profile-picture";

export default function ProfileDetailsPage() {
  return (
    <PageWrapper
      title="Profile Details"
      subtitle="Add your details to create a personal touch to your profile."
    >
      <UploadProfilePicture />
      <EditUserDataForm />
    </PageWrapper>
  );
}
