/* eslint-disable import/no-anonymous-default-export */
import { Action } from "@reduxjs/toolkit";
import { takeLeading, put, call, select, takeEvery } from "redux-saga/effects";
import {
  DeleteScene,
  GetScenes,
  PostScene,
  PostSceneFile,
} from "../../api/ScenesApi";
import {
  CreateErrorNotification,
  CreateSuccessNotification,
} from "../../models/Notification";
import { SceneData, SceneFileType, SceneStatus } from "../../models/Scenes";
import { RootState } from "../RootReducer";
import {
  createScene,
  setSceneError,
  getScenes,
  setScenes,
  setScenesError,
  sceneReplace,
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
      // =========================================
      // 1. Make API call to insert scene metadata
      // =========================================
      const sceneResponse = yield call(PostScene, action.payload);
      insertedScene = sceneResponse.result;

      // Replace store with inserted item, thereby replacing temp item having dummy id.
      insertedScene!.Status = SceneStatus.Creating;
      yield put(
        sceneReplace({ key: action.payload.id, scene: insertedScene! })
      );

      // ============================
      // 2. Upload image if it exists
      // ============================
      if (action.payload.sceneImage) {
        // Update store item state to uploading image.
        yield put(
          setSceneStatus({
            key: insertedScene!._id,
            status: SceneStatus.UploadingImage,
          })
        );

        // Make API call to upload scene image.
        const sceneResponse = yield call(
          PostSceneFile,
          insertedScene!._id,
          SceneFileType.Image,
          action.payload.sceneImage
        );
        insertedScene = sceneResponse.result;

        // Replace store with inserted item.
        insertedScene!.Status = SceneStatus.UploadingImage;
        yield put(
          sceneReplace({ key: insertedScene!._id, scene: insertedScene! })
        );
      }

      // ============================
      // 3. Upload video if it exists
      // ============================
      if (action.payload.sceneVideo) {
        // Update store item state to uploading video.
        yield put(
          setSceneStatus({
            key: insertedScene!._id,
            status: SceneStatus.UploadingVideo,
          })
        );

        // Make API call to upload scene video.
        const sceneResponse = yield call(
          PostSceneFile,
          insertedScene!._id,
          SceneFileType.Video,
          action.payload.sceneVideo
        );
        insertedScene = sceneResponse.result;

        // Replace store with inserted item.
        insertedScene!.Status = SceneStatus.UploadingVideo;
        yield put(
          sceneReplace({ key: insertedScene!._id, scene: insertedScene! })
        );
      }

      // ==========================
      // 4. Upload zip if it exists
      // ==========================
      if (action.payload.sceneFile) {
        // Update store item state to uploading zip.
        yield put(
          setSceneStatus({
            key: insertedScene!._id,
            status: SceneStatus.UploadingZip,
          })
        );

        // Make API call to upload scene zip.
        const sceneResponse = yield call(
          PostSceneFile,
          insertedScene!._id,
          SceneFileType.Zip,
          action.payload.sceneFile
        );
        insertedScene = sceneResponse.result;

        // Replace store with inserted item.
        insertedScene!.Status = SceneStatus.UploadingZip;
        yield put(
          sceneReplace({ key: insertedScene!._id, scene: insertedScene! })
        );
      }

      // Update store item state to none to mark scene as created.
      yield put(
        setSceneStatus({ key: insertedScene!._id, status: SceneStatus.None })
      );
      
      // Show notification
      yield put(
        addNotification(
          CreateSuccessNotification(
            `${insertedScene!.title} created successfully`
          )
        )
      );
    } catch (err) {
      const error = new Error(err);
      yield put(
        setSceneError({
          key: insertedScene ? insertedScene._id : action.payload.id,
          string: error.message,
        })
      );

      // Show notification
      yield put(
        addNotification(
          CreateErrorNotification(`Failed to create scene. ${error.message}`)
        )
      );
    }
  }
}

function* DeleteSceneAsync(action: Action) {
  if (deleteScene.match(action)) {
    try {
      const deletedScene = yield call(DeleteScene, action.payload);

      // Remove it from state
      yield put(deleteSceneSuccess(action.payload));

      // Show notification
      yield put(
        addNotification(
          CreateSuccessNotification(
            `${deletedScene.result.title} deleted successfully`
          )
        )
      );
    } catch (err) {
      const error = new Error(err);
      yield put(
        setSceneError({
          key: action.payload,
          string: error.message,
        })
      );

      // Show notification
      yield put(
        addNotification(
          CreateErrorNotification(`Failed to delete scene. ${error.message}`)
        )
      );
    }
  }
}

export default function* () {
  yield takeLeading(getScenes.type, FetchScenesDataAsync);
  yield takeEvery(createScene.type, CreateSceneAsync);
  yield takeEvery(deleteScene.type, DeleteSceneAsync);
}
