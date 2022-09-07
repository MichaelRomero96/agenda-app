namespace Types {
  export interface Todo {
    id: string;
    description: string;
    status: Status;
    done: boolean;
  }

  export enum Status {
    unfinished = "Unfinished",
    done = "Done",
  }
}

export default Types;
