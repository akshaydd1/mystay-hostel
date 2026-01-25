import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

interface ModalPanelProps {
  title?: string;
  description?: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  position?:
    | "center"
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
  containerClassName?: string;
  children: React.ReactNode;
}

const ModalPanel = ({
  title,
  description,
  isOpen,
  setIsOpen,
  position = "bottom-right",
  containerClassName = "",
  children,
}: ModalPanelProps) => {
  const wrapperPositionClasses = (() => {
    switch (position) {
      case "top":
        return "items-start justify-center";
      case "bottom":
        return "items-end justify-center";
      case "left":
        return "items-center justify-start";
      case "right":
        return "items-center justify-end";
      case "top-left":
        return "items-start justify-start";
      case "top-right":
        return "items-start justify-end";
      case "bottom-left":
        return "items-end justify-start";
      case "bottom-right":
        return "items-end justify-end";
      case "center":
      default:
        return "items-center justify-center";
    }
  })();
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/60 backdrop-blur-xs duration-300 ease-out data-closed:opacity-0"
      />
      <div
        className={`fixed inset-0 flex w-screen ${wrapperPositionClasses} p-2`}
      >
        <DialogPanel
          transition
          className={`max-w-lg space-y-4 bg-white rounded-sm duration-300 ease-out data-closed:scale-95 data-closed:opacity-0  ${containerClassName}`}
        >
          {title && (
            <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
          )}
          {description && <Description>{description}</Description>}
          {children}
          {/* <p>
            Are you sure you want to deactivate your account? All of your data
            will be permanently removed.
          </p>
          <div className="flex gap-4">
            <button onClick={() => setIsOpen(false)}>Cancel</button>
            <button onClick={() => setIsOpen(false)}>Deactivate</button>
          </div> */}
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ModalPanel;
