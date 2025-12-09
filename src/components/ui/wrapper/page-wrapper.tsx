import { Button } from "../button";

export default function PageWrapper({
  children,
  title,
  subtitle,
  formId,
  isPending,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  formId?: string;
  isPending?: boolean;
}) {
  return (
    <section className="bg-white h-full flex flex-col gap-8 flex-1  rounded-[12px] px-10 pt-10 pb-6">
      <div>
        <h2 className="font-bold text-2xl">{title}</h2>
        <p className="text-sm">{subtitle}</p>
      </div>
      <section className="flex-1 h-full  gap-6 flex flex-col overflow-y-auto">
        {children}
      </section>
      <div className="flex justify-end">
        <Button type="submit" form={formId} disabled={isPending}>
          {isPending ? "Saving..." : "Save"}
        </Button>
      </div>
    </section>
  );
}
