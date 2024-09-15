import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { IPost } from '../../model/post.interface';
import { ApiFacadeService } from '../../model/services/api-facade.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule,
    DialogModule, ButtonModule, InputTextModule,
    InputTextareaModule, ToastModule  ],
  providers: [MessageService],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})

export class CreatePostComponent implements OnInit {
  visible: boolean = false;
  postForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private apiFacade: ApiFacadeService
  ) {}

  ngOnInit() {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      body: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  showDialog() {
    this.visible = true;
  }

  hideDialog() {
    this.visible = false;
    this.postForm.reset();
  }

  createPost() {
    if (this.postForm.valid) {
      const newPost: Partial<IPost> = {
        title: this.postForm.get('title')?.value,
        body: this.postForm.get('body')?.value
      };

      this.apiFacade.createPost(newPost).pipe(take(1)).subscribe({
        next: (createdPost: IPost) => {
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Post created successfully'});
          this.hideDialog();
        },
        error: (error) => {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Failed to create post'});
        }
      });
    } else {
      Object.values(this.postForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
}
