import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViolationReviewService } from 'app/services/violation-review.service';
import { version } from 'punycode';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-violation-review',
  templateUrl: './violation-review.component.html',
  styleUrls: ['./violation-review.component.css']
})
export class ViolationReviewComponent implements OnInit {
  @ViewChild('vehicleNumberInput') vehicleNumberInputField: ElementRef;
  videoForm: FormGroup;
  statusSelected: number;
  rejectReasons = [];
  violationsData ;
  reasonSelected: number;
  violationReviewPutObject;
  disabled: boolean = true;
  acceptedStatus;
  acceptMessage: string;
  message: string;
  showReason: boolean = false;
  indexing = 0;
  vehiclesData = [];
  viewDetails;
  videoId;
  vehicleId;
  reportedVideoCounts;
  violationStatusForm = new Map<string, any>();
  toShowRejection : boolean = false;

  constructor(private apiService: ViolationReviewService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _activatedRoute: ActivatedRoute,
    private router: Router) {
  }


  ngOnInit(): void {
    let videoId = this._activatedRoute.snapshot.params['code'];
    this.apiService.violationsById(videoId).subscribe((resp) => {
      this.viewDetails = resp['data']
      this.setViolationReviewPutObject(this.viewDetails);
      this.setViolationStatusForm(this.viewDetails);
    })
    this.videoForm = this.fb.group({
      status_id: [null, Validators.required],
      reject_reason: [null, Validators.required]
    });
    this.fetchRejectReasons();
    this.fetchViolations(videoId);
  }

  showCount(videoId, vehicleId) {
    this.toShowRejection = true;
    this.apiService.reportVideo(videoId, vehicleId).subscribe(resp => {console.log(resp, "reported Video count");
      this.reportedVideoCounts = resp['data'];
    }) 
  }

  updateStatus() {
    this.showReason = !this.showReason;
  }

  submitAction(id) {
    this.submitViolationReview(id);
  }
  onStatusChange(e, violation_id) {
    this.violationReviewPutObject.status_id = e;
    if (e == 2) {
      this.violationStatusForm.get(violation_id).showError = false;
      this.violationStatusForm.get(violation_id).status_id = e;
      this.violationStatusForm.get(violation_id).videoForm.status_id = e;
    } else if (e == 3) {
      this.violationStatusForm.get(violation_id).showRejectReasons = true;
      this.violationStatusForm.get(violation_id).showError = false;
      this.violationStatusForm.get(violation_id).videoForm.status_id = e;
      this.violationStatusForm.get(violation_id).status_id = e;
    }
  }

  onReasonChange(e) {
    this.violationReviewPutObject.reject_reason = e;
  }
  back() {
    this.router.navigate(['/dashboard']);
  }

  next() {
  //   this.vehiclesData = [];
  //   this.violationStatusForm = new Map<string, any>();
  //   this.videoForm = this.fb.group({
  //     status_id: [null, Validators.required],
  //     reject_reason: [null, Validators.required]
  //   });
  //   this.indexing = this.indexing + 1; // increase i by one
  //   this.indexing = this.indexing % this.violationsData.length; // if we've gone too high, start from `0` again
  //   this.viewDetails = this.violationsData.violations[this.indexing];
  //   console.log(this.viewDetails,"Details view ")
  //   console.log(this.violationsData,"violation data on next ")
  //   this.setVehiclesData(this.violationsData);
  //   this.setViolationStatusForm(this.violationsData);
  //   return this.viewDetails;
  }

  previous() {
  //   this.vehiclesData = [];
  //   this.violationStatusForm = new Map<string, any>();

  //   this.videoForm = this.fb.group({
  //     status_id: [null, Validators.required],
  //     reject_reason: [null, Validators.required]
  //   });
  //   if (this.indexing === 0) { // i would become 0
  //     this.indexing = this.violationsData.length; // so put it at the other end of the array
  //   }
  //   this.indexing = this.indexing - 1; // decrease by one
  //   this.viewDetails = this.violationsData[this.indexing];
  //   this.setVehiclesData(this.violationsData);
  //   this.setViolationStatusForm(this.violationsData);

  //   return this.viewDetails;
  }

  onMouseOver(infoWindow, gm) {
    if (gm.lastOpen && gm.lastOpen.isOpen) {
      gm.lastOpen.close();
    }
    gm.lastOpen = infoWindow;

    infoWindow.open();
  }
  onMouseOut(infoWindow) {
    infoWindow.close();
  }
  onVehicleEditClick(e, i) {
    e.stopPropagation();
    this.vehiclesData[i].showSave = true;
    this.vehiclesData[i].showEdit = false;
    this.vehiclesData[i].showTitle = false;
    this.showInputElement();
  }
  onVehicleSaveClick(e, old_vehicle_no, i) {
    e.stopPropagation();
    this.vehiclesData[i].showEdit = true;
    this.vehiclesData[i].showSave = false;
    this.vehiclesData[i].showTitle = true;
    var updateVehicleRq = this.getUpdateVehicleRq(old_vehicle_no, i);
    this.updateVehicle(updateVehicleRq, i);
  }
  //#region Private Methods

