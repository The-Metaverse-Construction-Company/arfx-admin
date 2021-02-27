/* eslint-disable import/no-anonymous-default-export */
import { Action } from "@reduxjs/toolkit";
import { takeLeading, put, call, select, takeEvery } from "redux-saga/effects";
import { DeleteScene, GetScenes, PostScene } from "../../api/ScenesApi";
import { CreateErrorNotification, CreateSuccessNotification } from "../../models/Notification";
import { SceneData, SceneStatus } from "../../models/Scenes";
import { RootState } from "../RootReducer";
import {
  createScene,
  setSceneError,
  getScenes,
  setScenes,
  setScenesError,
  sceneInserted,
  setSceneStatus,
  deleteScene,
  deleteSceneSuccess,
} from "../slice/ScenesSlice";
import { addNotification } from "../slice/SettingsSlice";

function* FetchScenesDataAsync(action: Action) {
  if (getScenes.match(action)) {
    try {
      const { errors, result, currentPage } = yield select(
        (state: RootState) => state.scenes
      );

      // If page count is not 0 and current page is same as total page. Then maximum page limit is reached.
      if (currentPage !== 0 && currentPage >= result.pages) {
        return;
      }

      let page = currentPage;

      // If there was no error then fetch next page results.
      if (errors.length === 0) {
        page++;
      }

      const scenes = yield call(GetScenes, page);
      yield put(setScenes(scenes));
    } catch (err) {
      const error = new Error(err);
      yield put(setScenesError(error.message));
    }
  }
}

function* CreateSceneAsync(action: Action) {
  if (createScene.match(action)) {
    let insertedScene: SceneData | undefined;
    try {
      // Make API call to insert scene metadata.
      const sceneResponse = yield call(PostScene, action.payload);
      insertedScene = sceneResponse.result;

      // Update store with inserted item, thereby replacing temp item with dummy id.
      yield put(
        sceneInserted({ key: action.payload.id, scene: insertedScene! })
      );

      
      // Show notification
      yield put(
        addNotification(
          CreateSuccessNotification(
            `${insertedScene!.title} created successfully`
          )
        )
      );

      // Update store item state to none to mark scene as created.
      yield put(
        setSceneStatus({ key: insertedScene!._id, status: SceneStatus.None })
      );
    } catch (err) {
      const error = new Error(err);

      // Show notification
      yield put(
        addNotification(
          CreateErrorNotification(
            `Failed to create scene. ${error.message}`
          )
        )
      );

      yield put(
        setSceneError({
          key: insertedScene ? insertedScene._id : action.payload.id,
          string: error.message,
        })
      );
    }
  }
}

function* DeleteSceneAsync(action: Action) {
  if (deleteScene.match(action)) {
    try {
      const deletedScene = yield call(DeleteScene, action.payload);

      // Show notification
      yield put(
        addNotification(
          CreateSuccessNotification(
            `${deletedScene.result.title} deleted successfully`
          )
        )
      );

      // Remove it from state
      yield put(deleteSceneSuccess(action.payload));
    } catch (err) {
      const error = new Error(err);

      // Show notification
      yield put(
        addNotification(
          CreateErrorNotification(
            `Failed to delete scene. ${error.message}`
          )
        )
      );
      
      yield put(
        setSceneError({
          key: action.payload,
          string: error.message,
        })
      );
    }
  }
}

export default function* () {
  yield takeLeading(getScenes.type, FetchScenesDataAsync);
  yield takeEvery(createScene.type, CreateSceneAsync);
  yield takeEvery(deleteScene.type, DeleteSceneAsync);
}
