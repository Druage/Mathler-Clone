import create from "zustand";
import { ActionDialogDisplayCondition } from "../components/ActionDialogRegion";

interface AppState {
  actionDialog: {
    open: boolean;
    displayCondition: ActionDialogDisplayCondition;
  };
  alert: {
    open: boolean;
    errorMessage: string | undefined;
  };
}

interface AppActions {
  openActionDialog: (displayCondition: ActionDialogDisplayCondition) => void;
  closeActionDialog: () => void;
  openAlert: (errorMessage: string | undefined) => void;
  closeAlert: () => void;
}

export const useStore = create<AppState & AppActions>((set) => ({
  actionDialog: { open: false, displayCondition: undefined },
  openActionDialog: (displayCondition) =>
    set(() => ({ actionDialog: { open: true, displayCondition } })),

  closeActionDialog: () =>
    set(() => ({
      actionDialog: { open: false, displayCondition: undefined },
    })),

  alert: {
    open: false,
    errorMessage: undefined,
  },
  openAlert: (errorMessage) =>
    set(() => ({ alert: { open: true, errorMessage } })),

  closeAlert: () =>
    set(() => ({
      alert: {
        open: false,
        errorMessage: undefined,
      },
    })),
}));
