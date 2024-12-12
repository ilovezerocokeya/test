import MainLayout from "@/components/Layout/MainLayout";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-full mx-auto max-w-container-l m:max-w-container-m s:max-w-container-s">
      <MainLayout>{children}</MainLayout>
    </div>
  );
};

export default layout;
