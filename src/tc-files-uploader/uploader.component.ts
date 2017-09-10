import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'tc-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit {
  @Output() fileResultCallback: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild("uploader") uploader: ElementRef;
  @ViewChild("linkToFile") linkToFile: ElementRef;
  private result: File;

  constructor() { }

  ngOnInit() {
  }

  browseFile(): void {
    this.uploader.nativeElement.click();
  }

  onChange($event): void {
    let fileList: FileList = $event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let fileUrl: string = "";
      fileUrl = URL.createObjectURL(file);
      this.result = file;
      this.linkToFile.nativeElement.text = file.name;
      this.linkToFile.nativeElement.href = fileUrl;
      let reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }
  }

  _handleReaderLoaded(e) {
    var reader = e.target;
    this.fileResultCallback.emit(this.result);
  }
}
