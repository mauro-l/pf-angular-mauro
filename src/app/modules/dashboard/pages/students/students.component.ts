import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from './models';
import { generateRandomString } from '../../../../shared/utils';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogFormComponent } from './components/student-dialog-form/student-dialog-form.component';

@Component({
  selector: 'app-students',
  standalone: false,

  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  students: Student[] = [
    {
      id: generateRandomString(6),
      name: 'Jill',
      lastName: 'Valentine',
    },
    {
      id: generateRandomString(6),
      name: 'Chris',
      lastName: 'Redfield',
    },
  ];
  editingStudentId: string | null = null;

  constructor(private fb: FormBuilder, private matDialog: MatDialog) {}

  onDelete(id: string) {
    if (confirm('Esta seguro?')) {
      this.students = this.students.filter((el) => el.id != id);
    }
  }

  onColorUpdated() {
    console.log('Se actualizo el color de fondo del elemento!');
  }

  onEdit(student: Student): void {
    this.editingStudentId = student.id;

    this.matDialog
      .open(StudentDialogFormComponent, {
        data: student,
      })
      .afterClosed()
      .subscribe({
        next: (valorFormulario) => {
          if (!!valorFormulario) {
            // Logica de editar
            this.students = this.students.map((student) =>
              student.id === this.editingStudentId
                ? { ...student, ...valorFormulario }
                : student
            );
            this.editingStudentId = null;
          }
        },
      });
  }

  onCreateStudent(): void {
    this.matDialog
      .open(StudentDialogFormComponent)
      .afterClosed()
      .subscribe({
        next: (valorFormulario) => {
          if (!!valorFormulario) {
            this.students = [
              ...this.students,
              {
                id: generateRandomString(6),
                ...valorFormulario,
              },
            ];
          }
        },
      });
  }
}
