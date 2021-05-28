import { Component, Inject, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import Instructor from "src/app/Models/Schedule/Instructor";
import { InstructorsService } from "src/app/Services/UserInfo/instructors.service";

@Component({
  selector: "app-admin-dialogue-change",
  templateUrl: "./admin-dialogue-change.component.html",
  styleUrls: ["./admin-dialogue-change.component.scss"],
})
export class AdminDialogueChangeComponent implements OnInit {
  sessionServiceName!: any;
  instructor!: any;
  instructorArray: any = [];
  instructor_changed = "";

  instructorForm = new FormGroup({
    instructorNumber: new FormControl("", Validators.required),
  });

  constructor(
    private instructorService: InstructorsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    console.log("Nombre SESSION");
    console.log(this.data.sessionServiceName);
    this.sessionServiceName = this.data.sessionServiceName;
    this.instructor = this.data.instructor;
    this.loadInstrucors();
  }

  loadInstrucors() {
    console.log("HOLAAA");
    this.instructorService
      .getInstructorsFromService(this.sessionServiceName)
      .subscribe((instructorList: [Instructor]) => {
        this.instructorArray = [];
        instructorList.forEach((instructor: any, key: any) => {
          this.instructorArray.push(instructor);
        });
        console.log("cargueeee");
        console.log(this.sessionServiceName);
        console.log(this.instructorArray);
      });
    console.log("HOLAAA");
  }

  onSave() {
    console.log("Saved Change Instructor by");
    console.log(this.instructorForm.value.instructorNumber);
  }
}
