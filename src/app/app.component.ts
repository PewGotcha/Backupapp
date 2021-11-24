import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { xml2js } from 'xml-js';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { download } from 'ngx-operators';
import { InputOverviewExampleComponent } from './input-overview-example/input-overview-example.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BackupApp';

  constructor(private http: HttpClient) {

    //Starting Data, change posts and add the required.
    //this.loadPosts();
    //this.listBuckets();
    //this.getDBs();

  }




  //declare
  TwoFactor = false
  data: any[] = []
  databases: any[] = []
  streams: any[] = []
  events: any[] = []
  filename: string = ''
  docudata: any[] = []
  // file upload

  documentsubmit = {
    uploadAPI: {
      url:"https://ff1tyh85r9.execute-api.us-east-2.amazonaws.com/documents/video/example.pdf" 
    }
  }




  
  //methods

  login() {

    console.log(window.location.href)
    
    switch (this.TwoFactor) {
      case true:
        this.TwoFactor = false;
        break;
      case false:
        this.TwoFactor = true;
        break;
    }
  }

  updateFilename(one: string){

//this.filename = document.getElementById(one).value
this.filename = "https://ff1tyh85r9.execute-api.us-east-2.amazonaws.com/documents/video/" + one

console.log(this.filename)
  }



  getStreams() {

    this.http.post(' https://r2391z6zz2.execute-api.us-east-2.amazonaws.com/test/streams', '{"logGroupName": "DataSyncLogs"}').subscribe((data: any) => {

      console.log(JSON.stringify(data))
      this.streams = data.logStreams

    }, (error) => {
      alert('Error, see console')
      console.log(error)
    });

  }

  downloadFile(filename: string){

    

    this.http.get('https://b6vt0hygc8.execute-api.us-east-2.amazonaws.com/Test/collect/' + 'example.pdf').subscribe((data: any) => {

      console.log(JSON.stringify(data))
      //this.events = data.events

    }, (error) => {
      alert('Error, see console')
      console.log(error)
    });

  }

  downloadFile2(filename: string ): void{

    const baseUrl = 'https://b6vt0hygc8.execute-api.us-east-2.amazonaws.com/Test/collect/';
    filename = 'example.pdf'
    
    this.http.get(baseUrl + filename,{responseType: 'blob' as 'json'}).subscribe(
        (response: any) =>{
            let dataType = response.type;
            let binaryData = [];
            binaryData.push(response);
            let downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
            if (filename)
                downloadLink.setAttribute('download', filename);
            document.body.appendChild(downloadLink);
            downloadLink.click();
        }
    )
}

  listDocuments(){

    this.http.get('https://ff1tyh85r9.execute-api.us-east-2.amazonaws.com/documents/list', { responseType: "text" }).subscribe((data: any) => {



      var convert = require('xml-js')
      var json = convert.xml2js(data, { compact: true, spaces: 4 });
      console.log(json.ListBucketResult.Contents);
      this.docudata = json.ListBucketResult.Contents;


    }, (error) => {
      alert('Error, see console')
      console.log(error)});

  }

  getEventLog(streamname: String) {

    this.http.post('https://r2391z6zz2.execute-api.us-east-2.amazonaws.com/test/dslog', '{"logGroupName": "DataSyncLogs","logStreamName": "' + streamname + '"}').subscribe((data: any) => {

      console.log(JSON.stringify(data))
      this.events = data.events

    }, (error) => {
      alert('Error, see console')
      console.log(error)
    });



  }

  
  triggerDB() {

    this.http.post('https://rwytuw34vl.execute-api.us-east-2.amazonaws.com/Triggers/database', '{}').subscribe((data: any) => {

      console.log(JSON.stringify(data))
      
    });

  }

  
  triggerDS() {

    this.http.post('https://rwytuw34vl.execute-api.us-east-2.amazonaws.com/Triggers/DataSync_Lambda', '{}').subscribe((data: any) => {

      console.log(JSON.stringify(data))
      
    }, (error) => {
      alert('Error, see console')
      console.log(error)
    });



  }

  listBuckets() {

    this.http.get('https://b6vt0hygc8.execute-api.us-east-2.amazonaws.com/Test/list', { responseType: "text" }).subscribe((data: any) => {

      var convert = require('xml-js')
      var json = convert.xml2js(data, { compact: true, spaces: 4 });
      console.log(json.ListAllMyBucketsResult.Buckets.Bucket);
      this.data = json.ListAllMyBucketsResult.Buckets.Bucket;

    }, (error) => {
      alert('Error, see console')
      console.log(error)
    });

  }



  getDBs() {


    this.http.get('https://dxv7y6qjta.execute-api.us-east-2.amazonaws.com/db').subscribe((data: any) => {


      this.databases = data.DescribeDBInstancesResponse.DescribeDBInstancesResult.DBInstances;
      console.log(data);
    }, (error) => {
      alert('Error, see console')
      console.log(error)
    });


  }


}
