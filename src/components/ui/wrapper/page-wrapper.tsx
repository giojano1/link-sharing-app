import { Button } from "../button";

export default function PageWrapper({
  children,
  title,
  subtitle,
  formId,
  isPending,
  actionButton,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  formId?: string;
  isPending?: boolean;
  actionButton?: React.ReactNode;
}) {
  return (
    <section className="max-1100:p-6 max-500:p-4 max-500:gap-4 flex h-full flex-1 flex-col gap-8 rounded-[12px] bg-white px-10 pt-10 pb-6">
      <div>
        <h2 className="max-600:text-xl text-2xl font-bold">{title}</h2>
        <p className="max-600:text-xs text-sm">{subtitle}</p>
      </div>
      {actionButton && <div className="w-full">{actionButton}</div>}
      <section className="flex h-full flex-1 flex-col gap-6 overflow-y-auto">
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
