import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { IScenePayload, ISceneStatus, IStringPayload } from "../../models/IPayloads";
import { CreateScenePayload, SceneData, ScenesResponse, SceneStatus } from "../../models/Scenes";

type ScenesState = {
  isLoading: boolean;
  isLoadingMore: boolean;
  currentPage: number;
} & ScenesResponse;

const initialState = {
  isLoading: false,
  isLoadingMore: false,
  currentPage: 0,
  errors: [],
  success: false,
  result: {
    data: [],
    pages: 0,
    total: 0,
  },
} as ScenesState;

const scenesSlice = createSlice({
  name: "scenes",
  initialState,
  reducers: {
    getScenes(state) {
      if (state.result.data.length === 0 && state.currentPage === 0) {
        state.isLoading = true;
      } else if (state.currentPage < state.result.pages) {
        state.isLoadingMore = true;
      }
    },
    setScenes(state, action: PayloadAction<ScenesResponse>) {
      let newState = cloneDeep(state);
      newState = {
        ...newState,
        ...action.payload,
        isLoading: false,
        isLoadingMore: false,
        currentPage: state.currentPage + 1,
      };
      // Append previously loaded scenes with newly fetched ones.
      newState.result.data = [...state.result.data, ...newState.result.data];
      return newState;
    },
    setScenesError(state, action: PayloadAction<string>) {
      return {
        ...state,
        errors: [action.payload],
        isLoading: false,
        isLoadingMore: false,
      };
    },
    createScene(state, action: PayloadAction<CreateScenePayload>) {
      let newScene = {
        _id: action.payload.id,
        name: action.payload.title,
        title: action.payload.title,
        description: action.payload.description,
        price: action.payload.price,
        Status: SceneStatus.Creating,
      } as SceneData;
      state.result.data = [newScene, ...state.result.data];
    },
    setSceneError(state, action: PayloadAction<IStringPayload>) {
      let newState = cloneDeep(state);
      let scene = newState.result.data.find(item => item._id === action.payload.key);

      if (scene) {
        scene.Status = SceneStatus.Failed;
        scene.Error = action.payload.string;
      }

      return newState;
    },
    sceneReplace(state, action: PayloadAction<IScenePayload>) {
      let newState = cloneDeep(state);
      let scenes = newState.result.data.filter(item => item._id !== action.payload.key);

      if (scenes) {
        newState.result.data = [action.payload.scene, ...scenes];
      }

      return newState;
    },
    setSceneStatus(state, action: PayloadAction<ISceneStatus>) {
      let newState = cloneDeep(state);
      let scene = newState.result.data.find(item => item._id === action.payload.key);

      if (scene) {
        scene.Status = action.payload.status;
      }

      return newState;
    },
    deleteScene(state, action: PayloadAction<string>) {
      let newState = cloneDeep(state);
      let scene = newState.result.data.find(item => item._id === action.payload);

      if (scene) {
        scene.Status = SceneStatus.Deleting;
      }

      return newState;
    },
    deleteSceneSuccess(state, action: PayloadAction<string>) {
      let newState = cloneDeep(state);
      newState.result.data = newState.result.data.filter(item => item._id !== action.payload);
      return newState;
    }
  },
});

export const {
  getScenes,
  setScenes,
  setScenesError,
  createScene,
  setSceneError,
  sceneReplace,
  setSceneStatus,
  deleteScene,
  deleteSceneSuccess,
} = scenesSlice.actions;

export default scenesSlice.reducer;
