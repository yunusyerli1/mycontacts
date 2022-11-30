
export class DialogWindowModel{
  public title: string
  public message: string;
  public buttons: DialogButtonModel[];
}

export class DialogButtonModel {
  public id:string; //DialogButtonType
  public text: string;
  public data:any;
  public color:DialogButtonColor;
  public clickHandler: (buttonModel:DialogButtonModel) => void;
}

  export enum DialogButtonColor{
  RED = "red",
  NORMAL ="normal",
  }

  export enum DialogButtonType{
  OK = "ok",
  CANCEL = "cancel"
  }
