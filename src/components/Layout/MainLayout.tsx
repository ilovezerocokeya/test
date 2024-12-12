import NavTabs from "@/components/MainPage/NavTab/NavTabs";
import MainSideBar from "../MainPage/MainSideBar/MainSideBar";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-full max-w-container-l m:max-w-container-m s:max-w-container-s mt-6">
      <NavTabs />
      <div className="grid gap-4 grid-cols-3 m:grid-cols-1">
        <div className="col-span-1 md:col-span-2">{children}</div>
        <MainSideBar />
      </div>
    </div>
  );
};

export default MainLayout;
