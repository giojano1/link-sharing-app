"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import FormInput from "@/components/ui/inputs/form-input";
import { useCurrentUser } from "@/features/user/hooks/use-current-user";

export default function EditUserDataForm() {
  const { data: user, isLoading, error } = useCurrentUser();
  if (isLoading) return <div>Loading...</div>;
  return (
    <Card>
      <CardContent>
        <form>
          <fieldset className="flex flex-col gap-6">
            <div className="flex items-center justify-between gap-5">
              <span className="block">First Name*</span>
              <div className="flex-1 max-w-[450px]">
                <FormInput
                  placeholder={user?.firstName ? user.firstName : "e.g. John"}
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-5">
              <span className="block">Last Name*</span>
              <div className="flex-1 max-w-[450px]">
                <FormInput
                  placeholder={user?.lastName ? user.lastName : "e.g. Doe"}
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-5">
              <span className="block">Email</span>
              <Input
                className="flex-1 max-w-[450px]"
                placeholder={user?.email}
                readOnly={true}
              />
            </div>
          </fieldset>
        </form>
      </CardContent>
    </Card>
  );
}
