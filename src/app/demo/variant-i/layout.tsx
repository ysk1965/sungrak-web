import { BasePathProvider } from "@/contexts/base-path-context";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BasePathProvider basePath="/demo/variant-i">{children}</BasePathProvider>
  );
}
