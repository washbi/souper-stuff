import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';
import {StuffImg} from '../../../services/images/stuff-img';
import {GROUPID_SESSIONKEY} from '../../../services/auth/souper-auth.service';

@Component({
  selector: 'app-images-field',
  templateUrl: './images-field.component.html',
  styleUrls: ['./images-field.component.css']
})
export class ImagesFieldComponent implements OnInit {

  @Input() existingFiles: StuffImg[];
  @Output() fileUploaded = new EventEmitter();

  readonly addPhotoIconUrl = 'assets/baseline_add_a_photo_black_48dp.png';

  /**
   * access to Observable data, allows us to pause, cancel or resume an upload
   */
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;

  constructor(private firestorage: AngularFireStorage) { }

  ngOnInit() {
    console.log(this.existingFiles);
    if (this.existingFiles !== undefined && this.existingFiles.length > 0) {
      // single upload to KISS
      this.downloadURL = this.fetchDownloadURL(this.existingFiles[0].path);
    }
  }

  onUploadFile(event: FileList) {
    // single upload to KISS
    const file = event.item(0);

    // only images
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type');
      return;
    }

    const groupId = localStorage.getItem(GROUPID_SESSIONKEY);
    const storagePath = `${groupId}/${new Date().getTime()}_${file.name}`;

    this.task        = this.firestorage.upload(storagePath, file);
    this.percentage  = this.task.percentageChanges();
    this.snapshot    = this.task.snapshotChanges().pipe(
      tap(snapshot => {
        if (snapshot.bytesTransferred === snapshot.totalBytes) {
          const result: StuffImg = {
            path: storagePath,
            fileSize: snapshot.totalBytes
          };
          this.fileUploaded.emit(result); // will be emittet two times!
          // this.db.doc('stuffIdundso').collection('/photos').add(  ) ;
        }
      })
    );
    this.snapshot.pipe(finalize(() => this.downloadURL = this.fetchDownloadURL(storagePath))).subscribe();
  }

  isUploadActive(snapshot) {
    return snapshot.bytesTransferred < snapshot.totalBytes;
  }

  fetchDownloadURL(path: string): Observable<string> {
    return this.firestorage.ref(path).getDownloadURL();
  }

}