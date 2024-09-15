import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ApiFacadeService } from '../../model/services/api-facade.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-settings',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule],
  templateUrl: './detail-settings.component.html',
  styleUrl: './detail-settings.component.scss'
})
export class DetailSettingsComponent {
  @Input() postId!: number;
  displayDialog: boolean = false;

  constructor(private apiFacade: ApiFacadeService, private router: Router) {}

  showDeleteDialog() {
    this.displayDialog = true;
  }

  confirmDelete() {
    this.apiFacade.deletePost(this.postId).subscribe({
      next: () => {
        this.displayDialog = false;
        // Navigate back to the post list after successful deletion
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error deleting post:', err);
        this.displayDialog = false;
      }
    });
  }

  cancelDelete() {
    this.displayDialog = false;
  }
}
