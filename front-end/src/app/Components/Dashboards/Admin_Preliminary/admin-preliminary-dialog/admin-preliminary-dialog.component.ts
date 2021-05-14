import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import PreliminarySession from "src/app/Models/Prelimimary/PreliminarySession";
import Instructor from "src/app/Models/Schedule/Instructor";
import Service from "src/app/Models/Schedule/Service";
import { AdminScheduleService } from "src/app/Services/Dashboard/admin-schedule.service";
import { ServicesService } from "src/app/Services/ServicesInfo/services.service";
import { InstructorsService } from "src/app/Services/UserInfo/instructors.service";
import { DaysEnum } from "../../../../Models/Calendar/DaysEnum";

@Component({
  selector: "app-admin-preliminary-dialog",
  templateUrl: "./admin-preliminary-dialog.component.html",
  styleUrls: ["./admin-preliminary-dialog.component.scss"],
})
export class AdminPreliminaryDialogComponent implements OnInit {
  instructorArray: any = [];
  serviceArray: any = [];

  DaysEnum = DaysEnum;
  daysNumber = [0, 1, 2, 3, 4, 5, 6];

  constructor(
    private adminScheduleService: AdminScheduleService,
    private instructorService: InstructorsService,
    private servicesService: ServicesService
  ) {}

  ngOnInit(): void {
    this.loadServicesTypes();
    //this.loadInstructors();
  }

  preliminaryForm = new FormGroup({
    className: new FormControl("", Validators.required),
    day: new FormControl("", Validators.required),
    hour: new FormControl(0, Validators.pattern("([01]?[0-9]|2[0-3])")),
    min: new FormControl(0, Validators.pattern("[0-5][0-9]")),
    year: new FormControl(2000, Validators.pattern("^[12][0-9]{3}")),
    month: new FormControl(1, Validators.pattern("^(0?[1-9]|1[012])")),
    duration: new FormControl(0, Validators.pattern("^[0-9]*")),
    instructorIdNum: new FormControl("", Validators.required),
    sessionServiceName: new FormControl("", Validators.required),
    roomId: new FormControl(0, Validators.required),
  });

  initPreliminarySession(formJSON: any): PreliminarySession {
    let time: string = formJSON.value.hour + ":" + formJSON.value.min;
    let scheduledSession: PreliminarySession = {
      name: formJSON.value.className,
      weekDay: formJSON.value.day.toString(),
      startTime: time,
      year: formJSON.value.year.toString(),
      month: formJSON.value.month.toString(),
      durationMins: formJSON.value.duration,
      instructorIdentification: formJSON.value.instructorIdNum.toString(),
      service: formJSON.value.sessionServiceName,
      roomId: formJSON.value.roomId.toString(),
    };

    return scheduledSession;
  }

  onSave() {
    console.log("On Save");
    let preliminarySession: PreliminarySession = this.initPreliminarySession(
      this.preliminaryForm
    );
    console.log(preliminarySession);
    this.adminScheduleService
      .insertPreliminarySessionSchedule(preliminarySession)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  loadInstructors() {
    this.instructorService
      .getRegisteredInstructors()
      .subscribe((instructorList: [Instructor]) => {
        instructorList.forEach((instructor: any, key: any) => {
          this.instructorArray.push(instructor);
        });
        console.log(instructorList);
        console.log(this.instructorArray);
      });
  }

  loadInstructorsByService(serviceName: string) {
    this.instructorService
      .getInstructorsFromService(serviceName)
      .subscribe((instructorList: [Instructor]) => {
        this.instructorArray = [];
        instructorList.forEach((instructor: any, key: any) => {
          this.instructorArray.push(instructor);
        });
        console.log(instructorList);
        console.log(this.instructorArray);
      });
  }

  loadServicesTypes() {
    this.servicesService
      .getServicesTypes()
      .subscribe((serviceTypesList: [Service]) => {
        serviceTypesList.forEach((serviceType: any, key: any) => {
          this.serviceArray.push(serviceType);
        });
        // console.log(serviceTypesList);
        // console.log(this.serviceArray);
        //this.loadInstructors();
      });
  }

  sendForm(form: any) {
    //Todo: implement method
    this.adminScheduleService
      .insertPreliminarySessionSchedule(form)
      .subscribe((sessions: any) => {
        if (sessions.sessions != null) {
          sessions.sessions.forEach((session: any, key: any) => {
            //this.currentPreliminarySchedule.push(session)
          });
        } else {
          //TODO: Mostrar Error de vacio
          console.log("Erroooooor!!! no hay clases");
        }
      });
  }

  onCategoryChange() {
    console.log(this.preliminaryForm.value.sessionServiceName);

    this.loadInstructorsByService(
      this.preliminaryForm.value.sessionServiceName
    );
  }
}
