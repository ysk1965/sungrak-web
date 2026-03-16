import { BasePathProvider } from "@/contexts/base-path-context";

export default function VariantBLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BasePathProvider basePath="/demo/variant-b">{children}</BasePathProvider>
  );
}
