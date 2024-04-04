import { BsBrush, BsLayers, BsGear, BsGrid } from "react-icons/bs";
import {
  BlocksProvider,
  LayersProvider,
  SelectorsProvider,
  StylesProvider,
  TraitsProvider,
} from "@grapesjs/react";
import CustomSelectorManager from "./customSelectorManager";
import CustomStyleManager from "./customStyleManager";
import TraitPropertyField from "./traitPropertyField";
import CustomBlockManager from "./customBlockManager";
import CustomLayerManager from "./customLayerManager";
import { useState } from "react";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="w-1/4 flex flex-col max-h-screen overflow-y-scroll ">
      <div className="bg-slate-50 border-b border-bottom-slate-200 flex">
        <button
          onClick={() => setActiveTab(1)}
          className="flex-1 flex justify-center items-center border-l border-l-slate-200 min-h-[44px]"
        >
          <BsBrush />
        </button>
        <button
          onClick={() => setActiveTab(2)}
          className="flex-1 flex justify-center items-center border-l border-l-slate-200 min-h-[44px]"
        >
          <BsGear />
        </button>
        <button
          onClick={() => setActiveTab(3)}
          className="flex-1 flex justify-center items-center border-l border-l-slate-200 min-h-[44px]"
        >
          <BsLayers />
        </button>
        <button
          onClick={() => setActiveTab(4)}
          className="flex-1 flex justify-center items-center border-l border-l-slate-200 min-h-[44px]"
        >
          <BsGrid />
        </button>
      </div>
      <div className="border-l border-l-slate-100 flex-grow">
        {activeTab === 1 && (
          <>
            <SelectorsProvider>
              {(props) => <CustomSelectorManager {...props} />}
            </SelectorsProvider>
            <StylesProvider>
              {(props) => <CustomStyleManager {...props} />}
            </StylesProvider>
          </>
        )}

        {activeTab === 2 && (
          <TraitsProvider>
            {({ traits }) => (
              <div className="gjs-custom-style-manager text-left mt-3 p-1">
                {!traits.length ? (
                  <div>No properties available</div>
                ) : (
                  traits.map((trait) => (
                    <TraitPropertyField key={trait.getId()} trait={trait} />
                  ))
                )}
              </div>
            )}
          </TraitsProvider>
        )}

        {
          activeTab === 3 && <LayersProvider>
            {(props) => <CustomLayerManager {...props} />}
          </LayersProvider>
        }
        {activeTab === 4 && (
          <BlocksProvider>
            {(props) => <CustomBlockManager {...props} />}
          </BlocksProvider>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
