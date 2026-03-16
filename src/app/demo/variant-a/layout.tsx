import { BasePathProvider } from "@/contexts/base-path-context";

export default function VariantALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BasePathProvider basePath="/demo/variant-a">{children}</BasePathProvider>
  );
}
