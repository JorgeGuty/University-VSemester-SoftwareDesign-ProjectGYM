import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import Instructor from "src/app/Models/Schedule/Instructor";
import { AdminScheduleService } from "src/app/Services/Dashboard/admin-schedule.service";
import { InstructorsService } from "src/app/Services/UserInfo/instructors.service";

@Component({
  selector: "app-admin-dialogue-change",
  templateUrl: "./admin-dialogue-change.component.html",
  styleUrls: ["./admin-dialogue-change.component.scss"],
})
export class AdminDialogueChangeComponent implements OnInit {
  @Output()
  instructorChanged = new EventEmitter<string>();

  session!: any;
  sessionServiceName!: any;
  instructor!: any;
  instructorArray: any = [];
  instructor_changed: any;
  instructor_number: any;

  instructorForm = new FormGroup({
    instructorNumber: new FormControl("", Validators.required),
  });

  constructor(
    private instructorService: InstructorsService,
    private adminService: AdminScheduleService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.sessionServiceName = this.data.sessionServiceName;
    this.instructor = this.data.instructor;
    this.session = this.data.session;
    this.loadInstrucors();
    console.log("Nuestro isntructor");
    console.log(this.instructor);
    console.log(this.instructor_number);
    console.log("Nuestro isntructor");
  }

  ngOnInit(): void {}

  loadInstrucors() {
    this.instructorService
      .getInstructorsFromService(this.sessionServiceName)
      .subscribe((instructorList: [Instructor]) => {
        this.instructorArray = [];
        instructorList.forEach((instructor: any, key: any) => {
          this.instructorArray.push(instructor);
        });
        console.log("hola");
        this.instructor_number = this.getInstructorNumber(this.instructor.name);
      });
  }

  onSave() {
    this.adminService
      .changeCurrentSessionInstructor(
        this.session,
        this.instructorForm.value.instructorNumber
      )
      .subscribe(
        (res) => {
          this.instructor_changed = this.getInstructor(
            this.instructorForm.value.instructorNumber
          );
          console.log(res);
        },
        (err) => {
          console.log("HOLA HOLA");
          console.log(err);
        }
      );
  }

  getInstructor(instructorNumber: any) {
    console.log("entre");
    let result: any;
    this.instructorArray.map((instructor: any) => {
      console.log(instructor);
      console.log(instructorNumber);
      if (instructor.id == instructorNumber) {
        console.log("Entreee");
        result = instructor;
      }
    });
    return result;
  }

  getInstructorNumber(instructorName: any) {
    console.log("entre");
    console.log(instructorName);
    let result: any;
    this.instructorArray.map((instructor: any) => {
      console.log("holist");
      console.log(instructor.name);
      if (instructor.name == instructorName) {
        console.log("Entreee");
        console.log(instructor.id);
        result = instructor.id;
      }
    });
    return result;
  }
}
