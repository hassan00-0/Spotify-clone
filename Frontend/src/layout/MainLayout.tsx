import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";

const MainLayout = () => {
  const isMobile = false;
  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <ResizablePanelGroup
        orientation="horizontal"
        className="flex-1 flex h-full overflow-hidden p-2 w-full min-w-0"
      >
        {/* left side bar */}
        <ResizablePanel
          defaultSize={20}
          minSize={isMobile ? 0 : 10}
          maxSize={350}
          className="overflow-hidden min-w-0"
        >
          <div className="truncate">
            <LeftSideBar />
          </div>
        </ResizablePanel>

        <ResizableHandle className="w-2 bg-black rounded-lg" />
        {/* the main content */}
        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
          <Outlet />
        </ResizablePanel>

        <ResizableHandle className="w-2 bg-black rounded-lg" />

        {/* right side bar */}
        <ResizablePanel
          defaultSize={20}
          minSize={0}
          maxSize={310}
          collapsedSize={0}
          className="overflow-hidden min-w-0"
        >
          <div className="truncate">
            <RightSideBar />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default MainLayout;
