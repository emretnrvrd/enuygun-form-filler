export interface IInput {
  selector: string;
  value?: string;
  is_checked?: boolean;


};

export class Input implements IInput{
  selector: string;
  value?: string;
  is_checked?: boolean;

  constructor(data: IInput) {
    this.fromDb(data);
  }

  fromDb(data: IInput){
    this.selector = data.selector;
    this.value = data.value;
    this.is_checked = data.is_checked;
  }

  test() {
    console.log(this.selector, this.value, this.is_checked);
  }
}
