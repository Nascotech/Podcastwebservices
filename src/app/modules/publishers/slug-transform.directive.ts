import { Directive, HostListener } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
  selector: "[formControlName][appSlugTransform]"
})
export class SlugTransformDirective {

  constructor(public ngControl: NgControl) {}
  key;

  @HostListener("ngModelChange", ["$event"]) onModelChange(event) {
    let newVal = this.transform(event);
    this.ngControl.valueAccessor.writeValue(newVal);
  }

  @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent) {
    this.key = event.keyCode;
    console.log(this.key);
    if ((this.key >= 15 && this.key <= 31) || (this.key >= 33 && this.key <= 64) || (this.key >= 123) || (this.key >= 96 && this.key <= 105)) {
      event.preventDefault();
    }
  }

  transform(value) {
    let text = value.toLowerCase();
    if (text.charAt(0) == " ") {
      text = text.trim();
    }
    if (text.charAt(text.length - 1) == "-") {
      //text = (text.replace(/-/g, ""));
    }
    text = text.replace(/ +/g, "-");
    text = text.replace(/--/g, "-");
    text = text.normalize("NFKD").replace(/[\u0300-\u036f]/g, ""); // Note: Normalize('NFKD') used to normalize special alphabets like óã to oa
    text = text.replace(/[^a-zA-Z0-9 -]/g, "");

    return text;
  }
}
