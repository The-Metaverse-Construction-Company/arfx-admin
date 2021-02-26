import { SceneData } from "./Scenes";

export interface IBasePayload {}
export interface INumberPayload extends IBasePayload {
  key?: string;
  number: number;
}
export interface IStringPayload extends IBasePayload {
  key?: string;
  string: string;
}
export interface IBooleanPayload extends IBasePayload {
  key?: string;
  boolean: boolean;
}
export interface IFilePayload extends IBasePayload {
  key?: string;
  file: File;
}
export interface IFilesPayload extends IBasePayload {
  key?: string;
  files: File[];
}
export interface IScenePayload extends IBasePayload {
  key?: string;
  scene: SceneData;
}