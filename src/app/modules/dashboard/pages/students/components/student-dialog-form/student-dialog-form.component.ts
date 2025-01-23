import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../models';

@Component({
  selector: 'app-student-dialog-form',
  standalone: false,

  templateUrl: './student-dialog-form.component.html',
  styleUrl: './student-dialog-form.component.scss',
})
export class StudentDialogFormComponent {
  studentForm: FormGroup;

  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<StudentDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: Student
  ) {
    this.studentForm = this.fb.group({
      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
    });

    if (!!data) {
      this.isEditing = true;
      this.studentForm.patchValue({
        name: data.name,
        lastName: data.lastName,
      });
    }
  }

  onSubmit() {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.studentForm.value);
      this.studentForm.reset();
    }
  }
}
