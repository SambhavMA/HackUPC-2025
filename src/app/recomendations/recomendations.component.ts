import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recomendations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recomendations.component.html',
  styleUrl: './recomendations.component.css'
})
export class RecomendationsComponent {
  imageLink: string = '';
  recommendations: any[] = [];

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // Aquí puedes usar la imagen base64 para enviarla a una API
        console.log('Image as base64:', reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  generateRecommendations() {
    this.recommendations = [
      {
        name: 'Leather Jacket',
        description: 'Stylish jacket perfect for cool weather.',
        image: 'https://via.placeholder.com/150/000000/FFFFFF?text=Jacket'
      },
      {
        name: 'Cotton T-Shirt',
        description: 'A comfy cotton t-shirt for everyday wear.',
        image: 'https://via.placeholder.com/150/888888/FFFFFF?text=T-Shirt'
      },
      {
        name: 'Slim Fit Pants',
        description: 'Modern slim fit pants for casual outings.',
        image: 'https://via.placeholder.com/150/555555/FFFFFF?text=Pants'
      }
    ];
  }
}
