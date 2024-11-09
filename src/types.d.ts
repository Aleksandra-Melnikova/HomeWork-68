export interface ITask {
  id: string;
  title: string;
  status: boolean;
}

export interface IDataFromAPI {
  [id: string]: ITask;
}
