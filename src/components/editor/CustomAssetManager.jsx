import { useEditor } from '@grapesjs/react';
import { BsXLg } from "react-icons/bs";


export default function CustomAssetManager({
  assets,
  select,
}) {
  const editor = useEditor();

  const remove = (asset) => {
    editor.Assets.remove(asset);
  };

  console.log(assets);

  return (
    <div className="grid grid-cols-3 gap-2 pr-2">
      {assets.map((asset) => (
        <div
          key={asset.getSrc()}
          className="relative group rounded overflow-hidden"
        >
          <img className="display-block" src={asset.getSrc()} />
          <div className="flex flex-col items-center justify-end absolute top-0 left-0 w-full h-full p-5 bg-zinc-700/75 group-hover:opacity-100 opacity-0 transition-opacity">
            <button
              type="button"
              onClick={() => select(asset, true)}
            >
              Select
            </button>
            <button
              type="button"
              className="absolute top-2 right-2"
              onClick={() => remove(asset)}
            >
              <BsXLg />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
