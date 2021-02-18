import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PollsService } from 'app/services/polls.service';

@Component({
  selector: 'app-add-poll',
  templateUrl: './add-poll.component.html',
  styleUrls: ['./add-poll.component.css']
})
export class AddPollComponent implements OnInit {
  @ViewChild('optionField')optionField:ElementRef; 
  @ViewChild('formDirective') private formDirective:NgForm; 
  submitClick = false;
  optionsLengthValidation= false;
  visible = true;
  selectable = true;
  removable = true;
  pollForm: FormGroup;
  expiry;
  poll = {
    question: null,
    expiry :null,
    options:null
  }
  message: string;
  constructor(
    private apiService: PollsService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router:Router ) { }

  ngOnInit(): void {
    this.pollForm = this.fb.group({
      question : [null,Validators.required],
      expiry :[null],
      options :[null, Validators.required]
    }); 
    this.poll.options=[];
  }
  addOption()
  {
    const option = this.optionField.nativeElement.value;
    if(option != '')
    {
    this.poll.options.push(option);
    }
    if(this.poll.options.length <=4)
    {
      this.optionsLengthValidation = false;
     }
    else
    {
      this.optionsLengthValidation = true;
    }
    this.optionField.nativeElement.value =null;
  }
  remove(option): void {
    const index = this.poll.options.indexOf(option);
    if (index >= 0) {
     this.poll.options.splice(index, 1);
    }
    if(this.poll.options.length <= 4)
    {    
       this.optionsLengthValidation = false;
    }
  }
  submitPoll(pollData) {
    this.submitClick= true; 
    this.setAddPollRequest(pollData);
    this.addPoll(pollData);
  }
  disableSubmitButton()
  {
    if(this.poll.options.length<2 ==true)
    return true;
    if(this.poll.options.length>4 ==true)
    return true;

    return false;
   }
   pollList()
   {
    this.router.navigate(['/polls']);

   }
//#region Private Methods
private setAddPollRequest(pollData: any) {
  if(pollData.expiry !=null){
  pollData.expiry = pollData.expiry+".013Z";
  }
  pollData.options = this.poll.options;
  if (pollData.question == '')
    pollData.question = null;
  if (this.poll.options.length == 0) {
    pollData.options = null;
  }
}

  private addPoll(pollData: any) {
    console.log(pollData);
    this.apiService.addPoll(pollData).subscribe(resp => {
      console.log(resp);
      this.openSnackBar();
      this.submitClick = false;
      this.formDirective.resetForm();
      this.poll.options = [];

    }, err => {
      console.log(err);
      if (err['error']['status'] == 0) {
        this.message = err['error']['message'];
        this.openMessageSnackBar(this.message);

      }
    });
  }
  private openSnackBar() {
    this._snackBar.open('Thanks for submitting your response', '', {
      duration: 2000,
    });
  }

  private openMessageSnackBar(msg) {
    this._snackBar.open(msg, '', {
      duration: 2000,
    });
  }

  
  //#endregion

}
