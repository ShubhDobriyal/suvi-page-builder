import grapesjs from 'grapesjs';
import GjsEditor, { AssetsProvider,Canvas,ModalProvider } from '@grapesjs/react';
import Topbar from './topbar';
import Sidebar from './sidebar';
import CustomModal from './CustomModal';
import CustomAssetManager from './CustomAssetManager';
// import "https://unpkg.com/grapick/dist/grapick.min.css";

const Editor = () => {

  const onEditor = (editor) => {
    console.log('Editor loaded', { editor });
    window.editor = editor;
  };

  const gjsConfig = {
    storageManager: false,
    height: "100vh",
    undoManager: { trackSelection: false },
    selectorManager: { componentFirst: true },
    projectData: {
      assets: [
        'https://via.placeholder.com/350x250/78c5d6/fff',
        'https://via.placeholder.com/350x250/459ba8/fff',
        'https://via.placeholder.com/350x250/79c267/fff',
        'https://via.placeholder.com/350x250/c5d647/fff',
        'https://via.placeholder.com/350x250/f28c33/fff',
      ],
      pages: [
        {
          name: 'Home page',
          component: `<h1>GrapesJS React Custom UI</h1>`,
        },
      ],
    },
    blockManager: {
      blocks: [
        {
          id: 'section', // id is mandatory
          label: '<b>Section</b>', // You can use HTML/SVG inside labels
          attributes: { class:'gjs-block-section' },
          content: `<section>
            <h1>This is a simple title</h1>
            <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
          </section>`,
        }, 
      ]
    },
  }

  return (
    <GjsEditor
      grapesjs={grapesjs}
      grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
      options={gjsConfig}
      plugins={[
          {
            id: 'gjs-blocks-basic',
            src: 'https://unpkg.com/grapesjs-blocks-basic',
          },
          {
            id: 'grapesjs-plugin-forms',
            src: 'https://unpkg.com/grapesjs-plugin-forms',
          },
          {
            id: 'grapesjs-blocks-flexbox',
            src: 'https://unpkg.com/grapesjs-blocks-flexbox',
          },
          {
            id: 'grapesjs-tabs',
            src: 'https://unpkg.com/grapesjs-tabs',
          },
          {
            id: 'grapesjs-custom-code',
            src: 'https://unpkg.com/grapesjs-custom-code',
          },
          {
            id: 'grapesjs-parser-postcss',
            src: 'https://unpkg.com/grapesjs-parser-postcss',
          },
          // @TODO figure out how to use this plugin as it seems to be a useful plugin, it allows to create symbols which are technically resuseable sections, check on plugins website to see demo 
          // {
          //   id: '@silexlabs/grapesjs-symbols',
          //   src: 'https://unpkg.com/@silexlabs/grapesjs-symbols',
          //   options: {
          //     appendTo: '.gjs-pn-views-container',
          //   }
          // },
          // @TODO Add google fonts api key in fonts plugin options to enable custom fonts
          // {
          //   id: '@silexlabs/grapesjs-fonts',
          //   src: 'https://unpkg.com/@silexlabs/grapesjs-fonts',
          //   options: {
          //     
          //   }
          // }
        ]}
      onEditor={onEditor}
      
    >

      <div className='flex'>
        <div className='flex-1 flex flex-col'>
          <div className='w-full flex justify-between py-1 px-4 border border-slate-200'> 
            <Topbar/>
          </div>
          <div className='flex-grow'>
            <Canvas/>
          </div>
        </div>
        <Sidebar/>
      </div>
      <ModalProvider>
          {({ open, title, content, close }) => (
            <CustomModal
              open={open}
              title={title}
              close={close}
              children={content}
            />
          )}
        </ModalProvider>
        {/* <AssetsProvider>
          {({ assets, select, close, Container }) => (
            <Container>
              <CustomAssetManager
                assets={assets}
                select={select}
                close={close}
              />
            </Container>
          )}
        </AssetsProvider> */}


    </GjsEditor>
  )
}

export default Editor