import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-produto',
  standalone: true,
  imports: [], 
  templateUrl: './editar-produto.html',
  styleUrls: ['./editar-produto.css']
})
export class EditarProduto implements OnInit {
  private router = inject(Router); 

  mensagemAviso: string | null = null;


  produto = {
    sku: '',
    nome: '',
    categoria: '',
    madeira: '',
    preco: 0,
    estoque: 0,
    fotoUrl: 'https://unsplash.com' 
  };

  categorias: string[] = ['Mesas', 'Cadeiras', 'Armários', 'Prateleiras', 'Sofás & Poltronas', 'Quartos & Camas', 'Jantar & Cadeiras', 'Decoração'];
  madeiras: string[] = ['Peroba Rosa', 'Ipê', 'Cumaru', 'Eucalipto', 'Pinho'];

  constructor() {
    
    const navegacao = this.router.getCurrentNavigation();
    const estado = navegacao?.extras.state as { produto: any };
    
    if (estado && estado.produto) {
      this.produto = {
        sku: estado.produto.sku,
        nome: estado.produto.nome,
        categoria: estado.produto.categoria,
        madeira: estado.produto.madeira || 'Peroba Rosa', 
        preco: estado.produto.preco,
        estoque: estado.produto.estoque,
        fotoUrl: estado.produto.imagem 
      };
    }
  }

  ngOnInit(): void {
   
  }

  trocarFoto(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (input && input.files && input.files.length > 0) {
      const file = input.files[0]; 
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          this.produto.fotoUrl = e.target.result as string;
          this.mostrarAviso('Nova fotografia carregada!');
        }
      };
      reader.readAsDataURL(file);
    }
  }

  descartar(): void {
    this.mostrarAviso('Alterações descartadas!');
    setTimeout(() => {
      this.router.navigate(['/produtos']); 
    }, 1000);
  }

  salvarProduto(): void {
    console.log('Dados salvos diretamente na página:', this.produto);
    this.mostrarAviso('Produto atualizado com sucesso!');
    setTimeout(() => {
      this.router.navigate(['/produtos']); 
    }, 1500);
  }

  private mostrarAviso(mensagem: string): void {
    this.mensagemAviso = mensagem;
    setTimeout(() => {
      this.mensagemAviso = null;
    }, 3000);
  }
}