  private setViolationReviewPutObject(viewData) {
    this.violationReviewPutObject = {
      violation_id: viewData.violations.violation_id,
      status_id: this.statusSelected,
      reject_reason: this.reasonSelected
    }
  }
  private submitViolationReview(id) {
    var violation = this.violationStatusForm.get(id);
    this.violationReviewPutObject.violation_id = id;
    this.violationReviewPutObject.status_id = violation.status_id;
    (violation.status_id == null) ? this.violationStatusForm.get(id).showError = true : this.violationStatusForm.get(id).showError = false;
    this.violationStatusForm.get(id).showRejectReasons = false;
    this.violationStatusForm.get(id).videoForm.status_id = null;

    this.putViolationReview();
  }
  private putViolationReview() {
    this.apiService.violationReview(this.violationReviewPutObject).subscribe(resp => {
      if (resp['status'] == 1) {
        this.openSnackBar();
      }
    }, err => {
      console.log(err);
      this.errorHandler(err)
    });
  }

  private fetchViolations(videoId) {
    this.apiService.violationsById(videoId).subscribe(resp => {
      this.violationsData = resp['data'];
      this.viewDetails = this.violationsData[this.indexing];
      this.setVehiclesData(this.violationsData);
    });
  }

  private fetchRejectReasons() {
    this.apiService.rejectReason().subscribe(resp => {
      if (resp['status'] == 1) {
        this.rejectReasons = resp['data'];
      }
    }, err => {
      this.errorHandler(err);
    });
  }
  private showInputElement() {
    setTimeout(() => {
      this.vehicleNumberInputField.nativeElement.focus();
    }, 0);
  }
  private getUpdateVehicleRq(old_vehicle_no, i) {
    var new_vehicle_no = this.vehicleNumberInputField.nativeElement.value;
    this.vehiclesData[i].vehicle_number = new_vehicle_no;
    return {
      old_vehicle_number: old_vehicle_no,
      new_vehicle_number: new_vehicle_no
    };
  }

  private updateVehicle(updateVehicleRq, i) {
    this.vehiclesData[i].vehicle_number = updateVehicleRq.new_vehicle_number;
    this.vehiclesData[i].vehicle_violations.forEach(violation => {
      violation.vehicle_number = updateVehicleRq.new_vehicle_number;
    });

    this.putUpdateVehicle(updateVehicleRq);
  }

  private putUpdateVehicle(updateVehicleRq: any) {
    this.apiService.updateVehicleNumber(updateVehicleRq).subscribe(resp => {
      if (resp['status'] == 1) {
        this.openSnackBar();
      }
    }, err => {
      console.log(err);
      this.errorHandler(err);
    });
  }

  private errorHandler(err: any) {
    console.log(err);
    if (err['error']['status'] == 0) {
      this.message = err['error']['message'];
      this.openMessageSnackBar(this.message);
    }
  }
  private setVehiclesData(viewData) {
    viewData.violations.forEach(violation => {
      var vehicle = this.vehiclesData.find(x => x.vehicle_number == violation.vehicle_number)
      if (typeof vehicle == 'undefined') {
        var obj = { vehicle_id: violation.vehicle_id, vehicle_number: violation.vehicle_number, showSave: false, showEdit: true, showTitle: true, vehicle_violations: [] };
        obj.vehicle_violations.push(violation);
        this.vehiclesData.push(obj);
      }
      else {
        vehicle.vehicle_violations.push(violation);
      }
    });

    this.vehiclesData.forEach(vehicle => {
      vehicle.pendingViolations = this.getPendingViol(vehicle.vehicle_violations);
      vehicle.approvedViolations = this.getApprovedViol(vehicle.vehicle_violations);
      vehicle.rejectedViolations = this.getRejectedViol(vehicle.vehicle_violations);

    })
  }
  private getPendingViol(violations) {
    var pendingViolations = [];
    violations.forEach(violation => {
      if (violation.status == 1) {
        pendingViolations.push(violation);
      }
    });
    return pendingViolations;
  }
  private getApprovedViol(violations) {
    var approvedViolations = [];
    violations.forEach(violation => {
      if (violation.status == 2) {
        approvedViolations.push(violation);
      }
    });
    return approvedViolations;
  }
  private getRejectedViol(violations,) {
    var rejectedViolations = [];
    violations.forEach(violation => {
      if (violation.status == 3) {
        rejectedViolations.push(violation);
      }
    });
    return rejectedViolations;
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
  private setViolationStatusForm(viewData) {
    this.violationStatusForm = new Map<string, any>();
    viewData.violations.forEach(violation => {
      if (violation.status == 1) {
        this.violationStatusForm.set(
          violation.violation_id,
          { showRejectReasons: false, showError: false, videoForm: this.videoForm })
      }
    });
  }
  //#endregion
}
