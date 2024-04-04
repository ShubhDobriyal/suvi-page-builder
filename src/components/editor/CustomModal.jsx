import * as Dialog from '@radix-ui/react-dialog';
import { BsXLg } from "react-icons/bs";


export default function CustomModal({
  children,
  title,
  close,
  description,
  open,
  ...props
}) {
  return (
    <>

    <Dialog.Root open={open} onOpenChange={close}>
    <Dialog.Portal>
      <Dialog.Overlay className=" bg-black/90 fixed w-full h-full left-0 top-0 z-40 " />
      <Dialog.Content className="bg-white rounded-md shadow-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[54em] max-h-[85vh] p-5 z-50">
      <div className="flex justify-between ">
        <Dialog.Title className="DialogTitle">{title}</Dialog.Title>
        <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <BsXLg />
            </button>
          </Dialog.Close>
      </div>
      <Dialog.Description className="DialogDescription">
          {description}
        </Dialog.Description>
        {children}
        
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>

    </>
  );
}

