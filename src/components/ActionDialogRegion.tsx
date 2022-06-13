import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useStore } from "../store/store";

export type ActionDialogDisplayCondition = "win" | "loss" | undefined;

export function ActionDialogRegion() {
  const [actionDialog, closeActionDialog] = useStore((state) => [
    state.actionDialog,
    state.closeActionDialog,
  ]);

  return (
    <Transition.Root show={actionDialog.open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => closeActionDialog()}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  {actionDialog.displayCondition === "win" && (
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-3xl font-medium leading-6 text-gray-900"
                      >
                        😊 You Won!
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-gray-500">
                          You found the correct solution! Good Job!
                        </p>
                      </div>
                    </div>
                  )}

                  {actionDialog.displayCondition === "loss" && (
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-3xl font-medium leading-6 text-gray-900"
                      >
                        😔 You Lost
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-gray-500">
                          You were not able to find the correct solution,{" "}
                          <em>reset</em> the game to keep trying!
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-violet-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 sm:text-sm"
                    onClick={() => closeActionDialog()}
                  >
                    Ok
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
